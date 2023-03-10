
const path = require("path"); 
 const fs = require("fs"); 
const User = require("../models/userModel"); // importing the user model
const Friends = require("../models/friendsModels"); 
// for rendering the sign up page 
module.exports.renderSignUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile"); 
    }
    return res.render("signUp"); 
}
// for rendering the sign in page 
module.exports.renderSignIn = function(req, res){
     if(req.isAuthenticated()){
        return res.redirect("/users/profile"); 
     }
    return res.render("signIn"); 
}; 
 // for getting the data from signUp page 
module.exports.createUser = function(req, res){
    if(req.body.password != req.body.confirm_password){
         console.log('this is error ')
        return res.redirect("back"); 
    }
     User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log("error in finding user while sign up "); 
            return; 
        }
         if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log(" error in creating user while signing up"); 
                    return; 
                }
                return res.redirect('/users/sign-in'); 
            })
         }else{
            return res.redirect("back"); 
         }
     })
}
// for getting the data from signIn page
module.exports.createSession = function(req, res){
     req.flash('success', "Logged In Sucessfuly")
    return res.redirect("/"); 
}
// for rendering the profile page  of different  users 
 module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
         if(err){
            console.log("error in displaying profile via link "); 
            return; 
         }
        return res.render("profile", {
            profile_user : user
        }); 

    })
      
     
 }
 // for sign out 
 module.exports.destroySession = function(req, res){
    req.logout(function(err){
        console.log("error in logout ")
    }); 
    req.flash("success", "Logged Out Successfully"); 
    return res.redirect("/"); 
 }

 // for updating the user profile 
 module.exports.update= async function(req, res){
   
    if(req.user.id==req.params.id){
        try{
            let user  = await User.findById(req.params.id); 
            User.uploadedAvatar(req, res, function(err){
               if(err){
                   console.log("Multer Error"); 
                   return; 
               }
                user.name =req.body.name; 
                user.email= req.body.email; 
                 if(req.file){
                 if(user.avatar){
                     fs.unlinkSync(path.join(__dirname, "..", user.avatar)); 

                 }

                    // saving the path of the uploaded file into the avtar field in the user 
                     user.avatar = User.avatarPath + "/" + req.file.filename; 
                 }
                  user.save(); 
                  return res.redirect("back"); 
               
            })
   
        }catch(error){
           req.flash("error", err); 
           return res.redirect("back"); 
        }

    }else{
        return res.status(401).send("Unauthorized"); 
    }
 }
 module.exports.profile_friends= async function(req, res){

   // frinds database add 
   // user add 
   // check if friend already exist 
   let exist = false; 
   let existing  = await Friends.findOne({$or:[{from_user: req.user._id, to_user: req.params.to_id},{from_user: req.params.to_id, to_user: req.user._id} ] }); 
   if(existing){
        exist = true; 
   }else{

   
   Friends.create({
    from_user: req.user._id,
    to_user: req.params.to_id
   }, function(err, friend){
    if(err){
        console.log("error in maintaning  a friendship "); 
        return ; 
    }

    
    User.findById(req.user._id, function(err, user){
        if(err){
            console.log("error in finding user ");
            return;
        }
        user.friends.push(friend);
        user.save();
    })
     let toUser; 
    User.findById(req.params.to_id, function(err, user){
        if(err){
            console.log("error in finding user ");
            return;
        }
         toUser=user
        user.friends.push(friend);
        user.save();
    })

    return res.status(200).json({
       data : {
        exist: exist, 
        friend: friend, 
        toUser: toUser
       }

   }) 

})
}
   
 }
