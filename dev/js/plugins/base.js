/*
 * Summer UI JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 3.0.0.20160823.2047
 */ 
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
	
	$(document).on("touchmove", ".overlay", function(e) {
		e.preventDefault();
		return false;
	})
	
});
/*window.addEventListener('load', function() {
	setTimeout(function() {
		window.scrollTo(0, 1);
	}, 20);
});*/