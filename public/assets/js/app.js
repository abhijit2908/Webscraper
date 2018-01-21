$(function(){

// $('body').on("click","#scrape",function(event){


// 			$.ajax("/scrape", {

// 			type:"POST"
// 			// data:articleObject

// 		}).then(function(){
// 				console.log("front end scrape button");
					

// 				//console.log("created new burger");
				
// 			});
// 		$.ajax("/articles", {

// 							type:"GET",
// 		//data:articleObj

// 		 					}).then(function(){
// 		// 	console.log("article Scraped")
// 		// })

// 											});

// 		location.reload();
// })		

$('body').on("click",".save",function(event){

	var articleId = $(this).attr("data-id");
	
	$.ajax("/articles/" + articleId, {

			type:"POST",
			//url: "/articles/" + articleId,
			data: {
				"saved":true
				//articleId : articleId
			}

	//console.log(data);
}).then(function(saved) {
	//console.log(saved);
	// location.reload();
})
location.reload();
})

$('body').on("click",".delete",function(event){

	var articleId = $(this).attr("data-id");
	
	$.ajax("/articles/" + articleId, {

			type:"POST",
			//url: "/articles/" + articleId,
			data: {
				"saved":false
				//articleId : articleId
			}

	//console.log(data);


}).then(function(saved) {
	//console.log(saved);
	//location.reload()

})
location.reload();
})



$('body').on('click', ".toDelete", function(){

		var notesId = $(this).attr('data-id');
		console.log(notesId)

		$.ajax("/notes/" + notesId,{

			method: "POST"
		}).then(function(data){
			console.log(data);
		});

		location.reload();



	})




$('body').on("click","#submitNote",function(event){
	//$(element).attr('data-id')
	event.preventDefault();
	
	var noteId = $(this).attr("data-id")
	//console.log(noteId)
	//console.log(articleId);
	var note = $('#articleNote'+noteId).val();
	
	$.ajax("/createnotes/" + noteId, {

			type:"POST",
			//url: "/articles/" + articleId,
			data: {
				"body":note
				//articleId : articleId
			}

	//console.log(data)


}).done(function(saved) {
	//console.log(saved);
	//location.reload()
	//$("#articleNote").empty();
	 //$('.modal-header .close').click();

})
//location.reload()
})


});

function emptyContent(){


	$("#articleNote").val("");
}



