const User = require('../../models/User');

const getRoomController = (req, res) => {
    
    let {email} = req.params;

    User.findOne({email: email}).select({
        _id: 0,
        password: 0,
        quizes: 0,
        role: 0,
        institution: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
    }).populate("course").exec((err, data)=>{
        res.json({
            success: true,
            message: data,
        })
    });
}

module.exports = getRoomController;
