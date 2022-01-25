const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  findAllUsers,
  getOne,
  registre,
  login,
  
} = require("../controllers/user_Controller");

const { ValidationError } = require("../helpers/errors");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await findAllUsers();
    response.status(OK).json(users);
  } catch (error) {
    console.error(error.message);
    response.status(error.status).json(error);
  }

});
router.get("/:id", async (request, response) => {
  const userById = await getOne(request.params.id);
  response.status(OK).json(userById);
});

router.post("/signup", async (request, response) => {
  const userToAdd = request.body;
  try {
    const newuser = await registre(userToAdd);
    response.status(CREATED).json(newuser);
  } catch (error) {
    console.log(error);
    response.status(error.status).json(error);
  }
});

router.post("/login", async (request, response) => {
  const userToAdd = request.body;
  try {
    const newpatient = await login(userToAdd);
    response.status(CREATED).json(newpatient);
  } catch (error) {
    console.log(error);

    response.status(error.status).json(error);
  }
});





module.exports = router;