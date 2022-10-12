//model importing
const { default: mongoose } = require("mongoose");
const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const getPrivatePostsController = (req, res) => {
    const {email} = req.params;

    User.findOne({email: email}).populate({
        path: 'course',
        populate:{
            path: 'posts',
            model: 'Post',
        }
    }).then((result) => {
        
        if(result){
            res.json({
                success: true,
                message: result?.course,
            })
        }
        else{

            res.json({
                success: false,
                message: "Server Error!",
            })
        }
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })

};

module.exports = getPrivatePostsController;
