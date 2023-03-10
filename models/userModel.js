const mongoose = require("mongoose");
 const multer= require("multer"); 
 const path = require('path'); 
  const AVATAR_PATH = path.join("/uploads/users/avatars"); 
const userSchema  = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique : true 
    }, 
    password: {
        type: String, 
        required: true
    }, 
    name: {
        type: String, 
        required: true
    }, 
    avatar:{
        type: String
    }, 
    friends: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Friends"
       
    }]
}, {
    timestamps: true
}); 

let  storage = multer.diskStorage({
    // there is a request with a file and with callback function 
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,  "..",  AVATAR_PATH))  // second part of callback function should be the exact path where file is located 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)  //file.fieldname => every file that is uploded will be saved as avater--- because fieldname is avatar 
    }
  })

  // static function 
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar'); 
  userSchema.statics.avatarPath = AVATAR_PATH
 const User  = mongoose.model("User", userSchema); 
 module.exports =User; 