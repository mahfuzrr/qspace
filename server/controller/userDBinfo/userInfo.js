//Internal importing
const User = require('../../models/User');

const userInfo = (req, res) => {
    const {email}= req.params;
   
    User.findOne({email: email}).select({
        password: 0,
    })
    .then((user) => {

       // console.log(user);
        if(user){

            res.json({
                success: true,
                user,
            });
        }
        else{

            res.json({
                success: false,
                message: "Not Found!",
            })
        }
    }).catch((err) =>{
        res.json({
            success: false,
            message: err.message,
        })
    })
};

module.exports = userInfo;
