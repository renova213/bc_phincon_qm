import { DataTypes, QueryInterface, Sequelize } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("transaction_details", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      transactionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "transactions",
          key: "id",
        },
      },
      productIds: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("transaction_details");
  },
};
