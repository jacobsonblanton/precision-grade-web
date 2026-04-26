import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { createOrder, getAllOrders, getOrdersByDealer } from '@/lib/orders';
import { sendOrderEmail } from '@/lib/email';
import { lbxToTrimble } from '@/lib/partNumberMapping';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });

  const orders =
    payload.role === 'dealer'
      ? await getOrdersByDealer(payload.username)
      : await getAllOrders();

  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  if (payload.role !== 'dealer') {
    return NextResponse.json({ error: 'Only dealer accounts can place orders.' }, { status: 403 });
  }

  const body = await req.json();
  const { items, notes } = body as {
    items: { name: string; partNumber?: string; quantity: number }[];
    notes?: string;
  };

  if (!items?.length) {
    return NextResponse.json({ error: 'Order must contain at least one item.' }, { status: 400 });
  }

  // Map to order items with Trimble part numbers
  const orderItems = items.map((item) => {
    const raw = (item.partNumber ?? '').replace(/^Part Number:\s*/i, '').trim();
    const trimblePartNumber = lbxToTrimble[raw] ?? raw;
    return { name: item.name, partNumber: raw, trimblePartNumber, quantity: item.quantity };
  });

  const order = await createOrder({
    dealerUsername: payload.username,
    dealerName: payload.displayName,
    dealerOrgNo: payload.dealerOrgNo,
    items: orderItems,
    notes,
  });

  // Send email notification (non-blocking)
  sendOrderEmail(order).catch((err) => console.error('[order-email]', err));

  return NextResponse.json(order, { status: 201 });
}
