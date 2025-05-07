import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../configs/database.js";
class ReviewVoteModel extends Model {
    static associateToReviewVote(models) {
        ReviewVoteModel.belongsTo(models.Review, {
            foreignKey: "reviewId",
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
            as: "review",
        });
    }
}
ReviewVoteModel.init({
    id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    reviewId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
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
}, {
    sequelize: sequelizeConfig,
    tableName: "review_votes",
    timestamps: true,
    modelName: "ReviewVote",
});
export default ReviewVoteModel;
