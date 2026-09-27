export interface Hotspot {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
  icon?: string;
  tag?: string;
}

export interface AureliaLevel {
  id: string;
  levelNumber: string;
  levelCode: string; // '01', '02', '03'
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  specs?: {
    area?: string;
    bedrooms?: string;
    bathrooms?: string;
    ceilingHeight?: string;
    orientation?: string;
  };
  image: string;
  imageSunset?: string;
  imageNight?: string;
  videoTimestamp: number; // in seconds for reel scrub
  hotspots: Hotspot[];
  features: string[];
}

export const AURELIA_LEVELS: AureliaLevel[] = [
  {
    id: 'hero',
    levelNumber: '01',
    levelCode: '01',
    badge: 'Central District',
    title: 'YOUR LIFE. ELEVATED.',
    subtitle: 'The Architectural Landmark',
    description: 'Standing 48 storeys above the metropolis, Aurelia Residences redefines luxury urban living with sculptural glass facades and boundless views.',
    specs: {
      area: 'Central District, Tower 1',
      ceilingHeight: '3.6m - 4.2m',
      orientation: 'North-East Skyline & Waterfront',
    },
    image: '/assets/scene_1_hero.jpg',
    videoTimestamp: 0.5,
    hotspots: [
      {
        id: 'skyline-views',
        title: 'Central District Skyline',
        subtitle: 'Panoramic 360° Views',
        description: 'Unobstructed vistas over the metropolitan waterfront and city skyline.',
        x: 68,
        y: 28,
        icon: 'eye',
        tag: 'VISTA',
      },
      {
        id: 'facade-architecture',
        title: 'Curved Glass Facade',
        subtitle: 'Architectural Glazing',
        description: 'High-performance acoustic double-glazed curtain wall with automated shading.',
        x: 48,
        y: 42,
        icon: 'building',
        tag: 'EXTERIOR',
      },
    ],
    features: ['48 Luxury Storeys', 'Private Helipad Access', 'LEED Platinum Certified', 'Concierge 24/7'],
  },
  {
    id: 'arrival',
    levelNumber: '01',
    levelCode: '01',
    badge: 'STREET LEVEL',
    title: 'GROUND FLOOR',
    subtitle: 'Private Arrival & Porte-Cochère',
    description: 'An exclusive sheltered vehicular court with heated granite paving, ambient architectural lighting, and 24/7 white-glove valet service.',
    specs: {
      area: 'Ground Level Driveway',
      ceilingHeight: '6.5m Glass Canopy',
      orientation: 'Private Boulevard Access',
    },
    image: '/assets/scene_2_arrival.jpg',
    videoTimestamp: 2.5,
    hotspots: [
      {
        id: 'valet-arrival',
        title: 'PRIVATE ARRIVAL',
        subtitle: '24/7 White-Glove Valet',
        description: 'Dedicated vehicular drop-off under the cantilevered bronze & glass canopy.',
        x: 28,
        y: 45,
        icon: 'car',
        tag: 'SERVICES',
      },
      {
        id: 'glass-portal',
        title: 'Glazed Lobby Portal',
        subtitle: 'Biometric Access',
        description: 'Motion-activated bronze pivot doors providing touchless private entry.',
        x: 52,
        y: 52,
        icon: 'key',
        tag: 'SECURITY',
      },
    ],
    features: ['Dedicated Valet Bay', 'Secure Chauffeur Lounge', 'Subterranean EV Charging', 'Private Security Detail'],
  },
  {
    id: 'lobby',
    levelNumber: '01',
    levelCode: '01',
    badge: 'STREET LEVEL',
    title: 'THE GRAND LOBBY',
    subtitle: "Residents' Lounge & Concierge",
    description: 'Soaring 9-meter double-height ceilings framed by monumental fluted Calacatta marble pillars, sculptural wave chandeliers, and curated contemporary art.',
    specs: {
      area: 'Double-Height Atrium',
      ceilingHeight: '9.0m Volume',
      orientation: 'Gardens & Streetscape',
    },
    image: '/assets/scene_3_lobby.jpg',
    videoTimestamp: 4.2,
    hotspots: [
      {
        id: 'residents-lounge',
        title: "RESIDENTS' LOUNGE",
        subtitle: 'Private Social Club',
        description: 'Bespoke curved Italian seating, fireplace salon, and artisan coffee bar for residents.',
        x: 75,
        y: 58,
        icon: 'coffee',
        tag: 'AMENITY',
      },
      {
        id: 'sculptural-lighting',
        title: 'Wave Kinetic Chandelier',
        subtitle: 'Bespoke Installation',
        description: 'Hand-crafted illuminated acrylic mesh simulating celestial fluid dynamics.',
        x: 52,
        y: 28,
        icon: 'sparkles',
        tag: 'DESIGN',
      },
    ],
    features: ['24/7 Lifestyle Concierge', 'Executive Boardroom', 'Private Postal & Wine Vault', 'Artisan Espresso Bar'],
  },
  {
    id: 'residence',
    levelNumber: '34',
    levelCode: '02',
    badge: 'LEVEL 34',
    title: 'THREE-BEDROOM RESIDENCE',
    subtitle: 'The Horizon Collection',
    description: 'Refined corner residence featuring expansive living galleries, full-height motorized glass walls, European white oak flooring, and deep cantilevered balconies.',
    specs: {
      area: '245 m² / 2,637 sq ft',
      bedrooms: '3 Luxury Suites',
      bathrooms: '3.5 Marble En-Suites',
      ceilingHeight: '3.6m Clear Height',
      orientation: 'Dual Aspect Panoramic Sunset',
    },
    image: '/assets/residence_day.jpg',
    imageSunset: '/assets/residence_sunset.jpg',
    imageNight: '/assets/residence_night.jpg',
    videoTimestamp: 6.5,
    hotspots: [
      {
        id: 'living-gallery',
        title: 'Grand Living Gallery',
        subtitle: 'Floor-to-Ceiling Glazing',
        description: 'Open-concept entertaining space seamlessly blending with private balcony terrace.',
        x: 62,
        y: 48,
        icon: 'maximize',
        tag: 'INTERIOR',
      },
      {
        id: 'daylight-scrub',
        title: 'Atmospheric Lighting',
        subtitle: 'Circadian Control',
        description: 'Adjust ambient day-to-night lighting through motorized shades and Lutron controls.',
        x: 35,
        y: 72,
        icon: 'sun',
        tag: 'LIGHTING',
      },
    ],
    features: ['Direct Elevator Gallery', 'Boffi Designer Kitchen', 'Poliform Master Dressing', 'Sub-Zero & Gaggenau Suite'],
  },
  {
    id: 'penthouse-pool',
    levelNumber: '48',
    levelCode: '03',
    badge: 'SKY LEVEL',
    title: 'SKY PENTHOUSE & POOL',
    subtitle: 'Rooftop Infinity Terrace',
    description: 'Suspended 180 meters above the city, the heated infinity-edge pool seamlessly merges with the skyline horizon, framed by private cabanas and alfresco dining.',
    specs: {
      area: '540 m² Penthouse + Terrace',
      bedrooms: '4 Master Penthouses',
      bathrooms: '5.5 Bathrooms + Spa',
      ceilingHeight: '4.5m Cathedral Ceilings',
      orientation: '360° Unobstructed Skyline',
    },
    image: '/assets/scene_5_pool_sunset.jpg',
    videoTimestamp: 8.5,
    hotspots: [
      {
        id: 'infinity-pool',
        title: 'INFINITY POOL',
        subtitle: '25m Heated Sky Pool',
        description: 'Glass-bottomed cantilevered infinity swimming pool extending past the building perimeter.',
        x: 35,
        y: 45,
        icon: 'camera',
        tag: 'SIGNATURE',
      },
      {
        id: 'private-dining',
        title: 'PRIVATE DINING',
        subtitle: 'Sky Terrace & Barbecue',
        description: 'Covered teak dining pavilion with outdoor chef station and firepit lounge.',
        x: 72,
        y: 38,
        icon: 'utensils',
        tag: 'ALFRESCO',
      },
    ],
    features: ['25m Cantilevered Pool', 'Private Sunset Cabanas', 'Hydrotherapy Wellness Spa', 'Fireplace Cocktail Lounge'],
  },
  {
    id: 'night-finale',
    levelNumber: '48',
    levelCode: '03',
    badge: 'SKY LEVEL',
    title: 'LIVE ABOVE THE ORDINARY.',
    subtitle: 'Connect your destination to your next moment.',
    description: 'Aurelia stands as the crown jewel of the skyline. An exclusive sanctuary where architectural brilliance meets timeless lifestyle.',
    specs: {
      area: 'The Aurelia Collection',
      ceilingHeight: '48 Sky Levels',
      orientation: 'Central District Landmark',
    },
    image: '/assets/scene_6_tower_twilight_graded.jpg',
    videoTimestamp: 9.8,
    hotspots: [
      {
        id: 'crown-penthouse',
        title: 'Crown Penthouse Triplex',
        subtitle: 'Top 3 Floors',
        description: 'The pinnacle of luxury with private internal elevator and private rooftop observatory.',
        x: 52,
        y: 20,
        icon: 'crown',
        tag: 'FLAGSHIP',
      },
    ],
    features: ['Exclusive Private Showings', 'Flexible Bespoke Finishes', 'Global Title Ownership', 'Handover Q4 2026'],
  },
];

export const FLOORPLANS = [
  {
    id: 'three-bed',
    title: 'Level 34 — Three-Bedroom Residence',
    level: 'Level 32 - 40',
    area: '245 m² / 2,637 sq ft',
    bedrooms: 3,
    bathrooms: 3.5,
    balcony: '38 m²',
    highlights: ['Private Elevator Vestibule', 'Corner Living Gallery', 'Dual Aspect Master Suite', 'Service Quarters'],
    svgPlan: 'floorplan_3bed',
  },
  {
    id: 'penthouse',
    title: 'Level 48 — The Sky Penthouse',
    level: 'Level 47 - 48',
    area: '540 m² / 5,812 sq ft',
    bedrooms: 4,
    bathrooms: 5.5,
    balcony: '145 m² Private Terrace',
    highlights: ['Cantilevered Infinity Pool', 'Master Spa Suite', 'Wine Cellar & Tasting Room', 'Private Rooftop Deck'],
    svgPlan: 'floorplan_penthouse',
  },
];
