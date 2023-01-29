const express = require("express"); 
 const router = express.Router();
  const userController = require("../controllers/userController");
  router.get("/sign-up", userController.renderSignUp); 
  router.get("/sign-in", userController.renderSignIn);
  router.post("/createUser", userController.createUser)
 module.exports = router ; 