# TeyvatResonance PK (Next.js Serverless Edition)

A high-performance, purely serverless character guide portal for **Genshin Impact** and **Wuthering Waves** players in Pakistan. 

Developed following the strict CAD outline in `DESIGN.md` (monochrome theme, 2px borders, signature green 12x12px corners, square thumbnails, zero AI sparkles or storm logos) and optimized for low-latency recommendations across StormFiber, PTCL, Transworld, and mobile cellular networks.

---

## Key Features

1. **Purely Serverless Architecture**:
   - Zero database installation required. You do not need to install, create, or configure any PostgreSQL instances.

2. **100% Client-Side Persistence (`localStorage`)**:
   - All your favorite character bookmarks and custom build notes (e.g. *\"My Jiyan is level 80, Helios Cleaver R5, 55/150 Crit\"*) are written instantly to `localStorage`. This is 100% offline-stable, extremely fast, and persists across browser refreshes.

3. **Dynamic Client Roster Loading**:
   - **Genshin Impact:** On page load, the app dynamically fetches the entire playable list of **85+ Genshin Impact characters** directly from the free community API (`https://genshin.jmp.blue/characters/all`).
   - **Wuthering Waves:** Full pre-configured roster of **all 23 playable resonators** loaded statically with builds, recommended gear, and teams.

4. **Interactive Maps Integration**:
   - Includes full embedded interactive maps for both games using AppSample's layout interfaces. Toggled instantly through the main navigation bar.

5. **Local Navigation Fix**:
   - Removed all `href="/"` links which trigger the browser's directory index when viewed as local static files. All local links now use safe relative routes and anchors (`#`).

---

## Technical Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher recommended)

### Install & Run
1. Open a terminal inside the `teyvatresonance/` folder and run:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## File System Structure
- **Pages & Entrypoint**: `app/page.js`, `app/layout.js`, `app/globals.css`
- **React Components**: `app/components/CharacterCard.jsx`, `app/components/ModalDrawer.jsx`, `app/components/PingSimulator.jsx`, `app/components/InteractiveMaps.jsx`
- **Static Dataset**: `app/data/characters.js`
