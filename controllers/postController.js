const Post  = require("../models/postModel"); 
 const Comment = require("../models/commentModel");
const { equal } = require("assert");
module.exports.create = function(req, res){
     Post.create({
        content : req.body.content, 
        user: req.user._id
     }, function(err, post){
         if(err){
            console.log("error in creating post"); 
            return; 
         }
          console.log("post created sucessfully"); 
          return res.redirect('back'); 
     })
    

}
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(post){
            // req.user.id gives the object id(req.user._id)in string format 
            if(post.user==req.user.id){
                post.remove(); 
                 Comment.deleteMany({post: req.params.id}, function(err){
                    return res.redirect('back');
                 })
            }
        }
    })
}