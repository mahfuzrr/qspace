//package importing
const isEmpty = require("is-empty");
const Course = require("../../models/Course");
const User = require("../../models/User");
const Quiz = require('../../models/Quiz');
const { default: mongoose } = require("mongoose");

const createQuizController = (req, res) => {
    const {author, title, subjectId, subjectName, date, startTime, endTime, status, questionData, authorName, quizCover} = req.body;

    const responseObject = {
        author,
        title,
        subjectName,
        authorName,
        quizCover,
        quizDate: date,
        startTime,
        endTime,
        status,
        isOver: false,
        questions: questionData,
    }

    const tp = subjectName?.toLowerCase();

    if(tp !== 'public')responseObject.catagory = 'course';


    const quiz = new Quiz(responseObject);

    quiz.save().then((savedData) => {
        User.updateOne({email: author}, { $addToSet: { quizzes: [savedData._id] } }).then((result) => {
            if(subjectId !== 'public'){
                const updatedSubjectId = mongoose.Types.ObjectId(subjectId);

                Course.updateOne({_id: updatedSubjectId}, {$addToSet: {quizzes: [savedData._id]}}).then(() => {
                    res.json({
                        success: true,
                        message: "Created Successfully!",
                    });
                }).catch((errr) => {
                    res.json({
                        success: false,
                        message: errr.message,
                    })
                });
            }
            else{
                res.json({
                    success: true,
                    message: "Created Successfully!",
                });
            }
        }).catch((er) => {
            res.json({
                success: false,
                message: er.message,
            });
        })
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })

};

module.exports = createQuizController;
