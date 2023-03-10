const express = require("express"); 
 const router = express.Router();
  const likesController = require("../controllers/likeController"); 
 router.get("/toggle",likesController.toggleLike ); 
  module.exports = router; 