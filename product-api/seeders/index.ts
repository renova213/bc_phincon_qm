import { dbSequalize } from "../src/config/database";
import seedCategories from "./1.category.seeder";

async function runSeeders() {
  try {
    await dbSequalize.authenticate();

    await seedCategories.up(dbSequalize.getQueryInterface());

    console.log("Seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

runSeeders();
