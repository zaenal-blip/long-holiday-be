import { Router } from "express";
import { MasterDataController } from "./master-data.controller.js";

export function createMasterDataRouter(controller: MasterDataController): Router {
    const router = Router();

    // Departments
    router.get("/departments", controller.getDepartments);
    router.post("/departments", controller.createDepartment);
    router.patch("/departments/:id", controller.updateDepartment);
    router.delete("/departments/:id", controller.deleteDepartment);

    // Lines
    router.get("/lines", controller.getLines);
    router.post("/lines", controller.createLine);
    router.patch("/lines/:id", controller.updateLine);
    router.delete("/lines/:id", controller.deleteLine);

    // Categories
    router.get("/categories", controller.getCategories);

    // Check Items
    router.get("/check-items", controller.getCheckItems);
    router.post("/check-items", controller.createCheckItem);
    router.patch("/check-items/:id", controller.updateCheckItem);
    router.delete("/check-items/:id", controller.deleteCheckItem);

    // Stages
    router.get("/stages", controller.getStages);
    router.post("/stages", controller.createStage);
    router.patch("/stages/:id", controller.updateStage);
    router.delete("/stages/:id", controller.deleteStage);

    return router;
}
