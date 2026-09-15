import { Router } from "express";
import { stopController } from "@/controllers/stop.controller";

const router: Router = Router();

router.post("/", stopController.createStop);
router.get("/", stopController.getAllStops);
router.get("/:id", stopController.getStopById);
router.get("/:id/with-routes", stopController.getStopWithRoutes);
router.get("/by-route/:routeId", stopController.getStopsByRouteId);
router.put("/:id", stopController.updateStop);
router.delete("/:id", stopController.deleteStop);

export default router;