import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import {
  TryoutSectionType,
  TryoutSectionttributeType,
} from "../types/tryout.section.type.js";

class TryoutSectionModel extends Model<
  TryoutSectionType,
  TryoutSectionttributeType
> {
  static associateToReview(models: any) {
    TryoutSectionModel.hasMany(models.Review, {
      foreignKey: "tryoutId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "reviews",
    });
  }
}

TryoutSectionModel.init(
  {
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
  },
  {
    sequelize: sequelizeConfig,
    modelName: "TryoutSection",
    tableName: "tryout_sections",
    timestamps: true,
  }
);

export default TryoutSectionModel;
