const nodeMailer = require("../config/nodemailer"); 
exports.newComment = function(comment){
     let htmlString  = nodeMailer.renderTemplate({comment:comment}, "/comments/comment_mailer.ejs"); 
    nodeMailer.transporter.sendMail({
        from : "joshiharshit001@gmail.com",
        to: comment.post.user.email, 
        subject : "new comment made", 
        html:  htmlString
    }, (err, info)=>{
        if(err){
             console.log(err); 
            console.log("error in sending mail"); 
            return; 
        }
         console.log("MESSAGE SENT", info);
         return; 
    }); 
}