//repository hides/encapsulates db implementation for simplification
import { prisma } from "@/db/prisma";
import { Route, RouteStatus, VehicleType } from "@prisma/client";

export interface CreateRouteInput {
    routeNumber: number;
    routeName: string;
    vehicleType: VehicleType;
    status?: RouteStatus;
}

export interface UpdateRouteInput {
    routeName?: string;
    vehicleType?: VehicleType;
    status?: RouteStatus;
}

export const routeRepository = {
    // CREATE
    async create(data: CreateRouteInput): Promise<Route> {
        return prisma.route.create({data});
    },

    // READ 
    async findAll(): Promise<Route[]> {
        return prisma.route.findMany({ orderBy: { routeNumber: "asc" }}); //find + read route data in ascending order
    },

    async findById(id: string): Promise<Route | null> {
        return prisma.route.findUnique({ where: { id }});
    },

    async findByRouteNumber(routeNumber: number): Promise<Route | null> {
        return prisma.route.findUnique({ where: { routeNumber }});
    },

    // UPDATE
    async update(id: string, data: UpdateRouteInput): Promise<Route | null> {
        return prisma.route.update({ where: {id}, data});
    },

    // DELETE
    async delete(id: string): Promise<Route> {
        return prisma.route.delete({ where: { id }});
    },

    // RELATIONAL QUERIES (service layer)
    async findWithStops(id: string) {
        return prisma.route.findUnique({
            where: { id },
            include: { routeStops: { include: { stop: true }, orderBy: { sequence: "asc" }}}
        });
    }
};