import bcrypt from "bcrypt";
import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [
      {
        id: uuidv4(),
        username: "jonathan",
        role: "admin",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "meilani123",
        role: "cashier",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.bulkDelete("users", {});
  },
};
