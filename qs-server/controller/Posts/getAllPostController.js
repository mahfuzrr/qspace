//model importing
const { default: mongoose } = require("mongoose");
const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const getAllPostController = (req, res) => {
    const {email} = req.params;

    let resObject = [];

    User.findOne({email: email}).populate({
        path: 'course',
        model: 'Course',
        populate:{
            path: 'posts',
            model: 'Post',
            populate:[
                {
                    path: 'writerId',
                    model: 'User',
                },
                {
                    path: 'courseId',
                    model: 'Course',
                },
                {
                    path: 'comment.userId',
                    model: 'User',
                },
            ]
        }
    }).then((result) => {
        
        for(let i=0; i<result?.course?.length; i+=1){
            for(let j=0; j<result?.course[i]?.posts?.length; j+=1){
                resObject.push(result?.course[i]?.posts[j]);
            }
        }

        Post.find().populate('writerId').populate('courseId').populate('comment.userId').then((pResult) => {

            for(let i=0; i<pResult?.length; i+=1){
                if(pResult[i]?.isPublic){
                    resObject.push(pResult[i]);
                }
            }

            res.json({
                success: true,
                message: resObject,
            })
        }).catch((err) => {
            res.json({
                success: false,
                message: err.message,
            })
        })
        
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })

};

module.exports = getAllPostController;
