//package importing
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//validator
const registerValidator = require("../validators/registerValidator");

//user model
const User = require("../models/User");

const regController = async (req, res) => {
    const { errors, isValid } = await registerValidator(req.body);

    if (!isValid) {
        res.json({
            success: false,
            errors,
        });
    } else {
        const { userName, email, password, role, institution, avatar } =
            req.body;
        

        const registerUser = new User({
            userName,
            email,
            password,
            role,
            institution,
            avatar,
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
    }
};

module.exports = regController;
