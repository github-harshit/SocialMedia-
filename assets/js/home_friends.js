$("#myFriend").click(function(e){
    e.preventDefault()
    $.ajax({
        type: "get", 
        url : $("#myFriend").prop("href"), 
        success: function(data){
           let f =  $(`<p> 
               <a href="/users/profile/<%${data.data.friend.to_user}%>" >${data.data.toUser} </a>
            </p>`)

            console.log(f); 
            console.log(data.data.friend.to_user); 
             $('.friends>ul').prepend(f); 
        }, 
        error : function(err){
            console.log(err); 
        }
    })
})