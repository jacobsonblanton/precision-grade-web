'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface TroubleshootingStep {
  number: number;
  title: string;
  summary: string;
  body: React.ReactNode;
}

function StepList({ items }: { items: { text: string; note?: string; image?: string }[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="space-y-2">
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">
              {i + 1}
            </span>
            <div className="leading-relaxed">
              <span>{item.text}</span>
              {item.note && (
                <p className="mt-1 text-xs text-yellow-400/80 italic">{item.note}</p>
              )}
            </div>
          </div>
          {item.image && (
            <div className="ml-9">
              <img
                src={item.image}
                alt={`Illustration ${i + 1}`}
                className="rounded-lg border border-neutral-700 max-w-full"
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
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

const STEPS: TroubleshootingStep[] = [
  {
    number: 1,
    title: 'CAN Troubleshooting',
    summary: 'Diagnose CAN bus issues by checking terminators, resistance, continuity, and isolating components.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          CAN bus problems are a common source of sensor and communication failures. Work through the following checks systematically to isolate the fault.
        </p>
        <SectionHeading>CAN Check</SectionHeading>
        <StepList
          items={[
            {
              text: 'Check that terminators are present and each has 120 ohm resistance.',
              image: '/earthworks/can/image1.png',
            },
            {
              text: 'Remove the terminator and check the other through the length of the harness.',
              image: '/earthworks/can/image2.png',
            },
            {
              text: 'Check resistance is 60 ohms over the CAN bus between CAN High and CAN Low.',
              note: 'Only check resistance when power is OFF.',
              image: '/earthworks/can/image3.png',
            },
            {
              text: 'Check continuity between CAN High pins and CAN Low pins.',
              image: '/earthworks/can/image4.png',
            },
            {
              text: 'Disconnect all components and reconnect one at a time to isolate the faulty device.',
            },
          ]}
        />
      </div>
    ),
  },
  {
    number: 2,
    title: 'Zsnaps',
    summary: 'Understand what Zsnaps are, how to take them, and how to interpret the Diagnostics.txt file.',
    body: (
      <div className="space-y-4">
        <SectionHeading>What is a Zsnap?</SectionHeading>
        <InfoBlock>
          A Zsnap is a &ldquo;zip&rdquo; file containing information about the grade system. It captures:
          <ul className="mt-2 space-y-1 list-disc list-inside text-slate-400">
            <li>CAN and Ethernet communication</li>
            <li>Address claims</li>
            <li>Sensor logs</li>
            <li>Machine dimensions</li>
            <li>System diagnostics</li>
          </ul>
          <p className="mt-2 text-xs text-yellow-400/80 italic">Zsnaps require a special program to &ldquo;unzip&rdquo; them. They typically capture the last 5 minutes of operation.</p>
        </InfoBlock>
        <div className="ml-0">
          
        </div>

        <SectionHeading>Zsnap Recommendations</SectionHeading>
        <ul className="space-y-2 text-sm text-slate-300">
          {[
            'Take a Zsnap of new installs operating properly.',
            'The Diagnostics.txt file contains useful information — keep it with machine installation records.',
            'Use for future troubleshooting: new installs on other machines or current issues on the same machine.',
            'Send to support with a Zsnap showing the issue.',
            'Zsnaps taken in the Operator Interface include additional info: Android log for app crashes and screenshots of the displayed screen.',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <SectionHeading>For Sensor Connectivity Issues</SectionHeading>
        <InfoBlock>
          Press <strong>Recheck</strong> in Diagnostics and wait 15–20 seconds before taking a Zsnap.
        </InfoBlock>

        <SectionHeading>How to Take a Zsnap</SectionHeading>
        <div className="ml-0">
          <img src="/earthworks/zsnaps/image1.png" alt="Zsnap overview" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/zsnaps/image2.png" alt="Zsnap recommendations" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Downloading Zsnaps</SectionHeading>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-red-400">•</span><span>Zsnaps sync to the Earthworks Data folder after a USB sync.</span></li>
          <li className="flex gap-2"><span className="text-red-400">•</span><span>You can also download from the Web Interface: <strong>Home &gt; System Snapshot</strong>.</span></li>
        </ul>
        <div className="ml-0">
          <img src="/earthworks/zsnaps/image3.png" alt="How to take a Zsnap" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>What is in a Zsnap?</SectionHeading>
        <InfoBlock>
          Dealers can access: <strong>*.zsnap</strong> (unreadable directly), <strong>Diagnostics.txt</strong>, and a screen capture. The *.zsnap file includes the Diagnostics and screen capture — only the *.zsnap needs to be sent to support.
        </InfoBlock>
        <div className="ml-0">
          <img src="/earthworks/zsnaps/image4.png" alt="Downloading Zsnaps" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>What is in the Diagnostics.txt?</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          The Diagnostics.txt is the primary Earthworks diagnostics file. It contains information about the EC520 hardware, operating system, running software, and the state of the machine and sensors. This is usually the first place to look when diagnosing problems.
        </p>
        <ul className="space-y-1 text-sm text-slate-400 list-disc list-inside">
          <li>System information and licenses installed</li>
          <li>Machine info (installed components, firmware versions)</li>
          <li>Machine status, Measure-Up values, dimensions, and valve cal table</li>
          <li>Coordinates of blade tip with focus</li>
          <li>Radio settings</li>
          <li>GNSS diagnostics (no logs)</li>
        </ul>
        <div className="ml-0">
          <img src="/earthworks/zsnaps/image5.png" alt="Diagnostics.txt contents" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Harness Infrastructure & General Troubleshooting',
    summary: 'Understand MDF selection, wiring infrastructure, CAN bus paths, power architecture, and connector pin-outs.',
    body: (
      <div className="space-y-4">
        <SectionHeading>MDFs (Machine Definition Files)</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          MDFs contain CAN port assignments, CAT network manager settings, and machine dimensions. An incorrect MDF will cause devices to appear as not connected.
        </p>
        <InfoBlock>
          <strong className="text-yellow-400">Always confirm the correct model is selected before investigating harness issues.</strong>
        </InfoBlock>
        <div className="ml-0">
          <img src="/earthworks/harness/image1.png" alt="MDF selection screen" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Wiring Issues</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Wiring issues are one of the most common support problems. The most common issues involve power, Ethernet, and CAN. All harnessing has descriptive labels to make it easier to reference diagrams.
        </p>
        <div className="ml-0">
          <img src="/earthworks/harness/image2.png" alt="Harness labels" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Harnessing Infrastructure — 7 Communication Paths</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Different machines (MDF specific) use different CAN architectures. The seven communication paths are:
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {['CAN 1', 'CAN 2', 'CAN 3', 'CAN 4 / CMR CAN', 'ETH 1', 'ETH 2', 'Serial'].map((path) => (
            <div key={path} className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-slate-300 font-medium">
              {path}
            </div>
          ))}
        </div>
        <div className="ml-0">
          <img src="/earthworks/harness/image3.png" alt="Communication paths overview" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image4.png" alt="CAN 1 sensor bus" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image5.png" alt="CAN 2 wiring" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image6.png" alt="CAN 3 host machine" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>CAN 1 — Sensor Bus</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">Typically used to communicate with sensors installed on the machine. Termination must be installed as per the diagrams to avoid instability issues.</p>
        <div className="ml-0">
          <img src="/earthworks/harness/image7.png" alt="Ethernet 1" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>CAN 2 — Valve Module, Radio & Receivers</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">CAN 2 is typically used to communicate with the Valve Module, Radio, and Receivers.</p>
        <div className="ml-0">
          <img src="/earthworks/harness/image8.png" alt="Ethernet 2" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>CAN 3 — Host Machine (EH)</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">On EH-capable machines, CAN 3 is often used to allow Earthworks to communicate with the machine&apos;s implement ECM.</p>
        <div className="ml-0">
          <img src="/earthworks/harness/image9.png" alt="Serial LB400" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>CMR CAN — GNSS Data Path</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">Dedicated communication path with built-in termination. <strong className="text-yellow-400">Do not repurpose this bus.</strong></p>
        <div className="ml-0">
          <img src="/earthworks/harness/image10.png" alt="CMR CAN GNSS path" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image11.png" alt="6-pin connector" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Ethernet 1 & 2</SectionHeading>
        <ul className="space-y-1 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-red-400">•</span><span><strong>ETH 1:</strong> Dedicated communication between TD display and EC520.</span></li>
          <li className="flex gap-2"><span className="text-red-400">•</span><span><strong>ETH 2:</strong> Dedicated communication between SNM94x modem and EC520.</span></li>
        </ul>
        <div className="grid grid-cols-2 gap-2">
          <img src="/earthworks/harness/image12.png" alt="10-pin connector" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image13.png" alt="SNR900/910 radio" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Serial — LB400 Communication</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">Brown line. No power on this bus.</p>
        <div className="ml-0">
          <img src="/earthworks/harness/image14.png" alt="SNR920/930 radio" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Power Troubleshooting</SectionHeading>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-red-400">•</span><span>If devices are missing, check power first.</span></li>
          <li className="flex gap-2"><span className="text-red-400">•</span><span>Web Interface shows connection status for each component.</span></li>
          <li className="flex gap-2"><span className="text-red-400">•</span><span>EC520 and GS5xx sensors have no LEDs — always check which devices have power.</span></li>
          <li className="flex gap-2"><span className="text-red-400">•</span><span>PM4xx (Power Module) is <strong>not used</strong> in Earthworks — a 24V relay is used instead.</span></li>
        </ul>
        <p className="text-sm text-slate-400 mt-2"><strong>Example (Dozer power control):</strong> EC520 has machine and key switch power. GS5x0 sensors have key switch power. Everything else is powered by relay when EC520 detects key switch.</p>
        <div className="ml-0">
          <img src="/earthworks/harness/image15.png" alt="Power control diagram" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image16.png" alt="Power control diagram" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Standard Connectors</SectionHeading>
        <p className="text-xs text-slate-500 mb-2 italic">Note: The first 6 pins are the same for both 6-pin and 10-pin connectors.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-2">6-Pin Connectors (Sensors)</p>
            <ul className="space-y-0.5 font-mono text-xs text-slate-400">
              <li>A — SW PWR 1</li>
              <li>B — Instance 1</li>
              <li>C — CAN 0 Hi</li>
              <li>D — CAN 0 Lo</li>
              <li>E — Instance 2</li>
              <li>F — GND</li>
            </ul>
          </div>
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-2">10-Pin Connectors (Quicks)</p>
            <ul className="space-y-0.5 font-mono text-xs text-slate-400">
              <li>A — SW PWR 1</li>
              <li>B — Instance 1</li>
              <li>C — CAN 0 Hi</li>
              <li>D — CAN 0 Lo</li>
              <li>E — Instance 2</li>
              <li>F — GND 1</li>
              <li>G — GND 2</li>
              <li>H — SW PWR 2</li>
              <li>I — CAN 1 Hi</li>
              <li>J — CAN 1 Lo</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <img src="/earthworks/harness/image17.png" alt="6-pin connector" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image18.png" alt="10-pin connector" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Radio Connections</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-300">
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-1">SNR900/910</p>
            <ul className="space-y-0.5 font-mono text-xs text-slate-400">
              <li>A — SW PWR 1</li>
              <li>B — GND</li>
              <li>E — CAN Hi</li>
              <li>H — CAN Lo</li>
            </ul>
          </div>
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-1">SNR920/930</p>
            <ul className="space-y-0.5 font-mono text-xs text-slate-400">
              <li>A — SW PWR 1</li>
              <li>B — GND</li>
              <li>C — CAN Hi</li>
              <li>D — CAN Lo</li>
            </ul>
          </div>
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-1">MSS9X (16-Pin)</p>
            <ul className="space-y-0.5 font-mono text-xs text-slate-400">
              <li>A — RS232 GND</li>
              <li>C — CAN1 Lo</li>
              <li>G — PWR</li>
              <li>L — CAN0 Lo</li>
              <li>N — CAN1 Hi</li>
              <li>P — CAN0 Hi</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <img src="/earthworks/harness/image19.png" alt="MSS9X connector" className="rounded-lg border border-neutral-700 max-w-full" />          
          <img src="/earthworks/harness/image20.png" alt="MSS9X connector" className="rounded-lg border border-neutral-700 max-w-full" />
          <img src="/earthworks/harness/image21.png" alt="MSS9X connector" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: 'Hydraulic Installation',
    summary: 'Identify hydraulic components, understand color-coded connections, and reference wiring diagrams.',
    body: (
      <div className="space-y-4">
        <SectionHeading>Hydraulic Components</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          The hydraulic valve block assembly includes drive coils, transducers, and a pressure switch. Identify each component before beginning installation.
        </p>
        <div className="ml-0">
          <img src="/earthworks/hydraulic/image1.png" alt="Drive coils, transducers and pressure switch" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Valve Block Installation</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Mount the valve block securely and route hydraulic lines to the appropriate ports. Ensure all fittings are tight and free of leaks before commissioning.
        </p>
        <div className="ml-0">
          <img src="/earthworks/hydraulic/image2.png" alt="Valve block installation" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Harness Connections</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Connect the hydraulic harness to the valve block and route cables away from heat sources and moving parts. All connectors are keyed to prevent incorrect installation.
        </p>
        <div className="ml-0">
          <img src="/earthworks/hydraulic/image3.png" alt="Hydraulic harness connections" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Color Code Reference</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Each function is color-coded for quick identification during installation and troubleshooting:
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            { label: 'Boom Up', color: 'Green' },
            { label: 'Boom Down', color: 'Brown' },
            { label: 'Arm Out', color: 'Yellow' },
            { label: 'Arm In', color: 'Blue' },
            { label: 'Bucket Curl', color: 'White' },
            { label: 'Bucket Dump', color: 'Black' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <span className="ml-auto text-xs text-slate-400">{item.color}</span>
            </div>
          ))}
        </div>
        <div className="ml-0">
          <img src="/earthworks/hydraulic/image4.png" alt="Color code reference chart" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Wiring Diagram</SectionHeading>
        <div className="ml-0">
          <img src="/earthworks/hydraulic/image5.png" alt="Hydraulic wiring diagram" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>
      </div>
    ),
  },
  {
    number: 5,
    title: 'GNSS & Correction Troubleshooting',
    summary: 'Use GNSS diagnostics screens and receiver blink codes to troubleshoot positioning and correction signal issues.',
    body: (
      <div className="space-y-4">
        <SectionHeading>GNSS Diagnostics</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          The GNSS Diagnostics screen in the Web Interface displays live receiver details for both left and right receivers, including fix status, satellite count, precision, and coordinates. Use this screen to quickly verify receiver health.
        </p>
        <div className="ml-0">
          <img src="/earthworks/gnss/image1.png" alt="GNSS diagnostics screen" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>Receiver Blink Codes</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          Use the LED indicator on the receiver to determine its current state:
        </p>
        <div className="space-y-2 text-sm text-slate-300">
          {[
            { state: 'Off', left: 'No power', right: 'No power' },
            { state: 'Solid', left: 'Powered on', right: 'Powered on' },
            { state: 'Slow flash', left: 'Tracking &lt; 4 satellites', right: 'Tracking &lt; 4 satellites' },
            { state: 'Fast flash', left: 'Tracking more than 4 satellites', right: 'Tracking more than 4 satellites' },
            { state: 'Satellite', left: 'Not tracking', right: 'Not tracking' },
          ].map((row, i) => (
            <div key={i} className="flex gap-2 rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2">
              <span className="w-24 flex-shrink-0 font-medium text-white">{row.state}</span>
              <span className="text-slate-400">{row.left}</span>
            </div>
          ))}
        </div>
        <div className="ml-0">
          <img src="/earthworks/gnss/image2.png" alt="Receiver blink codes reference" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>

        <SectionHeading>SNRX34 Radio Blink Codes</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed mb-2">
          The SNRx34 Multi-band Radio Modem receives GNSS corrections from the base. The LED indicator on the radio indicates correction signal status:
        </p>
        <div className="space-y-2 text-sm">
          {[
            { state: 'Solid LED', meaning: 'Receiving data but not yet synchronized. Also shows when first turned on.' },
            { state: 'Steady flash', meaning: 'Receiving data and synchronized with the radio at the base.' },
          ].map((row, i) => (
            <div key={i} className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2">
              <span className="font-medium text-white">{row.state}: </span>
              <span className="text-slate-400">{row.meaning}</span>
            </div>
          ))}
        </div>
        <div className="ml-0">
          <img src="/earthworks/gnss/image3.png" alt="SNRx34 radio LED indicator" className="rounded-lg border border-neutral-700 max-w-full" />
        </div>
      </div>
    ),
  },
];

export default function EarthworksTroubleshooting() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];
  const total = STEPS.length;

  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Earthworks Troubleshooting
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

        {/* Dot navigation */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.number}
              onClick={() => setCurrent(i)}
              className="group flex flex-col items-center gap-1"
              title={s.title}
            >
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
