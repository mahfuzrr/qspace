const User = require("../../models/User");


const getCourseController = (req, res) => {
    const {email} = req.params;

    User.findOne({email: email}).populate('course')
    .then((data) => {
        if(data){
           res.json({
            success: true,
            message: data?.course,
           });
        }
        else{
            res.json({
                success: false,
                message: "Server Error",
            });
        }
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })
}

module.exports = getCourseController;