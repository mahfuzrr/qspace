//model importing
const { default: mongoose } = require("mongoose");
const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const getRoomPostsController = (req, res) => {
    const {roomId} = req.params;

    const updateRoomId = mongoose.Types.ObjectId(roomId);

    Post.find({'courseId': updateRoomId}).populate('courseId').populate('comment.userId').populate('writerId').then((result) => {
        res.json({
            success: true,
            message: result,
        })
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })

};

module.exports = getRoomPostsController;
