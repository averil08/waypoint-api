import { prisma } from "@/db/prisma";
import { Stop, RouteStop } from "@prisma/client";

export interface CreateStopInput {
    name: string;
    latitude: number;
    longitude: number;
}

export interface UpdateStopInput {
    name?: string;
    latitude?: number;
    longitude?: number;
}

export const stopRepository = {
    // CREATE
    async create(data: CreateStopInput): Promise<Stop> {
        return prisma.stop.create({data});
    },

    // READ
    async findAll(): Promise<Stop[]> {
        return prisma.stop.findMany({ orderBy: { name: "asc" }});
    },

    async findById(id: string): Promise<Stop | null> {
        return prisma.stop.findUnique({ where: { id }});
    },

    // UPDATE
    async update(id: string, data: UpdateStopInput):
    Promise<Stop | null> {
        return prisma.stop.update({ where: { id }, data});
    },

    // DELETE
    async delete(id: string): Promise<Stop> {
        return prisma.stop.delete({ where: { id }});
    },

    // RELATIONAL QUERIES (service layer)
    async findWithRoutes(id: string) {
        return prisma.stop.findUnique({
            where: { id },
            include: { routeStops: { include: { route: true }, orderBy: { sequence: "asc" }}}
        });
    },

    //Find all stops for a specific route
    async findByRouteId(routeId: string) {
        return prisma.routeStop.findMany({
            where: { routeId },
            include: { stop: true },
            orderBy: { sequence: "asc" }
        });
    }
};