const mongoose = require('mongoose');
const Course = require('../../models/Course');

const getStudentListsController = (req, res) => {
    const id = req.params.id;
    const updatedId = mongoose.Types.ObjectId(id);

    Course.findById(updatedId).populate('userList').then((result) => {
        res.json({
            success: true,
            message: result.userList,
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: err.message
        });
    })
}

module.exports = getStudentListsController;
