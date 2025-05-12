import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../configs/database.js";
class AppSectionModel extends Model {
    static associateToReview(models) {
        AppSectionModel.hasMany(models.Review, {
            foreignKey: "appSectionId",
            onDelete: "CASCADE",
            onUpdate: "STRICT",
            as: "reviews",
        });
    }
}
AppSectionModel.init({
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
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    tag: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    data: {
        type: DataTypes.JSON,
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
}, {
    sequelize: sequelizeConfig,
    modelName: "AppSection",
    tableName: "app_sections",
    timestamps: true,
});
export default AppSectionModel;
