//importing
const roomJoinMiddleware = require('../../middlewares/RoomJoin/roomJoinMiddleware');
const Course = require('../../models/Course');
const User = require('../../models/User');


const joinRoomController = async(req, res) => {
   const {accessCode, email} = req.body;
   const {updateObject, isError} = await roomJoinMiddleware(accessCode, email);

   Course.findOne({accessCode: accessCode}).then((content) => {
        User.findOneAndUpdate({email: email}, {$addToSet: {course: [content._id]}, $push: {studentTasks: updateObject}}).then((result)=>{
        
          if(content.teacherEmail !== email){
            Course.updateOne({accessCode: accessCode}, {$addToSet: {userList: [result._id]}}).then((upResult) => {
                res.json({
                    success: true,
                    message: "Joined successful!",
                })
              }).catch((err)=>{
                res.json({
                    success: false,
                    message: err.message,
                })
              })
          }else{
            res.json({
                success: false,
                message: "Owner can't be joined!",
            })
          }
        }).catch((err)=>{
            res.json({
                success: false,
                message: err.message,
            })
        })
   }).catch((err)=>{
    res.json({
        success: false,
        message: err.message,
    })
   })
};

module.exports = joinRoomController;
