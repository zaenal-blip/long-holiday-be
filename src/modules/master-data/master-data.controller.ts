import { Request, Response, NextFunction } from "express";
import { MasterDataService } from "./master-data.service.js";

export class MasterDataController {
    constructor(private service: MasterDataService) { }

    private handleDeleteError = (error: any, res: Response, next: NextFunction) => {
        if (error && error.code === "P2003") {
            return res.status(400).json({ error: "Cannot delete: item is referenced by existing records." });
        }
        if (error && error.code === "P2025") {
            return res.status(404).json({ error: "Record not found." });
        }
        next(error);
    };

    // --- Departments ---
    getDepartments = async (_req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getDepartments()); } catch (e) { next(e); }
    };
    createDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try { res.status(201).json(await this.service.createDepartment(req.body)); } catch (e) { next(e); }
    };
    updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.updateDepartment(req.params.id as string, req.body)); } catch (e) { next(e); }
    };
    deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.deleteDepartment(req.params.id as string)); } catch (e) { this.handleDeleteError(e, res, next); }
    };

    // --- Lines ---
    getLines = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getLines(req.query.departmentId as string | undefined)); } catch (e) { next(e); }
    };
    createLine = async (req: Request, res: Response, next: NextFunction) => {
        try { res.status(201).json(await this.service.createLine(req.body)); } catch (e) { next(e); }
    };
    updateLine = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.updateLine(req.params.id as string, req.body)); } catch (e) { next(e); }
    };
    deleteLine = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.deleteLine(req.params.id as string)); } catch (e) { this.handleDeleteError(e, res, next); }
    };

    // --- Categories ---
    getCategories = async (_req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.getCategories()); } catch (e) { next(e); }
    };

    // --- Check Items ---
    getCheckItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lineId = req.query.lineId as string | undefined;
            const categoryId = req.query.categoryId as string | undefined;
            if (lineId && categoryId) {
                res.json(await this.service.getCheckItems(lineId, categoryId));
            } else {
                res.json(await this.service.getAllCheckItems(lineId));
            }
        } catch (e) { next(e); }
    };
    createCheckItem = async (req: Request, res: Response, next: NextFunction) => {
        try { res.status(201).json(await this.service.createCheckItem(req.body)); } catch (e) { next(e); }
    };
    updateCheckItem = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.updateCheckItem(req.params.id as string, req.body)); } catch (e) { next(e); }
    };
    deleteCheckItem = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json(await this.service.deleteCheckItem(req.params.id as string)); } catch (e) { this.handleDeleteError(e, res, next); }
    };
}
