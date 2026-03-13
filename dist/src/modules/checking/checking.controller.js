export class CheckingController {
    checkingService;
    constructor(checkingService) {
        this.checkingService = checkingService;
    }
    submitCheck = async (req, res, next) => {
        try {
            const result = await this.checkingService.submitCheck(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    getDashboardSummary = async (req, res, next) => {
        try {
            const summary = await this.checkingService.getDashboardSummary(req.query);
            res.status(200).send(summary);
        }
        catch (error) {
            next(error);
        }
    };
    getProgressByStage = async (req, res, next) => {
        try {
            const progress = await this.checkingService.getProgressByStage(req.query);
            res.status(200).send(progress);
        }
        catch (error) {
            next(error);
        }
    };
    getProgressByLine = async (req, res, next) => {
        try {
            const progress = await this.checkingService.getProgressByLine(req.query);
            res.status(200).send(progress);
        }
        catch (error) {
            next(error);
        }
    };
    getNGMonitoring = async (req, res, next) => {
        try {
            const monitoring = await this.checkingService.getNGMonitoring(req.query);
            res.status(200).send(monitoring);
        }
        catch (error) {
            next(error);
        }
    };
    getAllResults = async (req, res, next) => {
        try {
            const results = await this.checkingService.getAllResults(req.query);
            res.status(200).send(results);
        }
        catch (error) {
            next(error);
        }
    };
}
