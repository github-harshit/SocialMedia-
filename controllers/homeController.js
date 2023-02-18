const mongoose = require('mongoose')
const Post  = require('../models/postModel')
const User = require('../models/userModel')
 const Comment = require('../models/commentModel'); 
  module.exports.home = async function(req, res){
    let posts = await  Post.find({}).sort("-createdAt")
   .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
          
        }
    })
    
     let users =   await  User.find({})
             return res.render("home", {
                posts:posts, 
                all_users: users
             })
      
       }  

  
    

    
   
