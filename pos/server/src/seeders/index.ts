import { QueryInterface } from "sequelize";
import db from "../configs/database.js";
import UserSeeder from "./cores/1a.user.seeder.js";
import CategorySeeder from "./cores/2a.category.seeder.js";
import ProductSeeder from "./cores/2b.product.seeder.js";
import TransactionSeeder from "./cores/3a.transaction.seeder.js";
import TransactionDetailSeeder from "./cores/3b.transaction.detail.seeder.js";

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

    const queryInterface: QueryInterface = db.getQueryInterface();

    for (const seeder of seeders) {
      const name = seeder.constructor.name || "UnnamedSeeder";
      console.log(`Running seeder: ${name}`);
      await seeder.up(queryInterface, db);
      console.log(`Seeder ${name} executed successfully.`);
    }
  } catch (error) {
    console.error("Failed to run seeder:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
}

runSeeder();
