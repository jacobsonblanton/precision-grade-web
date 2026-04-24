'use client';

import { useState } from 'react';
import { X, ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

interface StoreItem {
  name: string;
  partNumber?: string;
  price?: string;
  note?: string;
}

interface StoreSection {
  title: string;
  items: StoreItem[];
}

interface StoreProductData {
  title: string;
  note?: string;
  sections: StoreSection[];
}

const STORE_DATA: Record<string, StoreProductData> = {
  // 2D 170-190 MG to MC Upgrade // 
  'mc-upgrade-170-190': {
    title: '170/190 X4S MG to MC Upgrade Part Number: EGGR0019',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$175.00' },
          { name: 'KIT - 2DMG/MC JOYSTICKS', partNumber: 'Part Number: EHGR0020', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Subkit - Hydraulic, Link-Belt, Excavator, 170X4S, 190X4S', partNumber: 'Part Number: EGGJ0001', price: '$572.00' },
          { name: 'PRG - Hose, Link-Belt, Excavator, 170X4S, 190X4S', partNumber: 'Part Number: EGGJ0002', price: '$968.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM ', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },
  
  // 2D 170-190-260-300 MG Kit // 
  '2dmg-170-190-260-300': {
    title: '170/190/260/300 X4S 2DMG (Trimble Ready) Kit Part Number: EGER0003',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable-Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W and Wi-Fi, Core HEX w/Link-Belt UI', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'Sub Kit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'Sub Kit - Base Cab/Platform, Link-Belt, Excavator, X4S Trimble-Ready', partNumber: 'Part Number: EGGR0004', price: '$921.05' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Add-on Kits',
        items: [
          { name: 'Kit - Add on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$583.05' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },
  
  // 2D 170-190 Base to MC // 
  '2dmc-170-190': {
    title: '170/190 X4S 2DMC (Trimble Ready) Kit Part Number: EGER0020',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable-Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W and Wi-Fi, Core HEX w/Link-Belt UI', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$175.00' },
          { name: 'KIT - 2DMG/MC JOYSTICKS', partNumber: 'Part Number: EHGR0020', price: '$0.00' }
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'Sub Kit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'Sub Kit - Base Cab/Platform, Link-Belt, Excavator, X4S Trimble-Ready', partNumber: 'Part Number: EGGR0004', price: '$921.05' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Subkit - Hydraulic, Link-Belt, Excavator, 170X4S, 190X4S', partNumber: 'Part Number: EGGJ0001', price: '$572.00' },
          { name: 'PRG - Hose, Link-Belt, Excavator, 170X4S, 190X4S', partNumber: 'Part Number: EGGJ0002', price: '$968.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM ', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },
  // 2D 260-300 Base to MC // 
  '2dmc-260-300': {
    title: '260/300 X4S 2DMC (Trimble Ready) Kit Part Number: EJGR0003',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable-Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W and Wi-Fi, Core HEX w/Link-Belt UI', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$175.00' },
          { name: 'KIT - 2DMG/MC JOYSTICKS', partNumber: 'Part Number: EHGR0020', price: '$0.00' }
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'Sub Kit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'Sub Kit - Base Cab/Platform, Link-Belt, Excavator, X4S Trimble-Ready', partNumber: 'Part Number: EGGR0004', price: '$921.05' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Sub-kit, Sumitomo / Link Belt, HEX, 210-X4', partNumber: 'Part Number: EHEJ0003', price: '$478.00' },
          { name: 'PKG-Hose, Sumitomo, Link Belt, Hex, 210 X4', partNumber: 'Part Number: EHEJ0001', price: '$653.25' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // 2D 220-270 Base to MC // 
  '2dmc-220-370': {
    title: '220/370 X4S Base to MC Upgrade - Kit Part Number: EHGR0032',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'Cable- Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'KIT - 2DMG/MC JOYSTICKS', partNumber: 'Part Number: EHGR0020', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Sub-kit, Sumitomo / Link Belt, HEX, 210-X4', partNumber: 'Part Number: EHEJ0003', price: '$478.00' },
          { name: 'PKG-Hose, Sumitomo, Link Belt, Hex, 210 X4', partNumber: 'Part Number: EHEJ0001', price: '$653.25' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // 2D 220-270 MG to MC Upgrade // 
  'mc-upgrade-220-370': {
    title: '220/260/300/370 X4S MG to MC Upgrade - Kit Part Number: EJGR0004',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'KIT - 2DMG/MC JOYSTICKS', partNumber: 'Part Number: EHGR0020', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Sub-kit, Sumitomo / Link Belt, HEX, 210-X4', partNumber: 'Part Number: EHEJ0003', price: '$478.00' },
          { name: 'PKG-Hose, Sumitomo, Link Belt, Hex, 210 X4', partNumber: 'Part Number: EHEJ0001', price: '$653.25' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 355 X4S Base to MC //
  '2dmc-355-x4s': {
    title: '355 X4S Base to MC Kit Part Number: EEDR0004',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link-Belt, Excavator, 355X4S', partNumber: 'Part Number: EEDJ0002', price: '$572.00' },
          { name: 'PKG - Hose, Link Belt, Excavator, 355X4S', partNumber: 'Part Number: EEDJ0003', price: '$968.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM ', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // 2D 355 MG to MC // 
  'mc-upgrade-355': {
    title: '355 X4S MG to MC Upgrade - Kit Part Number: EEDR0003',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link-Belt, Excavator, 355X4S', partNumber: 'Part Number: EEDJ0002', price: '$572.00' },
          { name: 'PKG - Hose, Link Belt, Excavator, 355X4S', partNumber: 'Part Number: EEDJ0003', price: '$968.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM ', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 2D MG Kit 220X4S //
  'mg-kit-advanced-220': {
    title: 'MG Kit for Advanced 220/370 X4S - Part Number: EHGR0031',
    note: 'Only 1 GS520 is required for MG on Advanced 220-X4',
    sections: [
      {
        title: 'MG Kit for Advanced 220 and 370 X4S',
        items: [
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'Cable- Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'SubKit - Base Cab/Platform, Link-Belt, Excavator, X4S Trimble-Ready, V3.0', partNumber: 'Part Number: EGGR0004', price: '$921.05' },
          { name: 'SubKit - Bucket Sensor Add-On, Excavator, V3.0', partNumber: 'Part Number: EHGR0015', price: '$287.95' },
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/ Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
          
        ],
      },
    ],
  },

  // 2D MG for ALL X4 //
  'all-x4': {
    title: 'All X4 MG Kit Part Number: EGER0026',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },
  
  // 145 X4 Base to MC
  '2dmc-145-x4': {
    title: '145 X4 Base to MC Kit Part Number: EBCR0008',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link Belt, 145-X4 with pattern changer', partNumber: 'Part Number: EBCJ0002', price: '$464.44' },
          { name: 'PKG-Hose, Link Belt, Hex, 145-X4', partNumber: 'Part Number: EBCJ0003', price: '$452.02' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // MG to MC 145X4 // 
  'mc-upgrade-145-x4': {
    title: '145 X4 MG to MC Upgrade - Kit Part Number: EBCR0007',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link Belt, 145-X4 with pattern changer', partNumber: 'Part Number: EBCJ0002', price: '$464.44' },
          { name: 'PKG-Hose, Link Belt, Hex, 145-X4', partNumber: 'Part Number: EBCJ0003', price: '$452.02' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 160X4 Base to MC
  '2dmc-160-x4': {
    title: '160 X4 Base to MC Kit Part Number: EGER0029',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link-Belt 160X4 and 350X4', partNumber: 'Part Number: EKEJ0015', price: '$478.00' },
          { name: 'PKG-Hose, Link Belt, Hex, 160 X4', partNumber: 'Part Number: EGEJ0001', price: '$683.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // MG to MC 160X4
  'mc-upgrade-160-x4': {
    title: '160 X4 MG to MC Upgrade Kit Part Number EGER0028',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link-Belt 160X4 and 350X4', partNumber: 'Part Number: EKEJ0015', price: '$478.00' },
          { name: 'PKG-Hose, Link Belt, Hex, 160 X4', partNumber: 'Part Number: EGEJ0001', price: '$683.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 245X4 Base to MC
  '2dmc-245-x4': {
    title: '245 X4 Base to MC Kit Part Number: ECCR0012',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link Belt, 245-X4', partNumber: 'Part Number: ECCJ0002', price: '$478.00' },
          { name: '	PKG-Hose, Link Belt, Hex, 245-X4', partNumber: 'Part Number: ECCJ0001', price: '$$683.00' },
          { name: 'Valve Assembly, Pilot, HRV, Generic, 2009', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // MG to MC 245X4 //
  'mc-upgrade-245-x4': {
    title: '245 X4 MG to MC Upgrade Kit Part Number: ECCR0011',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link Belt, 245-X4', partNumber: 'Part Number: ECCJ0002', price: '$478.00' },
          { name: '	PKG-Hose, Link Belt, Hex, 245-X4', partNumber: 'Part Number: ECCJ0001', price: '$$683.00' },
          { name: 'Valve Assembly, Pilot, HRV, Generic, 2009', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 210/300 X4 Base to MC //
  '2dmc-210-300-x4': {
    title: '210/300 X4 Base to MC Kit Part Number: EHER0026',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Sub-kit, Link Belt, HEX, 210-X4', partNumber: 'Part Number: EHEJ0003', price: '$478.00' },
          { name: 'PKG-Hose, Link Belt, Hex, 210 X4', partNumber: 'Part Number: EHEJ0001', price: '$$653.25' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // MG to MC 210/300 X4 //
  'mc-upgrade-210-300-x4': {
    title: '210/300 X4 MG to MC Upgrade Kit Part Number EHER0025',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'Sub-kit, Link Belt, HEX, 210-X4', partNumber: 'Part Number: EHEJ0003', price: '$478.00' },
          { name: 'PKG-Hose, Link Belt, Hex, 210 X4', partNumber: 'Part Number: EHEJ0001', price: '$$653.25' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 350/490 X4 Base to MC // 
  '2dmc-350-490-x4': {
    title: '350/490 X4 Base to MC Kit Part Number: EKER0022',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link-Belt 160X4 and 350X4', partNumber: 'Part Number: EKEJ0015', price: '$478.00' },
          { name: 'PKG - Hose, Link Belt, Excavator, 350-X4', partNumber: 'Part Number: EKEJ0014', price: '$683.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // MG to MC 350 X4 //
  'mc-upgrade-350-x4': {
    title: '350/490 X4 MG to MC Upgrade Kit Part Number EKER0021',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link-Belt 160X4 and 350X4', partNumber: 'Part Number: EKEJ0015', price: '$478.00' },
          { name: 'PKG - Hose, Link Belt, Excavator, 350-X4', partNumber: 'Part Number: EKEJ0014', price: '$683.00' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // 80 X3 Base to MC //
  '2dmc-80-x3': {
    title: '80 X3 Base to MC Kit Part Number: EDBR0002',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'Cable - Adapter, Display, EW V3.0', partNumber: 'Part Number: EGER0024', price: '$175.00' },
          { name: 'FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
          { name: 'FRU - Electronic Controller, EC520-W w/IMU and Wi-Fi, Core HEX w/UI, Link-Belt', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
          { name: 'FRU - Sensor Module, GS520', partNumber: 'Part Number: KHR52040', price: '$344.50' },
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Platform Linkage',
        items: [
          { name: 'SubKit - Base Arm Covered, Generic, Excavator, V3.0', partNumber: 'Part Number: EGER0004', price: '$833.95' },
          { name: 'SubKit - Base Cab/Platform, Generic, Excavator, V3.0, w/o Radio/Mast Mounting', partNumber: 'Part Number: EGER0025', price: '$1188.85' },
          { name: 'Sub Kit - Base Arm, Soft Splitter, Generic, Excavator, V3.0', partNumber: 'Part Number: 160015-537', price: '$1183.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link Belt, 80-X3 with pattern changer', partNumber: 'Part Number: EDBJ0001', price: '$915.85' },
          { name: 'PKG-Hose, Link Belt, Hex, 80-X3', partNumber: 'Part Number: EDBJ0002', price: '$535.60' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM ', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
      {
        title: 'Misceallenous Spare Parts',
        items: [
          { name: 'Bracket - Display, Magnetic Mount', partNumber: 'Part Number: EGER0005', price: '$345.80' },
          { name: 'Cable - Extension, Gel, 1M, 4 Pin Recp,4 Soc Plug', partNumber: 'Part Number: EGGR0006', price: '$32.70' },
          { name: 'Mount - RAM Ratchet Clamp + Ball, w/Hardware', partNumber: 'Part Number: EGER0006', price: '$91.00' },
        ],
      },
    ],
  },

  // MG to MC 80 X3
  'mc-upgrade-80-x3': {
    title: '80X3 MG to MC Upgrade Kit Part Number: EDBR0001',
    sections: [
      {
        title: 'Electronic Kits',
        items: [
          { name: 'FRU - Valve Module, VM510 w/Fasteners', partNumber: 'Part Number: EGER0008', price: '$458.25' },
          { name: 'Kit - Add-on, Remote Convenience Switch', partNumber: 'Part Number: ECCR0008', price: '$0.00' },
          { name: 'Kit - Add On, Switch Harness w/ CI520', partNumber: 'Part Number: EGER0027', price: '$0.00' },
        ],
      },
      {
        title: 'Hydraulic Kits',
        items: [
          { name: 'Kit - Add-on Auto, Generic, Excavator, Short Valve Cable, V3.0', partNumber: 'Part Number: EGER0010', price: '$631.15' },
          { name: 'SubKit - Hydraulic, Link Belt, 80-X3 with pattern changer', partNumber: 'Part Number: EDBJ0001', price: '$915.85' },
          { name: 'PKG-Hose, Link Belt, Hex, 80-X3', partNumber: 'Part Number: EDBJ0002', price: '$535.60' },
          { name: 'Valve Assembly, Pilot, HEX, Generic, OEM ', partNumber: 'Part Number: EGGJ0003', price: '$1235.00' },
        ],
      },
    ],
  },

  // All Laser Catcher X4 and 80 X3 // 
  'laser-catcher-x4': {
    title: 'Laser Catcher for X4 Models, Kit Part Number: EGER0023 ',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'FRU - Laser Catcher, LC510', partNumber: 'Part Number: EGGR0022', price: '$540.80' },
        ],
      },
      {
        title: 'Add-On Kits',
        items: [
          { name: 'Kit - Add-On Laser Catcher, Generic, Excavator, V3.0', partNumber: 'Part Number: EGGR0015', price: '$157.95' },
        ],
      },
    ],
  },

  // All Laser Catcher X4S // 
  'laser-catcher-x4s': {
    title: 'Laser Catcher for X4 Models, Kit Part Number: EGER0024 ',
    sections: [
      {
        title: 'Electronic FRUs',
        items: [
          { name: 'FRU - Laser Catcher, LC510', partNumber: 'Part Number: EGGR0022', price: '$540.80' },
        ],
      },
      {
        title: 'Add-On Kits',
        items: [
          { name: 'Cable - Adaptor, 4 Pin Recp - 6 Soc Recp ', partNumber: 'Part Number: EGGR0009', price: '$37.05' },
        ],
      },
    ],
  },

  // EC520 //
  'ec520': {
    title: 'EC520, Part Number EGGR0001 ',
    sections: [
      {
        title: 'EC520',
        items: [
          { name: 'FRU - Electronic Controller, EC520-W and Wi-Fi, Core HEX w/Link-Belt UI', partNumber: 'Part Number: EGGR0001', price: '$2885.35' },
        ],
      },
    ],
  },

  // TD540 //
  'td540': {
    title: 'TD540, Part Number KHR75680 ',
    sections: [
      {
        title: 'TD540',
        items: [
          { name: '	FRU - 10" Touch Display, TD540-W w/Wi-Fi', partNumber: 'Part Number: KHR75680', price: '$2495.00' },
        ],
      },
    ],
  },
};

interface StoreModalProps {
  productKey: string;
  label: string;
  onClose: () => void;
}

export function StoreModal({ productKey, label, onClose }: StoreModalProps) {
  const data = STORE_DATA[productKey];
  const { addItems } = useCart();

  // Flat list of all items in this product, keyed by name
  const allItems: StoreItem[] = data ? data.sections.flatMap((s) => s.items) : [];
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(allItems.map((item) => {
      const isGS520 = item.name.includes('FRU - Sensor Module, GS520');
      const defaultQty = isGS520 && productKey !== 'mg-kit-advanced-220' ? 3 : 1;
      return [item.name, defaultQty];
    }))
  );
  const [added, setAdded] = useState(false);

  if (!data) return null;

  function setQty(name: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(0, (prev[name] ?? 0) + delta),
    }));
    setAdded(false);
  }

  function handleAddToCart() {
    const toAdd = allItems
      .filter((item) => (quantities[item.name] ?? 0) > 0)
      .map((item) => ({
        productKey,
        productTitle: data.title,
        name: item.name,
        partNumber: item.partNumber,
        price: item.price,
        quantity: quantities[item.name],
      }));
    if (toAdd.length === 0) return;
    addItems(toAdd);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0);

  const AddToCartButton = ({ size = 'normal' }: { size?: 'normal' | 'small' }) => (
    <button
      onClick={handleAddToCart}
      disabled={totalSelected === 0}
      className={`flex items-center gap-1.5 font-semibold rounded transition-colors
        ${size === 'small' ? 'text-[11px] px-3 py-1.5' : 'text-sm px-4 py-2'}
        ${totalSelected === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : added
            ? 'bg-green-600 text-white'
            : 'bg-red-600 hover:bg-red-500 text-white'
        }`}
    >
      {added ? <Check size={size === 'small' ? 11 : 14} /> : <ShoppingCart size={size === 'small' ? 11 : 14} />}
      {added ? 'Added!' : totalSelected > 0 ? `Add ${totalSelected} to Cart` : 'ADD TO CART'}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* App chrome header */}
        <div className="flex items-center justify-between px-5 py-4 bg-neutral-950 border-b border-neutral-800 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-red-500 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <span className="text-sm font-medium text-white">{label}</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Trimble Store content */}
        <div className="overflow-y-auto bg-[#d8d8d8] flex-1">
          {/* Breadcrumb + top ADD TO CART */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <p className="text-[11px] text-gray-500">
              Trimble OEM · LBX · {data.title}
            </p>
            <AddToCartButton size="small" />
          </div>

          {data.note && (
            <p className="px-5 pb-2 text-xs text-gray-600 italic">{data.note}</p>
          )}

          {/* Sections */}
          <div className="px-5 pb-4 space-y-3">
            {data.sections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-sm font-bold text-gray-800">{section.title}</h3>
                  <span className="text-[9px] text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none shrink-0">
                    i
                  </span>
                </div>
                <div className="bg-white border border-gray-300 rounded overflow-hidden">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-2.5 ${
                        i > 0 ? 'border-t border-gray-200' : ''
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        {item.note && (
                          <p className="text-[11px] text-gray-500 mb-0.5 leading-snug">
                            {item.note}
                          </p>
                        )}
                        <p className="text-sm text-red-700 font-medium">{item.name}</p>
                        {item.partNumber && (
                          <p className="text-[11px] text-gray-500 mt-0.5">{item.partNumber}</p>
                        )}
                      </div>
                      {item.price && (
                        <p className="text-sm text-gray-700 font-medium whitespace-nowrap shrink-0">
                          {item.price}
                        </p>
                      )}
                      <div className="flex items-center border border-gray-400 rounded shrink-0">
                        <button
                          onClick={() => setQty(item.name, -1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 text-xs"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs text-gray-700 border-x border-gray-400 min-w-[24px] text-center">
                          {quantities[item.name] ?? 0}
                        </span>
                        <button
                          onClick={() => setQty(item.name, 1)}
                          className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-300">
            <button className="text-xs text-red-700 hover:underline">Back to Top</button>
            <AddToCartButton size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}