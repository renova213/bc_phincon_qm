import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import { UserRoleEnum } from "../types/user.role.type.js";
import { UserModel, UserPublicAttributeModel } from "../types/user.type.js";

class User extends Model<UserModel, UserPublicAttributeModel> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRoleEnum)),
      allowNull: false,
      defaultValue: UserRoleEnum.Cashier,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize: sequelizeConfig,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
