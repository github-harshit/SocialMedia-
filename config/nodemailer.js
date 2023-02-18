const nodemailer = require("nodemailer"); 
 const ejs = require("ejs"); 
  const path = require("path"); 
  // this is the part which send the email 
let transporter = nodemailer.createTransport({
    service:"gmail", 
    host : "smtp.gmail.com", 
    port : 587,
    secure: true, 
    auth: {
        user:"joshiharshit001@gmail.com", 
        pass: "ajxjqiuqcuimjjww"
    }
}); 
// html email  that is going to be sent 
 let renderTemplate = (data, relativePath)=>{
let  mailHTML; 
   ejs.renderFile(
     path.join(__dirname, "../views/mailers", relativePath), 
     data, 
     function(err, template){
         if(err){
            console.log("error in rendering template");
            return; 
         }
         mailHTML = template; 
     }


   )
   return mailHTML; 
 }
  module.exports = {
    transporter: transporter, 
    renderTemplate : renderTemplate
  }