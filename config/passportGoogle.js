const passport = require("passport"); 
const googleStrategy = require("passport-google-oauth").OAuth2Strategy; 
const crypto = require("crypto"); 
const User = require("../models/userModel"); 


passport.use(new googleStrategy({
    clientID : "1037173735470-gco9gvsck5qjpa1o2v69lmc0s00ptnau.apps.googleusercontent.com", 
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, 
 function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log("error in google authentication"); 
            return ;  
        }
         console.log(profile); 
          if(user){
            return done(null, user); 
          }else{
            User.create({
                name: profile.displayName, 
                email: profile.emails[0].value, 
                password: crypto.randomBytes(20).toString("hex")

            }, function(err, user){
                if(err){
                     console.log('error uin creatting a user via google strategy' ); 
                    return; 
                }
                 return done(null, user); 
            })
          }
    })
 }
))