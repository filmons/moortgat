const express = require("express");
const db = require('./models');
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const dotenv = require ("dotenv");
dotenv.config();

const routes = require("./routes/index");

const { notFoundHandler, errorLogger, errorHandler } = require("./middlewares");

const server = express();

server.use(helmet());
server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));



server.use("/api", cors());
server.use("/api", routes);

server.use("*", notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

// module.exports = server;
const port = Number(process.env.PORT);

server.listen(port, async () => {
    console.debug(`Server is listening on port ${port}`);
    //console.debug(`Current environment is ${env});
    db.sequelize.sync({ alter: true }, () => {
      console.log("db on");
    });
  });
