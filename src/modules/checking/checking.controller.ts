import { Request, Response, NextFunction } from "express";
import { CheckingService } from "./checking.service.js";

export class CheckingController {
    constructor(private service: CheckingService) { }

    submitCheck = async (req: Request, res: Response, next: NextFunction) => {
        try { res.status(201).json(await this.service.submitCheck(req.body)); } catch (e) { next(e); }
    };

    getDashboardSummary = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getDashboardSummary(req.query)); } catch (e) { next(e); }
    };

    getProgressByLine = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getProgressByLine(req.query)); } catch (e) { next(e); }
    };

    getProgressByCategory = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getProgressByCategory(req.query)); } catch (e) { next(e); }
    };

    getNGMonitoring = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getNGMonitoring(req.query)); } catch (e) { next(e); }
    };

    getAllResults = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getAllResults(req.query)); } catch (e) { next(e); }
    };
}
