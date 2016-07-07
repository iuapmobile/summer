/*
<contexts>
  <context id="order" from-type="mbe" filter="" iscascade="false">
    <field id="a" type="string"/>
    <field id="b" type="string"/>
    <field id="c" type="string"/>
    <fieldset id="lines" from="orderline" type="string" relation="n" parent-field="" child-field="" from-type="mbe" iscascade="false">
      <field id="la" type="string"/>
      <field id="lb" type="string"/>
      <field id="lc" type="string"/>
    </fieldset>
  </context>
</contexts>
*/

Type.registerNamespace('UMP.UI.Mvc');
//Entity 的tag有两类
//1、Context对应的context
//2、Contect对应的fieldset
UMP.UI.Mvc.Entity = function UMP$UI$Mvc$Entity(tag, ns){
	//0、常量	
    this._tag = tag;//"context"  or  "fieldset"
	
	//1、名空间，来自根节点Contexts 的namespace
	this._namespace = ns;//"context"  or  "fieldset"
    
	//2、Attribute
	this._attrs = {};
	
	//3、_fields
	this._fields = {};
	
	//4、Event
	this._events = {};
}
////Attribute API
//Public Method
function UMP$UI$Mvc$Entity$tag(){    
	return this._tag;
}
function UMP$UI$Mvc$Entity$namespace(ns){
	if(ns == undefined)
		return this._namespace;
	else
		this._namespace = ns;
}
function UMP$UI$Mvc$Entity$attrs(){
	return this._attrs;
}
function UMP$UI$Mvc$Entity$attr(attrName,attrValue){
	if(attrValue == undefined){
		return this.attrs()[attrName];
	}else{
		this.attrs()[attrName] = attrValue;
	}
}

function UMP$UI$Mvc$Entity$id(val){
	if(val == undefined){
		return this.attr("id");
	}else{
		this.attr("id",val);
	}
}

////Property API
function UMP$UI$Mvc$Entity$properties(){
	return this._fields;
}

//返回值可能是fieldset or field
function UMP$UI$Mvc$Entity$property(id){	
	return this.properties()[id];	
}
function UMP$UI$Mvc$Entity$addProperty(prop){
	this.properties()[prop.id()] = prop;
}
function UMP$UI$Mvc$Entity$removeProperty(id){
    delete this.properties()[id];
}

//onchange API
function UMP$UI$Mvc$Entity$add_onchange(handler) {
	this._changeEvents[this._changeEvents.length] = handler;	
}
function UMP$UI$Mvc$Entity$remove_onchange(handler) {
	delete this._changeEvents[this._changeEvents.length];	
}
function UMP$UI$Mvc$Entity$raiseonchange(args) {    	
    var chs = this._changeEvents;
	
	for(var i=0,len = chs.length;i<len;i++){
		var ch = chs[i];
		ch(this, args);
	}    
}

////Event API
function UMP$UI$Mvc$Entity$attachEvent(eventName,fieldName,handler) {
    if(!this._events[eventName])
		this._events[eventName] = {};
	
	if(!this._events[eventName][fieldName])
		this._events[eventName][fieldName] = [];	
		
	this._events[eventName][fieldName].push(handler);	
}
function UMP$UI$Mvc$Entity$detachEvent(eventName,fieldName,handler) {	
	if(!this._events[eventName]) return;
	
	var handlers = this._events[eventName][fieldName];
	
	if(!handlers) return;
	
	var index = -1;
	for(var i=0,len = handlers.length;i<len;i++){
		if(handlers[i] == handler){
			index = i;
			break;
		}
	}
	if(index >= 0){
		var removed = handlers.splice(index,1); //试一试 delete handlers[index]
		return removed;
	}else{
		alert("没有这样的handler:" +handler.toString());
	}
}
function UMP$UI$Mvc$Entity$fireEvent(eventName,fieldName,args) {
	if(this._events[eventName]){
		var handlers = this._events[eventName][fieldName];
		if(handlers){
			for(var i=0,len=handlers.length;i<len;i++){
				var func = handlers[i];
				if(args == undefined){
					args = {
						"eventName":eventName,
						"fieldName":fieldName
					};
				}
				func(this,args);
			}
		}
	}	
}
UMP.UI.Mvc.Entity.prototype = {
	tag: UMP$UI$Mvc$Entity$tag,
	namespace: UMP$UI$Mvc$Entity$namespace,
	/*
	get_id: UMP$UI$Mvc$Entity$get_id,
	get_fromtype: UMP$UI$Mvc$Entity$get_fromtype,
	get_filter: UMP$UI$Mvc$Entity$get_filter,
	get_iscascade: UMP$UI$Mvc$Entity$get_iscascade,
	*/
	
	attrs: UMP$UI$Mvc$Entity$attrs,
	attr: UMP$UI$Mvc$Entity$attr,	
	
	id: UMP$UI$Mvc$Entity$id,	
	
	properties: UMP$UI$Mvc$Entity$properties,
	property: UMP$UI$Mvc$Entity$property,
	fields: UMP$UI$Mvc$Entity$properties,
	field: UMP$UI$Mvc$Entity$property,
	get: UMP$UI$Mvc$Entity$property,
	
	addProperty: UMP$UI$Mvc$Entity$addProperty,
	removeProperty: UMP$UI$Mvc$Entity$removeProperty,
	
	
	add_onchange: UMP$UI$Mvc$Entity$add_onchange,
    remove_onchange: UMP$UI$Mvc$Entity$remove_onchange,
	raiseonchange: UMP$UI$Mvc$Entity$raiseonchange,	
	
	attachEvent: UMP$UI$Mvc$Entity$attachEvent,
	detachEvent: UMP$UI$Mvc$Entity$detachEvent,
	fireEvent: UMP$UI$Mvc$Entity$fireEvent
};
UMP.UI.Mvc.Entity.registerClass('UMP.UI.Mvc.Entity');