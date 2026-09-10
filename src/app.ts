import express, { Express, Request, Response } from "express";
import routeRoutes from "./routes/route.routes";
import stopRoutes from "./routes/stop.routes";
import routeStopRoutes from "./routes/routeStop.routes";

const app: Express = express();

app.use(express.json());

app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/route-stops", routeStopRoutes);

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

export default app;