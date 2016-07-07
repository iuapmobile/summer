/************************************ UAP Mobile 2.0 SP1 JS Framework *********************************/

/*  splice
1.删除-用于删除元素，两个参数，第一个参数（要删除第一项的位置），第二个参数（要删除的项数） 
2.插入-向数组指定位置插入任意项元素。三个参数，第一个参数（其实位置），第二个参数（0），第三个参数（插入的项） 
3.替换-向数组指定位置插入任意项元素，同时删除任意数量的项，三个参数。第一个参数（起始位置），第二个参数（删除的项数），第三个参数（插入任意数量的项） 
var lang = ["php","java","javascript"]; 
//删除 
var removed = lang.splice(1,1); 
alert(lang); //php,javascript 
alert(removed); //java ,返回删除的项 
//插入 
var insert = lang.splice(0,0,"asp"); //从第0个位置开始插入 
alert(insert); //返回空数组 
alert(lang); //asp,php,javascript 
//替换 
var replace = lang.splice(1,1,"c#","ruby"); //删除一项，插入两项 
alert(lang); //asp,c#,ruby 
alert(replace); //php,返回删除的项 

*/
/*  Entity-->Context、property-->Field
1、提供get set
2、提供change事件
*/
UMP.UI.Mvc.Field = function UMP$UI$Mvc$Field(id, value, property){	
	this.__property = property;	
	this._id = null;
	this._value = value;
	
	this._events = {};
	
	
	
	//如果有property，则构建Field，property是Field的元数据
	if(this.__property)
		this._id = this.__property.id();
		
	this.__CONST_EVENT_ONCHANGE = "onchange";
}

function UMP$UI$Mvc$Field$id(val){
	if(val == undefined){
		return this._id;
	}else{
		this._id = val;
	}
	
}

function UMP$UI$Mvc$Field$get(){
    return this._value;
}
function UMP$UI$Mvc$Field$set(val){    
	if(this._value == val)
		return;
	
	var oldValue = this._value;
	this._value = val;
	
	/*
	var args = {
		eventSrc : this,
		id: this.id(),
		oldValue : oldValue,
		newValue : val
	};
	this.fireEvent(this.__CONST_EVENT_ONCHANGE, args);
	*/	
}
function UMP$UI$Mvc$Field$val(val){
	if(val == undefined){
		return this.get();
	}else{
		this.set(val);
	}
}
//change event
/*
function UMP$UI$Mvc$Field$add_onchange(handler) {	
	var chs = this._changeEvents;
	chs[chs.length] = handler;	
}
function UMP$UI$Mvc$Field$remove_onchange(handler) {	
	var chs = this._changeEvents;
	
	if(chs){
		var index = -1;
		for(var i=0,len = chs.length;i<len;i++){
			if(chs[i] == handler){
				index = i;
				break;
			}
		}
		if(index >= 0){
			var removed = chs.splice(index,1); 
			return removed;
		}else{
			alert("没有这样的handler:" +handler.toString());
		}
	}
}
*/
function UMP$UI$Mvc$Field$raiseonchange(args) {    	
    var chs = this._changeEvents;
	
	for(var i=0,len = chs.length;i<len;i++){
		var ch = chs[i];
		ch(this, args);
	}    
}

function UMP$UI$Mvc$Field$attachEvent(eventName,handler) {
    this._events[eventName].push(handler);	
}
function UMP$UI$Mvc$Field$detachEvent(eventName,handler) {	
	var handlers = this._events[eventName];
	
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
function UMP$UI$Mvc$Field$fireEvent(eventName, args) {
    var handlers = this._events[eventName];
	if(handlers){
		for(var i=0,len=handlers.length;i<len;i++){
			var func = handlers[i];			
			func(this,args);
		}
	}
}	
UMP.UI.Mvc.Field.prototype = {
	id: UMP$UI$Mvc$Field$id,	
	get: UMP$UI$Mvc$Field$get,
	set: UMP$UI$Mvc$Field$set,
	val: UMP$UI$Mvc$Field$val


	
	/*
	attachEvent: UMP$UI$Mvc$Field$attachEvent,
    detachEvent: UMP$UI$Mvc$Field$detachEvent,
	fireEvent: UMP$UI$Mvc$Field$fireEvent	
	*/
};
UMP.UI.Mvc.Field.registerClass('UMP.UI.Mvc.Field');
