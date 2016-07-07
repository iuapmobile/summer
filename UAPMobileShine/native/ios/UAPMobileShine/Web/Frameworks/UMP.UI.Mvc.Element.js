
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Element = function UMP$UI$Mvc$Element(tag){
	this._isAbs = true;
	this._id = "";
	this._tag = tag;
	
	this._attrs = {};//非抽象Element时，才有意义
	
	this._children = {};
	this._isListChild = false;
	this._listChildInfo = {groupIndex:-1, rowIndex:-1, listId:""};
	this._listChildInfo = {};
}
//Public Method
function UMP$UI$Mvc$Element$getAttribute(name){	

	try{
		if(!this._isAbs){
			return this._attrs[name];	
		}else{
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
						if(this._isListChild){
							var listId = this._listChildInfo.listId;
							var groupIndex = this._listChildInfo.groupIndex;
							var rowIndex = this._listChildInfo.rowIndex;
							if(groupIndex == null){
								return $service.call("UMJS.getListProperty", { "controlId":listId, "rowindex":rowIndex,"childcontrolId":this._id, "propertyname":name}, true);
							}else{
								var args = { "controlId":listId, 
									"groupindex":groupIndex,
									"childcontrolId":this._id, 
									"propertyname":name
								}
								if(rowIndex >= 0){
									args["childindex"] = rowIndex;
								}
								return $service.call("UMJS.getListProperty", args, true);
							}
						} else {
							return $controls.get(this._id, name);
						}
					}
				}else{
					alert("该控件的id为[" + this._id+"]，请检查");
				}
		}
	}catch(e){
		alert("调用控件[" + this._id+"]的getAttribute(\""+name+"\")方法出错");
	}
}
function UMP$UI$Mvc$Element$setAttribute(name, value){
	try{
		if(arguments.length == 1 && !$isJSONObject(name)){
			alert("调用Element的set方法只有一个参数时，参数必须是一个有效的JSONObject");
			return;
		}
		if(arguments.length != 1 && arguments.length !=2){
			alert("Element的set方法仅支持1或2个参数");
			return;
		}
							
		if(!this._isAbs){//动态创建控件时
			if(arguments.length == 1){
				if($isJSONObject(name)){
					this._attrs = name;
				}else{
					alert("调用Element的set方法时，参数不是一个有效的JSONObject")
				}				
			}else{
				if(name == "id"){
					this._id = value;
				}else{
					this._attrs[name] = value;
				}
			}
		}else{
			if(this._id){//直接调用原生服务时
				if($__isdebug()){
					//调试状态
					var ctl = $document.uiMD()[this._id];
					if(!ctl){
						console.log("未找到id为"+this._id+"的控件，请检查!动态返回一个抽象控件!!!!");
						return;
					}
					if(arguments.length == 1){
						for(prop in name){
							ctl[prop] = name[prop];
						}
						return;
					}else{						
						ctl[name] = value;
						return;						
					}
				}else{
					//非调试状态
					if(this._isListChild){//设置列表行内子控件
						if(arguments.length == 1 && !$isJSONObject(name)){
							alert("调用Element的set方法只有一个参数时，参数必须是一个有效的JSONObject");
							return;
						}
						if(arguments.length != 1 && arguments.length !=2){
							alert("Element的set方法仅支持1或2个参数");
							return;
						}			
						var args = {};
						if(arguments.length == 1){
							args = name;
						}else if(arguments.length == 2){
							args[name] = value;
						}
						
						if(this._listChildInfo.groupIndex != null){
							args["groupindex"] = this._listChildInfo.groupIndex;
							if(this._listChildInfo.rowIndex >= 0){
								args["childindex"] = this._listChildInfo.rowIndex;
							}
						}else{
							args["rowindex"] = this._listChildInfo.rowIndex;
						}							
						args["controlId"] = this._listChildInfo.listId;						
						args["childcontrolId"] = this._id;
						
						return $service.call("UMJS.setListProperty", args, false);
					}else{
						if(arguments.length == 1){
							if($isJSONObject(name)){
								var args = name;
								args["id"] = this._id;
								return $service.call("UMJS.setProperty", args, false);
							}else{
								alert("调用Element的set方法时，参数不是一个有效的JSONObject")
							}		
						}else if(arguments.length ==2){	
							return $controls.set(this._id, name, value);
						}
					}
				}
			}else{
				alert("该控件的id为[" + this._id+"]，请检查");
			}
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
		return this._tag
	}else{
		this._tag = tag;
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
function UMP$UI$Mvc$Element$animate(settings, callback){
	if($anim)
		return $anim.animate(this.id(),settings,callback);
	else
		alert("无法调用控件["+this.id()+"]的[animate]方法");
}
function UMP$UI$Mvc$Element$refresh(){
	if($js)
		return $js.refresh({id:this.id()});
	else
		alert("无法调用控件["+this.id()+"]的[refresh]方法");
}
function UMP$UI$Mvc$Element$insert(index, content){
	try{
		if(this._id){
			if($__isdebug()){
				//调试状态
				var ctl = $document.uiMD()[this._id];
				if(ctl){
					//插入逻辑还未实现
					return;
				}else{
					alert("未找到id为"+this._id+"的控件，请检查!");
				}
			}else{
				var args = {};
				args["id"] = this._id;
				if(arguments.length == 2 && index !=null && content != null){
					args["index"] = index;
					args["content"] = content;
				}else if(arguments.length == 1){
					//只有一个参数时，认为一定是 content
					args["content"] = index;
				}
				
				return $controls.insert(args);
			}
		}else{
			alert("该控件的id为[" + this._id+"]，请检查");
		}
	}catch(e){
		alert("调用控件[" + this._id+"]的 insert()方法出错");
	}
}
function UMP$UI$Mvc$Element$focus(){
	try{
		if(this._id){
			if($__isdebug()){
				//调试状态
				var ctl = $document.uiMD()[this._id];
				if(ctl){
					//获得焦点
					return;
				}else{
					alert("未找到id为"+this._id+"的控件，请检查!");
				}
			}else{
				return $controls.focus({id:this._id});
			}
		}else{
			alert("该控件的id为[" + this._id+"]，请检查");
		}
	}catch(e){
		alert("调用控件[" + this._id+"]的 focus()方法出错");
	}
}
function UMP$UI$Mvc$Element$blur(){
	try{
		if(this._id){
			if($__isdebug()){
				//调试状态
				var ctl = $document.uiMD()[this._id];
				if(ctl){
					//失去焦点
					return;
				}else{
					alert("未找到id为"+this._id+"的控件，请检查!");
				}
			}else{
				return $controls.blur({id:this._id});
			}
		}else{
			alert("该控件的id为[" + this._id+"]，请检查");
		}
	}catch(e){
		alert("调用控件[" + this._id+"]的 blur()方法出错");
	}
}

function UMP$UI$Mvc$Element$isListChild(val){
	if(typeof val == "undefined"){
		return this._isListChild;
	}else{
		if(val != null && (val.toString().toLowerCase() == "true"))
			this._isListChild = true;
		else
			this._isListChild = false;
	}
}
function UMP$UI$Mvc$Element$listChildInfo(json){
	if(typeof json == "undefined"){
		return this._listChildInfo;
	}else{
		if($isJSONObject(json)){
			this._listChildInfo = json;
		}else{
			alert("listChildInfo()的参数不是一个有效的JSON");			
		}
	}
}

function UMP$UI$Mvc$Element$find(groupIndex, rowIndex, id){	
	if(arguments.length == 2){
		id = rowIndex;
		rowIndex = groupIndex;
		groupIndex = null;
	}else if(arguments.length == 3){
		
	}else{
		alert("find()目前仅支持2、3个参数")
	}
	
	var _childId = ""
	if(groupIndex == null){
		_childId = this._id + "_" + "_" + rowIndex + "_" + id
	}else{
		_childId = this._id + "_" + groupIndex + "_" + rowIndex + "_" + id
	}
	if(!this._children[_childId]){		
		//create temp a object dynamically
		var ele = $document.createAbsElement();
		ele.isListChild(true);
		if(groupIndex == null){
			ele.listChildInfo({
				rowIndex:rowIndex, 
				listId:this._id
			});
		}else{
			ele.listChildInfo({
				groupIndex:groupIndex, 
				rowIndex:rowIndex, 
				listId:this._id
			});
		}
		ele.id(id);
		
		this._children[_childId] = ele;
	}
	return this._children[_childId];
}
function UMP$UI$Mvc$Element$attrs(json){
	if(typeof json =="undefined"){
		return this._attrs
	}else{
		this._attrs = json;
	}
}
function UMP$UI$Mvc$Element$appendChild(ele){
	if(ele.id()==null || ele.id() == ""){
		alert("向控件[" +this._id+ "]添加控件时，没有设置子控件的id，请确保id非空且唯一");
		return;
	}
	
	var args = {
		"parent" : this._id,
		"tag" : ele.tag(),
		"id" : ele.id(),
		"attributes" : ele.attrs()
	}
	return $service.call("UMJS.createControl", args, false);
}
function UMP$UI$Mvc$Element$removeAllChild(){
	if(this._id == null || this._id == ""){
		alert("调用控件[" +this._id+ "]的removeAllChild()时，没有设置该控件id");
		return;
	}
	var args = {		
		"controlid" : this._id
	}
	return $service.call("UMJS.removeAllControl", args, false);
}
function UMP$UI$Mvc$Element$insertChild(index, ele){
	if(arguments.length != 2){
		alert("调用控件[" +this._id+ "]的insertChild()方法时，参数数量不匹配，必须为2个");
	}
	if(ele.id()==null || ele.id() == ""){
		alert("向控件[" +this._id+ "]添加控件时，没有设置子控件的id，请确保id非空且唯一");
		return;
	}
	
	var args = {
		"parent" : this._id,
		"index" : index,
		"tag" : ele.tag(),
		"id" : ele.id(),
		"attributes" : ele.attrs()
	}
	return $service.call("UMJS.createControl", args, false);
}
function UMP$UI$Mvc$Element$remove(){
	if(this._id == null || this._id == ""){
		alert("调用控件[" +this._id+ "]的remove()时，没有设置该控件id");
		return;
	}
	var args = {		
		"controlid" : this._id
	}
	return $service.call("UMJS.removeControl", args, false);
}
function UMP$UI$Mvc$Element$initListChildItem(json){
	var itemtype = null;
	
	if(json.groupindex == undefined){		
		itemtype = "child";
	}else{
		itemtype = "group";
	}
	json["itemtype"] = itemtype;
	
	this.set("itemsource", json);
}
function UMP$UI$Mvc$Element$initListGroupItem(json){
	json["itemtype"] = "group";
		
	this.set("itemsource", json);
}
function UMP$UI$Mvc$Element$initListItem(json){
	if(!$isJSONObject(json)){
		alert("createItem方法的参数不是一个有效的JSONObject");
		return;
	}
	this.set("itemsource", json);
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
	refresh : UMP$UI$Mvc$Element$refresh,
	insert : UMP$UI$Mvc$Element$insert,
	focus : UMP$UI$Mvc$Element$focus,
	blur : UMP$UI$Mvc$Element$blur,
	
	isListChild : UMP$UI$Mvc$Element$isListChild,
	listChildInfo : UMP$UI$Mvc$Element$listChildInfo,
	find : UMP$UI$Mvc$Element$find,
	
	attrs : UMP$UI$Mvc$Element$attrs, 
	appendChild : UMP$UI$Mvc$Element$appendChild,
	insertChild : UMP$UI$Mvc$Element$insertChild,
	remove : UMP$UI$Mvc$Element$remove,
	removeAllChild : UMP$UI$Mvc$Element$removeAllChild,
	
	initListChildItem : UMP$UI$Mvc$Element$initListChildItem,
	initListGroupItem : UMP$UI$Mvc$Element$initListGroupItem,
	initListItem : UMP$UI$Mvc$Element$initListItem,
	//
	/** 
	* 设置动画
	* @param {JSON} settings -  动画设置
	* @return {void}
	*/	
	animate: UMP$UI$Mvc$Element$animate
};
UMP.UI.Mvc.Element.registerClass('UMP.UI.Mvc.Element');
