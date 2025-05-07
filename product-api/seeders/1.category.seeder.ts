import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Electronics",
          description: "Electronic devices and gadgets",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clothing",
          description: "Apparel and fashion items",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Books",
          description: "Reading materials and publications",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Home & Kitchen",
          description: "Household items and kitchen appliances",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("categories", {});
  },
};
