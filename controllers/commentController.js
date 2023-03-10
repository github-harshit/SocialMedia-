const Comment = require("../models/commentModel"); 
const Post = require("../models/postModel"); 
 const User = require("../models/userModel"); 
 const commentMailer =require("../mailers/comment_mailer");
 const Like = require("../models/likeModel");  
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
          let ajaxComment = await comment.populate("user"); 
         
         
      
          commentMailer.newComment(newcomment); 
          if(req.xhr){
            return res.status(200).json({
                data: {
                    comment: ajaxComment
                }, 
                message: "Comment created"

            })
          }
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
            await Like.deleteMany({likeable: comment, onModel: 'Comment'});

            if(req.xhr){
               
                 return res.status(200).json({
                    data: {
                        comment_id: req.params.id, 
                        post_id : postId
                    }, 
                    msg : "Comment deleted"
                 })
            }
           
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