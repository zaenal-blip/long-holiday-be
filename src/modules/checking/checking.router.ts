import { Router } from "express";
import { CheckingController } from "./checking.controller.js";

export function createCheckingRouter(controller: CheckingController): Router {
    const router = Router();

    router.post("/submit", controller.submitCheck);
    router.get("/summary", controller.getDashboardSummary);
    router.get("/progress-line", controller.getProgressByLine);
    router.get("/progress-category", controller.getProgressByCategory);
    router.get("/ng-monitoring", controller.getNGMonitoring);
    router.get("/results", controller.getAllResults);

    return router;
}
