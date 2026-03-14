import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString }, { schema: "public" });
const prisma = new PrismaClient({ adapter });

async function main() {
    // Seed Categories (global, static)
    const categoryNames = ["Man", "Machine", "Material", "Method", "Environment"];
    for (const name of categoryNames) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
    console.log("✅ Categories seeded");

    // Seed Departments
    const departmentNames = ["Production", "Maintenance", "Quality", "Kaizen", "Tool Coolant", "Office", "Die Maintenance", "PAD"];
    for (const name of departmentNames) {
        await prisma.department.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }
    console.log("✅ Departments seeded");

    // Seed Lines for Production department
    const production = await prisma.department.findUnique({ where: { name: "Production" } });
    if (production) {
        const lineNames = ["Main Line", "Sub Line", "Cylinder Block", "Cylinder Head", "Cam Shaft", "Crank Shaft", "Low Pressure", "Die Casting", "Clean Room"];
        for (const name of lineNames) {
            const existing = await prisma.line.findFirst({ where: { name, departmentId: production.id } });
            if (!existing) {
                await prisma.line.create({ data: { name, departmentId: production.id } });
            }
        }
        console.log("✅ Production lines seeded");

        // Seed some example check items for Production
        const cats = await prisma.category.findMany();
        const mainLine = await prisma.line.findFirst({ where: { name: "Main Line", departmentId: production.id } });
        if (mainLine && cats.length > 0) {
            for (const cat of cats) {
                const itemName = `${cat.name} Item 1`;
                const checkDescription = `Standard inspection for ${cat.name}`;
                const existing = await prisma.checkItem.findFirst({ where: { itemName, lineId: mainLine.id, categoryId: cat.id } });
                if (!existing) {
                    await (prisma.checkItem as any).create({ data: { itemName, checkDescription, lineId: mainLine.id, categoryId: cat.id } });
                }
            }
            console.log("✅ Production example check items seeded");
        }
    }

    // Seed Lines for PAD department
    const padDept = await prisma.department.findUnique({ where: { name: "PAD" } });
    if (padDept) {
        const lineNames = ["PAD Line A", "PAD Line B", "PAD Line C"];
        for (const name of lineNames) {
            const existing = await prisma.line.findFirst({ where: { name, departmentId: padDept.id } });
            if (!existing) {
                await prisma.line.create({ data: { name, departmentId: padDept.id } });
            }
        }
        console.log("✅ PAD lines seeded");
    }

    // Seed Lines for Office department (if they need specific ones, or we can use virtual)
    // Wait, the requirement says "When clicking Office -> show Office Lines first. Both Office and PAD must behave the same way as Production."
    // Let's seed some example office lines if they don't exist, otherwise they might just get one "Office" line.
    const officeDept = await prisma.department.findUnique({ where: { name: "Office" } });
    if (officeDept) {
        // Just checking if we need to seed "Office Line A" or something. The prompt says "Example lines: PAD Line A... Both Office and PAD must behave the same way". I'll seed some basic office lines for demonstration, or let the virtual line logic handle it if they just have "Office".
        // Let's seed "Office Area 1", "Office Area 2" for better demonstration since it should behave like Production.
        const lineNames = ["Office Area 1", "Office Area 2"];
        for (const name of lineNames) {
            const existing = await prisma.line.findFirst({ where: { name, departmentId: officeDept.id } });
            if (!existing) {
                await prisma.line.create({ data: { name, departmentId: officeDept.id } });
            }
        }
        console.log("✅ Office lines seeded");
    }

    // Seed virtual lines for non-Production departments (e.g., "Maintenance" gets a "Maintenance" line)
    // This allows them to store CheckItems directly without users having to select a line.
    const nonProdDepts = await prisma.department.findMany({ where: { name: { notIn: ["Production", "PAD", "Office"] } } });
    for (const dept of nonProdDepts) {
        const existing = await prisma.line.findFirst({ where: { name: dept.name, departmentId: dept.id } });
        if (!existing) {
            await prisma.line.create({ data: { name: dept.name, departmentId: dept.id } });
        }
    }
    console.log("✅ Non-Production virtual lines seeded");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
