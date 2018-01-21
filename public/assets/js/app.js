$(function(){

//saving Articles

$('body').on("click",".save",function(event){

	var articleId = $(this).attr("data-id");
	
	$.ajax("/articles/" + articleId, {

			type:"POST",

			data: {
				"saved":true
			}
}).then(function(saved) {
})
location.reload();
})


//Unsaving Articles

$('body').on("click",".delete",function(event){

	var articleId = $(this).attr("data-id");
	
	$.ajax("/articles/" + articleId, {

			type:"POST",
			data: {
				"saved":false
			}
}).then(function(saved) {
})
location.reload();
})


//Deleting notes for article

$('body').on('click', ".toDelete", function(){

		var notesId = $(this).attr('data-id');


		$.ajax("/notes/" + notesId,{

			method: "POST"
		}).then(function(data){
		
		});

		location.reload();



	})



//Submitting notes for articles

$('body').on("click","#submitNote",function(event){
	event.preventDefault();
	
	var noteId = $(this).attr("data-id")
	var note = $('#articleNote'+noteId).val();
	
	$.ajax("/createnotes/" + noteId, {

			type:"POST",

			data: {
				"body":note

			}



}).done(function(saved) {


})
location.reload()
})


});



// Emptying notes text area after closing

function emptyContent(){


	$("#articleNote").val("");
}



