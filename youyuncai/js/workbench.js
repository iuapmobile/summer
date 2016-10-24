var workbench = {

	init : function(){
	
	},
	createComponent : function(type, settings){
		if(type == 'um-header'){
			// 定义
			var header = Vue.extend({
				template:'<div class="um-header-fixed">'
    						+'<a class="fl um-scan">'
    						+'<img src="img/scan.png" alt="" />'
    						+'<div class="f12">扫一扫</div>'
    						+'</a>'
           					+' <div class="um-input-group">'
	         				+'<span class="t-search"></span>'
	         				+'<input type="search" class="form-control" placeholder="{{aa}}">'
	         				+'<span class="t-camera"></span>'
           				    +'</div>'
    						+'</div>',
				data: function(){
					return {
						aa : settings.placeholder					
					}
				}
			});
			// 注册
			Vue.component('um-header', header);
		}else if (type == "um-banner"){
			var islider = new iSlider({
    			type: 'pic',
    			data: settings.data,
    			dom: document.getElementById("iSlider-wrapper"),
    			isLooping: true,
    			animateType: 'default',
    			isAutoplay: true,
    			animateTime: 800
    		});
    		islider.addDot();
		}else if(type == 'um-APPManager'){
			var v = new APPManager(settings.el,settings);
		}else if(type == "um-footer"){
		    // 定义
			var footer = Vue.extend({
			  template: '<div class="um-footer">'
						+'<div class="um-tabbar-foot">'
							+'<a id="item0" href="#" class="um-footerbar-item">'
								+'<i class="' + settings.data[0].iconfont + ' f20"></i>'
								+'<div class="um-tabbar-item-text">{{first}}</div>'
							+'</a>'
							+'<a id="item1" href="#" class="um-footerbar-item"> '
								+'<i class="' + settings.data[1].iconfont + '  f20"></i>'
								+'<div class="um-tabbar-item-text">{{second}}</div> '
							+'</a>'
							+'<a id="item2" href="#" class="um-footerbar-item active">'
								+'<i class="' + settings.data[2].iconfont + '  f20"></i>'
								+'<div class="um-tabbar-item-text">{{third}}</div>'
							+'</a>'
							+'<a id="item3" href="#" class="um-footerbar-item">'
								+'<i class="' + settings.data[3].iconfont + '  f20"></i>'
								+'<div class="um-tabbar-item-text">{{forth}}</div>'
							+'</a>'
						+'</div>'
					+'</div>',
				data : function(){
					return {
						first: settings.data[0].title,
						second: settings.data[1].title,
						third: settings.data[2].title,
						forth: settings.data[3].title
					}
				}
			});
			// 注册
			Vue.component('um-footer', footer);
		}else if(type == "um-footer-custom"){
		    // 定义
			var footerCustom = Vue.extend({
			  template: '<div class="um-footer">'
                    +'<div class="um-footerbar">'
                        +'<a href="#" class="um-footerbar-item active" data-tar="' + settings.data[0].target + '">'
                            +'<div class="' + settings.data[0].iconfont + ' mb5"></div>'
                            +'<div class="f12 lh1">{{first}}</div>'
                        +'</a>'
                        +'<a href="#" class="um-footerbar-item" data-tar="' + settings.data[1].target + '">'
                            +'<div class="' + settings.data[1].iconfont + ' mb5"></div>'
                            +'<div class="f12 lh1">{{second}}</div>'
                        +'</a>'
                        +'<a href="#" class="um-footerbar-item" data-tar="' + settings.data[2].target + '">'
                            +'<div class="' + settings.data[2].iconfont + ' mb5"></div>'
                            +'<div class="f12 lh1">{{third}}</div>'
                        +'</a>'
                        +'<a href="#" class="um-footerbar-item" data-tar="' + settings.data[3].target + '">'
                            +'<div class="' + settings.data[3].iconfont + ' mb5"></div>'
                            +'<div class="f12 lh1">{{forth}}</div>'
                        +'</a>'
                    +'</div>'
                +'</div>',
				data : function(){
					return {
						first: settings.data[0].title,
						second: settings.data[1].title,
						third: settings.data[2].title,
						forth: settings.data[3].title
					}
				}
			});
			// 注册
			Vue.component('um-footer-custom', footerCustom);
		}else if(type=='um-applayout'){
			var AppLayout = Vue.extend({
				template: '<div class="um-grid">'
							+'<div class="um-grid-row tc">'
								 +'<div >'
									+'<a href="#" class="um-circle um-black">'
										+'<img src="'+settings.data[0].img+'" width=40 class="um-img-responsive" alt="">'
										+'<div class="f12 mt5">{{one}}</div>'
									+'</a>'
								+'</div>' 
								+'<div>'
									+'<a href="#" class="um-circle um-black">'
										+'<img src="'+settings.data[1].img+'" width=40 class="um-img-responsive" alt="">'
										+'<div  class="f12 mt5">{{two}}</div>'
									+'</a>'
								+'</div>'
								+'<div>'
									+'<a href="#" class="um-circle um-black">'
										+'<img src="'+settings.data[2].img+'" width=40 class="um-img-responsive" alt="">'
										+'<div  class="f12 mt5">{{three}}</div>'
									+'</a>'
								+'</div>'
								+'<div>'
									+'<a href="#" class="um-circle um-black">'
										+'<img src="'+settings.data[3].img+'" width=40 class="um-img-responsive" alt="">'
										+'<div  class="f12 mt5">{{four}}</div>'
									+'</a>'
								+'</div>'
							+'</div>'							 
                       +'</div>',
				data: function(){
			  		return{
			    		 one:settings.data[0].title,
						 two:settings.data[1].title,
						 three:settings.data[2].title,
						 four:settings.data[3].title,
			  		}
			  	}
			});
			// 注册
			Vue.component('um-applayout',AppLayout);
		}else if(type=='um-layout-text'){
			var AppText = Vue.extend({
				template: '<div class="um-grid">'
							+'<div class="um-grid-row tc">'
								 +'<div >'
									+'<a href="#" class=" ">'
										+'<div class="title">'+settings.data[0].text+'</div>'
										+'<div class="f12 mt5">{{one}}</div>'
									+'</a>'
								+'</div>' 
								+'<div>'
									+'<a href="#" class="  ">'
										+'<div class="title">'+settings.data[1].text+'</div>'
										+'<div  class="f12 mt5">{{two}}</div>'
									+'</a>'
								+'</div>'
								+'<div>'
									+'<a href="#" class="  ">'
										+'<div class="title">'+settings.data[2].text+'</div>'
										+'<div  class="f12 mt5">{{three}}</div>'
									+'</a>'
								+'</div>'
								+'<div>'
									+'<a href="#" class="  ">'
										+'<div class="title">'+settings.data[3].text+'</div>'
										+'<div  class="f12 mt5">{{four}}</div>'
									+'</a>'
								+'</div>'
							+'</div>'	
							+'<div class="um-grid-row tc">'
								 +'<div >'
									+'<a href="#" class="   ">'
										+'<div class="title">'+settings.data[4].text+'</div>'
										+'<div class="f12 mt5">{{five}}</div>'
									+'</a>'
								+'</div>' 
								+'<div class="addphoto"  >'
									+'<a href="#" class=" ">'
										+'<img src="img/add.png"/ width=20>'
									+'</a>'
								+'</div>'
								+'<div >'
									+'<a href="#" class="   ">'
										+'<div class="title"></div>'
										+'<div class="f12 mt5"></div>'
									+'</a>'
								+'</div>' 
								+'<div >'
									+'<a href="#" class="   ">'
										+'<div class="title"></div>'
										+'<div class="f12 mt5"></div>'
									+'</a>'
								+'</div>' 
							+'</div>'									 
                       +'</div>',
				data: function(){
			  		return{
			    		 one:settings.data[0].title,
						 two:settings.data[1].title,
						 three:settings.data[2].title,
						 four:settings.data[3].title,
						 five:settings.data[4].title
			  		}
			  	}
			});
			// 注册
			Vue.component('um-layout-text',AppText);
		}else if(type=='um-message'){
			var Appmessage = Vue.extend({
				template: '<div class="um-listview-wrap" id="listview">'
                     	+'<ul class="um-list um-no-active"  >'
                     		+'<li class="um-listview-row" v-for="list in lists">'
                     			+'<a href="#" class="um-list-item um-swipe-action um-no-icon">'
                     				+'<div class="um-swipe-btns">'
                     					+'<span class="um-swipe-btn um-delete">删除</span>'
                     				+'</div>'
                     				+'<div class="um-list-item-media msg-info">'
                     					+'<img  v-bind:src="list.img" width=50>'
                     					+'<span class="um-badge">{{list.msgNum}}</span>'
                     				+'</div>'
                     				+'<div class="um-list-item-inner ml5">'
                     					+'<div class="um-list-item-body">'
                     						+'<h4 class="um-media-heading fb f16 um-text-overflow tl" >{{list.sender}}</h4>'
                     						+'<p class="um-gray f14 um-text-overflow tl">{{list.lastMsg}}</p>'
                     					+'</div>'
                     				+'</div>' 
                     			+'</a>'
                     		+'</li>'
                     	+'</ul>'
                    +'</div>',
				data: function(){
			  		return {lists:settings.data}
			  	}
			});
			// 注册
			Vue.component('um-message',Appmessage);
		}
	}
	
}