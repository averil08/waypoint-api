import { Request, Response, NextFunction } from "express";
import { routeService } from "@/services/route.service";
import { CreateRouteInput, UpdateRouteInput } from "@/repositories/route.repository";

interface RouteParams {
    id: string;
}

export const routeController = {
    /**
     * @openapi
     * /api/routes:
     *   post:
     *     summary: Create a new route
     *     description: Route number must be unique.
     *     tags: [Route]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/CreateRouteInput"
     *     responses:
     *       201:
     *         description: Route created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Route"
     *       409:
     *         $ref: "#/components/responses/Conflict"
     */
    async createRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateRouteInput = req.body;
            const route = await routeService.createRoute(data);
            res.status(201).json(route);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/routes:
     *   get:
     *     summary: List all routes
     *     description: Returns all routes ordered by route number ascending.
     *     tags: [Route]
     *     responses:
     *       200:
     *         description: A list of routes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: "#/components/schemas/Route"
     */
    async getAllRoutes(req: Request, res: Response, next: NextFunction) {
        try {
            const routes = await routeService.getAllRoutes();
            res.json(routes);
        } catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/routes/{id}:
     *   get:
     *     summary: Get a route by ID
     *     tags: [Route]
     *     parameters:
     *       - $ref: "#/components/parameters/RouteIdParam"
     *     responses:
     *       200:
     *         description: Route found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Route"
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async getRouteById(req: Request<RouteParams>, res: Response, next: NextFunction) {
        try{
            const route = await routeService.getRouteById(req.params.id);
            res.json(route);
        }   catch(err){
            next(err);
        }
    },

    /**
     * @openapi
     * /api/routes/{id}/with-stops:
     *   get:
     *     summary: Get a route with its stops
     *     description: Returns the route plus its stops in sequence order.
     *     tags: [Route]
     *     parameters:
     *       - $ref: "#/components/parameters/RouteIdParam"
     *     responses:
     *       200:
     *         description: Route with nested stops
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/RouteWithStops"
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async getRouteWithStops (req: Request<RouteParams>, res: Response, next: NextFunction) {
        try {
            const route = await routeService.getRouteWithStops(req.params.id);
            res.json(route);
        }   catch (err) {
            next(err);
        }
    },

    /**
     * @openapi
     * /api/routes/{id}:
     *   put:
     *     summary: Update a route
     *     tags: [Route]
     *     parameters:
     *       - $ref: "#/components/parameters/RouteIdParam"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: "#/components/schemas/UpdateRouteInput"
     *     responses:
     *       200:
     *         description: Route updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Route"
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async updateRoute(req: Request<RouteParams>, res: Response, next: NextFunction) {
        try {
            const data: UpdateRouteInput = req.body;
            const route = await routeService.UpdateRouteInput(req.params.id, data);
            res.json(route);
        }   catch (err){
            next(err);
        }
    },

    /**
     * @openapi
     * /api/routes/{id}:
     *   delete:
     *     summary: Delete a route
     *     tags: [Route]
     *     parameters:
     *       - $ref: "#/components/parameters/RouteIdParam"
     *     responses:
     *       204:
     *         description: Route deleted (no content)
     *       404:
     *         $ref: "#/components/responses/NotFound"
     */
    async deleteRoute(req: Request<RouteParams>, res: Response, next: NextFunction) {
        try {
            await routeService.deleteRoute(req.params.id);
            res.status(204).send();
        }   catch (err){
            next(err);
        }
    }
};