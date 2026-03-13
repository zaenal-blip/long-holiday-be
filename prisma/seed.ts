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
    const departmentNames = ["Production", "Maintenance", "Quality", "Kaizen", "Tool Coolant", "Office", "Die Maintenance"];
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
    }

    // Seed virtual lines for non-Production departments (e.g., "Maintenance" gets a "Maintenance" line)
    // This allows them to store CheckItems directly without users having to select a line.
    const nonProdDepts = await prisma.department.findMany({ where: { name: { not: "Production" } } });
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
