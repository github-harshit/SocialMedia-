
//method to  submit the form data through ajax

let createPost = function(){
    flag=false; 
    let newPostForm = $("#newPostForm"); 
    newPostForm.submit(function(e){
        e.preventDefault(); 
        $.ajax({
            type: "post", 
            url:"/post/create", 
           data: newPostForm.serialize(), 
            success: function(data){
              let newPost = newPostDom(data.data.post);
       
             
              $(".showPosts>ul").prepend(newPost); 
              new Noty({
                theme: 'relax',
                text: "Post published!",
                type: 'success',
                layout: 'topRight',
                timeout: 1500
                
            }).show();
    
        deletePost($(" .delete-post-button", newPost))  // dynamically added post uske delete link ke liye function add kiya hai 
        
           

        
        handleLike($(" .toggle-like-button", newPost))
           
            }, 
            error : function(err){
                console.log(err.responseText)
            }
        })
    })
}
// method to display post in dom 
 let newPostDom =  function(post){
   
    return $(`<li id="post-${post._id}" class="onlyPosts" >
               
    <p>${post.content}<p>
    <p> ${post.user.name} </p>

 
   

    <p>
      <a class="delete-post-button" href="/post/destroy/${post._id}"><i class="fa-solid fa-trash"></i></a> 
   

   
    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                           0 <i class="fa-regular fa-thumbs-up"></i>
                    </a>
    </p>

 



       <div class="commentContainer">

     
        <form action="/comments/create"  id="newCommentForm" method="post">
        <div class="addComment">
             <input type="text" name="content" id="content" placeholder="Add your comment">
            
             <input type="hidden" name="post" id="post" value=" ${post._id}">
              <input type="submit" class="submit" value="Add Comment">
        </div>
         </form>

      
        </div>
       <div class="showComments">
        <ul class="ListOfComments" id="comment-${post._id}">
           
        </ul>
       </div>
         
    </li>`)
 }

// method to delete the  post 
 let deletePost = function(deleteLink){
   
    $(deleteLink).click(function(e){
       console.log("running ")  
        e.preventDefault(); 
        $.ajax({
            type: "get", 
            url: $(deleteLink).prop("href"),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove() // remove from dom from database we have already removed in postController 
                new Noty({
                    theme: 'relax',
                    text: "Post Del",
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
 


  // handle likes 
  let handleLike = function(link){
   
    $(link).click(function(e){
     e.preventDefault(); 
    
    $.ajax({
     type: "get", 
     url: $(link).prop("href"),
     success: function(data){
         let count= parseInt( $(link).attr("data-likes")); 
         
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
   // method to loop over all posts and add delete function to them 
    let loopover = function(){
        let list = document.querySelector(".ListOfPosts"); 
    
        $('#posts-list-container>ul>li')
        let items = list.getElementsByTagName('li'); 
        for(let i =0; i<items.length; i++){
            //console.log(items[i]); 
        let link = items[i].getElementsByClassName("delete-post-button"); 
        let likeLink = items[i].getElementsByClassName("toggle-like-button"); 
        deletePost(link); 
        handleLike(likeLink); 

     
   }

        
    }
    createPost(); 
  loopover(); 
   

 

  

  


 




   
