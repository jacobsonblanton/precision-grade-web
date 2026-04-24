'use client';

import * as React from 'react';
import type { AlphaDealer } from '@/lib/alphaDealers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon paths (Next.js asset pipeline strips them)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

type DealerWithKits = AlphaDealer & {
  twoD_guidance: number;
  twoD_control: number;
  threeD_control: number;
  total_kits: number;
};

type Props = {
  dealers: DealerWithKits[];
};

export default function LeafletAlphaDealerMap({ dealers }: Props) {
  if (!dealers || dealers.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-neutral-500">
        No alpha dealer locations available.
      </div>
    );
  }

  const lats = dealers.map((d) => d.latitude);
  const lngs = dealers.map((d) => d.longitude);
  const center: [number, number] = [
    lats.reduce((a, b) => a + b, 0) / dealers.length,
    lngs.reduce((a, b) => a + b, 0) / dealers.length,
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      {/* Left: summary + dealer list */}
      <div className="flex flex-col gap-3">
        {/* Summary card */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
            Alpha Dealer Network
          </p>
          <p className="text-2xl font-black text-white">{dealers.length}</p>
          <p className="text-xs text-neutral-500 mt-0.5">locations with PG kits in the field</p>
          <div className="mt-3 pt-3 border-t border-neutral-800 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm font-bold text-blue-400">
                {dealers.reduce((s, d) => s + d.twoD_guidance, 0)}
              </p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide">2D MG</p>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-400">
                {dealers.reduce((s, d) => s + d.twoD_control, 0)}
              </p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide">2D MC</p>
            </div>
            <div>
              <p className="text-sm font-bold text-violet-400">
                {dealers.reduce((s, d) => s + d.threeD_control, 0)}
              </p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wide">3D MC</p>
            </div>
          </div>
        </div>

        {/* Dealer list */}
        <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden flex-1">
          <div className="px-4 py-2.5 border-b border-neutral-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Dealer List
            </p>
          </div>
          <div className="overflow-y-auto max-h-72 divide-y divide-neutral-800/60">
            {dealers.map((d) => (
              <div key={`${d.storeId}-${d.dealerOrgNo}`} className="px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-white leading-tight">{d.name}</span>
                  <span className="flex-shrink-0 rounded-full bg-red-600/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-400">
                    alpha
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-0.5">{d.address}</p>
                {d.rm && (
                  <p className="text-[11px] text-neutral-400 mt-0.5">RM: {d.rm}</p>
                )}
                {d.total_kits > 0 && (
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {d.total_kits} kit{d.total_kits !== 1 ? 's' : ''} &middot; 2D MG: {d.twoD_guidance} &middot; 2D MC: {d.twoD_control} &middot; 3D: {d.threeD_control}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: interactive map */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col">
        <div className="px-4 py-2.5 border-b border-neutral-800 flex-shrink-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Map View</p>
          <p className="text-xs text-neutral-400 mt-0.5">Alpha dealers with Precision Grade kits in the field</p>
        </div>
        <div className="flex-1 min-h-[360px]">
          <MapContainer
            center={center}
            zoom={4}
            scrollWheelZoom={false}
            className="h-full w-full"
            style={{ minHeight: 360 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dealers.map((d) => (
              <Marker
                key={`${d.storeId}-${d.dealerOrgNo}`}
                position={[d.latitude, d.longitude]}
              >
                <Popup>
                  <div className="space-y-1 text-xs" style={{ minWidth: 160 }}>
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-gray-600">{d.address}</div>
                    {d.rm && <div className="text-gray-500">RM: {d.rm}</div>}
                    {d.total_kits > 0 && (
                      <div className="pt-1 border-t border-gray-200 text-[11px] space-y-0.5">
                        <div>Total kits: <strong>{d.total_kits}</strong></div>
                        <div>2D MG: {d.twoD_guidance} &nbsp;|&nbsp; 2D MC: {d.twoD_control} &nbsp;|&nbsp; 3D: {d.threeD_control}</div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}