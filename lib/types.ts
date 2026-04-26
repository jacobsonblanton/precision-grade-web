export type UserRole = 'trainer' | 'salesperson' | 'admin' | 'dealer';
export type MachineType = '2D MG' | '2D MC' | '3D';
export type DataSource = 'LBX-Topcon' | 'RemoteCARE' | 'LBX-Trimble';

export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  territory?: string;
  displayName: string;
  dealerOrgNo?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Complete' | 'Cancelled';

export interface OrderItem {
  name: string;
  partNumber?: string;
  quantity: number;
  trimblePartNumber?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  dealerUsername: string;
  dealerName: string;
  dealerOrgNo?: string;
  status: OrderStatus;
  items: OrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Machine {
  id: number;
  type: MachineType;
  serialNumber: string;
  ecsSerial?: string;
  tdsSerial?: string;
  gsSerials?: string[];
  gnssSerials?: string[];
  dealerId: number;
  trainingVisitDate?: string;
  position: number; // 1 or 2
  source: DataSource;
  model?: string;
  installDate?: string;
}

export interface Dealer {
  id: number;
  name: string;
  location: string;
  territory: string;
  salespersonId?: number;
  warrantyParts?: string;
  partsOrdered?: string;
  contactName?: string;
  phone?: string;
}

export interface DealerWithMachines extends Dealer {
  machines: Machine[];
}

export interface AuthPayload {
  userId: number;
  username: string;
  role: UserRole;
  territory?: string;
  displayName: string;
  dealerOrgNo?: string;
  iat?: number;
  exp?: number;
}

export interface SearchResult {
  type: 'dealer' | 'machine';
  dealer?: DealerWithMachines;
  machine?: Machine & { dealer: Dealer };
}
