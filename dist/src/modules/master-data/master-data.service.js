export class MasterDataService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // --- Departments ---
    async getDepartments() {
        return this.prisma.department.findMany({ orderBy: { createdAt: "asc" } });
    }
    async createDepartment(data) {
        return this.prisma.department.create({ data });
    }
    async updateDepartment(id, data) {
        return this.prisma.department.update({ where: { id }, data });
    }
    async deleteDepartment(id) {
        return this.prisma.department.delete({ where: { id } });
    }
    // --- Lines ---
    async getLines(departmentId) {
        const where = departmentId ? { departmentId } : {};
        return this.prisma.line.findMany({
            where,
            include: { department: true },
            orderBy: { createdAt: "asc" },
        });
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
    // --- Categories (read-only, seeded) ---
    async getCategories() {
        return this.prisma.category.findMany({ orderBy: { name: "asc" } });
    }
    // --- Check Items ---
    async getCheckItems(lineId, categoryId) {
        return this.prisma.checkItem.findMany({
            where: { lineId, categoryId },
            orderBy: { createdAt: "asc" },
        });
    }
    async getAllCheckItems(lineId) {
        const where = lineId ? { lineId } : {};
        return this.prisma.checkItem.findMany({
            where,
            include: { line: true, category: true },
            orderBy: { createdAt: "asc" },
        });
    }
    async createCheckItem(data) {
        return this.prisma.checkItem.create({ data });
    }
    async updateCheckItem(id, data) {
        return this.prisma.checkItem.update({ where: { id }, data });
    }
    async deleteCheckItem(id) {
        return this.prisma.checkItem.delete({ where: { id } });
    }
}
