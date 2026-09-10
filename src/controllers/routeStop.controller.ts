import { Request, Response, NextFunction } from "express";
import { routeStopService, RouteStopError } from "@/services/routeStop.service";
import { CreateRouteStopInput, UpdateRouteStopInput } from "@/repositories/routeStop.repository";

interface RouteStopParams {
  routeId: string;
  stopId: string;
}

export const routeStopController = {
  async createRouteStop(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateRouteStopInput = req.body;
      const routeStop = await routeStopService.createRouteStop(data);
      res.status(201).json(routeStop);
    } catch (err) {
      next(err);
    }
  },

  async updateRouteStop(req: Request<RouteStopParams>, res: Response, next: NextFunction) {
    try {
      const { routeId, stopId } = req.params;
      const data: UpdateRouteStopInput = req.body;
      const routeStop = await routeStopService.updateRouteStop(routeId, stopId, data);
      res.json(routeStop);
    } catch (err) {
      next(err);
    }
  },

  async deleteRouteStop(req: Request<RouteStopParams>, res: Response, next: NextFunction) {
    try {
      const { routeId, stopId } = req.params;
      await routeStopService.deleteRouteStop(routeId, stopId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export const routeStopErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof RouteStopError) {
    const statusMap: Record<string, number> = {
      ROUTE_NOT_FOUND: 404,
      STOP_NOT_FOUND: 404,
      ROUTE_STOP_NOT_FOUND: 404,
      DUPLICATE_ROUTE_STOP: 409,
      MAX_TERMINALS_EXCEEDED: 409,
      INVALID_SEQUENCE: 409,
    };
    const status = statusMap[err.code] ?? 500;
    return res.status(status).json({ error: err.code, message: err.message });
  }
  res.status(500).json({ error: "INTERNAL_ERROR", message: "An unexpected error occurred" });
};