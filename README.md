# Waypoint

A geospatial public transportation registry for **Baguio City, Philippines**, focused initially on public utility jeepney routes, terminals, interchange points, and other route-associated stops.

The project aims to transform fragmented transportation information from existing sources into a **structured, reusable, and geographically-aware dataset exposed through a REST API**.

---

## 📌 Project Overview

Existing transportation information for Baguio City is available through government webpages, route maps, and other sources. However, this information is not necessarily provided as a unified, structured dataset that developers or other applications can easily consume.

**Waypoint** aims to address this by creating a centralized registry of transportation routes and their associated physical stops.

The project focuses on answering questions such as:

* What jeepney routes operate in Baguio?
* What stops/terminals are associated with a route?
* Where are these stops geographically located?
* Which routes pass through a particular stop?
* What type of stop is a location?
* What is the order of stops along a route?
* What is the current status of a route?

---

## 🎯 Goals

### Primary Goals

* Create a structured database of Baguio public transportation routes.
* Register geographic locations associated with transportation routes.
* Establish relationships between routes and stops.
* Preserve the order of stops along a route.
* Classify stops based on their role in a route.
* Provide transportation data through a RESTful API.
* Maintain a foundation that can later be consumed by mapping applications, route-planning systems, or other transportation services.

### Secondary Goals

* Record the source and verification status of transportation information in future iterations.
* Support geographic searches for nearby transportation stops.
* Visualize registered transportation data on a map.

---

# 🗺️ Initial Data Model

The initial database consists of **three core entities**:

ROUTE
   │
   │ 1:N
   ▼
ROUTE_STOP
   │
   │ N:1
   ▼
STOP

This creates a many-to-many relationship between `Route` and `Stop`.

A single route can contain multiple stops, while a single physical stop can be associated with multiple routes.

---

## 🚐 Route

Represents a public transportation route/service.

### Fields

| Field          | Type    | Description                       |
| -------------- | ------- | --------------------------------- |
| `id`           | UUID    | Primary key                       |
| `route_number` | INT     | Transportation route number       |
| `route_name`   | VARCHAR | Human-readable route name         |
| `vehicle_type` | VARCHAR | Type of vehicle serving the route |
| `status`       | ENUM    | Current status of the route       |

### Route Status

Initial values:

```text
ACTIVE
INACTIVE
UNKNOWN
```

Example:

```text
Route Number: 7
Route Name: PMA - Kias Line
Vehicle Type: JEEPNEY
Status: ACTIVE
```

**Important:** The route name does not necessarily represent the actual origin and destination of the entire route. For example, a route labeled `PMA - Kias Line` may extend through additional locations such as Burnham and Acacia Philex.

Therefore, route endpoints are represented through the ordered stops rather than being treated as simple strings in the `Route` table.

---

# 📍 Stop

Represents a physical transportation location.

A stop may represent a terminal, interchange point, or another registered location along a route.

### Fields

| Field       | Type    | Description          |
| ----------- | ------- | -------------------- |
| `id`        | UUID    | Primary key          |
| `name`      | VARCHAR | Name of the location |
| `latitude`  | DECIMAL | Geographic latitude  |
| `longitude` | DECIMAL | Geographic longitude |

Example:

```text
Name: Burnham Park
Latitude: ...
Longitude: ...
```

An `address` field is **not currently required** because the project's primary geographic representation is based on coordinates. It can be added later if the dataset requires more detailed human-readable addresses.

---

# 🔗 RouteStop

`RouteStop` is the junction between `Route` and `Stop`.

It answers:

> **Which stops belong to this route, in what order, and what role does each stop have?**

### Fields

| Field       | Type | Description                           |
| ----------- | ---- | ------------------------------------- |
| `route_id`  | UUID | FK → Route                            |
| `stop_id`   | UUID | FK → Stop                             |
| `sequence`  | INT  | Position of the stop within the route |
| `stop_type` | ENUM | Role of the stop within the route     |

### Stop Types

Initial classification:

```text
TERMINAL
INTERMEDIATE
INTERCHANGE
```

These classifications will be validated against the actual transportation data before being finalized.

### Example

A route may be represented as:

```text
Route 7 — PMA - Kias Line

1. Burnham        → TERMINAL
2. PMA            → INTERMEDIATE
3. Kias           → INTERMEDIATE
4. Acacia Philex  → TERMINAL
```

The `sequence` field allows the system to preserve the order in which stops occur along a route.

---

# 🧩 Entity Relationship

```text
┌──────────────────────┐
│        ROUTE         │
├──────────────────────┤
│ PK id       UUID     │
│ route_number INT     │
│ route_name   VARCHAR │
│ vehicle_type VARCHAR │
│ status       ENUM    │
└──────────┬───────────┘
           │
           │ 1
           │
           │ N
┌──────────▼───────────┐
│      ROUTE_STOP      │
├──────────────────────┤
│ PK/FK route_id UUID  │
│ PK/FK stop_id  UUID  │
│ sequence     INT     │
│ stop_type    ENUM    │
└──────────┬───────────┘
           │
           │ N
           │
           │ 1
┌──────────▼───────────┐
│         STOP         │
├──────────────────────┤
│ PK id       UUID     │
│ name        VARCHAR  │
│ latitude    DECIMAL  │
│ longitude   DECIMAL  │
└──────────────────────┘
```

The current design uses a **composite primary key** for `RouteStop`:

```text
(route_id, stop_id)
```

because `RouteStop` currently represents a relationship rather than an independent entity.

A surrogate UUID may be introduced later if `RouteStop` becomes something that other entities need to reference directly.

---

# 📊 Data Sources

The project will investigate and consolidate transportation information from existing sources rather than assuming that Baguio has no transportation data.

Initial sources include:

### Baguio City EGOV-TMS

The Baguio government transportation system provides jeepney route information, including route pages, vehicle information, schedules, fares, parking-space information, and drop-off-related information.

[Baguio EGOV Alternate Routes / Jeepney Routes](https://alternateroutes.baguio.gov.ph/jeepneyroutes/?utm_source=chatgpt.com)

### Existing Transportation Route Maps

Existing route maps provide additional information about:

* route lines
* terminal stops
* interchange stops
* route numbers
* geographic relationships between transportation locations

These sources will be compared and verified rather than automatically treated as authoritative.

### Potential Future Sources

Depending on availability and project scope:

* OpenStreetMap
* LGU transportation documents
* LTFRB-related public information
* transportation studies
* field verification

---

# 🏗️ Architecture

The backend uses a **simplified modular Controller → Service → Repository architecture**.

```text
Client
  │
  ▼
Routers
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Repositories
  │
  ▼
Prisma ORM
  │
  ▼
PostgreSQL
```

The project is structured as a Controller service architecture.

### Current Backend Structure

```text
src/
├── controllers/
├── db/
├── middleware/
├── repositories/
├── routes/
└── services/
```

Modules/files will be added as actual functionality is implemented rather than creating unnecessary abstractions upfront.

---

# 🛠️ Technology Stack

### Backend

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* REST API

### Infrastructure

* Docker
* PostgreSQL container

### Development

* Git
* Postman
* Prisma Studio / database management tools

---

# 🔌 Planned API

The API will be designed around the domain model.

### Routes

```http
GET    /api/routes
GET    /api/routes/:id
POST   /api/routes
PATCH  /api/routes/:id
DELETE /api/routes/:id
```

### Route Stops

```http
GET /api/routes/:id/stops
```

Potentially:

```http
POST   /api/routes/:id/stops
PATCH  /api/routes/:id/stops/:stopId
DELETE /api/routes/:id/stops/:stopId
```

### Stops

```http
GET    /api/stops
GET    /api/stops/:id
POST   /api/stops
PATCH  /api/stops/:id
DELETE /api/stops/:id
```

### Reverse Route Lookup

```http
GET /api/stops/:id/routes
```

This allows the system to answer:

> "Which routes pass through this stop?"

---

# 🗺️ Future Geospatial Features

Because the registry is fundamentally geographic, future iterations may include:

```text
GET /api/stops/nearby?lat=...&lng=...&radius=...
```

Potential features:

* Nearby paradahan lookup
* Map visualization
* Route visualization
* Geographic filtering
* Route-to-stop mapping
* Distance-based searches

PostGIS may be considered if the project's geographic requirements become more advanced than storing latitude/longitude coordinates.

---

# 🔍 Data Verification & Provenance

A major consideration of the project is that transportation data may come from multiple sources and may not always agree.

Future versions may therefore track:

```text
Source
Verification Status
Last Updated
Retrieved At
```

For example:

```text
Route 7
PMA - Kias Line

Source:
Baguio EGOV
Existing Route Map

Verification:
VERIFIED / PENDING
```

This allows the registry to distinguish between **known information and information that still requires verification**.

---

# 🚧 Current Development Status

### Completed

* [x] Initial project concept
* [x] Transportation data research started
* [x] Existing Baguio transportation sources identified
* [x] Initial domain model identified
* [x] Initial ERD concept
* [x] Backend repository initialized
* [x] Controller → Service → Repository architecture selected
* [x] Finalize ERD
* [x] Finalize database constraints
* [x] Create Prisma schema
* [x] Configure PostgreSQL with Docker
* [x] Run initial database migration (table creation)
* [x] Implement Prisma client (prisma.ts)

### In Progress

* [ ] Implement repositories
* [ ] Implement services
* [ ] Implement controllers
* [ ] Implement API routes
* [ ] Collect and normalize transportation data
* [ ] Seed initial dataset

### Future

* [ ] Geographic search
* [ ] Map visualization
* [ ] Data provenance
* [ ] Verification workflow
* [ ] Route direction modeling
* [ ] Expanded transportation modes
* [ ] Public API documentation

---

# 📌 Current Scope

The initial version intentionally focuses on **three core entities**:

```text
Route
   ↕
RouteStop
   ↕
Stop
```

The project will **not initially attempt to build a complete navigation system** comparable to Google Maps or a full transit planner.

Instead, the primary goal is to establish a **clean, structured, geospatial transportation registry and API** that can serve as a foundation for future applications.

---

## 💡 Project Vision

> **Waypoint aims to turn fragmented public transportation information into structured, reusable, and geographically-aware data that can be consumed by applications and transportation services.**

In simpler terms:

```text
Existing Maps + Government Data + Other Sources
                    ↓
             Data Collection
                    ↓
              Normalization
                    ↓
                Waypoint
                    ↓
          REST API + Geospatial Data
                    ↓
       Apps / Maps / Researchers /
       Transportation Services
```

**That's the project you're actually building.** Not merely a "list of jeepney terminals." You're building the **data layer** that can make transportation information easier for software to consume.
