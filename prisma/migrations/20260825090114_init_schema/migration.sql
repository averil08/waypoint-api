-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('JEEPNEY', 'MODERNJEEP', 'TAXI');

-- CreateEnum
CREATE TYPE "RouteStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "StopType" AS ENUM ('TERMINAL', 'INTERCHANGE');

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "route_number" INTEGER NOT NULL,
    "route_name" TEXT NOT NULL,
    "vehicle_type" "VehicleType" NOT NULL,
    "route_status" "RouteStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_stop" (
    "route_id" TEXT NOT NULL,
    "stop_id" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "stop_type" "StopType" NOT NULL,

    CONSTRAINT "route_stop_pkey" PRIMARY KEY ("route_id","stop_id")
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_route_number_key" ON "Route"("route_number");

-- CreateIndex
CREATE INDEX "route_stop_route_id_idx" ON "route_stop"("route_id");

-- CreateIndex
CREATE INDEX "route_stop_stop_id_idx" ON "route_stop"("stop_id");

-- AddForeignKey
ALTER TABLE "route_stop" ADD CONSTRAINT "route_stop_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_stop" ADD CONSTRAINT "route_stop_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "Stop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
