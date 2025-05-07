import { DataTypes } from "sequelize";
export default {
    up: async (queryInterface) => {
        await queryInterface.createTable("review_votes", {
            id: {
                type: DataTypes.CHAR(36),
                primaryKey: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.CHAR(36),
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            reviewId: {
                type: DataTypes.CHAR(36),
                allowNull: false,
                references: {
                    model: "reviews",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            type: {
                type: DataTypes.STRING(255),
                allowNull: false,
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
    down: async (queryInterface) => {
        await queryInterface.dropTable("review_votes");
    },
};
