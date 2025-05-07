import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export const categoryIds = {
  food: uuidv4(),
  drinks: uuidv4(),
};

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    const categories = [
      {
        id: categoryIds.food,
        name: "Food",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: categoryIds.drinks,
        name: "Drinks",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("categories", categories);
  },

  async down(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.bulkDelete("categories", {
      name: ["Food", "Drinks"],
    });
  },
};
