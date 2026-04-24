import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { User } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

const SEED_USERS = [
  {
    id: 1,
    username: 'trainer',
    email: 'trainer@lbx.com',
    password: 'trainer123',
    role: 'trainer' as const,
    displayName: 'Alex Morgan — Trainer',
    territory: undefined,
  },
  {
    id: 2,
    username: 'sales_se',
    email: 'sales_se@lbx.com',
    password: 'sales123',
    role: 'salesperson' as const,
    displayName: 'John Smith',
    territory: 'Southeast',
  },
  {
    id: 3,
    username: 'sales_mw',
    email: 'sales_mw@lbx.com',
    password: 'sales123',
    role: 'salesperson' as const,
    displayName: 'Sarah Miller',
    territory: 'Midwest',
  },
  {
    id: 4,
    username: 'sales_mtn',
    email: 'sales_mtn@lbx.com',
    password: 'sales123',
    role: 'salesperson' as const,
    displayName: 'Chris Evans',
    territory: 'Mountain West',
  },
];

async function seedUsers(): Promise<User[]> {
  const users: User[] = [];
  for (const u of SEED_USERS) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    users.push({
      id: u.id,
      username: u.username,
      email: u.email,
      passwordHash,
      role: u.role,
      displayName: u.displayName,
      territory: u.territory,
    });
  }
  return users;
}

export async function getUsers(): Promise<User[]> {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    const users = await seedUsers();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return users;
  }
  const raw = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(raw) as User[];
}

export async function findUser(usernameOrEmail: string): Promise<User | null> {
  const users = await getUsers();
  return (
    users.find(
      (u) =>
        u.username === usernameOrEmail || u.email === usernameOrEmail,
    ) ?? null
  );
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
