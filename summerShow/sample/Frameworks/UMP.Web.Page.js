
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.Page | UMP.Web.EventMgr 
// Author gct@yonyou.com 
//-----------------------------------------------------------------------
Type.registerNamespace('UMP.Web');
UMP.Web.Page = function UMP$Web$Page(){
	this._events = new UMP.Web.EventMgr()
	/*
	this._events = {
		"oninit" :[function(){},function(){}],
		"onload" :[function(){},function(){}]
	}
	*/
}
function UMP$Web$Page$onInit(){
	this.trigger("onInit");
}
function UMP$Web$Page$onLoad(){
	this.trigger("onLoad");
}
function UMP$Web$Page$beforeBinding(){
	this.trigger("beforeBinding");
}
function UMP$Web$Page$afterBinding(){
	this.trigger("afterBinding");
}
function  UMP$Web$Page$on(evtName, handler){
	this._events.on(evtName, handler);
}
function UMP$Web$Page$off(evtName, handler){
	this._events.off(evtName, handler);
}
function UMP$Web$Page$trigger(evtName){
	this._events.trigger(eveName);
}
UMP.Web.Page.prototype = {
	onInit : UMP$Web$Page$onInit,	
	onLoad : UMP$Web$Page$onLoad,
	beforeBinding : UMP$Web$Page$beforeBinding,
	afterBinding : UMP$Web$Page$afterBinding,
	on : UMP$Web$Page$on,
	off : UMP$Web$Page$off,
	trigger : UMP$Web$Page$trigger
};
UMP.Web.Page.registerClass('UMP.Web.Page');
