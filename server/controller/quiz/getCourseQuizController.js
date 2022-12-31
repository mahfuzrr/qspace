const User = require('../../models/User');
const Quiz = require('../../models/Quiz');

const getCourseQuizController = (req, res) => {
    const {email} = req.params;

    User.findOne({email: email}).populate({
        path : 'course',
        populate : {
          path : 'quizzes'
        }
      }).then((result) => {

        let upRes = [];

        for(let i = 0; i<result?.course?.length; i+=1){
            //upRes.push(result?.course[i]?.quizzes)
            const temp = [...result?.course[i]?.quizzes];
            upRes = [...upRes, ...temp];
        }
        
        res.json({
            success: true,
            message: upRes,
        });

    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        })
    })
};

module.exports = getCourseQuizController;