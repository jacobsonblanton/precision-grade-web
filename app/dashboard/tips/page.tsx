'use client';

import { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Zap,
  Mountain,
  Layers,
  Wrench,
  ArrowLeft,
  Play,
} from 'lucide-react';
import clsx from 'clsx';
import ExcavatorCommissioning from '@/components/ExcavatorCommissioning';
import EarthworksTroubleshooting from '@/components/EarthworksTroubleshooting';
import InstallationBasics from '@/components/InstallationBasics';
import Operate2D from '@/components/Operate2D';
import Operate3D from '@/components/Operate3D';

type TipPage =
  | 'main'
  | '2d-vs-3d'
  | '2d-applications'
  | '3d-applications'
  | 'operate-2d-mg-mc'
  | 'operate-3d-mc'
  | 'installation-basics'
  | 'earthworks-troubleshooting'
  | 'excavator-commissioning';

interface TipSection {
  id: TipPage;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  image?: string;
}

const MAIN_TOPICS: TipSection[] = [
  {
    id: '2d-vs-3d',
    title: '2D versus 3D',
    description:
      'Understand the key differences between 2D and 3D grade control systems — when to use each and the performance trade-offs.',
    icon: <Layers size={20} />,
    color: 'from-blue-600 to-blue-800',
    image: '/images/2d-vs-3d-camera-1.png',
  },
  {
    id: '2d-applications',
    title: '2D Applications',
    description:
      'Explore common field applications for 2D machine control: slope matching, cross-slope grading, and road maintenance.',
    icon: <Mountain size={20} />,
    color: 'from-emerald-600 to-emerald-800',
    image: '/images/2d-applications.jpg',
  },
  {
    id: '3d-applications',
    title: '3D Applications',
    description:
      'Advanced 3D use cases including design file-based grading, GPS-guided earthmoving, and complex surface work.',
    icon: <Zap size={20} />,
    color: 'from-violet-600 to-violet-800',
    image: '/images/3d-applications.jpg',
  },
];

const INSTALLATION_GUIDES: TipSection[] = [
  {
    id: 'installation-basics',
    title: 'Installation Basics',
    description:
      'Core principles for installing Precision Grade hardware — cable routing, sensor mounting, and controller placement.',
    icon: <Wrench size={20} />,
    color: 'from-sky-600 to-sky-800',
    image: '/images/installation-basics.jpg',
  },
  {
    id: 'earthworks-troubleshooting',
    title: 'Earthworks Troubleshooting',
    description:
      'Diagnose and resolve common field issues on earthworks sites — sensor drift, communication faults, and hydraulic response problems.',
    icon: <Zap size={20} />,
    color: 'from-amber-600 to-amber-800',
    image: '/images/earthworks-troubleshooting.jpg',
  },
  {
    id: 'excavator-commissioning',
    title: 'Excavator Commissioning',
    description:
      'Step-by-step commissioning procedure for excavator machine control systems — geometry setup, sensor calibration, and system verification.',
    icon: <Layers size={20} />,
    color: 'from-teal-600 to-teal-800',
    image: '/images/excavator-commissioning.jpg',
  },
];

const MACHINE_GUIDES: TipSection[] = [
  {
    id: 'operate-2d-mg-mc',
    title: 'Operating with 2D MG/MC',
    description:
      'Step-by-step guide to operating machines equipped with 2D Motor Grader or Machine Control systems — startup, calibration, and grading.',
    icon: <Wrench size={20} />,
    color: 'from-orange-600 to-orange-800',
    badge: '2D MG / 2D MC',
    image: '/images/operating-with-2d-mg-mc.jpg',
  },
  {
    id: 'operate-3d-mc',
    title: 'Operating with 3D MC',
    description:
      'Complete operator guide for 3D Machine Control: loading design files, GNSS initialization, real-time grade feedback, and data export.',
    icon: <Play size={20} />,
    color: 'from-pink-600 to-pink-800',
    badge: '3D',
    image: '/images/operating-with-3d-mg-mc.jpg',
  },
];

// ─── Content pages ────────────────────────────────────────────────────────────

const TIP_CONTENT: Record<Exclude<TipPage, 'main'>, { title: string; body: React.ReactNode }> = {
  '2d-vs-3d': {
    title: '2D versus 3D Grade Control',
    body: (
      <div className="space-y-6">
        <Section title="Overview">
          <p>2D and 3D grade control systems both help operators achieve accurate grade, but they differ fundamentally in how they reference elevation and slope.</p>
        </Section>
        <CompareTable
          rows={[
            ['Reference method', 'Cross-slope sensors / laser', 'GPS / total station'],
            ['Design files', 'Not required', 'Required (.svd, .dtm)'],
            ['Setup time', 'Shorter', 'Longer (base station or RTN)'],
            ['Best for', 'Simple slopes, road maintenance', 'Complex surfaces, mass grading'],
            ['Cost', 'Lower', 'Higher'],
            ['Components', 'ECS20, TDS20, GS520', '+ GNSS receiver, base station or RTN'],
          ]}
        />
        <Section title="When to Choose 2D">
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Simple cross-slope or one-way grade work</li>
            <li>Road maintenance and re-grading</li>
            <li>Tight budget or shorter project timelines</li>
            <li>Sites where GPS signal is unreliable</li>
          </ul>
        </Section>
        <Section title="When to Choose 3D">
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Complex surface models or design files exist</li>
            <li>High-accuracy earthworks or mass grading</li>
            <li>Multiple machines working the same surface</li>
            <li>As-built reporting and documentation required</li>
          </ul>
        </Section>
      </div>
    ),
  },
  '2d-applications': {
    title: '2D Grade Control Applications',
    body: (
      <div className="space-y-6">
        <Section title="Common 2D Applications">
          <p>2D machine control excels in repeatable, slope-based tasks where a design model is not required.</p>
        </Section>
        <Section title="Road Maintenance">
          <p className="text-sm text-slate-300">Use cross-slope sensors to maintain consistent crown or single-slope grades on gravel and paved roads. The ECS20 automatically adjusts blade pitch to hold set slope throughout the pass.</p>
        </Section>
        <Section title="Drainage Channels">
          <p className="text-sm text-slate-300">Set a longitudinal grade reference with a laser transmitter. The GS520 sensor rides the laser plane and provides real-time blade guidance to maintain consistent fall across long runs.</p>
        </Section>
        <Section title="Parking Lots &amp; Pads">
          <p className="text-sm text-slate-300">Two-way cross-slope control lets operators quickly establish uniform 2% drainage slope across large flat areas without frequent grade checks.</p>
        </Section>
        <Section title="Subgrade Preparation">
          <p className="text-sm text-slate-300">Work to a grade stake reference or laser reference plane for consistent sub-base depth before paving or aggregate placement.</p>
        </Section>
        <Section title="Key Tips">
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Verify ECS20 slope sensor zero calibration daily</li>
            <li>Check TDS20 display for sensor status before starting each pass</li>
            <li>Confirm GS520 receiver height matches machine setup file</li>
            <li>Use auto mode for long straight grades; manual for tie-ins</li>
          </ul>
        </Section>
      </div>
    ),
  },
  '3d-applications': {
    title: '3D Grade Control Applications',
    body: (
      <div className="space-y-6">
        <Section title="Overview">
          <p>3D machine control uses a design surface (DTM/SVD file) combined with real-time GPS positioning to guide the machine blade or bucket to exact design elevation anywhere on site.</p>
        </Section>
        <Section title="Mass Grading / Earthworks">
          <p className="text-sm text-slate-300">The design file defines cut and fill volumes. The system shows the operator how much to cut or fill at each position, enabling highly efficient bulk earthmoving without manual staking.</p>
        </Section>
        <Section title="Sub-base &amp; Subgrade">
          <p className="text-sm text-slate-300">Load pavement design files to automatically hold exact subgrade elevation and cross-fall as defined by the road designer, reducing rework and material waste.</p>
        </Section>
        <Section title="Complex Intersections &amp; Curves">
          <p className="text-sm text-slate-300">3D models handle superelevation transitions, curve widening, and compound slopes that are impossible to achieve with 2D reference methods.</p>
        </Section>
        <Section title="As-Built Capture">
          <p className="text-sm text-slate-300">The TDS20 records blade position continuously. Export as-built surfaces to verify that finished work meets design tolerances and to satisfy QA documentation requirements.</p>
        </Section>
        <Section title="Key Tips">
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Always check GNSS receiver status and PDOP before starting work</li>
            <li>Use RTN or a fixed base within 10 km for best accuracy</li>
            <li>Verify design file datum matches site survey datum</li>
            <li>Calibrate mast height and blade geometry after any component change</li>
          </ul>
        </Section>
      </div>
    ),
  },
  'operate-2d-mg-mc': {
    title: 'How to Operate with 2D MG/MC',
    body: <Operate2D />,
  },
  'installation-basics': {
    title: 'Installation Basics',
    body: <InstallationBasics />,
  },
  'earthworks-troubleshooting': {
    title: 'Earthworks Troubleshooting',
    body: <EarthworksTroubleshooting />,
  },
  'excavator-commissioning': {
    title: 'Excavator Commissioning',
    body: <ExcavatorCommissioning />,
  },
  'operate-3d-mc': {
    title: 'How to Operate with 3D MC',
    body: <Operate3D />,
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">{title}</h3>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

function CompareTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-neutral-900/80 border-b border-slate-700/50">
            <th className="text-left px-4 py-2.5 text-slate-400 font-semibold">Attribute</th>
            <th className="text-left px-4 py-2.5 text-blue-400 font-semibold">2D</th>
            <th className="text-left px-4 py-2.5 text-violet-400 font-semibold">3D</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([attr, two, three], i) => (
            <tr key={i} className="border-b border-slate-700/30 last:border-0">
              <td className="px-4 py-2.5 text-slate-400">{attr}</td>
              <td className="px-4 py-2.5 text-slate-300">{two}</td>
              <td className="px-4 py-2.5 text-slate-300">{three}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

type Vendor = 'trimble' | 'topcon';

export default function TipsPage() {
  const [activePage, setActivePage] = useState<TipPage>('main');
  const [vendor, setVendor] = useState<Vendor>('trimble');

  if (activePage !== 'main') {
    const content = TIP_CONTENT[activePage];
    return (
      <div className="min-h-full">
        <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800 px-6 py-4">
          <button
            onClick={() => setActivePage('main')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors mb-3"
          >
            <ArrowLeft size={15} />
            Back to Tips & Tricks
          </button>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-black text-white">{content.title}</h1>
            <div className="flex items-center rounded-lg border border-neutral-700/60 overflow-hidden text-sm font-semibold">
              <button
                onClick={() => setVendor('trimble')}
                className={clsx('px-4 py-2 transition-colors', vendor === 'trimble' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200')}
              >
                Trimble
              </button>
              <button
                onClick={() => setVendor('topcon')}
                className={clsx('px-4 py-2 transition-colors border-l border-neutral-700/60', vendor === 'topcon' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200')}
              >
                Topcon
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-6">
          {vendor === 'trimble' ? content.body : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-neutral-400 font-medium">Topcon content coming soon</p>
              <p className="text-sm text-neutral-600 mt-1">This guide will follow the same structure as the Trimble version.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-red-500" />
            <div>
              <h1 className="text-lg font-black text-white">Tips &amp; Tricks</h1>
              <p className="text-xs text-slate-400">Operator guides for Precision Grade systems</p>
            </div>
          </div>
          <div className="flex items-center rounded-lg border border-neutral-700/60 overflow-hidden text-sm font-semibold">
            <button
              onClick={() => setVendor('trimble')}
              className={clsx('px-4 py-2 transition-colors', vendor === 'trimble' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200')}
            >
              Trimble
            </button>
            <button
              onClick={() => setVendor('topcon')}
              className={clsx('px-4 py-2 transition-colors border-l border-neutral-700/60', vendor === 'topcon' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200')}
            >
              Topcon
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* General topics */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            General Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MAIN_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActivePage(topic.id)}
                className="group text-left rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-900/10"
              >
                <div
                  className={clsx('relative p-5', !topic.image && 'bg-gradient-to-br', topic.image ? '' : topic.color)}
                  style={topic.image ? {
                    backgroundImage: `url(${topic.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : undefined}
                >
                  {topic.image && (
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                  )}
                  <div className="relative flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/10">{topic.icon}</div>
                    <ChevronRight
                      size={16}
                      className="text-white/50 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <h3 className="relative mt-4 text-base font-bold text-white">{topic.title}</h3>
                </div>
                <div className="bg-neutral-900/80 px-5 py-3">
                  <p className="text-xs text-slate-400 leading-relaxed">{topic.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Machine guides */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Machine Operation Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MACHINE_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setActivePage(guide.id)}
                className="group text-left rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-900/10"
              >
                <div
                  className={clsx('relative p-5', !guide.image && 'bg-gradient-to-br', guide.image ? '' : guide.color)}
                  style={guide.image ? {
                    backgroundImage: `url(${guide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : undefined}
                >
                  {guide.image && (
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                  )}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10">{guide.icon}</div>
                      {guide.badge && (
                        <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full text-white">
                          {guide.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-white/50 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <h3 className="relative mt-4 text-base font-bold text-white">{guide.title}</h3>
                </div>
                <div className="bg-neutral-900/80 px-5 py-3">
                  <p className="text-xs text-slate-400 leading-relaxed">{guide.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Installation guides */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Installation Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {INSTALLATION_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setActivePage(guide.id)}
                className="group text-left rounded-2xl overflow-hidden border border-neutral-800 hover:border-red-500/30 transition-all hover:shadow-lg hover:shadow-red-900/10"
              >
                <div
                  className={clsx('relative p-5', !guide.image && 'bg-gradient-to-br', guide.image ? '' : guide.color)}
                  style={guide.image ? {
                    backgroundImage: `url(${guide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : undefined}
                >
                  {guide.image && (
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                  )}
                  <div className="relative flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/10">{guide.icon}</div>
                    <ChevronRight
                      size={16}
                      className="text-white/50 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <h3 className="relative mt-4 text-base font-bold text-white">{guide.title}</h3>
                </div>
                <div className="bg-neutral-900/80 px-5 py-3">
                  <p className="text-xs text-slate-400 leading-relaxed">{guide.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
