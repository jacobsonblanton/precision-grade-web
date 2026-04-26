import { NextRequest, NextResponse } from 'next/server';
import { findUser, verifyPassword } from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 },
      );
    }

    const user = await findUser(username);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 },
      );
    }

    const token = await signToken({
      userId: user.id,
      username: user.username,
      role: user.role,
      territory: user.territory,
      displayName: user.displayName,
      dealerOrgNo: user.dealerOrgNo,
    });

    const res = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        territory: user.territory,
        displayName: user.displayName,
      },
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('[login]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
