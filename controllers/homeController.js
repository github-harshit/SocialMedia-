const mongoose = require('mongoose')
const Post  = require('../models/postModel')
const User = require('../models/userModel')
 const Comment = require('../models/commentModel'); 
module.exports.home = function(req, res){
     Post.find({})
   .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
          
        }
    })
     .exec(function(err, posts){
        User.find({}, function(err, users){
             return res.render("home", {
                posts:posts, 
                all_users: users
             })
        })
         

     })
    
   
}