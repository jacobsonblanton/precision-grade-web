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

function WarnBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-yellow-900/20 border border-yellow-600/30 p-3 text-sm text-yellow-300 leading-relaxed">
      {children}
    </div>
  );
}

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-lg border border-neutral-700 max-w-full"
    />
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-slate-300">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm text-slate-300">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">
            {i + 1}
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}

const BASE = '/installation-basics';

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Earthworks Components & Modes',
    summary: 'Overview of all Earthworks hardware components and supported machine control modes.',
    body: (
      <div className="space-y-4">
        <SectionHeading>TD540 Display</SectionHeading>
        <Img src={`${BASE}/earthworks-components-and-modes/image1.png`} alt="TD540 display" />
        <BulletList items={[
          '10.1" Sunlight Readable LCD Touchscreen with Android OS',
          'Quick Release RAM mounting — secure and portable',
          'Integrated lightbars within operation screens',
          'Front-facing USB for firmware upgrades and data sync',
          'Power down delay configurable by user',
          'Split screen viewing configurable by user',
          'Can contain all Earthworks system licensing for both machine types',
          'TD520 (legacy 10.1") and TD510 (7" premium display) also supported — adapters required to swap between TD540 and legacy displays',
        ]} />

        <SectionHeading>TD520 and TD510 Display</SectionHeading>
        <Img src={`${BASE}/earthworks-components-and-modes/image2.png`} alt="TD520-TD510" />
        <BulletList items={[
          'Integrated IMU body sensor with 6 degrees of freedom (3-axis)',
          '3 CAN ports for machine CAN, HMI devices, and grade control sensors',
          '2 Ethernet ports for displays and radios',
          'Grade control system power management',
          'IP67 rated against dust, water, and shock',
        ]} />

        <SectionHeading>EC520 — Machine Control ECM</SectionHeading>
         <Img src={`${BASE}/earthworks-components-and-modes/image3.png`} alt="EC520 ECM" />
        <BulletList items={[
          'Integrated IMU body sensor with 6 degrees of freedom (3-axis)',
          '3 CAN ports for machine CAN, HMI devices, and grade control sensors',
          '2 Ethernet ports for displays and radios',
          'Grade control system power management',
          'IP67 rated against dust, water, and shock',
        ]} />

        <SectionHeading>GS520 — Grade Sensor</SectionHeading>
          <Img src={`${BASE}/earthworks-components-and-modes/image4.png`} alt="GS520 grade sensor" />
        <BulletList items={[
          'Integrated IMU grade sensor with 6 degrees of freedom (3-axis)',
          'Suitable for harsh vibration environments (HEX bucket and dozer blades)',
          'Mount directly to linkage — no shock mounting required',
          'IP67 rated against dust, water, and shock',
        ]} />

        <SectionHeading>VM510 — Valve Module</SectionHeading>
          <Img src={`${BASE}/earthworks-components-and-modes/image5.png`} alt="VM510 valve module" />
        <BulletList items={[
          'Translates CAN messages from EC520 to the machine implement ECM',
          'Directly controls aftermarket hydraulic valves if installed',
          'IP67 rated against dust, water, and shock',
        ]} />

        <SectionHeading>MS996 & MS976 Receivers</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/earthworks-components-and-modes/image6.png`} alt="MS996 receiver" />
          <Img src={`${BASE}/earthworks-components-and-modes/image7.png`} alt="MS976 receiver" />
        </div>
        <BulletList items={[
          'Advanced RTK engine for faster initialization and enhanced performance near obstructions',
          'Supports GPS, GLONASS, Galileo, BeiDou',
          '3 LED indicators for instant operational feedback',
          'Tracks up to 44 satellites',
          'Waterproof (up to 5 PSI), hardened against dust and shock',
          'MS996 replaces legacy MS995; MS976 replaces legacy MS975 (same form factor)',
        ]} />

        <SectionHeading>SNR930 Radio</SectionHeading>
          <Img src={`${BASE}/earthworks-components-and-modes/image8.png`} alt="LR510 laser receiver" />
        <BulletList items={[
          '900 or 450 MHz receive-only radio',
          'LED indicator shows radio status',
          'IP67 rated against dust, water, and shock',
          'Receives signal from base station and transmits to MS9x6 receivers over wiring harness',
        ]} />

        <SectionHeading>LR510 Laser Receiver</SectionHeading>
        

        <SectionHeading>System Modes</SectionHeading>
        {[
          { label: '2D Machine Control', image: 'image9.png' },
          { label: '3D Machine Control — Single GNSS', image: 'image10.png' },
          { label: '3D Machine Control — Dual GNSS', image: 'image11.png' },
          { label: '3D Machine Control — Single UTS', image: 'image12.png' },
          { label: '2D & 3D Machine Control — Additional Options', image: 'image13.png' },
        ].map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex gap-2 text-sm text-slate-300">
              <span className="flex-shrink-0 text-red-400 mt-0.5">•</span>
              <span>{item.label}</span>
            </div>
            <div className="ml-4">
              <Img src={`${BASE}/earthworks-components-and-modes/${item.image}`} alt={item.label} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: 2,
    title: 'First Time Setup',
    summary: 'Load the .sg6 file onto the EC520 and install the Earthworks MC Installer App for initial configuration.',
    body: (
      <div className="space-y-4">
        <SectionHeading>Loading .SG6 onto the EC520</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          The .sg6 file contains the machine configuration and must be loaded onto the EC520 before commissioning. Use the EC520 Install tool to upload and install the file.
        </p>
        <Img src={`${BASE}/first-time-setup/image1.png`} alt="EC5XX install — select .sg6 file, upload progress, complete" />

        <SectionHeading>First Time Setup</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Follow the instructions in the images below.
        </p>
        <Img src={`${BASE}/first-time-setup/image2.png`} alt="Installing Earthworks app" />

        <SectionHeading>Installing the Earthworks MC Installer App</SectionHeading>
        <NumList items={[
          'Download the Earthworks MC Installer App onto the TD display.',
          'Open the app and grant the required permissions when prompted.',
          'Locate the Earthworks App on the home screen to confirm installation.',
        ]} />
        <div className="grid grid-cols-2 gap-2">
          
          <Img src={`${BASE}/first-time-setup/image3.png`} alt="App permissions" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/first-time-setup/image4.png`} alt="Locating app on home screen" />
          <Img src={`${BASE}/first-time-setup/image5.png`} alt="First time setup step" />
        </div>

        <SectionHeading>MC Installer</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Follow the instructions in the images below.
        </p>
        <Img src={`${BASE}/first-time-setup/image6.png`} alt="Setup step 3" />

        <SectionHeading>Open Earthworks App-Permissions</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Follow the instructions in the images below.
        </p>
        <Img src={`${BASE}/first-time-setup/image7.png`} alt="Setup step 4" />

        <SectionHeading>Locate Earthworks App on Home Screen</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          Follow the instructions in the images below.
        </p>
        <Img src={`${BASE}/first-time-setup/image8.png`} alt="Setup complete" />

      </div>
    ),
  },
  {
    number: 3,
    title: "Installation Do's & Don'ts",
    summary: "Follow these best practices to ensure a reliable, serviceable installation.",
    body: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-green-900/20 border border-green-600/30 p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2">Do's</p>
            <BulletList items={[
              'Route cables away from heat sources (exhaust, hydraulic lines)',
              'Use supplied grommets wherever cables pass through sheet metal',
              'Secure cables every 300 mm — no slack loops near moving parts',
              'Label both ends of every cable before final dress',
              'Torque all mounting hardware to specification',
              'Install components in accessible locations for servicing',
              'Follow harness labeling and color codes',
            ]} />
          </div>
          <div className="rounded-lg bg-red-900/20 border border-red-600/30 p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Don'ts</p>
            <BulletList items={[
              "Don't route cables near moving parts or pinch points",
              "Don't leave excess slack in harness runs",
              "Don't mount components in sealed, unventilated compartments",
              "Don't ignore fault codes or worn linkage before installing",
              "Don't weld near electronic components without disconnecting battery",
              "Don't skip the bench test before installation",
            ]} />
          </div>
        </div>

        <SectionHeading>Installation Don'ts Examples</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/installation-dos-and-donts/image1.png`} alt="Installation example 1" />
          <Img src={`${BASE}/installation-dos-and-donts/image2.png`} alt="Installation example 2" />
          <Img src={`${BASE}/installation-dos-and-donts/image3.png`} alt="Installation example 3" />
          <Img src={`${BASE}/installation-dos-and-donts/image4.png`} alt="Installation example 4" />
          <Img src={`${BASE}/installation-dos-and-donts/image5.png`} alt="Installation example 5" />
          <Img src={`${BASE}/installation-dos-and-donts/image6.png`} alt="Installation example 6" />
          <Img src={`${BASE}/installation-dos-and-donts/image7.png`} alt="Installation example 7" />
          <Img src={`${BASE}/installation-dos-and-donts/image8.png`} alt="Installation example 8" />
        </div>

        <SectionHeading>Harnessing Best Practices</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/installation-dos-and-donts/image9.png`} alt="Harnessing best practice 1" />
          <Img src={`${BASE}/installation-dos-and-donts/image10.png`} alt="Harnessing best practice 2" />
          <Img src={`${BASE}/installation-dos-and-donts/image11.png`} alt="Harnessing best practice 3" />
          <Img src={`${BASE}/installation-dos-and-donts/image12.png`} alt="Harnessing best practice 4" />
          <Img src={`${BASE}/installation-dos-and-donts/image13.png`} alt="Harnessing best practice 5" />
          <Img src={`${BASE}/installation-dos-and-donts/image14.png`} alt="Harnessing best practice 6" />
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: 'Installer Responsibilities',
    summary: 'Pre-installation bench test checklist and on-site installer responsibilities.',
    body: (
      <div className="space-y-4">
        <SectionHeading>Before Installation — Bench Test</SectionHeading>
        <NumList items={[
          'Confirm the latest revision of installation instructions, ensuring allocated time for the installation.',
          'Schedule location, installer, and welder.',
          'Test all CAN/Onboard devices on a test bench.',
          'Load and verify all codes from Virtual Warehouse.',
          'Add serial number and firmware version to the service database (MTP).',
          'Ensure all harnessing and components are properly inspected and tested.',
        ]} />

        <SectionHeading>On-Site Installer Responsibilities</SectionHeading>
        <NumList items={[
          'Visually inspect the machine to ensure it is in good working condition — no fault codes, no worn linkages, and safe to operate.',
          'Ensure you have the proper tooling to complete the installation. Familiarize yourself with the installation manual and check for newer revisions.',
          'Ensure weldments are in the exact locations outlined in the installation documentation. Significant deviations will cause performance issues.',
          'Install components and harness in a manner that keeps Trimble components serviceable and easy to access for troubleshooting.',
        ]} />
      </div>
    ),
  },
  {
    number: 5,
    title: 'Licensing',
    summary: 'Understand perpetual and subscription licensing, how to load licenses, and what each license type enables.',
    body: (
      <div className="space-y-4">
        <SectionHeading>Earthworks Licensing Overview</SectionHeading>
        <Img src={`${BASE}/licensing/image1.png`} alt="Earthworks licensing overview — Core, Module, RTK, Constellation" />
        <Img src={`${BASE}/licensing/image2.png`} alt="Perpetual license screen" />

        <SectionHeading>Software Warranty & License Types</SectionHeading>
        <Img src={`${BASE}/licensing/image3.png`} alt="Cloud licensing screen" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-2 text-sm">Perpetual Licenses</p>
            <BulletList items={[
              'Option files contain a set of feature changes',
              'Core license includes SW warranty set to generation date + 5 years',
              'Works off features — not part numbers',
            ]} />
          </div>
          <Img src={`${BASE}/licensing/image4.png`} alt="Licensing screen 4" />
          <div className="rounded-lg bg-neutral-800 border border-neutral-700 p-3">
            <p className="font-semibold text-white mb-2 text-sm">Subscription (Cloud) Licenses</p>
            <BulletList items={[
              'XML file (or OTA) containing a snapshot of the cloud database',
              'Most recent file is always used',
              'Each license contains a warning and expiry date',
              'Warning appears by default one week before expiry',
              'Expiry = MIN(TODAY + 45 days, entitlement expiry)',
            ]} />
          </div>
          <Img src={`${BASE}/licensing/image5.png`} alt="Licensing screen 5" />

        </div>

        <SectionHeading>Perpetual License Screen</SectionHeading>
          <Img src={`${BASE}/licensing/image6.png`} alt="Licensing screen 6" />
        
        <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 font-mono">
          {[['A', 'License Name'], ['B', 'License Type'], ['C', 'License Expiration Date'], ['D', 'Add New License from File']].map(([k, v]) => (
            <div key={k} className="flex gap-2"><span className="text-red-400 font-bold">{k}</span><span>{v}</span></div>
          ))}
        </div>

        <SectionHeading>Cloud Licensing Screen</SectionHeading>
          <Img src={`${BASE}/licensing/image7.png`} alt="Licensing screen 7" />
        <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 font-mono">
          {[['A', 'Download status / error messaging'], ['B', 'Auto-sync'], ['C', 'Missing / invalid licenses'], ['D', 'Cloud license indicator']].map(([k, v]) => (
            <div key={k} className="flex gap-2"><span className="text-red-400 font-bold">{k}</span><span>{v}</span></div>
          ))}
        </div>

        <SectionHeading>Cloud Licensing Operator UI</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/licensing/image9.png`} alt="Cloud licensing operator UI" />
        </div>

        <SectionHeading>Licensing - Trimble Earthworks App</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/licensing/image8.png`} alt="Trimble Earthworks app licensing" />
        </div>
      </div>
    ),
  },
  {
    number: 6,
    title: 'Machine Condition',
    summary: 'Assess whether the machine is a suitable candidate for grade control before beginning installation.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Machine wear directly impacts Earthworks accuracy. Assess all of the following before installing grade control on any machine.
        </p>

        <SectionHeading>Is This Machine a Candidate for Grade Control?</SectionHeading>
        <BulletList items={[
          'Uneven blade wear — cutting edge should be replaced if wear exceeds 1/8"',
          'Rotation / circle backlash',
          'Lift cylinder to cutting edge backlash',
          'Blade lift cylinder socket wear',
          'Blade tilt cylinder linkage wear',
          'Pitch link wear',
          'Wearstrips — circle top surface to drawbar',
          'Moldboard wearstrips',
          'Blade slope sensor and cutting edge backlash',
          'Track component wear (including equalizer bar)',
          'Excavator pin wear',
        ]} />

        <SectionHeading>Blade Wear Tolerance</SectionHeading>
        <Img src={`${BASE}/machine-condition/image1.png`} alt="Blade wear — 1/8 max tolerance diagram" />
        <InfoBlock>
          The cutting edge should be replaced if wear exceeds <strong>1/8"</strong> in either convex or concave direction.
        </InfoBlock>
      </div>
    ),
  },
  {
    number: 7,
    title: 'SNM941 Installation',
    summary: 'Install and configure the SNM941 modem for cellular connectivity and subscription licensing.',
    body: (
      <div className="space-y-4">
        <SectionHeading>SNM941 Overview</SectionHeading>
        <Img src={`${BASE}/snm-installation/image1.png`} alt="SNM941 front and back — connectors labeled" />
        <BulletList items={[
          'Operating voltage: 7V DC to 32V DC',
          'Configured via web browser interface',
          'Weatherproof enclosure',
          'Contains cellular modem, Wi-Fi capability, and GNSS receiver',
          'SIM card must be installed by the installer',
          'Required for subscription licensing',
          'Some units produced during COVID may not be equipped with GNSS or Wi-Fi',
        ]} />
        <InfoBlock>
          <strong>Default Wi-Fi password:</strong> SNM941-[Serial Number] or <code className="text-red-400">abcdeabcde</code>
          <br />
          <strong>Web Interface IP addresses:</strong> 192.168.33.1 and 192.168.88.3
        </InfoBlock>

        <SectionHeading>SNM941 Antenna</SectionHeading>
        <Img src={`${BASE}/snm-installation/image2.png`} alt="SNM941 antenna" />

        <SectionHeading>Mounting Location</SectionHeading>
        <p className="text-sm text-slate-300 leading-relaxed">
          The recommended location is near the cab roof-line, typically alongside the SNR radio, to allow:
        </p>
        <BulletList items={[
          'Ease of access for SIM card installation and servicing',
          'Minimal cable distance from the antenna',
          'Adequate space for the electrical harness and coaxial antenna connections',
        ]} />
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/snm-installation/image3.png`} alt="SNM941 mounting location" />
         
        </div>

        <SectionHeading>Accessing the SNM941 Web UI</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
           <Img src={`${BASE}/snm-installation/image4.png`} alt="SNM941 SNM941 web UI access 1" />
          <Img src={`${BASE}/snm-installation/image5.png`} alt="SNM941 web UI access" />
          <Img src={`${BASE}/snm-installation/image6.png`} alt="SNM941 web UI configuration" />
        </div>
      </div>
    ),
  },
  {
    number: 8,
    title: 'Weldments',
    summary: 'Correct welding technique and bracket placement for all Earthworks mounting weldments.',
    body: (
      <div className="space-y-4">
        <WarnBlock>
          <strong>IMPORTANT:</strong> Ensure that either the master switch is OFF or the negative terminal of the battery is isolated before welding on the machine. Damage to electronic components is possible if this step is skipped.
        </WarnBlock>

        <SectionHeading>General Weldment Guidelines</SectionHeading>
        <BulletList items={[
          'Some brackets have small "window" cutouts — use a wire feed welder to reach into these areas.',
          'Select the bracket location carefully before welding.',
          'Unless the instruction says "tack weld", weld all the way around the cutout — but not the corners.',
          'Stagger the welding sequence to avoid overheating or warping any one area (similar to tightening a cylinder head).',
          'Precisely follow bracket location measurements in installation docs.',
          'Note: Different requirements apply to different brackets. Differences may exist with armored cabling systems.',
        ]} />
        <InfoBlock>
          If instructions are not followed, refer to the examples below for acceptable vs. poor welding standards.
        </InfoBlock>

        <SectionHeading>Weldment Process</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/weldment/image1.png`} alt="Weldment step 1" />
          <Img src={`${BASE}/weldment/image2.png`} alt="Weldment step 2" />
          <Img src={`${BASE}/weldment/image3.png`} alt="Weldment step 3" />
          <Img src={`${BASE}/weldment/image4.png`} alt="Weldment step 4" />
          <Img src={`${BASE}/weldment/image5.png`} alt="Weldment step 5" />
          
        </div>

        <SectionHeading>Examples of Poor Welding</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/weldment/image6.png`} alt="Poor welding example 1" />
          <Img src={`${BASE}/weldment/image7.png`} alt="Poor welding example 2" />
          <Img src={`${BASE}/weldment/image8.png`} alt="Poor welding example 3" />
        </div>

        <SectionHeading>Acceptable Welding Standards</SectionHeading>
        <div className="grid grid-cols-2 gap-2">
          <Img src={`${BASE}/weldment/image9.png`} alt="Acceptable welding standard 1" />
          <Img src={`${BASE}/weldment/image10.png`} alt="Acceptable welding standard 2" />
          <Img src={`${BASE}/weldment/image11.png`} alt="Acceptable welding standard 3" />
        </div>
      </div>
    ),
  },
];

export default function InstallationBasics() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];
  const total = STEPS.length;

  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Installation Basics
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
