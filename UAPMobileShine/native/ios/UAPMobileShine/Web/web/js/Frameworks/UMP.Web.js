
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
//-----------------------------------------------------------------------
// UAP Mobile Web js



UM_CallAction=function(){
	
}
UM_CallRemoteService=function(serviceName,actionName,params,contextSource,contextKey){
	
}
SysHelper=function(){
}
SysHelper.prototype.navigate=function(viewid){

}
SysHelper.prototype.callAction=function(actionid){

}
UM_Sys=new SysHelper();
//
ControlsHelper=function(){
}
ControlsHelper.prototype.get=function(cid){
	this._cid = cid;
    return this;
}
ControlsHelper.prototype.set=function(attrid,value){

}
ControlsHelper.prototype.call=function(methodname,param){

}
UM_Controls=new ControlsHelper();
//
ContextHelper=function(){
}
ContextHelper.prototype.init=function(ctx){
    
	this._ctx = ctx;
    return this;
}
ContextHelper.prototype.setValue=function(propname,value){
	if(eval("this._ctx."+propname)==null){alert("error!  no property: "+propname);}else{
        eval("this._ctx."+propname+"=\""+value+"\"");
    }
}
ContextHelper.prototype.getValue=function(propname){
    if(eval("this._ctx."+propname)==null){alert("error!  no property: "+propname);}else{
        return eval("this._ctx."+propname);
    }
}
UM_Context=new ContextHelper();

CommonNativeCallService=function(){
	this.GetDeviceData = "um_getDevicedata";
	this.GetUserData = "um_getUserData";
	this.GetAppData = "um_getAppData";
	this.GetAppConfigData = "um_getAppConfigData";
	this.CallTel="um_CallTel";
	this.SendMsg="um_SendMsg";
	this.IsConnect = "um_IsConnect";
	this.GetCurrentLanguage = "um_GetCurrentLanguage";
	this.GetCurrentLocation = "um_GetCurrentLocation";
    //
    this.Store = "um_Store";
    this.Restore = "um_Restore";
}
//
CommonNativeCallService.prototype.store=function(key,value){

    
}
CommonNativeCallService.prototype.reStore=function(key){
	

}
//设备信息公共服务
CommonNativeCallService.prototype.getDeviceData=function(){
	

}
CommonNativeCallService.prototype.getUserData=function(){

}
CommonNativeCallService.prototype.getAppData=function(){

}
CommonNativeCallService.prototype.getAppConfigData=function(){

}
//公共服务设备调用
//打电话
CommonNativeCallService.prototype.callTel=function(tel){  

}
//发短信
CommonNativeCallService.prototype.sendMsg=function(tel,msg){

}
//网络是否连接
CommonNativeCallService.prototype.isConnect=function(){

}
//语言环境
CommonNativeCallService.prototype.getCurrentLanguage=function(){

}

//GPS info
CommonNativeCallService.prototype.getCurrentLocation=function(){
    return UM_callNativeService(this.GetCurrentLocation);
}
CommonNativeCallService.prototype.callService=function(serviceType,serviceparams){

}
UM_NativeCall = new CommonNativeCallService();

if(typeof alert == 'undefined'){
	alert = function(args){
		debugger;
	}
}
if(typeof adrinvoker == 'undefined'){
	adrinvoker = function(args){
		debugger;
	}
	adrinvoker.call2 = function(svrName, args, isSync){
		var str = "执行原生服务adrinvoker.call2(name, args)\n"; 
		str += "--name : " + svrName + "\n";
		str += "--args : " + args;
		alert(str);
		$console.log(str);
	}
	adrinvoker.call = function(svrName, args, isSync){
		var str = "执行原生服务adrinvoker.call(name, args)\n"; 
		str += "--name : " + svrName + "\n";
		str += "--args : " + args;
		alert(str);
		$console.log(str);
	}
}

if(typeof console == 'undefined'){
	console = function(args){
		debugger;
	}
}