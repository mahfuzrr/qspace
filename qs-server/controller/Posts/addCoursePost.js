//model importing
const mongoose = require('mongoose');

const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const addCoursePostController = (req, res) => {
  const { description, roomId, email, isPublic, id } = req.body;

  const updatedRoomId = mongoose.Types.ObjectId(roomId);
  const updatedId = mongoose.Types.ObjectId(id);

  let updateObject = {
    content: description,
    writterEmail: email,
    isPublic: false,
    postedOn: Date.now().toString(),
    courseId: updatedRoomId,
    writerId: updatedId,
  };

  if(req.body?.imgLink){
    updateObject.imgLink = req.body?.imgLink;
  }


  User.findOne({ email: email }).then((user) => {
    if (user && user._id) {
      updateObject.writter = user.userName;

      const newPost = new Post(
        updateObject,
      );

      newPost.save((err, post) => {
        if (err) {
          res.json({
            success: false,
            message: "Server Error",
          });
        } else {
          Course.updateOne(
            { _id: updatedRoomId },
            { $addToSet: { posts: [post._id] } }
          )
            .then((result) => {
              res.json({
                success: true,
                message: "Posted Successfully!",
              });
            })
            .catch((err) => {
              res.json({
                success: false,
                message: err.message,
              });
            });
        }
      });
    } else {
      res.json({
        success: false,
        message: "User not found!",
      });
    }
  });
};

module.exports = addCoursePostController;
