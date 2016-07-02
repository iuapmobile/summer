
/*20160702---*/
var UM = UM || {};
UM.UI = UM.UI || {};

UM.UI.eventType = UM.UI.eventType || {
	down: "mousedown",
	move: "mousemove",
	up: "mouseup"
};
UM.UI.isMobile = false;// 判断是否是移动可触摸设备

if ("ontouchstart" in document) {
	UM.UI.eventType = {
		down: "touchstart",
		move: "touchmove",
		up: "touchend"
	};
	UM.UI.isMobile = true;
}

$(function() {
	// 远程调试 
	/*(function(e) {
		e.setAttribute("src", "http://10.2.112.94:8080/target/target-script-min.js#anonymous");
		document.getElementsByTagName("body")[0].appendChild(e);
	})(document.createElement("script"));
	*/
	//解决ios上无激活状态的问题
	document.body.addEventListener('touchstart', function() {});

	//消除点击click延迟
	//FastClick.attach(document.body);
	
	$(document).on("click", ".um-list-left-icon", function(e) {
		e.stopPropagation();
	}).on("touchmove", ".overlay", function(e) {
		e.preventDefault();
		return false;
	}).on("click", ".um-tabbar li,.um-footerbar-item",function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	// 多行文本自适应高度
	$("textarea.form-control").elastic();

	if(UM.UI.isMobile) {
		// 解决IOS和低端安卓设备 checkbox和radio bug
		$("label").on("change", function(e){
			$(this).addClass("um-label-change").siblings("label").addClass("um-label-change");
			setTimeout(function(){
				$(this).removeClass("um-label-change").siblings("label").removeClass("um-label-change");
			}.bind(this), 100);
		})
	}
	
});
/*window.addEventListener('load', function() {
	setTimeout(function() {
		window.scrollTo(0, 1);
	}, 20);
});*/