//package importing
const createError = require("http-errors");
const User = require("../models/User");
const isEmpty = require("is-empty");

const profileUpdateController = async (req, res) => {
  let name, college, email;

  name = isEmpty(req.body?.name) ? "" : req.body?.name;
  college = !isEmpty(req.body?.college) ? req.body?.college : "";
  email = req.body.email;


  if (name || college) {
    let updateObj = {};

    if(name)updateObj.userName = name;
    if(college)updateObj.institution = college;


    try {
      const result = await User.findOneAndUpdate({ email: email }, {$set: updateObj}, {
        new: true,
      });
      res.json({
        success: true,
        message: result,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err,
      });
    }
  } else {
    res.json({
      success: false,
      message: "No data is provided!",
    });
  }
};

module.exports = profileUpdateController;
