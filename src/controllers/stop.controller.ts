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
    async createStop(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateStopInput = req.body;
            const stop = await stopService.createStop(data);
            res.status(201).json(stop);
        } catch (err) {
            next(err);
        }
    },

    async getAllStops(req: Request, res: Response, next: NextFunction) {
        try {
            const stops = await stopService.getAllStops();
            res.json(stops);
        } catch (err) {
            next(err);
        }
    },

    async getStopById(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            const stop = await stopService.getStopById(req.params.id);
            res.json(stop);
        } catch (err) {
            next(err);
        }
    },

    async getStopWithRoutes(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            const stop = await stopService.getStopWithRoutes(req.params.id);
            res.json(stop);
        } catch (err) {
            next(err);
        }
    },

    async getStopsByRouteId(req: Request<RouteIdParams>, res: Response, next: NextFunction) {
        try {
            const stops = await stopService.getStopsByRouteId(req.params.routeId);
            res.json(stops);
        } catch (err) {
            next(err);
        }
    },

    async updateStop(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            const data: UpdateStopInput = req.body;
            const stop = await stopService.updateStop(req.params.id, data);
            res.json(stop);
        } catch (err) {
            next(err);
        }
    },

    async deleteStop(req: Request<StopParams>, res: Response, next: NextFunction) {
        try {
            await stopService.deleteStop(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
};