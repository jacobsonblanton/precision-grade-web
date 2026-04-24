import { Dealer, Machine } from './types';

// ─── Dealers ────────────────────────────────────────────────────────────────

export const dealers: Dealer[] = [
  {
    id: 1,
    name: 'Hawkins Graves Equipment',
    location: 'Birmingham, AL',
    territory: 'Southeast',
    salespersonId: 2,
    warrantyParts: 'EC520 Control Box, TD540 Data Collector',
    partsOrdered: 'GS520 GNSS Antenna (x2), Mounting Bracket Kit',
    contactName: 'Ray Hawkins',
    phone: '(205) 555-0142',
  },
  {
    id: 2,
    name: 'Mid Country Machinery',
    location: 'Kansas City, MO',
    territory: 'Midwest',
    salespersonId: 3,
    warrantyParts: 'GS520 GNSS Receiver',
    partsOrdered: 'TD540 Display Mount, Cable Harness',
    contactName: 'Linda Park',
    phone: '(816) 555-0287',
  },
  {
    id: 3,
    name: 'Rocky Mountain Equipment',
    location: 'Denver, CO',
    territory: 'Mountain West',
    salespersonId: 4,
    warrantyParts: 'EC520 Slope Sensor',
    partsOrdered: 'GS520 GNSS Antenna',
    contactName: 'Carl Torres',
    phone: '(720) 555-0391',
  },
  {
    id: 4,
    name: 'Prairie Steel Construction',
    location: 'Omaha, NE',
    territory: 'Central Plains',
    salespersonId: 3,
    warrantyParts: 'None',
    partsOrdered: 'TD540 Data Collector Screen',
    contactName: 'Dale Munson',
    phone: '(402) 555-0456',
  },
  {
    id: 5,
    name: 'Coastal Construction Supply',
    location: 'Portland, OR',
    territory: 'Pacific',
    salespersonId: 4,
    warrantyParts: 'GNSS Receiver Bracket',
    partsOrdered: 'GS520 Cable Set, Radio Module',
    contactName: 'Mei Tanaka',
    phone: '(503) 555-0512',
  },

  // ── Dave Seater (userId 9) — Northeast ────────────────────────────────────
  {
    id: 6,
    name: 'Chadwick-Baross Inc.',
    location: 'Chelmsford, MA',
    territory: 'Northeast',
    salespersonId: 9,
    warrantyParts: 'None',
    partsOrdered: 'EC520 Control Box',
    contactName: 'Tom Baross',
    phone: '(978) 256-9571',
  },
  {
    id: 7,
    name: 'Chappell Tractor East LLC',
    location: 'Brentwood, NH',
    territory: 'Northeast',
    salespersonId: 9,
    warrantyParts: 'TD540 Data Collector',
    partsOrdered: 'GS520 GNSS Antenna',
    contactName: 'Mike Chappell',
    phone: '(603) 642-5666',
  },
  {
    id: 8,
    name: 'Ferri Equipment, Inc.',
    location: 'Wareham, MA',
    territory: 'Northeast',
    salespersonId: 9,
    warrantyParts: 'None',
    partsOrdered: 'Cable Harness, Mounting Bracket Kit',
    contactName: 'Paul Ferri',
    phone: '(508) 555-0183',
  },

  // ── Zak Shimon (userId 12) — South Central / Mountain ────────────────────
  {
    id: 9,
    name: 'Cisco Equipment — Lubbock',
    location: 'Lubbock, TX',
    territory: 'South Central',
    salespersonId: 12,
    warrantyParts: 'GS520 GNSS Receiver',
    partsOrdered: 'TD540 Display Mount',
    contactName: 'Jim Cisco',
    phone: '(877) 745-9595',
  },
  {
    id: 10,
    name: 'Cisco Equipment — Odessa',
    location: 'Odessa, TX',
    territory: 'South Central',
    salespersonId: 12,
    warrantyParts: 'None',
    partsOrdered: 'EC520 Slope Sensor, GS520 Cable Set',
    contactName: 'Rudy Vega',
    phone: '(432) 367-9181',
  },
  {
    id: 11,
    name: 'Riverbend Equipment, Inc.',
    location: 'Louviers, CO',
    territory: 'South Central',
    salespersonId: 12,
    warrantyParts: 'EC520 Control Box',
    partsOrdered: 'GS520 GNSS Antenna (x2)',
    contactName: 'Steve Riverbend',
    phone: '(303) 555-0274',
  },

  // ── Landon Boyer (userId 8) — Mid-Atlantic / Midwest ──────────────────────
  {
    id: 12,
    name: 'Contractors Sales Company Inc.',
    location: 'Albany, NY',
    territory: 'Mid-Atlantic',
    salespersonId: 8,
    warrantyParts: 'TD540 Data Collector Screen',
    partsOrdered: 'GS520 GNSS Receiver',
    contactName: 'Frank Contractor',
    phone: '(518) 456-1445',
  },
  {
    id: 13,
    name: 'Reco Equipment Inc. — Richfield',
    location: 'Richfield, OH',
    territory: 'Mid-Atlantic',
    salespersonId: 8,
    warrantyParts: 'None',
    partsOrdered: 'EC520 Control Box, Cable Harness',
    contactName: 'Dan Reco',
    phone: '(330) 555-0361',
  },
  {
    id: 14,
    name: 'Reco Equipment Inc. — Columbus',
    location: 'Columbus, OH',
    territory: 'Mid-Atlantic',
    salespersonId: 8,
    warrantyParts: 'GS520 GNSS Antenna',
    partsOrdered: 'TD540 Display Mount',
    contactName: 'Amy Reco',
    phone: '(614) 555-0414',
  },

  // ── Randy Phillips (userId 6) — Southeast / Mid-Atlantic ──────────────────
  {
    id: 15,
    name: 'Heavy Machines Inc. — Birmingham',
    location: 'Birmingham, AL',
    territory: 'Southeast',
    salespersonId: 6,
    warrantyParts: 'EC520 Slope Sensor',
    partsOrdered: 'GS520 GNSS Antenna, Mounting Bracket Kit',
    contactName: 'Barry Holt',
    phone: '(205) 555-0315',
  },
  {
    id: 16,
    name: 'LBCE Mid-Atlantic — Chesapeake',
    location: 'Chesapeake, VA',
    territory: 'Southeast',
    salespersonId: 6,
    warrantyParts: 'TD540 Data Collector',
    partsOrdered: 'EC520 Control Box',
    contactName: 'Greg Lbce',
    phone: '(757) 555-0516',
  },
  {
    id: 17,
    name: 'Hawkins-Graves Inc.',
    location: 'Lynchburg, VA',
    territory: 'Southeast',
    salespersonId: 6,
    warrantyParts: 'None',
    partsOrdered: 'GS520 Cable Set, Radio Module',
    contactName: 'Bill Hawkins',
    phone: '(434) 555-0617',
  },

  // ── Chad Kline (userId 10) — Pacific Northwest ────────────────────────────
  {
    id: 18,
    name: 'Triad Machinery — Portland',
    location: 'Portland, OR',
    territory: 'Pacific Northwest',
    salespersonId: 10,
    warrantyParts: 'GS520 GNSS Receiver',
    partsOrdered: 'TD540 Display Mount, Cable Harness',
    contactName: 'Lisa Triad',
    phone: '(503) 555-0718',
  },
  {
    id: 19,
    name: 'Triad Machinery — Tacoma',
    location: 'Tacoma, WA',
    territory: 'Pacific Northwest',
    salespersonId: 10,
    warrantyParts: 'EC520 Control Box',
    partsOrdered: 'GS520 GNSS Antenna (x2)',
    contactName: 'Kevin Triad',
    phone: '(253) 555-0819',
  },
  {
    id: 20,
    name: 'Triad Machinery — Spokane',
    location: 'Spokane, WA',
    territory: 'Pacific Northwest',
    salespersonId: 10,
    warrantyParts: 'None',
    partsOrdered: 'EC520 Slope Sensor, Mounting Bracket Kit',
    contactName: 'Nina Triad',
    phone: '(509) 555-0920',
  },
];

// ─── Machines ───────────────────────────────────────────────────────────────
// Source breakdown:
//   LBX-Topcon  → 2D MG machines (machine control with Topcon components)
//   RemoteCARE  → Telematics / unified machine registry
//   LBX-Trimble → 2D MC and 3D machines (Trimble-integrated)

export const machines: Machine[] = [
  // ── 2D MG ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    type: '2D MG',
    serialNumber: 'MG-2024-0011',
    ecsSerial: 'EC520-A10011',
    tdsSerial: 'TD540-B20011',
    gsSerials: ['GS520-C30011'],
    dealerId: 1,
    trainingVisitDate: '2024-03-15',
    position: 1,
    source: 'LBX-Topcon',
    model: 'LBX 220X4S',
    installDate: '2024-01-10',
  },
  {
    id: 2,
    type: '2D MG',
    serialNumber: 'MG-2024-0022',
    ecsSerial: 'EC520-A10022',
    tdsSerial: 'TD540-B20022',
    gsSerials: ['GS520-C30022'],
    dealerId: 2,
    trainingVisitDate: '2024-04-20',
    position: 2,
    source: 'LBX-Topcon',
    model: 'LBX 210X4',
    installDate: '2024-02-05',
  },

  // ── 2D MC ─────────────────────────────────────────────────────────────────
  {
    id: 3,
    type: '2D MC',
    serialNumber: 'MC-2024-0033',
    ecsSerial: 'EC520-A20011',
    tdsSerial: 'TD540-B30011',
    gsSerials: ['GS520-C40011'],
    dealerId: 3,
    trainingVisitDate: '2024-05-10',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 145X4',
    installDate: '2024-03-01',
  },
  {
    id: 4,
    type: '2D MC',
    serialNumber: 'MC-2024-0044',
    ecsSerial: 'EC520-A20022',
    tdsSerial: 'TD540-B30022',
    gsSerials: ['GS520-C40022'],
    dealerId: 4,
    trainingVisitDate: '2024-06-05',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 245X4',
    installDate: '2024-03-22',
  },

  // ── 3D ────────────────────────────────────────────────────────────────────
  {
    id: 5,
    type: '3D',
    serialNumber: '3D-2024-0055',
    ecsSerial: 'EC520-A30011',
    tdsSerial: 'TD540-B40011',
    gsSerials: ['GS520-C50011', 'GS520-C50012'],
    gnssSerials: ['GNSS-R70011'],
    dealerId: 5,
    trainingVisitDate: '2024-07-12',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 355X4S',
    installDate: '2024-05-15',
  },
  {
    id: 6,
    type: '3D',
    serialNumber: '3D-2024-0066',
    ecsSerial: 'EC520-A30022',
    tdsSerial: 'TD540-B40022',
    gsSerials: ['GS520-C50033', 'GS520-C50034'],
    gnssSerials: ['GNSS-R70022'],
    dealerId: 1,
    trainingVisitDate: '2024-08-01',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 370X4S',
    installDate: '2024-06-10',
  },

  // ── Dave Seater — dealers 6, 7, 8 ─────────────────────────────────────────
  {
    id: 7,
    type: '2D MC',
    serialNumber: 'MC-2025-0701',
    ecsSerial: 'EC520-D10701',
    tdsSerial: 'TD540-D20701',
    gsSerials: ['GS520-D30701'],
    dealerId: 6,
    trainingVisitDate: '2025-02-10',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 260X4S',
    installDate: '2025-01-15',
  },
  {
    id: 8,
    type: '3D',
    serialNumber: '3D-2025-0801',
    ecsSerial: 'EC520-D10801',
    tdsSerial: 'TD540-D20801',
    gsSerials: ['GS520-D30801', 'GS520-D30802'],
    gnssSerials: ['GNSS-D40801'],
    dealerId: 6,
    trainingVisitDate: '2025-02-10',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 350X4',
    installDate: '2025-01-20',
  },
  {
    id: 9,
    type: '2D MC',
    serialNumber: 'MC-2025-0901',
    ecsSerial: 'EC520-D10901',
    tdsSerial: 'TD540-D20901',
    gsSerials: ['GS520-D30901'],
    dealerId: 7,
    trainingVisitDate: '2025-03-05',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 300X4S',
    installDate: '2025-02-01',
  },
  {
    id: 10,
    type: '2D MC',
    serialNumber: 'MC-2025-1001',
    ecsSerial: 'EC520-D11001',
    tdsSerial: 'TD540-D21001',
    gsSerials: ['GS520-D31001'],
    dealerId: 8,
    trainingVisitDate: '2025-03-18',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 490X4',
    installDate: '2025-02-20',
  },

  // ── Zak Shimon — dealers 9, 10, 11 ───────────────────────────────────────
  {
    id: 11,
    type: '2D MC',
    serialNumber: 'MC-2025-1101',
    ecsSerial: 'EC520-D11101',
    tdsSerial: 'TD540-D21101',
    gsSerials: ['GS520-D31101'],
    dealerId: 9,
    trainingVisitDate: '2025-01-22',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 220X4S',
    installDate: '2024-12-10',
  },
  {
    id: 12,
    type: '3D',
    serialNumber: '3D-2025-1201',
    ecsSerial: 'EC520-D11201',
    tdsSerial: 'TD540-D21201',
    gsSerials: ['GS520-D31201', 'GS520-D31202'],
    gnssSerials: ['GNSS-D41201'],
    dealerId: 9,
    trainingVisitDate: '2025-01-22',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 210X4',
    installDate: '2024-12-15',
  },
  {
    id: 13,
    type: '2D MC',
    serialNumber: 'MC-2025-1301',
    ecsSerial: 'EC520-D11301',
    tdsSerial: 'TD540-D21301',
    gsSerials: ['GS520-D31301'],
    dealerId: 10,
    trainingVisitDate: '2025-02-14',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 145X4',
    installDate: '2025-01-08',
  },
  {
    id: 14,
    type: '2D MC',
    serialNumber: 'MC-2025-1401',
    ecsSerial: 'EC520-D11401',
    tdsSerial: 'TD540-D21401',
    gsSerials: ['GS520-D31401'],
    dealerId: 11,
    trainingVisitDate: '2025-03-01',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 245X4',
    installDate: '2025-01-25',
  },

  // ── Landon Boyer — dealers 12, 13, 14 ─────────────────────────────────────
  {
    id: 15,
    type: '3D',
    serialNumber: '3D-2025-1501',
    ecsSerial: 'EC520-D11501',
    tdsSerial: 'TD540-D21501',
    gsSerials: ['GS520-D31501', 'GS520-D31502'],
    gnssSerials: ['GNSS-D41501'],
    dealerId: 12,
    trainingVisitDate: '2025-02-20',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 355X4S',
    installDate: '2025-01-12',
  },
  {
    id: 16,
    type: '2D MC',
    serialNumber: 'MC-2025-1601',
    ecsSerial: 'EC520-D11601',
    tdsSerial: 'TD540-D21601',
    gsSerials: ['GS520-D31601'],
    dealerId: 12,
    trainingVisitDate: '2025-02-20',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 370X4S',
    installDate: '2025-01-18',
  },
  {
    id: 17,
    type: '2D MC',
    serialNumber: 'MC-2025-1701',
    ecsSerial: 'EC520-D11701',
    tdsSerial: 'TD540-D21701',
    gsSerials: ['GS520-D31701'],
    dealerId: 13,
    trainingVisitDate: '2025-03-10',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 260X4S',
    installDate: '2025-02-05',
  },
  {
    id: 18,
    type: '3D',
    serialNumber: '3D-2025-1801',
    ecsSerial: 'EC520-D11801',
    tdsSerial: 'TD540-D21801',
    gsSerials: ['GS520-D31801', 'GS520-D31802'],
    gnssSerials: ['GNSS-D41801'],
    dealerId: 14,
    trainingVisitDate: '2025-03-15',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 350X4',
    installDate: '2025-02-12',
  },

  // ── Randy Phillips — dealers 15, 16, 17 ───────────────────────────────────
  {
    id: 19,
    type: '2D MC',
    serialNumber: 'MC-2025-1901',
    ecsSerial: 'EC520-D11901',
    tdsSerial: 'TD540-D21901',
    gsSerials: ['GS520-D31901'],
    dealerId: 15,
    trainingVisitDate: '2025-01-30',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 300X4S',
    installDate: '2024-12-20',
  },
  {
    id: 20,
    type: '3D',
    serialNumber: '3D-2025-2001',
    ecsSerial: 'EC520-D12001',
    tdsSerial: 'TD540-D22001',
    gsSerials: ['GS520-D32001', 'GS520-D32002'],
    gnssSerials: ['GNSS-D42001'],
    dealerId: 15,
    trainingVisitDate: '2025-01-30',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 490X4',
    installDate: '2024-12-28',
  },
  {
    id: 21,
    type: '2D MC',
    serialNumber: 'MC-2025-2101',
    ecsSerial: 'EC520-D12101',
    tdsSerial: 'TD540-D22101',
    gsSerials: ['GS520-D32101'],
    dealerId: 16,
    trainingVisitDate: '2025-02-25',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 220X4S',
    installDate: '2025-01-30',
  },
  {
    id: 22,
    type: '2D MC',
    serialNumber: 'MC-2025-2201',
    ecsSerial: 'EC520-D12201',
    tdsSerial: 'TD540-D22201',
    gsSerials: ['GS520-D32201'],
    dealerId: 17,
    trainingVisitDate: '2025-03-12',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 210X4',
    installDate: '2025-02-08',
  },

  // ── Chad Kline — dealers 18, 19, 20 ───────────────────────────────────────
  {
    id: 23,
    type: '2D MC',
    serialNumber: 'MC-2025-2301',
    ecsSerial: 'EC520-D12301',
    tdsSerial: 'TD540-D22301',
    gsSerials: ['GS520-D32301'],
    dealerId: 18,
    trainingVisitDate: '2025-02-05',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 145X4',
    installDate: '2025-01-02',
  },
  {
    id: 24,
    type: '3D',
    serialNumber: '3D-2025-2401',
    ecsSerial: 'EC520-D12401',
    tdsSerial: 'TD540-D22401',
    gsSerials: ['GS520-D32401', 'GS520-D32402'],
    gnssSerials: ['GNSS-D42401'],
    dealerId: 18,
    trainingVisitDate: '2025-02-05',
    position: 2,
    source: 'LBX-Trimble',
    model: 'LBX 245X4',
    installDate: '2025-01-10',
  },
  {
    id: 25,
    type: '2D MC',
    serialNumber: 'MC-2025-2501',
    ecsSerial: 'EC520-D12501',
    tdsSerial: 'TD540-D22501',
    gsSerials: ['GS520-D32501'],
    dealerId: 19,
    trainingVisitDate: '2025-03-08',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 355X4S',
    installDate: '2025-02-03',
  },
  {
    id: 26,
    type: '3D',
    serialNumber: '3D-2025-2601',
    ecsSerial: 'EC520-D12601',
    tdsSerial: 'TD540-D22601',
    gsSerials: ['GS520-D32601', 'GS520-D32602'],
    gnssSerials: ['GNSS-D42601'],
    dealerId: 20,
    trainingVisitDate: '2025-03-20',
    position: 1,
    source: 'LBX-Trimble',
    model: 'LBX 370X4S',
    installDate: '2025-02-18',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getDealerById(id: number): Dealer | undefined {
  return dealers.find((d) => d.id === id);
}

export function getMachinesByDealerId(dealerId: number): Machine[] {
  return machines.filter((m) => m.dealerId === dealerId);
}

export function getMachinesByTerritory(territory: string): Machine[] {
  const territoryDealerIds = dealers
    .filter((d) => d.territory === territory)
    .map((d) => d.id);
  return machines.filter((m) => territoryDealerIds.includes(m.dealerId));
}

export function getDealersByTerritory(territory: string): Dealer[] {
  return dealers.filter((d) => d.territory === territory);
}

export function getDealersBySalesperson(salespersonId: number): Dealer[] {
  return dealers.filter((d) => d.salespersonId === salespersonId);
}

export function getMachinesBySalesperson(salespersonId: number): Machine[] {
  const dealerIds = getDealersBySalesperson(salespersonId).map((d) => d.id);
  return machines.filter((m) => dealerIds.includes(m.dealerId));
}

export function searchMachines(query: string): (Machine & { dealer: Dealer })[] {
  const q = query.toLowerCase();
  return machines
    .filter(
      (m) =>
        m.serialNumber.toLowerCase().includes(q) ||
        m.ecsSerial?.toLowerCase().includes(q) ||
        m.tdsSerial?.toLowerCase().includes(q) ||
        m.gsSerials?.some((s) => s.toLowerCase().includes(q)) ||
        m.gnssSerials?.some((s) => s.toLowerCase().includes(q)),
    )
    .map((m) => ({
      ...m,
      dealer: getDealerById(m.dealerId)!,
    }));
}

export function searchDealers(query: string): Dealer[] {
  const q = query.toLowerCase();
  return dealers.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.contactName?.toLowerCase().includes(q),
  );
}

export function getDealerWithMachines(dealerId: number) {
  const dealer = getDealerById(dealerId);
  if (!dealer) return null;
  return {
    ...dealer,
    machines: getMachinesByDealerId(dealerId),
  };
}
