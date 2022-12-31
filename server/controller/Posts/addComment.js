//model importing
const mongoose = require('mongoose');

const Post = require("../../models/Post");

const addComment = (req, res) => {
    const { userId, content, postId } = req.body;

    const updateId = mongoose.Types.ObjectId(postId);
    const updateUid = mongoose.Types.ObjectId(userId);

    const obj = {
        userId: updateUid,
        content
    };

    Post.updateOne({_id: updateId}, {$addToSet: {'comment': [obj]}}).then((result) => {
        res.json({
            success: true,
            message: result,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message
        })
    })
};

module.exports = addComment;
