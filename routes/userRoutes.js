const express = require("express"); 
 const router = express.Router();
  const userController = require("../controllers/userController");
   const passport = require("passport");
   const passportLocal = require("../config/passportLocal"); 
  router.get("/sign-up", userController.renderSignUp); 
  router.get("/sign-in", userController.renderSignIn);
  router.post("/createUser", userController.createUser); 
  router.post("/createSession",
  passport.authenticate(
    'local', 
    {failureRedirect: '/users/sign-in'}
   ),  userController.createSession); 
    router.get("/profile", passport.checkAuthentication,  userController.profile); 
 module.exports = router ; 