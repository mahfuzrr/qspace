//package importing
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");

//validator
const logInValidator = require("../validators/logInValidator");

const logInController = (req, res) => {
    const { errors, isValid } = logInValidator(req.body);
    const { email, password } = req.body;

    if (!isValid) {
        res.json({
            success: false,
            message: errors,
        });
    } else {
        User.findOne({ email: email })
            .then((user) => {
                //console.log(user);
                if (user && user._id) {
                    //console.log(user._id);
                    bcrypt
                        .compare(password, user.password)
                        .then((result) => {
                            if (result) {
                                //create userObject
                                const userObject = {
                                    userName: user.userName,
                                    email: user.email,
                                    role: user.role,
                                };

                                //generate token
                                const token = jwt.sign(
                                    userObject,
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn: process.env.JWT_EXPIRY,
                                    }
                                );

                                // let updatedToken = JSON.stringify(token);

                                // const currentTimeAsMs = Date.now();
                                // const adjustedTimeAsMs = currentTimeAsMs + (1000 * 60 * 60 * 24 * 30);
                                
                                // //set cookie
                                // res.cookie(process.env.COOKIE_NAME, updatedToken, {
                                //     maxAge: adjustedTimeAsMs,
                                //     httpOnly: true,
                                //     signed: true,
                                // });

                                res.status(200).json({
                                    info:{
                                        accessToken: token,
                                        userName: user.userName,
                                        email: user.email,
                                        role: user.role,
                                    },
                                    success: true,
                                    message: "LogIn successful",
                                });
                            }
                            else{
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
                }
                else{
                    res.json({
                        success: false,
                        message: "User Not found",
                    });
                }
            })
            .catch((err) => {
                throw createError("LogIn failed");
            });
    }
};

module.exports = logInController;
