import express from "express";
export class MasterDataRouter {
    masterDataController;
    router;
    constructor(masterDataController) {
        this.masterDataController = masterDataController;
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        // Lines
        this.router.get("/lines", this.masterDataController.getLines);
        this.router.post("/lines", this.masterDataController.createLine);
        this.router.patch("/lines/:id", this.masterDataController.updateLine);
        this.router.delete("/lines/:id", this.masterDataController.deleteLine);
        // Stages
        this.router.get("/stages", this.masterDataController.getStages);
        this.router.post("/stages", this.masterDataController.createStage);
        this.router.patch("/stages/:id", this.masterDataController.updateStage);
        this.router.delete("/stages/:id", this.masterDataController.deleteStage);
        // Man Items
        this.router.get("/man-items", this.masterDataController.getManItems);
        this.router.post("/man-items", this.masterDataController.createManItem);
        this.router.patch("/man-items/:id", this.masterDataController.updateManItem);
        this.router.delete("/man-items/:id", this.masterDataController.deleteManItem);
        // Machine Items
        this.router.get("/machine-items", this.masterDataController.getMachineItems);
        this.router.post("/machine-items", this.masterDataController.createMachineItem);
        this.router.patch("/machine-items/:id", this.masterDataController.updateMachineItem);
        this.router.delete("/machine-items/:id", this.masterDataController.deleteMachineItem);
        // Material Items
        this.router.get("/material-items", this.masterDataController.getMaterialItems);
        this.router.post("/material-items", this.masterDataController.createMaterialItem);
        this.router.patch("/material-items/:id", this.masterDataController.updateMaterialItem);
        this.router.delete("/material-items/:id", this.masterDataController.deleteMaterialItem);
        // Method Items
        this.router.get("/method-items", this.masterDataController.getMethodItems);
        this.router.post("/method-items", this.masterDataController.createMethodItem);
        this.router.patch("/method-items/:id", this.masterDataController.updateMethodItem);
        this.router.delete("/method-items/:id", this.masterDataController.deleteMethodItem);
        // Environment Items
        this.router.get("/environment-items", this.masterDataController.getEnvironmentItems);
        this.router.post("/environment-items", this.masterDataController.createEnvironmentItem);
        this.router.patch("/environment-items/:id", this.masterDataController.updateEnvironmentItem);
        this.router.delete("/environment-items/:id", this.masterDataController.deleteEnvironmentItem);
    }
    getRouter() {
        return this.router;
    }
}
