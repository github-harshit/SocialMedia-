const express = require('express');
 const app = express(); 
 const port = 8000; 
  const db = require("./config/mongoose");
  const indexRouter = require("./routes/indexRoute");
   const expressLayouts = require("express-ejs-layouts");
   const cookieParser = require("cookie-parser"); 
    const passport = require("passport"); 
    const passportLocal = require("./config/passportLocal"); 
    const MongoStore = require("connect-mongo");
     const session = require("express-session");
     
      
    
     app.use(express.static("assets"));  
     app.use(expressLayouts);
     app.set('layout extractStyles', true); 
     app.set("layout extractScripts", true); 
     app.set("views", "./views");
     app.set("view engine", "ejs");
     
     app.use(session({
        name:"socialMedia", 
        secret:"secret", 
        saveUninitialized: false, 
        resave:  false, 
        store : MongoStore.create(
            {mongoUrl: "mongodb://localhost/Soical_Webiste_db"}, 
            {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, function(err){
            console.log(err || "connect mongodb setup ok"); 
        })

     })); 
     app.use(passport.initialize()); 
     app.use(passport.session());
     app.use(passport.setAuthenticatedUser); 

   app.use(express.urlencoded());
    app.use(cookieParser()); 
  app.use("/",indexRouter ); 
   



 app.listen(port, function(err){
     if(err){
            console.log(`Error in running the server: ${err}`);
             returnnode ; 
     }
    console.log(`Server is running on port: ${port}`);
     
 })