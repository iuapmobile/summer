function login(){
	var aa= $('.user').val()
	if($('.user').val()==""||$(".pass").val()==""){
		alert("请输入正确的用户名和密码");
		return false;
	}
	
	var Obj={
		"username":$('.user').val(),
		"password":$(".pass").val()

	};
	ajaxRequest("GxhqApp/Login", "get",  Obj, function(data){
		// alert($summer.jsonToStr(data));
	
			summer.openWin({
				id:'main-head',
				url:'html/main-head.html'
			});			
		localStorage.newdata=data;// 缓存数据	
	
	
	});	
}


