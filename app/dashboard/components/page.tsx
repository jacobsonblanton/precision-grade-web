'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import clsx from 'clsx';
import { StoreModal } from './StoreModal';

interface KitOption {
  label: string;
  storeKey?: string;
}

interface ModelCard {
  model: string;
  kits: KitOption[];
}

interface CardSection {
  title: string;
  cards: ModelCard[];
}

const TRIMBLE_SECTIONS: CardSection[] = [
  {
    title: 'Link-Belt X4S Series',
    cards: [
      {
        model: '170X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: '2dmg-170-190-260-300' },
          { label: '3DMG Kit'},
          { label: '2DMC Kit',             storeKey: '2dmc-170-190' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-170-190' },
        ],
      },
      {
        model: '190X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: '2dmg-170-190-260-300' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-170-190' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-170-190' },
        ],
      },
      {
        model: '220X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: '2dmg-170-190-260-300' },
          { label: '2DMG Kit Advanced',    storeKey: 'mg-kit-advanced-220' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-220-370' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-220-370' },
        ],
      },
      {
        model: '260X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: '2dmg-170-190-260-300' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-260-300' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-220-370' },
        ],
      },
      {
        model: '300X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: '2dmg-170-190-260-300' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-260-300' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-220-370' },
        ],
      },
      {
        model: '355X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-355-x4s' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-355' },
        ],
      },
      {
        model: '370X4S',
        kits: [
          { label: '2DMG Kit',             storeKey: '2dmg-170-190-260-300' },
          { label: '2DMG Kit Advanced',    storeKey: 'mg-kit-advanced-220' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-220-370' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-220-370' },
        ],
      }
    ],
  },
  {
    title: 'Link-Belt X4 Series and 80X3',
    cards: [
      {
        model: '80X3',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-80-x3' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-80-x3' },
        ],
      },
      {
        model: '145X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-145-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-145-x4' },
        ]
      },
      {
        model: '160X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-160-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-160-x4' },
        ]
      },
      {
        model: '210X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-210-300-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-210-300-x4' },
        ]
      },
      {
        model: '245X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-245-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-145-x4' },
        ]
      },
      {
        model: '300X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-210-300-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-210-300-x4' },
        ]
      },
      {
        model: '350X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-350-490-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-350-x4' },
        ]
      },
      {
        model: '490X4',
        kits: [
          { label: '2DMG Kit',             storeKey: 'all-x4' },
          { label: '3DMG Kit' },
          { label: '2DMC Kit',             storeKey: '2dmc-350-490-x4' },
          { label: '3DMC Kit' },
          { label: 'MG to MC Upgrade Kit', storeKey: 'mc-upgrade-350-x4' },
        ]
      },
    ],
  },
  {
    title: '2D Machine Control Components',
    cards: [
      { model: 'EC520 Control Unit',         kits: [{ label: 'View parts', storeKey: 'ec520' }] },
      { model: 'TD540 Tablet Display',       kits: [{ label: 'View parts', storeKey: 'td540' }] },
      { model: 'GS520 Sensors',              kits: [{ label: 'View parts' }] },
      {
        model: 'Laser Receiver Accessories',
        kits: [
          { label: '80X3', storeKey: 'laser-catcher-x4' },
          { label: 'X4', storeKey: 'laser-catcher-x4' },
          { label: 'X4S', storeKey: 'laser-catcher-x4s' },
        ]
      },
    ],
  },
  {
    title: '3D Machine Control Components',
    cards: [
      { model: 'EC520 Control Unit',         kits: [{ label: 'View parts', storeKey: 'ec520' }] },
      { model: 'TD540 Tablet Display',       kits: [{ label: 'View parts', storeKey: 'td540' }] },
      { model: 'GS520 Sensors',         kits: [{ label: 'View parts' }] },
      { model: 'GNSS Receiver',         kits: [{ label: 'View parts' }] },
      { model: 'Base Station Package',  kits: [{ label: 'View parts' }] },
      { model: 'Site Equipment',        kits: [{ label: 'View parts' }] },
    ],
  },
];

// ── Firmware & Software ─────────────────────────────────────────────────────

interface FirmwareRelease {
  version: string;
  date: string;
  notes: string[];
  downloadUrl?: string;
}

interface FirmwareCard {
  name: string;
  type: 'firmware' | 'software';
  description: string;
  releases: FirmwareRelease[];
}

const TRIMBLE_FIRMWARE: FirmwareCard[] = [
  {
    name: 'EC520 Firmware',
    type: 'firmware',
    description: 'Control unit firmware for the EC520',
    releases: [
      {
        version: '2.21.0',
        date: '—',
        notes: ['Latest release'],
        downloadUrl: '/ec520-td540-firmware/Earthworks_EC520_2.21.0.zip',
      },
      {
        version: '2.20.0',
        date: '—',
        notes: ['Previous release'],
        downloadUrl: '/ec520-td540-firmware/Earthworks_EC520_2.20.0.zip',
      },
    ],
  },
  {
    name: 'TD540 Software',
    type: 'software',
    description: 'Tablet display software for the TD540',
    releases: [
      {
        version: '2.1.15',
        date: '—',
        notes: ['Latest release'],
        downloadUrl: '/ec520-td540-firmware/V002.001.015_TD540_butterfly_ota.zip',
      },
    ],
  },
];

const TOPCON_FIRMWARE: FirmwareCard[] = [
  {
    name: 'MC-X1 Firmware',
    type: 'firmware',
    description: 'Control unit firmware for the MC-X1',
    releases: [
      {
        version: '—',
        date: '—',
        notes: ['No releases added yet'],
        downloadUrl: undefined,
      },
    ],
  },
  {
    name: 'X-63 Controller Software',
    type: 'software',
    description: 'Field software for the X-63 controller',
    releases: [
      {
        version: '—',
        date: '—',
        notes: ['No releases added yet'],
        downloadUrl: undefined,
      },
    ],
  },
];

function FirmwareCardTile({ card }: { card: FirmwareCard }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
      {/* Card header */}
      <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
        {card.type === 'firmware' ? (
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M8 6V4m8 2V4M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h.01M14 14h.01M18 14h.01"/></svg>
          </span>
        ) : (
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-600/20 border border-purple-500/30">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </span>
        )}
        <div>
          <p className="text-sm font-bold text-white">{card.name}</p>
          <p className="text-xs text-neutral-500">{card.description}</p>
        </div>
      </div>

      {/* Releases */}
      <div className="divide-y divide-neutral-800/60">
        {card.releases.map((release, i) => (
          <div key={i}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-neutral-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-white bg-neutral-800 px-2 py-0.5 rounded">
                  v{release.version}
                </span>
                <span className="text-xs text-neutral-500">{release.date}</span>
              </div>
              {expanded === i ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><path d="m18 15-6-6-6 6"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><path d="m6 9 6 6 6-6"/></svg>
              )}
            </button>

            {expanded === i && (
              <div className="px-4 pb-3 space-y-2">
                <ul className="space-y-1">
                  {release.notes.map((note, j) => (
                    <li key={j} className="flex gap-2 text-xs text-slate-400">
                      <span className="text-neutral-600 mt-0.5 flex-shrink-0">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
                {release.downloadUrl ? (
                  <a
                    href={release.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-red-600/15 text-red-400 border border-red-500/25 hover:bg-red-600/25 hover:border-red-500/50 transition-all"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-800/60 text-neutral-600 border border-neutral-700/40 cursor-default">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    No download available
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelCardTile({
  card,
  onStoreOpen,
}: {
  card: ModelCard;
  onStoreOpen: (label: string, storeKey: string) => void;
}) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-neutral-800">
        <p className="text-sm font-bold text-white">{card.model}</p>
      </div>
      <div className="px-4 py-3 flex flex-wrap gap-2">
        {card.kits.map((kit) =>
          kit.storeKey ? (
            <button
              key={kit.label}
              onClick={() => onStoreOpen(`${card.model} ${kit.label}`, kit.storeKey!)}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-red-600/15 text-red-400 border border-red-500/25 hover:bg-red-600/25 hover:border-red-500/50 transition-all"
            >
              {kit.label}
            </button>
          ) : (
            <span
              key={kit.label}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800/60 text-neutral-600 border border-neutral-700/40 cursor-default"
            >
              {kit.label}
            </span>
          )
        )}
      </div>
    </div>
  );
}

type Vendor = 'trimble' | 'topcon';

export default function ComponentsPage() {
  const [modal, setModal] = useState<{ label: string; storeKey: string } | null>(null);
  const [vendor, setVendor] = useState<Vendor>('trimble');

  return (
    <div className="min-h-full">
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Package size={18} className="text-red-500" />
            <div>
              <h1 className="text-lg font-black text-white">Components</h1>
              <p className="text-xs text-slate-400">Precision Grade parts &amp; system components</p>
            </div>
          </div>
          {/* Vendor toggle */}
          <div className="flex items-center rounded-lg border border-neutral-700/60 overflow-hidden text-sm font-semibold">
            <button
              onClick={() => setVendor('trimble')}
              className={clsx(
                'px-4 py-2 transition-colors',
                vendor === 'trimble'
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200',
              )}
            >
              Trimble
            </button>
            <button
              onClick={() => setVendor('topcon')}
              className={clsx(
                'px-4 py-2 transition-colors border-l border-neutral-700/60',
                vendor === 'topcon'
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200',
              )}
            >
              Topcon
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-10">
        {vendor === 'trimble' && (
          <>
            {/* Store header */}
            <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
                Trimble OEM Parts
              </p>
              <p className="text-base font-bold text-white">LBX</p>
            </div>

            {TRIMBLE_SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                    {section.title}
                  </h2>
                  <div className="flex-1 h-px bg-neutral-800" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {section.cards.map((card) => (
                    <ModelCardTile
                      key={card.model}
                      card={card}
                      onStoreOpen={(label, storeKey) => setModal({ label, storeKey })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {vendor === 'topcon' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package size={40} className="text-neutral-700 mb-4" />
            <p className="text-neutral-400 font-medium">Topcon components coming soon</p>
            <p className="text-xs text-neutral-600 mt-1">
              Parts catalog will follow the same structure as Trimble
            </p>
          </div>
        )}

        {/* Firmware & Software — shown for both vendors */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
              Firmware &amp; Software Updates
            </h2>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {(vendor === 'trimble' ? TRIMBLE_FIRMWARE : TOPCON_FIRMWARE).map((card) => (
              <FirmwareCardTile key={card.name} card={card} />
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <StoreModal
          productKey={modal.storeKey}
          label={modal.label}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}