const Post  = require("../../../models/postModel"); 
const Comment = require("../../../models/commentModel"); 
module.exports.index = async function(req, res){
    let posts = await  Post.find({}).sort("-createdAt")
   .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
          
        }
    })
    return res.json(200, {
        message: "list of posts ",
        posts : posts
    })
}
 
    module.exports.destroy = async  function(req, res){
        try{
           let post = await Post.findById(req.params.id)
           if(post.user==req.user.id){
               // req.user.id gives the object id(req.user._id)in string format 
              
                   post.remove(); 
                   let comment = await  Comment.deleteMany({post: req.params.id}); 
                    
                  
                       return res.json(200, {
                        message: "post and aommnets deleted"
                       })
                 
           
           }else{
            return res.json(401,{
                message: "You canot delete the psot"
            } )
           }
        }catch(err){
           
           return res.json(500),{
            message: "Internal Server Error"
           }
   
        }
       
    
   }

   
