export class MasterDataController {
    service;
    constructor(service) {
        this.service = service;
    }
    handleDeleteError = (error, res, next) => {
        if (error && error.code === "P2003") {
            return res.status(400).json({ error: "Cannot delete: item is referenced by existing records." });
        }
        if (error && error.code === "P2025") {
            return res.status(404).json({ error: "Record not found." });
        }
        next(error);
    };
    // --- Departments ---
    getDepartments = async (_req, res, next) => {
        try {
            res.json(await this.service.getDepartments());
        }
        catch (e) {
            next(e);
        }
    };
    createDepartment = async (req, res, next) => {
        try {
            res.status(201).json(await this.service.createDepartment(req.body));
        }
        catch (e) {
            next(e);
        }
    };
    updateDepartment = async (req, res, next) => {
        try {
            res.json(await this.service.updateDepartment(req.params.id, req.body));
        }
        catch (e) {
            next(e);
        }
    };
    deleteDepartment = async (req, res, next) => {
        try {
            res.json(await this.service.deleteDepartment(req.params.id));
        }
        catch (e) {
            this.handleDeleteError(e, res, next);
        }
    };
    // --- Lines ---
    getLines = async (req, res, next) => {
        try {
            res.json(await this.service.getLines(req.query.departmentId));
        }
        catch (e) {
            next(e);
        }
    };
    createLine = async (req, res, next) => {
        try {
            res.status(201).json(await this.service.createLine(req.body));
        }
        catch (e) {
            next(e);
        }
    };
    updateLine = async (req, res, next) => {
        try {
            res.json(await this.service.updateLine(req.params.id, req.body));
        }
        catch (e) {
            next(e);
        }
    };
    deleteLine = async (req, res, next) => {
        try {
            res.json(await this.service.deleteLine(req.params.id));
        }
        catch (e) {
            this.handleDeleteError(e, res, next);
        }
    };
    // --- Categories ---
    getCategories = async (_req, res, next) => {
        try {
            res.json(await this.service.getCategories());
        }
        catch (e) {
            next(e);
        }
    };
    // --- Check Items ---
    getCheckItems = async (req, res, next) => {
        try {
            const lineId = req.query.lineId;
            const categoryId = req.query.categoryId;
            if (lineId && categoryId) {
                res.json(await this.service.getCheckItems(lineId, categoryId));
            }
            else {
                res.json(await this.service.getAllCheckItems(lineId));
            }
        }
        catch (e) {
            next(e);
        }
    };
    createCheckItem = async (req, res, next) => {
        try {
            res.status(201).json(await this.service.createCheckItem(req.body));
        }
        catch (e) {
            next(e);
        }
    };
    updateCheckItem = async (req, res, next) => {
        try {
            res.json(await this.service.updateCheckItem(req.params.id, req.body));
        }
        catch (e) {
            next(e);
        }
    };
    deleteCheckItem = async (req, res, next) => {
        try {
            res.json(await this.service.deleteCheckItem(req.params.id));
        }
        catch (e) {
            this.handleDeleteError(e, res, next);
        }
    };
}
