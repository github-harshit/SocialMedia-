const Like = require("../models/likeModel"); 
const Comment = require("../models/commentModel"); 
const Post = require("../models/postModel"); 
module.exports.toggleLike = async function(req, res){
    try{
         // url will be like this likes/toogle/?id=xyz&type=Post
        let likeable; 
        let deleted = false; 
        if(req.query.type=="Post"){
            likeable = await Post.findById(req.query.id).populate("likes"); 
        }else{
             likeable = await Comment.findById(req.query.id).populate("likes"); 

        }
        // check if there is already like present by user 
        let existingLike = await Like.findOne({
            likeable: req.query.id, 
            onModel:req.query.type, 
            user: req.user._id
        })
         // if present  delete it else create it 
         if(existingLike){
            likeable.likes.pull(existingLike._id); 
            likeable.save(); 
            existingLike.remove(); 
             deleted= true; 
         }else{
            let newLike = await Like.create({
                likeable: req.query.id, 
                onModel:req.query.type, 
                user: req.user._id
            }); 
            likeable.likes.push(newLike._id); 
            likeable.save(); 
         }
         return res.status(200).json( {
            message: "Request successful!",
            data: {
                deleted: deleted
            }
        })


    }catch(err){
         console.log(err); 
         return res.status(404).json({
            message: "error in like request"
         })

    }
}