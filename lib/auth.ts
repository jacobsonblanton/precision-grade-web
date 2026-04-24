import { SignJWT, jwtVerify } from 'jose';
import { AuthPayload } from './types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'precision-grade-secret-key-2024',
);
const COOKIE_NAME = 'pg-auth-token';
const TOKEN_TTL = '8h';

export async function signToken(payload: Omit<AuthPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
