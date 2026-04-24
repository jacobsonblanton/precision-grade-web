import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { getDealerWithMachines } from '@/lib/mockData';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 });
  }

  const dealer = getDealerWithMachines(id);
  if (!dealer) {
    return NextResponse.json({ error: 'Dealer not found.' }, { status: 404 });
  }

  return NextResponse.json(dealer);
}
