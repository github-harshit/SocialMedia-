
const User = require("../models/userModel"); // importing the user model
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
     
    return res.redirect("/users/profile"); 
}
// for rendering the profile page 
 module.exports.profile = function(req, res){
    return res.render("profile", 
      
    ); 
 }
 // for sign out 
 module.exports.destroySession = function(req, res){
    req.logout(function(err){
        console.log("error in logout ")
    }); 
    return res.redirect("/"); 
 }


