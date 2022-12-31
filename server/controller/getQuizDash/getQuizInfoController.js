const User = require('../../models/User');
const Quiz = require('../../models/Quiz');

const getQuizInfoController = (req, res) => {
    const {email} = req.params;

    const allQuiz = [];

    User.findOne({email: email}).populate({
        path: 'course',
        model: 'Course',
        populate:{
            path: 'quizzes',
            model: 'Quiz'
        }
    }).then((result) => {

        for(let i=0; i<result?.course?.length; i+=1){
            for(let j=0; j<result?.course[i]?.quizzes?.length; j+=1){
                allQuiz.push(result?.course[i]?.quizzes[j]);
            }
        }

        Quiz.find().then((upRes) => {

            for(let i=0; i<upRes.length; i+=1){
                if(upRes[i]?.catagory === 'public'){
                    allQuiz.push(upRes[i]);
                }
            }
            res.json({
                success: true,
                message: allQuiz,
            })
        }).catch((err) => {
            res.json({
                success: false,
                message: err.message,
            });
        })
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message
        })
    })

    // Quiz.find({author: email}).then((result) => {
    //     res.json({
    //         success: true,
    //         message: result,
    //     });
    // }).catch((err) => {
    //     res.json({
    //         success: false,
    //         message: "Server Error",
    //     });
    // })
};

module.exports = getQuizInfoController;