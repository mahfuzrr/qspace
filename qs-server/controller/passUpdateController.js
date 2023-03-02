//package importing
const User = require("../models/User");
const isEmpty = require("is-empty");
const bcrypt = require("bcrypt");

const passUpdateController = async (req, res) => {
  let currentPassword, newPassword, email;

  currentPassword = !isEmpty(req.body?.currentPassword)
    ? req.body?.currentPassword
    : "";
  newPassword = !isEmpty(req.body?.newPassword) ? req.body?.newPassword : "";
  email = req.body.email;

  if (currentPassword && newPassword) {
    const updateObj = {};

    User.findOne({ email: email }).then((user) => {
      if (user && user._id) {
        bcrypt
          .compare(currentPassword, user.password)
          .then((result) => {
            if (result) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (hashErr, hash) => {
                  if (err || hashErr) {
                    res.json({
                      success: false,
                      message: "Error while saving password",
                    });

                    return;
                  }

                  updateObj.password = hash;

                  User.findOneAndUpdate(
                    { email: email },
                    { $set: updateObj },
                    (err, ress) => {
                      if (err) {
                        res.json({
                          success: false,
                          message: "Something went wrong",
                        });
                      } else {
                        res.json({
                          success: true,
                          message: "Password Updated Successfully",
                        });
                      }
                    }
                  );
                });
              });
            } else {
              res.json({
                success: false,
                message: "Invalid Password",
              });
            }
          })
          .catch((err) => {
            res.json({
              success: false,
              message: "Invalid Password",
            });
          });
      } else {
        res.json({
          success: false,
          message: "User not found",
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Provide valid data",
    });
  }
};

module.exports = passUpdateController;
