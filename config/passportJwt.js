const passport = require("passport"); 
const JWTstrategy  = require("passport-jwt").Strategy; 
 const ExtractJWT = require("passport-jwt").ExtractJwt; 
  const User = require("../models/userModel");
   let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(), 
    secretOrKey: "social"
   }
    passport.use(new JWTstrategy(opts, function(jwtPayLoad, done){
        User.findById(jwtPayLoad._id, function(err, user){
            if(err){
                console.log("Error in finding the user from Jwt"); 
                return; 
            }
             if(user){
                return done(null, user); 
             }else{
                return done(null,  false); 
             }
        })
    })); 
     module.exports = passport; 