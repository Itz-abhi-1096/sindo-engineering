import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'ss-tee',
    name: 'SS Tee',
    category: 'Tee',
    description: 'Highly durable T-shaped pipe fitting with three ports for branching pipelines.',
    longDescription: 'Sindo Engineering manufactures top-grade Stainless Steel Tees designed for high-pressure fluid flow distribution. Standard butt weld tees are fabricated with precision-formed outlets to eliminate stress-concentration points.',
    imageSeed: 'ss-tee',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.9', 'MSS SP-43', 'DIN 2615']
    },
    features: [
      'Engineered for maximum flow efficiency',
      'Corrosion-resistant finishing matching food & pharma guidelines',
      'Uniform wall thickness throughout'
    ]
  },
  {
    id: 'ss-equal-tee',
    name: 'SS Equal Tee',
    category: 'Tee',
    description: 'Tee fittings where the branch port diameter is equal to the main run ports.',
    longDescription: 'Our Stainless Steel Equal Tees ensure a seamless transition of fluid or steam branches. Perfect for maintaining uniform pressure and flow rate in chemical processing lines, offering excellent weldability and strength.',
    imageSeed: 'equal-tee',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.9', 'EN 10253-4', 'JIS B2312']
    },
    features: [
      'Optimal joint alignment',
      'Tested for extreme high-temperature and high-pressure ratings',
      'Perfect internal smoothness to prevent sediment accumulation'
    ]
  },
  {
    id: 'ss-reducing-tee',
    name: 'SS Reducing Tee',
    category: 'Tee',
    description: 'Tee fittings with a smaller branch-line connection for custom piping reducers.',
    longDescription: 'Designed for fluid branching with a reduction in pressure or volume. Sindo Reducing Tees feature accurate dimensioning on both main run and reducer branch ports to ensure zero-leak operations.',
    imageSeed: 'reducing-tee',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.9', 'MSS SP-43']
    },
    features: [
      'Gradual wall transition to minimize turbulence',
      'Fully ultrasonically tested to ensure integrity',
      'Saves space compared to using separate tees and reducers'
    ]
  },
  {
    id: 'ss-elbow',
    name: 'SS Elbow',
    category: 'Elbow & Bend',
    description: 'Precision 45° and 90° short or long radius elbows for layout direction changes.',
    longDescription: 'Sindo Stainless Steel Elbows are engineered to change pipeline direction with minimal pressure loss. Available in 45° and 90° bends with highly calibrated inner contours for sterile processing industries.',
    imageSeed: 'ss-elbow',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.9', 'ASME B16.28', 'DIN 2605']
    },
    features: [
      'Precisely angled for uniform alignment',
      'Sleek surface finish avoids biofilm cultivation',
      'Exceptional cold forming and weldability characteristics'
    ]
  },
  {
    id: 'ss-bend',
    name: 'SS Bend',
    category: 'Elbow & Bend',
    description: 'Custom radius pipeline bends (3D, 5D, 10D) for smooth directional transitions.',
    longDescription: 'For long-span curved pipelines require low-friction flows, Sindo offers custom-radius pipeline bends. Our advanced induction bending facility delivers seamless curvature without ovality or thinning.',
    imageSeed: 'ss-bend',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.49', 'DIN 2605-2']
    },
    features: [
      'Extremely low pressure drop compared to standard elbows',
      'Smooth outer and inner wall arcs',
      'Manufactured without any heat stress deformation'
    ]
  },
  {
    id: 'ss-concentric-reducer',
    name: 'SS Concentric Reducer',
    category: 'Reducer',
    description: 'Symmetrical reducers designed to join pipe sections on a shared centerline axis.',
    longDescription: 'Sindo Concentric Reducers are used to change pipeline diameters at a shared centerline. Highly recommended for vertical piping applications where symmetrical diameter shifts prevent liquid pooling.',
    imageSeed: 'concentric-reducer',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.9', 'MSS SP-43', 'EN 10253']
    },
    features: [
      'Flawless concentric structure eliminates turbulence',
      'Beveled ends for speedy on-site welding',
      'High resistant to acidic chemicals and rust'
    ]
  },
  {
    id: 'ss-eccentric-reducer',
    name: 'SS Eccentric Reducer',
    category: 'Reducer',
    description: 'Asymmetrical pipe reducers designed to join pipe sections with one flat edge side.',
    longDescription: 'Our Eccentric Reducers feature safe asymmetrical alignments, widely used in horizontal pipelines. The flat-sided geometry prevents vapor pockets or air binding in pump suction headers.',
    imageSeed: 'eccentric-reducer',
    specifications: {
      sizeRange: '1/2" to 4"',
      grades: ['SS316', 'SS304'],
      standards: ['ASME B16.9', 'MSS SP-43']
    },
    features: [
      'Maintains clean flat bottom or flat top alignment in pipeline layouts',
      'Ideal for suction inlets to centrifugal pumps',
      'Thoroughly inspected for micro-cracks'
    ]
  },

  {
    id: 'custom-ss-pipe-fittings',
    name: 'Custom SS Pipe Fittings',
    category: 'Custom',
    description: 'Made-to-order stainless steel manifolds, unique angle bends, and specialized piping products.',
    longDescription: 'Sindo Engineering specializes in custom SS fittings customized for exact space, pressure, or chemical specs. Send us details or layout files for tailored engineering solutions.',
    imageSeed: 'custom-fitting',
    specifications: {
      sizeRange: '1/2" to 4" (And Custom Sizing Drawing specs)',
      grades: ['SS316', 'SS304'],
      standards: ['Custom design with professional ASME/DIN backing']
    },
    features: [
      'Fabricated according to bespoke drawings',
      '3D modeling and stress analysis compatibility',
      'Rigorous physical leak-testing and pressure testing'
    ]
  }
];

export const INDUSTRIES = [
  {
    name: 'Pharmaceutical Industry',
    iconName: 'ShieldPlus',
    description: 'High-purity pipes & fittings with electropolished internals that satisfy stringent FDA hygiene guidelines.'
  },
  {
    name: 'Food & Beverage Industry',
    iconName: 'Utensils',
    description: 'Sterile grade stainless steel and corrosion-resistant alloys that prevent batch taste alterings and rust.'
  },
  {
    name: 'Chemical Industry',
    iconName: 'FlaskConical',
    description: 'Extra low-carbon materials like SS316L and Duplex steels built to withstand extreme corrosive media.'
  },
  {
    name: 'Water Treatment Plants',
    iconName: 'Droplet',
    description: 'Tough, reliable fittings resisting biological oxidation, sea water corrosion, and elevated water pressure.'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'High-Quality Stainless Steel Products',
    description: 'We source strictly certificated raw materials (SS304, SS316, etc.) with traceably logged steel mill origins.',
    iconName: 'Award'
  },
  {
    title: 'Precision Manufacturing',
    description: 'Every fitting is crafted using high-grade tooling and undergoes computerized digital dimension matching.',
    iconName: 'Settings'
  },
  {
    title: 'Competitive Pricing',
    description: 'By optimizing our in-house manufacturing lines, we offer reliable industrial prices without cutting corners.',
    iconName: 'TrendingDown'
  },
  {
    title: 'Timely Delivery',
    description: 'Our supply chain pipelines operate 24/7 to guarantee packaging speed and on-time shipment deadlines.',
    iconName: 'Truck'
  },
  {
    title: 'Customer-Focused Service',
    description: 'Our engineers respond to quotes within hours and offer tailored help across standard size lists.',
    iconName: 'Users'
  },
  {
    title: 'Custom Manufacturing Solutions',
    description: 'Equipped with hydroforming, bending, and specialized machining for any custom designs you supply.',
    iconName: 'Compass'
  }
];
