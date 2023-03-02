const { default: mongoose } = require('mongoose');
const Quiz = require('../../models/Quiz');

const editStatusController = (req, res) => {
    const {curStatus, id} = req.body;
    const updatedId = mongoose.Types.ObjectId(id);

    Quiz.updateOne({_id: updatedId}, {$set: {status: curStatus}}).then((result) => {
        res.json({
            success: true,
            result,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = editStatusController;