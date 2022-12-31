const { default: mongoose } = require("mongoose");
const Quiz = require("../../models/Quiz");
const User = require('../../models/User');

const getStandingsController = (req, res) => {
    const {id} = req.params;

    const updatedId = mongoose.Types.ObjectId(id);

    Quiz.findById(updatedId).populate('perticipants.userId').then((result) => {
        res.json({
            success: true,
            message: result.perticipants,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = getStandingsController;