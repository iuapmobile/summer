function $pageReady() {
	$("#table-nav li").click(function(){
		var index = $(this).index();
		var contentH = window.innerHeight - 78 -100;
		$(this).addClass("active").siblings().removeClass("active");
		$(".um-table-container").eq(index).height(contentH)
		.find(".um-tb-data").height(contentH - 60).end()
		.siblings(".table-row-scroll").height(0);
	})
	$("#table-nav li").eq(0).trigger("click");
}