//Internal importing
const Course = require('../../models/Course');
const User = require('../../models/User');


const addTaskController = (req, res) => {
    const {accessCode, title, link} = req.body;

    const updateObject = {
        accessCode,
        title,
        link
    };

    Course.find({accessCode: accessCode}).populate('userList').then((result)=>{

        result.forEach((element) => {
            element.userList.forEach((ele) => {
                User.updateOne({_id: ele._id}, {$addToSet: {studentTasks: [updateObject]}}).then((upResult)=>{
                    //do nothing
                }).catch((err)=>{
                    res.json({
                        success: false,
                        message: "Unsuccessful!",
                    })
                })
            })
        })   
        
        res.json({
            success: true,
            message: 'Successfully Updated',
        })

    }).catch((err)=>{
        res.json({
            success: false,
            message: err.message,
        })
    })
};

module.exports = addTaskController;
