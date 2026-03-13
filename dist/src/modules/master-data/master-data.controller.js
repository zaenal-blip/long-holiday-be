export class MasterDataController {
    masterDataService;
    constructor(masterDataService) {
        this.masterDataService = masterDataService;
    }
    // --- Lines ---
    getLines = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getLines();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createLine = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createLine(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateLine = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateLine(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteLine = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteLine(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    // --- Stages ---
    getStages = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getStages();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createStage = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createStage(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateStage = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateStage(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteStage = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteStage(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    // --- Man ---
    getManItems = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getManItems();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createManItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createManItem(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateManItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateManItem(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteManItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteManItem(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    // --- Machine ---
    getMachineItems = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getMachineItems();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createMachineItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createMachineItem(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateMachineItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateMachineItem(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteMachineItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteMachineItem(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    // --- Material ---
    getMaterialItems = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getMaterialItems();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createMaterialItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createMaterialItem(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateMaterialItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateMaterialItem(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteMaterialItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteMaterialItem(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    // --- Method ---
    getMethodItems = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getMethodItems();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createMethodItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createMethodItem(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateMethodItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateMethodItem(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteMethodItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteMethodItem(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    // --- Environment ---
    getEnvironmentItems = async (req, res, next) => {
        try {
            const result = await this.masterDataService.getEnvironmentItems();
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    createEnvironmentItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.createEnvironmentItem(req.body);
            res.status(201).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    updateEnvironmentItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.updateEnvironmentItem(req.params.id, req.body);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteEnvironmentItem = async (req, res, next) => {
        try {
            const result = await this.masterDataService.deleteEnvironmentItem(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
}
