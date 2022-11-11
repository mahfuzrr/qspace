const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  subjectName:{
    type: String,
    required: true,
  },
  catagory:{
    type: String,
    enum: ["course", "public"],
    default: 'public',
    required: true,
  },
  quizDate: {
    type: Date,
    required: true,
  },
  quizTime:{
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  isOver: {
    type: Boolean,
    required: true,
  },
  questions: [
    {
      question:{
        type: String,
        required: true,
      },
      type:{
        type: String,
        required: true,
      },
      mark:{
        type: Number,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        }
      ],
      answer:[
        {
          type: String,
          required: true,
        }
      ],
    },
  ],
  perticipants: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      marks:{
        type: Number,
        default: null,
      },
      submitTime:{
        type: Date,
        default: null,
      }
    }
  ],
},
{
    timestamps: true,
}
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
