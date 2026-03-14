export class CheckingController {
    service;
    constructor(service) {
        this.service = service;
    }
    submitCheck = async (req, res, next) => {
        try {
            res.status(201).json(await this.service.submitCheck(req.body));
        }
        catch (e) {
            next(e);
        }
    };
    getDashboardSummary = async (req, res, next) => {
        try {
            res.json(await this.service.getDashboardSummary(req.query));
        }
        catch (e) {
            next(e);
        }
    };
    getProgressByLine = async (req, res, next) => {
        try {
            res.json(await this.service.getProgressByLine(req.query));
        }
        catch (e) {
            next(e);
        }
    };
    getProgressByCategory = async (req, res, next) => {
        try {
            res.json(await this.service.getProgressByCategory(req.query));
        }
        catch (e) {
            next(e);
        }
    };
    getNGMonitoring = async (req, res, next) => {
        try {
            res.json(await this.service.getNGMonitoring(req.query));
        }
        catch (e) {
            next(e);
        }
    };
    getAllResults = async (req, res, next) => {
        try {
            res.json(await this.service.getAllResults(req.query));
        }
        catch (e) {
            next(e);
        }
    };
}
