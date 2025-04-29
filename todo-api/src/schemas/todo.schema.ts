import { Schema } from "mongoose";

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["to do", "archived", "in-progress", "done"],
      default: "to do",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.pre("save", function (next) {
  if (this.status === "done") {
    this.completed = true;
  } else {
    this.completed = false;
  }
  next();
});

TodoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  delete object._id;

  return object;
});

export default TodoSchema;
