const { default: mongoose } = require("mongoose");
const Quiz = require("../../models/Quiz");
const User = require('../../models/User');

const getDetailsController = (req, res) => {
    const {quizid} = req.params;

    const updatedId = mongoose.Types.ObjectId(quizid);

    Quiz.findById(updatedId).populate('perticipants.userId').populate('perticipants.submittedQuiz').then((upRes) => {
        
        const resObject = [];

        for(let i=0; i<upRes?.perticipants?.length; i++)
        {
            let obj = {
                id: upRes?.perticipants[i]?.userId?._id,
                userName: upRes?.perticipants[i]?.userId?.userName,
                email: upRes?.perticipants[i]?.userId?.email,
                avatar: upRes?.perticipants[i]?.userId?.avatar,
                marks: upRes?.perticipants[i]?.marks,
                submitTime: upRes?.perticipants[i]?.submitTime
            }

            for(let j=0; j<upRes?.perticipants[i]?.submittedQuiz[0]?.questions?.length; j++)
            {
                if(upRes?.perticipants[i]?.submittedQuiz[0]?.questions[j]?.type === 'files'){
                    obj.submitFile = upRes?.perticipants[i]?.submittedQuiz[0]?.questions[j]?.userAnswer[0];
                    break;
                }
            }

            resObject.push(obj);
        }

        res.json({
            success: true,
            message: resObject,
        });
            
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = getDetailsController;