import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Waypoint API",
            version: "1.0.0",
            description:
                "An open, developer-first REST & GeoJSON API providing geolocated, community-verified jeepney terminal and boarding-point (*paradahan*) data for Baguio City. v1 is public and read-only: write operations (POST/PUT/DELETE) return 405 Method Not Allowed and will be enabled in v2 with API-key authentication and rate limiting.",
        },
        servers: [
            {
                url: process.env.API_PUBLIC_URL ?? "http://localhost:4000",
                description: "production development",
            },
        ],
        tags: [
            { name: "Route", description: "Jeepney route management" },
            { name: "Stop", description: "Terminal and boarding-point management" },
            { name: "RouteStop", description: "Route-to-stop assignments (sequence and stop type)" },
            { name: "System", description: "Health and metadata endpoints" },
        ],
        components: {
            schemas: {
                VehicleType: {
                    type: "string",
                    enum: ["JEEPNEY", "MODERNJEEP", "TAXI"],
                    description: "Type of vehicle serving the route",
                },
                RouteStatus: {
                    type: "string",
                    enum: ["ACTIVE", "INACTIVE", "UNKNOWN"],
                    description: "Operational status of a route",
                },
                StopType: {
                    type: "string",
                    enum: ["TERMINAL", "INTERMEDIATE"],
                    description:
                        "TERMINAL = official start/end point of a route (max 2 per route). INTERMEDIATE = regular boarding/drop-off point along the route.",
                },
                Route: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid", example: "0dcb2d6c-ad02-4434-b4b3-d8bc17750167" },
                        routeNumber: { type: "integer", example: 1 },
                        routeName: { type: "string", example: "Diego Silang St. (PNR Terminal) - PNR" },
                        vehicleType: { $ref: "#/components/schemas/VehicleType" },
                        status: { $ref: "#/components/schemas/RouteStatus" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                    required: ["id", "routeNumber", "routeName", "vehicleType", "status", "createdAt", "updatedAt"],
                },
                Stop: {
                    type: "object",
                    properties: {
                        id: { type: "string", format: "uuid", example: "73020a21-147f-4211-9ca2-fd2ae5ed913b" },
                        name: { type: "string", example: "Hillside" },
                        latitude: { type: "number", format: "double", example: 16.3976943 },
                        longitude: { type: "number", format: "double", example: 120.6042911 },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                    required: ["id", "name", "latitude", "longitude", "createdAt", "updatedAt"],
                },
                RouteStop: {
                    type: "object",
                    description:
                        "Join record linking a stop to a route. The composite key (routeId, stopId) guarantees a stop appears on a route only once.",
                    properties: {
                        routeId: { type: "string", format: "uuid" },
                        stopId: { type: "string", format: "uuid" },
                        sequence: {
                            type: "integer",
                            example: 1,
                            description: "Position of the stop on the route. Must be contiguous (1, 2, 3, ...).",
                        },
                        stopType: { $ref: "#/components/schemas/StopType" },
                    },
                    required: ["routeId", "stopId", "sequence", "stopType"],
                },
                RouteStopWithStop: {
                    allOf: [
                        { $ref: "#/components/schemas/RouteStop" },
                        {
                            type: "object",
                            properties: {
                                stop: { $ref: "#/components/schemas/Stop" },
                            },
                        },
                    ],
                },
                RouteStopWithRoute: {
                    allOf: [
                        { $ref: "#/components/schemas/RouteStop" },
                        {
                            type: "object",
                            properties: {
                                route: { $ref: "#/components/schemas/Route" },
                            },
                        },
                    ],
                },
                RouteWithStops: {
                    allOf: [
                        { $ref: "#/components/schemas/Route" },
                        {
                            type: "object",
                            properties: {
                                routeStops: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/RouteStopWithStop" },
                                },
                            },
                        },
                    ],
                },
                StopWithRoutes: {
                    allOf: [
                        { $ref: "#/components/schemas/Stop" },
                        {
                            type: "object",
                            properties: {
                                routeStops: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/RouteStopWithRoute" },
                                },
                            },
                        },
                    ],
                },
                CreateRouteInput: {
                    type: "object",
                    required: ["routeNumber", "routeName", "vehicleType"],
                    properties: {
                        routeNumber: { type: "integer", description: "Must be unique." },
                        routeName: { type: "string" },
                        vehicleType: { $ref: "#/components/schemas/VehicleType" },
                        status: { $ref: "#/components/schemas/RouteStatus", default: "ACTIVE" },
                    },
                },
                UpdateRouteInput: {
                    type: "object",
                    properties: {
                        routeName: { type: "string" },
                        vehicleType: { $ref: "#/components/schemas/VehicleType" },
                        status: { $ref: "#/components/schemas/RouteStatus" },
                    },
                },
                CreateStopInput: {
                    type: "object",
                    required: ["name", "latitude", "longitude"],
                    properties: {
                        name: { type: "string" },
                        latitude: { type: "number", format: "double" },
                        longitude: { type: "number", format: "double" },
                    },
                },
                UpdateStopInput: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        latitude: { type: "number", format: "double" },
                        longitude: { type: "number", format: "double" },
                    },
                },
                CreateRouteStopInput: {
                    type: "object",
                    required: ["routeId", "stopId", "stopType"],
                    properties: {
                        routeId: { type: "string", format: "uuid" },
                        stopId: { type: "string", format: "uuid" },
                        stopType: { $ref: "#/components/schemas/StopType" },
                        sequence: {
                            type: "integer",
                            description:
                                "Optional. If omitted, assigned automatically as the current max sequence + 1 (appends to the end).",
                        },
                    },
                },
                UpdateRouteStopInput: {
                    type: "object",
                    properties: {
                        sequence: {
                            type: "integer",
                            description:
                                "Moving to an occupied position shifts the other stops (auto-reorder) so sequences stay contiguous.",
                        },
                        stopType: { $ref: "#/components/schemas/StopType" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            description:
                                "Machine-readable error code (e.g. NOT_FOUND, DUPLICATE_ROUTE_STOP, MAX_TERMINALS_EXCEEDED, INVALID_SEQUENCE)",
                            example: "NOT_FOUND",
                        },
                        message: { type: "string", example: "Route not found" },
                    },
                    required: ["error", "message"],
                },
            },
            responses: {
                NotFound: {
                    description: "The requested resource was not found",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                        },
                    },
                },
                Conflict: {
                    description:
                        "Conflict with the current state (duplicate route+stop, exceeding the 2-terminal limit, or invalid/duplicate sequence)",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                        },
                    },
                },
                InternalError: {
                    description: "Unexpected server error",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                        },
                    },
                },
            },
            parameters: {
                RouteIdParam: {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "Route ID (UUID)",
                    schema: { type: "string", format: "uuid" },
                },
                StopIdParam: {
                    in: "path",
                    name: "id",
                    required: true,
                    description: "Stop ID (UUID)",
                    schema: { type: "string", format: "uuid" },
                },
                RouteStopRouteIdParam: {
                    in: "path",
                    name: "routeId",
                    required: true,
                    description: "Route ID (UUID)",
                    schema: { type: "string", format: "uuid" },
                },
                RouteStopStopIdParam: {
                    in: "path",
                    name: "stopId",
                    required: true,
                    description: "Stop ID (UUID)",
                    schema: { type: "string", format: "uuid" },
                },
                StopByRouteIdParam: {
                    in: "path",
                    name: "routeId",
                    required: true,
                    description: "Route ID (UUID)",
                    schema: { type: "string", format: "uuid" },
                },
            },
        },
    },
    apis: ["./src/app.ts", "./src/controllers/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;