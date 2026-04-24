'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  summary: string;
  body: React.ReactNode;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mt-6 mb-3 border-b border-neutral-700 pb-1">
      {children}
    </h3>
  );
}

function InfoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-neutral-800/60 border border-neutral-700 p-3 text-sm text-slate-300 leading-relaxed">
      {children}
    </div>
  );
}

function NoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-yellow-900/20 border border-yellow-600/30 p-3 text-sm text-yellow-300 leading-relaxed">
      {children}
    </div>
  );
}

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <img src={src} alt={alt} className="rounded-lg border border-neutral-700 max-w-full" />
  );
}

function NumList({ items }: { items: (string | { text: string; sub?: string[] })[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text;
        const sub = typeof item === 'string' ? undefined : item.sub;
        return (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">
              {i + 1}
            </span>
            <div className="leading-relaxed">
              <span>{text}</span>
              {sub && (
                <ul className="mt-2 space-y-1 ml-2">
                  {sub.map((s, j) => (
                    <li key={j} className="flex gap-2 text-slate-400">
                      <span className="flex-shrink-0 font-mono text-xs text-neutral-500 mt-0.5">{String.fromCharCode(97 + j)}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

const BASE = '/operator-docs';

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Machine Setup',
    summary: 'Configure the positioning source on the dashboard before beginning work.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Before starting a job, set the machine up for 2D operation from the Dashboard.
        </p>
        <NumList items={[
          'From the Dashboard, tap the Machine Setup tile.',
          'In the Positioning Source drop-down menu, select 2D.',
          'Tap Apply.',
        ]} />
        <Img src={`${BASE}/machine-setup/image1.png`} alt="Machine Setup — positioning source set to 2D" />
      </div>
    ),
  },
  {
    number: 2,
    title: 'Job Setup',
    summary: 'Create or select a project and start the work screen.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Set up your project before heading to the work screen.
        </p>
        <NumList items={[
          'From the Dashboard, tap the Job Setup tile.',
          'To create a new project, tap the + button next to the Project tile.',
          'You can also select an existing project from the drop-down menu.',
          'Tap Apply.',
          'From the Dashboard, tap Start. The work screen appears.',
        ]} />
        <Img src={`${BASE}/job-setup/image1.png`} alt="Job Setup screen" />
      </div>
    ),
  },
  {
    number: 3,
    title: 'Setting a Bench Height',
    summary: 'Establish a reference elevation directly from the work screen.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Instead of navigating into the Bench Elevation menu, benching can be done directly from the work screen.
        </p>
        <NumList items={[
          'Select Focus Point.',
          'Place your Focus Point on the elevation you would like to bench to.',
          'Tap Bench.',
        ]} />
        <Img src={`${BASE}/setting-a-bench-height/image1.png`} alt="Setting a bench height from the work screen" />
      </div>
    ),
  },
  {
    number: 4,
    title: '2D Depth and Slope',
    summary: 'Use slopes, sections, and offsets to define your target grade without 3D positioning.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          Depth and Slope mode lets you use slopes, sections, and offsets to define your target grade. The system measures the cutting edge&apos;s position relative to a physical reference surface or laser plane. Unlike Design guidance, it does not rely on knowing the machine&apos;s 3D location.
        </InfoBlock>

        <SectionHeading>Available Plane Types</SectionHeading>
        <ul className="space-y-2 text-sm text-slate-300">
          {['Level Planes', 'Sloping Planes', 'Sloping Planes with Cross Slope'].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <SectionHeading>Creating Slopes in 2D</SectionHeading>
        <NumList items={[
          {
            text: 'Press and hold the desired tile (Mainfall or Cross Slope).',
          },
          {
            text: 'Adjust the angle using one of the following methods:',
            sub: [
              'Drag the green line up or down to increase or decrease the value.',
              'Use the Up/Down arrows to increase or decrease the value.',
              'Manually enter the value with the on-screen keypad by touching the numeral box.',
              'Flip the offset from positive to negative with the +/− button.',
            ],
          },
          { text: 'Tap Apply.' },
        ]} />
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/2d-depth-and-slope/image1.png`} alt="2D Depth and Slope — mainfall adjustment" />
          <Img src={`${BASE}/2d-depth-and-slope/image2.png`} alt="2D Depth and Slope — cross slope adjustment" />
        </div>

        <p className="text-sm text-slate-400 italic">
          The selected Mainfall and Cross Slope angles can be displayed in the upper text ribbon.
        </p>
      </div>
    ),
  },
  {
    number: 5,
    title: 'Transferring a Bench',
    summary: 'Use Touch Point to transfer a bench elevation to a new working position.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          Touch Point transfers a bench elevation via a common hard point when using Depth and Slope mode without a laser catcher. It requires a common feature — such as a rock — accessible from both your original and new working positions.
        </InfoBlock>

        <NoteBlock>
          If you do not have a heading sensor, you cannot rotate the cab when moving positions. You must reach the Touch Point in the digging orientation of the excavator front linkage.
        </NoteBlock>

        <SectionHeading>Steps</SectionHeading>
        <NumList items={[
          'Position the attachment focus on the Touch Point (common point).',
          'Tap the Touch Point icon in the Text Ribbon.',
          'Move the machine to your new working position and place the attachment focus on the same Touch Point.',
          'Tap Regain. The reference elevation is transferred.',
          'Tap Done. You can now work the surface relative to the original bench.',
        ]} />
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/transferring-a-bench/image1.png`} alt="Touch Point — position on common point" />
          <Img src={`${BASE}/transferring-a-bench/image2.png`} alt="Touch Point — regain after moving" />
        </div>
      </div>
    ),
  },
  {
    number: 6,
    title: 'Elevation Offsets',
    summary: 'Create and manage elevation offsets from an established benchmark.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          After a benchmark height has been established, offsets can be created to help reach grade. Multiple offsets can be stored in memory and selected at a later time.
        </InfoBlock>

        <p className="text-sm text-slate-300 leading-relaxed">
          Tapping the Elevation Offset tile cycles through your created offsets. You can also press and hold to select one from the Memory drop-down menu.
        </p>

        <SectionHeading>Creating an Elevation Offset</SectionHeading>
        <NumList items={[
          {
            text: 'Press and hold the Elevation Offset tile.',
          },
          {
            text: 'Adjust the offset using one of the following methods:',
            sub: [
              'Drag the green line up or down to increase or decrease the value.',
              'Use the Up/Down arrows to increase or decrease the value.',
              'Manually enter the value with the on-screen keypad by touching the numeral box.',
              'Flip the offset from positive to negative with the +/− button.',
            ],
          },
          { text: 'Tap Apply.' },
        ]} />
        <Img src={`${BASE}/elevation-offsets/image1.png`} alt="Elevation Offset screen" />
      </div>
    ),
  },
];

export default function Operate2D() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];
  const total = STEPS.length;

  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            2D MG / MC Operation
          </p>
          <h2 className="text-lg font-bold text-white mt-0.5">
            {step.number}. {step.title}
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">{step.summary}</p>
        </div>
        <span className="flex-shrink-0 text-xs text-neutral-500 font-medium">
          {current + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-neutral-800">
        <div
          className="h-full bg-red-600 transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Body */}
      <div className="px-6 py-5 overflow-y-auto max-h-[560px]">
        {step.body}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-neutral-800 text-neutral-300 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} /> Previous
        </button>

        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <button key={s.number} onClick={() => setCurrent(i)} title={s.title}>
              {i < current ? (
                <CheckCircle2 size={16} className="text-red-500" />
              ) : i === current ? (
                <Circle size={16} className="text-red-400 fill-red-400" />
              ) : (
                <Circle size={16} className="text-neutral-600" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
          disabled={current === total - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
