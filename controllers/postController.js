const Post  = require("../models/postModel"); 
 const Comment = require("../models/commentModel");

module.exports.create = async function(req, res){

     try{
        let post = await Post.create({
            content : req.body.content, 
            user: req.user._id
         }); 
        
      
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
        if(post){
            // req.user.id gives the object id(req.user._id)in string format 
            if(post.user==req.user.id){
                post.remove(); // database remove 

                let comment = await  Comment.deleteMany({post: req.params.id}); 
              
               
                    return res.redirect('back');
              
            }
        }else{
            return res.redirect("back"); 
        }
     }catch(err){
         req.flash("error", "Cannot delete the post"); 
        console.log(err); 
        return; 

     }
    
 
}