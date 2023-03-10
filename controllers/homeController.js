const mongoose = require('mongoose')
const Post  = require('../models/postModel')
const User = require('../models/userModel')
const Like = require("../models/likeModel"); 
 const Comment = require('../models/commentModel'); 
    const Friends = require('../models/friendsModels');
const { populate } = require('../models/userModel');
 
  module.exports.home = async function(req, res){
    let posts = await Post.find({})
    .sort("-createdAt")
    .populate('user')
    .populate('comments').sort("-createdAt")
    .populate('likes')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'likes',
      }
    });
    let list=[]; 
     let users =   await  User.find({}); 
     
     
     
      if(req.user){

        await  Friends.find({
            $or: [{from_user: req.user._id}, {to_user: req.user._id}]
         }).populate("from_user").populate("to_user").exec(function(err, friends){
            if(err){
                console.log("error in finding friends");
                return;
                }
               // console.log(friends);
                for(let i=0;i<friends.length;i++){
                    if(friends[i].from_user.id == req.user.id){
                        list.push(friends[i].to_user.name);
                    }else if(friends[i].to_user.id == req.user.id){
                       list.push(friends[i].from_user.name);
                    }
                }
                //console.log(list.length + "****"); 
               
         

        
      
     
         
             
              return res.render("home", {
                posts:posts, 
                all_users: users,
                list : list
     })
          
        })
      }else{
        return res.render("home", {
                posts:posts, 
                all_users: users
               
        })
      }
    }
      
            
          
              
   


    
           
      


  
    

    
   
