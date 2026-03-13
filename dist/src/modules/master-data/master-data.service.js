export class MasterDataService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // --- Lines ---
    async getLines() {
        return this.prisma.line.findMany({ orderBy: { createdAt: 'asc' } });
    }
    async createLine(data) {
        return this.prisma.line.create({ data });
    }
    async updateLine(id, data) {
        return this.prisma.line.update({ where: { id }, data });
    }
    async deleteLine(id) {
        return this.prisma.line.delete({ where: { id } });
    }
    // --- Stages ---
    async getStages() {
        return this.prisma.stage.findMany();
    }
    async createStage(data) {
        return this.prisma.stage.create({ data });
    }
    async updateStage(id, data) {
        return this.prisma.stage.update({ where: { id }, data });
    }
    async deleteStage(id) {
        return this.prisma.stage.delete({ where: { id } });
    }
    // --- Man Items ---
    async getManItems() { return this.prisma.manItem.findMany(); }
    async createManItem(data) { return this.prisma.manItem.create({ data }); }
    async updateManItem(id, data) { return this.prisma.manItem.update({ where: { id }, data }); }
    async deleteManItem(id) { return this.prisma.manItem.delete({ where: { id } }); }
    // --- Machine Items ---
    async getMachineItems() { return this.prisma.machineItem.findMany(); }
    async createMachineItem(data) { return this.prisma.machineItem.create({ data }); }
    async updateMachineItem(id, data) { return this.prisma.machineItem.update({ where: { id }, data }); }
    async deleteMachineItem(id) { return this.prisma.machineItem.delete({ where: { id } }); }
    // --- Material Items ---
    async getMaterialItems() { return this.prisma.materialItem.findMany(); }
    async createMaterialItem(data) { return this.prisma.materialItem.create({ data }); }
    async updateMaterialItem(id, data) { return this.prisma.materialItem.update({ where: { id }, data }); }
    async deleteMaterialItem(id) { return this.prisma.materialItem.delete({ where: { id } }); }
    // --- Method Items ---
    async getMethodItems() { return this.prisma.methodItem.findMany(); }
    async createMethodItem(data) { return this.prisma.methodItem.create({ data }); }
    async updateMethodItem(id, data) { return this.prisma.methodItem.update({ where: { id }, data }); }
    async deleteMethodItem(id) { return this.prisma.methodItem.delete({ where: { id } }); }
    // --- Environment Items ---
    async getEnvironmentItems() { return this.prisma.environmentItem.findMany(); }
    async createEnvironmentItem(data) { return this.prisma.environmentItem.create({ data }); }
    async updateEnvironmentItem(id, data) { return this.prisma.environmentItem.update({ where: { id }, data }); }
    async deleteEnvironmentItem(id) { return this.prisma.environmentItem.delete({ where: { id } }); }
}
