const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    writter: {
      type: String,
      required: true,
    },
    writterEmail: {
      type: String,
      require: true,
      trim: true,
    },
    writerId:{
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      require: true,
    },
    imgLink:{
      type: String,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    postedOn: {
      type: Date,
      default: Date.now().toString(),
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    courseId:{
      type: mongoose.Types.ObjectId,
      ref: 'Course',
    },
    comment: [
      {
        userId:{
          type: mongoose.Types.ObjectId,
          ref: "User", 
        },
        content:{
          type: String,
        },
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
