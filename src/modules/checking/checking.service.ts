import { PrismaClient, Status } from "@prisma/client";

export class CheckingService {
    constructor(private prisma: PrismaClient) { }

    /**
     * Submit check results for a line on a given date.
     * Payload: { lineId, checkDate, results: [{ checkItemId, status, note? }] }
     */
    async submitCheck(data: {
        lineId: string;
        checkDate: string;
        results: Array<{ checkItemId: string; status: Status; note?: string }>;
    }) {
        const checkDate = new Date(data.checkDate || Date.now());

        for (const res of data.results) {
            // Upsert: find existing result for same checkItem + line + date
            const existing = await this.prisma.checkResult.findFirst({
                where: {
                    checkItemId: res.checkItemId,
                    lineId: data.lineId,
                    checkDate,
                },
            });

            if (existing) {
                await this.prisma.checkResult.update({
                    where: { id: existing.id },
                    data: { status: res.status, note: res.note },
                });
            } else {
                await this.prisma.checkResult.create({
                    data: {
                        checkItemId: res.checkItemId,
                        lineId: data.lineId,
                        status: res.status,
                        note: res.note,
                        checkDate,
                    },
                });
            }
        }

        return { success: true };
    }

    private buildWhereClause(filters: any) {
        const where: any = {};
        if (filters.lineId && filters.lineId !== "all") {
            where.lineId = filters.lineId;
        } else if (filters.departmentId && filters.departmentId !== "all") {
            where.line = { departmentId: filters.departmentId };
        }
        return where;
    }

    /**
     * Dashboard summary: total OK and NG counts.
     */
    async getDashboardSummary(filters: any) {
        const where = this.buildWhereClause(filters);

        const [okCount, ngCount] = await Promise.all([
            this.prisma.checkResult.count({ where: { ...where, status: "OK" } }),
            this.prisma.checkResult.count({ where: { ...where, status: "NG" } }),
        ]);

        return { okCount, ngCount };
    }

    /**
     * Progress by line: OK/NG counts per line.
     */
    async getProgressByLine(filters: any) {
        const lineWhere: any = {};
        if (filters.departmentId && filters.departmentId !== "all") {
            lineWhere.departmentId = filters.departmentId;
        }

        const lines = await this.prisma.line.findMany({
            where: lineWhere,
            include: { department: true },
            orderBy: { name: "asc" },
        });

        const progress = await Promise.all(
            lines.map(async (line) => {
                const [ok, ng] = await Promise.all([
                    this.prisma.checkResult.count({ where: { lineId: line.id, status: "OK" } }),
                    this.prisma.checkResult.count({ where: { lineId: line.id, status: "NG" } }),
                ]);
                return { id: line.id, name: line.name, department: line.department.name, total: ok + ng, ok, ng };
            })
        );

        return progress.filter((p) => p.total > 0);
    }

    /**
     * Progress by category: OK/NG counts per category.
     */
    async getProgressByCategory(filters: any) {
        const categories = await this.prisma.category.findMany({ orderBy: { name: "asc" } });
        const where = this.buildWhereClause(filters);

        const progress = await Promise.all(
            categories.map(async (cat) => {
                const [ok, ng] = await Promise.all([
                    this.prisma.checkResult.count({
                        where: { ...where, status: "OK", checkItem: { categoryId: cat.id } },
                    }),
                    this.prisma.checkResult.count({
                        where: { ...where, status: "NG", checkItem: { categoryId: cat.id } },
                    }),
                ]);
                return { id: cat.id, name: cat.name, total: ok + ng, ok, ng };
            })
        );

        return progress;
    }

    /**
     * NG monitoring: count NG results per line.
     */
    async getNGMonitoring(filters: any) {
        const where = this.buildWhereClause(filters);

        const results = await this.prisma.checkResult.groupBy({
            by: ["lineId"],
            where: { ...where, status: "NG" },
            _count: true,
        });

        const lines = await this.prisma.line.findMany();
        const lineMap = new Map(lines.map((l) => [l.id, l.name]));

        return results.map((r) => ({
            name: lineMap.get(r.lineId) || "Unknown",
            count: r._count,
        }));
    }

    /**
     * Get all results, optionally filtered.
     */
    async getAllResults(filters: any) {
        const where = this.buildWhereClause(filters);

        if (filters.status && filters.status !== "all") where.status = filters.status;
        if (filters.category && filters.category !== "all") {
            where.checkItem = { category: { name: filters.category } };
        }

        const results = await this.prisma.checkResult.findMany({
            where,
            include: {
                checkItem: { include: { category: true } },
                line: { include: { department: true } },
            },
            orderBy: { checkDate: "desc" },
        });

        return results.map((r) => ({
            id: r.id,
            checkDate: r.checkDate,
            line: r.line.name,
            department: r.line.department.name,
            category: r.checkItem.category.name,
            item: r.checkItem.itemName,
            status: r.status,
            note: r.note,
            createdAt: r.createdAt,
        }));
    }
}
