const { default: mongoose } = require("mongoose");
const Quiz = require("../../models/Quiz");
const User = require('../../models/User');

const addMarkController = (req, res) => {
    const {id, quizid, mark} = req.body;

    const updatedId = mongoose.Types.ObjectId(id);
    const updatedQuizId = mongoose.Types.ObjectId(quizid);

    Quiz.findOneAndUpdate({'_id': updatedQuizId, 'perticipants.userId': updatedId}, {$set: {'perticipants.$.marks': mark}}).then((result) => {
    
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

module.exports = addMarkController;