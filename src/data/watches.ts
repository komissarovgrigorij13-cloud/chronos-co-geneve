export type Brand = 'Rolex' | 'Audemars Piguet' | 'Patek Philippe' | 'Richard Mille' | 'Vacheron Constantin';
export type Material = 'Oystersteel' | 'Rose Gold' | 'Platinum' | 'Titanium' | 'Carbon' | 'White Gold' | 'Yellow Gold';
export type Condition = 'Unworn' | 'Pre-Owned';
export type Status = 'In Vault' | 'By Allocation Only' | 'Sold Out' | 'Certified Authentic';

export interface Watch {
  id: string;
  ref: string;
  brand: Brand;
  model: string;
  variant: string;
  condition: Condition;
  status: Status;
  year: number;
  priceUSD: number;
  material: Material;
  caseDiameter: number;   // mm
  waterResistance: number; // meters
  movement: string;
  caliber: string;
  powerReserve: number;   // hours
  complications: string[];
  boxAndPapers: boolean;
  description: string;
  imageUrl: string;
  imageAlt: string;
  isNew: boolean;
}

export const watches: Watch[] = [
  {
    id: 'rolex-daytona-116500ln',
    ref: 'Ref. 116500LN',
    brand: 'Rolex',
    model: 'Cosmograph Daytona',
    variant: 'Panda Dial — Black Ceramic Bezel',
    condition: 'Unworn',
    status: 'By Allocation Only',
    year: 2024,
    priceUSD: 54800,
    material: 'Oystersteel',
    caseDiameter: 40,
    waterResistance: 100,
    movement: 'Automatic Chronograph',
    caliber: 'Cal. 4130',
    powerReserve: 72,
    complications: ['Chronograph', 'Tachymeter'],
    boxAndPapers: true,
    description:
      'The Cosmograph Daytona 116500LN represents the pinnacle of Rolex sports chronography. Powered by the proprietary Calibre 4130 — featuring a column wheel, vertical clutch and COSC-certified movement — it is defined by its ceramic black bezel and panda dial. Supplied with full box and papers, this specimen is in unworn condition.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Rolex Daytona 116500LN Panda Dial Macro Photography',
    isNew: false,
  },
  {
    id: 'ap-roo-15720st',
    ref: 'Ref. 15720ST.OO.A009CA.01',
    brand: 'Audemars Piguet',
    model: 'Royal Oak Offshore Diver',
    variant: 'Blue Ceramic — Mega Tapisserie Dial',
    condition: 'Unworn',
    status: 'In Vault',
    year: 2024,
    priceUSD: 48500,
    material: 'Oystersteel',
    caseDiameter: 42,
    waterResistance: 300,
    movement: 'Automatic',
    caliber: 'Cal. 4308',
    powerReserve: 60,
    complications: ['Date', 'Diver Rotating Bezel'],
    boxAndPapers: true,
    description:
      'The Royal Oak Offshore Diver combines the iconic AP octagonal porthole design with professional dive credentials. The Mega Tapisserie blue dial sits within a steel case with unidirectional rotating ceramic bezel, rated to 300m. Calibre 4308 delivers 60 hours of autonomy and is beautifully finished through the sapphire caseback.',
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Audemars Piguet Royal Oak Offshore Diver Blue Dial Macro',
    isNew: true,
  },
  {
    id: 'patek-nautilus-5711',
    ref: 'Ref. 5711/1A-014',
    brand: 'Patek Philippe',
    model: 'Nautilus',
    variant: 'Olive Green Sunburst Dial — Final Edition',
    condition: 'Pre-Owned',
    status: 'Certified Authentic',
    year: 2021,
    priceUSD: 265000,
    material: 'Oystersteel',
    caseDiameter: 40,
    waterResistance: 120,
    movement: 'Automatic',
    caliber: 'Cal. 26-330 S C',
    powerReserve: 45,
    complications: ['Date', 'Sweep Seconds'],
    boxAndPapers: true,
    description:
      'The last steel Nautilus 5711 ever produced, featuring the exclusive Olive Green dial. Patek Philippe discontinued the 5711 in 2021, making this final edition the most sought-after sports watch of the modern era. Complete with original box, papers, and Patek certificate of origin. Authenticated and inspected by master watchmakers.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Patek Philippe Nautilus 5711 Olive Green Dial Macro',
    isNew: false,
  },
  {
    id: 'rm-011-titanium',
    ref: 'Ref. RM 011-03',
    brand: 'Richard Mille',
    model: 'RM 011',
    variant: 'NTPT Carbon & Titanium — Felipe Massa',
    condition: 'Pre-Owned',
    status: 'Certified Authentic',
    year: 2022,
    priceUSD: 198000,
    material: 'Carbon',
    caseDiameter: 50,
    waterResistance: 50,
    movement: 'Skeletonized Automatic Flyback Chronograph',
    caliber: 'Cal. RMAC3',
    powerReserve: 55,
    complications: ['Flyback Chronograph', 'Annual Calendar', 'GMT', 'Torque Indicator'],
    boxAndPapers: true,
    description:
      "The RM 011 stands as Richard Mille's most celebrated model — an aerospace-grade tonneau case in NTPT carbon paired with titanium components. The skeletonized RMAC3 movement provides flyback chronograph, annual calendar and GMT functions. A tourbillon-level statement piece worn by Formula 1 champion Felipe Massa.",
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Richard Mille RM 011 NTPT Carbon Skeleton Macro',
    isNew: false,
  },
  {
    id: 'vc-overseas-4500v',
    ref: 'Ref. 4500V/110A-B128',
    brand: 'Vacheron Constantin',
    model: 'Overseas',
    variant: 'Deep Blue Lacquered Dial — Steel',
    condition: 'Unworn',
    status: 'In Vault',
    year: 2024,
    priceUSD: 29800,
    material: 'Oystersteel',
    caseDiameter: 41,
    waterResistance: 150,
    movement: 'Automatic',
    caliber: 'Cal. 5100',
    powerReserve: 60,
    complications: ['Date', 'Sweep Seconds'],
    boxAndPapers: true,
    description:
      "Vacheron Constantin's Overseas embodies the Maison's 270-year watchmaking legacy in a contemporary sporting guise. The Calibre 5100 movement bears the Hallmark of Geneva, the ultimate certification of quality. Delivered with three interchangeable straps — integrated steel bracelet, rubber, and alligator leather.",
    imageUrl: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Vacheron Constantin Overseas Blue Dial Macro Photography',
    isNew: true,
  },
  {
    id: 'rolex-skydweller-326935',
    ref: 'Ref. 326935',
    brand: 'Rolex',
    model: 'Sky-Dweller',
    variant: 'Chocolate Dial — 18k Everose Gold',
    condition: 'Unworn',
    status: 'By Allocation Only',
    year: 2024,
    priceUSD: 74500,
    material: 'Rose Gold',
    caseDiameter: 42,
    waterResistance: 100,
    movement: 'Automatic Annual Calendar',
    caliber: 'Cal. 9002',
    powerReserve: 72,
    complications: ['Annual Calendar', 'GMT / Dual Time Zone', 'Saros System'],
    boxAndPapers: true,
    description:
      "The Sky-Dweller is Rolex's most complex watch, housing the proprietary Calibre 9002 with annual calendar and dual time zone via the Saros system. In 18k Everose gold with a warm chocolate dial, this is the apex of Rolex's precious metal sports collection — presented unworn with full Rolex set.",
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Rolex Sky-Dweller 326935 Everose Chocolate Dial Macro',
    isNew: false,
  },
  {
    id: 'ap-roo-concept-tourbillon',
    ref: 'Ref. 26589IO.OO.D010CA.01',
    brand: 'Audemars Piguet',
    model: 'Royal Oak Concept',
    variant: 'Flying Tourbillon Chronograph — Frosted Gold',
    condition: 'Pre-Owned',
    status: 'Certified Authentic',
    year: 2023,
    priceUSD: 395000,
    material: 'Rose Gold',
    caseDiameter: 44,
    waterResistance: 20,
    movement: 'Manual Winding Tourbillon Chronograph',
    caliber: 'Cal. 2935',
    powerReserve: 240,
    complications: ['Flying Tourbillon', 'Chronograph', '10-Day Power Reserve Indicator'],
    boxAndPapers: true,
    description:
      "An unprecedented union of frosted gold finish and Audemars Piguet's haute complication mastery. The Calibre 2935 delivers 10 days of power reserve via its twin barrels, while the flying tourbillon — visible through the signature AP openworked dial — beats at the heart of this masterpiece.",
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Audemars Piguet Royal Oak Concept Flying Tourbillon Macro',
    isNew: false,
  },
  {
    id: 'patek-aquanaut-5168g',
    ref: 'Ref. 5168G-010',
    brand: 'Patek Philippe',
    model: 'Aquanaut Jumbo',
    variant: 'Khaki Green — 18k White Gold',
    condition: 'Unworn',
    status: 'By Allocation Only',
    year: 2024,
    priceUSD: 89000,
    material: 'White Gold',
    caseDiameter: 42,
    waterResistance: 120,
    movement: 'Automatic',
    caliber: 'Cal. 26-330 S C',
    powerReserve: 45,
    complications: ['Date', 'Sweep Seconds'],
    boxAndPapers: true,
    description:
      "Patek Philippe's Aquanaut in 18k white gold with a striking khaki green 'Tropical' dial — the most coveted color in Aquanaut history. The embossed rubber strap mirrors the octagonal bezel motif. Calibre 26-330 S C is a masterwork of Geneva craftsmanship inside an unconventional athlete's shell.",
    imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Patek Philippe Aquanaut 5168G Khaki Green Macro',
    isNew: true,
  },
  {
    id: 'rm-035-americas',
    ref: 'Ref. RM 035-02',
    brand: 'Richard Mille',
    model: 'RM 035',
    variant: 'Americas NTPT Carbon — Rafael Nadal Edition',
    condition: 'Pre-Owned',
    status: 'Sold Out',
    year: 2023,
    priceUSD: 285000,
    material: 'Carbon',
    caseDiameter: 49,
    waterResistance: 50,
    movement: 'Automatic Skeletonized Calibre',
    caliber: 'Cal. RMAL1',
    powerReserve: 55,
    complications: ['Skeletonized Movement', 'Grade 5 Titanium Baseplate', 'Torque Proof 5000G'],
    boxAndPapers: true,
    description:
      "Built for Rafael Nadal's wrist on the ATP circuit, the RM 035-02 Americas endures 5,000 g-forces — tested beyond anything a manufacturing watchmaker has conceived. The RMAL1 caliber features a baseplate of grade 5 titanium micro-blasted to aerospace specification. One of 30 produced for the Americas edition.",
    imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Richard Mille RM 035-02 Americas Rafael Nadal Macro',
    isNew: false,
  },
  {
    id: 'vc-patrimony-traditionnelle',
    ref: 'Ref. 81180/000R-9159',
    brand: 'Vacheron Constantin',
    model: 'Patrimony Traditionnelle',
    variant: '14-Day Tourbillon — 18k 5N Pink Gold',
    condition: 'Pre-Owned',
    status: 'Certified Authentic',
    year: 2022,
    priceUSD: 195000,
    material: 'Rose Gold',
    caseDiameter: 42,
    waterResistance: 30,
    movement: 'Manual Winding Tourbillon',
    caliber: 'Cal. 2260',
    powerReserve: 336,
    complications: ['Tourbillon', '14-Day Power Reserve Indicator', 'Geneva Seal Hallmark'],
    boxAndPapers: true,
    description:
      "Vacheron Constantin's Calibre 2260 holds the world record for power reserve in a tourbillon wristwatch: an extraordinary 14 days wound through four interconnected spring barrels. In 18k pink gold, the Patrimony Traditionnelle presents this extraordinary complication with the restrained elegance that has defined the Maison since 1755.",
    imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Vacheron Constantin Traditionnelle 14-Day Tourbillon Macro',
    isNew: false,
  },
];

export const currencies = {
  USD: { symbol: '$', label: 'USD', rate: 1 },
  EUR: { symbol: '€', label: 'EUR', rate: 0.91 },
  CHF: { symbol: '₣', label: 'CHF', rate: 0.89 },
  AED: { symbol: 'د.إ', label: 'AED', rate: 3.67 },
} as const;

export type CurrencyCode = keyof typeof currencies;

export function formatPrice(usd: number, currency: CurrencyCode): string {
  const { symbol, rate } = currencies[currency];
  const value = Math.round(usd * rate);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return `${symbol}${formatted}`;
}

export const brands: Brand[] = ['Rolex', 'Audemars Piguet', 'Patek Philippe', 'Richard Mille', 'Vacheron Constantin'];
export const materials: Material[] = ['Oystersteel', 'Rose Gold', 'Platinum', 'Titanium', 'Carbon', 'White Gold', 'Yellow Gold'];
export const consiergeNames = ['Élodie Marchetti', 'Jean-François Moreau', 'Isabelle Dupont', 'Alexandre Renard'];
