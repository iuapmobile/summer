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
UMP.UI.Mvc.Property = function UMP$UI$Mvc$Property(){
	//1、常量
	this._tag = "field";
	
	//2、Attribute
	this._attrs = {};
	
	//3、Event
	this._events = {};
}
//Public Method
function UMP$UI$Mvc$Property$tag(){    
	return this._tag;
}
function UMP$UI$Mvc$Property$attrs(){
	return this._attrs;
}
function UMP$UI$Mvc$Property$attr(attrName,attrValue){
	if(typeof attrValue === "undefined"){
		return this.attrs()[attrName];
	}else{
		this.attrs()[attrName] = attrValue;
	}
}

//Concrete Ower Attribute API
//采用简写形式 id()  而不提供get_id()  set_id()
function UMP$UI$Mvc$Property$id(val){
	if(typeof val === "undefined"){
		return this.attr("id");
	}else{
		this.attr("id",val);
	}
}
function UMP$UI$Mvc$Property$type(val){
	if(typeof val === "undefined"){
		return this.attr("type");
	}else{
		this.attr("type",val);
	}
}

////Event API
function UMP$UI$Mvc$Property$attachEvent(eventName,handler) {
    this._events[eventName].push(handler);
}
function UMP$UI$Mvc$Property$detachEvent(eventName,handler) {	
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
function UMP$UI$Mvc$Property$fireEvent(eventName) {
    var handlers = this._events[eventName];
	for(var i=0,len=handlers.length;i<len;i++){
	    var func = handlers[i];
		var agrs={
		    "eventName":eventName,
			"fieldName":this.id()
		};
		
		func(this,args);
	}
}	
UMP.UI.Mvc.Property.prototype = {
	tag: UMP$UI$Mvc$Property$tag,
	attrs: UMP$UI$Mvc$Property$attrs,
	attr: UMP$UI$Mvc$Property$attr,	
	id: UMP$UI$Mvc$Property$id,	
	type: UMP$UI$Mvc$Property$type
	/*
	attachEvent: UMP$UI$Mvc$Property$attachEvent,
    detachEvent: UMP$UI$Mvc$Property$detachEvent,
	fireEvent: UMP$UI$Mvc$Property$fireEvent
	*/
};
UMP.UI.Mvc.Property.registerClass('UMP.UI.Mvc.Property');
