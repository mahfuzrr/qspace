//model importing
const mongoose = require("mongoose");

const Course = require("../../models/Course");
const Post = require("../../models/Post");
const User = require("../../models/User");

const addPublicPostController = (req, res) => {
    const { description, userId, userEmail, userName } = req.body;

    let fakeId = '6399cbe206b73469b8494ca7';
    fakeId = mongoose.Types.ObjectId(fakeId);

    const updatedId = mongoose.Types.ObjectId(userId);

    let updateObject = {
        content: description,
        writterEmail: userEmail,
        isPublic: true,
        postedOn: Date.now().toString(),
        writter: userName,
        courseId: fakeId,
        writerId: updatedId,
    };

    if (req.body?.imgLink) {
        updateObject.imgLink = req.body?.imgLink;
    }

    const newPost = new Post(updateObject);

    newPost.save().then((result) => {
        res.json({
            success: true,
            message: "Posted Successfully!"
        });

    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = addPublicPostController;
