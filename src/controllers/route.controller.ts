import { Request, Response, NextFunction } from "express";
import { routeService } from "@/services/route.service";
import { CreateRouteInput, UpdateRouteInput } from "@/repositories/route.repository";

interface RouteParams {
    id: string;
}

export const routeController = {
    async createRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateRouteInput = req.body;
            const route = await routeService.createRoute(data);
            res.status(201).json(route);
        } catch (err) {
            next(err);
        }
    },

    async getAllRoutes(req: Request, res: Response, next: NextFunction) {
        try {
            const routes = await routeService.getAllRoutes();
            res.json(routes);
        } catch (err) {
            next(err);
        }
    },

    async getRouteById(req: Request<RouteParams>, res: Response, next: NextFunction) {
        try{
            const route = await routeService.getRouteById(req.params.id);
            res.json(route);
        }   catch(err){
            next(err);
        }
    },

    async getRouteWithStops (req: Request<RouteParams>, res: Response, next: NextFunction) {
        try {
            const route = await routeService.getRouteWithStops(req.params.id);
            res.json(route);
        }   catch (err) {
            next(err);
        }
    },

    async updateRoute(req: Request<RouteParams>, res: Response, next: NextFunction) {
        try {
            const data: UpdateRouteInput = req.body;
            const route = await routeService.UpdateRouteInput(req.params.id, data);
            res.json(route);
        }   catch (err){
            next(err);
        }
    },

    async deleteRoute(req: Request<RouteParams>, res: Response, next: NextFunction) {
        try {
            await routeService.deleteRoute(req.params.id);
            res.status(204).send();
        }   catch (err){
            next(err);
        }
    }
};