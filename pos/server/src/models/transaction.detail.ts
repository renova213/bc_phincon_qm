import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import {
  DetailTransactionModel,
  DetailTransactionModelPublicAttributeModel,
} from "../types/detail.transaction.type.js";

class TransactionDetail extends Model<
  DetailTransactionModel,
  DetailTransactionModelPublicAttributeModel
> {
  static associate(models: any) {
    TransactionDetail.hasOne(models, {
      foreignKey: "transactionId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "transaction",
    });
  }
}

TransactionDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize: sequelizeConfig,
    modelName: "TransactionDetail",
    tableName: "transaction_details",
    timestamps: true,
  }
);

export default TransactionDetail;
