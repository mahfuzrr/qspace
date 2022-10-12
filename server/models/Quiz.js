const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  quizId: {
    type: Number,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  catagory:{
    type: String,
    enum: ["course", "public"],
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  duration: {
    {
        hours:{
            type: Number,
            default: 0,
        },
        minutes:{
            type: Number,
            default: 0,
        }
        seconds:{
            type: Number,
            default: 0,
        }
    }
  },
  quizDate: {
    type: Date,
    required: true,
  },
  isOver: {
    type: Boolean,
    required: true,
  },
  isAuthor: {
    type: Boolean,
    required: true,
  },
  questions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Question",
    },
  ],
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  perticipants: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
},
{
    timestamps: true,
}
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
