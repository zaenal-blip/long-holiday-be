import { Router } from "express";
export function createMasterDataRouter(controller) {
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
    return router;
}
