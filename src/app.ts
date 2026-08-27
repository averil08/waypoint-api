import express, { Express, Request, Response } from "express";
import routeRoutes from "./routes/route.routes";
import stopRoutes from "./routes/stop.routes";

const app: Express = express();

app.use(express.json());

app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

export default app;