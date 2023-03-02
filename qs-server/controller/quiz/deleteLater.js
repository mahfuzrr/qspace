const { default: mongoose } = require("mongoose");
const Quiz = require("../../models/Quiz");
const User = require('../../models/User');

const deleteLater = (req, res) => {
    const {id, quizid} = req.params;

    const updatedId = mongoose.Types.ObjectId(id);
    const updatedQuizId = mongoose.Types.ObjectId(quizid);

    Quiz.find({'_id': updatedQuizId, 'perticipants.userId': updatedId}).then((result) => {
    
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

module.exports = deleteLater;