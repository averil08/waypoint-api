import { prisma } from "@/db/prisma";
import { routeStopRepository, CreateRouteStopInput, UpdateRouteStopInput } from "@/repositories/routeStop.repository";
import { routeRepository } from "@/repositories/route.repository";
import { stopRepository } from "@/repositories/stop.repository";

export class RouteStopError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "RouteStopError";
  }
}

const ERROR_CODES = {
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  STOP_NOT_FOUND: "STOP_NOT_FOUND",
  DUPLICATE_ROUTE_STOP: "DUPLICATE_ROUTE_STOP",
  MAX_TERMINALS_EXCEEDED: "MAX_TERMINALS_EXCEEDED",
  INVALID_SEQUENCE: "INVALID_SEQUENCE",
  ROUTE_STOP_NOT_FOUND: "ROUTE_STOP_NOT_FOUND",
} as const;

export const routeStopService = {
  async createRouteStop(data: CreateRouteStopInput) {
    const route = await routeRepository.findById(data.routeId);
    if (!route) throw new RouteStopError(ERROR_CODES.ROUTE_NOT_FOUND, "Route not found");

    const stop = await stopRepository.findById(data.stopId);
    if (!stop) throw new RouteStopError(ERROR_CODES.STOP_NOT_FOUND, "Stop not found");

    const existing = await routeStopRepository.findUnique(data.routeId, data.stopId);
    if (existing) throw new RouteStopError(ERROR_CODES.DUPLICATE_ROUTE_STOP, "Stop already added to this route");

    if (data.stopType === "TERMINAL") {
      const terminalCount = await routeStopRepository.countTerminals(data.routeId);
      if (terminalCount >= 2) {
        throw new RouteStopError(ERROR_CODES.MAX_TERMINALS_EXCEEDED, "Maximum 2 terminals allowed per route");
      }
    }

    let sequence = data.sequence;
    if (sequence === undefined) {
      sequence = await routeStopRepository.getMaxSequence(data.routeId) + 1;
    } else {
      const exists = await routeStopRepository.sequenceExists(data.routeId, sequence);
      if (exists) throw new RouteStopError(ERROR_CODES.INVALID_SEQUENCE, "Sequence already exists for this route");
    }

    return routeStopRepository.create({ ...data, sequence });
  },

  async updateRouteStop(routeId: string, stopId: string, data: UpdateRouteStopInput) {
    const existing = await routeStopRepository.findUnique(routeId, stopId);
    if (!existing) throw new RouteStopError(ERROR_CODES.ROUTE_STOP_NOT_FOUND, "Route stop not found");

    if (data.stopType === "TERMINAL" && existing.stopType !== "TERMINAL") {
      const terminalCount = await routeStopRepository.countTerminals(routeId);
      if (terminalCount >= 2) {
        throw new RouteStopError(ERROR_CODES.MAX_TERMINALS_EXCEEDED, "Maximum 2 terminals allowed per route");
      }
    }

    if (data.sequence !== undefined && data.sequence !== existing.sequence) {
      const maxSeq = await routeStopRepository.getMaxSequence(routeId);
      if (data.sequence < 1 || data.sequence > maxSeq) {
        throw new RouteStopError(ERROR_CODES.INVALID_SEQUENCE, `Sequence must be between 1 and ${maxSeq}`);
      }

      await routeStopRepository.reorderOnUpdate(routeId, existing.sequence, data.sequence);
    }

    return routeStopRepository.update(routeId, stopId, data);
  },

  async deleteRouteStop(routeId: string, stopId: string) {
    const existing = await routeStopRepository.findUnique(routeId, stopId);
    if (!existing) throw new RouteStopError(ERROR_CODES.ROUTE_STOP_NOT_FOUND, "Route stop not found");

    await prisma.$transaction(async (tx) => {
      await tx.routeStop.delete({ where: { routeId_stopId: { routeId, stopId } } });
      await tx.routeStop.updateMany({
        where: { routeId, sequence: { gt: existing.sequence } },
        data: { sequence: { decrement: 1 } },
      });
    });
  },
};