
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Element = function UMP$UI$Mvc$Element(){
	this._isAbs = true;
	this._id = "";
	this.tag = "";
}
//Public Method
function UMP$UI$Mvc$Element$getAttribute(name){	
	try{
		if(this._id){
			if($__isdebug()){
				//调试状态
				var ctl = $document.uiMD()[this._id];
				if(ctl){
					var val = ctl[name];
					return val;
				}else{
					alert("未找到id为"+this._id+"的控件，请检查!");
				}
			}else{
				return $controls.get(this._id, name);
			}
		}else{
			alert("该控件的id为[" + this._id+"]，请检查");
		}
	}catch(e){
		alert("调用控件[" + this._id+"]的getAttribute(\""+name+"\")方法出错");
	}
}
function UMP$UI$Mvc$Element$setAttribute(name, value){
	try{
		if(this._id){
			if($__isdebug()){
				//调试状态
				var ctl = $document.uiMD()[this._id];
				if(ctl){
					ctl[name] = value;
					return;
				}else{
					alert("未找到id为"+this._id+"的控件，请检查!");
				}
			}else{
				return $controls.set(this._id, name, value);
			}
		}else{
			alert("该控件的id为[" + this._id+"]，请检查");
		}
	}catch(e){
		alert("调用控件[" + this._id+"]的setAttribute(\""+name+"\",\""+value+"\")方法出错");
	}
}

function UMP$UI$Mvc$Element$isAbs(val){
    if(typeof val == "undefined")
        return this._isAbs;
    else 
        this._isAbs = val;
}
function UMP$UI$Mvc$Element$tag(tag){	
	if(typeof tag =="undefined"){
		return this.tag
	}else{
		this.tag = tag;
	}
}
function UMP$UI$Mvc$Element$id(id){	
	if(typeof id =="undefined"){
		return this._id;
	}else{
		this._id = id;
	}
}

//简写API
function UMP$UI$Mvc$Element$attr(name, value){
	if(arguments.length == 1){
		return this.getAttribute(name);
	}else if(arguments.length == 2){
		return this.setAttribute(name, value);
	}	
}

//以下暂不启用
function UMP$UI$Mvc$Element$get_visible(){
	return this.attr("visible");
}
function UMP$UI$Mvc$Element$set_visible(val){
	this.attr("visible", val);
}
function UMP$UI$Mvc$Element$get_disabled(){
	return this.attr("disabled");
}
function UMP$UI$Mvc$Element$set_disabled(val){
	this.attr("disabled", val);
}
function UMP$UI$Mvc$Element$get_background(){
	return this.attr("background");
}
function UMP$UI$Mvc$Element$set_background(val){
	this.attr("background", val);
}
function UMP$UI$Mvc$Element$background(val){	
	if(typeof val ==="undefined"){
		return this.get_background();
	}else{
		this.set_background(val);
	}	
}
function UMP$UI$Mvc$Element$animate(settings){
	if($anim)
		return $anim.animate(this.id(),settings);
}
UMP.UI.Mvc.Element.prototype = {	
	//HTML5 standard API
	/** 
	* 获取指定属性值
	* @param {String} name -  属性名
	* @return {Object}
	*/
	getAttribute: UMP$UI$Mvc$Element$getAttribute,	
	
	/** 
	* 设置指定属性值
	* @param {String} name -  属性名
	* @param {String} value -  属性值
	* @return {void}
	*/
	setAttribute: UMP$UI$Mvc$Element$setAttribute,
	
	/** 
	* 获取指定属性值
	* @param {String} name -  属性名
	* @return {Object}
	*/
	get: UMP$UI$Mvc$Element$getAttribute,	
	
	/** 
	* 设置指定属性值
	* @param {String} name -  属性名
	* @param {String} value -  属性值
	* @return {void}
	*/
	set: UMP$UI$Mvc$Element$setAttribute,

    /** 
	* 获取或设置指定属性值
	* @param {String} name -  属性名
	* @param {String} value -  属性值
	* @return {Object}
	*/	
	attr: UMP$UI$Mvc$Element$attr,
	
	//JQuery Style API
	isAbs: UMP$UI$Mvc$Element$isAbs,
	tag: UMP$UI$Mvc$Element$tag,
	id: UMP$UI$Mvc$Element$id,
	
	//
	/** 
	* 设置动画
	* @param {JSON} settings -  动画设置
	* @return {void}
	*/	
	animate: UMP$UI$Mvc$Element$animate
};
UMP.UI.Mvc.Element.registerClass('UMP.UI.Mvc.Element');
