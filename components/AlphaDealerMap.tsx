'use client';

import dynamic from 'next/dynamic';
import type { AlphaDealer } from '@/lib/alphaDealers';

type DealerWithKits = AlphaDealer & {
  twoD_guidance: number;
  twoD_control: number;
  threeD_control: number;
  total_kits: number;
};

// Load Leaflet only on the client — it references `window` and cannot SSR
const LeafletAlphaDealerMap = dynamic(
  () => import('@/components/LeafletAlphaDealerMap'),
  { ssr: false }
);

type Props = {
  dealers: DealerWithKits[];
};

export function AlphaDealerMap({ dealers }: Props) {
  return <LeafletAlphaDealerMap dealers={dealers} />;
}