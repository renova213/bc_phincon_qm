import db from "../configs/database.js";
import UserSeeder from "./cores/1.user.seeder.js";
import CategorySeeder from "./cores/2.course.seeder.js";
import ProductSeeder from "./cores/3.tryout.section.seeder.js";
import TransactionSeeder from "./cores/4.review.seeder.js";
import TransactionDetailSeeder from "./cores/5.review.vote.migration.js";
async function runSeeder() {
    const seeders = [
        UserSeeder,
        CategorySeeder,
        ProductSeeder,
        TransactionSeeder,
        TransactionDetailSeeder,
    ];
    try {
        await db.authenticate();
        console.log("Database connected.");
        const queryInterface = db.getQueryInterface();
        for (const seeder of seeders) {
            const name = seeder.constructor.name || "UnnamedSeeder";
            console.log(`Running seeder: ${name}`);
            await seeder.up(queryInterface, db);
            console.log(`Seeder ${name} executed successfully.`);
        }
    }
    catch (error) {
        console.error("Failed to run seeder:", error);
    }
    finally {
        await db.close();
        console.log("Database connection closed.");
    }
}
runSeeder();
