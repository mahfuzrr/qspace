const User = require('../../models/User');

const getQuizInfoController = (req, res) => {
    const {email} = req.params;

    User.findOne({email: email})
    .populate('quizzes').then((result) => {
        res.json({
            success: true,
            message: result?.quizzes,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: "Server Error!",
        });
    })
};

module.exports = getQuizInfoController;