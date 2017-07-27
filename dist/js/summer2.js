/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 0.3.0.20170419.1411
 */
 (function(global, factory){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(window,function(window,noGlobal){
    var $s = {};
    var s = {$:$s};
    if ( typeof define === "function" && define.amd ) {
        define( "summer", [], function() {
            return s;
        });
    }
    window.$summer = $s;
    window.summer = s;
    return s;
}));


;(function(window){
    var u = window.$summer || {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    u.os = (function(env){
        var browser={
            info:function(){
                var ua = navigator.userAgent, app = navigator.appVersion;
                return { 
                    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: ua.indexOf('iPad') > -1, //是否iPad
					platform: navigator.platform
                };
            }(),
            lang:(navigator.browserLanguage || navigator.language).toLowerCase()
        };
		if(browser.info.platform.toLowerCase().indexOf("win")>= 0 || browser.info.platform.toLowerCase().indexOf("mac")>= 0){
		    return "pc";
		}else if(browser.info.android){
            return "android";
        }else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
            return "ios";
        }else{
			return "";
		}
    })(u);
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }else{
            console.log("$summer.strToJson's parameter is not a string, it's typeof is " + typeof str);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }else{
			console.log("$summer.jsonToStr's parameter is not a json, it's typeof is " + typeof json);
		}
    };
    u.UUID = function(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uid = '';
        while(len--){
            uid += seed[Math.round(Math.random()*seedLen)];
        }
        return uid;
    };
    u.isJSONObject = function (obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	};
	u.isEmpty = function(obj){
		if(obj === undefined || obj === null || (obj.toString && obj.toString() === "")){
			return true;
		}
		return false;
	};
	u.checkIfExist = function(obj,paramNameArray,msg){
        for(var i=0,len=paramNameArray.length;i<len;i++){
            var key = paramNameArray[i];
            if(key in obj && $summer.isEmpty(obj[key])){
                var str = "参数["+paramNameArray[i]+"]不能为空";
                alert(msg ? msg + str : str);
                return false;
            }           
        }
        return true;
    };
})(window);
;(function(w){
    w.summer = w.summer || {};
    (function(){
		document.addEventListener('DOMContentLoaded',function(){
			summer.trigger("init");
			summer.pageParam = window.localStorage;
			if(typeof summerready == "function")
				summerready();
			if(typeof summerReady == "function")
				summerReady();
			summer.trigger("ready");
			summer.trigger("aftershowwin");
		},false);
    })();
	var EventMgr = function() {
        this._events = {};
    };
    EventMgr.prototype.on = function(evtName, handler) {
        if (this._events[evtName] == undefined) {
            this._events[evtName] = [];
        }
        this._events[evtName].push(handler);
    };
    EventMgr.prototype.off = function(evtName, handler) {
        var handlers = this._events[evtName];
        if (typeof handler == "undefined") {
            delete handlers;
        } else {
            var index = -1;
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handler == handlers[i]) {
                    index = i;
                    break;
                }
            }
            if (index > 0)
                handlers.remove(index);
        }
    };
    EventMgr.prototype.trigger = function(evtName, sender, args) {
        try{
            var handlers = this._events[evtName];
			if(!handlers) return;
            var handler;
            args = args || {};
            for (var i=0,len=handlers.length; i < len; i++) {
                handler = handlers[i];
                handler(sender, args);
            }
        }catch(e){
            alert(e);
        }
    };
	var _ems = new EventMgr();
	w.summer.on = function(eName, fn){
		_ems.on(eName, fn);
	};
	w.summer.trigger = function(eName){
		_ems.trigger(eName);
	};
})(window);
+function(w,s){
	s.openWin = function(json){
		return window.adrMininvoker.callSync("openWin",JSON.stringify(json));
	};
	s.closeWin = function(json){
		if(typeof json == "string"){
			json = {"id" : json};
		}else if(typeof json == "undefined"){
			json = {};
		}		
		return window.adrMininvoker.callSync("closeWin","");
	};
}(window,summer);

//summer native service v3.0.2016092011
+function(w,s){
	w.$__cbm = {};
	if(!s){
		s = {};
		w.summer = s;
	}
	//----------------------------------------------------------------------
	s.UMService = {
		//统一API，summer.callService(), supported by dsl and summer 
		call:function(serviceType, jsonArgs, isSync){
			try{
				jsonArgs = jsonArgs || {};
				var serviceparams = "";
				
				//Setp1: jsonArgs JSON Format
				if(typeof jsonArgs == "string"){
					try{
						var json = $summer.strToJson(jsonArgs);
						if(typeof json != "object"){
							alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
							return;
						}
						jsonArgs = json;
					}catch(e){
						alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
						alert(e);
						return;
					}
				}
				
				
				if(typeof jsonArgs == "object"){
					//Setp2: callback proxy
					s.UMService._callbackProxy(jsonArgs, "callback");
					
					//Setp3: error proxy
					s.UMService._callbackProxy(jsonArgs , "error");
					
					try{
						serviceparams = $summer.jsonToStr(jsonArgs);
						if(typeof serviceparams == "object"){
							//转string后仍然为json，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
							alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式" + jsonArgs);
							return;
						}
					}catch(e){
						alert("Excp4: 校验jsonArgs是否可jsonToStr时异常:" + e);
					}
					
					if(isSync){
						try{
							return adrinvoker.call2(serviceType,serviceparams);
						}catch(e){
							alert("Excp5.1: 同步调用adrinvoker.call2异常:" + e);
						}
					}else{
						try{
							return adrinvoker.call(serviceType,serviceparams);
						}catch(e){
							alert("Excp5.2: 异步调用adrinvoker.call异常:" + e);
						}
					}
				}else{
					alert("调用$service.call("+serviceType+", jsonArgs, "+isSync+")时不合法,参数jsonArgs类型为"+typeof jsonArgs);
					return;
				}

				
			}catch(e){
				var info="";
				if(isSync)
					info = "Excp601:调用$service.call(\""+serviceType+"\", jsonArgs, "+isSync+")时发生异常,请检查!";
				else
					info = "Excp602:调用$service.call(\""+serviceType+"\", jsonArgs)时发生异常,请检查!";
				console.log(info);
				alert(info+", 更多请使用chrome inspect调试查看console日志;\n错误堆栈信息e为:\n" + e);
			}
		},
		_callbackProxy : function(jsonArgs, callback_KEY){
			try{
				if(!jsonArgs[callback_KEY])
					return true;
				if(typeof(jsonArgs[callback_KEY]) == "string"){
					//callback:"mycallback()", when callback is string, it must be a global function
					var cbName = "";
					try{
						cbName = jsonArgs[callback_KEY].substring(0, jsonArgs[callback_KEY].indexOf("("));
						var cbFn = window[cbName];
						if(typeof cbFn != "function"){
							alert("Excpt2.91:" + cbName + " is not a function, and must be a global function!\nit's typeof is " + typeof cbFn);
							return false;
						}
						jsonArgs[callback_KEY] = cbFn;
					}catch(e){
						alert("Excpt2.96: callback define error!\n"+cbName+" is not a valid global function");
						return false;
					}
				}
				
				if(typeof(jsonArgs[callback_KEY]) == "function"){
					var _cbProxy = "__UMCB_" + $summer.UUID(8);
					while($__cbm[_cbProxy]){
						_cbProxy =  "__UMCB_" + $summer.UUID(8);
					}
					$__cbm[_cbProxy] = jsonArgs[callback_KEY];
					
					window[_cbProxy] = function (sender, args){
						try{
							//alert("typeof sender == " + typeof sender +"\n typeof args == " + + typeof args);
							//summer.alert(sender);
							//summer.alert(args);
							if(args == undefined){
								args = sender;//compatible
							}
							$__cbm[_cbProxy](sender, args);
						}catch(e){
							alert(e);
						}finally{ 
							return;
							//alert("del before");
							//alert(typeof $__cbm[_cbProxy]);
							//alert(typeof window[_cbProxy]);
							if(!jsonArgs["__keepCallback"]){
								delete $__cbm[_cbProxy];
								delete window[_cbProxy];
							}
							alert("del after");
							//alert(typeof $__cbm[_cbProxy]);
							//alert(typeof window[_cbProxy]);
						}
					};
					jsonArgs[callback_KEY] = _cbProxy + "()";
					return true;
				}
				return false;
			}catch(e){
				alert("Excp603: Exception in handling callback proxy:\n" + e);
				return false;
			}
		},
		openHTTPS:function(json){
			/*	参数：
			"ishttps" : "true"//是否开启https传输
			 */
			if($summer.isJSONObject(json)){
				if(!json.ishttps){
					alert("请输入true或者false");
					return;
				}
				return s.callService("UMService.openHTTPS", json, false);
			}else{
				alert("参数不是有效的JSONObject");
			}
		},
		
		writeConfig: function(key, val){
			//1、准备参数
			var args = {};
			if(arguments.length == 1 && typeof arguments[0] == "object"){
				args = key;
			}else if(arguments.length == 2){
				args[key] = val;
			}else{
				alert("writeConfig时,参数不合法");
				return;
			}
			//2、调用服务
			return s.callService("UMService.writeConfigure", args, false);
		},
		readConfig: function(name){
			//1、准备参数
			var args = {};
			if(typeof name == "string")
				args[name] = name;	
			else{
				alert("readConfig时，不支持参数[name]的参数类型为" + typeof name);
				return;
			}
			//2、调用服务
			return s.callService("UMService.readConfigure", args, false);
		},
		
		callAction : function(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
			if(arguments.length == 1 && typeof arguments[0] == "object"){
				var args = {};
				/*
				 args  = {
				 viewid:"xxx.xxx.xx",
				 action:"methodName",
				 params:{a:1,b:2},
				 //isDataCollect:true,
				 autoDataBinding:true,//请求回来会是否进行数据绑定
				 contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
				 callback:"actionid",
				 error:"errorActionId"//失败回调的ActionId
				 }
				 */
				args = controllerName;
				/*var sysParam = {
					viewid:"xxx.xxx.xx",
					action:"methodName",
					//"params" : {a:1,b:2},//自定义参数
					//isDataCollect:true,
					autoDataBinding:true,//请求回来会是否进行数据绑定
					contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
					callback:"actionid",
					error:"errorActionId"//失败回调的ActionId
				};
				for(key in args){
					if(!sysParam.hasOwnProperty(key) && typeof args[key] == "string"){
						args[key] = $summer.strToJson(args[key]);
					}
				}*/
				return s.callService("UMService.callAction", args, false);
			}else{
				var args = {};
				args["viewid"] = controllerName;
				args["action"] = actionName;
				args["params"] = params;
				args["isDataCollect"] = isDataCollect;
				args["callback"] = callbackActionID;
				args["contextmapping"] = contextmapping;
				if(customArgs){//处理自定义参数，用于该服务的参数扩展
					for(var key in customArgs){
						args[key] = customArgs[key];
					}
				}
				//$service.call("UMService.callAction","{callback:'myback', contextmapping:'data'，viewid:'"+controllerName+"',isDataCollect:'false',params:{demo:'demo'},action:'needPwd'}");
				return s.callService("UMService.callAction", args);
			}
		},
		get: function (json) {
			/*	参数：
			 url : 请求的ID
			 callback : 用于绑定webview的字段名
			 */
			if($summer.isJSONObject(json)){
				if(!json.url){
					alert("请输入请求的url");
					return;
				}
				return s.callService("UMService.get", json, false);
			}else{
				alert("参数不是有效的JSONObject");
			}
		},
		post: function (json) {
			/*	参数：
			 url : "http://academy.yonyou.com/api/loginLx.ashx",//请求的url,
			 data: {key:"6480-4230-27FD-8AA0",user:"apitest",pwd:"123456"},
			 callback : "mycallback()"
			 */
			if($summer.isJSONObject(json)){
				if(!json.url){
					alert("请输入请求的url");
					return;
				}
				return s.callService("UMService.post", json, false);
			}else{
				alert("参数不是有效的JSONObject");
			}
		}
	};//s.service end
	//
	s.callServiceEx = function(json){
		return s.callCordova('summer-plugin-service.XService','callSync',json, null, null);
	};
	
	///////////////////////////////////////////////////////////////////////////////////////////
	//summser.UMDevie.writeFile()
	//summer.camera.open() --->summer.openCamera()
	s.UMDevice = {
		_deviceInfo_Screen :null,
		getTimeZoneID : function(){
			return	s.callService("UMDevice.getTimeZoneID", "", true);
		} ,
		getTimeZoneDisplayName : function(){
			return	s.callService("UMDevice.getTimeZoneDisplayName", {}, true); //无参调用统一使用{}
		},
		openAddressBook: function () {
			return s.callService("UMDevice.openAddressBook",{});

		},
		getInternalMemoryInfo: function () {
			return s.callService("UMDevice.getInternalMemoryInfo",{},true);
		},
		getExternalStorageInfo: function () {
			return s.callService("UMDevice.getExternalStorageInfo",{},true);
		},
		getMemoryInfo: function () {
			return s.callService("UMDevice.getMemoryInfo",{},true);
		},
		openWebView: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用gotoMapView服务时，参数不是一个有效的JSONObject");
			}
			/*
			 var args = {url:"http://www.baidu.com"};
			 */
			return s.callService("UMDevice.openWebView", args);
		},
		screenShot: function (args) {

			return s.callService("UMDevice.screenshot",args,true);
		},
		notify: function (args) {
			/*var params = {
			 "sendTime" : "2015-02-03 13:54:30",
			 "sendBody" : "您设置了消息提醒事件",
			 "icon": "app.png"
			 };*/
			s.callService("UMService.localNotification", args);
		},
		getDeviceInfo: function (jsonArgs) {
			var result = "";
			if(jsonArgs){
				result = s.callService("UMDevice.getDeviceInfo", $summer.jsonToStr(jsonArgs), false);
			}else{
				result = s.callService("UMDevice.getDeviceInfo", "", true);
			}
			return JSON.parse(result);
		},
		getScreenWidth: function () {
			if(!this._deviceInfo_Screen){
				var strd_info = this.getDeviceInfo();
				var info = $summer.strToJson(strd_info);
				this._deviceInfo_Screen = info.screen;
			}
			if(this._deviceInfo_Screen){
				return this._deviceInfo_Screen.width;
			}else{
				alert("未能获取到该设备的屏幕信息");
			}
		},
		getScreenHeight: function () {
			if(!this._deviceInfo_Screen){
				var strd_info = this.getDeviceInfo();
				var info = $summer.strToJson(strd_info);
				this._deviceInfo_Screen = info.screen;
			}
			if(this._deviceInfo_Screen){
				return this._deviceInfo_Screen.height;
			}else{
				alert("未能获取到该设备的屏幕信息");
			}
		},
		getScreenDensity: function () {
			if(!this._deviceInfo_Screen){
				var strd_info = this.getDeviceInfo();
				var info = $summer.strToJson(strd_info);
				this._deviceInfo_Screen = info.screen;
			}
			if(this._deviceInfo_Screen){
				return this._deviceInfo_Screen.density;
			}else{
				alert("未能获取到该设备的屏幕信息");
			}
		},
		currentOrientation: function () {
			return s.callService("UMDevice.currentOrientation", {}, true);
		},
		capturePhoto: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
			}
			s.callService("UMDevice.capturePhoto", args);
		},
		getAlbumPath: function (args) {
			return s.callService("UMDevice.getAlbumPath", typeof args == "undefined" ? {} : args, true);
		},
		getAppAlbumPath: function (jsonArgs) {
			if(jsonArgs){
				if(!$summer.isJSONObject(jsonArgs)){
					alert("调用 getAppAlbumPath 服务时，参数不是一个有效的JSONObject");
					return;
				}
			}else{
				jsonArgs = {};
			}
			return s.callService("UMDevice.getAppAlbumPath", jsonArgs, true);
		},
		getContacts: function () {
			return s.callService("UMDevice.getContactPerson", {}, true);
		},
		saveContact: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用saveContact服务时，参数不是一个有效的JSONObject");
			}
			s.callService("UMDevice.saveContact", args);
		},
		popupKeyboard : function(){
			return s.callService("UMDevice.popupKeyboard",{},true);
		},
		listenGravitySensor : function(json){
			json = json || {};
			json["__keepCallback"] = true;
			return s.callService("UMDevice.listenGravitySensor",json,false);
		},
		closeGravitySensor : function(json){
			json = json || {};
			return s.callService("UMDevice.closeGravitySensor",json,false);
		},
		openApp: function (args) {
			if(!$summer.isJSONObject(args)){
				alert("调用openApp服务时，参数不是一个有效的JSONObject");
			}
			return s.callService("UMDevice.openApp", args);
		},
		getLocationInfo : function(){
			return s.callService("UMDevice.getLocationInfo",{},true);
		}
	};
	s.UMFile = {
		remove : function(args){
			return s.callService("UMFile.remove", args, false);//默认异步
		},
		compressImage : function(args){
			return s.callService("UMFile.compressImg", args, false);//默认异步
		},
		exists : function(args){
			return s.callService("UMFile.exists", args, true);
		},
		download : function(jsonArgs){
			if($summer.isEmpty(jsonArgs.url)){
				alert("参数url不能为空");
			}
			if($summer.isEmpty(jsonArgs.filename)){
				alert("参数filename不能为空");
			}
			if($summer.isEmpty(jsonArgs.locate)){
				alert("参数locate不能为空");
			}
			if($summer.isEmpty(jsonArgs.override)){
				alert("参数override不能为空");
			}
			if($summer.isEmpty(jsonArgs.callback)){
				alert("参数callback不能为空 ");
			}
			jsonArgs["__keepCallback"] = true;
			return s.callService("UMFile.download", jsonArgs);//默认异步
		},
		open : function(args){
			if(!$summer.isJSONObject(args)){
				alert("调用$file.open方法时，参数不是一个有效的JSONObject");
			}
			return s.callService("UMDevice.openFile", args, false);//调用的是UMDevice的方法
		},
		getFileInfo : function(args){
			var json = args;
			if(typeof args == "string"){
				json = {"path" : args};
			}
			return s.callService("UMFile.getFileInfo",json, true);
		},
		openFileSelector : function(args){
			return s.callService("UMFile.openFileSelector", args);
		},
		fileToBase64:function(args){
			var json = args;
			if(typeof args == "string"){
				json = {"path" : args};
			}
			return s.callService("UMFile.fileToBase64",json, true);
		},
		base64ToFile:function (args){
			var json = args;
			if(typeof args == "string"){
				json = {"path" : args};
			}
			return s.callService("UMFile.base64ToFile",json, true);
		}

	};
	s.UMTel = {
		call: function (tel) {
			if($summer.os=='android' || $summer.os=='ios') {
				s.callService("UMDevice.callPhone", '{"tel":"'+tel+'"}');
			}else{
				alert("Not implementate UMP$Services$Telephone$call in $summer.os == " + $summer.os);
			}
		},
		sendMsg: function (tel, body) {
			if(arguments.length == 1 && $summer.isJSONObject(arguments[0])){
				var args = tel;
				if($summer.os=='android' || $summer.os=='ios') {
					return s.callService("UMDevice.sendMsg", args);
				}
			}else{
				if( $summer.os=='android' || $summer.os=='ios') {
					//$service.call("UMDevice.sendMessage", "{recevie:'"+tel+"',message:'"+body+"'}");
					s.callService("UMDevice.sendMsg", "{tel:'"+tel+"',body:'"+body+"'}");
				}
			}
		},
		sendMail: function (receive, title, content) {
			var args = {};
			if(arguments.length == 1 && $summer.isJSONObject(arguments[0])){
				args = receive;
			}else{
				args["receive"] = receive;
				args["title"] = title;
				args["content"] = content;
			}
			return s.callService("UMDevice.sendMail", args);
		}

	};
	s.UMCamera={
		open: function (args) {
			if($summer.checkIfExist(args, ["bindfield","callback","compressionRatio"]))
				return s.callService("UMDevice.openCamera",args,false);
		},
		openPhotoAlbum: function (json) {
			if(!json) return;
			var args = {};
			if(json.bindfield)
				args["bindfield"] = json["bindfield"];
			if(json.callback)
				args["callback"] = json["callback"];
			if(json.compressionRatio)
				args["compressionRatio"] = json["compressionRatio"];
			return s.callService("UMDevice.openPhotoAlbum", args, false);//异步调用服务
		}
	};
	s.UMScanner={
		open: function (jsonArgs) {
			var result = "";
			if(jsonArgs){
				if(jsonArgs["frameclose"] == null || jsonArgs["frameclose"] == undefined){
					jsonArgs["frameclose"] =  "true";//默认扫描后关闭
				}
				result = s.callService("UMDevice.captureTwodcode", jsonArgs, false);
			}else{
				result = s.callService("UMDevice.captureTwodcode", "", true);
			}
		},
		generateQRCode: function (jsonArgs) {
			//twocode-size  //二维码大小，默认180*180，二维码为正方形
			//twocode-content  //二维码内容，字符串
			if($summer.isJSONObject(jsonArgs)){
				if(typeof jsonArgs["size"] != "undefined"){
					jsonArgs["twocode-size"] =  jsonArgs["size"];
				}
				if(typeof jsonArgs["content"] != "undefined"){
					jsonArgs["twocode-content"] =  jsonArgs["content"];
				}
				if(typeof jsonArgs["twocode-size"] == "undefined"){
					jsonArgs["twocode-size"] =  "180";
				}
				if(typeof jsonArgs["twocode-content"] == "undefined"){
					alert("参数twocode-content不能为空，此参数用来标识扫描二维码后的返回值");
					return;
				}
			}else{
				alert("generateQRCode方法的参数不是一个有效的JSONObject!");
				return;
			}

			return s.callService("UMDevice.createTwocodeImage", jsonArgs, true);
		},
	};
	s.UMNet={
		available: function () {
			var result = false;
			if($summer.os=='android' || $summer.os=='ios'){
				result = s.callService("UMNetwork.isAvailable", {}, true);
			}
			if(result != null && result.toString().toLowerCase() == "true"){
				return true;
			}else{
				return false;
			}
		},
		getNetworkInfo: function () {
			var result = s.callService("UMNetwork.getNetworkInfo", {}, true);//同步
			if(typeof result == "string"){
				return $summer.strToJson(result);
			}else{
				return result;
			}
		}
	};
	s.UMSqlite={
		openDB:function(args){
			if($summer.isJSONObject(args) && !$summer.isEmpty(args["db"])){
				return s.callService(this.UMSQLite_openDB, args, false);
			}else{
				alert("参数不是一个有效的JSONObject，请使用openDB({...})形式的API");
			}
		},
		execSql: function (args) {
			if($summer.isJSONObject(args)){
				if($summer.isEmpty(args["db"])){
					alert("请输入参数db");
					return;
				}
				if($summer.isEmpty(args["sql"])){
					alert("请输入参数sql");
					return;
				}
				return s.callService("UMSQLite.execSql", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用execSql({...})形式的API");
			}
		},
		//查询记录并分页返回
		//参数db：必选 数据库名字
		//参数sql：必选   查询sql语句
		//参数startIndex： 可选  起始记录数索引 默认0
		//参数endIndex：  可选  结束记录索引（含） 默认9
		query: function (args) {
			/*
			 $sqlite.query({
			 "db" : dbname,
			 "sql" : sql,
			 "startIndex" : 0,   //从第几条记录开始
			 "endIndex" : 9   //到第几条记录结束(含)
			 });
			 */
			if($summer.isJSONObject(args)){
				/*
				 if($isEmpty(args["startIndex"])){
				 args["startIndex"] = 0;
				 }
				 if($isEmpty(args["endIndex"])){
				 args["endIndex"] = 9;
				 }
				 */
				return s.callService("UMSQLite.query", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用query({...})形式的API");
			}
		},
		//查询返回指定页面的数据
		//参数db：必选 数据库名字
		//参数sql：必选   查询sql语句
		//参数pagesize：  可选  每页记录数 默认10
		//参数pageIndex： 可选  指定页码 默认0
		queryByPage: function (args) {
			/*
			 $sqlite.queryByPage({
			 "db" : dbName,
			 "sql" : sql,
			 "pageSize" : pageSize,   //pageIndex=页号，从0开始
			 "pageIndex" : pageNo //pageSize=每页的记录数，从1开始
			 })
			 */
			if($summer.isJSONObject(args)){
				if($summer.isEmpty(args["pageSize"])){
					args["pageSize"] = 10;
				}
				if($summer.isEmpty(args["pageIndex"])){
					args["pageIndex"] = 0;
				}
				return s.callService("UMSQLite.queryByPage", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用queryByPage({...})形式的API");
			}
		},
		exist: function (args) {
			if($summer.isJSONObject(args)){
				if($summer.isEmpty(args["db"])){
					alert("请输入参数db");
					return;
				}
				return s.callService("UMSQLite.exist", args, true);
			}else{
				alert("参数不是一个有效的JSONObject，请使用exist({...})形式的API");
			}
		}
	};
	s.UMCache={
		writeFile : function(filePath, content){
			var args = {};
			if(filePath)
				args["path"] = filePath;
			if(content)
				args["content"] = content;
			return s.callService("UMFile.write", args, false);
		},
		readFile : function(filePath){
			var strContent = "";
			var args ={};
			if(filePath)
				args["path"] = filePath;
			strContent = s.callService("UMFile.read", args, true);

			//苹果安卓统一返回处理结果
			if(strContent && strContent != ""){
				try{
					/*  取出缓存的值不再强行转化为json，按照绝大多数平台通常的处理方式，缓存取出来后必要时需自行类型转化
					 obj = $stringToJSON(strContent);
					 return obj;
					 */
					return strContent;
				}catch(e){
					return strContent;
				}
			}else{
				return null;
			}
		}
	};
	/*service*/
	s.openHTTPS = s.UMService.openHTTPS;
	s.callService = s.UMService.call;
	s.callAction = s.UMService.callAction;
	s.writeConfig = s.UMService.writeConfig;
	s.readConfig = s.UMService.readConfig;

	/*device*/
	s.getTimeZoneID = s.UMDevice.getTimeZoneID;
	s.getTimeZoneDisplayName = s.UMDevice.getTimeZoneDisplayName;
	s.openAddressBook= s.UMDevice.openAddressBook;
	s.getInternalMemoryInfo = s.UMDevice.getInternalMemoryInfo;
	s.getExternalStorageInfo = s.UMDevice.getExternalStorageInfo;
	s.getMemoryInfo = s.UMDevice.getMemoryInfo;
	s.openWebView = s.UMDevice.openWebView;
	s.screenShot = s.UMDevice.screenShot;
	s.notify = s.UMDevice.notify;
	s.getDeviceInfo = s.UMDevice.getDeviceInfo;
	s.getScreenWidth = s.UMDevice.getScreenWidth;
	s.getScreenHeight = s.UMDevice.getScreenHeight;
	s.getScreenDensity = s.UMDevice.getScreenDensity;
	s.currentOrientation = s.UMDevice.currentOrientation;
	s.capturePhoto = s.UMDevice.capturePhoto;
	s.getAlbumPath = s.UMDevice.getAlbumPath;
	s.getAppAlbumPath = s.UMDevice.getAppAlbumPath;
	s.getContacts = s.UMDevice.getContacts;
	s.saveContact = s.UMDevice.saveContact;
	s.popupKeyboard = s.UMDevice.popupKeyboard;
	s.listenGravitySensor = s.UMDevice.listenGravitySensor;
	s.closeGravitySensor = s.UMDevice.closeGravitySensor;
	s.openApp = s.UMDevice.openApp;
	s.getLocationInfo = s.UMDevice.getLocationInfo;
	//
	s.removeFile = s.UMFile.remove;
	s.compressImage=s.UMFile.compressImage
 	s.exists = s.UMFile.exists;
 	s.download = s.UMFile.download;
 	s.openFile = s.UMFile.open;
 	s.getFileInfo = s.UMFile.getFileInfo;
 	s.openFileSelector = s.UMFile.openFileSelector;
 	s.fileToBase64 = s.UMFile.fileToBase64;
 	s.base64ToFile = s.UMFile.base64ToFile;
	/*tel*/
	s.callPhone= s.UMTel.call;
	s.sendMsg= s.UMTel.sendMsg;
	s.sendMail= s.UMTel.sendMail;
	/*cache*/
	s.writeFile = s.UMCache.writeFile;
	s.readFile = s.UMCache.readFile;
	/*camera*/
	s.openCamera= s.UMCamera.open;
	s.openPhotoAlbum = s.UMCamera.openPhotoAlbum;
	/*scanner*/
	s.openScanner= s.UMScanner.open;
	s.generateQRCode= s.UMScanner.generateQRCode;
	/*net*/
	s.netAvailable= s.UMNet.available;
	s.getNetworkInfo= s.UMNet.getNetworkInfo;

	s.ajax=function(json, successFn, errFn){
		if(json.type.toLowerCase() == "get"){
			return cordovaHTTP.get(json.url || "", json.param || {}, json.header || {}, successFn, errFn);
		}else if(json.type.toLowerCase() == "post"){
			return cordovaHTTP.post(json.url || "", json.param || {}, json.header || {}, successFn, errFn);
		}
	};
	s.get=function(url, param, header, successFn, errFn){
		return cordovaHTTP.get(url || "", param || {}, header || {}, successFn, errFn);
	};
	s.post=function(url, param, header, successFn, errFn){
		return cordovaHTTP.post(url || "", param || {}, header || {}, successFn, errFn);
	};
	s.getLocation=function(successFn, errFn){
		return navigator.geolocation.getCurrentPosition(successFn, errFn);
	};

}(window,summer);

/*2017.3.8
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: Qhb@yonyou.com go
 * Version: 3.0.0.20170214.2047
 */

(function(global, factory){
    if ( typeof module === "object" && typeof module.exports === "object" ) {
     
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(window,function(window,noGlobal){
    var e = {};
    window.emm = e;
    return emm;
}))

+function(w,e,s){
    if(!e){
        e={};
        w.emm=e;
    }

    e.writeConfig = function(json,successFn,errFn){
        s.callService("UMEMMService.writeConfig", json, false)

    };
    e.autofind = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.autofind', json, false);
    };
    e.registerDevice = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.registerDevice', json, false);
    };
    e.login = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.login', json, false);
    };
    e.logout = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.logout', json, false);
    };
    e.getUserInfo = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getUserInfo', json, false);
    };  
    e.modifyPassword = function(json,successFn,errFn){  
        json["callback"]=successFn;
        json["error"]=errFn;    
        return  s.callService('UMEMMService.modifyPassword', json, false);
    };
    e.modifyAvatar = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.modifyAvatar', json, false);
    };
    e.getApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getApps', json, false);
    };
    e.getDocs = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getDocs', json, false);
    };
    e.startStrategy = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.startStrategy', json, false);
    };
    e.stopStrategy = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.stopStrategy', json, false);
    };
    e.feedback = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.feedback', json, false);
    };
    e.getUserCommonApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getUserCommonApps', json, false);
    };
    e.getSystemApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getSystemApps', json, false);
    };
    e.getRecommendedApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.getRecommendedApps', json, false);
    };
    e.updateUserApps = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;

        return  s.callService('UMEMMService.updateUserApps', json, false);
    };
    e.upgradeWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        json["__keepCallback"] = true;
        return  s.callService('UMEMMService.upgradeWebApp', json, false);
    };
     e.installWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
         json["__keepCallback"] = true;
        return  s.callService('UMEMMService.installWebApp', json, false);
    };
     e.openWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.openWebApp', json, false);
    };
     e.removeWebApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        return  s.callService('UMEMMService.removeWebApp', json, false);
    };
    e.upgradeSummerApp = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        json["__keepCallback"] = true;
        return  s.callService('UMEMMService.upgradeSummerApp', json, false);
    };
    e.upgradeSilentSignal = function(json,successFn,errFn){
        json["callback"]=successFn;
        json["error"]=errFn;
        s.callService("UMEMMService.upgradeSilentSignal", json, false)
    }; 
    
}(window,emm,summer);