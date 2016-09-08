
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com 
//-----------------------------------------------------------------------
Type.registerNamespace('UMP.Web');
UMP.Web.EventMgr = function UMP$Web$EventMgr(){
	this._events = {};
	/*
	this._events = {
		"oninit" :[function(){},function(){}],
		"onload" :[function(){},function(){}]
	}
	*/
}
function  UMP$Web$EventMgr$on(evtName, handler){
	if(typeof evtName == "undefined"){
		alert("没有指定事件名");
	}
	if(!$isFunction(handler)){
		alert("请指定"+evtName+"的function");
	}
	if(this._events[evtName] == null){
		this._events[evtName] = [];
	}
	this._events[evtName].push(handler);
}
function UMP$Web$EventMgr$off(evtName, handler){
	var handlers = this._events[evtName];
	if(typeof handler == "undefined"){
		delete handlers;
	}else{
		var index = -1;
		for(var i=0,len=handlers.length;i<len;i++){
			if(handler == handlers[i]){
				index = i;
				break;
			}
		}
		if(index > 0)
			handlers.remove(index);
	}
}
function UMP$Web$EventMgr$trigger(evtName, sender, args){
	var handlers = this._events[evtName];
	for(var i=0,len=handlers.length;i<len;i++){
		var handler = handlers[i];
		if($isFunction(handler)){
			args["evtName"] = evtName;
			handler(sender, args);
		}else{
			alert("触发"+evtName+"时，不是有效的function");
		}
	}
}
UMP.Web.EventMgr.prototype = {
	on : UMP$Web$EventMgr$on,
	off : UMP$Web$EventMgr$off,
	trigger : UMP$Web$EventMgr$trigger
};
UMP.Web.EventMgr.registerClass('UMP.Web.EventMgr');

UMP.Web.AttrEventMgr = function UMP$Web$AttrEventMgr(){
	this._events = {};
	/*
	this._events = {
		"change" :{
			"value" : function(){},
			"backgroud":function(){}
		},
		"click" :{
			""function(){},function(){}]
	}
	*/
}
function UMP$Web$AttrEventMgr$on(evtName, attrName, handler){
	if(typeof this._events[evtName] == "undefined")
		this._events[evtName] = {};
		
	if(!this._events[evtName][attrName]){
		this._events[evtName][attrName] = [];
	}
	
	this._events[evtName][attrName].push(handler);
}
function UMP$Web$AttrEventMgr$trigger(evtName, attrName, sender, args){
	if(!args) args = {};
	if(typeof this._events[evtName] == "undefined") return;
			
	if(evtName && attrName){
		var handlers = this._events[evtName][attrName];
		for(var i=0,len=handlers.length;i<len;i++){
			var handler = handlers[i];
			if($isFunction(handler)){
				args["evtName"] = evtName;
				args["attrName"] = attrName;
				handler(sender, args);
			}else{
				alert("触发["+evtName+":"+attrName+"]时，不是一个有效的function");
			}
		}
	}else if(evtName){
		var attrs = this._events[evtName];
		for(attr in attrs){
			var handlers = this._events[evtName][attr];
			for(var i=0,len=handlers.length;i<len;i++){
				var handler = handlers[i];
				if($isFunction(handler)){
					args["evtName"] = evtName;
					args["attrName"] = attr;
					handler(sender, args);
				}
			}
		}
	}
}
UMP.Web.AttrEventMgr.prototype = {
	on : UMP$Web$AttrEventMgr$on,
	trigger : UMP$Web$AttrEventMgr$trigger
};
UMP.Web.AttrEventMgr.registerClass('UMP.Web.AttrEventMgr');