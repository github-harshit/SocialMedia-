const express = require('express');
 const app = express(); 
 const port = 8000; 
  const db = require("./config/mongoose");
  const indexRouter = require("./routes/indexRoute");
   const expressLayouts = require("express-ejs-layouts");
  app.use(expressLayouts);
   app.set("views", "./views");
   app.set("view engine", "ejs");
 
   app.use(express.urlencoded());
  app.use("/",indexRouter ); 



 app.listen(port, function(err){
     if(err){
            console.log(`Error in running the server: ${err}`);
             returnnode ; 
     }
    console.log(`Server is running on port: ${port}`);
     
 })