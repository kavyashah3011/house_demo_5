# AURELIA RESIDENCES - Central District (Port 1222)
> Your Life. Elevated.

An award-winning ultra-luxury architectural skyscraper scrollytelling experience. Visualizes 240 sequential photographic frames through every level of the residential tower, accompanied by dynamic daylight scrubbing, elevator rail navigation, and spatial audio ambiance.

## Architecture & Module Structure

```
05_AURELIA_RESIDENCES_Tower_Walkthrough_Port_1222/
|-- dist/                      # Production-ready bundle (runs immediately on Port 1222)
|   |-- index.html             # Production entry point
|   |-- favicon.svg            # Custom Aurelia monogram icon
|   `-- assets/
|       |-- frames/            # 240 Sequential ultra-HD photographic frames (Levels 01 to 06)
|       |-- 3d/                # Spatial 3D anatomical & architectural assets
|       |-- reel_audio.mp3     # High-fidelity looping ambient soundtrack
|       |-- index-*.js         # Production React 18 + Three.js bundle
|       `-- index-*.css        # Tailwind & custom keyframe styling
|-- src/                       # Complete Modular React + TypeScript Source Code
|   |-- App.tsx                # Master orchestration (LERP physics, audio, modals)
|   |-- main.tsx               # React root mounting
|   |-- index.css              # Typography, custom scrollbars, and luxury color palette
|   |-- components/
|   |   |-- navigation/
|   |   |   |-- AureliaNavbar.tsx     # Minimalist floating luxury header
|   |   |   |-- ElevatorRail.tsx      # Vertical elevator level tracker with direct jump
|   |   |   `-- AureliaMenuDrawer.tsx # Slide-out full-screen architectural navigation
|   |   |-- ui/
|   |   |   |-- DaylightScrubber.tsx  # Dynamic time shifts (08:00, 12:00, 16:00, 20:00)
|   |   |   `-- HotspotMarker.tsx     # Interactive spatial detail callouts
|   |   `-- modals/
|   |       |-- ExploreLayoutsModal.tsx # Architectural floor plans & room specifications
|   |       |-- BookViewingModal.tsx    # Private VIP concierge appointment booking
|   |       `-- ReelReferenceModal.tsx  # Original reference footage inspector
|   |-- data/
|   |   `-- aureliaData.ts     # Tower level specifications, altitudes & amenity specs
|   |-- hooks/
|   |   |-- useScrollProgress.ts # Real-time normalized scroll calculation
|   |   `-- useFrameProgress.ts  # Frame scrub index mapper
|   `-- utils/
|       `-- audioAmbiance.js   # Spatial audio looping and volume automation
|-- public/                    # Static assets directory
|-- index.html                 # Source entry file
|-- package.json               # NPM dependencies (React 18, Three.js, Lucide, Framer Motion)
|-- vite.config.js             # Configured for Port 1222
|-- tailwind.config.js         # Custom luxury theme tokens (gold, charcoal, obsidian)
|-- tsconfig.json              # TypeScript configuration
`-- README.md                  # This documentation
```

## How to Run

### Option A: Serve Production Build (Instant, No Node.js needed)
```bash
python -m http.server 1222 --directory dist
```
Open http://localhost:1222 in your browser.

### Option B: Run in Development Mode with Vite (Node.js)
```bash
npm install
npm run dev
```

### Option C: Run Vite Preview Server
```bash
npm run preview
```
