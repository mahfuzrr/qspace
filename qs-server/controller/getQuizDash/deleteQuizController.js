const { default: mongoose } = require('mongoose');
const Quiz = require('../../models/Quiz');

const deleteQuizController = (req, res) => {
    const {id} = req.params;
    const updatedId = mongoose.Types.ObjectId(id);

    Quiz.findByIdAndRemove(updatedId).then(()=> {
        res.json({
            success: true,
            message: "Deleted Successfully!",
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = deleteQuizController;