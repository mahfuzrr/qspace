//package importing
const express = require("express");
const jwt = require("jsonwebtoken");

//controller
const regController = require("../controller/regController");
const logInController = require("../controller/logInController");

//middlewares
const checkAuth = require("../middlewares/common/checkAuth");
const logInValidator = require("../validators/logInValidator");
const authChecker = require("../controller/authChecker");
const profileUpdateController = require("../controller/profileUpdate");
const passUpdateController = require("../controller/passUpdateController");
const roomController = require("../controller/room/roomController");
const getRoomController = require("../controller/room/getRoomController");
const getRoomInfos = require("../controller/room/getRoomInfos");
const addTaskController = require("../controller/addTask/addTaskController");
const completeTaskController = require("../controller/addTask/completeTask");
const deleteTaskController = require("../controller/addTask/deleteTask");
const joinRoomController = require("../controller/joinRoom/joinRoom");
const getStudentRoomController = require("../controller/joinRoom/getStudentRoom");
const updateTaskStudent = require("../controller/addTask/updateTaskStudent");
const completeTaskSt = require("../controller/addTask/completeTaskSt");
const userInfo = require("../controller/userDBinfo/userInfo");
const studentTaskDelete = require("../controller/addTask/studentTaskDelete");
const addCoursePostController = require("../controller/Posts/addCoursePost");
const getRoomPostsController = require("../controller/Posts/getRoomPostsController");
const getPrivatePostsController = require("../controller/Posts/getPrivatePostsController");
const createQuizController = require("../controller/create-quiz/createQuizHandler");
const getCourseController = require("../controller/getCourse/getCouresController");
const getQuizInfoController = require("../controller/getQuizDash/getQuizInfoController");
const getQuestionController = require("../controller/getQuizDash/getQuestionController");
const deleteQuizController = require("../controller/getQuizDash/deleteQuizController");
const editStatusController = require("../controller/getQuizDash/editStatusController");

//router
const router = express.Router();

//register router
router.post("/register", regController);

//login router
router.post("/login", logInController);

// user authentication
router.get("/reload-user-save", authChecker);

//update user information
router.patch("/update-user", profileUpdateController);

//update user password
router.patch("/update-password", passUpdateController);

// get user information
router.get("/userinfo/:email", checkAuth, userInfo);

// create room
router.post("/create-room", roomController);

// get room
router.get("/get-all-rooms", getRoomController);

// get room info
router.get("/getinfo/:id", getRoomInfos);

// add tasks teacher
router.patch("/add-task-787", addTaskController);

// add task for student
router.patch("/add-task-student", updateTaskStudent);

// complete task
router.patch("/task-completed88", completeTaskController);

// student complete task
router.patch("/task-complete-student", completeTaskSt);

// delete task
router.patch("/delete-task45", deleteTaskController);

// delete task for student
router.patch("/delete-student-task", studentTaskDelete);

// join room for student
router.post("/join-room-student",  joinRoomController);

// get room for student
router.get("/get-room-student/:email", getStudentRoomController);

// add course Post
router.post("/add-course-post", checkAuth, addCoursePostController);

// get course post
router.get("/get-course-post/:roomId", getRoomPostsController);

// get private posts
router.get('/get-private-post/:email', getPrivatePostsController);

// Quiz Routers
router.post('/create-quiz', createQuizController);

// get all courselist
router.get('/get-courses/:email', getCourseController);

// get quiz list for quiz dashboard
router.get('/get-quizzes/:email', getQuizInfoController);

// get questions
router.get('/get-questions/:id', getQuestionController);

// delete questions
router.delete('/delete-question/:id', deleteQuizController);

// update active/hidden status
router.patch('/update-quiz-status', editStatusController);

module.exports = router;
