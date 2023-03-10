let createComment = function(){
    let newCommentForm = $("#newCommentForm"); 
    newCommentForm.submit(function(e){
        e.preventDefault(); 
        $.ajax({
            type: "post", 
            url:"/comments/create", 
           data: newCommentForm.serialize(), 
            success: function(data){
              let newComment = newCommentDom(data.data.comment);
       
             
              $(".showComments>ul").prepend(newComment); 
              new Noty({
                theme: 'relax',
                text: "Comment published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
            let dom = newComment[0]; 
            
             let link = dom.querySelector(".delete-comment-button"); 
              console.log("+++++++"); 
              console.log(link); 
             
            
              
               deleteComment(link);
                let likeLink = dom.querySelector(".toggle-like-button-comment"); 
                console.log(likeLink); 
              deleteComment($(" .delete-comment-button", newComment)); 
             handleComment($(" .toggle-like-button-comment", newComment)); 
              handleComment(likeLink); 

    
      
         
           
            }, 
            error : function(err){
                console.log(err.responseText)
            }
        })
    }); 

}   
 let newCommentDom = function(comment){
    return $(`<li id="comment-${comment._id}" class="onlyComments ">
    <p>
        ${comment.content}
       <p>
       ${comment.user.name}
       </p>
     
        <p>
              <a  class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fa-solid fa-trash"></i></a>
       
    

    
     <a class="toggle-like-button-comment dynamic" data-likes="0" href="/likes/toggle/?id=<%=comment._id%>&type=Comment"><i class="fa-regular fa-thumbs-up"></i>
     0 
</a>
     </p>
    
    
   
      
   

   </li>`)
 }
 createComment(); 

 let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault(); 
        $.ajax({
            type: "get", 
            url: $(deleteLink).prop("href"),
            success: function(data){
               
                $(`#comment-${data.data.comment_id}`).remove() // remove from dom from database we have already removed in commentController 
                new Noty({
                    theme: 'relax',
                    text: " comment Del",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show(); 
                

            },
            error: function(err){
                console.log(err.responseText); 
            }
        })
    })
 }


// handle likes of comments 

let handleComment = function(link){
   
    $(link).click(function(e){
     e.preventDefault(); 
    
    $.ajax({
     type: "get", 
     url: $(link).prop("href"),
     success: function(data){
         let count= parseInt( $(link).attr("data-likes")); 
          console.log(count);
         if(data.data.deleted==true){
             count-=1;
         }else{
             count+=1; 
         }
         $(link).attr('data-likes', count); 
         $(link).html(`${count} <i class="fa-regular fa-thumbs-up"></i>`)
     }, 
     error: function(err){
         console.log("error"); 
     }
    })
 
    })
  }


 let commentLoopover = function(){

    let allPosts = document.querySelector(".ListOfPosts"); 
    let allItems = allPosts.getElementsByClassName('onlyPosts');  
    for(let i =0; i<allItems.length; i++){

        let postId =  allItems[i].id; 
       // console.log(postId); 
        let commentList = document.querySelector(`.ListOfComments-${postId}`); 
        let allComments = commentList.querySelectorAll(".onlyComments"); 
       
         for(let j =0; j<allComments.length; j++){
            let commentLink = allComments[j].querySelector(".delete-comment-button"); 
            //console.log(commentLink); 
            // console.log(typeof commentLink); 
            let likeLink  = allComments[j].querySelector(".toggle-like-button-comment"); 
             handleComment(likeLink); 
            deleteComment(commentLink); 

         }
    

        
        
        }
    }
     
   
   

 
 commentLoopover();
 
   

