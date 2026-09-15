import { prisma } from "@/db/prisma";
import { RouteStop, StopType } from "@prisma/client";

export interface CreateRouteStopInput {
  routeId: string;
  stopId: string;
  sequence?: number;
  stopType: StopType;
}

export interface UpdateRouteStopInput {
  sequence?: number;
  stopType?: StopType;
}

export const routeStopRepository = {
  async create(data: CreateRouteStopInput): Promise<RouteStop> {
    const sequence = data.sequence ?? (await this.getMaxSequence(data.routeId) + 1);
    return prisma.routeStop.create({ data: { ...data, sequence } });
  },

  async findUnique(routeId: string, stopId: string): Promise<RouteStop | null> {
    return prisma.routeStop.findUnique({
      where: { routeId_stopId: { routeId, stopId } },
    });
  },

  async findByRouteId(routeId: string): Promise<RouteStop[]> {
    return prisma.routeStop.findMany({
      where: { routeId },
      include: { stop: true },
      orderBy: { sequence: "asc" },
    });
  },

  async findByStopId(stopId: string): Promise<RouteStop[]> {
    return prisma.routeStop.findMany({
      where: { stopId },
      include: { route: true },
      orderBy: { sequence: "asc" },
    });
  },

  async update(routeId: string, stopId: string, data: UpdateRouteStopInput): Promise<RouteStop | null> {
    return prisma.routeStop.update({
      where: { routeId_stopId: { routeId, stopId } },
      data,
    });
  },

  async delete(routeId: string, stopId: string): Promise<RouteStop> {
    return prisma.routeStop.delete({
      where: { routeId_stopId: { routeId, stopId } },
    });
  },

  async reorderAfterDelete(routeId: string, deletedSequence: number): Promise<void> {
    await prisma.routeStop.updateMany({
      where: {
        routeId,
        sequence: { gt: deletedSequence },
      },
      data: {
        sequence: { decrement: 1 },
      },
    });
  },

  async reorderOnUpdate(
    routeId: string,
    oldSequence: number,
    newSequence: number
  ): Promise<void> {
    if (oldSequence === newSequence) return;

    if (oldSequence < newSequence) {
      await prisma.routeStop.updateMany({
        where: {
          routeId,
          sequence: { gt: oldSequence, lte: newSequence },
        },
        data: {
          sequence: { decrement: 1 },
        },
      });
    } else {
      await prisma.routeStop.updateMany({
        where: {
          routeId,
          sequence: { gte: newSequence, lt: oldSequence },
        },
        data: {
          sequence: { increment: 1 },
        },
      });
    }
  },

  async countTerminals(routeId: string): Promise<number> {
    return prisma.routeStop.count({
      where: { routeId, stopType: "TERMINAL" },
    });
  },

  async getMaxSequence(routeId: string): Promise<number> {
    const result = await prisma.routeStop.findFirst({
      where: { routeId },
      orderBy: { sequence: "desc" },
      select: { sequence: true },
    });
    return result?.sequence ?? 0;
  },

  async sequenceExists(routeId: string, sequence: number): Promise<boolean> {
    const count = await prisma.routeStop.count({
      where: { routeId, sequence },
    });
    return count > 0;
  },
};