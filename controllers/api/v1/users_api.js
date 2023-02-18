const User = require("../../../models/userModel"); 
const jwt  = require("jsonwebtoken"); 
module.exports.createSession = async function(req, res){
     try{
      let user = await User.findOne({email: req.body.email}); 
      if(!user || user.password!=req.body.password){
        return res.json(422, {
            message: "Inavlid password or username"
        })
    }
        return res.json(200, {
            message: "Sign in successful", 
             data: {
                token: jwt.sign(user.toJSON(), "social", {expiresIn: "100000"})
             }

        })

      
    }catch(error){
        console.log(error); 
        return res.json(500, {
            message: "internal Server error"
        })
     }
   
}