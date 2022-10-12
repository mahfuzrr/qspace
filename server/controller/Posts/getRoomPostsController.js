//model importing
const { default: mongoose } = require("mongoose");
const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const getRoomPostsController = (req, res) => {
    const {roomId} = req.params;

    const updateRoomId = mongoose.Types.ObjectId(roomId);

    Course.findOne({_id: updateRoomId}).populate('posts').then((result) => {

        if(result && result._id){
            res.json({
                success: true,
                message: result?.posts,
            });
        }
        else{

            res.json({
                success: false,
                message: "Server Error!",
            });
        }
    }).catch((err)=>{
        res.json({
            success: false,
            message: err.message,
        })
    })

};

module.exports = getRoomPostsController;
