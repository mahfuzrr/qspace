//model importing
const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const addCoursePostController = (req, res) => {
  const { title, description, roomId, email } = req.body;

  let updateObject = {
    title,
    content: description,
    writterEmail: email,
    isPublic: false,
    postedOn: Date.now().toLocaleDateString(),
  };

  User.findOne({ email: email }).then((user) => {
    if (user && user._id) {
      updateObject.writter = user.userName;

      const newPost = new Post(
        updateObject,
      );

      newPost.save((err, post) => {
        if (err) {
          console.log(err.message);
          res.json({
            success: false,
            message: "Server Error",
          });
        } else {
          Course.updateOne(
            { _id: roomId },
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
