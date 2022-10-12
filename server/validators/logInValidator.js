const validator = require("validator");
const isEmpty = require("is-empty");

const logInValidator = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    let emailError = validator.isEmpty(data.email)
        ? "Email is required"
        : !validator.isEmail(data.email)
        ? "Please provide a valid email"
        : "";

    let passwordError = validator.isEmpty(data.password)
        ? "Password is required"
        : "";

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = logInValidator;
