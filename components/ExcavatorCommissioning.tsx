'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface CommissioningStep {
  number: number;
  title: string;
  summary: string;
  body: React.ReactNode;
}

const STEPS: CommissioningStep[] = [
  {
    number: 1,
    title: 'Setup Machine',
    summary: 'Configure machine type, make, model, and installed equipment in the Earthworks web interface.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will configure Earthworks to set up which machine type, make, model, and what equipment has been installed.
        </p>
        <ol className="space-y-3">
          {([
            { text: 'Enter and sign into the Web Interface application over the TD display or Wi-Fi.' },
            { text: 'Navigate to the Configure menu and to the Install Assistant section.' },
            { text: 'Release the service lock.' },
            { text: 'Enter the Setup section and follow the on-screen instructions.', image: '/commissioning/step1/image1.png' },
            { text: 'Name the machine (usually model and customer machine number). Also choose Machine Type.', image: '/commissioning/step1/image2.png' },
            { text: 'Configure machine description settings such as Manufacturer, Size, Model, Serial Number breaks, and Configuration.', image: '/commissioning/step1/image3.png' },
            { text: 'Select Earthworks as System Branding.', image: '/commissioning/step1/image4.png' },
            { text: 'Configure Front Linkage Configuration such as Boom type, where the Attachment sensor is located, and if there is a quick coupler installed on the machine.', image: '/commissioning/step1/image5.png' },
            { text: 'Select the GNSS Receiver to be used.', image: '/commissioning/step1/image6.png' },
            { text: 'Configure the 3D sensor mounting locations and if a Laser Catcher is installed.', image: '/commissioning/step1/image7.png' },
            { text: 'Configure Network devices such as the SNR radio and SNM941 Modem.', image: '/commissioning/step1/image8.png' },
            { text: 'Enable Depth Automatics if the machine is equipped.', image: '/commissioning/step1/image9.png' },
            { text: 'Configure optional devices such as External Lightbars, Remote Switches (used with Autos), and the AR camera.', image: '/commissioning/step1/image10.png' },
            { text: 'Configure the machine into the preferred distance units.', image: '/commissioning/step1/image11.png' },
          ] as { text: string; image?: string }[]).map((item, i) => (
            <li key={i} className="space-y-2">
              <div className="flex gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item.text}</span>
              </div>
              {item.image && (
                <div className="ml-9">
                  <img
                    src={item.image}
                    alt={`Step 1.${i + 1} illustration`}
                    className="rounded-lg border border-neutral-700 max-w-full"
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    number: 2,
    title: 'Valve Test',
    summary: 'Manually actuate each hydraulic valve to verify correct linkage direction before continuing commissioning.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          When installing Trimble Aftermarket Automatics, it is best practice to test the hydraulic installation before continuing with commissioning the system. The Valve Test screen will allow you to manually actuate each of the valves to ensure that the linkages move in the correct directions.
        </p>
        <ol className="space-y-3">
          {([
            { text: 'Enter Valve Test menu and arm automatics.' },
            { text: 'Test each linkage to ensure that it moves and moves in the correct direction.', image: '/commissioning/step2/image1.png' },
          ] as { text: string; image?: string }[]).map((item, i) => (
            <li key={i} className="space-y-2">
              <div className="flex gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item.text}</span>
              </div>
              {item.image && (
                <div className="ml-9">
                  <img
                    src={item.image}
                    alt={`Step 2.${i + 1} illustration`}
                    className="rounded-lg border border-neutral-700 max-w-full"
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Sensors',
    summary: 'Assign each GS5x0 sensor to its correct location on the machine (Boom, Stick, Attachment, Tilt).',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          More than one GS5x0 sensor is required for Trimble Earthworks to function. Each sensor is connected to the same CAN bus and requires assignment so the system knows which location each sensor is installed on (Boom, Stick, Attachment, Tilt, etc.).
        </p>
        <StepList items={[
          { text: 'Enter the Sensor Assignment menu within the Install Assistant menu.' },
          { text: 'Find a suitable site where all listed conditions are met.' },
          { text: 'Position the machine as directed. The machine must be on stable ground that is roughly flat.', image: '/commissioning/step3/image1.png' },
          { text: 'If the machine is equipped with a Tilt Bucket/Coupler, assign the Tilt sensor first. If not equipped, select "No Tilt Sensor" and continue. If equipped, select Begin Reading and follow on-screen instructions.', image: '/commissioning/step3/image2.png' },
          { text: 'Position machine as shown on-screen. The stick should be roughly vertical and the attachment must be high enough off the ground to fully curl in and out.', image: '/commissioning/step3/image3.png' },
          { text: 'Select the mounting position of the dogbone sensor.', image: '/commissioning/step3/image4.png' },
          { text: 'Select Begin Reading and move the attachment in and out as prompted. Take care to wait until the STOP icon disappears.', image: '/commissioning/step3/image5.png' },
          { text: 'Select what side of the Stick the sensor is located on (Right or Left from the operator\'s screen).', image: '/commissioning/step3/image6.png' },
          { text: 'Position machine as shown on-screen. Select Begin Reading and move stick as directed on-screen.', image: '/commissioning/step3/image7.png' },
          { text: 'If the machine is equipped with a two-part boom, position the machine as shown to determine the sensor for the upper boom. If not equipped, continue with step 12.', image: '/commissioning/step3/image8.png' },
          { text: 'Select the upper Boom orientation (Right or Left hand side from the operator\'s station).', image: '/commissioning/step3/image9.png' },
          { text: 'Position machine as shown on-screen. Select Begin Reading and move upper boom as directed on-screen.', image: '/commissioning/step3/image10.png' },
          { text: 'Select Boom sensor orientation (Right or Left hand side from the operator\'s station).', image: '/commissioning/step3/image11.png' },
          { text: 'Position machine as shown on-screen. Select Begin Reading and move the Boom as directed.', image: '/commissioning/step3/image12.png' },
        ]} stepNum={3} />
      </div>
    ),
  },
  {
    number: 4,
    title: 'Fixed Sensor Initialization',
    summary: 'Examine sensor data to determine gyro bias, optimizing IMU performance and accuracy.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          IMU sensors are exposed to different types of vibrations from the machine that may affect noise generation. By performing the Fixed Sensor Initialization (FSI), sensor data is examined to determine the gyro bias, optimizing performance and accuracy. If the machine is equipped with a Tilt Coupler or Tilt Bucket, connect the Tilt sensor first.
        </p>
        <StepList items={[
          { text: 'Enter the Fixed Sensor Initialization menu within the Installation Assistant.' },
          { text: 'Position the machine as shown on-screen. The machine must be on stable ground, attachment grounded, throttle at maximum RPM, and engine at normal operating temperature.', image: '/commissioning/step4/image1.png' },
          { text: 'Select Begin Reading and allow calibration to complete.', image: '/commissioning/step4/image2.png' },
        ]} stepNum={4} />
      </div>
    ),
  },
  {
    number: 5,
    title: 'Body',
    summary: 'Calibrate the EC520 IMU sensor to monitor machine body pitch, roll, and locate the Center of Rotation.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section of the Install Assistant, you will calibrate the IMU sensor contained within the EC520. This sensor monitors the pitch and roll of the machine body during operation and assists with locating the Center of Rotation of the excavator.
        </p>
        <StepList items={[
          { text: 'Select Body Calibration from the Install Assistant Menu.' },
          { text: 'Position the machine as shown on-screen on stable ground. Select Begin Reading and wait for the STOP icon to disappear. Rotate the body counter-clockwise through 360 degrees, rapidly increasing and decreasing speed at the start and end.', image: '/commissioning/step5/image1.png' },
          { text: 'Once complete, the system will show a green checkmark and allow navigation to the next step.' },
          { text: 'In the next step, the machine body will be moved in steps while pausing in multiple positions. The machine must be on a slope of 4 degrees or more.', image: '/commissioning/step5/image2.png' },
          { text: 'Select Begin Reading and follow on-screen prompts, moving the machine counter-clockwise into the desired positions at a moderate to high speed between steps.', image: '/commissioning/step5/image3.png' },
          { text: 'Select Finish and Save once the calibration is complete.', image: '/commissioning/step5/image4.png' },
        ]} stepNum={5} />
      </div>
    ),
  },
  {
    number: 6,
    title: 'Body Calibration Validation',
    summary: 'Validate the body calibration by comparing pitch and roll readings 180° apart — values should be equal and opposite.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          The body calibration must be validated to ensure it was completed properly. This validation should be done with the machine on a slope to ensure maximum accuracy.
        </p>
        <StepList items={[
          { text: 'Enter the Monitor Menu within the Web Interface app.' },
          { text: 'Navigate to Machine Diagnostics.' },
          { text: 'Navigate and open the Current Machine Angles section.', image: '/commissioning/step6/image1.png' },
          { text: 'Position the machine body into a repeatable position, using a straight edge to align the corner of the cab with the edge of the track.' },
          { text: 'Record the Body Pitch and Roll from the Current Machine Angles section.', image: '/commissioning/step6/image2.png' },
          { text: 'Rotate the machine 180 degrees and align the machine body in the same fashion as step 4.' },
          { text: 'Record the Body Pitch and Roll measurements a second time.' },
          { text: 'Compare both readings — they should be within 0.020 (2/10ths) of each other with a difference in sign. If significantly different, repeat body calibration.', image: '/commissioning/step6/image3.png' },
        ]} stepNum={6} />
      </div>
    ),
  },
  {
    number: 7,
    title: 'Place Targets',
    summary: 'Position the machine in measure-up position 1 and place survey targets on all required pin locations.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will place the machine into the first measure-up position and place targets on the machine. Magnetic center finder chucks are the most efficient method. Use 3D printed brackets where possible to avoid moving the total station during measure-up.
        </p>
        <StepList items={[
          { text: 'Place center finder chucks onto each pin as shown. Mark targets so the point name can be read through the UTS optics.', image: '/commissioning/step7/image1.png' },
          { text: 'Refer to the point configuration table to determine which targets are required for your machine type.', image: '/commissioning/step7/image2.png' },
          { text: 'Remove any paneling, toolboxes, or handrails needed for a clear line of sight from the UTS to the targets — especially for the A and A1 pins.', image: '/commissioning/step7/image3.png' },
          { text: 'Place CT1 and CT2 control points. CT1 is always the point closest to the cab. Use 3D printed brackets hung underneath the boom at the centerline in 2 places.', image: '/commissioning/step7/image4.png' },
          { text: 'Measure the Track Point (A pin to ground) for undercarriage width and boom pin height.', image: '/commissioning/step7/image5.png' },
          { text: 'Place Receiver Targets ML and MR (required for 3D configuration only).', image: '/commissioning/step7/image6.png' },
          { text: 'Place SB, SS, and SD Sensor Targets using Method 1 (sensors visible) or Method 2 (sensors not visible using 3D printed projection tool). Record rod height offset if using Method 2.', image: '/commissioning/step7/image7.png' },
          { text: 'For A and A1 pins not visible from UTS, use either the 6 Arc Points method or the 5 Arc Points method to calculate pin center locations.', image: '/commissioning/step7/image8.png' },
        ]} stepNum={7} />
      </div>
    ),
  },
  {
    number: 8,
    title: 'Measure Points',
    summary: 'Use a UTS, Siteworks, and Hexcal to take and calculate all linkage measurements across three machine positions.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will take multiple measurements using a UTS, a data collector running Siteworks, and the Hexcal program to calculate distances. Tools required: SPS9x0 Total Station, Data Collector with Siteworks, Digital Level, Plumb Bob, Prism, 3D Printed Measure-Up Tools, Laptop with Hexcal.
        </p>
        <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mt-4 mb-2">Measure Position 1</div>
        <StepList items={[
          { text: 'Place machine into position 1.', image: '/commissioning/step8/image1.png' },
          { text: 'Shoot all necessary points (including auto system points if applicable) and export the CSV file from Siteworks onto a USB drive.' },
          { text: 'Enter the Monitor Menu within the Web Interface app, navigate to Machine Position and note the body pitch and roll for use within Hexcal.', image: '/commissioning/step8/image2.png' },
          { text: 'For Swing Boom machines, use a spirit level for body pitch and roll on the first measure-up.' },
          { text: 'Load the CSV file into Hexcal. Enter the correct Decimal Separator (Period), Delimiter (Comma), and Point Order (P,N,E,Z). Enter Body Pitch and Roll and press Calculate.', image: '/commissioning/step8/image3.png' },
          { text: 'Open the Install Assistant in the Web UI and navigate to the measure-up section to enter calibrated values from Hexcal.', image: '/commissioning/step8/image4.png' },
          { text: 'Enter Body dimensions (Undercarriage width via tape measure; A pin to ground via Siteworks COGO or tape).', image: '/commissioning/step8/image5.png' },
          { text: 'On each tab of the measurement screen, enter the values obtained from Hexcal.', image: '/commissioning/step8/image6.png' },
          { text: 'Enter the A pin position relative to the COR (critical for 2D; will be overwritten in 3D calibration).', image: '/commissioning/step8/image7.png' },
          { text: 'After completing all tabs, add the first calibration reading for each upper tab (Lower Boom/Upper Boom/Stick/Dogbone). Three or more readings are recommended; all must be within 0.4° of each other.', image: '/commissioning/step8/image8.png' },
        ]} stepNum={8} />
        <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mt-6 mb-2">Measure Position 2</div>
        <StepList items={[
          { text: 'Place the machine into Position 2.', image: '/commissioning/step8/image9.png' },
          { text: 'Create a new job in Siteworks and shoot all points from position 1 again. Auto system points do not need to be re-measured.' },
          { text: 'Export data from Siteworks and import into Hexcal.' },
          { text: 'Enter the second Calibration Readings within the Measure Up menu in Earthworks.' },
          { text: 'Leave the UTS set up and targets on the machine — position 3 will be shot in step 11.' },
        ]} stepNum={8} startNum={11} />
      </div>
    ),
  },
  {
    number: 9,
    title: 'Attachment Measure Up',
    summary: 'Measure and enter all bucket/attachment dimensions including width, cutting edge length, and geometry.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will measure up the attachment. It is best practice to set up the attachment between measuring positions 2 and 3 to save time. Tools needed: Plumb Bob, Tape Measure, Digital Level.
        </p>
        <StepList items={[
          { text: 'Navigate to the Attachments section of the Install Assistant.' },
          { text: 'Select Add Attachment.', image: '/commissioning/step9/image1.png' },
          { text: 'Name the attachment, select its type from the dropdown, and configure whether it has teeth and how many.', image: '/commissioning/step9/image2.png' },
          { text: 'Measure and enter Bucket Width.', image: '/commissioning/step9/image3.png' },
          { text: 'Plumb the bottom of the bucket using a Digital Level.', image: '/commissioning/step9/image4.png' },
          { text: 'Select the 3-Dot button once the bucket is plumbed and allow Earthworks to take a measurement.', image: '/commissioning/step9/image5.png' },
          { text: 'Take and enter the cutting edge length (J–J1 measurement).', image: '/commissioning/step9/image6.png' },
          { text: 'Take and enter the Z to J measurement — between the bucket tooth and where the bucket floor starts to transition into a curve.', image: '/commissioning/step9/image7.png' },
          { text: 'Using a plumb bob attached to the G pin centerline, curl the bucket so that points G and J are plumbed.', image: '/commissioning/step9/image8.png' },
          { text: 'Select the 3-Dot button and allow Earthworks to take a measurement.' },
          { text: 'Measure the distance between points G and J using a tape measure.' },
          { text: 'Save Attachment settings if type is set to Bucket. Otherwise, continue with the additional tiltrotator measure-up in the next step.', image: '/commissioning/step9/image9.png' },
        ]} stepNum={9} />
      </div>
    ),
  },
  {
    number: 10,
    title: 'Additional Tiltrotator Measure Up',
    summary: 'Enter additional measured values required when the attachment type is configured as a tiltrotator.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          If you configure a tiltrotator, you must add additional measured values. This is possible for each bucket if the type is set to Tiltrotator - Bucket. Only one tiltrotator can be measured — changes to one bucket will update all other tiltrotator buckets.
        </p>
        <StepList items={[
          { text: 'Follow the on-screen prompts to enter tiltrotator-specific measurements for the configured attachment.', image: '/commissioning/step10/image1.png' },
        ]} stepNum={10} />
      </div>
    ),
  },
  {
    number: 11,
    title: 'Measure Position 3',
    summary: 'Take the final set of linkage measurements using Siteworks and Hexcal and enter them into Earthworks.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will take the final set of measurements of the excavator linkages. The process is the same as positions 1 and 2 in step 8. Utilize Siteworks and Hexcal to calculate the necessary measurements and enter them in the Calibration Readings sections of the Measure Up menu.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          This section covers both 2D and 3D measurement. Points CT1, CT2, A, B1, B, G, F, D, ML, and MR will be measured and entered into Earthworks. COR measurements will be taken in the next step.
        </p>
        <StepList items={[
          { text: 'Place the machine into Position 3 and shoot all required points using Siteworks.', image: '/commissioning/step11/image1.png' },
          { text: 'Import data into Hexcal, calculate values, and enter the third calibration readings in the Measure Up menu in Earthworks. Do not tear down the UTS — it is required in the next step.' },
        ]} stepNum={11} />
      </div>
    ),
  },
  {
    number: 12,
    title: 'Measure Machine Dimensions',
    summary: 'Take tape measurements for undercarriage width, length, and COR to back-of-machine distance.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will take a set of tape measurements used to orient the machine in relation to avoidance zones within a design. Undercarriage width and length must be within ±50 mm or ±2 inches. The COR to back-of-machine measurement will be populated in a later step.
        </p>
        <StepList items={[
          { text: 'Measure the undercarriage width and enter the value into Earthworks.', image: '/commissioning/step12/image1.png' },
          { text: 'Measure the undercarriage length and enter the value into Earthworks.' },
          { text: 'The COR to back-of-machine measurement can be left at this point — it will be populated in a later step.' },
        ]} stepNum={12} />
      </div>
    ),
  },
  {
    number: 13,
    title: 'Mast Measure Up — Vector Calibration',
    summary: 'Calculate the machine Center of Rotation using UTS measurements of the GNSS receiver in four swing positions.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          This section is required for a 3D configuration. You will take measurements used by Earthworks to calculate the center of rotation (COR) of the machine. The UTS must remain in the same location as prior steps. Tools Required: Data Collector with Siteworks, Trimble SPS9x0 Total Station, Computer with Hexcal (optional).
        </p>
        <StepList items={[
          { text: 'Select the measurement method. Continue with the Total Station Method as the UTS is already set up.', image: '/commissioning/step13/image1.png' },
          { text: 'Select which type of measure-up tool is being used (receiver-mounted or mast-mounted). Select Receiver type.', image: '/commissioning/step13/image2.png' },
          { text: 'Place targets onto the machine — measure-up tools on both receivers and targets on pins A and G are required. If using Hexcal for offset, mark CT1 and CT2 at the center of the boom arm.', image: '/commissioning/step13/image3.png' },
          { text: 'Set up the tripod approximately twice the machine\'s full reach away, perpendicular to the linkage. Ensure ML and MR are visible through the total station.', image: '/commissioning/step13/image4.png' },
          { text: 'Measure points ML, MR, A, and G. There must be no difference between this measurement and the actual machine position.', image: '/commissioning/step13/image5.png' },
          { text: 'Enter the Easting, Northing, and Elevation of points ML and MR into Earthworks. Click Start Reading to determine body roll and pitch values.', image: '/commissioning/step13/image6.png' },
          { text: 'Select Boom Pin location and target type.', image: '/commissioning/step13/image7.png' },
          { text: 'Enter Easting, Northing, and Elevation of Pin A into Earthworks, plus the horizontal offset (distance from target to boom centerline).', image: '/commissioning/step13/image8.png' },
          { text: 'Enter Easting, Northing, and Elevation of Pin G into Earthworks, plus the horizontal offset.', image: '/commissioning/step13/image9.png' },
          { text: 'The machine body will now be moved to 3 more positions for COR calculation. The COR is the center of a circle formed by 4 ML/MR measurements at approximately 90° intervals.', image: '/commissioning/step13/image10.png' },
          { text: 'Rotate the machine 90° three more times, measuring the same ML or MR target each time. If any measurement has an error the COR cannot be calculated — verify coordinates and re-measure if needed.', image: '/commissioning/step13/image11.png' },
        ]} stepNum={13} />
      </div>
    ),
  },
  {
    number: 14,
    title: 'Measure Up Validation',
    summary: 'Validate all measure-up steps across 9 checks covering 2D and 3D accuracy to ±10 mm target tolerance.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will validate that the measurements entered in the last few steps are correct and that the machine checks in properly in multiple positions when a design is loaded. Validate 2D first, then 3D. Target accuracy: ±10 mm; maximum acceptable: ±20 mm.
        </p>
        {[
          { label: 'Step 1 — Prove Bucket Measure Up and Calibration', items: [
            'Mark a point on the ground in front of the machine.',
            'Place machine in Position 1 and record attachment tip measurements from the Front Linkage Position menu.',
            'Place machine in Position 2 with the same tooth on the marked point and record measurements.',
            'Place machine in Position 3 and record attachment tip position. Compare all three readings.',
          ]},
          { label: 'Step 2 — Prove Stick Measure Up and Calibration', items: [
            'Place machine back in Position 1 and open Measure Mode in the Earthworks App. Select the Origin button.',
            'Position the machine as shown and measure distance between point J and the marked ground point.',
            'Navigate to point 2 in Measure Mode and compare tape measurement to the slope distance shown.',
          ]},
          { label: 'Step 3 — Prove Boom Measure Up and Calibration', items: [
            'Place machine back in Position 1 and save as Origin in Measure Mode.',
            'Move the boom to the test position and take a tape measurement from point J to the origin mark.',
            'Note the Slope Distance in Measure Mode — it should match the tape measurement.',
          ]},
          { label: 'Step 4 — Prove Body Calibration', items: [
            'Machine must be on a slope of 3.5% (2°) or greater for this test.',
            'Align the side of the cab with the tracks and navigate to Machine Pitch and Roll in the Earthworks App.',
            'Note pitch and roll values, move machine 180°, and confirm values are opposite (e.g., -2° and 2°).',
          ]},
          { label: 'Step 5 — Prove Fixed Sensor Initialization', items: [
            'Touch the attachment center point to the marked reference point on the ground and record the attachment tip elevation (J).',
            'Position machine so linkages will not contact the ground during full rotation.',
            'Note all key distances (A-G, B-J, G-F, A1-A3, R-S, C-F).',
            'Rotate machine at highest safe speed and observe that distances vary by less than ±40 mm (required: less than ±80 mm).',
            'Return attachment to the reference point and confirm there is no noticeable position delay.',
          ]},
          { label: 'Step 6 — Prove Auto Measure Up and Calibration', items: [
            'Method 1 (Tape): Measure front linkage ram lengths and compare to values in the Points of Interest screen in Earthworks.',
            'Method 2 (Hexcal/UTS): Measure CT1, CT2, A, B, G, and cylinder pins; import into Hexcal and compare to Earthworks values.',
          ]},
          { label: 'Step 7 — Prove 3D Vector Calibration (without design)', items: [
            'Place the machine in Position 1 with the bucket tip on the reference point and record Northing, Easting, Elevation.',
            'Place machine in Position 2 (~90° to tracks), place bucket tip on reference point, and record coordinates.',
            'Place machine in Position 3 (~135° to tracks) and record coordinates. All 3 positions must be within ±50 mm (target: ±25 mm).',
          ]},
          { label: 'Step 8 — Prove 3D Vector Calibration (with design)', items: [
            'Ensure the same design is loaded on both the machine and data collector.',
            'Place bucket focus point onto a known reference point.',
            'Note Northing, Easting, and Elevation in 3 machine positions and compare to the known point coordinates (target: ±25 mm, max: ±50 mm).',
          ]},
          { label: 'Step 9 — Prove the Design', items: [
            'Load the customer\'s design into Earthworks and enter the run screen.',
            'Dig to design and have a grade checker or surveyor check the grade of the passes.',
            'Ensure the vertical offset is the same for both machine and grade checker (use zero as best practice).',
            'If the grade check and machine match, the machine is ready for production.',
          ]},
        ].map((section) => (
          <div key={section.label} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-500">{section.label}</p>
            <ol className="space-y-1.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 text-[10px] font-bold mt-0.5">{i + 1}</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: 15,
    title: 'Valve Calibration',
    summary: 'Run automated calibrations for Boom, Stick, and Attachment valves to record hydraulic response curves.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          Within this section, you will work through automatic calibrations for each valve controlling the linkages. This allows Earthworks to measure and record valve responses for each individual hydraulic valve. The machine linkages will move during this process — ensure sufficient clearance for full range of movement. Navigate to the Valve Calibration menu within the Install Assistant.
        </p>
        {[
          {
            label: 'Step 1 — Boom Calibration',
            items: [
              { text: 'Select Boom Calibration to start.', image: '/commissioning/step15/image1.png' },
              { text: 'Position the machine in the shown orientation and set the lower calibration limit. Attachment and stick must be fully curled; Boom at its lowest position. Raise boom slightly if the cylinder has internal dampeners.', image: '/commissioning/step15/image2.png' },
              { text: 'Select Begin Reading.' },
              { text: 'Set the upper calibration limit. Raise the boom until the cylinder is vertical, then lower slightly to avoid dampeners.', image: '/commissioning/step15/image3.png' },
              { text: 'Select Begin Reading.' },
              { text: 'Return the boom to the middle position. The green checkmark will appear once in the correct position.', image: '/commissioning/step15/image4.png' },
              { text: 'Select Next to proceed.' },
              { text: 'Press, hold, and release the auto switch to proceed. Confirm: site is clear, machine is at full RPM and operating temperature, and hydraulic lockouts are disabled.' },
              { text: 'Follow on-screen prompts to complete the Boom valve calibration.', image: '/commissioning/step15/image5.png' },
            ],
          },
          {
            label: 'Step 2 — Stick Calibration',
            items: [
              { text: 'Enter the Stick Calibration menu.', image: '/commissioning/step15/image7.png' },
              { text: 'Set the Retracted Calibration Limit: curl the attachment fully; boom cylinder must be vertical; stick slightly above vertical.', image: '/commissioning/step15/image8.png' },
              { text: 'Select Begin Reading.' },
              { text: 'Set Extended Calibration Limit: raise the stick until fully extended; lower slightly to avoid internal dampeners.', image: '/commissioning/step15/image9.png' },
              { text: 'Select Begin Reading.' },
              { text: 'Return the stick to the middle position. The green checkmark will appear once in the correct position.', image: '/commissioning/step15/image10.png' },
              { text: 'Arm the valves by pressing, holding, and releasing the auto switch.' },
              { text: 'Allow the automated Stick calibration to complete while following on-screen prompts.', image: '/commissioning/step15/image11.png' },
            ],
          },
          {
            label: 'Step 3 — Attachment Calibration',
            items: [
              { text: 'Enter the Attachment Calibration menu.', image: '/commissioning/step15/image13.png' },
              { text: 'Set the Upper Calibration Limit: position the machine as shown; stick curled so attachment can move without contacting the boom; boom raised so attachment can uncurl without hitting the ground; attachment fully curled.', image: '/commissioning/step15/image14.png' },
              { text: 'Uncurl the attachment slightly to avoid internal dampeners.' },
              { text: 'Select Begin Reading.' },
              { text: 'Set the Lower Calibration Reading: uncurl the attachment as shown; curl in slightly to avoid internal dampeners; ensure attachment cannot contact the ground.', image: '/commissioning/step15/image15.png' },
              { text: 'Return the attachment to its center position. The green checkmark will appear once in the correct position.', image: '/commissioning/step15/image16.png' },
              { text: 'Arm the valves as in the previous steps and follow on-screen prompts to complete attachment valve calibration.', image: '/commissioning/step15/image17.png' },
            ],
          },
        ].map((section) => (
          <div key={section.label} className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mt-4">{section.label}</p>
            <ol className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="space-y-2">
                  <div className="flex gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">{i + 1}</span>
                    <span className="leading-relaxed">{item.text}</span>
                  </div>
                  {item.image && (
                    <div className="ml-9">
                      <img src={item.image} alt="" className="rounded-lg border border-neutral-700 max-w-full" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: 16,
    title: 'Save Machine File',
    summary: 'Save all measure-up and calibration data to a .machine file for future reference and reloading.',
    body: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          In this section, you will save the machine file which contains all measure-up and calibration data generated in previous steps. It is best practice to save settings after validation has occurred — this creates a record that can be re-loaded in the future should issues occur.
        </p>
        <StepList items={[
          { text: 'Navigate to the Advanced menu and enter the Machine Settings Files screen.', image: '/commissioning/step16/image1.png' },
          { text: 'Select the hamburger menu at the bottom right corner and select Save Settings.' },
          { text: 'Name your Machine Settings File and select Save.' },
          { text: 'The newly saved .machine file will appear in the list and show as "Last Activated" under the Status bar. You can also download the .machine file from this screen for external storage.', image: '/commissioning/step16/image2.png' },
        ]} stepNum={16} />
      </div>
    ),
  },
];

function StepList({
  items,
  stepNum,
  startNum = 1,
}: {
  items: { text: string; image?: string }[];
  stepNum: number;
  startNum?: number;
}) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="space-y-2">
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold mt-0.5">
              {startNum + i}
            </span>
            <span className="leading-relaxed">{item.text}</span>
          </div>
          {item.image && (
            <div className="ml-9">
              <img
                src={item.image}
                alt={`Step ${stepNum}.${startNum + i} illustration`}
                className="rounded-lg border border-neutral-700 max-w-full"
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ExcavatorCommissioning() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {STEPS.map((s, i) => (
          <button
            key={s.number}
            onClick={() => setCurrentStep(i)}
            title={`Step ${s.number}: ${s.title}`}
            className={clsx(
              'h-1.5 flex-1 min-w-[8px] rounded-full transition-all',
              i < currentStep
                ? 'bg-red-500'
                : i === currentStep
                  ? 'bg-red-600'
                  : 'bg-neutral-800',
            )}
          />
        ))}
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStep < STEPS.length - 1 ? (
            <Circle size={16} className="text-neutral-600" />
          ) : (
            <CheckCircle2 size={16} className="text-green-500" />
          )}
          <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
            Step {step.number} of {STEPS.length}
          </span>
        </div>
        <span className="text-xs text-neutral-600">
          {STEPS.length - currentStep - 1} step{STEPS.length - currentStep - 1 !== 1 ? 's' : ''} remaining
        </span>
      </div>

      {/* Step card */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <h2 className="text-base font-bold text-white">{step.title}</h2>
          <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{step.summary}</p>
        </div>
        <div className="px-6 py-5">
          {step.body}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={isFirst}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
            isFirst
              ? 'text-neutral-700 cursor-not-allowed'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700/60',
          )}
        >
          <ChevronLeft size={15} />
          Previous
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={clsx(
                'rounded-full transition-all',
                i === currentStep
                  ? 'w-4 h-2 bg-red-600'
                  : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500',
              )}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={isLast}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
            isLast
              ? 'text-neutral-700 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-500 text-white',
          )}
        >
          Next
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}