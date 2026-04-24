'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRoot() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((user) => {
        if (user.role === 'admin') {
          router.replace('/dashboard/kits');
        } else if (user.role === 'trainer') {
          router.replace('/dashboard/trainer');
        } else {
          router.replace('/dashboard/sales');
        }
      })
      .catch(() => router.replace('/login'));
  }, [router]);

  return null;
}
