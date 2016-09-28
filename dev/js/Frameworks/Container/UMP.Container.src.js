
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// UMP.Container.js @VERSION 3.0.0
// Author gct(debugger)

CurrentEnvironment={};
CurrentEnvironment.DeviceIOS="ios";
CurrentEnvironment.DeviceAndroid="android";
CurrentEnvironment.DeviceWin8="win8";
CurrentEnvironment.DevicePC="pc";
CurrentEnvironment.Debug="debug";
CurrentEnvironment.DeviceType="android";
$environment = CurrentEnvironment;
(function(env){
	var browser={
		info:function(){
			var ua = navigator.userAgent, app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				//trident: ua.indexOf('Trident') > -1, //IE内核
				//presto: ua.indexOf('Presto') > -1, //opera内核
				webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				//gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
				mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
				iPad: ua.indexOf('iPad') > -1 //是否iPad
				//webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		lang:(navigator.browserLanguage || navigator.language).toLowerCase()
	};
	
	if(browser.info.android){
		env.DeviceType="android";
	}else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
		env.DeviceType="ios";
	}
})(CurrentEnvironment);

+function(UM, undefined){
    UM.platform = {};
	UM.platform.OS = "";
	UM.platform.ANDROID = "android";
	UM.platform.IOS = "ios";
	UM.platform.HTML5 = "HTML5"; 
}(UM);

$isWeb = false;
$__cbm = [];
//
SysHelper=function(){	
}
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.SysHelper=function(){
	this._version = "";
	this._cancelpush = false;//默认false 默认不取消push,控制一次Action是否需要提交
}
function UMP$UI$Container$SysHelper$navigate(viewid){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		UM_SysNavigate(viewid);
	}else{
		if(adrinvoker){
			adrinvoker.call("UMView.open","{viewid:'" + viewid + "'}");
		}else{
			var error = "adrinvoker is undefined; navigate is executing, the parameter viewid is ["+ viewid+"]";
			alert(error);
		}
	}
}
//这里的$sys.callAction为JS调用dsl中的定义的Action，即UI端的Action，调用服务器端的Action为$service.callAction(.....)
function UMP$UI$Container$SysHelper$callAction(actionid,ctx){	
	//
	if(ctx){//CallAction之前做一次push同步
		var args = {};
		//because the native container check [document] and [context] forcibly, args must have the tow return object
		//1、args must have document
		if(typeof $document != "undefined"){
			args["document"] = $document.dataToString();
		}else{
			args["document"] = {};
		}
		//2、args must have context	
		try{
			args["context"] = jsonToString(ctx);
			_$sys.push(args);
		}catch(e){
			alert(e.stack);
		}
	}
	//

	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		//JS调用IOS Action
		UM_SysCallAction(actionid);
	}else{
		//JS调用android Action
		if(adrinvoker){
			adrinvoker.call("UMJS.callAction","{actionid:'" + actionid + "'}");
		}else{
			var error = "adrinvoker is undefined; callAction is executing, the parameter action is ["+ actionid+"]";
			alert(error);
		}
	}	
}
function UMP$UI$Container$SysHelper$cancelPush(val){
	if(typeof val == "undefined"){
		return this._cancelpush;
	}else{
		this._cancelpush = val;
	}
}
function UMP$UI$Container$SysHelper$push(jsonArgs){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		//JS调用IOS Action
		  var str = jsonToString(jsonArgs);
		//JS调用IOS Action
		UM_NativeCall.callService("UMJS.push", str);

	}else{
		//JS调用android Action
		var str = jsonToString(jsonArgs);
		if(adrinvoker){
			adrinvoker.call("UMJS.push", str);
		}else{
			var error = "adrinvoker is undefined; push is executing, the parameter jsonArgs is ["+ str+"]";
			alert(error);
		}
	}	
}
function UMP$UI$Container$SysHelper$version(val){
	if(typeof val === "undefined")
		return this._version;
	else
		this._version = val;		
}
function UMP$UI$Container$SysHelper$pull(){
}
UMP.UI.Container.SysHelper.prototype ={
	navigate : UMP$UI$Container$SysHelper$navigate,
	callAction : UMP$UI$Container$SysHelper$callAction,
	cancelPush : UMP$UI$Container$SysHelper$cancelPush,
	push : UMP$UI$Container$SysHelper$push,
	pull : UMP$UI$Container$SysHelper$pull,
	version : UMP$UI$Container$SysHelper$version
}
UMP.UI.Container.SysHelper.registerClass('UMP.UI.Container.SysHelper');
UM_Sys = new UMP.UI.Container.SysHelper();
$js = UM_Sys;
_$sys = UM_Sys;
$sys = _$sys;





//_______________________________________________________________________________________________ $service = UM_NativeCall
//原生调用公共服务
CommonNativeCallService=function(){
	this.GetDeviceData = "um_getDevicedata";//ios--ok
	this.GetUserData = "um_getUserData";//ios--ok
	this.GetAppData = "um_getAppData";//ios--ok
	this.GetAppConfigData = "um_getAppConfigData";//没有提供???
	this.CallTel="um_CallTel";//ios--ok
	this.SendMsg="um_SendMsg";//ios--ok
	this.IsConnect = "um_IsConnect";//ios--ok
	this.GetCurrentLanguage = "um_GetCurrentLanguage";//ios--ok
	this.GetCurrentLocation = "um_GetCurrentLocation";//ios--ok
    //
    this.Store = "um_Store";//ios--ok
    this.Restore = "um_Restore";//ios--ok
	
	this._APIIsObsolete = "the API is obsolete, but continue executing...please use the new API: ";
}
//native service bridge, 最基本平台内部调用服务的API，所有公共服务都通过callService调用执行，对外API为--------------------------$service.call
/*
serviceType:平台提供的服务类型
jsonArgs: json类型
isSync:默认false，是否同步调用
*/
CommonNativeCallService.prototype.callService=function(serviceType, jsonArgs, isSync){
	try{		
		var serviceparams = "";
		if(typeof jsonArgs == "string"){
			var json = stringToJSON(jsonArgs);
			if(typeof json == "string"){
				//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
				alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
				return;	
			}
			serviceparams = jsonToString(json);
			if(typeof serviceparams == "object"){
				//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
				alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式。参数是" + jsonArgs);
				return;	
			}			
		}else if(typeof jsonArgs == "object"){
			if(jsonArgs["callback"] && $isFunction(jsonArgs["callback"]) && !jsonArgs["__keepCallback"]){
				//1、 callback:function(){}
				var newCallBackScript = "fun" + uuid(8, 16) + "()";//anonymous method
				while($__cbm[newCallBackScript]){
					newCallBackScript =  "fun" + uuid(8, 16) + "()";//anonymous method
				}
				$__cbm[newCallBackScript] = jsonArgs["callback"];//callback can be global or local, so define a reference function in $__cbm
				
				//
				window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						var _func = $__cbm[newCallBackScript];
						_func(sender, args);	
					}catch(e){
						alert(e);
					}finally{
						delete $__cbm[newCallBackScript];
						delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
						//alert("del ok");
						//alert(typeof $__cbm[newCallBackScript]);
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}				
				}
				jsonArgs["callback"] = newCallBackScript;				
			}else if(jsonArgs["callback"] && typeof(jsonArgs["callback"]) == "string" && !jsonArgs["__keepCallback"]){
				//2、 callback:"mycallback()"
				var cbName = jsonArgs["callback"].substring(0, jsonArgs["callback"].indexOf("("));
				var callbackFn = eval(cbName);
				if(typeof callbackFn != "function"){
					alert(cbName + " is not a global function, callback function must be a global function!");
					return;
				}
				
				var newCallBackScript = "fun" + uuid(8, 16) + "()";//anonymous method
				while(window[newCallBackScript]){
					newCallBackScript =  "fun" + uuid(8, 16) + "()";//anonymous method
				}
				//
				window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						callbackFn(sender, args);	
					}catch(e){
						alert(e);
					}finally{
						delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
						//alert("del ok");
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}				
				}
				jsonArgs["callback"] = newCallBackScript;
			}
			
			this.callBackProxy(jsonArgs , "error");
		
			serviceparams = jsonToString(jsonArgs);
			if(typeof serviceparams == "object"){
				//转string后仍然为json，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
				alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式" + jsonArgs);
				return;	
			}
		}else{
			alert("调用$service.call("+serviceType+", jsonArgs, "+isSync+")时不合法,参数jsonArgs类型为"+typeof jsonArgs);
			return;
		}
			
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			/*
			//IOS需要严格的JSON格式，故在此统一检查并处理一下
			if(typeof serviceparams == "string"){
				var json = stringToJSON(serviceparams);
				serviceparams = jsonToString(json);			
			}else if(typeof serviceparams == "object"){
				serviceparams = jsonToString(serviceparams);
			}
			*/
			if(isSync){
				return UM_callNativeService(serviceType,serviceparams);//同步调用
			}else{
				return UM_callNativeServiceNoraml(serviceType,serviceparams);//异步调用，多用于CallAction等，服务可支持callBack，通过callback参数
			}
		}else if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceAndroid){
			if(isSync){
				return adrinvoker.call2(serviceType,serviceparams);//call2是同步调用
			}else{
				//默认异步执行
				return adrinvoker.call(serviceType,serviceparams);//call是异步调用 默认异步
			}
		}else if(CurrentEnvironment.DeviceType==CurrentEnvironment.Debug){
			//alert("CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType + ", 已经执行")
			console.log("CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType + ", 服务["+serviceType+"]已经执行，参数是"+serviceparams);
		}else{
			alert("CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType + ", $service.call Not Implementation!")
		}
	}catch(e){
		var info="";
		if(isSync)	
			info = "调用$service.call(\""+serviceType+"\", jsonArgs, "+isSync+")时发生异常,请检查!";
		else
			info = "调用$service.call(\""+serviceType+"\", jsonArgs)时发生异常,请检查!";
		$console.log(info);
		alert(info+", 更多请查看console日志;\n错误堆栈信息为:\n" + e.stack);
	}
}

CommonNativeCallService.prototype.callBackProxy = function(jsonArgs, callback_KEY){
	if(jsonArgs[callback_KEY] && $isFunction(jsonArgs[callback_KEY])){
		// callback:function(){}
		var newCallBackFnName = callback_KEY + uuid(8, 16);//anonymous method
		while($__cbm[newCallBackFnName]){
			newCallBackFnName =  callback_KEY + uuid(8, 16);//anonymous method
		}
		$__cbm[newCallBackFnName] = jsonArgs[callback_KEY];//callback can be global or local, so define a reference function in $__cbm
		
		//
		window[newCallBackFnName] = function (sender, args){
			try{
				//alert(typeof sender);
				//alert(typeof args);
				//$alert(sender);
				//$alert(args);
				if(args == undefined)
					args = sender;
				var _func = jsonArgs[callback_KEY];
				_func(sender, args);	
			}catch(e){
				alert(e);
			}finally{
				delete $__cbm[newCallBackFnName];
				delete window[newCallBackFnName];
				//alert("del ok"); 
				//alert(typeof $__cbm[newCallBackScript]);
				//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
			}				
		}
		jsonArgs[callback_KEY] = newCallBackFnName + "()";				
	}else if(jsonArgs[callback_KEY] && typeof(jsonArgs[callback_KEY]) == "string"){
		// callback:"mycallback()"
		var cbName = jsonArgs[callback_KEY].substring(0, jsonArgs[callback_KEY].indexOf("("));
		var callbackFn = eval(cbName);
		if(typeof callbackFn != "function"){
			alert(cbName + " is not a global function, callback function must be a global function!");
			return;
		}
		
		var newCallBackFnName = callback_KEY + uuid(8, 16);//anonymous method
		while(window[newCallBackFnName]){
			newCallBackFnName =  callback_KEY + uuid(8, 16);//anonymous method
		}
		//
		window[newCallBackFnName] = function (sender, args){
			try{
				//alert(typeof sender);
				//alert(typeof args);
				//$alert(sender);
				//$alert(args);
				if(args == undefined)
					args = sender;
				callbackFn(sender, args);	
			}catch(e){
				alert(e);
			}finally{
				delete window[newCallBackFnName];
				//alert("del ok");
				//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
			}				
		}
		jsonArgs[callback_KEY] = newCallBackFnName + "()";
	}
}

//该方法是通过服务调用MA上一个controller的某一个Action
/*  示例代码 $service.callAction("nc.bs.hr.wa.payslip.HrController","needPwd",{demo:'demo'},false,"myback","returnData");
controllerName：  String类型， MA上的Controller的FullName, 例如"nc.bs.hr.wa.payslip.HrController"
actionName：      String类型， Controller上的Action名称，例如"needPwd"
params：          json类型,    Action所需的参数,例如{demo:"demo"}
isDataCollect：   Boolean类型, 调用Action时候是否需要收集数据，例如true
callbackActionID：String类型， 执行完Action后的回调Action，例如"myCallBack"
contextmapping：  String类型， 执行完Action后，将Action的返回值映射到Context的映射关系，例如"data"或"data.x"
*/          
CommonNativeCallService.prototype.callAction=function(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
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
		var sysParam = {
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
				args[key] = $stringToJSON(args[key]);
			}
		}
		return UM_NativeCall.callService("UMService.callAction", args, false);
	}else{
		var args = {};
		args["viewid"] = controllerName;
		args["action"] = actionName;
		args["params"] = params;
		args["isDataCollect"] = isDataCollect;
		args["callback"] = callbackActionID;
		args["contextmapping"] = contextmapping;
		if(customArgs){//处理自定义参数，用于该服务的参数扩展
			for(key in customArgs){
				args[key] = customArgs[key];
			}
		}
		//$service.call("UMService.callAction","{callback:'myback', contextmapping:'data'，viewid:'"+controllerName+"',isDataCollect:'false',params:{demo:'demo'},action:'needPwd'}");
		return UM_NativeCall.callService("UMService.callAction", args);
	}
}
//本地缓存 调用$cache即可
CommonNativeCallService.prototype.store=function(key, value){
	$cache.write(key, value);
}
CommonNativeCallService.prototype.reStore=function(key){
	$cache.read(key);
}
//设备信息公共服务
CommonNativeCallService.prototype.getDeviceData=function(){
	
    return UM_callNativeService(this.GetDeviceData);
}
CommonNativeCallService.prototype.getUserData=function(){
    return UM_callNativeService(this.GetUserData);
}
CommonNativeCallService.prototype.getAppData=function(){
    return UM_callNativeService(this.GetAppData);
}
CommonNativeCallService.prototype.getAppConfigData=function(){
    return UM_callNativeService(this.GetAppConfigData);
}

//写ip
CommonNativeCallService.prototype.writeConfig=function(key,val){
	//1、准备参数
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = key;
	}else if(arguments.length == 2){
		args[key] = val;
	}else{
		alert("writeConfig时,参数不合法");
		return;
	}
	//2、调用服务
	UM_NativeCall.callService("UMService.writeConfigure", args);
} 
CommonNativeCallService.prototype.loadConfig=function(key, fieldName){
	/*
	$service.load({
		"host":"field1",
		"ip":"field2",
		"a":"b",
		"c":"d";
	
	})
	*/
	//1、准备参数
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = key;
	}else if(arguments.length == 2 && typeof key == "string" && typeof fieldName == "string"){
		args[key] = fieldName;
	}else{
		alert("调用$service.loadConfig(" + typeof key + ", "+ typeof fieldName+")时参数有误！");
		return;
	}
	
	
	//2、调用服务
	return UM_NativeCall.callService("UMService.loadConfigure", args, true);
} 
CommonNativeCallService.prototype.readConfig=function(name){
	//1、准备参数
	var args = {};
	if(typeof name == "string")
		args[name] = name;	
	else{
		alert("readConfig时，不支持参数[name]的参数类型为" + typeof name);
		return;
	}
	
	//2、调用服务
	return UM_NativeCall.callService("UMService.readConfigure", args, true);
} 
CommonNativeCallService.prototype.login=function(username,passwd){
	return UM_NativeCall.callService("UMService.login", "{\"username\":\"" +username + "\",\"passwd\":\"" +passwd + "\"}");
}

CommonNativeCallService.prototype.transInfoService = function(infoid, binderfiled, transtype){
	/*	参数：
	infoid : 请求的ID
	binderfiled : 用于绑定webview的字段名
	transtype ：一个枚举值，目前分为word|other
	*/
	var args = {};
	args["infoid"] = infoid;
	args["binderfiled"] = binderfiled;
	
	if(transtype != null)//可选参数	
		args["transtype"] = transtype;
		
	return $service.call("UMService.transInfoService", $jsonToString(args));
}
CommonNativeCallService.prototype.get = function(json){
	/*	参数：
	url : 请求的ID
	callback : 用于绑定webview的字段名
	*/
	if($isJSONObject(json)){
		if(!json.url){
			alert("请输入请求的url");
			return;
		}
		return $service.call("UMService.get", json, false);
	}else{
		alert("参数不是有效的JSONObject");
	}
}
CommonNativeCallService.prototype.post = function(json){
	/*	参数：
	url : "http://academy.yonyou.com/api/loginLx.ashx",//请求的url,
	data: {key:"6480-4230-27FD-8AA0",user:"apitest",pwd:"123456"},
	callback : "mycallback()"
	*/
	if($isJSONObject(json)){
		if(!json.url){
			alert("请输入请求的url");
			return;
		}
		return $service.call("UMService.post", json, false);	
	}else{
		alert("参数不是有效的JSONObject");
	}
}
UM_NativeCall = new CommonNativeCallService();
$service = UM_NativeCall;
$service.call = UM_NativeCall.callService;//===CommonNativeCallService.prototype.callService=function(serviceType, serviceparams, isSync){
//-----------------------------------------------------------------------




//______________________________________________________________________________________________________ UM_Controls 谨慎使用
ControlsHelper=function(){
}
ControlsHelper.prototype.get=function(cid){
	this._cid = cid;
    return this;
}
ControlsHelper.prototype.set=function(attrid,value){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		UM_setControlAttribute(this._cid,attrid,value);
	}else{
		adrinvoker.call("UMJS.setProperty","{id:'" + this._cid + "',"+attrid+":'" + value + "'}");
	}
}
ControlsHelper.prototype.call=function(methodname,param){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		UM_callControlMethod(this._cid,methodname,param);
	}else{
		alert("No Implementation");
	}
}
UM_Controls=new ControlsHelper();

//______________________________________________________________________________________________________ $controls
//UI控件相关服务 只是get和set
Type.registerNamespace('UMP.Services');
UMP.Services.Controls = function UMP$Services$Controls(){
	
}
function UMP$Services$Controls$get(cid,propertyName){	
	var args = {};
	args["id"] = cid;
	args["propertyName"] = propertyName;
	
	var strArgs = $jsonToString(args);
	var result = $service.callService("UMJS.getProperty", strArgs, true);//同步get
	var flag = "$$UErrMsg$";
	if(result != null && result.indexOf(flag)==0){
		alert(result.substring(flag.length));
		return "";
	}
	return result
}
function UMP$Services$Controls$set(cid, propertyName, propertyValue){
	var args = {};
	args["id"] = cid;
	args[propertyName] = propertyValue;
	
	var strArgs = $jsonToString(args);
	return $service.callService("UMJS.setProperty", strArgs, false);//异步set
}
function UMP$Services$Controls$insert(args){
	/*args = {
		id:"inp
		ut0",
		value:"xxx",
		index:""
	}*/
	if(!$isJSONObject(args)){
		alert("the paramter of insert requires a JSONObject");
	}
	if(args["id"] == null){
		alert("insert方法必须指定参数id，即控件的id")
	}
	
	//     $service.call("UMJS.insert", { id:"textbox0", content:"5555"});
	return $service.call("UMJS.insert", args, false);//异步insert
}
function UMP$Services$Controls$focus(args){
	//$id("textbox0").set("ispopup", "true");
    //autofocus
	if(!$isJSONObject(args)){
		alert("the paramter of focus requires a JSONObject");
	}
	if(args["id"] == null){
		alert("focus方法必须指定参数id，即控件的id");
		return;
	}
	return $service.callService("UMJS.focus", args, false);//异步set
}
function UMP$Services$Controls$blur(args){
	if(!$isJSONObject(args)){
		alert("the paramter of blur requires a JSONObject");
	}
	if(args["id"] == null){
		alert("focus方法必须指定参数id，即控件的id");
		return;
	}
	return $service.callService("UMJS.blur", args, false);//异步set
}
function UMP$Services$Controls$invoke(args){
	if(!$isJSONObject(args)){
		alert("the paramter of invoke requires a JSONObject");
	}
	if(args["id"] == null){
		alert("invoke方法必须指定参数id，即控件的id");
		return;
	}
	return $service.call("UMJS.invoke", args, false);//异步set
}
UMP.Services.Controls.prototype = {
	get: UMP$Services$Controls$get,
	set: UMP$Services$Controls$set,
	insert : UMP$Services$Controls$insert,
	focus : UMP$Services$Controls$focus,
	blur : UMP$Services$Controls$blur,
	invoke : UMP$Services$Controls$invoke
};
UMP.Services.Controls.registerClass('UMP.Services.Controls');
var $controls = new UMP.Services.Controls();

//__________________________________________________________________________________________ UMP.UI.Container.Dom
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.Dom = function UMP$UI$Container$Dom(){		
}
function UMP$UI$Container$Dom$set(cid, status, tag, jsonAttrs){

	var testdata = {
		"button1" : {
			"status" : "add",
			"tag" : "intput",
			"attributes" : {"id" : "button1", "type" : "button", "text":"abc"}        
         },
		"div1" : {
			"status" : "mod",
			"tag" : "div",
            "attributes" : {"id" : "div1", "background":"#e3e3e3", "visible":"true"}
        }
	};
	
	if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceIOS){
		UM_setControlAttribute(cid, attrName, attrValue);
	}else{
		var data = {
			"status": status,
			"tag" : tag,
			"attributes": jsonAttrs
		};
		var cData = {
			"id" : data
		};
		var strCData = $jsonToString(cData);
		adrinvoker.call("UMJS.setProperty", strCData);
	}
}
function UMP$UI$Container$Dom$push(doc){
    for(id in doc._tree){
		this.set(id, doc[id]);
	}
}
function UMP$UI$Container$Dom$pull(){
}
UMP.UI.Container.Dom.prototype = {
	set: UMP$UI$Container$Dom$set,
	push: UMP$UI$Container$Dom$push,
	pull: UMP$UI$Container$Dom$pull
};
UMP.UI.Container.Dom.registerClass('UMP.UI.Container.Dom');
var $dom = new UMP.UI.Container.Dom();




//
callbackMap = new Map();
//
MessagePool=function(){
    this.Message=new Array();
    this.ErrorMessage=new Array();
    this.MessageLevel={};
    this.MessageLevel.All=-1;
    this.MessageLevel.Warnning=1;
    this.MessageLevel.Error=2;
}
MessagePool.prototype.log=function(level, msg){
    if(level==this.MessageLevel.Error){
        this.ErrorMessage.push(msg);
    }else{
        this.Message.push(msg);
    }
}
MessagePool.prototype.getErrorMessage=function(){
    var result="[";
    for(var i=0;i<this.ErrorMessage.length;i++){
        if(i==this.ErrorMessage.length-1){
            result+="\""+this.ErrorMessage.shift()+"\""
        }else{
            result+="\""+this.ErrorMessage.shift()+"\",";
        }
    }
    result+="]";
    return result;
}
MessagePool.prototype.getWarnningMessage=function(){
    var result="[";
    for(var i=0;i<this.Message.length;i++){
        if(i==this.Message.length-1){
            result+=this.Message.shift()
        }else{
            result+=this.Message.shift()+",";
        }
    }
    result+="]";
    return result;
}
MessagePool.prototype.getMessage=function(level){
    var msg;
    if(level==this.MessageLevel.Error){
        msg=this.getErrorMessage();
    }else if(level==this.MessageLevel.All){
        var err=this.getErrorMessage();
        var war= this.getWarnningMessage();
        msg="{\"error\":"+err+",\"warnning\":"+war+"}";
    }
    else{
        msg= this.getWarnningMessage();
    }
    
    return msg;
}
//system message pool
messagePool=new MessagePool();
//
RequestContext=function(){
    this.Source=""; //viewid windowid ...
    this.Key="";
};
CommonCRUD=function(){};
CommonCRUD.prototype.loadModel=function(modelname, jsondata){
    $UMP$getMM().set(modelname,jsondata);
}

//dispacherCallbackHandler  for any plat
CommonCRUD.prototype.dispacherCallbackHandler=function(jsondata,key){alert(jsondata);
    //var d=stringToJSON(jsondata);
    callbackMap.get(key).call(this,jsondata);
}
CommonCRUD.prototype.callService=function(serviceName, actionName, params,context,handler){
    
    context.Key = serviceName + actionName+context.Source;
    callbackMap.put(context.Key,handler);
    //call remote service any plat 
    UM_CallRemoteService(serviceName,actionName,params,context.Source,context.Key);
}
commonService=new CommonCRUD();
Controllers={};

function getController(controllername){
    /*var c=Controllers.controllername;
    if(!c){
        c=Controllers.controllername=eval("(new "+controllername+"())");
    }*/
    return eval("(new "+controllername+"())");
}

function setControlValue(cid,attrid,value){
	return UM_setControlAttribute(cid,attrid,value);
}

function getModel(modelname){
    return jsonToString($UMP$getMM().get(modelname));
}

function updateModel(modelname,param){
    $UMP$getMM().get(modelname).set(stringToJSON(param));
}
//register model event
function bindEvent(eventname,filedname,modelname){
    //need modify
    modelname="CustomerSubmit";
    $UMP$getMM().get(modelname).bind(eventname,filedname, function(a,value,params){
    //controller:current controller? and to which webview?
    //{"data":{"pLastName":"changed"},"source":{"change":"pLastName"}}
    var eventobject={};
    eventobject.data=a.changed;
    eval("eventobject.source={\""+eventname+"\":\""+modelname+"."+filedname+"\"}");
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
                  UM_CallAction("","dispacherEventToWeView",jsonToString(eventobject));
     }else{
                  dispacherEventAndroid(jsonToString(eventobject));
    }
                                     
                                     
    });
}


////////// dispacherEvent from js container to native android or webview
function dispacherEventAndroid(parameters){
    
}

//___________________________________________________________________________________________________ UMP.Services.Calendar
/*
UMCalendar.getToToday       日历跳转到今天，并加载数据（没有参数）
           getMonthChange   日历翻页时获取，月数据的服务  （参数同callaction）
           getDayChange     日历点击具体日，时获取数据的服务 （参数同callaction）
           getCalendarTitle  获取日历当前的年-月 用于界面title显示（没有参数）

*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Calendar = function UMP$Services$Calendar(){
	this._getToToday="UMCalendar.getToToday";
	this._getMonthChange="UMCalendar.getMonthChange";
	this._getDayChange="UMCalendar.getDayChange";
	this._getCalendarTitle="UMCalendar.getCalendarTitle";
}
function UMP$Services$Calendar$getToToday(calendarID){
	var args={};
	args["id"] = calendarID;	
	var strArgs = $jsonToString(args);
	return $service.call(this._getToToday, strArgs); 
}
function UMP$Services$Calendar$getMonthChange(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
	var args = {};
	args["viewid"] = controllerName;
	args["action"] = actionName;
	args["params"] = params;
	args["isDataCollect"] = isDataCollect;
	args["callback"] = callbackActionID;
	args["contextmapping"] = contextmapping;
	if(customArgs){//处理自定义参数，用于该服务的参数扩展
		for(key in customArgs){
			args[key] = customArgs[key];
		}
	}
	
   	var strArgs = $jsonToString(args);
	return $service.call(this._getMonthChange, strArgs);   
}
function UMP$Services$Calendar$getDayChange(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
	var args = {};
	args["viewid"] = controllerName;
	args["action"] = actionName;
	args["params"] = params;
	args["isDataCollect"] = isDataCollect;
	args["callback"] = callbackActionID;
	args["contextmapping"] = contextmapping;
	if(customArgs){//处理自定义参数，用于该服务的参数扩展
		for(key in customArgs){
			args[key] = customArgs[key];
		}
	}
	
   	var strArgs = $jsonToString(args);
	return $service.call(this._getDayChange, strArgs);   
}
function UMP$Services$Calendar$getCalendarTitle(calendarID){
	var args={};
	args["id"] = calendarID;	
	var strArgs = $jsonToString(args);
	return $service.call(this._getCalendarTitle, strArgs); 
}
UMP.Services.Calendar.prototype = {
	getToToday : UMP$Services$Calendar$getToToday,
	getMonthChange : UMP$Services$Calendar$getMonthChange,
	getDayChange : UMP$Services$Calendar$getDayChange,
	getCalendarTitle : UMP$Services$Calendar$getCalendarTitle
};
UMP.Services.Calendar.registerClass('UMP.Services.Calendar');
var $calendar = new UMP.Services.Calendar();
