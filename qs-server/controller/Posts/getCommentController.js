//model importing
const mongoose = require('mongoose');

const Post = require("../../models/Post");

const getCommentController = (req, res) => {
    const { id} = req.params;

    const updateId = mongoose.Types.ObjectId(id);

    Post.find({_id: updateId}).then((result) => {
        res.json({
            success: true,
            message: result.comment,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message
        })
    })
};

module.exports = getCommentController;
