const mongoose = require('mongoose');
const Course = require('../../models/Course');
const Post = require('../../models/Post');

const deletePostController = (req, res) => {
    const {id} = req.body;
    const updatedId = mongoose.Types.ObjectId(id);

    if(req.body?.roomid){

        const updatedRoomId = mongoose.Types.ObjectId(roomid);

        Course.updateOne({_id: updatedRoomId}, {$pull: { "posts": updatedId}}).then((result) => {
            Post.deleteOne({_id: updatedId}).then((finalRes) => {
                res.json({
                    success: true,
                    message: "Deleted Successful",
                });
            }).catch((err) => {
                res.json({
                    success: false,
                    message: err.message
                });
            })
        }).catch((err1) => {
            res.json({
                success: false,
                message: err1.message
            });
        })
    }
    else{
        Post.deleteOne({_id: updatedId}).then((finalRes) => {
            res.json({
                success: true,
                message: "Deleted Successful",
            });
        }).catch((err) => {
            res.json({
                success: false,
                message: err.message
            });
        })
    }
}

module.exports = deletePostController;
