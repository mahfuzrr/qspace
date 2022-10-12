//Internal importing
const { default: mongoose } = require('mongoose');
const Course = require('../../models/Course');

const deleteTaskController = (req, res) => {
    const {id, roomId} = req.body;
    const updateId = mongoose.Types.ObjectId(id);
    const updateRoomId = mongoose.Types.ObjectId(roomId);
    console.log(updateId);

    Course.updateOne({_id: updateRoomId}, { $pull: { "tasks": {"_id": updateId}} }).then((result)=>{
        res.json({
            success: true,
            message: "Deleted Successfully!",
        });
    }).catch((err)=>{
        res.json({
            success: false,
            message: err.message,
        });
    });
};

module.exports = deleteTaskController;
