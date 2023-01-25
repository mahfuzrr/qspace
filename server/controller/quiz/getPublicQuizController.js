const { default: mongoose } = require("mongoose");
const Quiz = require("../../models/Quiz");

const getPublicQuizController = (req, res) => {
    Quiz.find().then((result) => {

        const allData = [];

        for(let i=0; i<result?.length; i+= 1){
            if(result[i]?.catagory === 'public'){
                allData.push(result[i]);
            }
        }

        res.json({
            success: true,
            message: allData,
        });

    }).catch((err) => {
        res.json({
            success: false,
            message: err.message,
        });
    })
};

module.exports = getPublicQuizController;