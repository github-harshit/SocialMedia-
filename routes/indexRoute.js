const express = require("express");
const homeController = require("../controllers/homeController");
const router = express.Router();
const UserRouter = require("./userRoutes");
router.get("/", homeController.home); 
 router.use("/users", UserRouter); 
  module.exports = router ;  
