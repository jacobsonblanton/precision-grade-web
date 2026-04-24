import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import {
  machines,
  getMachinesByTerritory,
  getMachinesBySalesperson,
  searchMachines,
  getDealerById,
} from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search') ?? '';
  const type = searchParams.get('type') ?? '';

  // Apply search across serial numbers
  if (search) {
    const results = searchMachines(search);
    return NextResponse.json(results);
  }

  // Role-based filtering — prefer salespersonId, fall back to territory string
  let result = (
    payload.role === 'salesperson'
      ? getMachinesBySalesperson(payload.userId)
      : machines
  ).filter((m) => m.type !== '2D MG');

  if (type) {
    result = result.filter((m) => m.type === type);
  }

  // Attach dealer name for convenience
  const withDealer = result.map((m) => ({
    ...m,
    dealer: getDealerById(m.dealerId),
  }));

  return NextResponse.json(withDealer);
}
