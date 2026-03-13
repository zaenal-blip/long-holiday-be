export class ReflectionController {
    reflectionService;
    constructor(reflectionService) {
        this.reflectionService = reflectionService;
    }
    getReflection = async (req, res, next) => {
        try {
            const reflection = await this.reflectionService.getReflection();
            res.status(200).send(reflection ?? null);
        }
        catch (error) {
            next(error);
        }
    };
    uploadReflection = async (req, res, next) => {
        try {
            const { title } = req.body;
            if (!req.file) {
                res.status(400).send({ message: "PDF file is required" });
                return;
            }
            const imagePath = `/public/uploads/${req.file.filename}`;
            const reflection = await this.reflectionService.uploadReflection({
                title: title || req.file.originalname || "Reflection",
                imagePath,
            });
            res.status(201).send(reflection);
        }
        catch (error) {
            next(error);
        }
    };
    replaceReflection = async (req, res, next) => {
        try {
            const { title } = req.body;
            if (!req.file) {
                res.status(400).send({ message: "PDF file is required" });
                return;
            }
            const imagePath = `/public/uploads/${req.file.filename}`;
            const reflection = await this.reflectionService.replaceReflection({
                title: title || req.file.originalname || "Reflection",
                imagePath,
            });
            res.status(200).send(reflection);
        }
        catch (error) {
            next(error);
        }
    };
    deleteReflection = async (req, res, next) => {
        try {
            const result = await this.reflectionService.deleteReflection(req.params.id);
            res.status(200).send(result);
        }
        catch (error) {
            next(error);
        }
    };
}
