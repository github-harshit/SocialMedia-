const Comment = require("../models/commentModel"); 
const Post = require("../models/postModel"); 
 module.exports.create = function(req, res){
  Post.findById(req.body.post, function(err,post){
    if(err){
        console.log(req.body.post); 
        console.log("error in finding the post "); 
        return; 
    }
    if(post){
        Comment.create({
            content: req.body.content,
            post:req.body.post,
             user:req.user._id
        }, function(err, comment){
            if(err){
                console.log("error in finding the comment "); 
                return; 
            }
            post.comments.push(comment); 
            post.save(); 

            return res.redirect('back'); 
        })
    }
  })
 }
 module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();
             Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}}, function(err, post){
                return res.redirect('back');
             })
        }else{
            return res.redirect("back"); 
        }
    })
 }