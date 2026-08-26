import { routeRepository } from "@/repositories/route.repository";
import { CreateRouteInput, UpdateRouteInput } from "@/repositories/route.repository";

export const routeService = {
    async createRoute(data: CreateRouteInput) {
        // Business logic: validate uniqueness
        const existing = await routeRepository.findByRouteNumber(data.routeNumber);
        if (existing) throw new Error("Route number already exists");

        return routeRepository.create(data);
    },

    async getAllRoutes() {
        return routeRepository.findAll();
    },

    async getRouteById(id: string) {
        const route = await routeRepository.findById(id);
        if(!route) throw new Error("Route not found");
        return route;
    },

    async getRouteWithStops(id: string) {
        const route = await routeRepository.findWithStops(id);
        if (!route) throw new Error("Route not found");
        return route;
    },

    async UpdateRouteInput(id: string, data: UpdateRouteInput) {
        await this.getRouteById(id); //validates existencee
        return routeRepository.update(id, data);
    },

    async deleteRoute(id: string) {
        await this.getRouteById(id); //validates existence
        return routeRepository.delete(id);
    }
};