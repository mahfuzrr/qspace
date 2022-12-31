//package importing
const { default: mongoose } = require("mongoose");
const User = require("../../models/User");

const photoUpdateController = async (req, res) => {
    const {id, imgLink} = req.body;

    const updatedId = mongoose.Types.ObjectId(id);

    User.updateOne({_id: updatedId}, {$set: {'avatar': imgLink}}).then((result) => {
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

module.exports = photoUpdateController;
