import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { updateOrderStatus } from '@/lib/orders';
import { OrderStatus } from '@/lib/types';

const VALID_STATUSES: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Complete', 'Cancelled'];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  if (payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { status } = await req.json() as { status: OrderStatus };
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
  }

  const order = await updateOrderStatus(params.id, status);
  return NextResponse.json(order);
}
