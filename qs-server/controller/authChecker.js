const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

const authChecker = (req, res) => {
   const {email, accesstoken} = req.params;
   
   if(email && accesstoken)
   {
        // const updateData = JSON.parse(cookie?.qspace);
   
        // const {email, accessToken} = updateData;

        User.findOne({email: email}).then((user) => {
            if(user && user._id){
                const responseObject = {
                    name: user.userName,
                    email,
                    role: user.role,
                    college: user.institution,
                    photoURL: user.avatar,
                    id: user._id,
                };

                res.json({
                    success: true,
                    message: responseObject,
                    accessToken: accesstoken,
                });
            }
        })
   }
   else
   {
        res.json({
            success: false,
            message: 'Cookie not found'
        });
   }
}

module.exports = authChecker;