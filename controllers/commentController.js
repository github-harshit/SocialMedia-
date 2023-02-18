const Comment = require("../models/commentModel"); 
const Post = require("../models/postModel"); 
 const User = require("../models/userModel"); 
 const commentMailer =require("../mailers/comment_mailer"); 
 module.exports.create = async function(req, res){
     try{
        let post = await  Post.findById(req.body.post)
   
    if(post){
        
        let comment = await Comment.create({
            content: req.body.content,
            post:req.body.post,
             user:req.user._id
        })
            
            post.comments.push(comment); 
            post.save(); 
           
         let  newcomment = await comment.populate({
            path: 'post', 
            populate:{
                path: "user"
            }
         })
         
         
      
          commentMailer.newComment(newcomment); 
             req.flash("success", "Comment created "); 
            return res.redirect('back'); 
    
    }else{
        console.log("error in finding post"); 
         return; 
    }

     }catch(err){
        
         req.flash("error", "Error in creating te comment "); 
        return ; 

     }
  

 }
 module.exports.destroy = async function(req, res){
     try{
        let comment = await Comment.findById(req.params.id); 
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await  Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}}); 
             req.flash("success", "comment deleted "); 
            
                return res.redirect('back');
        
        }else{
            return res.redirect("back"); 
        }

     }catch(err){
         req.flash("error", "cannot delete comment ") 
        console.log("error in destroying comment"); 
        return; 
     }
    
  
 }