import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
  }
  return NextResponse.json({
    userId: payload.userId,
    username: payload.username,
    role: payload.role,
    territory: payload.territory,
    displayName: payload.displayName,
  });
}
