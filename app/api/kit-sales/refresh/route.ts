import { NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  if (payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const scriptPath = path.join(process.cwd(), 'scripts', 'refresh-kit-sales.js');

  return new Promise<NextResponse>((resolve) => {
    execFile('node', [scriptPath], { timeout: 30000 }, (err, stdout, stderr) => {
      if (err) {
        console.error('[refresh-kit-sales]', stderr || err.message);
        resolve(NextResponse.json({ success: false, error: stderr || err.message }, { status: 500 }));
      } else {
        console.log('[refresh-kit-sales]', stdout.trim());
        resolve(NextResponse.json({ success: true, log: stdout.trim() }));
      }
    });
  });
}
