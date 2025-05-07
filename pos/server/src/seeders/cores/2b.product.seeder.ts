import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { categoryIds } from "./2a.category.seeder.js";

export const productsIds = {
  product1: uuidv4(),
  product2: uuidv4(),
};

export default {
  async up(queryInterface: QueryInterface, _sequelize: Sequelize) {
    const products = [
      {
        id: productsIds.product1,
        name: "Burger",
        price: 50000,
        description: "Delicious beef burger",
        stock: 100,
        categoryId: categoryIds.food,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: productsIds.product2,
        name: "Iced Tea",
        price: 15000,
        description: "Refreshing iced tea",
        stock: 200,
        categoryId: categoryIds.drinks,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("products", products);
  },

  async down(queryInterface: QueryInterface, _sequelize: Sequelize) {
    await queryInterface.bulkDelete("products", {});
  },
};
