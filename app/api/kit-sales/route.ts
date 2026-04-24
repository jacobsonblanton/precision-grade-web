import { NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { kitSales } from '@/lib/kitSales';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  if (payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  return NextResponse.json({ source: 'static', data: kitSales });
}
