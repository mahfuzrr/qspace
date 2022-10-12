const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const checkAuth = (req, res, next) => {
    let cookies =
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    const { email } = req.body;

    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const updateEmail = email.toString();

            if (decoded.email !== updateEmail) {
                res.json({
                    success: false,
                    message: "Authentication failure",
                });
            } else {
                req.userData = decoded;
                next();
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Authentication failure!",
            });
        }
    } else {
        next("Authentication failure!");
    }
};

module.exports = checkAuth;
