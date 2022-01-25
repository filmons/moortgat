const express = require("express");
require("express-async-errors");


const userRouter = require("./user_router");


const mainRouter = express.Router();


mainRouter.use("/user", userRouter);


module.exports = mainRouter;