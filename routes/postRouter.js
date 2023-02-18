const express = require("express"); 
 const router = express.Router();
  const passport = require("passport"); 
  const postController  = require("../controllers/postController"); 
   router.post("/create",passport.checkAuthentication,  postController.create); // using passpot.checkAuthentication to make sure only logged user can make post 
   router.get("/destroy/:id",passport.checkAuthentication,  postController.destroy); 
    module.exports = router; 

  