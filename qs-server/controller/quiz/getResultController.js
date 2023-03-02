const { default: mongoose } = require("mongoose");
const Quiz = require("../../models/Quiz");
const User = require('../../models/User');

const getResultController = (req, res) => {
    const {email, quizid} = req.params;

    const updatedId = mongoose.Types.ObjectId(quizid);

    User.findOne({email: email}).then((result) => {
        const uid = result._id.toHexString();

        Quiz.findById(updatedId).populate('perticipants.submittedQuiz').then((upRes) => {
            let findIndex = -1;
            for(let i=0; i<upRes.perticipants.length; i++){
                const id = upRes.perticipants[i].userId.toHexString();
                if(id === uid){
                    findIndex = i;
                    break;
                }
            }
    
            if(findIndex < 0){
                res.json({
                    success: false,
                    message: "You have not perticipated yet",
                })
            }
            else{
                let totalMarks = 0;

                for(let i=0; i<upRes.questions.length; i++){
                    totalMarks += upRes.questions[i].mark;
                }

                res.json({
                    success: true,
                    message: {
                        mark: upRes.perticipants[findIndex].marks,
                        totalMarks,
                        submission: upRes.perticipants[findIndex].submittedQuiz[0].questions,
                        totalQuestion: upRes.questions.length
                    },
                })
            }

        }).catch((err1) => {
            res.json({
                success: false,
                message: err1.message,
            })
        })
        
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })
};

module.exports = getResultController;