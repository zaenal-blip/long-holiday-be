import express, { Router } from "express";
import { ReflectionController } from "./reflection.controller.js";
import { upload } from "../../middleware/upload.js";

export class ReflectionRouter {
    private router: Router;

    constructor(private reflectionController: ReflectionController) {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes() {
        // GET /reflection/latest — get the latest reflection image
        this.router.get("/latest", this.reflectionController.getReflection);
        // GET /reflection/ — also works as alias
        this.router.get("/", this.reflectionController.getReflection);
        // POST /reflection/upload — upload a new reflection image
        this.router.post("/upload", upload.single("file"), this.reflectionController.uploadReflection);
        // PUT /reflection/replace — replace the current reflection image
        this.router.put("/replace", upload.single("file"), this.reflectionController.replaceReflection);
        // POST /reflection/ — also works as alias for upload
        this.router.post("/", upload.single("file"), this.reflectionController.uploadReflection);
        // DELETE /reflection/:id — delete a specific reflection
        this.router.delete("/:id", this.reflectionController.deleteReflection);
    }

    getRouter() {
        return this.router;
    }
}
