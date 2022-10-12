const validator = require("validator");
const isEmpty = require("is-empty");
const { check } = require("express-validator");
const User = require("../models/User");

const registerValidator = async (data) => {
    let errors = {};

    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.role = !isEmpty(data?.role) ? data?.role : "";

    let nameError = validator.isEmpty(data.userName)
        ? "Name is required"
        : !validator.isAlpha(data.userName, ["en-US"], { ignore: " " })
        ? "Only letter A-Z allowed"
        : "";

    let emailError = validator.isEmpty(data.email)
        ? "Email is required"
        : !validator.isEmail(data.email)
        ? "Please provide a valid email"
        : "";

    let passwordError = validator.isEmpty(data.password)
        ? "Password is required"
        : "";
    
    let rollError = validator.isEmpty(data.role) ? "Role is required" : "";

    let user = await User.findOne({ email: data.email });

    //checking if an user is already exists or not
    if (user && isEmpty(emailError)) {
        emailError = "Email is already registered";
    }

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if(rollError)errors.roll = rollError;

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = registerValidator;
