
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// tea.js @VERSION 2.5
// Author gct(debugger)
//-----------------------------------------------------------------------
// UMContainer by gct

CurrentEnvironment={};
CurrentEnvironment.DeviceIOS="ios";
CurrentEnvironment.DeviceAndroid="android";
CurrentEnvironment.DeviceWin8="win8";
CurrentEnvironment.DevicePC="pc";
CurrentEnvironment.Debug="debug";
CurrentEnvironment.DeviceType="android";

$environment = CurrentEnvironment;
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
//最基本平台内部调用服务的API，所有公共服务都通过callService调用执行，对外API为--------------------------$service.call
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
			if(jsonArgs["callback"] && $isFunction(jsonArgs["callback"])){
				var strFn = "fun" + uuid(8, 16) + "()";//anonymous method
				while($__cbm[strFn]){
					strFn =  "fun" + uuid(8, 16) + "()";//anonymous method
				}
				$__cbm[strFn] = jsonArgs["callback"];
				jsonArgs["callback"] = strFn;				
			}
		
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
		var args = {};
		if(json.url){
			args["url"] = json.url;
		}else{
			alert("请输入请求的url");
			return;
		}
		if(json.callback){
			args["callback"] = json.callback;
		}
		return $service.call("UMService.get", args, false);
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
		var args = {};
		if(json.url){
			args["url"] = json.url;
		}else{
			alert("请输入请求的url");
			return;
		}
		if(json.data){
			args["data"] = json.data;
		}
		if(json.callback){
			args["callback"] = json.callback;
		}
		return $service.call("UMService.post", args, false);	
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
	return $service.callService("UMJS.getProperty", strArgs, true);//同步get
}
function UMP$Services$Controls$set(cid, propertyName, propertyValue){
	var args = {};
	args["id"] = cid;
	args[propertyName] = propertyValue;
	
	var strArgs = $jsonToString(args);
	return $service.callService("UMJS.setProperty", strArgs, false);//异步set
}
UMP.Services.Controls.prototype = {
	get: UMP$Services$Controls$get,
	set: UMP$Services$Controls$set
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

//______________________________________________________________________________________________________ $ctx Begin
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCtx=function(){	
	this._UMCtx_dataBind = "UMCtx.dataBind";//原生类型.方法名（大小写敏感）
    this._UMCtx_dataCollect = "UMCtx.dataCollect";	//原生类型.方法名（大小写敏感）
	
	this._UMCtx_getValue = "UMCtx.getValue";
	
	this._UMCtx_setValue = "UMCtx.setValue";
	this._UMCtx_setUMContext = "UMCtx.setUMContext";
	this._UMCtx_setAppValue = "UMCtx.setAppValue";
}
function UMP$UI$Container$UMCtx$push(ctx, isDataBinding){
	this._setUMContext(ctx, isDataBinding);
}
function UMP$UI$Container$UMCtx$dataBind(){
	$service.call(this._UMCtx_dataBind, {}, false);	//异步执行  dataBind无需参数		
}
function UMP$UI$Container$UMCtx$dataCollect(){
	$service.call(this._UMCtx_dataCollect, {}, true);	//同步执行  dataBind无需参数		
}
function UMP$UI$Container$UMCtx$put(fieldName, value){
	this._setValue(fieldName, value);
}
function UMP$UI$Container$UMCtx$put2(fieldName, value){
	var json = this.getJSONObject();
	json[fieldName] = value;
	this.push(json);
}
function UMP$UI$Container$UMCtx$get(fieldName){	
	if(arguments.length == 0){
		var expr = "#{CONTEXT}";
		return this._getValue(expr);
	}else{		
		var expr = "#{"+fieldName+"}";
		return this._getValue(expr);
	}
}
function UMP$UI$Container$UMCtx$getString(fieldName){	
	//此方法仅仅支持获取Context本身和Context字段的值
	var expr = "";
	if(arguments.length == 0 || fieldName == ""){
		expr = "#{CONTEXT}";
	}else{
		expr = "#{"+fieldName+"}";//字段表达式
	}
	
	var obj = this._getValue(expr);//同步执行
	var str = $jsonToString(obj);
	return str;
}
function UMP$UI$Container$UMCtx$getJSONObject(fieldName){	
	//此方法仅仅支持获取Context本身和Context字段的值
	var expr = "";
	if(arguments.length == 0 || fieldName == ""){
		expr = "#{CONTEXT}";
	}else{
		expr = "#{"+fieldName+"}";//字段表达式
	}
	
	var str = this._getValue(expr);//同步执行
	var obj = $stringToJSON(str);
	if($isJSONObject(obj)){
		return obj;
	}else{
		alert("getJSONObject("+fieldName+")返回值不是一个有效的JSONObject，其值为" + str);
	}
}
function UMP$UI$Container$UMCtx$getJSONArray(fieldName){	
	//此方法仅仅支持获取Context字段的值
	var expr = "#{"+fieldName+"}";//字段表达式
	var str = this._getValue(expr);
	var obj = $stringToJSON(str);	//同步执行
    if($isJSONArray(obj)){
		return obj;
	}else{
		alert("getJSONArray("+fieldName+")返回值不是一个有效的JSONArray，其值为" + str);
	}	
}



function UMP$UI$Container$UMCtx$param(paramName){
	var ps = this.params();
	if($isJSONObject(ps)){
		return ps[paramName];
	}else{
		alert("当前Context中没有参数名为"+paramName+"的参数值");
	}
}
function UMP$UI$Container$UMCtx$params(){	
	/*
	var expr = "#{plug."+paramName+"}";
	return this._getValue(expr);	//同步执行
    */
	var ctx = this.getJSONObject();
	if(ctx){
		var ps = ctx.parameter;
		if(ps){
			try{
				ps = $stringToJSON(ps);
				return ps;//返回值为JSONObject
			}catch(e){
				alert("未能正确获取参数["+paramName+"],当前Context的Parameter为" + ps);
				alert(e);
				return null;
			}
		}else{
			alert("当前Context的parameter为null");
			return null;
		}
	}else{
		alert("当前获取的Context为null");
		return null;
	}
}
function UMP$UI$Container$UMCtx$getApp(key){
	/* key的取值如下：
	"user"
	"userid"
	"password"
	"token"
	"funcid"
	"tabid"
	"applicationid"
	"wfaddress"
	"deivceid"
	"groupid"
	"sessionid"
	"token"	
	*/
	var expr = "#{app."+key+"}";
	return this._getValue(expr);	//同步执行	
}
function UMP$UI$Container$UMCtx$setApp(json){
	/*
	var json={
		a:"x",
		b:"#{plug.x}",
		c:"#{name}",
		d:"#{cursor.x}"
	}
	*/
	if(typeof isSync == "undefined"){
		isSync = true;	//默认同步执行
	}
	var args = json;
	var strArgs = $jsonToString(args);	
	return $service.call(this._UMCtx_setAppValue, strArgs, isSync);
}






function UMP$UI$Container$UMCtx$_getValue(expr, defaultvalue, isSync){
	if($__isdebug()){
		return this._getValue4debug(expr, defaultvalue, isSync);
	}
	
	
	if(typeof isSync == "undefined"){
		isSync = true;//默认获取是同步调用
	}	
	var args = {};
	args["expr"] = expr;
	if(typeof defaultvalue != "undefined"){
		args["default"] = defaultvalue;
	}
	var strArgs = $jsonToString(args);
	return $service.call(this._UMCtx_getValue, strArgs, isSync);	//同步执行
	
}
function UMP$UI$Container$UMCtx$_getValue4debug(expr, defaultvalue, isSync){
	
		if(expr=="#{CONTEXT}"){
			return $$__debug_ctx;
		}else if(expr.indexOf("#{plug.")>=0){
		    var params = $$__debug_ctx["parameter"];
			if(params){
			    var paramName = expr.substring(expr.indexOf("#{plug.")+7, expr.indexOf("}"));
			    return params[paramName]
			}
		}else if(expr.indexOf("#{app.")>=0){
		
		}else{
			var fieldName = expr.substring(expr.indexOf("#{")+2, expr.indexOf("}"));
			return $$__debug_ctx[fieldName];
		}
	
}
function UMP$UI$Container$UMCtx$_setValue(fieldName, value, isDataBinding){
	//【注意】
	//仅仅支持给Context字段赋值
	//不支持给param和app等赋值，这些只能get不能set
	if($__isdebug()){
		return this._setValue4debug(fieldName, value, isDataBinding);
	}
	
	var args = {};
	args["expr"] = fieldName;//赋值时，不用加表达式	
	args["value"] = value;//不要转成字符串，否则{}和[]都成为字符串了
	if(value instanceof Array){
		args["valueDataType"] = "JSONArray";//对应Java的JSONArray
	}else if(typeof value =="object"){
		args["valueDataType"] = "JSONObject";//对应Java的JSONObject
	}else{
		args["valueDataType"] = "String";//对应Java的String
	}
	args["isDataBinding"] = false;
	
	$service.call(this._UMCtx_setValue, args, true);	//同步赋值
	/*
	if(typeof isDataBinding == "undefined" || isDataBinding == true){
		$service.call(this._UMCtx_dataBind, {}, false);	//异步绑定
	}
	*/
}
function UMP$UI$Container$UMCtx$_setValue4debug(fieldName, value, isDataBinding){
	$$__debug_ctx[fieldName] = value;
}
function UMP$UI$Container$UMCtx$_setUMContext(ctx, isDataBinding){
	if($__isdebug()){
		return this._setUMContext4debug(ctx, isDataBinding);
	}
	var json = {};
	if(ctx.__baseClass == "UMP.UI.Mvc.Context"){
		try{
			json = ctx.unload();
		}catch(e){
			var info = "尝试setContext，但是参数ctx不是一个有效的Context类型";
			$console.log(info);
			alert(info+",更多请查看console日志") 
		}
	}else if(typeof ctx == "object"){
		json = ctx;	
	}else if(typeof ctx == "string"){
		json = ctx;		
	}	
	
	var args = {};
	args["context"] = json;//不要转成字符串，否则{}和[]都成为字符串了
	args["isDataBinding"] = false;
	
	$service.call(this._UMCtx_setUMContext, args, true);	//同步赋值
	if(typeof isDataBinding == "undefined" || isDataBinding == true){
		$service.call(this._UMCtx_dataBind, {}, false);	    //异步绑定		
	}
}
function UMP$UI$Container$UMCtx$_setUMContext4debug(ctx, isDataBinding){
	$$__debug_ctx = ctx;
}
function UMP$UI$Container$UMCtx$_setAppValue(json, isSync){
	/*
	var json={
		a:"x",
		b:"#{plug.x}",
		c:"#{name}",
		d:"#{cursor.x}"
	}
	*/
	if(typeof isSync == "undefined"){
		isSync = true;	//默认同步执行
	}
	var args = json;
	var strArgs = $jsonToString(args);	
	return $service.call(this._UMCtx_setAppValue, strArgs, isSync);
}


UMP.UI.Container.UMCtx.prototype ={
    /** 
	* Context服务，设置当前Context	
	* @param {JSON} json - 当前Context对应的JSON对象
	* @return {void}
	*/
	push : UMP$UI$Container$UMCtx$push,
	dataBind: UMP$UI$Container$UMCtx$dataBind,
	
	/** 
	* 执行数据绑定
	* @return {void}
	*/
	databind: UMP$UI$Container$UMCtx$dataBind,
	
	/** 
	* 执行数据收集
	* @return {void}
	*/
	dataCollect: UMP$UI$Container$UMCtx$dataCollect,
	datacollect: UMP$UI$Container$UMCtx$dataCollect,
	
	get : UMP$UI$Container$UMCtx$get,	
	
	/** 
	* 设置指定字段的值	
	* @param {String} fieldName - 字段名
	* @param {Object} value - 值
	* @return {void}
	*/
	put : UMP$UI$Container$UMCtx$put,
	put2 : UMP$UI$Container$UMCtx$put2,
	
	
	/** 
	* 获取指定字段的值	
	* @param {String} fieldName - 字段名
	* @return {String} 字符型字段值
	*/
	getString : UMP$UI$Container$UMCtx$getString,
	
	/** 
	* 获取指定字段的值	
	* @param {String} fieldName - 字段名
	* @return {JSON} 字段值对应的JSON对象
	*/
	getJSONObject : UMP$UI$Container$UMCtx$getJSONObject,
	
	/** 
	* 获取指定字段的值	
	* @param {String} fieldName - 字段名
	* @return {Array} 字段值对应的JSON数组
	*/
	getJSONArray : UMP$UI$Container$UMCtx$getJSONArray,
	
	/** 
	* 获取指定参数的值	
	* @param {String} paramName - 参数名
	* @return {Object} 参数值
	*/
	param : UMP$UI$Container$UMCtx$param,
	/** 
	* 获取当前Context中的所有参数
	* @return {JSONObject} 当前Context中的所有参数
	*/
	params : UMP$UI$Container$UMCtx$params,
	setApp : UMP$UI$Container$UMCtx$setApp,
	getApp : UMP$UI$Container$UMCtx$getApp,
	//私有方法
	_getValue : UMP$UI$Container$UMCtx$_getValue,
	_setValue : UMP$UI$Container$UMCtx$_setValue,
	_getValue4debug : UMP$UI$Container$UMCtx$_getValue4debug,
	_setValue4debug : UMP$UI$Container$UMCtx$_setValue4debug,
	
	_setUMContext: UMP$UI$Container$UMCtx$_setUMContext,
	_setUMContext4debug: UMP$UI$Container$UMCtx$_setUMContext4debug,
	_setAppValue:UMP$UI$Container$UMCtx$_setAppValue
}
UMP.UI.Container.UMCtx.registerClass('UMP.UI.Container.UMCtx');
$ctx = new UMP.UI.Container.UMCtx();
//______________________________________________________________________________________________________ $ctx End


//______________________________________________________________________________________________________$param or $parameter
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCtxParameter=function(context){
	this._ctx = context;
}
function UMP$UI$Container$UMCtxParameter$get(paramName){	
	var expr = "#{plug."+paramName+"}";
	return this._ctx._getValue(expr);	//同步执行
}
function UMP$UI$Container$UMCtxParameter$getString(paramName){	
	var result = this.get(paramName)
	if(typeof result == "object"){
		return $jsonToString(result)
	}else{
		return result;
	}
}
function UMP$UI$Container$UMCtxParameter$getJSONObject(paramName){	
	var result = this.get(paramName);
	return typeof result == "string" ? $stringToJSON(result) : result;
}
function UMP$UI$Container$UMCtxParameter$getJSONArray(paramName){	
	var result = this.get(paramName);
	if(typeof result == "string"){
		return $stringToJSON(result)
	}else if(result instanceof Array){
		return result;
	}else{
		alert("参数[" + paramName + "]不是有效的数组类型，返回为null");
		return null;
	}
}
function UMP$UI$Container$UMCtxParameter$ctx(ctx){
	this._ctx = ctx;
}
UMP.UI.Container.UMCtxParameter.prototype ={	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {Object} 参数值
	*/
	get : UMP$UI$Container$UMCtxParameter$get,
	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {String} 参数值
	*/
	getString : UMP$UI$Container$UMCtxParameter$getString,		
	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {JSON} 参数值
	*/
	getJSONObject : UMP$UI$Container$UMCtxParameter$getJSONObject,
	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {Array} 参数值
	*/
	getJSONArray : UMP$UI$Container$UMCtxParameter$getJSONArray,
	ctx : UMP$UI$Container$UMCtxParameter$ctx
}
UMP.UI.Container.UMCtxParameter.registerClass('UMP.UI.Container.UMCtxParameter');
$parameter = new UMP.UI.Container.UMCtxParameter($ctx);
$param = $parameter;


$__isdebug = function(){

	if(CurrentEnvironment.DeviceType==CurrentEnvironment.Debug){
		return true;
	}
	return false;
	/*
	if(adrinvoker.call2!=null && UM_callNativeService!=null && UM_callNativeServiceNoraml!=null){
		return true;
	}else{
		return false;
	}	
	*/
}
$$__debug_ctx = function(){

}


//___________________________________________________________________________________________________ $cache UMP.Services.Cache
Type.registerNamespace('UMP.Services');
//写缓存文件
/*
UMFile.write(UMEventArgs args) 参数：append 覆盖还是追加 charset字符字符集  content是内容 path文件名

UMFile.read(UMEventArgs args)  参数：charset字符字符集  maxlength读取最大长度 path文件名
读取出的内容会放在ctx中，key值为content

UMService.callAction  发送请求
*/ 
UMP.Services.Cache = function UMP$Services$Cache(){	
	this._store = "um_Store";//ok
    this._restore = "um_Restore";//ok	
}
var ___cache_UIState = {};
function UMP$Services$Cache$get(charset){
	if($environment.DeviceType == $environment.DeviceIOS){
		return $service.reStore();
	}else if($environment.DeviceType == $environment.DeviceAndroid){
		var args ={};
		if(charset)
			args["charset"] = charset;
			
		var str = $jsonToString(args);
		var strContent = UM_NativeCall.callService("UMFile.read", str, true);
		//alert("get =="+strContent);
		return strContent;
	}
}
function UMP$Services$Cache$set(content, append, charset, isSync){
	if($environment.DeviceType == $environment.DeviceIOS){
		alert("Cache API [push] no implementation...pls consult the IOS developer of UMP");
	}else if($environment.DeviceType == $environment.DeviceAndroid){
		var args ={};
		if(content)
			args["content"] = content;
		if(append)
			args["append"] = append;
		if(charset)
			args["charset"] = charset;	
		
		var str = $jsonToString(args);
		if(typeof isSync == "undefined")
			return UM_NativeCall.callService("UMFile.write", str, true);//默认都是同步调用，避免write后read不到最新的结果
		else
			return UM_NativeCall.callService("UMFile.write", str, isSync);
		//___cache_UIState["content"] = content;
	}
}
function UMP$Services$Cache$write2(key, value, append, charset, isSync){
	if($environment.DeviceType == $environment.DeviceIOS){
		var str = value;
		if(typeof value != "string"){
			str = $jsonToString(value);
		}		
		UM_callNativeService(this._store, key, str);		
	}else if($environment.DeviceType == $environment.DeviceAndroid){
	    var args={};
		var oldObj = $cache.get();
		if(!oldObj)
			oldObj = {};
		oldObj[key] = value;
		args["content"] = oldObj;
		
		
		if(append)
			args["append"] = append;
		if(charset)
			args["charset"] = charset;	
		
		var str = $jsonToString(args);	
		
		//___cache_UIState["content"] = content;
		//alert("write之前的=="+str);
		if(typeof isSync == "undefined")
			return UM_NativeCall.callService("UMFile.write", str, true);//默认都是同步调用，避免write后read不到最新的结果
		else
			return UM_NativeCall.callService("UMFile.write", str, isSync);
	}
}
function UMP$Services$Cache$read2(key, maxlength, charset){
	var strContent = "";
	if($environment.DeviceType == $environment.DeviceIOS){		
        strContent = UM_callNativeService(this._restore, key);
	}else if($environment.DeviceType == $environment.DeviceAndroid){
	   var content = {};
	   
		var args ={};
		if(maxlength)
			args["maxlength"] = maxlength;
		if(charset)
			args["charset"] = charset;	
		
		var str = $jsonToString(args);	
		strContent = UM_NativeCall.callService("UMFile.read", str, true);		
	}
	//alert("read出来的字符串是"+strContent);
	//苹果安卓统一返回处理结果
	if(strContent && strContent != ""){
		try{
			var obj = $stringToJSON(strContent);
			return obj[key];
		}catch(e){
			return null;
		}
	}else{
		return null;
	}
}

function UMP$Services$Cache$writeFile(filePath, content, append, charset, isSync){	
	if($environment.DeviceType == $environment.DeviceIOS){
		var str = content;
		if(typeof content != "string"){
			str = $jsonToString(content);
		}
		return UM_callNativeService(this._store, filePath, str);	
	}else if($environment.DeviceType == $environment.DeviceAndroid){
		var args ={};
		
		if(filePath)
			args["path"] = filePath;
		if(content)
			args["content"] = content;	
		if(append)
			args["append"] = append;
		if(charset)
			args["charset"] = charset;
		
		
		//var str = $jsonToString(args);
		
		if(typeof isSync == "undefined")
			return UM_NativeCall.callService("UMFile.write", args, true);//默认都是同步调用，避免write后read不到最新的结果
		else
			return UM_NativeCall.callService("UMFile.write", args, isSync);
		//___cache_UIState[path] = content;
	}
}
function UMP$Services$Cache$readFile(filePath, maxlength, charset){
	var strContent = "";
	if($environment.DeviceType == $environment.DeviceIOS){
		strContent = UM_callNativeService(this._restore, filePath);	
	}else if($environment.DeviceType == $environment.DeviceAndroid){  
		var args ={};
		if(filePath)
			args["path"] = filePath;
		if(maxlength)
			args["maxlength"] = maxlength;
		if(charset)
			args["charset"] = charset;
			
		var str = $jsonToString(args);
		strContent = UM_NativeCall.callService("UMFile.read", str, true);		
	}
	
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
UMP.Services.Cache.prototype = {
	get: UMP$Services$Cache$get,
	set: UMP$Services$Cache$set,
	push: UMP$Services$Cache$set,
	write2: UMP$Services$Cache$write2,
	read2: UMP$Services$Cache$read2,
	
	write: UMP$Services$Cache$writeFile,
	read: UMP$Services$Cache$readFile,
	writeFile: UMP$Services$Cache$writeFile,
	readFile: UMP$Services$Cache$readFile
};
UMP.Services.Cache.registerClass('UMP.Services.Cache');
$cache = new UMP.Services.Cache();
$store = $cache;

//___________________________________________________________________________________________________ UMP.Services.Sqlite
//Sqlite相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Sqlite = function UMP$Services$Sqlite(){
	this.UMSQLite_execSql = "UMSQLite.execSql";
	this.UMSQLite_query = "UMSQLite.query";
	this.UMSQLite_queryByPage = "UMSQLite.queryByPage";
	this.UMSQLite_exist = "UMSQLite.exist";	
}
function UMP$Services$Sqlite$execSql(args){
/*
    var sql = "CREATE TABLE person (_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, xclass VARCHAR)";
    var param = {
       db : dbname,
       sql : sql
    }    
    $sqlite.execSql(param);
*/
	if($isJSONObject(args)){
		if($isEmpty(args["db"])){
			alert("请输入参数db");
			return;
		}
		if($isEmpty(args["sql"])){
			alert("请输入参数sql");
			return;
		}
		return $service.call(this.UMSQLite_execSql, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用execSql({...})形式的API");
	}
	
}

//查询记录并分页返回
//参数db：必选 数据库名字  
//参数sql：必选   查询sql语句  
//参数startIndex： 可选  起始记录数索引 默认0
//参数endIndex：  可选  结束记录索引（含） 默认9
function UMP$Services$Sqlite$query(args){
	/*
	$sqlite.query({
       "db" : dbname,
       "sql" : sql,
       "startIndex" : 0,   //从第几条记录开始
       "endIndex" : 9   //到第几条记录结束(含)    
    });
	*/
	if($isJSONObject(args)){
		if($isEmpty(args["startIndex"])){
			args["startIndex"] = 0;
		}
		if($isEmpty(args["endIndex"])){
			args["endIndex"] = 9;
		}
		return $service.call(this.UMSQLite_query, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用query({...})形式的API");
	}
}

//查询返回指定页面的数据
//参数db：必选 数据库名字  
//参数sql：必选   查询sql语句  
//参数pagesize：  可选  每页记录数 默认10
//参数pageIndex： 可选  指定页码 默认0
function UMP$Services$Sqlite$queryByPage(args){
/*
    $sqlite.queryByPage({
       "db" : dbName,
       "sql" : sql,
       "pageSize" : pageSize,   //pageIndex=页号，从0开始
       "pageIndex" : pageNo //pageSize=每页的记录数，从1开始
    })
*/
	if($isJSONObject(args)){
		if($isEmpty(args["pageSize"])){
			args["pageSize"] = 10;
		}
		if($isEmpty(args["pageIndex"])){
			args["pageIndex"] = 0;
		}
		return $service.call(this.UMSQLite_queryByPage, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用queryByPage({...})形式的API");
	}
	
}
function UMP$Services$Sqlite$exist(args){
	if($isJSONObject(args)){
		if($isEmpty(args["db"])){
			alert("请输入参数db");
			return;
		}
		return $service.call(this.UMSQLite_exist, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用exist({...})形式的API");
	}
}
UMP.Services.Sqlite.prototype = {
	//openDB:UMP$Services$Sqlite$openDB,
	//delDB:UMP$Services$Sqlite$delDB,
	execSql:UMP$Services$Sqlite$execSql,
	query:UMP$Services$Sqlite$query,	//查询（默认分页）
	queryByPage:UMP$Services$Sqlite$queryByPage,//查询指定页的数据
	exist : UMP$Services$Sqlite$exist
};
UMP.Services.Sqlite.registerClass('UMP.Services.Sqlite');
var $sqlite = new UMP.Services.Sqlite();

//___________________________________________________________________________________________________ UMP.Services.Network
//网络相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Network = function UMP$Services$Network(){	
	this.um_IsConnect = "um_IsConnect";//ios--ok	
	this.UMNetwork_isAvailable = "UMNetwork.isAvailable";//andriod--ok
	
	
	this.UMNetwork_networkState = "UMNetwork.networkState";//andriod--ok
	
	this.UMNetwork_getNetworkInfo  = "UMNetwork.getNetworkInfo";
	
}

function UMP$Services$Network$isConnect(){
	var result = false;
	if($environment.DeviceType == $environment.DeviceIOS){		
		result = $service.call(this.um_IsConnect, {}, true);	
	}else if($environment.DeviceType == $environment.DeviceAndroid){		
		result = $service.call(this.UMNetwork_isAvailable, {}, true);
	}
	if(result != null && result.toString().toLowerCase() == "true"){
		return true;
	}else{
		return false;
	}
}	
function UMP$Services$Network$available(){
	return this.isConnect();
}
function UMP$Services$Network$networkState(){
    /*
	if($environment.DeviceType == $environment.DeviceIOS){
		alert("该服务[networkState]苹果未实现，请联系苹果开发人员");
		return {};	
	}else if($environment.DeviceType == $environment.DeviceAndroid){		
		var result = $service.call(this.UMNetwork_networkState, {}, true);
		if(typeof result == "String"){
			return $stringToJSON(result);
		}else{
			return result;
		}
	}
	*/
	var result = $service.call(this.UMNetwork_networkState, {}, true);
	if(typeof result == "String"){
		return $stringToJSON(result);
	}else{
		return result;
	}
}
function UMP$Services$Network$getNetworkInfo(){
    /*
	if($environment.DeviceType == $environment.DeviceIOS){
		alert("该服务[getNetworkInfo]苹果未实现，请联系苹果开发人员");
		return {};
	}else if($environment.DeviceType == $environment.DeviceAndroid){		
		var result = $service.call(this.UMNetwork_getNetworkInfo, {}, true);//同步
		if(typeof result == "String"){
			return $stringToJSON(result);
		}else{
			return result;
		}
	}
	*/
	var result = $service.call(this.UMNetwork_getNetworkInfo, {}, true);//同步
	if(typeof result == "String"){
		return $stringToJSON(result);
	}else{
		return result;
	}
}
UMP.Services.Network.prototype = {
	isConnect: UMP$Services$Network$isConnect,
	available: UMP$Services$Network$available,
	isAvailable: UMP$Services$Network$available,
	networkState: UMP$Services$Network$networkState,
	getNetworkInfo: UMP$Services$Network$getNetworkInfo
};
UMP.Services.Network.registerClass('UMP.Services.Network');
var $net = new UMP.Services.Network();

//___________________________________________________________________________________________________ $console 
//console相关服务
if(typeof __debugger == "undefined"){
	__debugger = false;
}
UMP.Services.Console = function UMP$Services$Console(){	
}
function UMP$Services$Console$log(info){
	if(__debugger){
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		
		}else{
			if(console){
				console.log("__________"+info);//console是原生JS中定义的对象
			}
		}
	}
}
function UMP$Services$Console$alert(info){
	if(__debugger){
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			$alert(info);	
		}else{
			$alert(info);	
		}
	}
}
UMP.Services.Console.prototype = {
	log : UMP$Services$Console$log,
	alert : UMP$Services$Console$alert
};
UMP.Services.Console.registerClass('UMP.Services.Console');
$console = new UMP.Services.Console();

//___________________________________________________________________________________________________ $res UMP.Services.Resource
//Resource相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Resource = function UMP$Services$Resource(){
	this._getResString="um_getResString";
}
function UMP$Services$Resource$getResString(resid, isSync){
	if(typeof isSync == "undefined"){
		isSync = true;//默认同步方式调用资源
	}
	var str = "";
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	str = UM_callNativeService(this._getResString, resid);
    }else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		str = $service.call("UMService.getResString", "{resname:'" + resid + "'}", isSync);//默认同步调用
    }
    return str;
}
UMP.Services.Resource.prototype = {
	getResString : UMP$Services$Resource$getResString
};
UMP.Services.Resource.registerClass('UMP.Services.Resource');
$res = new UMP.Services.Resource();

//___________________________________________________________________________________________________ $view UMP.Services.UMView
UMP.Services.UMView = function UMP$Services$UMView(){	
}
function UMP$Services$UMView$open(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.open",jsonArgs);
	}
}
function UMP$Services$UMView$close(jsonArgs){
	if(typeof jsonArgs == "undefined"){
		jsonArgs = {
			resultcode : 0
		};
	}
	if($isJSONObject(jsonArgs)){
		$service.call("UMView.close",jsonArgs);
	}else{
		alert("请使用close({...})或close()形式的API");
	}	
}
function UMP$Services$UMView$closeWithCallBack(jsonArgs){
	/*
	json = {
		mydata:{a:2,b:45},
		resultcode:15
	}
	*/
	if(typeof jsonArgs == "undefined"){
		jsonArgs = {
			resultcode : 15
		};
	}
	if($isJSONObject(jsonArgs)){
		jsonArgs["resultcode"] = "15";
		$service.call("UMView.close",jsonArgs);
	}else{
		alert("请使用close({...})或close()形式的API");
	}
}
function UMP$Services$UMView$openPop(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.openPop",jsonArgs);
	}
}
function UMP$Services$UMView$closePop(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.closePop",jsonArgs);
	}
}
function UMP$Services$UMView$openDialog(jsonArgs){
	/*
	style
	titile
	bingdire
	
	
	*/
	if(jsonArgs){
		$service.call("UMView.openDialog",jsonArgs);
	}
}
function UMP$Services$UMView$openReference(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.openReference",jsonArgs);
	}
}
function UMP$Services$UMView$openPicker(jsonArgs){
	//参数过多，args为一个json对象
	//UMView.openPicker(args);
	/*    args结构如下：
	参数：
	"pickercount" 必填 枚举值是 1 ,2 ,3
	"datasource"  必填 数据源对应的字段名
	"title"  iOS 可以没有
	"okbuttontitle" 确定控钮 显示的文字
	"cancelbuttontitle" 取消控钮 显示的文字
	"picker1binder"    picker1收集在context中的字段名
	"picker2binder"    picker2收集在context中的字段名
	"picker3binder"    picker3收集在context中的字段名

	事件：
	"okaction"  确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
	"okaction"  确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
	" onselectedchange1"  picker1选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	" onselectedchange2"  picker2选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	" onselectedchange3"  picker3选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	
	*/
	//args形如args1
	var args1 ={
		pickercount:"1",
		datasource:"fieldA",
		title:"",
		okbuttontitle:"确定",
		cancelbuttontitle:"取消",
		picker1binder:"fieldA",
		picker2binder:"fieldB",
		picker3binder:"fieldC",
		okaction:"okAction",  //确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
		cancelaction:"cancelAction",  //确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
		onselectedchange1:"action1",  //picker1选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
		onselectedchange2:"action2",  //picker2选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
		onselectedchange3:"action3"  //picker3选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	};
	
	if(jsonArgs){
		$service.call("UMView.openPicker",jsonArgs);
	}
}
function UMP$Services$UMView$alert(msg){
	var args = {
		title:"确认",
		style:"ok",		
		message:msg		
	};
	return this.openDialog(args);
}
function UMP$Services$UMView$confirm(msg){
	var args = {
		title:"确认",
		style:"ok-cancel",		
		message:msg		
	};
	return this.openDialog(args);
}
UMP.Services.UMView.prototype = {
	/** 
	* 打开一个新页面 	
	* @param {JSON} json - 打开一个新页面的参数设置{viewid:"xxx.xxx.xxx", isKeep:false, callback:"xxxActionId"}
	* @return {void}
	*/		
	open : UMP$Services$UMView$open,
	/** 
	* 关闭当前页面，默认resultcode为0，当resultcode==15时，表明可以执行open方法中定义的callback 	
	* @param {JSON} json - 打开一个新页面的参数设置{resultcode:15, callbackData:{a:1, b:2}}
	* @return {void}
	*/		
	//xxx
	close : UMP$Services$UMView$close,
	closeWithCallBack : UMP$Services$UMView$closeWithCallBack,
	openPop : UMP$Services$UMView$openPop,
	closePop : UMP$Services$UMView$closePop,
	openDialog : UMP$Services$UMView$openDialog,
	openReference : UMP$Services$UMView$openReference,
	openPicker : UMP$Services$UMView$openPicker,
	alert : UMP$Services$UMView$alert,
	confirm : UMP$Services$UMView$confirm
};
UMP.Services.UMView.registerClass('UMP.Services.UMView');
$view = new UMP.Services.UMView();
//----------------------------------------------------------------------------END



//


//___________________________________________________________________________________________________ $umdevice UMP.Services.UMDevice
UMP.Services.UMDevice = function UMP$Services$UMDevice(){
	this._UMDevice_getDeviceInfo="UMDevice.getDeviceInfo";
    this._UMDevice_captureTwodcode="UMDevice.captureTwodcode";		
}
function UMP$Services$UMDevice$getTimeZoneID(){
	return	UM_NativeCall.callService("UMDevice.getTimeZoneID", "", true);
}
function UMP$Services$UMDevice$getTimeZoneDisplayName(){
	return	UM_NativeCall.callService("UMDevice.getTimeZoneDisplayName", "", true);
}
function UMP$Services$UMDevice$getDeviceInfo(jsonArgs){
	/*
		用法1、使用同步调用直接获取返回值。
		var devinfo = call2("UMDevice.getDeviceInfo");        //无参数
		
		用法2、使用异步调用方法，CallBack中获取返回值
		call("UMDevice.getDeviceInfo","{bindfield:devinf,callback:sendToMA}"); 
	*/
	var result = "";
	if(jsonArgs){
		result = $service.call(this._UMDevice_getDeviceInfo, $jsonToString(jsonArgs), false);
	}else{
		result = $service.call(this._UMDevice_getDeviceInfo, "", true);
	}
	//alert(result);
	//alert($jsonToString(result););
	return result;
	/*
	var jsonArgs = {
		bindfield:devinf,
		callback:sendToMA
	};
	return	UM_NativeCall.callService(this._UMDevice_getDeviceInfo, $jsonToString(jsonArgs), false);
	*/
	
}
function UMP$Services$UMDevice$getLocation(json){
	/*
	return $service.call("UMDevice.getLocation", {
		"bindfield" : "location",  //
		"single":"true",  //是否只获取1次
		"isgetaddress" : "true",  //是否获取地址
		"network" : "true",   //是否wify定位
		"callback" : "locationcallback()"
	});
	*/
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = json;
	}else{
	    alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
		return;
	}
	var result = $service.call("UMDevice.getLocation", args);
	var returnVal = "";
	if(typeof result == "string"){
	    returnVal = "状态为"+result+", 可以通过callback获取返回值";
	}
	return returnVal;
}
function UMP$Services$UMDevice$captureTwodcode(json){
	var result = "";
	if(jsonArgs){
		result = $service.call(this._UMDevice_captureTwodcode, $jsonToString(jsonArgs), false);
	}else{
		result = $service.call(this._UMDevice_captureTwodcode, "", true);
	}
	return result;
}
function UMP$Services$UMDevice$capturePhoto(args){
	/*
	var params = {
		bindfield : "image",
		callback : "imageCallback()"
	};
	*/
	if(!$isJSONObject(args)){
		alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
	}
	$service.call("UMDevice.capturePhoto", args);

}
function UMP$Services$UMDevice$sendMail(receive, title, content){
    var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = receive;
	}else{
		args["receive"] = receive;
		args["title"] = title;
		args["content"] = content;
	}
	$service.call("UMDevice.sendMail", args);
	
	/*
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	UM_callNativeService(this._SENDEMAIL,mail,body);
    }else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		$service.call("UMDevice.sendMail", "{mail:'"+mail+"',body:'"+body+"'}");
    }
	*/
}
function UMP$Services$UMDevice$saveContact(args){
/*
    var params = {
              tel:"",//手机号码
              employeename:"",//联系人名称
      jobname:"",//职位
      orgname:"",//部门名称
      address:"",//单位地址
      email:"",//邮箱
      officetel:""//办公电话
       };
	   */
	if(!$isJSONObject(args)){
		alert("调用saveContact服务时，参数不是一个有效的JSONObject");
	}
	$service.call("UMDevice.saveContact", args);
}
function UMP$Services$UMDevice$openAddressBook(){
    return $service.call("UMDevice.openAddressBook",{});
}
function UMP$Services$UMDevice$getInternalMemoryInfo(){
    return $service.call("UMDevice.getInternalMemoryInfo",{},true);
}
function UMP$Services$UMDevice$getExternalStorageInfo(){
    return $service.call("UMDevice.getExternalStorageInfo",{},true);
}
function UMP$Services$UMDevice$getMemoryInfo(){
    return $service.call("UMDevice.getMemoryInfo",{},true);
}
function UMP$Services$UMDevice$gotoMapView(args){
	/*
	var args = {
		posX:"",//位置信息x坐标
		posY:"",//位置信息y坐标
		bindfield:"",//绑定字段
		auto:"false",//是否自动定位
		aroundpoi :"",//周围兴趣点
		keyword:"",//要定位的关键字
		onaroundpoiclick:"",//兴趣点点击触发的JS方法
		onmylocationclick:""//我的位置点击触发的JS方法
	};
	*/
	if(!$isJSONObject(args)){
		alert("调用gotoMapView服务时，参数不是一个有效的JSONObject");
	}
    return $service.call("UMDevice.gotoMapView",args);
}
function UMP$Services$UMDevice$openWebView(args){
    if(!$isJSONObject(args)){
		alert("调用gotoMapView服务时，参数不是一个有效的JSONObject");
	}
	/*
	var args = {url:"http://www.baidu.com"};
	*/
	return $service.call("UMDevice.openWebView", args);
}
function UMP$Services$UMDevice$screenShot(args){
    if(!$isJSONObject(args)){
		alert("调用screenshot服务时，参数不是一个有效的JSONObject");
	}
	return $service.call("UMDevice.screenshot",args,true);
}
function UMP$Services$UMDevice$notify(args){
	/*var params = {
	  "sendTime" : "2015-02-03 13:54:30",
	  "sendBody" : "您设置了消息提醒事件",
	  "icon": "app.png"
	};*/
    $service.call("UMService.localNotification", args);
}

UMP.Services.UMDevice.prototype = {	
	getTimeZoneID : UMP$Services$UMDevice$getTimeZoneID,
	getTimeZoneDisplayName : UMP$Services$UMDevice$getTimeZoneDisplayName,
	getDeviceInfo : UMP$Services$UMDevice$getDeviceInfo,
	captureTwodcode : UMP$Services$UMDevice$captureTwodcode,
	getLocation : UMP$Services$UMDevice$getLocation,
	/** 
	* 打开扫描仪器	
	* 启动二维码扫描
	* { bindfield:"xxxx", framewidth:"100", frameheight:"100", 
	   frametext:"扫一扫"
	  }
	* @param {JSON} json -  { bindfield:"xxxx", framewidth:"100", frameheight:"100",frametext:"扫一扫"}
	* @return {void}
	*/
	openscan : UMP$Services$UMDevice$captureTwodcode,
	capturePhoto  : UMP$Services$UMDevice$capturePhoto,
	sendMail : UMP$Services$UMDevice$sendMail,
    saveContact : UMP$Services$UMDevice$saveContact,
	openAddressBook : UMP$Services$UMDevice$openAddressBook,
	getInternalMemoryInfo  : UMP$Services$UMDevice$getInternalMemoryInfo ,
	getExternalStorageInfo  : UMP$Services$UMDevice$getExternalStorageInfo ,
	getMemoryInfo  : UMP$Services$UMDevice$getMemoryInfo ,
	gotoMapView : UMP$Services$UMDevice$gotoMapView,
	openWebView : UMP$Services$UMDevice$openWebView,
	screenShot: UMP$Services$UMDevice$screenShot,
	notify	: UMP$Services$UMDevice$notify
};
UMP.Services.UMDevice.registerClass('UMP.Services.UMDevice');
$device = new UMP.Services.UMDevice();//命名规范 $device === UMDevice
$umdevice = $device;

//___________________________________________________________________________________________________ $badge --> UMP.Services.Badge
//Badge相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Badge = function UMP$Services$Badge(){
}
function UMP$Services$Badge$showBadge(args){
    /*
	var args = {
		target:"image0",
		text:"1234",
        position:"topright"
    };
	*/
	return $service.call("UMBadgeService.ShowBadge", args); 
}
function UMP$Services$Badge$hideBadge(args){
	/*
	var args = {
		target:"image0"
	};
	*/
	return $service.call("UMBadgeService.HideBadge", args);
}
UMP.Services.Badge.prototype = {
	showBadge: UMP$Services$Badge$showBadge,
	hideBadge : UMP$Services$Badge$hideBadge
};
UMP.Services.Badge.registerClass('UMP.Services.Badge');
$badge = new UMP.Services.Badge();


//___________________________________________________________________________________________________ $tel --> UMP.Services.Telephone
//电话相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Telephone = function UMP$Services$Telephone(){
    this._SAVECONTACT="um_saveContact";//?????
	this._CALLTEL="um_CallTel";//ios--ok	
	this._SENDMSG = "um_SendMsg";//ios--ok
	this._SENDEMAIL = "um_SendEmail";//ios--ok
}
/*
function UMP$Services$Telephone$saveContact(tel, employeename, jobname, orgname, adress){
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	UM_callNativeService(this._SAVECONTACT, tel, employeename, jobname, orgname, adress);
	}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		var args = {};
		args["tel"] = tel;
		args["employeename"] = employeename;
		args["jobname"] = jobname;
		args["orgname"] = orgname;
		args["adress"] = adress;
		$service.call("UMDevice.saveContact", $jsonToString(args));
	}else{
		alert("Not implementate UMP$Services$Telephone$saveContact in CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType);
	}
}
*/
function UMP$Services$Telephone$call(tel){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	UM_callNativeService(this._CALLTEL, tel);
		//UM_callNativeServiceNoraml
	}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		$service.call("UMDevice.callPhone", "{tel:'"+tel+"'}");
	}else{
		alert("Not implementate UMP$Services$Telephone$call in CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType);
	}
}
function UMP$Services$Telephone$sendMsg(tel, body){
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		var args = tel;		
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			return UM_callNativeService(this._SENDMSG, args.tel, args.body);
		}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
			return $service.call("UMDevice.sendMsg", args);
		}
	}else{
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			UM_callNativeService(this._SENDMSG, tel, body);
		}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
			//$service.call("UMDevice.sendMessage", "{recevie:'"+tel+"',message:'"+body+"'}");
			$service.call("UMDevice.sendMsg", "{tel:'"+tel+"',body:'"+body+"'}");
		}
	}
}
function UMP$Services$Telephone$sendMail(receive, title, content){
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = receive;
	}else{
		args["receive"] = receive;
		args["title"] = title;
		args["content"] = content;
	}
    return $device.sendMail(args);	
}
function UMP$Services$Telephone$saveContact(args){
	return $device.saveContact(args)
}
UMP.Services.Telephone.prototype = {
	call: UMP$Services$Telephone$call,
	sendMsg: UMP$Services$Telephone$sendMsg,
	sendMail: UMP$Services$Telephone$sendMail,
	saveContact : UMP$Services$Telephone$saveContact
};
UMP.Services.Telephone.registerClass('UMP.Services.Telephone');
$tel = new UMP.Services.Telephone();

//========================================= $camera ======================================================== $camera
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCamera=function(){	
	this._UMDevice_openCamera = "UMDevice.openCamera";
	this._UMDevice_openPhotoAlbum = "UMDevice.openPhotoAlbum";
}

function UMP$UI$Container$UMCamera$open(json){
	var args = {};
	if(json.bindfield)
		args["bindfield"] = json["bindfield"];
	if(json.callback)
		args["callback"] = json["callback"];
	return $service.call(this._UMDevice_openCamera,args,false);
}
function UMP$UI$Container$UMCamera$openPhotoAlbum(json){
	if(!json) return;
	var args = {};
	if(json.bindfield)
		args["bindfield"] = json["bindfield"];
	if(json.callback)
		args["callback"] = json["callback"];
	return $service.call(this._UMDevice_openPhotoAlbum, args, false)//异步调用服务
}
UMP.UI.Container.UMCamera.prototype ={
	open : UMP$UI$Container$UMCamera$open,
	openPhotoAlbum : UMP$UI$Container$UMCamera$openPhotoAlbum
}
UMP.UI.Container.UMCamera.registerClass('UMP.UI.Container.UMCamera');
$camera = new UMP.UI.Container.UMCamera();

//========================================= $scanner ======================================================== $scanner
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMScanner=function(){	
	this._UMDevice_captureTwodcode = "UMDevice.captureTwodcode";
}

function UMP$UI$Container$UMScanner$open(jsonArgs){
	var result = "";
	if(jsonArgs){
		if(jsonArgs["frameclose"] == null){
			jsonArgs["frameclose"] =  "true";//默认扫描后关闭
		}			
		result = $service.call(this._UMDevice_captureTwodcode, $jsonToString(jsonArgs), false);
	}else{
		result = $service.call(this._UMDevice_captureTwodcode, "", true);
	}
}
UMP.UI.Container.UMScanner.prototype ={
    /** 
	* 打开扫描仪器	
	* 启动二维码扫描
	* { bindfield:"xxxx", framewidth:"100", frameheight:"100", 
	   frametext:"扫一扫"
	  }
	* @param {JSON} json -  { bindfield:"xxxx", callback:"myCallBack()", framewidth:"100", frameheight:"100",frametext:"扫一扫"}
	* @return {void}
	*/
	open : UMP$UI$Container$UMScanner$open
}
UMP.UI.Container.UMScanner.registerClass('UMP.UI.Container.UMScanner');
$scanner = new UMP.UI.Container.UMScanner();
//______________________________________________________________________________________________________ $scanner End

//___________________________________________________________________________________________________ $camera
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMJS=function(){	
	this._UMCtx_dataBind = "UMCtx.dataBind";	
	
	this._UMCtx_getValue = "UMCtx.getValue";
	
	this._UMCtx_setValue = "UMCtx.setValue";
	this._UMCtx_setUMContext = "UMCtx.setUMContext";
	this._UMCtx_setAppValue = "UMCtx.setAppValue";
}

function UMP$UI$Container$UMJS$runjs(){

}
UMP.UI.Container.UMJS.prototype ={
	runjs : UMP$UI$Container$UMJS$runjs
}
UMP.UI.Container.UMJS.registerClass('UMP.UI.Container.UMJS');
$js = new UMP.UI.Container.UMJS();


//
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMAnimation=function(){	

}

function UMP$UI$Container$UMAnimation$animate(id, settings){
	/*
	var args=  {
		id:"widget2",
		animations : [{
			type:"scale",		
			duration:2000,
			fromWidth:-1,			
			toWidth:-1,
			fromHeight:0,			
			toHeight:201,			
			pivotX:0,
			pivotY:0
		}]
	}
	*/
	var args = {
		id : id,
		animations : settings
	};
	$service.call("UMJS.animation", args, false);

}
function UMP$UI$Container$UMAnimation$show(){
}
function UMP$UI$Container$UMAnimation$hidden(){
}
UMP.UI.Container.UMAnimation.prototype ={
	show : UMP$UI$Container$UMAnimation$show,
	hidden : UMP$UI$Container$UMAnimation$hidden,
	animate : UMP$UI$Container$UMAnimation$animate
}
UMP.UI.Container.UMAnimation.registerClass('UMP.UI.Container.UMAnimation');
$anim = new UMP.UI.Container.UMAnimation();
//___________________________________________________________________________________________________ UMP.Services.File
UMP.Services.UMFile = function UMP$Services$UMFile(){
	this._downloadFile="UMService.downloadFile";
	this._UMFile_upload="UMFile.upload";
	this._UMFile_download = "UMFile.download";
}
function UMP$Services$UMFile$downloadFile(fileid, downloadpath, filename, filetype, filesize, downflag, startposition, endposition){
	var args = {};
	args["fileid"]=fileid;//args.put("fileid","0001A11000000000ZEYD"); 文件ID
	args["downloadpath"]=downloadpath;//args.put("downloadpath","0001A11000000000ZEYD"); 文件下载路径
	args["filename"]=filename;//args.put("filename","abc"); 文件名称
	args["filetype"]=filetype;//args.put("filetype","doc"); 文件类型	
	args["filesize"]=filesize;//args.put("filesize"] = args.put("filesize","300"); 文件大小
	args["downflag"]=downflag;//args.put("downflag","false"); 是否断点续传
	args["startposition"]=startposition;//args.put("startposition","false"); 断点续传时开始位置
	args["endposition"]=endposition;//args.put("endposition","false"); 断点续传时结束位置
	
	
   	var strArgs = $jsonToString(args);
	return $service.call(this._downloadFile, strArgs);   
}
function UMP$Services$UMFile$upload(jsonArgs){
	/*
	var json = {
		"url" : "http://10.2.112.22:8080/umserver/upload",
		"bindfield" : "upload",
		"filename" : imagePath,
		"callback" : "uploadImageCallback()"
	};
	*/
	if ($isEmpty(jsonArgs.url)) {
		alert("参数url不能为空");//上传的地址
	}
	if ($isEmpty(jsonArgs.filename)) {
		alert("参数filename不能为空");//filename是要上传的文件的全路径+文件名
	}
	return $service.call(this._UMFile_upload, jsonArgs);//默认异步
}
function UMP$Services$UMFile$download(jsonArgs){
	/*
	var args = {
		url:upload.url,
		filename:"baidu.png",
		locate:"downloadTest/image",
		override:"true",
		callback:"downloadfromserverCB()"
	};
	*/
	if($isEmpty(jsonArgs.url)){
		alert("参数url不能为空");
	}
	if($isEmpty(jsonArgs.filename)){
		alert("参数filename不能为空");
	}
	if($isEmpty(jsonArgs.locate)){
		alert("参数locate不能为空");
	}
	if($isEmpty(jsonArgs.override)){
		alert("参数override不能为空");
	}
	if($isEmpty(jsonArgs.callback)){
		alert("参数callback不能为空");
	}
	
	return $service.call(this._UMFile_download, jsonArgs);//默认异步
}
UMP.Services.UMFile.prototype = {
	downloadFile : UMP$Services$UMFile$downloadFile,
	upload : UMP$Services$UMFile$upload,
	download : UMP$Services$UMFile$download
};
UMP.Services.UMFile.registerClass('UMP.Services.UMFile');
$file = new UMP.Services.UMFile();
//----------------------------------------------------------------------------END

//---------------------------------------------------------------------------------------------- $menu
UMP.Services.Menu = function UMP$Services$Menu(){
}
function UMP$Services$Menu$openDropDownList(args){
	/*
	var args = {
        controlid:"button1",
        dropDownListWidth:"200",
        dropItemsArray:[{
            name:"menu1",
            action:"menu1action()"
        },{
            name:"menu2",
            action:"menu2action()"
        },{
            name:"menu3",
            action:"menu3action()"
        }]
    }
	*/
	if(!$isJSONObject(args)){
		alert("调用$menu.openDropDownList()时的参数不是一个有效的JSONObject!");
	}
	$service.call("UMMenu.openDropDownList", args);

}
UMP.Services.Menu.prototype = {
	openDropDownList  : UMP$Services$Menu$openDropDownList 
};
UMP.Services.Menu.registerClass('UMP.Services.Menu');
$menu = new UMP.Services.Menu();

//----------------------------------------------------------------------------------- Validator
UMP.Services.Validator = function UMP$Services$Validator(){
}
function UMP$Services$Validator$isEmpty(obj){
	
	if ($isJSONObject(obj)) {
		return $isEmpty(obj);
	} else if ($isJSONArray(obj)) {
		for(var i=0, len = obj.length;i<len;i++){			
			return this.isEmpty(obj[i]);
		}
	}else{
		return true;
	}

}
function UMP$Services$Validator$isValidNumber(obj){
}
function UMP$Services$Validator$isJSONObject(obj){
    if ($isJSONObject(obj)) {
		alert("参数不是一个有效的JSONObject");
	}
}
UMP.Services.Validator.prototype = {
	isEmpty : UMP$Services$Validator$isEmpty,
	isValidNumber : UMP$Services$Validator$isValidNumber,
	isJSONObject : UMP$Services$Validator$isJSONObject
};
UMP.Services.Validator.registerClass('UMP.Services.Validator');
$validator = new UMP.Services.Validator();
