//package importing
const crypto = require('crypto');

//Internal importing
const Course = require('../../models/Course');
const User = require('../../models/User');



const addTaskController = (req, res) => {
    const {accessCode, title, link} = req.body;
    //const id = crypto.randomBytes(2).toString("hex"); it is efficient for unique id

    const updateObject = {
        accessCode: '122',
        title,
        link
    };

    Course.updateOne({accessCode: accessCode}, { $addToSet: { tasks: [updateObject]} }).then((result)=>{
        res.json({
            success: true,
            result,
        });
    }).catch((err)=>{
        res.json({
            success: false,
            message: err.message,
        })
    })
};

module.exports = addTaskController;
