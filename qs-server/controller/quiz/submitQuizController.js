const { default: mongoose } = require('mongoose');
const Quiz = require('../../models/Quiz');
const SubmittedQuiz = require('../../models/SubmittedQuiz');
const User = require('../../models/User');

const submitQuizController = (req, res) => {
    const {email, quizId, marks, submitTime, submittedResult} = req.body;

    const updatedId = mongoose.Types.ObjectId(quizId);

    const updatedData = {
        quizId: updatedId,
        questions: submittedResult,
    };

    User.findOneAndUpdate({email: email}, { $addToSet: { quizzes: [updatedId]}}).then((resData) => {
        const saveData = new SubmittedQuiz(updatedData);
        saveData.save().then((data) => {
            const quizUpdate = {
                userId: resData._id,
                marks,
                submittedQuiz: data._id,
                submitTime,
            };

            Quiz.updateOne({_id: updatedId}, {$addToSet: {perticipants: [quizUpdate]}}).then((finalData) => {
                res.json({
                    success: true,
                    message: "Submission Saved!",
                });
            }).catch((er) => {
                res.json({
                    success: false,
                    message: er.message,
                });
            })
        }).catch((err) => {
            
            res.json({
                success: false,
                message: "Server Error",
            });
        })
    }).catch((err) => {
        
        res.json({
            success: false,
            message: "Server Error",
        });
    })

};

module.exports = submitQuizController;