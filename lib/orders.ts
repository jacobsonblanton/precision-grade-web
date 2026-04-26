import { supabase } from './supabase';
import { Order, OrderStatus, OrderItem } from './types';

function generateOrderNumber(): string {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PG-${yy}${mm}${dd}-${rand}`;
}

function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: String(row.id),
    orderNumber: row.order_number as string,
    dealerUsername: row.dealer_username as string,
    dealerName: row.dealer_name as string,
    dealerOrgNo: row.dealer_org_no as string | undefined,
    status: row.status as OrderStatus,
    items: row.items as OrderItem[],
    notes: row.notes as string | undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function createOrder(params: {
  dealerUsername: string;
  dealerName: string;
  dealerOrgNo?: string;
  items: OrderItem[];
  notes?: string;
}): Promise<Order> {
  const orderNumber = generateOrderNumber();
  const { data, error } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      dealer_username: params.dealerUsername,
      dealer_name: params.dealerName,
      dealer_org_no: params.dealerOrgNo ?? null,
      status: 'Pending',
      items: params.items,
      notes: params.notes ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return rowToOrder(data);
}

export async function getOrdersByDealer(dealerUsername: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('dealer_username', dealerUsername)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToOrder);
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToOrder);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return rowToOrder(data);
}
