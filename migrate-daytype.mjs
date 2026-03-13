import pg from 'pg';
const { Client } = pg;

const databaseUrl = "postgresql://neondb_owner:npg_UhYcF9bIu0Ez@ep-broad-band-a1mz0mve-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&schema=public";

async function runMigration() {
    const client = new Client({
        connectionString: databaseUrl,
    });

    try {
        console.log("Connecting to database...");
        await client.connect();

        // First try to create the enum type if it doesn't exist
        try {
            console.log("Creating ENUM DayType...");
            await client.query(`
            CREATE TYPE "public"."DayType" AS ENUM ('DAY_16', 'DAY_17', 'DAY_18', 'BEFORE_PRODUCTION', 'FIRST_DAY_PRODUCTION');
        `);
            console.log("ENUM created successfully.");
        } catch (e) {
            if (e.code === '42710') {
                console.log("ENUM already exists, skipping creation.");
            } else {
                console.error("Error creating ENUM:", e.message);
            }
        }

        // Now alter the CheckResult table to add dayType
        try {
            console.log("Adding dayType column to check_results...");
            await client.query(`
            ALTER TABLE "public"."check_results" 
            ADD COLUMN "day_type" "public"."DayType" NOT NULL DEFAULT 'DAY_16';
        `);
            console.log("Column added successfully.");
        } catch (e) {
            if (e.code === '42701') {
                console.log("Column already exists, skipping addition.");
            } else {
                console.error("Error adding column:", e.message);
            }
        }

        // Optional: remove default if no longer needed
        try {
            await client.query(`ALTER TABLE "public"."check_results" ALTER COLUMN "day_type" DROP DEFAULT;`);
            console.log("Removed default constraint.");
        } catch (e) { }

        console.log("Migration complete!");
    } catch (err) {
        console.error("Connection error", err.stack);
    } finally {
        await client.end();
    }
}

runMigration();
