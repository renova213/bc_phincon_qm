import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    const transactions = [
      {
        id: uuidv4(),
        cashierId: "e7a0c959-1a19-4c1e-8a9a-6a4e768e6d1e",
        totalPrice: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("transactions", transactions);
  },

  async down(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.bulkDelete("transactions", {});
  },
};
