//Internal importing
const { default: mongoose } = require('mongoose');
const User = require('../../models/User');

const completeTaskSt = (req, res) => {
    const {id} = req.body;
    const updateId = mongoose.Types.ObjectId(id);
    //const id = crypto.randomBytes(2).toString("hex"); it is efficient for unique id

    User.updateOne({"studentTasks._id": id}, { $set: { "studentTasks.$.isComplete": true} }).then((result)=>{
        //console.log(result);
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

module.exports = completeTaskSt;
