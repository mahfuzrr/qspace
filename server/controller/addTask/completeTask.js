//Internal importing
const { default: mongoose } = require('mongoose');
const Course = require('../../models/Course');

const completeTaskController = (req, res) => {
    const {id} = req.body;
    const updateId = mongoose.Types.ObjectId(id);
    //const id = crypto.randomBytes(2).toString("hex"); it is efficient for unique id

    Course.updateOne({"tasks._id": id}, { $set: { "tasks.$.isComplete": true} }).then((result)=>{
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

module.exports = completeTaskController;
