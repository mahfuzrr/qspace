const { default: mongoose } = require('mongoose');
const Quiz = require('../../models/Quiz');

const getAllQuizController = (req, res) => {

    Quiz.find().then((result) => {
        res.json({
            success: true,
            message: result,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })
};

module.exports = getAllQuizController;