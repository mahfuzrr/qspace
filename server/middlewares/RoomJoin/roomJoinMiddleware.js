const { default: mongoose } = require("mongoose");
const Course = require("../../models/Course");

const roomJoinMiddleware = async(accessCode, email) => {

    let updateObject = [];

    const content = await Course.findOne({accessCode: accessCode});

    content.tasks.forEach((element) => {
        let upElement = JSON.parse(JSON.stringify(element));
        upElement.accessCode = accessCode;
        const id = new mongoose.Types.ObjectId;
        upElement._id = id;

        updateObject.push(upElement);
    })

    return{
        updateObject,
        isError: false,
    }
};

module.exports = roomJoinMiddleware;