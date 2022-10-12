const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    teacherEmail: {
      type: String,
      require: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    accessCode: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    quizzes: [
      {
        title: {
          type: String,
          required: true,
        },
      },
    ],
    tasks: [
      {
        title: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: "",
        },
        isComplete: {
          type: Boolean,
          default: false,
        },
      },
    ],
    userList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
