import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import {
  TransactionModel,
  TransactionModelPublicAttributeModel,
} from "../types/transaction.type.js";

class Trannsaction extends Model<
  TransactionModel,
  TransactionModelPublicAttributeModel
> {
  static associate(models: any) {
    Trannsaction.belongsTo(models, {
      foreignKey: "transactionId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "transaction_detail",
    });
  }
}

Trannsaction.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    cashierId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
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
  },
  {
    sequelize: sequelizeConfig,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

export default Trannsaction;
