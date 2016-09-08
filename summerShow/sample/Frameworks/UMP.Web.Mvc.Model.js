
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.Mvc.Model | UMP.Web.Event
// Author gct@yonyou.com
//-----------------------------------------------------------------------
Type.registerNamespace('UMP.Web.Mvc');
UMP.Web.Mvc.Model = function UMP$Web$Mvc$Model(id){
    this._id = id == null ? "" : id;
    this._type = "UMP.Web.Mvc.Model";
    this._fields = {};
    this._events = new UMP.Web.EventMgr();
    this._attrEvents = new UMP.Web.AttrEventMgr();
    /*
     this._events = {
     fielda : [function(){} , function(){}, function(){}],
     fieldb: [function(){} , function(){}, function(){}],
     fieldc : [function(){} , function(){}, function(){}]
     }
     */
}
//Public Method
function UMP$Web$Mvc$Model$id(){
    return this._id;
}
function UMP$Web$Mvc$Model$getType(){
    return this._type;
}
function UMP$Web$Mvc$Model$set(fieldName, val, silent){
    var oldValue = this._fields[fieldName];
    if(val != oldValue){
        this._fields[fieldName] = val;
        if(!silent){
            var args = {
                "onchange" : "onchange",
                "oldValue" : oldValue,
                "value" : this._fields[fieldName]
            }
            this.trigger("change", fieldName, args);
        }
    }
}
function UMP$Web$Mvc$Model$get(fieldName){
    return this._fields[fieldName];
}

function UMP$Web$Mvc$Model$add(key, val){
    this._fields[key] = val;
}
function UMP$Web$Mvc$Model$fields(){
    return this._fields;
}
function  UMP$Web$Mvc$Model$toJSON(){
    var result = {};
    for(var key in this._fields){
        if(this._fields[key].getType && (this._fields[key].getType() == "UMP.Web.Mvc.Model" || this._fields[key].getType() == "UMP.Web.Mvc.Collection")){
            var json = this._fields[key].toJSON();
            result[key] = json;
        }else{
            result[key] = this._fields[key];
        }
    }
    return result;
}
function UMP$Web$Mvc$Model$on(evtName, fieldName, handler){
    if(typeof handler == "undefined" && $isFunction(fieldName)){
        //没有指定fieldName，表示整个Model的事件
        this._events.on(evtName, fieldName);
    }else{
        this._attrEvents.on(evtName, fieldName, handler);
    }
}
function UMP$Web$Mvc$Model$trigger(evtName, fieldName, args){
    if(!args) args = {};
    if(typeof fieldName == "undefined"){
        //没有指定fieldName，表示整个Model的事件
        this._events.trigger(evtName, this, args);
    }else{
        args["fieldName"] = fieldName;
        args["data-bindfield"] = (this.id() != null && this.id() !="") ? this.id() +"."+fieldName : fieldName;
        this._attrEvents.trigger(evtName, fieldName, this, args);
    }
}
UMP.Web.Mvc.Model.prototype = {
    id : UMP$Web$Mvc$Model$id,
    getType : UMP$Web$Mvc$Model$getType,
    get : UMP$Web$Mvc$Model$get,
    set : UMP$Web$Mvc$Model$set,
    add : UMP$Web$Mvc$Model$add,
    fields : UMP$Web$Mvc$Model$fields,
    toJSON : UMP$Web$Mvc$Model$toJSON,
    on : UMP$Web$Mvc$Model$on,
    trigger : UMP$Web$Mvc$Model$trigger
};
UMP.Web.Mvc.Model.registerClass('UMP.Web.Mvc.Model');


UMP.Web.Mvc.Collection = function UMP$Web$Mvc$Collection(id){
    this._id = id;
    this._rows =[];
    this._type = "UMP.Web.Mvc.Collection";//记录类型
    this._events = new UMP.Web.EventMgr();
    this._attrEvents = new UMP.Web.AttrEventMgr();
    /*
     var _events = {
     rowChange : {
     colName1 : [function(){} , function(){}, function(){}],
     colName2: [function(){} , function(){}, function(){}],
     colName3 : [function(){} , function(){}, function(){}]
     },
     rowClick : {
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
//Public Method
function UMP$Web$Mvc$Collection$id(){
    return this._id;
}
function UMP$Web$Mvc$Collection$getType(){
    return this._type;
}
function UMP$Web$Mvc$Collection$model(fullName){
    var paths = fullName.split(".");
    var curModel = null;

    for(var i=0,len=paths.length;i<len;i++){
        var path = paths[i];
        curModel = curModel[path];
    }
    return CurrentModel[name];
}
function UMP$Web$Mvc$Collection$get(rowIndex, fieldName){
    var model = this._rows[rowIndex];
    var val = model.get(fieldName);
    return val;
}
function UMP$Web$Mvc$Collection$set(rowIndex, fieldName, fieldValue, silent){
    var model = this._rows[rowIndex];
    var oldValue = model.get(fieldName);
    if(oldValue==fieldValue)
        return;

    model.set(fieldName, fieldValue, silent);//静默赋值，无需触发change事件,由下面代码触发change事件
    if(!silent){
        var newValue = model.get(fieldName);
        var args = {
            e : this,
            rowIndex : rowIndex,
            fieldName : fieldName,
            srcValue : fieldValue,
            oldValue : oldValue,
            value : newValue
        };
        this.trigger("rowChange", fieldName, args);
        this.trigger("rowChange", args);
    }
}

function UMP$Web$Mvc$Collection$length(){
    return this._rows.length;
}
function UMP$Web$Mvc$Collection$add(json){
    //支持add({})
    if(json.getType && json.getType() == "UMP.Web.Mvc.Model"){
        this._rows.push(json);
    }else if($isJSONObject(json)){
        var newM = new UMP.Web.Mvc.Model(json);
        this._rows.push(newM);
    }
}
function UMP$Web$Mvc$Collection$rows(){
    return this._rows;
}

function UMP$Web$Mvc$Collection$toJSON(){
    var result = [];
    for(var i=0,len=this._rows.length;i<len;i++){
        var md = this._rows[i];
        if(md.getType && md.getType() == "UMP.Web.Mvc.Model"){
            var json = md.toJSON();
            result.push(json);
        }else{
            alert("数组含有不是有效的Model类型");
        }
    }
    return result;
}
function UMP$Web$Mvc$Collection$on(evtName, fieldName, handler){
    if(typeof handler == "undefined" && $isFunction(fieldName)){
        this._events.on(evtName, fieldName);
    }else{
        this._attrEvents.on(evtName, fieldName, handler);
    }
}
function UMP$Web$Mvc$Collection$trigger(evtName, fieldName, args){
    if(typeof args == "undefined"){
        args = fieldName;
        //没有指定fieldName，表示整个Model的事件
        this._events.trigger(evtName, this, args);
    }else{
        this._attrEvents.trigger(evtName, fieldName, this, args);
    }
}

UMP.Web.Mvc.Collection.prototype = {
    id : UMP$Web$Mvc$Collection$id,
    getType: UMP$Web$Mvc$Collection$getType,
    length : UMP$Web$Mvc$Collection$length,
    model : UMP$Web$Mvc$Collection$model,
    get : UMP$Web$Mvc$Collection$get,
    set : UMP$Web$Mvc$Collection$set,
    add : UMP$Web$Mvc$Collection$add,
    rows : UMP$Web$Mvc$Collection$rows,
    toJSON : UMP$Web$Mvc$Collection$toJSON,
    on : UMP$Web$Mvc$Collection$on,
    trigger : UMP$Web$Mvc$Collection$trigger
};
UMP.Web.Mvc.Collection.registerClass('UMP.Web.Mvc.Collection');
