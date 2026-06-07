import React, { useState } from 'react';
import { Product } from '../types';
import { Shield, FileDown, Search, ArrowRight, Table, Settings, Wrench, FileText, Check, Plus, HelpCircle } from 'lucide-react';

interface TechnicalCatalogProps {
  onAddToQuote: (product: Product, size: string, grade: string, qty: number) => void;
  addedProductIds: string[];
}

interface FittingDimension {
  nominalSize: string;
  cells: string[];
}

export default function TechnicalCatalog({ onAddToQuote, addedProductIds }: TechnicalCatalogProps) {
  const [selectedFitting, setSelectedFitting] = useState<string>('equal-tee');
  const [selectedGrade, setSelectedGrade] = useState<string>('SS316L (Hygienic)');
  const [quantity, setQuantity] = useState<number>(50);
  const [addedItemFeedback, setAddedItemFeedback] = useState<string | null>(null);

  // Technical dataset holding precise values as per the manufacturer's BS 4825-2 scan
  const fittingData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    standard: string;
    headers: string[];
    variables: { symbol: string; label: string }[];
    dimensions: FittingDimension[];
  }> = {
    'equal-tee': {
      title: 'Equal Tee',
      subtitle: 'As Per BS4825-2 Standard',
      description: 'The standard Equal Tee specifies uniform branching dimensions with high-integrity tube walls. Widely used in sterile and sanitary pipelines to maintain symmetric split rates and minimize friction resistance.',
      standard: 'BS 4825 : Part 2 (Hygienic Tube Fittings)',
      headers: ['D (in)', 'T (mm)', 'D (mm)', 'L (mm)', 'I (mm)'],
      variables: [
        { symbol: 'D (in)', label: 'Nominal pipe size in inches' },
        { symbol: 'T (mm)', label: 'Wall pipe thickness' },
        { symbol: 'D (mm)', label: 'Outside diameter of the pipe' },
        { symbol: 'L (mm)', label: 'Total line length' },
        { symbol: 'I (mm)', label: 'Center-to-Face flow length' }
      ],
      dimensions: [
        { nominalSize: '1/2"', cells: ['1/2"', '1.65', '12.7', '57.2', '28.6'] },
        { nominalSize: '3/4"', cells: ['3/4"', '1.65', '19.05', '57.2', '28.6'] },
        { nominalSize: '1"', cells: ['1"', '1.65', '25.4', '57.2', '28.6'] },
        { nominalSize: '1-1/2"', cells: ['1-1/2"', '1.65', '38.1', '84.1', '42.1'] },
        { nominalSize: '2"', cells: ['2"', '1.65', '50.8', '104.8', '52.4'] },
        { nominalSize: '2-1/2"', cells: ['2-1/2"', '1.65', '63.5', '117.5', '58.8'] },
        { nominalSize: '3"', cells: ['3"', '1.65', '76.2', '131.8', '65.9'] }
      ]
    },
    'unequal-tee': {
      title: 'Un Equal Tee',
      subtitle: 'As Per BS4825-2 Standard',
      description: 'Reducing branch configuration where branch outlet dimensions (d) are smaller than main transit tube dimensions (D). Specially formulated to govern safe branch drop pressures.',
      standard: 'BS 4825 : Part 2 (Hygienic Tube Fittings)',
      headers: ['Dxd (in)', 'D (mm)', 'd (mm)', 'A (mm)', 'B (mm)'],
      variables: [
        { symbol: 'Dxd (in)', label: 'Nominal pipe main run and branch sizes' },
        { symbol: 'D (mm)', label: 'Main run pipeline outside diameter' },
        { symbol: 'd (mm)', label: 'Branch connection outside diameter' },
        { symbol: 'A (mm)', label: 'Main flow Center-to-Face length' },
        { symbol: 'B (mm)', label: 'Branch Connection Center-to-Face' }
      ],
      dimensions: [
        { nominalSize: '3/4" x 1/2"', cells: ['3/4"x1/2"', '19.05', '12.7', '50.8', '50.8'] },
        { nominalSize: '1" x 1/2"', cells: ['1"x1/2"', '25.4', '12.7', '53.98', '53.98'] },
        { nominalSize: '1" x 3/4"', cells: ['1"x3/4"', '25.4', '19.05', '53.98', '53.98'] },
        { nominalSize: '1-1/2" x 1/2"', cells: ['1-1/2"x1/2"', '38.1', '12.7', '60.33', '60.33'] },
        { nominalSize: '1-1/2" x 3/4"', cells: ['1-1/2"x3/4"', '38.1', '19.05', '60.33', '60.33'] },
        { nominalSize: '1-1/2" x 1"', cells: ['1-1/2"x1"', '38.1', '25.4', '60.33', '60.33'] },
        { nominalSize: '2" x 1/2"', cells: ['2"x1/2"', '50.8', '12.7', '73.03', '66.68'] },
        { nominalSize: '2" x 3/4"', cells: ['2"x3/4"', '50.8', '19.05', '73.03', '66.68'] },
        { nominalSize: '2" x 1"', cells: ['2"x1"', '50.8', '25.4', '73.03', '66.68'] },
        { nominalSize: '2" x 1-1/2"', cells: ['2"x1-1/2"', '50.8', '38.1', '73.03', '66.68'] },
        { nominalSize: '2-1/2" x 1/2"', cells: ['2-1/2"x1/2"', '63.5', '12.7', '79.38', '73.03'] },
        { nominalSize: '2-1/2" x 3/4"', cells: ['2-1/2"x3/4"', '63.5', '19.05', '79.38', '73.03'] }
      ]
    },
    '90-bend': {
      title: '90° Bend',
      subtitle: 'As Per BS4825-2 Standard',
      description: 'Manufactured with smooth high-precision 90-degree curvature centerline configurations. Eliminates flow turbulence and facilitates easy clean-in-place sanitary guidelines.',
      standard: 'BS 4825 : Part 2 (Hygienic Tube Fittings)',
      headers: ['D (in)', 'T (mm)', 'D (mm)', 'L (mm)', 'R (mm)'],
      variables: [
        { symbol: 'D (in)', label: 'Nominal branch size in inches' },
        { symbol: 'T (mm)', label: 'Hygienic metal wall thickness' },
        { symbol: 'D (mm)', label: 'Outside diameter of the pipe' },
        { symbol: 'L (mm)', label: 'Center-to-Face length dimension' },
        { symbol: 'R (mm)', label: 'Concentric centerline bend radius' }
      ],
      dimensions: [
        { nominalSize: '1"', cells: ['1"', '1.65', '25.4', '65', '38.1'] },
        { nominalSize: '1-1/2"', cells: ['1-1/2"', '1.65', '38.1', '85', '57.15'] },
        { nominalSize: '2"', cells: ['2"', '1.65', '50.8', '110', '76.2'] },
        { nominalSize: '2-1/2"', cells: ['2-1/2"', '1.65', '63.5', '135', '95.25'] },
        { nominalSize: '3"', cells: ['3"', '1.65', '76.2', '155', '114.3'] },
        { nominalSize: '4"', cells: ['4"', '2', '101.6', '195', '152.4'] }
      ]
    },

    'concentric-reducer': {
      title: 'Concentric Reducer',
      subtitle: 'As Per BS4825-2 Standard',
      description: 'Engineered symmetrical cones that transition outer pipes on a aligned centerline axis. Ensures sterile laminar fluid velocity profile transitions and minimal pressure surges.',
      standard: 'BS 4825 : Part 2 (Hygienic Tube Fittings)',
      headers: ['X (Large)', 'Y (Small)', 'L2 (mm)', 'L3 (mm)', 'L4 (mm)'],
      variables: [
        { symbol: 'X', label: 'Large end inlet nominal size in inches' },
        { symbol: 'Y', label: 'Small end outlet nominal size in inches' },
        { symbol: 'L2 (mm)', label: 'Sloped conical reduction run thickness' },
        { symbol: 'L3 (mm)', label: 'Straight cylindrical pipe run length' },
        { symbol: 'L4 (mm)', label: 'Hygienic end weld length' }
      ],
      dimensions: [
        { nominalSize: '3/4" x 1/2"', cells: ['3/4"', '1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1" x 1/2"', cells: ['1"', '1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1" x 3/4"', cells: ['1"', '3/4"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1-1/2" x 3/4"', cells: ['1-1/2"', '3/4"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1-1/2" x 1"', cells: ['1-1/2"', '1"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2" x 1"', cells: ['2"', '1"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2" x 1-1/2"', cells: ['2"', '1-1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2-1/2" x 1-1/2"', cells: ['2-1/2"', '1-1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2-1/2" x 2"', cells: ['2-1/2"', '2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '3" x 1-1/2"', cells: ['3"', '1-1/2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '3" x 2"', cells: ['3"', '2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '3" x 2-1/2"', cells: ['3"', '2-1/2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '4" x 2"', cells: ['4"', '2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '4" x 2-1/2"', cells: ['4"', '2-1/2"', '28.58', '25.4', '38.1'] }
      ]
    },
    'eccentric-reducer': {
      title: 'Eccentric Reducer',
      subtitle: 'As Per BS4825-2 Standard',
      description: 'Asymmetric flat-bottom design constructed to keep pipelines in horizontal alignment. Completely avoids gravity pool fluid accumulation or vapor trap formation.',
      standard: 'BS 4825 : Part 2 (Hygienic Tube Fittings)',
      headers: ['X (Large)', 'Y (Small)', 'L2 (mm)', 'L3 (mm)', 'L4 (mm)'],
      variables: [
        { symbol: 'X', label: 'Large end inlet nominal size in inches' },
        { symbol: 'Y', label: 'Small end outlet nominal size in inches' },
        { symbol: 'L2 (mm)', label: 'Sloped conical reduction run thickness' },
        { symbol: 'L3 (mm)', label: 'Straight cylindrical pipe run length' },
        { symbol: 'L4 (mm)', label: 'Hygienic end weld length' }
      ],
      dimensions: [
        { nominalSize: '3/4" x 1/2"', cells: ['3/4"', '1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1" x 1/2"', cells: ['1"', '1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1" x 3/4"', cells: ['1"', '3/4"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1-1/2" x 3/4"', cells: ['1-1/2"', '3/4"', '28.58', '25.4', '25.4'] },
        { nominalSize: '1-1/2" x 1"', cells: ['1-1/2"', '1"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2" x 1"', cells: ['2"', '1"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2" x 1-1/2"', cells: ['2"', '1-1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2-1/2" x 1-1/2"', cells: ['2-1/2"', '1-1/2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '2-1/2" x 2"', cells: ['2-1/2"', '2"', '28.58', '25.4', '25.4'] },
        { nominalSize: '3" x 1-1/2"', cells: ['3"', '1-1/2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '3" x 2"', cells: ['3"', '2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '3" x 2-1/2"', cells: ['3"', '2-1/2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '4" x 2"', cells: ['4"', '2"', '28.58', '25.4', '38.1'] },
        { nominalSize: '4" x 2-1/2"', cells: ['4"', '2-1/2"', '28.58', '25.4', '38.1'] }
      ]
    }
  };

  const handleQuickAdd = (row: FittingDimension) => {
    let productId = 'ss-equal-tee';
    let productName = 'SS Equal Tee';
    
    if (selectedFitting === 'equal-tee') {
      productId = 'ss-equal-tee';
      productName = 'SS Equal Tee';
    } else if (selectedFitting === 'unequal-tee') {
      productId = 'ss-reducing-tee';
      productName = 'SS Reducing Tee';
    } else if (selectedFitting === '90-bend') {
      productId = 'ss-bend';
      productName = 'SS 90° Bend';
    } else if (selectedFitting === 'concentric-reducer') {
      productId = 'ss-concentric-reducer';
      productName = 'SS Concentric Reducer';
    } else if (selectedFitting === 'eccentric-reducer') {
      productId = 'ss-eccentric-reducer';
      productName = 'SS Eccentric Reducer';
    }

    const dummyProduct: Product = {
      id: productId,
      name: productName,
      category: selectedFitting.includes('tee') ? 'Tee' : selectedFitting.includes('reducer') ? 'Reducer' : 'Elbow & Bend',
      description: `Precision pipe fitting manufactured as per standard BS 4825 Part 2. Size: ${row.nominalSize}.`,
      longDescription: `Sindo Engineering manufactures top-tier standard BS 4825-2 Stainless Steel components. Tested against extreme burst and sanitary requirements.`,
      imageSeed: productId,
      specifications: {
        sizeRange: '1/2" to 4"',
        grades: ['SS316L', 'SS304L'],
        standards: ['BS 4825-2', 'ASME B16.9']
      },
      features: [
        'Sanitary interior polish (Ra < 0.8 µm)',
        'Full material traceback available',
        'Strict conformance to ISO 9001 quality guidelines'
      ]
    };

    onAddToQuote(dummyProduct, row.nominalSize, selectedGrade, quantity);
    
    setAddedItemFeedback(row.nominalSize);
    setTimeout(() => {
      setAddedItemFeedback(null);
    }, 1500);
  };

  // Helper to render interactive blueprint graphic for each selected fitting
  const renderBlueprint = () => {
    switch (selectedFitting) {
      case 'equal-tee':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] bg-slate-900 border border-slate-800 rounded-2xl block select-none">
            {/* Grid Pattern Overlay */}
            <defs>
              <pattern id="blueGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueGrid)" />
            
            {/* Title Block inside blueprint */}
            <text x="25" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-widest">DRWG NO: SINDO-T-BS4825</text>
            <text x="25" y="55" className="fill-slate-400 font-bold font-sans text-xs">EQUAL TEES WITH BUTT WELD PREPARATION</text>
            
            {/* Outline of Equal Tee (Technical representation) */}
            <g transform="translate(45, 10)" className="stroke-blue-400 fill-blue-950/20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Outer boundary */}
              <path d="M 60,60 L 240,60 L 240,110 L 175,110 L 175,190 L 125,190 L 125,110 L 60,110 Z" />
              {/* Inside dotted paths/lines showing hollow channel */}
              <path d="M 60,85 L 240,85" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
              <path d="M 150,85 L 150,190" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            </g>

            {/* Dimension Lines, Arrow Heads and Variable tags */}
            {/* Dimension for Outer Diameter 'D' (Main Run) */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              {/* Diameter D Line */}
              <line x1="75" y1="50" x2="75" y2="140" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="90" y1="70" x2="90" y2="120" />
              <polygon points="90,70 87,76 93,76" />
              <polygon points="90,120 87,114 93,114" />
              <text x="100" y="100" stroke="none" className="font-bold">D (O.D.)</text>
            </g>

            {/* Dimension for Overall Length 'L' */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="105" y1="220" x2="105" y2="60" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="285" y1="220" x2="285" y2="60" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="105" y1="225" x2="285" y2="225" />
              <polygon points="105,225 111,222 111,228" />
              <polygon points="285,225 279,222 279,228" />
              <text x="180" y="242" stroke="none" textAnchor="middle" className="font-bold">L (Overall Length)</text>
            </g>

            {/* Dimension for Branch height Center-to-face 'I' */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="195" y1="95" x2="315" y2="95" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="170" y1="200" x2="315" y2="200" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="310" y1="95" x2="310" y2="200" />
              <polygon points="310,95 307,101 313,101" />
              <polygon points="310,200 307,194 313,194" />
              <text x="322" y="153" stroke="none" className="font-bold">I (Center-Face)</text>
            </g>

            {/* Technical Labels */}
            <text x="210" y="270" className="fill-blue-400/90 font-mono text-[9px]">Material: SS316L / SS304L (UNS S31603 / S30403)</text>
            <text x="375" y="40" className="fill-emerald-500 font-mono text-[10px] font-bold uppercase tracking-wide" textAnchor="end">✓ FULLY COMPLIANT EN 10204 3.1</text>
          </svg>
        );

      case 'unequal-tee':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] bg-slate-900 border border-slate-800 rounded-2xl block select-none">
            <defs>
              <pattern id="blueGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueGrid)" />
            <text x="25" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-widest">DRWG NO: SINDO-UT-BS4825</text>
            <text x="25" y="55" className="fill-slate-400 font-bold font-sans text-xs">UN-EQUAL (REDUCING) HYGIENIC TEES</text>

            {/* Unequal Tee Outer outline in upward-pointing orientation (as scanned in datasheet) */}
            <path 
              d="M 100,200 L 300,200 L 300,140 L 220,140 L 220,70 L 180,70 L 180,140 L 100,140 Z" 
              className="stroke-blue-400 fill-blue-950/20" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Hollow channels inside the tee */}
            <path d="M 100,170 L 300,170" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            <path d="M 200,170 L 200,70" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />

            {/* Main Run Diameter D */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="100" y1="140" x2="70" y2="140" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="100" y1="200" x2="70" y2="200" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="75" y1="140" x2="75" y2="200" />
              <polygon points="75,140 72,146 78,146" />
              <polygon points="75,200 72,194 78,194" />
              <text x="52" y="174" stroke="none" textAnchor="middle" className="font-bold">D</text>
            </g>

            {/* Branch Diameter d */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="180" y1="70" x2="180" y2="45" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="220" y1="70" x2="220" y2="45" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="180" y1="50" x2="220" y2="50" />
              <polygon points="180,50 186,47 186,53" />
              <polygon points="220,50 214,47 214,53" />
              <text x="200" y="38" stroke="none" textAnchor="middle" className="font-bold">d</text>
            </g>

            {/* Main Run Center-to-face A */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="100" y1="200" x2="100" y2="235" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="200" y1="200" x2="200" y2="235" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="100" y1="230" x2="200" y2="230" />
              <polygon points="100,230 106,227 106,233" />
              <polygon points="200,230 194,227 194,233" />
              <text x="150" y="246" stroke="none" textAnchor="middle" className="font-bold">A</text>
            </g>

            {/* Branch Center-to-face B */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="220" y1="70" x2="255" y2="70" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="220" y1="170" x2="255" y2="170" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="250" y1="70" x2="250" y2="170" />
              <polygon points="250,70 247,76 253,76" />
              <polygon points="250,170 247,164 253,164" />
              <text x="268" y="124" stroke="none" textAnchor="middle" className="font-bold">B</text>
            </g>

            <text x="210" y="275" className="fill-blue-400/90 font-mono text-[9px]">Calculated branch volume ratios prevent localized pipeline air-locks</text>
            <text x="375" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-wide" textAnchor="end">ACCURATE BUTTWELD ENDS</text>
          </svg>
        );

      case '90-bend':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] bg-slate-900 border border-slate-800 rounded-2xl block select-none">
            <defs>
              <pattern id="blueGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueGrid)" />
            <text x="25" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-widest">DRWG NO: SINDO-B90-BS4825</text>
            <text x="25" y="55" className="fill-slate-400 font-bold font-sans text-xs">90° BEND WITH SMOOTH SANITARY HOLLOW CORES</text>

            {/* Smooth curve drawing representing 90° bend */}
            <g transform="translate(100, 70)" className="stroke-blue-400 fill-none" strokeWidth="2.5" strokeLinecap="round">
              {/* Outer Arc */}
              <path d="M 0,160 L 0,130 A 130,130 0 0,1 130,0 L 160,0" />
              {/* Inner Arc */}
              <path d="M 35,160 L 35,130 A 95,95 0 0,1 130,35 L 160,35" />
              {/* Port Caps to close the fitting boundary representing walls */}
              <line x1="0" y1="160" x2="35" y2="160" className="stroke-blue-400" strokeWidth="2.5" />
              <line x1="160" y1="0" x2="160" y2="35" className="stroke-blue-400" strokeWidth="2.5" />
              
              {/* Center lines */}
              <path d="M 17.5,160 L 17.5,130 A 112.5,112.5 0 0,1 130,17.5 L 160,17.5" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Angle sign */}
              <path d="M 45,110 A 35,35 0 0,1 110,45" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="75" y="80" className="fill-amber-500 font-mono font-bold text-xs">90°</text>
            </g>

            {/* Diameter D */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="100" y1="240" x2="135" y2="240" />
              <polygon points="100,240 106,237 106,243" />
              <polygon points="135,240 129,237 129,243" />
              <text x="117" y="255" stroke="none" textAnchor="middle" className="font-bold">D (O.D.)</text>
            </g>

            {/* Center-to-Face Long Radius L */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="117.5" y1="230" x2="117.5" y2="87.5" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              {/* Corner reference point finder */}
              <line x1="117.5" y1="87.5" x2="260" y2="87.5" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="117.5" y1="87.5" x2="188.5" y2="87.5" />
              <polygon points="117.5,87.5 123.5,84.5 123.5,90.5" />
              <polygon points="188.5,87.5 182.5,84.5 182.5,90.5" />
              <text x="153" y="102" stroke="none" textAnchor="middle" className="font-bold">L (R)</text>
            </g>

            <text x="210" y="270" className="fill-blue-400/90 font-mono text-[9px]">Cold bend technology guarantees zero wrinkles or micro-fissures</text>
            <text x="375" y="40" className="fill-emerald-500 font-mono text-[10px] font-bold uppercase tracking-wide" textAnchor="end">HIGH CURVATURE CONFORMITY</text>
          </svg>
        );



      case 'concentric-reducer':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] bg-slate-900 border border-slate-800 rounded-2xl block select-none">
            <defs>
              <pattern id="blueGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueGrid)" />
            <text x="25" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-widest">DRWG NO: SINDO-CR-BS4825</text>
            <text x="25" y="55" className="fill-slate-400 font-bold font-sans text-xs">CONCENTRIC REDUCERS (SYMMETRICAL TYPE)</text>

            <g transform="translate(110, 80)" className="stroke-blue-400 fill-blue-950/20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0,20 L 50,20 L 130,50 L 180,50 L 180,90 L 130,90 L 50,120 L 0,120 Z" />
              {/* Center flow line */}
              <path d="M 0,70 L 180,70" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
            </g>

            {/* Large End Diameter D */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="95" y1="100" x2="95" y2="200" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="110" y1="100" x2="110" y2="200" />
              <polygon points="110,100 107,106 113,106" />
              <polygon points="110,200 107,194 113,194" />
              <text x="65" y="153" stroke="none" className="font-bold">D (Large)</text>
            </g>

            {/* Small End Diameter d */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="290" y1="130" x2="290" y2="170" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="300" y1="130" x2="300" y2="170" />
              <polygon points="300,130 297,136 303,136" />
              <polygon points="300,170 297,164 303,164" />
              <text x="310" y="153" stroke="none" className="font-bold">d (Small)</text>
            </g>

            {/* Overall length A */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="110" y1="220" x2="110" y2="170" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="290" y1="220" x2="290" y2="170" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="110" y1="225" x2="290" y2="225" />
              <polygon points="110,225 116,222 116,228" />
              <polygon points="290,225 284,222 284,228" />
              <text x="200" y="242" stroke="none" textAnchor="middle" className="font-bold">A (Overall Length)</text>
            </g>

            <text x="210" y="270" className="fill-blue-400/90 font-mono text-[9px]">Symmetrical lines eliminate pocket formulation inside vertical flow systems</text>
            <text x="375" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-wide" textAnchor="end">PRECISION HYDROFORMED</text>
          </svg>
        );

      case 'eccentric-reducer':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px] bg-slate-900 border border-slate-800 rounded-2xl block select-none">
            <defs>
              <pattern id="blueGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueGrid)" />
            <text x="25" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-widest">DRWG NO: SINDO-ER-BS4825</text>
            <text x="25" y="55" className="fill-slate-400 font-bold font-sans text-xs">ECCENTRIC REDUCERS (FLAT-BOTTOM ONE SIDE TYPE)</text>

            <g transform="translate(110, 80)" className="stroke-blue-400 fill-blue-950/20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Asymmetrical boundary where bottom edge is perfectly flat */}
              <path d="M 0,20 L 50,20 L 130,50 L 180,50 L 180,120 L 0,120 Z" />
              <path d="M 0,70 L 180,85" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.2" strokeDasharray="3,3" fill="none" />
            </g>

            {/* Large End Diameter D */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="95" y1="100" x2="95" y2="200" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="110" y1="100" x2="110" y2="200" />
              <polygon points="110,100 107,106 113,106" />
              <polygon points="110,200 107,194 113,194" />
              <text x="65" y="153" stroke="none" className="font-bold">D (Large)</text>
            </g>

            {/* Small End Diameter d */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="290" y1="130" x2="290" y2="200" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="300" y1="130" x2="300" y2="200" />
              <polygon points="300,130 297,136 303,136" />
              <polygon points="300,200 297,194 303,194" />
              <text x="310" y="168" stroke="none" className="font-bold">d (Small)</text>
            </g>

            {/* Overall length A */}
            <g className="stroke-amber-500 fill-amber-500 text-[11px] font-mono" strokeWidth="1">
              <line x1="110" y1="220" x2="110" y2="170" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="290" y1="220" x2="290" y2="170" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="2,2" />
              <line x1="110" y1="225" x2="290" y2="225" />
              <polygon points="110,225 116,222 116,228" />
              <polygon points="290,225 284,222 284,228" />
              <text x="200" y="242" stroke="none" textAnchor="middle" className="font-bold">A (Overall Length)</text>
            </g>

            <text x="210" y="270" className="fill-blue-400/90 font-mono text-[9px]">Flat-bottom one side prevents trapped vapor pockets in horizontal pipes</text>
            <text x="375" y="40" className="fill-blue-500 font-mono text-[10px] font-bold uppercase tracking-wide" textAnchor="end">FLAT BOTTOM DESIGN</text>
          </svg>
        );

      default:
        return null;
    }
  };

  const currentFittingDetails = fittingData[selectedFitting];

  return (
    <section id="bs-catalog" className="py-24 bg-slate-900 text-white border-t border-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 border border-blue-500/20">
            <Settings className="w-3.5 h-3.5 text-blue-400" /> Technical Resource Center
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">BS 4825-2 Engineering Catalog</h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Sindo Engineering products are fully aligned with the British Standard BS 4825 Part 2 sanitary specification. Browse real-time engineering blueprints, verify standard physical tolerances, and configure precise designs to add directly to your RFQ quote list.
          </p>
        </div>

        {/* Outer Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column A: Left Action Tabs & Technical Diagram (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Nav pills for picking standard fitting */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mb-2">Select Piping Category</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {Object.entries(fittingData).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedFitting(key);
                    }}
                    className={`px-4 py-3 rounded-xl font-bold text-xs text-left uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer border ${
                      selectedFitting === key 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span>{data.title}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${selectedFitting === key ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Interactive SVG Graphic representation box */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Blueprint Schematic</span>
                <span className="text-[10px] text-amber-500 font-mono">Dimension Labels: D, d, T, L, I, A, B, R, L2, L3, L4</span>
              </div>
              
              {renderBlueprint()}
              
              <p className="text-[11px] text-slate-500 font-sans italic text-center leading-normal px-2">
                *Dimension sketches represent nominal geometric layouts for mechanical visualization. Sourced as per standard British Specifications.
              </p>
            </div>

          </div>

          {/* Column B: Right Specs list & Dynamic dimensions grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Info details panel */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                  {currentFittingDetails.standard}
                </span>
                <h3 className="text-2xl font-bold text-white mt-3.5">{currentFittingDetails.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">{currentFittingDetails.description}</p>
              </div>

              {/* Math / Spec helper parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800">
                {currentFittingDetails.variables.map((variable) => (
                  <div key={variable.symbol} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/40 text-[10px] font-mono">
                    <span className="text-amber-500 font-bold block mb-0.5 text-center">{variable.symbol}</span>
                    <span className="text-slate-400 leading-normal block text-[9px] text-center">{variable.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimension Matrix Grid Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl animate-fade-in">
              <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                <span className="text-xs font-bold uppercase tracking-widest font-mono text-slate-300 flex items-center gap-1.5">
                  <Table className="w-4 h-4 text-blue-500" /> Dimension Master Matrix Table
                </span>
                <span className="text-[10px] font-mono text-slate-500">Unit of measure: Millimeters (mm) / Inches (in)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-850 text-[11px] font-mono text-slate-400 text-center">
                      {currentFittingDetails.headers.map((hdr, hIdx) => (
                        <th key={hIdx} className="p-3.5 font-semibold text-center first:text-left">{hdr}</th>
                      ))}
                      <th className="p-3.5 font-semibold text-center">Add to Quotation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFittingDetails.dimensions.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="border-b border-slate-850 hover:bg-slate-900/50 transition-colors text-slate-300 text-center"
                      >
                        {row.cells.map((cell, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`p-3.5 font-mono ${
                              cIdx === 0 
                                ? 'font-bold text-white font-sans text-left text-sm' 
                                : 'text-slate-400'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                        
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleQuickAdd(row)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1 cursor-pointer ${
                              addedItemFeedback === row.nominalSize
                                ? 'bg-emerald-600 text-white'
                                : 'bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 hover:border-blue-500'
                            }`}
                          >
                            {addedItemFeedback === row.nominalSize ? (
                              <>
                                <Check className="w-3 h-3" /> Added!
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" /> Add to RFQ
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Configure defaults bar inside table */}
              <div className="bg-slate-900 p-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans">
                <div className="flex gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Material Grade for RFQ</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-slate-300 rounded p-1 text-xs focus:outline-none focus:border-blue-500 font-sans cursor-pointer"
                    >
                      <option value="SS316L (Hygienic)">SS316L (Pharm / Sterile)</option>
                      <option value="SS304L (Standard sanitary)">SS304L (Hygienic standard)</option>
                      <option value="SS316 (Acid Resistant)">SS316 (Chemical grade)</option>
                      <option value="SS304 (General use)">SS304 (Corrosion resistant)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Batch Qty (pcs)</label>
                    <input
                      type="number"
                      min="10"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-16 bg-slate-950 border border-slate-800 text-slate-300 rounded p-1 text-xs focus:outline-none focus:border-blue-500 font-mono text-center"
                    />
                  </div>
                </div>

                <div className="text-slate-400 text-[11px] leading-relaxed max-w-xs text-right sm:text-left self-end">
                  <span className="text-emerald-400 font-bold block mb-0.5">● Dynamic Engineering Hook</span>
                  Select pre-configured BS 4825-2 products to bundle direct into the active quotation cart seamlessly.
                </div>
              </div>

            </div>

            {/* QA Guidelines certification Block */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Chemical Conformance</h4>
                  <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Sulfur levels strictly maintained between 0.005% and 0.017% to meet hygienic orbital welding standards.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Ra roughness tolerances</h4>
                  <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Internal finish limits Ra &lt; 0.8 µm (Standard) or Ra &lt; 0.4 µm (Electropolished) matching ASME BPE specifications.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
