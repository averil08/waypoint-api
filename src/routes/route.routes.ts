import { Router } from "express";
import { routeController } from "@/controllers/route.controller";

const router = Router();

router.post("/", routeController.createRoute);
router.get("/", routeController.getAllRoutes);
router.get("/:id", routeController.getRouteById);
router.get("/:id/with-stops", routeController.getRouteWithStops);
router.put("/:id", routeController.updateRoute);
router.delete("/:id", routeController.deleteRoute);

export default router;