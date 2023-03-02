const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    quizId: {
      type: Number,
      required: true,
    },
    questions: [
      {
        questionNumber: {
          type: Number,
          required: true,
          unique: true,
        },
        questionType: {
          type: String,
          required: true,
        },
        questionTitle: {
          type: String,
          required: true,
        },
        options: [
          {
            optionTitle: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
            },
          },
        ],
        mark: {
          type: Number,
          required: true,
        },
        isMultipleChoice: {
          type: Boolean,
          required: true,
        },
      },
    ],
    quiz: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
