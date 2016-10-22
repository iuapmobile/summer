var arr = [
	{
		"label" : "食物",
		"img" : "img/mt_food.png",
		"url" : ""
	}
];

function APPManager(pid,options){

	this.id = pid;
	this.options = options = ( options || {} );
	this.arr = options.data || arr;
	this.colum = options.colum || 4;
	this.init();
}
APPManager.prototype = {
	init : function(){
		//var sortableTxt = doT.template($("#sortableTemp").text());
		this.create();
		this.setCss();
	},
	create : function(){
		var sortableTxtL = "<ul class='clearfix' id='um-sortable'>";
		var sortableTxtR = "</ul>";
		var lis = "";
		var data = this.arr;
		for (var i = 0; i < data.length; i++){
			lis += "<li class='small'><a class='um-circle um-black'><img src='"+data[i].img+"' width=40 /><div class='f12 mt5'>"+data[i].label+"</div></a><a class='delete'></a></li>"
		}
		var sortableTemp = sortableTxtL + lis + sortableTxtR;
		$(this.id).append(sortableTemp);
		this.runn();
		this.close();
		this.remove();
	},
	runn : function(){
		var el = document.getElementById("um-sortable");
		Sortable.create(el);
	},
	close : function(){
		$(document).on("click",function(){
			$(".small").removeClass("dragli");
		});
	},
	remove : function(){
		$(".delete").on("touchstart",function(){
			$(this).parent().remove();
		});
	},
	setCss : function(){
		var w = $(this.id).width() / this.colum;
		$(".small").css("width",w);
	}
}