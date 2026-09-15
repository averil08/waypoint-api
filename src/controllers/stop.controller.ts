import { Request, Response, NextFunction } from "express";
import { stopService } from "@/services/stop.service";
import { CreateStopInput, UpdateStopInput } from "@/repositories/stop.repository";

interface StopParams {
    id: string;
}

interface RouteIdParams {
    routeId: string;
}

export const stopController = {
    /**
     * @openapi
     * /api/stops:
     *   post:
     *     summary: Create a new stop
     *     tags: [Stop]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/CreateStopInput"
     *     responses:
     *       201:
     *         description: Stop created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Stop"
     */
    async createStop(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateStopInput = req.body;
            const stop = await stopService.createStop(data);
            res.status(201).json(stop);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/stops:
     *   get:
     *     summary: List all stops
     *     description: Returns all stops ordered by name ascending.
     *     tags: [Stop]
     *     responses:
     *       200:
     *         description: A list of stops
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/Stop"
     */
    async getAllStops(req: Request, res: Response, next: NextFunction) {
        try {
            const stops = await stopService.getAllStops();
            res.json(stops);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/stops/{id}:
     *   get:
     *     summary: Get a stop by ID
     *     tags: [Stop]
     *     parameters:
     *       - $ref: "#/components/parameters/StopIdParam"
     *     responses:
     *       200:
     *         description: Stop found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Stop"
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async getStopById(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            const stop = await stopService.getStopById(req.params.id);
            res.json(stop);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/stops/{id}/with-routes:
     *   get:
     *     summary: Get a stop with its routes
     *     description: Returns the stop plus every route that serves it, in sequence order.
     *     tags: [Stop]
     *     parameters:
     *       - $ref: "#/components/parameters/StopIdParam"
     *     responses:
     *       200:
     *         description: Stop with nested routes
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/StopWithRoutes"
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async getStopWithRoutes(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            const stop = await stopService.getStopWithRoutes(req.params.id);
            res.json(stop);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/stops/by-route/{routeId}:
     *   get:
     *     summary: Get the stops assigned to a route
     *     description: Returns the route-stop join records with nested stop, in sequence order.
     *     tags: [Stop]
     *     parameters:
     *       - $ref: "#/components/parameters/StopByRouteIdParam"
     *     responses:
     *       200:
     *         description: Route-stop records for the route
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/RouteStopWithStop"
     */
    async getStopsByRouteId(req: Request<RouteIdParams>, res: Response, next: NextFunction) {
        try {
            const stops = await stopService.getStopsByRouteId(req.params.routeId);
            res.json(stops);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/stops/{id}:
     *   put:
     *     summary: Update a stop
     *     tags: [Stop]
     *     parameters:
     *       - $ref: "#/components/parameters/StopIdParam"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/UpdateStopInput"
     *     responses:
     *       200:
     *         description: Stop updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Stop"
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async updateStop(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            const data: UpdateStopInput = req.body;
            const stop = await stopService.updateStop(req.params.id, data);
            res.json(stop);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/stops/{id}:
     *   delete:
     *     summary: Delete a stop
     *     tags: [Stop]
     *     parameters:
     *       - $ref: "#/components/parameters/StopIdParam"
     *     responses:
     *       204:
     *         description: Stop deleted (no content)
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async deleteStop(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            await stopService.deleteStop(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
};