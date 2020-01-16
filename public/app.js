
$(document).ready(() => {
    
    
    $(".notes-btn").on("click", (event) => {
        event.preventDefault();
        let $btn = event.target;
        let $id = $($btn).data("id");
        alert($id);
        //change the value with the id that we got in the previous step
        $(".modal-post-btn").attr("data-id", $id);


        
        $(".notes-output").empty();

       
        $.get("/notes"+ $id, (data, status) => {
            
            data.comments.forEach(comment => {
                let $newElement = $("<p>").html(comment.comment);
                $(".notes-output").append($newElement);
            });
        });
    });

    
    $(".modal-post-btn").on("click", (event) => {
        event.preventDefault();

        let $comment = $("#comment-input").val().trim();
        let $id = $(".modal-post-btn").data("id");

        let commentInput = ($comment !== "")? $comment : "I love The Daily Bugle!"

        let commentData = {id: $id, comment: commentInput};

   
        $.post({ url: "/comment", data: commentData });

    
        $("#comment-input").val("");
    });

    $(".save-btn").on("click", event => {
        event.preventDefault();
        let $btn = event.target;

        let $id = $($btn).data("id");
        let saveData = {id: $id};

        
        $.ajax({ url: "/save" + $id, type: 'PUT', data: saveData });

      
        $($btn).addClass("btn-success");
        $($btn).removeClass("btn-outline-success");
        $($btn).html("Saved");
    });

    $(".remove-btn").on("click", event => {
        event.preventDefault();
        let $btn = event.target;

        let $id = $($btn).data("id");
        let saveData = {id: $id};

        $.ajax({ url: "/remove" + $id, type: 'PUT', data: saveData });

        $(`.${$id}`).remove();
    });

});