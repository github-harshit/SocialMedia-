const Post  = require("../models/postModel"); 
 const Comment = require("../models/commentModel");
  const Like = require("../models/likeModel"); 

module.exports.create = async function(req, res){

     try{
        let post = await Post.create({
            content : req.body.content, 
            user: req.user._id
         }); 
         let ajaxPost  = await post.populate("user"); 
        
         if(req.xhr){
            return res.status(200).json({
                data: {
                    post:ajaxPost
                }, 
                message : "post created "
            })
         }
      
          req.flash("success", "Post created "); 
          return res.redirect("back");
       
        

     }catch(err){
        req.flash("error", err); 
        console.log("error in creating post"); 
         return ; 

     }
     
    

}
module.exports.destroy = async  function(req, res){
     try{
        let post = await Post.findById(req.params.id)
        
            // req.user.id gives the object id(req.user._id)in string format 
            if(post.user==req.user.id){
               
                
                let comment = await  Comment.deleteMany({post: req.params.id}); 
                await Like.deleteMany({likeable: post, onModel: 'Post'}); 
                const commentIds = post.comments;

                await Like.deleteMany({commentId: {$in: commentIds}});
                post.remove(); // database remove 
                 if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        }, 
                        message: "Post deleted"
                    })
                 }
              
               
                    return res.redirect('back');
              
            }
        }
      catch(err){
         req.flash("error", "Cannot delete the post"); 
        console.log(err); 
        return; 

     }
    
 
}