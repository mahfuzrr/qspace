//package importing
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user model
const User = require("../models/User");

const regController = async (req, res) => {
  const { userName, email, password, role, institution, photoURL } = req.body;

  const registerUser = new User({
    userName,
    email,
    password,
    role,
    institution,
    avatar: photoURL,
  });


  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(registerUser.password, salt, (hashErr, hash) => {
      if (err || hashErr) {
        res.json({
          success: false,
          message: "Error while saving password!",
        });
        return;
      }

      registerUser.password = hash;
      registerUser
        .save()
        .then(() => {
          res.json({
            message: "User created successfully",
            success: true,
          });
        })
        .catch((err) =>
          res.json({
            message: err.message,
            success: false,
          })
        );
    });
  });
};

module.exports = regController;
