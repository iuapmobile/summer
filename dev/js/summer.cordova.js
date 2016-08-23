/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com go
 * Version: 3.0.0.20160823.1554
 */
;(function(w){
    w.$summer = {};
    w.summer = {};
    w.api = w.summer;
    (function(){
    	var url = document.location.pathname.split("www")[0]+"www/cordova.js";
        _script = document.createElement('script');
        _script.id = "cordova_js";
        _script.type = 'text/javascript';
        _script.charset = 'utf-8';
        _script.async = true;
        _script.src = url;
        _script.onload = function (e) {
            w.$summer["cordova"] = w.cordova;
            w.summer["cordova"] = w.cordova;

            document.addEventListener('deviceready', function(){
                //1、先通过cdv来获取页面参数
                summer.winParam(function(ret){
					//希望返回
					var ctx = {
						systemType:"android",//"ios"
						systemVersion:7,// ios--> 7    android-->21
						iOS7StatusBarAppearance:true,//false
						fullScreen:true,
						pageParam:{param0:123,param1:"abc"},
						screenWidth:"",
						screenHeight:"",
						
						winId:"",
						winWidth:"",
						winHeight:"",
						
						frameId:"",
						frameWidth:"",
						frameHeight:"",
						
						appParam:"",
					}
                    //alert(typeof ret)// --> object

                    if(typeof ret == "string"){
                        ret = $summer.strToJson(ret);

                    }
                    //alert($summer.jsonToStr(ret));
                    summer['pageParam'] = ret;//原生数据都放在summer对象上
                    //alert($summer.jsonToStr(summer.pageParam));

                    if(typeof summerready == "function")
                        summerready();
                    if(typeof summerReady == "function")
                        summerReady();  

                });         
            }, false);

        };
        if(navigator.platform.toLowerCase().indexOf("win")<0){
        	try{
//            document.currentScript.parentNode.insertBefore(_script, document.currentScript);
	            fs = document.getElementsByTagName('script')[0];
	            fs.parentNode.insertBefore(_script, fs);
        	}catch(e){
        		console.log(e)
        	}
        }else{
        	
        }
    })();
    
    if(navigator.platform.toLowerCase().indexOf("win")>-1){
    	//alert("DOMContentLoaded")
    	document.addEventListener('DOMContentLoaded',function(){
    		if(typeof summerready == "function")
                summerready();
            if(typeof summerReady == "function")
                summerReady();  
    	},false);
    }
    
    w.summer.require = function(mdlName){
        if(window.$summer["cordova"] != window.cordova){
           alert("---------warnning : init cordova is too late!")
           window.$summer["cordova"] = window.cordova;
           window.summer["cordova"] = window.cordova;
        }
        if(mdlName == "cordova"){
           return window.summer["cordova"];
        }else{
           return window.summer["cordova"].require(mdlName);
        }
	};
	w.summer.canrequire = function(){
        if(navigator.platform.toLowerCase().indexOf("win")>-1){
			return false;
		}
		return true;
	};
   
   w.$summer.require = w.summer.require;
})(window);
