const mongoose = require("mongoose");

const submittedQuiz = mongoose.Schema({
    quizId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    questions:[
        {
            id:{
                type: String,
                required: true,
            },
            index:{
                type: Number,   
                required: true,
            },
            mark: {
                type: Number,
                required: true,
            },
            type:{
                type: String,
                required: true,
            },
            userAnswer:[{
                type: String,
                required: true,
            }],
            mainAnswer:[
                {
                    id:{
                        type: String,
                    },
                    input:{
                        type: String,
                    },
                }
            ]
        }
    ]
},
{
    timestamps: true,
}
);

const SubmittedQuiz = mongoose.model("SubmittedQuiz", submittedQuiz);
module.exports = SubmittedQuiz;
