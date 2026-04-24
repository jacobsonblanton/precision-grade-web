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

const BASE = '/operator-docs-3d';

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Selecting Design Mode',
    summary: 'Configure the machine for 3D Dual GNSS positioning and load a design file.',
    body: (
      <div className="space-y-4">
        <NumList items={[
          'From the Dashboard, tap the Machine Setup tile.',
          'From the Machine Setup screen, select the Dual GNSS positioning source and tap Apply.',
          'From the Dashboard, tap the Job Setup tile.',
          'From the Job Setup screen, select Design as the mode.',
          'Select a project, design file, surface, and master alignment (if available).',
        ]} />
        <NoteBlock>
          The positioning source you select in Machine Setup will determine the modes available on the Job Setup screen.
        </NoteBlock>
        <div className="grid grid-cols-3 gap-2">
          <Img src={`${BASE}/selecting-design-mode/image1.png`} alt="Machine Setup — positioning source" />
          <Img src={`${BASE}/selecting-design-mode/image2.png`} alt="Job Setup — Design mode selected" />
          <Img src={`${BASE}/selecting-design-mode/image3.png`} alt="Job Setup — design file selection" />
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: 'Using Design Mode',
    summary: 'Load a design surface and use linework for guided grading.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          Design mode lets you select and load a design surface to get guidance to. Designs include a surface and optional linework. You can select a line and get guidance to it from the blade focus tip.
        </InfoBlock>

        <SectionHeading>Supported Design Files</SectionHeading>
        <ul className="space-y-2 text-sm text-slate-300">
          {['.dsz', '.vcl'].map((ext) => (
            <li key={ext} className="flex gap-2">
              <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
              <span><span className="font-mono text-slate-200">{ext}</span> — created in TBC; loaded via cloud service or USB drive</span>
            </li>
          ))}
        </ul>

        <NoteBlock>
          When you select a <span className="font-mono">.vcl</span> design file containing multiple surfaces, you must further select an individual surface and a master alignment for that surface.
        </NoteBlock>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Vertical Guidance',
    summary: 'Configure how the system calculates cut/fill values relative to the design surface.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          The vertical guidance option selected in the Attachment Manager changes how the system extends the design surface beneath the blade to calculate cut/fill values.
        </InfoBlock>

        <SectionHeading>Accessing Attachment Manager</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Go to the Machine Setup tile and select the menu button to open the Attachment Manager screen.
        </p>
        <Img src={`${BASE}/vertical-guidance/image1.png`} alt="Attachment Manager access" />

        <SectionHeading>Focus and Guidance Options</SectionHeading>
        <NumList items={[
          'Select a focus (side of bucket or blade) to guide to: Right, Center, or Left.',
          {
            text: 'Under Advanced Options, select a vertical guidance mode:',
            sub: [
              'Linked to Focus',
              '2 Points',
            ],
          },
          'Tap Apply.',
        ]} />
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/vertical-guidance/image2.png`} alt="Vertical guidance — focus selection" />
          <Img src={`${BASE}/vertical-guidance/image3.png`} alt="Vertical guidance — advanced options" />
        </div>

        <SectionHeading>Custom Inset</SectionHeading>
        <NumList items={[
          {
            text: 'Access the Attachment Manager using one of two methods:',
            sub: [
              'Press and hold the Blade Focus shortcut button.',
              'Access via Machine Settings menu → Blade Manager.',
            ],
          },
          'Select Linked to Focus from the vertical guidance menu.',
          'Open Advanced Options and toggle on Custom Inset.',
          'Enter the desired custom inset value.',
          'Tap Apply.',
        ]} />
        <NoteBlock>
          For 2-point guidance there is no custom inset option for a bucket.
        </NoteBlock>

        <SectionHeading>Overcut Protection</SectionHeading>
        <NumList items={[
          'Access the Attachment / Blade Manager screen.',
          'Open Advanced Options and toggle Overcut Protection on.',
          'Tap Apply.',
        ]} />
        <Img src={`${BASE}/vertical-guidance/image4.png`} alt="Overcut Protection toggle" />
        <NoteBlock>
          Overcut Protection is useful when moving material across the toe of a slope. Toggle it off when the task is done to receive accurate guidance on the rest of the job.
        </NoteBlock>
        <Img src={`${BASE}/vertical-guidance/image5.png`} alt="Overcut Protection — surface adjustment" />
      </div>
    ),
  },
  {
    number: 4,
    title: 'Horizontal Guidance',
    summary: 'Set horizontal guidance to design lines and apply offsets.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          You can receive horizontal guidance relative to lines within Office or Infield Designs, or design surface boundaries. Setting a horizontal offset moves the guidance away from the selected line.
        </InfoBlock>

        <NoteBlock>
          Design must have linework present for horizontal guidance to be available.
        </NoteBlock>

        <SectionHeading>Accessing Horizontal Guidance</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">Choose one of two methods:</p>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
            <span><strong className="text-slate-200">Method 1:</strong> Touch and hold the horizontal offset field in the guidance bar.</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
            <span><strong className="text-slate-200">Method 2:</strong> From the plan view guidance pane, press and hold near the desired line → tap <em>Select 2D Line</em> → tap <em>Horizontal Guidance</em>.</span>
          </li>
        </ul>
        <Img src={`${BASE}/horizontal-guidance/image1.png`} alt="Horizontal Guidance access — guidance bar" />

        <SectionHeading>Applying a Horizontal Offset</SectionHeading>
        <NumList items={[
          'Inside the Horizontal Guidance menu, select a line to guide to.',
          'Enter the offset value or use the up/down buttons to adjust.',
          'To save as a memory, tap Save.',
          'Tap Apply.',
        ]} />
        <div className="grid grid-cols-3 gap-2">
          <Img src={`${BASE}/horizontal-guidance/image2.png`} alt="Horizontal Guidance — line selection" />
          <Img src={`${BASE}/horizontal-guidance/image3.png`} alt="Horizontal Guidance — offset entry" />
          <Img src={`${BASE}/horizontal-guidance/image4.png`} alt="Horizontal Guidance — applied" />
        </div>
      </div>
    ),
  },
  {
    number: 5,
    title: 'Elevation Offsets',
    summary: 'Apply elevation offsets to create target surfaces achievable in a single pass.',
    body: (
      <div className="space-y-4">
        <InfoBlock>
          Elevation offsets let you shift the design surface to create a target surface achievable in a single pass. A working surface offset shifts the design to a known distance above or below finished level — useful for subgrade work.
        </InfoBlock>

        <SectionHeading>Accessing the Elevation Offset Screen</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">Choose one of two methods:</p>
        <ul className="space-y-2 text-sm text-slate-300 mb-4">
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
            <span><strong className="text-slate-200">Method 1:</strong> Press and hold the Elevation Offset button.</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
            <span><strong className="text-slate-200">Method 2:</strong> Access Work Settings menu → Elevation Offset menu.</span>
          </li>
        </ul>

        <SectionHeading>Entering an Offset</SectionHeading>
        <NumList items={[
          'Enter the offset value.',
          'Select Focus Point for guidance.',
          {
            text: 'Select offset direction (under Advanced Options):',
            sub: [
              'Vertical — typically for a known elevation.',
              'Perpendicular — typically for a known thickness, particularly on a sloping surface.',
            ],
          },
          'Tap Apply. Offset values can be saved as Memories.',
        ]} />
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/using-elevation-offsets/image1.png`} alt="Elevation Offset — method 1" />
          <Img src={`${BASE}/using-elevation-offsets/image2.png`} alt="Elevation Offset — offset entry" />
        </div>

        <SectionHeading>Using Saved Offsets</SectionHeading>
        <NumList items={[
          'Open the work screen and tap the elevation offset field in the guidance bar to cycle through saved offset memories.',
          'Use the increment/decrement switch to increase or decrease the offset.',
        ]} />
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/using-elevation-offsets/image3.png`} alt="Elevation Offset — cycling memories" />
          <Img src={`${BASE}/using-elevation-offsets/image4.png`} alt="Elevation Offset — increment switch" />
        </div>
        <NoteBlock>
          To edit increment values, go to System Settings → Increments.
        </NoteBlock>
      </div>
    ),
  },
];

export default function Operate3D() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];
  const total = STEPS.length;

  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            3D MC Operation
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
