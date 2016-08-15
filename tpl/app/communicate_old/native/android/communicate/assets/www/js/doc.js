$.fn.animatescroll=function(options){var opts=$.extend({},$.fn.animatescroll.defaults,options);if(opts.element=="html,body"){var offset=this.offset().top;$(opts.element).stop().animate({scrollTop:offset-opts.padding},opts.scrollSpeed,opts.easing)}else{$(opts.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-opts.padding},opts.scrollSpeed,opts.easing)}};$.fn.animatescroll.defaults={easing:"swing",scrollSpeed:800,padding:0,element:"html,body"};$.waitTime=function(time){return $.Deferred(function(dfd){setTimeout(dfd.resolve,time)})};
		$(function(){
			var dropmenu = $("#dropmenu");
			var dh = dropmenu.height(),
				 wh =  $(window).height() - 20; 
				 dropmenu.css({"height":wh});
			$("a[href^=#]").on("click", function (e) {
                var target = $(this).attr("href");
                e.stopPropagation();
                e.preventDefault();
                if(target.length > 1 && target!="javascript:;") {
                	$(target).animatescroll({scrollSpeed: 1000,padding:65});
            		
            		if($("#nav").width() / $(window).width() >0.25) {
                		$("#nav").css("bottom","auto");
                		dropmenu.slideUp("fast");
                		isMax = 1;
                	}
                }
                return false;
            });
            $(".loading").css("background","transparent").delay(800).fadeOut("slow");
			
            //document.body.addEventListener('contextmenu', function (e) {e.preventDefault();return false;});
			$(".um-list-swipe-btn").on("click",function(){
			  var parent_li = $(this).closest("li");
			  parent_li.slideUp("fast");
			  setTimeout(function(){
			    parent_li.remove();
			  },500)
			})
            document.body.addEventListener('touchstart', function () {});
		})