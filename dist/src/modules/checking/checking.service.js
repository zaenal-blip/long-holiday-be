export class CheckingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submitCheck(data) {
        const checkDate = new Date(data.checkDate || Date.now());
        // Upsert Session
        let session = await this.prisma.checkSession.findFirst({
            where: { checkDate, stageId: data.stageId, lineId: data.lineId },
        });
        if (!session) {
            session = await this.prisma.checkSession.create({
                data: { checkDate, stageId: data.stageId, lineId: data.lineId },
            });
        }
        const sessionId = session.id;
        // Process Man Results
        for (const res of data.manResults || []) {
            const existing = await this.prisma.manCheck.findFirst({
                where: { sessionId, itemId: res.itemId }
            });
            if (existing) {
                await this.prisma.manCheck.update({ where: { id: existing.id }, data: { status: res.status, remark: res.remark } });
            }
            else {
                await this.prisma.manCheck.create({ data: { sessionId, itemId: res.itemId, status: res.status, remark: res.remark } });
            }
        }
        // Process Machine Results
        for (const res of data.machineResults || []) {
            const existing = await this.prisma.machineCheck.findFirst({
                where: { sessionId, itemId: res.itemId }
            });
            if (existing) {
                await this.prisma.machineCheck.update({ where: { id: existing.id }, data: { status: res.status, remark: res.remark } });
            }
            else {
                await this.prisma.machineCheck.create({ data: { sessionId, itemId: res.itemId, status: res.status, remark: res.remark } });
            }
        }
        // Process Material Results
        for (const res of data.materialResults || []) {
            const existing = await this.prisma.materialCheck.findFirst({
                where: { sessionId, itemId: res.itemId }
            });
            if (existing) {
                await this.prisma.materialCheck.update({ where: { id: existing.id }, data: { status: res.status, remark: res.remark } });
            }
            else {
                await this.prisma.materialCheck.create({ data: { sessionId, itemId: res.itemId, status: res.status, remark: res.remark } });
            }
        }
        // Process Method Results
        for (const res of data.methodResults || []) {
            const existing = await this.prisma.methodCheck.findFirst({
                where: { sessionId, itemId: res.itemId }
            });
            if (existing) {
                await this.prisma.methodCheck.update({ where: { id: existing.id }, data: { status: res.status, remark: res.remark } });
            }
            else {
                await this.prisma.methodCheck.create({ data: { sessionId, itemId: res.itemId, status: res.status, remark: res.remark } });
            }
        }
        // Process Environment Results
        for (const res of data.environmentResults || []) {
            const existing = await this.prisma.environmentCheck.findFirst({
                where: { sessionId, itemId: res.itemId }
            });
            if (existing) {
                await this.prisma.environmentCheck.update({ where: { id: existing.id }, data: { status: res.status, remark: res.remark } });
            }
            else {
                await this.prisma.environmentCheck.create({ data: { sessionId, itemId: res.itemId, status: res.status, remark: res.remark } });
            }
        }
        return { success: true, sessionId };
    }
    // --- Helper to count from all 5 tables in a session ---
    countStatusFromSession(session, statusType) {
        let count = 0;
        const tables = ['manChecks', 'machineChecks', 'materialChecks', 'methodChecks', 'environmentChecks'];
        tables.forEach(table => {
            if (session[table]) {
                count += session[table].filter((item) => item.status === statusType).length;
            }
        });
        return count;
    }
    /**
     * Resolve lineId from query params.
     * Frontend may send: lineId (UUID) or department (line name)
     */
    async resolveLineId(filters) {
        if (filters.lineId && filters.lineId !== "all")
            return filters.lineId;
        if (filters.department && filters.department !== "all") {
            const line = await this.prisma.line.findFirst({ where: { name: filters.department } });
            return line?.id;
        }
        return undefined;
    }
    /**
     * Resolve stageId from query params.
     * Frontend may send: stageId (UUID) or stage (stage name)
     */
    async resolveStageId(filters) {
        if (filters.stageId && filters.stageId !== "all")
            return filters.stageId;
        if (filters.stage && filters.stage !== "all") {
            const stage = await this.prisma.stage.findFirst({ where: { name: filters.stage } });
            return stage?.id;
        }
        return undefined;
    }
    async getDashboardSummary(filters) {
        let where = {};
        const stageId = await this.resolveStageId(filters);
        const lineId = await this.resolveLineId(filters);
        if (stageId)
            where.stageId = stageId;
        if (lineId)
            where.lineId = lineId;
        const sessions = await this.prisma.checkSession.findMany({
            where,
            include: {
                manChecks: true, machineChecks: true, materialChecks: true, methodChecks: true, environmentChecks: true
            },
        });
        let okCount = 0;
        let ngCount = 0;
        sessions.forEach(session => {
            okCount += this.countStatusFromSession(session, "OK");
            ngCount += this.countStatusFromSession(session, "NG");
        });
        return { okCount, ngCount };
    }
    async getProgressByStage(filters) {
        const stages = await this.prisma.stage.findMany({ orderBy: { name: 'asc' } });
        const lineId = await this.resolveLineId(filters);
        const progress = await Promise.all(stages.map(async (stage) => {
            const sessionWhere = { stageId: stage.id };
            if (lineId)
                sessionWhere.lineId = lineId;
            const sessions = await this.prisma.checkSession.findMany({
                where: sessionWhere,
                include: { manChecks: true, machineChecks: true, materialChecks: true, methodChecks: true, environmentChecks: true }
            });
            let ok = 0, ng = 0;
            sessions.forEach(session => {
                ok += this.countStatusFromSession(session, "OK");
                ng += this.countStatusFromSession(session, "NG");
            });
            return { id: stage.id, name: stage.name, total: ok + ng, ok, ng };
        }));
        return progress;
    }
    async getProgressByLine(filters) {
        const lines = await this.prisma.line.findMany({ orderBy: { name: 'asc' } });
        const stageId = await this.resolveStageId(filters);
        const progress = await Promise.all(lines.map(async (line) => {
            const sessionWhere = { lineId: line.id };
            if (stageId)
                sessionWhere.stageId = stageId;
            const sessions = await this.prisma.checkSession.findMany({
                where: sessionWhere,
                include: { manChecks: true, machineChecks: true, materialChecks: true, methodChecks: true, environmentChecks: true }
            });
            let ok = 0, ng = 0;
            sessions.forEach(session => {
                ok += this.countStatusFromSession(session, "OK");
                ng += this.countStatusFromSession(session, "NG");
            });
            return { id: line.id, name: line.name, total: ok + ng, ok, ng };
        }));
        return progress;
    }
    async getNGMonitoring(filters) {
        let sessionWhere = {};
        const stageId = await this.resolveStageId(filters);
        if (stageId)
            sessionWhere.stageId = stageId;
        const sessions = await this.prisma.checkSession.findMany({
            where: sessionWhere,
            include: {
                line: true,
                manChecks: { where: { status: "NG" } },
                machineChecks: { where: { status: "NG" } },
                materialChecks: { where: { status: "NG" } },
                methodChecks: { where: { status: "NG" } },
                environmentChecks: { where: { status: "NG" } },
            }
        });
        const counts = {};
        sessions.forEach(session => {
            const lineName = session.line.name;
            if (!counts[lineName])
                counts[lineName] = 0;
            counts[lineName] += this.countStatusFromSession(session, "NG");
        });
        return Object.entries(counts).map(([name, count]) => ({ name, count }));
    }
    async getAllResults(filters) {
        let sessionWhere = {};
        const stageId = await this.resolveStageId(filters);
        const lineId = await this.resolveLineId(filters);
        if (stageId)
            sessionWhere.stageId = stageId;
        if (lineId)
            sessionWhere.lineId = lineId;
        const statusFilter = (filters.status && filters.status !== "all") ? { status: filters.status } : {};
        const categoryFilter = (filters.category && filters.category !== "all") ? filters.category : null;
        const sessions = await this.prisma.checkSession.findMany({
            where: sessionWhere,
            include: {
                stage: true,
                line: true,
                manChecks: (!categoryFilter || categoryFilter === "Man") ? { where: statusFilter, include: { item: true } } : false,
                machineChecks: (!categoryFilter || categoryFilter === "Machine") ? { where: statusFilter, include: { item: true } } : false,
                materialChecks: (!categoryFilter || categoryFilter === "Material") ? { where: statusFilter, include: { item: true } } : false,
                methodChecks: (!categoryFilter || categoryFilter === "Method") ? { where: statusFilter, include: { item: true } } : false,
                environmentChecks: (!categoryFilter || categoryFilter === "Environment") ? { where: statusFilter, include: { item: true } } : false,
            },
            orderBy: { checkDate: "desc" }
        });
        const results = [];
        sessions.forEach(session => {
            const baseInfo = {
                sessionId: session.id,
                checkDate: session.checkDate,
                stage: session.stage.name,
                line: session.line.name,
                createdAt: session.createdAt
            };
            if (session.manChecks) {
                session.manChecks.forEach(c => results.push({ ...baseInfo, id: c.id, category: "Man", item: c.item.name, status: c.status, remark: c.remark }));
            }
            if (session.machineChecks) {
                session.machineChecks.forEach(c => results.push({ ...baseInfo, id: c.id, category: "Machine", item: c.item.name, status: c.status, remark: c.remark }));
            }
            if (session.materialChecks) {
                session.materialChecks.forEach(c => results.push({ ...baseInfo, id: c.id, category: "Material", item: c.item.name, status: c.status, remark: c.remark }));
            }
            if (session.methodChecks) {
                session.methodChecks.forEach(c => results.push({ ...baseInfo, id: c.id, category: "Method", item: c.item.name, status: c.status, remark: c.remark }));
            }
            if (session.environmentChecks) {
                session.environmentChecks.forEach(c => results.push({ ...baseInfo, id: c.id, category: "Environment", item: c.item.name, status: c.status, remark: c.remark }));
            }
        });
        return results;
    }
}
