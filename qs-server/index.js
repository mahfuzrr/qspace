//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// internal imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");
//const logInRouter = require("./routers/logInRouter");
const userRouter = require("./routers/users");

const app = express();
dotenv.config();

//database connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection Successfull"))
    .catch((error) => console.log(error));

//cors
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
}
//app.use(cors());
app.use(cors(corsOptions));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//parse cookies
app.use(cookieParser());

//routing setup
app.use("/api/user/", userRouter);

//404 handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

//listen app
app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
});
