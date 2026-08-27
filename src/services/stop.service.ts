import { stopRepository } from "@/repositories/stop.repository";
import { CreateStopInput, UpdateStopInput } from "@/repositories/stop.repository";

export const stopService = {
    async createStop(data: CreateStopInput) {
        return stopRepository.create(data);
    },

    async getAllStops() {
        return stopRepository.findAll();
    },

    async getStopById(id: string) {
        const stop = await stopRepository.findById(id);
        if (!stop) throw new Error("Stop not found");
        return stop;
    },

    async getStopWithRoutes(id: string) {
        const stop = await stopRepository.findWithRoutes(id);
        if (!stop) throw new Error("Stop not found");
        return stop;
    },

    async getStopsByRouteId(routeId: string) {
        return stopRepository.findByRouteId(routeId);
    },

    async updateStop(id: string, data: UpdateStopInput) {
        await this.getStopById(id);
        return stopRepository.update(id, data);
    },

    async deleteStop(id: string) {
        await this.getStopById(id);
        return stopRepository.delete(id);
    }
};