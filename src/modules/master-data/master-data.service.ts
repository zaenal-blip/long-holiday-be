import { PrismaClient } from "@prisma/client";

export class MasterDataService {
    constructor(private prisma: PrismaClient) { }

    // --- Departments ---
    async getDepartments() {
        return this.prisma.department.findMany({ orderBy: { createdAt: "asc" } });
    }
    async createDepartment(data: { name: string }) {
        return this.prisma.department.create({ data });
    }
    async updateDepartment(id: string, data: { name: string }) {
        return this.prisma.department.update({ where: { id }, data });
    }
    async deleteDepartment(id: string) {
        return this.prisma.department.delete({ where: { id } });
    }

    // --- Lines ---
    async getLines(departmentId?: string) {
        const where = departmentId ? { departmentId } : {};
        return this.prisma.line.findMany({
            where,
            include: { department: true },
            orderBy: { createdAt: "asc" },
        });
    }
    async createLine(data: { name: string; departmentId: string }) {
        return this.prisma.line.create({ data });
    }
    async updateLine(id: string, data: { name: string }) {
        return this.prisma.line.update({ where: { id }, data });
    }
    async deleteLine(id: string) {
        return this.prisma.line.delete({ where: { id } });
    }

    // --- Categories (read-only, seeded) ---
    async getCategories() {
        return this.prisma.category.findMany({ orderBy: { name: "asc" } });
    }

    // --- Check Items ---
    async getCheckItems(lineId: string, categoryId: string) {
        return this.prisma.checkItem.findMany({
            where: { lineId, categoryId },
            orderBy: { createdAt: "asc" },
        });
    }
    async getAllCheckItems(lineId?: string) {
        const where = lineId ? { lineId } : {};
        return this.prisma.checkItem.findMany({
            where,
            include: { line: true, category: true },
            orderBy: { createdAt: "asc" },
        });
    }
    async createCheckItem(data: { lineId: string; categoryId: string; itemName: string; checkDescription: string }) {
        return this.prisma.checkItem.create({ data });
    }
    async updateCheckItem(id: string, data: { itemName?: string; checkDescription?: string }) {
        return this.prisma.checkItem.update({ where: { id }, data });
    }
    async deleteCheckItem(id: string) {
        return this.prisma.checkItem.delete({ where: { id } });
    }
}
