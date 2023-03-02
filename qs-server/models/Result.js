const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  totalMarks: {
    type: String,
    required: true,
  },
  quiz: {
    type: mongoose.Types.ObjectId,
    ref: "Quiz",
  },
  studentDetails: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
