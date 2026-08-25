# Waypoint API — Baguio City Open Transit Infrastructure API

An open, developer-first REST & GeoJSON API providing geolocated, community-verified jeepney terminal and boarding-point (*paradahan*) data for Baguio City.

---

## 📌 Problem Statement & Core Mission

Baguio City's public transport system operates heavily on informal jeepney stops. While the City Government's official Traffic Monitoring System (TMS) publishes route names, every stop's **"Drop off points"** field currently reads **"Not Available"**. 

**Waypoint API** fills this exact missing spatial data layer. It provides an open, standard, self-documenting API that any mobile app, developer, city planner, or academic researcher can consume to query verified physical *paradahan* coordinates.

---

## ✨ Features

- 🗺️ **Native GeoJSON Support** — Endpoints return standardized GeoJSON `FeatureCollection` structures compatible with Leaflet, Mapbox, QGIS, and Google Maps API.
- 📍 **Proximity Search** — Radial spatial queries (`/api/v1/boarding-points/nearby?lat=...&lng=...&radius=...`) to find walking-distance stops.
- 🛡️ **Confidence & Freshness Scoring** — Dynamic algorithm calculating trust ratings (0–100) based on community confirmations, flags, and time decay.
- 📖 **Interactive OpenAPI Docs** — Built-in Swagger UI available at `/api/v1/docs` for testing endpoints directly in the browser.
- 💾 **Open Data Export** — Single-click GeoJSON export (`/api/v1/export/geojson`) for offline GIS analysis.
- 🏗️ **Layered CSR Architecture** — Clean Controller-Service-Repository separation built with Node.js, Express, TypeScript, and Prisma ORM.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Runtime | Node.js (v20+) |
| Language | TypeScript |
| API Framework | Express 5 |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod | remove
| Documentation | Swagger / OpenAPI 3.0 |
| Package Manager | pnpm |

---

## 📂 Backend Architecture

Built using the **Controller-Service-Repository (CSR)** layered pattern:

```
waypoint-api/
├── src/
│   ├── config/             # App configuration & environment variables
│   ├── routes/             # Express API route declarations
│   ├── controllers/        # Request validation & HTTP response formatting
│   ├── services/           # Core business logic (Confidence scoring, GeoJSON builder)
│   ├── db/                 # Prisma database client
│   ├── validators/         # Zod schema definitions
│   ├── utils/              # Spatial helpers & GeoJSON transformers
│   ├── swagger/            # OpenAPI 3.0 specification
│   └── app.ts              # Express application setup
│
├── prisma/
│   ├── schema.prisma       # Database models (City, Route, BoardingPoint, VerificationLog)
│   └── seed.ts             # Initial Baguio TMS base points seed script
│
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Query Parameters | Description | Response Format |
|---|---|---|---|---|
| `GET` | `/api/v1/boarding-points` | `route`, `vehicle_type`, `min_confidence` | Fetch all verified stops | GeoJSON `FeatureCollection` |
| `GET` | `/api/v1/boarding-points/nearby` | `lat` (req), `lng` (req), `radius` (m) | Spatial radial query for nearby stops | GeoJSON `FeatureCollection` |
| `GET` | `/api/v1/boarding-points/:id` | None | Get specific stop details & history | JSON Object |
| `POST` | `/api/v1/boarding-points` | Body payload | Submit a new paradahan pin | JSON Object |
| `POST` | `/api/v1/boarding-points/:id/confirm` | Body payload | Single-click "Still Here" verification | JSON Object |
| `POST` | `/api/v1/boarding-points/:id/flag` | Body payload | Report displaced or fake stop | JSON Object |
| `GET` | `/api/v1/routes` | `city_id` | List unique route names & stop counts | JSON Array |
| `GET` | `/api/v1/export/geojson` | None | Download full dataset as GeoJSON | Downloadable `.geojson` |
| `GET` | `/api/v1/docs` | None | Interactive Swagger API documentation | Interactive HTML |

---

## 🧮 Confidence Score Algorithm

Every boarding point features a dynamic confidence score calculated by the scoring service:

$$\text{Confidence Score} = \max\left(0, \min\left(100, (N_{\text{confirm}} \times 20) - (N_{\text{flag}} \times 35) - D_{\text{decay}}\right)\right)$$

*Where $D_{\text{decay}} = \lfloor \text{days\_since\_last\_confirmation} / 14 \rfloor \times 10$ (10-point decay per 2 weeks of inactivity).*

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** 20.x or higher
- **pnpm** (`npm install -g pnpm`)
- **PostgreSQL** running locally or via cloud (Neon / Supabase)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/waypoint-api.git
cd waypoint-api
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your local database URL:
```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/waypoint_db"
DEFAULT_CITY_LATITUDE=16.412431
DEFAULT_CITY_LONGITUDE=120.596041
```

### 3. Database Migration & Seeding
```bash
# Push schema to PostgreSQL
pnpm prisma db push

# Seed Baguio City baseline routes & initial stops
pnpm prisma db seed
```

### 4. Run Development Server
```bash
pnpm dev
```
- API Server: `http://localhost:4000`
- Interactive API Docs: `http://localhost:4000/api/v1/docs`
- Health Check: `http://localhost:4000/api/v1/health`

---

## 📄 License

Open Source — MIT License.
