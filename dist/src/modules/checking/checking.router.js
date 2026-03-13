import express from "express";
export class CheckingRouter {
    checkingController;
    router;
    constructor(checkingController) {
        this.checkingController = checkingController;
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/submit", this.checkingController.submitCheck);
        this.router.get("/summary", this.checkingController.getDashboardSummary);
        this.router.get("/progress-stage", this.checkingController.getProgressByStage);
        this.router.get("/progress-line", this.checkingController.getProgressByLine);
        this.router.get("/ng-monitoring", this.checkingController.getNGMonitoring);
        this.router.get("/results", this.checkingController.getAllResults);
    }
    getRouter() {
        return this.router;
    }
}
