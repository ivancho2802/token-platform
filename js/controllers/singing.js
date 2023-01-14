const ipserver = "http://34.95.174.1:80"
//const ipserver = "http://api.tokenplataforma.com:3001"
const ipserverapi = `${ipserver}/api`


$("#singing").submit(function(event){
	event.preventDefault(); //prevent default action 
	//var post_url = $(this).attr("action"); //get form action url
	let request_method = $(this).attr("method"); //get form GET/POST method
	let form_data = $(this).serializeArray(); //Encode form elements for submission
	
	let body = {
		username: form_data[0].value,
		password: form_data[1].value,
    	tokenPush: 'localStorage.getItem("tokenPush")',
		platform: 'web',
		role: 8
	}
	console.log(body)
	
	$.ajax({
		url : `${ipserverapi}/sigin`,
		type: request_method,
		data : JSON.stringify(body),
   		contentType: "application/json; charset=utf-8" 
	}).done(function(response){
		console.log("response")
		console.log(response)
        console.log("------------------------------")

		$.cookie('TOKEN', response.id );
		$.cookie('userData',JSON.stringify(response.userData));
		$.cookie('menuData',JSON.stringify(response.menuData));
		$.cookie('business',JSON.stringify(response.business));
		// setCookie("userData",JSON.stringify(response.userData),2)
		// setCookie("menuData",JSON.stringify(response.menuData),2)
    	// this.appComponent.suscribeSocket(resp.userData._id)
		$("#server-results").html(response.msg);
		location.href ="./bt-admin/index.html";
	})
	.error(function(err){
		console.log(err)
		$('#alert').addClass('show')
		if(err.responseText && JSON.parse(err.responseText))
			$("#server-errors").html(i18n(JSON.parse(err.responseText).msg));
		else
			$("#server-errors").html('Error, especifica usuario y contraseña');

		
		//console.log($('#myModal'))
		//console.log(document.getElementById("myModal"))

		//$('#myModal').modal('show')
	});
});