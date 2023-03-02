const { default: mongoose } = require('mongoose');
const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

const checkQuizMiddleware = (req, res, next) => {
    const {email, quizId} = req.body;

    const updatedId = mongoose.Types.ObjectId(quizId);

    User.findOne({email: email}).then((data) => {
        Quiz.findById(updatedId).then((result) => {
            let check = false;

           for(let i = 0; i<result.perticipants.length; i += 1){
                if(result.perticipants[i].userId.toHexString() == data._id.toHexString()){
                    check = true;
                    break;
                }
           }

        if(!check){
            next();
        }
        else{
            res.json({
                success: false,
                message: "Already Submitted!",
            })
        }

           
        }).catch((err) => {
            res.json({
                message: err.message,
            })
        })
    })

}

module.exports = checkQuizMiddleware;