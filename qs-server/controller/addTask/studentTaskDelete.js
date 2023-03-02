//Internal importing
const { default: mongoose } = require('mongoose');
const User = require('../../models/User');

const studentTaskDelete = (req, res) => {
    const {id, email} = req.body;
    const updateId = mongoose.Types.ObjectId(id);

    User.updateOne({email: email}, { $pull: { "studentTasks": {"_id": updateId}} }).then((result)=>{
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

module.exports = studentTaskDelete;
