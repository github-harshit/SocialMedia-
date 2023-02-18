
//method to  submit the form data through ajax
/*let createPost = function(){
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
           
            deletePost($(" .delete-post-button", newPost))
         
           
            }, 
            error : function(err){
                console.log(err.responseText)
            }
        })
    })
}
// method to display post in dom 
 let newPostDom =  function(post){
   
    return $(`<li id="post-${post._id}">
               
    ${post.content}
   =>
 <small>${post.user.name}</small>
 
   

     <small>
      <a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a>"  
    </small>

 



       <div class="commentContainer">

     
        <form action="/comments/create" method="post">
             <input type="text" name="content" id="content" placeholder="Add your comment">
            
             <input type="hidden" name="post" id="post" value=" ${post._id}">
              <input type="submit" value="Add Comment">

         </form>

      
        </div>
       <div class="showComments">
        <ul id="comment-${post._id}">
           
        </ul>
       </div>
         
    </li>`)
 }
 // method to delete the  post 
 let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault(); 
        $.ajax({
            type: "get", 
            url: $(deleteLink).prop("href"),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove() // remove from dom from database we have already removed in postController 
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
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
 
 // method to loop over all posts and add delete function to them 
  let list = document.querySelector(".ListOfPosts"); 
  let items = list.getElementsByTagName('li'); 
  for(let i =0; i<items.length; i++){
    let link = items[i].getElementsByClassName("delete-post-button"); 
    deletePost(link); 
  }
  


 
 createPost(); 
*/


   
