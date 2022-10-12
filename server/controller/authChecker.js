const User = require('../models/User');

const authChecker = (req, res) => {
   const cookie = req.cookies['qspace-user'];
   if(cookie){
        let decode = JSON.parse(cookie);
        const email = decode.email;

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
                    accessToken: decode.accessToken
                });
            }
            else{

                res.json({
                    success: false,
                    message: "Not authorized",
                })
            }
        }).catch((er)=>{
            res.json({
                success: false,
                message: er
            })
        });
   }
   else{
    res.json({
        success: false,
        message: "Not authorized",
    });
   }
}

module.exports = authChecker;
