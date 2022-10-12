const mongoose = require('mongoose');
const User = require('../../models/User');
const Course = require('../../models/Course');

const getRoomInfo = (req, res) => {
    const userId = req.params.id;
    const updatedId = mongoose.Types.ObjectId(userId);

    Course.findById(updatedId)
    .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
    })
    .exec((err, data)=>{
        if(err){
            res.json({
                success: false,
                message: err.message,
            });
        }
        else{
            res.json({
                success: true,
                message: data,
            });
        }
    });
}

module.exports = getRoomInfo;
