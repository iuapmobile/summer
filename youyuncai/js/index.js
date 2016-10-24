 /*底部导航栏与4个内容区域切换*/
	$('.um-footerbar>a').click(function(){
		 	$(this).addClass('active').siblings('.active').removeClass('active');
			var tar=$(this).attr('data-tar');
			$(tar).addClass('active').siblings('.active').removeClass('active');	
	});	
 //创建标签	  
    workbench.createComponent("um-header", {placeholder:"iuapmobile 3.0"});
	workbench.createComponent("um-banner", {
		data: [
			{content: "./img/g1.jpg"}, 
			{content: "./img/g2.jpg"}, 
			{content: "./img/g3.jpg"}
		]
    });
    /*
    var j = {"deviceid":"FBC0BE3F-E2AE-4B7C-B060-777A4C8E5B6E","os":"web","userid":"caoqi"};
	var s = $summer.jsonToStr(j);
	var param = {data: s};
	$.get("http://172.20.7.98:8080/mobem/app/getapplist",param,function(data){
		
		//alert(data);
		var d = ($summer.strToJson(data)).data.apps;
		
		for (var i =0;i<d.length;i++){
			d[i].img = d[i].webiconurl;
			d[i].label = d[i].title;
			d[i].url = d[i].weburl;
		}
		workbench.createComponent("um-APPManager",{
			el:"#mycomponents2",
			data:d,
			colum:4
		});
	});*/
	workbench.createComponent("um-APPManager",{
		el:"#uappmanager",
		data:[{
			"label" : "询报价",
			"img" : "img/xbj.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		},
		{
			"label" : "招投标",
			"img" : "img/ztb.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		},
		{
			"label" : "超市",
			"img" : "img/cs.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		},
		{
			"label" : "在线竞价",
			"img" : "img/jj.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		},
		{
			"label" : "供应商准入",
			"img" : "img/zr.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		},
		{
			"label" : "收获",
			"img" : "img/sh.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		},
		{
			"label" : "对账",
			"img" : "img/dz.png",
			"url" : "http://uapma.yonyou.com:8443/weixin/summerShow_web/index.html"
		}],
		colum : 4
	});
	workbench.createComponent("um-footer", {
		data: [{title:"消息", iconfont:"ti-comments"},
			{title:"日程q", iconfont:"ti-notepad"},
			{title:"通讯录", iconfont:"ti-agenda"},
			{title:"设置", iconfont:"ti-user"}
		]}
	);
	workbench.createComponent("um-footer-custom", {
		data: [{title:"首页", iconfont:"icon-home",target:'#home' },
			{title:"消息", iconfont:"icon-msg",target:'#message' },
			{title:"商品", iconfont:"icon-goods",target:'#goods'},
			{title:"我的", iconfont:"icon-mine",target:'#mine'}
		]}
	);
	workbench.createComponent("um-applayout", {
		data: [{title:"美食", img:"./img/mt_food.png"},
			{title:"电影", img:"./img/mt_mv.png"},
			{title:"酒店", img:"./img/mt_hotal.png"},
			{title:"KTV", img:"./img/mt_ktv.png"}
		]}
	);
	workbench.createComponent("um-layout-text", {
		data: [{title:"待定标", text:"12"},
			{title:"待收货", text:"3"},
			{title:"待确认对账", text:"3"},
			{title:"待发布", text:"5"},
			{title:"待审批", text:"1"}
			 
		]}
	);
	workbench.createComponent("um-message", {
		data: [{
        			"sender" : "询报价",
        			"img" : "./img/org1.png",
        			"msgNum" : 3,
        			"lastMsg" : "收到2份#关于“毕节吧电脑采购询价”",
        			 
        		},{
        			"sender" : "订单",
        			"img" : "./img/org2.png",
        			"msgNum" : '',
        			"lastMsg" : "您的订单已经安排发货",
        		 
        		},{
        			"sender" : "对账",
        			"img" : "./img/org3.png",
        			"msgNum" : '2',
        			"lastMsg" : "金立集团发来一封对账单",
        		 
        		},{
        			"sender" : "公告",
        			"img" : "./img/org4.png",
        			"msgNum" : '',
        			"lastMsg" : "系统维护通知",     		 
        		}        
		]}
	);
	/*
	workbench.createComponent("um-APPManager", {
				data : [{label:"审批",icon:'ss.png'},{label:"新闻",icon:'xw.png'}],
				colum: "4"
	});
*/
new Vue({
	  	el: '#body0',
	  	data: {
	    	info: 'Hello iuap mobile!',
	  	  	todos:[{text:"aa"},{text:"bb"},{text:"cc"},{text:"dd"}]
	  	},
	  	methods: {
   	 		add: function () {
      			this.info +=' new';
      			this.todos.push({text: (new Date()).toLocaleString()}); 
    		},
    		remove: function () {
      			this.info = this.info.substring(0,this.info.length-4) ;
      			this.todos.pop(); 
    		},
    		removeTodo: function (index) {
      			this.todos.splice(index, 1)
    		}
  		},
  		created: function () {
		    // `this` 指向 vm 实例
		   // console.log('created is: ' + this.info)
		},
		beforeCompile: function () {
		    // `this` 指向 vm 实例
		   // console.log('beforeCompile is: ' + this.info)
		},
		compiled: function () {
		    // `this` 指向 vm 实例
		    //console.log('compiled is: ' + this.info)
		},ready: function () {
		    // `this` 指向 vm 实例
		   // console.log('ready is: ' + this.info)
		},beforeDestroy: function () {
		    // `this` 指向 vm 实例
		   // console.log('beforeDestroy is: ' + this.info)
		},destroy: function () {
		    // `this` 指向 vm 实例
		   // console.log('destroy is: ' + this.info)
		}
	})
 

 