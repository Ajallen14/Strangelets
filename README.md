<h1 align="center">Stranglets</h1>

## Project Topic

It is an interactive space museum that lets visitors explore the
history of Moon and Mars missions through real-time 3D. 

Since the 1960s, NASA has left hardware across the Moon and Mars. From retired rovers to probes still traveling away from Earth, explore the stories of these silent pioneers and the groundbreaking science they made possible.

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Build tool | Vite 8 |
| 3D rendering | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Animation | Framer Motion, Anime.js |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Icons | Lucide React |
| Linting | Oxlint |

## 📁 Project Structure

```
frontend/
├── index.html                  # Entry HTML
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── models/                 # GLB 3D models (Moon, Mars, Earth, landers, rovers)
│       ├── 3D-moon-assets/     # Pioneer, Ranger, Surveyor, Clementine, Apollo, LRO…
│       └── *.glb
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Routes: /, /explore, /mars, /moon
    ├── index.css               # Tailwind imports
    ├── components/
    │   ├── Hyperspeed.jsx      # Warp starfield background
    │   ├── SoftAurora.jsx      # Aurora gradient backdrop
    │   ├── OrbitalSystemSection.jsx
    │   ├── Particles.jsx
    │   ├── MarsCanvas.jsx      # 3D Mars scene
    │   ├── moon/               # Moon exhibit (hero, timeline, early programs)
    │   └── ui/                 # Buttons, timeline, loader, scroll-reveal
    ├── data/marsEquipment.js   # Rover/lander metadata
    └── pages/
        ├── Landing-page.jsx    # Home
        ├── Explore-page.jsx    # Exhibit picker
        ├── mars-pages/Mars-page.jsx
        └── moon-pages/moon-explore.jsx
```

## 🖼 Screenshots
<img width="1845" height="961" alt="Screenshot from 2026-11-15 20-58-08" src="https://github.com/user-attachments/assets/8baac7af-d1c4-4e29-bb1a-34d9f5f30909" />

<img width="1845" height="961" alt="Screenshot from 2026-11-15 21-00-04" src="https://github.com/user-attachments/assets/1d2960ae-4cd0-439f-8b00-059ff3ef1f9c" />

<img width="1845" height="961" alt="Screenshot from 2026-11-15 21-00-49" src="https://github.com/user-attachments/assets/cf894162-fa2c-4f5f-8088-6e6d339052a2" />

---

## Installation

Requires Node.js 18+ and npm.

```bash
# 1. Clone the repo (if you haven't)
git clone <repo-url>
cd NASA/frontend

# 2. Install dependencies
npm install
```

## Running

```bash
# Development server (hot reload) → http://localhost:5173
npm run dev

# Production build → outputs to dist/
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```
