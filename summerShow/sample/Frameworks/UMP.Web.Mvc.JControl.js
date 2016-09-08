
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.Mvc.JControl
// Author gct@yonyou.com
//-----------------------------------------------------------------------

Type.registerNamespace('UMP.Web.Mvc');
UMP.Web.Mvc.JControl = function UMP$Web$Mvc$JControl(element){
    this._element = element;
    this._attrs = {};
    this._events = new UMP.Web.AttrEventMgr();
    /*
     var __evts = {
     onchange : {
     value : [function(){} , function(){}, function(){}],
     background: [function(){} , function(){}, function(){}],
     height : [function(){} , function(){}, function(){}]
     },
     onvaluechange : {
     value : [function(){} , function(){}, function(){}],
     background: [function(){} , function(){}, function(){}],
     height : [function(){} , function(){}, function(){}]
     },
     event1 : {
     value : [function(){} , function(){}, function(){}],
     background: [function(){} , function(){}, function(){}],
     height : [function(){} , function(){}, function(){}]
     }
     }
     */
}
function UMP$Web$Mvc$JControl$initialize(){

}
//Public Method
function UMP$Web$Mvc$JControl$set(attr, val){
    var oldValue = this._attrs[attr];
    if(val != oldValue){
        this._attrs[attr] = val;
        var args = {
            "oldValue" : oldValue,
            "value" : this._attrs[attr]
        }

        //$(this._element).trigger("change");//子类触发jquery的事件
        //this._element.dispatchEvent
        this.trigger("change", attr, args);
    }
}
function UMP$Web$Mvc$JControl$get(attr){
    return this._attrs[attr];
}
function UMP$Web$Mvc$JControl$on(evtName, attrName, handler){
    if(typeof handler == "undefined" && $isFunction(attrName)){
        //没有指定 attrName，默认value
        handler = attrName;
        attrName = "value";
    }
    this._events.on(evtName, attrName, handler);
}
function UMP$Web$Mvc$JControl$trigger(evtName, attrName, args){
    this._events.trigger(evtName, attrName, this, args)
}
UMP.Web.Mvc.JControl.prototype = {
    initialize : UMP$Web$Mvc$JControl$initialize,
    set : UMP$Web$Mvc$JControl$set,
    get : UMP$Web$Mvc$JControl$get,
    on : UMP$Web$Mvc$JControl$on,
    trigger : UMP$Web$Mvc$JControl$trigger
};
UMP.Web.Mvc.JControl.registerClass('UMP.Web.Mvc.JControl');
