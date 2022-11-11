const { default: mongoose } = require('mongoose');
const Quiz = require('../../models/Quiz');

const getQuestionController = (req, res) => {
    const {id} = req.params;
    const updatedId = mongoose.Types.ObjectId(id);

    Quiz.findById(updatedId).then((result) => {
        res.json({
            success: true,
            message: result,
        })
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = getQuestionController;