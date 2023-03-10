const express = require('express');
 const app = express(); 
 const port = 8000; 
  const db = require("./config/mongoose");
  const indexRouter = require("./routes/indexRoute");
   const expressLayouts = require("express-ejs-layouts");
   const cookieParser = require("cookie-parser"); 
    const passport = require("passport"); 
    const passportLocal = require("./config/passportLocal"); 
     const paspportJwt = require("./config/passportJwt"); 
      const passportGoogle = require("./config/passportGoogle"); 
    const MongoStore = require("connect-mongo");
     const session = require("express-session");
     const sassMiddleware = require("node-sass-middleware"); 
     const flash = require("connect-flash"); 
     const customMiddleware= require("./config/flashMiddleware"); 
    // setting up the chat server 
     const  chatServer = require("http").Server(app); 
     const chatSockets = require("./config/chat_sockets").chatSockets(chatServer); 
     chatServer.listen(5000);
      console.log(" chat servers is listening on port 5000 ")
     app.use(sassMiddleware({
        src: "./assets/scss", 
        dest:"./assets/css", 
        debug:true, 
        outputStyle:"extended", 
        prefix:"/css"
      }))
    
     app.use(express.static("assets"));  
     app.use(expressLayouts);
     // make the uploads path available to browser 
     app.use("/uploads", express.static(__dirname + "/uploads")); 
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
     app.use(flash()); 
      app.use(customMiddleware.setFlash); 
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