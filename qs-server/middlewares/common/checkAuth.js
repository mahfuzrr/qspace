const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const checkAuth = (req, res, next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        let token = req.headers.authorization.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        User.findOne({email: decoded.email}).then((user) => {
            if(user && user._id){
                next();
            }
            else{
                res.json({
                    success: false,
                    message: "Not Authorized!",
                })
            }
        }).catch((err) => {
            res.json({
                success: false,
                message: "Not Authorized!",
            })
        })
    }else{
        res.json({
            success: false,
            message: "Not Authorized!",
        })
    }
};

module.exports = checkAuth;
