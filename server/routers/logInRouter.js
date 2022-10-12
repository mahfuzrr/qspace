//external imports
const express = require("express");

//router
const router = express.Router();

//login page
router.get("/", logInController);

module.exports = router;
