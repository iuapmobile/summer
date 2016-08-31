// 解决IOS和低端安卓设备 checkbox和radio bug
$("label").on("change", function(e){
	$(this).addClass("um-label-change").siblings("label").addClass("um-label-change");
	setTimeout(function(){
		$(this).removeClass("um-label-change").siblings("label").removeClass("um-label-change");
	}.bind(this), 100);
})