const express = require("express");
const homeController = require("../controllers/homeController");
const router = express.Router();
const UserRouter = require("./userRoutes");
 const PostRouter  = require("./postRouter"); 
  const CommentRouter  = require("./commentRoute");
   const APIRouter = require("./api/index"); 
    const LikeRouter = require('./likesRouter'); 
 router.get("/", homeController.home); 
 router.use("/users", UserRouter); 
  router.use("/post", PostRouter); 
   router.use("/comments", CommentRouter); 
    router.use("/api", APIRouter); 
     router.use("/likes", LikeRouter); 
   
  module.exports = router ;  
