import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import { ApiError } from "./utils/api-error.js";
import { MasterDataService } from "./modules/master-data/master-data.service.js";
import { CheckingService } from "./modules/checking/checking.service.js";
import { ReflectionService } from "./modules/reflection/reflection.service.js";
import { MasterDataController } from "./modules/master-data/master-data.controller.js";
import { CheckingController } from "./modules/checking/checking.controller.js";
import { ReflectionController } from "./modules/reflection/reflection.controller.js";
import { createMasterDataRouter } from "./modules/master-data/master-data.router.js";
import { createCheckingRouter } from "./modules/checking/checking.router.js";
import { ReflectionRouter } from "./modules/reflection/reflection.router.js";

const PORT = process.env.PORT || 8000;

export class App {
  app: express.Express;

  constructor() {
    this.app = express();
    this.configure();
    this.registerModules();
    this.handleError();
  }

  private configure = () => {
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true
    }));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    
    this.app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      next();
    });
  };

  private registerModules = () => {
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
    const reflectionRouter = new ReflectionRouter(reflectionController);

    // entry point
    this.app.use("/public", express.static("public"));
    this.app.use("/master-data", createMasterDataRouter(masterDataController));
    this.app.use("/checking", createCheckingRouter(checkingController));
    this.app.use("/reflection", reflectionRouter.getRouter());
  };

  private handleError = () => {
    this.app.use(
      (
        err: ApiError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        const message = err.message || "Something went wrong!";
        const status = err.status || 500;
        res.status(status).send({ message });
      },
    );

    this.app.use((req: express.Request, res: express.Response) => {
      res.status(404).send({ message: "Route not found" });
    });
  };

  start() {
    this.app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  }
}
