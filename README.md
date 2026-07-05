# TeyvatResonance PK - Genshin & Wuthering Waves Character Guide

TeyvatResonance PK is a premium, fast, and SEO-optimized guide website dedicated to Genshin Impact and Wuthering Waves players in Pakistan. The design system is based on the technical, engineering-grade **NVIDIA layout style guide** (2px borders, deep black panels, paper-white body grid, brand green `#76b900` accents, and signature 12x12px green corner squares).

This application runs a full **Node.js Express backend** connected to a **PostgreSQL** database to store and serve the character guide data, featuring an automatic client-side static fallback.

---

## Technical Features

1. **Character Guide Engine**: Guides for 20 meta characters (10 Genshin, 10 Wuthering Waves) detailing elements, weapons, roles, best gear, team structures, and Pakistani network optimization tips.
2. **On-Page & Technical SEO**: Semantic HTML5 tags, descriptive meta tags, custom XML sitemaps, robots.txt, and advanced JSON-LD structured schemas to ensure fast indexing on search engines.
3. **Pakistan ISP Latency Simulator**: Interactive ping tool that simulates latencies to Asian and European servers across popular local networks (StormFiber, PTCL Broadband, Nayatel, Transworld Home) with network optimization advice.
4. **PostgreSQL Database with Auto-Seeding**: The backend server automatically generates the tables and seeds the character database on start.
5. **CORS & Offline Fallback**: If the Node.js server goes offline, the frontend automatically falls back to `js/database.js`, avoiding empty screens.

---

## Setup & Running Guide

### Prerequisite
Make sure you have [Node.js](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) installed on your machine.

### 1. Install Node.js Dependencies
Navigate to the directory and run:
```bash
npm install
```

### 2. Configure PostgreSQL Connection
1. Open your PostgreSQL GUI client (like pgAdmin or psql shell) and create a database named `teyvatresonance`:
   ```sql
   CREATE DATABASE teyvatresonance;
   ```
2. Open the `.env` file in the project directory:
   ```env
   PGUSER=postgres
   PGHOST=localhost
   PGDATABASE=teyvatresonance
   PGPASSWORD=your_postgres_password_here
   PGPORT=5432
   PORT=5000
   ```
   Replace `your_postgres_password_here` with your actual local PostgreSQL user password.

### 3. Start the Backend Server
Run the startup command:
```bash
npm run start
```
Upon launching, the server will output:
```text
Connecting to PostgreSQL database...
Database table structure checked/created successfully.
Database is empty. Seeding character guide entries...
Successfully seeded 20 character entries!
TeyvatResonance PK backend running on http://localhost:5000
```

### 4. Run the Website Frontend
- Simply open the [index.html](file:///c:/Users/Munib%20Raza/OneDrive/Desktop/games%20info/index.html) file directly in your web browser.
- It will automatically fetch data from `http://localhost:5000/api/characters`.
- If the server is offline, it will run using the static fallback dataset seamlessly!

---

## File Organization
*   `index.html` — Layout entrypoint with meta tags, sitemaps and schema references.
*   `index.css` — Core stylesheet carrying design system variables, grids, and modal animations.
*   `server.js` — Express backend server handling PostgreSQL table migration, auto-seeding, and endpoints.
*   `package.json` — Backend project configurations.
*   `.env` — Database credential configurations.
*   `js/database.js` — Static database fallback file.
*   `js/app.js` — Frontend UI controller, search logic, drawer actions, and ISP ping tester.
*   `sitemap.xml` & `robots.txt` — Technical SEO files.
