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
    router.get("/profile/:id", passport.checkAuthentication,  userController.profile); 
     router.get("/sign-out", userController.destroySession);
      router.post("/update/:id", passport.checkAuthentication, userController.update ); 

      // google authentication 
      // two routes one for whne i click button and second for which google fetches the data and send it to me 

      router.get("/auth/google", passport.authenticate('google', {scope:['profile','email' ]})); 
      router.get("/auth/google/callback", passport.authenticate('google', {
        failureRedirect :"/users/sign-in"
      }), userController.createSession); 

 module.exports = router ; 