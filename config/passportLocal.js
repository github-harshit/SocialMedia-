const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const User = require("../models/userModel"); 

// create authentication function 
passport.use(new LocalStrategy({
    usernameField:'email'
}, 
function(email, password, done){
    // find a user and establish identity 
    User.findOne({email: email}, function(err, user){
         if(err){
            console.log("error in passport"); 
            return done(err); 
         }
          if(!user|| user.password!=password){
            console.log("invalid username or password "); 
            return done(null, false); 
          }
          return done(null, user); 

    }); 
}

)); 
passport.serializeUser(function(user, done){
    done(null, user.id); 
}); 
// deserialize the keys from the cookie 
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("eroor in findin the user"); 
            return; 
        }
         done(null, user); 
    })
}); 

passport.checkAuthentication = function(req, res, next){
    // if user is signed in pass request  to next function(controller's action)
     if(req.isAuthenticated()){
         return next(); 
     }
     //  if user is not signed in 
     return res.redirect("/users/sign-in"); 
  }
   passport.setAuthenticatedUser = function(req, res, next){
     if(req.isAuthenticated()){
         // req.user contains the current signed in user from session cookie 
         res.locals.user  = req.user
     }
     next(); 
   }

module.exports = passport; 