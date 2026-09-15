import express, { Express, Request, Response } from "express";
import cors from "cors";
import routeRoutes from "./routes/route.routes";
import stopRoutes from "./routes/stop.routes";
import routeStopRoutes from "./routes/routeStop.routes";
import { swaggerSpec } from "./docs/swagger";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/route-stops", routeStopRoutes);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns API health status.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

/**
 * @openapi
 * /openapi.json:
 *   get:
 *     summary: Get the OpenAPI specification
 *     description: Returns the OpenAPI 3.0 spec consumed by the developer documentation UI.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: OpenAPI 3.0 specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get("/openapi.json", (_req: Request, res: Response) => {
    res.json(swaggerSpec);
});

export default app;