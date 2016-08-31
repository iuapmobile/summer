$(document).on("click", ".um-tabbar li,.um-footerbar-item",function(){
	$(this).addClass("active").siblings().removeClass("active");
})