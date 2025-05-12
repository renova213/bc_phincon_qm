import { DataTypes, QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("app_sections", {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
      },
      tag: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("app_sections");
  },
};
