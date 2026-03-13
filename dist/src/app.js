import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import { MasterDataService } from "./modules/master-data/master-data.service.js";
import { CheckingService } from "./modules/checking/checking.service.js";
import { ReflectionService } from "./modules/reflection/reflection.service.js";
import { MasterDataController } from "./modules/master-data/master-data.controller.js";
import { CheckingController } from "./modules/checking/checking.controller.js";
import { ReflectionController } from "./modules/reflection/reflection.controller.js";
import { MasterDataRouter } from "./modules/master-data/master-data.router.js";
import { CheckingRouter } from "./modules/checking/checking.router.js";
import { ReflectionRouter } from "./modules/reflection/reflection.router.js";
const PORT = 8000;
export class App {
    app;
    constructor() {
        this.app = express();
        this.configure();
        this.registerModules();
        this.handleError();
    }
    configure = () => {
        this.app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
        }));
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    };
    registerModules = () => {
        // shared dependency
        const prismaClient = prisma;
        // services
        const masterDataService = new MasterDataService(prismaClient);
        const checkingService = new CheckingService(prismaClient);
        const reflectionService = new ReflectionService(prismaClient);
        // controllers
        const masterDataController = new MasterDataController(masterDataService);
        const checkingController = new CheckingController(checkingService);
        const reflectionController = new ReflectionController(reflectionService);
        // routes
        const masterDataRouter = new MasterDataRouter(masterDataController);
        const checkingRouter = new CheckingRouter(checkingController);
        const reflectionRouter = new ReflectionRouter(reflectionController);
        // entry point
        this.app.use("/public", express.static("public")); // ADDED: setup static serving for uploaded files
        this.app.use("/master-data", masterDataRouter.getRouter());
        this.app.use("/checking", checkingRouter.getRouter());
        this.app.use("/reflection", reflectionRouter.getRouter());
    };
    handleError = () => {
        this.app.use((err, req, res, next) => {
            const message = err.message || "Something went wrong!";
            const status = err.status || 500;
            res.status(status).send({ message });
        });
        this.app.use((req, res) => {
            res.status(404).send({ message: "Route not found" });
        });
    };
    start() {
        this.app.listen(PORT, () => {
            console.log(`Server running on port : ${PORT}`);
        });
    }
}
