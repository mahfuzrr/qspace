//external imports
const express = require("express");
const deleteLater = require("../controller/quiz/deleteLater");
const { route } = require("./users");

//router
const router = express.Router();

//login page
router.get("/", logInController);



module.exports = router;
