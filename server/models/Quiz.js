const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  authorName:{
    type: String,
  },
  title:{
    type: String,
    required: true,
  },
  subjectName:{
    type: String,
  },
  quizCover:{
    type: String,
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
  startTime:{
    type: String,
    required: true
  },
  endTime: {
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
      questions:{
        type: String,
        required: true,
      },
      type:{
        type: String,
        required: true,
      },
      imgLink: {
        type: String,
      },
      mark:{
        type: Number,
        required: true,
      },
      options: [
        {
          id: {
            type: String,
          },
          input:{
            type: String,
          },
        }
      ],
      answer:[
        {
          id:{
            type: String,
          },
          input: {
            type: String,
          },
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
      submittedQuiz:[{
        type: mongoose.Types.ObjectId,
        ref: "SubmittedQuiz",
      }],
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
