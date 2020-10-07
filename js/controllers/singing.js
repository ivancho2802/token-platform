$("#singing").submit(function(event){
	event.preventDefault(); //prevent default action 
	var post_url = $(this).attr("action"); //get form action url
	var request_method = $(this).attr("method"); //get form GET/POST method
	var form_data = $(this).serializeArray(); //Encode form elements for submission
	
	var body = {
		username: form_data[0].value,
		password: form_data[1].value,
    tokenPush: 'localStorage.getItem("tokenPush")',
		platform: 'web',
		role: 8
	}
	
	$.ajax({
		url : 'https://barter-token.herokuapp.com/api/sigin',
		type: request_method,
		data : JSON.stringify(body),
   	contentType: "application/json; charset=utf-8" 
	}).done(function(response){
		console.log("response")
		console.log(response)
		setCookie("userData",JSON.stringify(response.userData),2)
		setCookie("menuData",JSON.stringify(response.menuData),2)
    	// this.appComponent.suscribeSocket(resp.userData._id)
		location.href ="./bt-admin/index.php";
		$("#server-results").html(JSON.parse(response.responseText).msg);
	})
	.error(function(err){
		console.log($('#myModal'))
		console.log(document.getElemetById("myModal"))

		$('#myModal').modal('show')

		$('#alert').addClass('show')
		if(err.responseText && JSON.parse(err.responseText))
			$("#server-errors").html(JSON.parse(err.responseText).msg);
		else
			$("#server-errors").html('Error, especifica usuario y contraseña');
	});
});