const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
      required: true,
    },
    institution: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
    quizes: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
      default: null,
    },
    course: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
    studentTasks: [
      {
        accessCode: {
          type: String,
          default: null,
        },
        title:{
          type: String,
          default: null,
        },
        link:{
          type: String,
          default: null,
        },
        isComplete:{
          type: Boolean,
          default: false,
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
