import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../configs/database.js";
class UserModel extends Model {
    static associateToReview(models) {
        UserModel.hasMany(models.Review, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "STRICT",
            as: "reviews",
        });
    }
}
UserModel.init({
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
}, {
    sequelize: sequelizeConfig,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});
export default UserModel;
