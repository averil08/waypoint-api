import { Request, Response, NextFunction } from "express";
import { routeStopService, RouteStopError } from "@/services/routeStop.service";
import { CreateRouteStopInput, UpdateRouteStopInput } from "@/repositories/routeStop.repository";

interface RouteStopParams {
  routeId: string;
  stopId: string;
}

export const routeStopController = {
  /**
   * @openapi
   * /api/route-stops:
   *   post:
   *     summary: Add a stop to a route
   *     description: >
   *       Assigns a stop to a route. If sequence is omitted it is auto-assigned as the current
   *       max sequence + 1. A route may have at most 2 TERMINAL stops, and a stop can be added
   *       to a route only once.
   *     tags: [RouteStop]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/CreateRouteStopInput"
   *     responses:
   *       201:
   *         description: Route-stop created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/RouteStop"
   *       404:
   *         $ref: "#/components/responses/NotFound"
   *       409:
   *         $ref: "#/components/responses/Conflict"
   */
  async createRouteStop(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateRouteStopInput = req.body;
      const routeStop = await routeStopService.createRouteStop(data);
      res.status(201).json(routeStop);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @openapi
   * /api/route-stops/{routeId}/{stopId}:
   *   put:
   *     summary: Update a route-stop assignment
   *     description: >
   *       Update the sequence and/or stop type of an existing route-stop record. Moving a stop
   *       to an occupied sequence position shifts the other stops automatically so sequences
   *       stay contiguous (1, 2, 3, ...). Changing stopType to TERMINAL is limited to 2 per route.
   *     tags: [RouteStop]
   *     parameters:
   *       - $ref: "#/components/parameters/RouteStopRouteIdParam"
   *       - $ref: "#/components/parameters/RouteStopStopIdParam"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/UpdateRouteStopInput"
   *     responses:
   *       200:
   *         description: Route-stop updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/RouteStop"
   *       404:
   *         $ref: "#/components/responses/NotFound"
   *       409:
   *         $ref: "#/components/responses/Conflict"
   */
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

  /**
   * @openapi
   * /api/route-stops/{routeId}/{stopId}:
   *   delete:
   *     summary: Remove a stop from a route
   *     description: Removes the assignment and re-sequences the remaining stops so sequences stay contiguous.
   *     tags: [RouteStop]
   *     parameters:
   *       - $ref: "#/components/parameters/RouteStopRouteIdParam"
   *       - $ref: "#/components/parameters/RouteStopStopIdParam"
   *     responses:
   *       204:
   *         description: Route-stop deleted (no content)
   *       404:
   *         $ref: "#/components/responses/NotFound"
   */
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