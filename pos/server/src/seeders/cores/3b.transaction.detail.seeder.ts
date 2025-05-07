import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { productsIds } from "./2b.product.seeder.js";

export default {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkInsert("transaction_details", [
      {
        id: uuidv4(),
        transactionId: "d1faa3c4-5e1e-4b9a-89a6-4f2c2fbb5f1c",
        productIds: [productsIds.product1, productsIds.product2],
        quantity: 2,
        subTotal: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    await queryInterface.bulkDelete("transaction_details", {});
  },
};
