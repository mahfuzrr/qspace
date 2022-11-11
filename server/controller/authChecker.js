const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authChecker = (req, res) => {
   const cookie = req.cookies;
   const updateData = JSON.parse(cookie.qspace);
   
   const {email, accessToken} = updateData;

   User.findOne({email: email}).then((user) => {
    if(user && user._id){
        const responseObject = {
            name: user.userName,
            email,
            role: user.role,
            college: user.institution,
        };

        res.json({
            success: true,
            message: responseObject,
            accessToken
        });
    }
   })
}

module.exports = authChecker;