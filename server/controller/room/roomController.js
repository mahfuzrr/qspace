//package importing
const createError = require("http-errors");
const isEmpty = require("is-empty");
const Course = require("../../models/Course");
const User = require("../../models/User");

const roomController = (req, res) => {
  const updateObject = {
    title: req.body.title,
    teacherEmail: req.body.email,
    courseCode: req.body.courseCode,
    description: req.body.description,
  };

  const { email } = req.body;


  User.findOne({ email: email }).then((user) => {
    if (user && user._id) {
      updateObject.teacherName = user.userName;

      //unique id for course accessToken should be generate here
      const uniqueId =
        new Date().getTime().toString(36) + Math.random().toString(36).slice(15); // Change slice to chage size

      updateObject.accessCode = uniqueId;

      const newCourse = new Course(updateObject);
      newCourse.save((saveErr, newRes) => {
        if (saveErr) {
          res.json({
            success: false,
            message: "Something went wrong!",
          });
        } else {
          const id = newRes._id;
          User.updateOne({ email: email }, { $addToSet: { course: [id] } })
            .then((upRes) => {
              res.json({
                success: true,
                message: "Course Created Successfully!",
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
        message: "Something went wrong!",
      });
    }
  });
};

module.exports = roomController;
