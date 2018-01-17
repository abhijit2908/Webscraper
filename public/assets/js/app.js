$(function(){

$('body').on("click","#scrape",function(event){


			$.ajax("/scrape", {

			type:"GET"
			// data:articleObject

		}).then(
			function(){
				console.log("front end scrape button");
		// $.ajax("/articles", {

		// 	type:"GET",
		// 	data:articleObj

		// }).then(function(){
		// 	console.log("article Scraped")
		// })

		})

				//console.log("created new burger");
				//location.reload();
			});

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
	location.reload();
})
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
	location.reload()

})
})


});





