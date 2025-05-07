import Category from "./category.model.js";
import Product from "./product.model.js";

Category.associate(Product);
Product.associate(Category);

export { Category, Product };
