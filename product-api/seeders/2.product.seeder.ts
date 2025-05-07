import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // const categories = await queryInterface.sequelize.query(
    //   "SELECT id, name FROM categories;",
    //   { type: QueryTypes.SELECT }
    // );

    const categoryMap: { [key: string]: string } = {};
    // (categories as { id: string; name: string }[]).forEach((category) => {
    //   categoryMap[category.id] = category.name;
    // });

    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Smartphone X",
          description: "Latest smartphone with advanced features",
          price: 999.99,
          stock: 50,
          categoryId: categoryMap["Electronics"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Laptop Pro",
          description: "High-performance laptop for professionals",
          price: 1499.99,
          stock: 25,
          categoryId: categoryMap["Electronics"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cotton T-Shirt",
          description: "Comfortable cotton t-shirt",
          price: 19.99,
          stock: 100,
          categoryId: categoryMap["Clothing"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Denim Jeans",
          description: "Classic denim jeans",
          price: 59.99,
          stock: 75,
          categoryId: categoryMap["Clothing"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Programming Basics",
          description: "Learn programming fundamentals",
          price: 29.99,
          stock: 40,
          categoryId: categoryMap["Books"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coffee Maker",
          description: "Automatic coffee maker for home use",
          price: 89.99,
          stock: 30,
          categoryId: categoryMap["Home & Kitchen"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("products", {});
  },
};
