const mongoose = require('mongoose');
const Course = require('../../models/Course');
const User = require('../../models/User');

const removeStudentController = (req, res) => {
    const {email, courseid} = req.params;
    const updatedCourseId = mongoose.Types.ObjectId(courseid);

    User.findOneAndUpdate({email: email}, {$pull: {'course': updatedCourseId}}).then((result) => {
        Course.findOneAndUpdate({_id: updatedCourseId}, {$pull: {'userList': result._id}}).then((upRes) => {
            res.json({
                success: true,
                message: "Removed Successful!"
            });
        }).catch((err) => {
            res.json({
                success: false,
                message: err.message,
            });
        })
    }).catch((err1) => {
        res.json({
            success: false,
            message: err1.message
        });
    })
}

module.exports = removeStudentController;
