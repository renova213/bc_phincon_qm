import { DataTypes, Model } from "sequelize";
import sequelizeConfig from "../configs/database.js";
import { ReviewAttributeType, ReviewType } from "../types/review.type.js";

class ReviewModel extends Model<ReviewType, ReviewAttributeType> {
  static associateToCourse(models: any) {
    ReviewModel.belongsTo(models.Course, {
      foreignKey: "courseId",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      as: "course",
    });
  }

  static associateToTryout(models: any) {
    ReviewModel.belongsTo(models.TryoutSection, {
      foreignKey: "tryoutId",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
      as: "tryoutSection",
    });
  }

  static associateToUser(models: any) {
    ReviewModel.belongsTo(models.User, {
      foreignKey: "userId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      as: "user",
    });
  }

    static associateToAppSection(models: any) {
    ReviewModel.belongsTo(models.AppSection, {
      foreignKey: "appSectionId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      as: "appSection",
    });
  }

  static associateToReviewVote(models: any) {
    ReviewModel.hasMany(models.ReviewVote, {
      foreignKey: "reviewId",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      as: "reviewVotes",
    });
  }
}

ReviewModel.init(
  {
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
    referenceId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      defaultValue: "",
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
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
  },
  {
    sequelize: sequelizeConfig,
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
  }
);

export default ReviewModel;
