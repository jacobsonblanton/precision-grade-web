import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import {
  dealers,
  getDealersBySalesperson,
  searchDealers,
  getMachinesByDealerId,
} from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search') ?? '';

  if (search) {
    const results = searchDealers(search);
    const withMachines = results.map((d) => ({
      ...d,
      machines: getMachinesByDealerId(d.id),
    }));
    return NextResponse.json(withMachines);
  }

  // Role-based filtering — filter by salespersonId for reps
  const base =
    payload.role === 'salesperson'
      ? getDealersBySalesperson(payload.userId)
      : dealers;

  const withMachines = base.map((d) => ({
    ...d,
    machines: getMachinesByDealerId(d.id),
  }));

  return NextResponse.json(withMachines);
}
