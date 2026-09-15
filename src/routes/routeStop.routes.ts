import { Router } from "express";
import { routeStopController, routeStopErrorHandler } from "@/controllers/routeStop.controller";

const router: Router = Router();

router.post("/", routeStopController.createRouteStop);
router.put("/:routeId/:stopId", routeStopController.updateRouteStop);
router.delete("/:routeId/:stopId", routeStopController.deleteRouteStop);

router.use(routeStopErrorHandler);

export default router;