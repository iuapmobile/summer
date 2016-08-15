
//______________________________________________________________________________________________________ $ctx Begin
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCtx=function(){	
	this._UMCtx_dataBind = "UMCtx.dataBind";//原生类型.方法名（大小写敏感）
    this._UMCtx_dataCollect = "UMCtx.dataCollect";	//原生类型.方法名（大小写敏感）
	
	this._UMCtx_getValue = "UMCtx.getValue";
	
	this._UMCtx_setValue = "UMCtx.setValue";
	this._UMCtx_setUMContext = "UMCtx.setUMContext";
	this._UMCtx_setAppValue = "UMCtx.setAppValue";
}
function UMP$UI$Container$UMCtx$push(ctx, isDataBinding){
	this._setUMContext(ctx, isDataBinding);
}
function UMP$UI$Container$UMCtx$dataBind(args){
	return $service.call(this._UMCtx_dataBind, typeof args == "undefined" ? {} : args, false);//异步执行  dataBind之后可指定callback
}
function UMP$UI$Container$UMCtx$dataCollect(args){
	return $service.call(this._UMCtx_dataCollect, typeof args == "undefined" ? {} : args, true);//同步执行  dataBind无需参数		
}
function UMP$UI$Container$UMCtx$put(fieldName, value){
	this._setValue(fieldName, value);
}
function UMP$UI$Container$UMCtx$put2(fieldName, value){
	var json = this.getJSONObject();
	json[fieldName] = value;
	this.push(json);
}
function UMP$UI$Container$UMCtx$get(fieldName){
	return this._getValue(this._expr(fieldName));
}
function UMP$UI$Container$UMCtx$getString(fieldName){
	var obj = this.get(fieldName);
	return typeof obj == "string" ? obj : $jsonToString(obj);
}
function UMP$UI$Container$UMCtx$getJSONObject(fieldName){
	var obj = this.get(fieldName);
	var json = $stringToJSON(obj);
	return $isJSONObject(json) ? json : alert("执行UMCtx.getJSONObject("+ (typeof fieldName == "undefined" ? "" : fieldName) +")的返回值不是一个有效的JSONObject，其值为" + obj);
}
function UMP$UI$Container$UMCtx$getJSONArray(fieldName){
	var obj = this.get(fieldName);
	var json = $stringToJSON(obj);  
	return $isJSONArray(json) ? json : alert("执行UMCtx.getJSONArray("+ (typeof fieldName == "undefined" ? "" : fieldName) +")的返回值不是一个有效的JSONArray，其值为" + obj);
}



function UMP$UI$Container$UMCtx$param(paramName){
	var ps = this.params();
	if($isJSONObject(ps)){
		return ps[paramName];
	}else{
		alert("当前Context中没有参数名为"+paramName+"的参数值");
	}
}
function UMP$UI$Container$UMCtx$params(){	
	/*
	var expr = "#{plug."+paramName+"}";
	return this._getValue(expr);	//同步执行
    */
	var ctx = this.getJSONObject();
	if(ctx){
		var ps = ctx.parameter;
		if(ps){
			try{
				ps = $stringToJSON(ps);
				return ps;//返回值为JSONObject
			}catch(e){
				alert("未能正确获取参数["+paramName+"],当前Context的Parameter为" + ps);
				alert(e);
				return null;
			}
		}else{
			alert("当前Context的parameter为null");
			return null;
		}
	}else{
		alert("当前获取的Context为null");
		return null;
	}
}
function UMP$UI$Container$UMCtx$getApp(key){
	/* key的取值如下：
	"user"
	"userid"
	"password"
	"token"
	"funcid"
	"tabid"
	"applicationid"
	"wfaddress"
	"deivceid"
	"groupid"
	"sessionid"
	"token"	
	*/
	if(!(typeof key == "string")){
		alert("getApp方法参数不是一个有效的字符串类型，请正确指定参数key");
		return;
	}
	var expr = "#{app."+key+"}";
	return this._getValue(expr);	//同步执行	
}
function UMP$UI$Container$UMCtx$setApp(json, isSync){
	/*
	var json={
		a:"x",
		b:"#{plug.x}",
		c:"#{name}",
		d:"#{cursor.x}"
	}
	*/
	if(typeof isSync == "undefined"){
		isSync = true;	//默认同步执行
	}
	if(!$isJSONObject(json)){
		alert("setApp方法参数不是一个有效的JSONObject，请正确指定其参数为JSONObject类型，例如{\"name\":\"xxx\", \"code\":\"C001\"}");
		return;
	}
	var args = json;
	var strArgs = $jsonToString(args);	
	return $service.call(this._UMCtx_setAppValue, strArgs, isSync);
}






function UMP$UI$Container$UMCtx$_getValue(expr, defaultvalue, isSync){
	if($__isdebug()){
		return this._getValue4debug(expr, defaultvalue, isSync);
	}
	
	
	if(typeof isSync == "undefined"){
		isSync = true;//默认获取是同步调用
	}	
	var args = {};
	args["expr"] = expr;
	if(typeof defaultvalue != "undefined"){
		args["default"] = defaultvalue;
	}
	var strArgs = $jsonToString(args);
	return $service.call(this._UMCtx_getValue, strArgs, isSync);	//同步执行
	
}
function UMP$UI$Container$UMCtx$_getValue4debug(expr, defaultvalue, isSync){
	
		if(expr=="#{CONTEXT}"){
			return $$__debug_ctx;
		}else if(expr.indexOf("#{plug.")>=0){
		    var params = $$__debug_ctx["parameter"];
			if(params){
			    var paramName = expr.substring(expr.indexOf("#{plug.")+7, expr.indexOf("}"));
			    return params[paramName]
			}
		}else if(expr.indexOf("#{app.")>=0){
		
		}else{
			var fieldName = expr.substring(expr.indexOf("#{")+2, expr.indexOf("}"));
			return $$__debug_ctx[fieldName];
		}
	
}
function UMP$UI$Container$UMCtx$_setValue(fieldName, value, isDataBinding){
	//【注意】
	//仅仅支持给Context字段赋值
	//不支持给param和app等赋值，这些只能get不能set
	if($__isdebug()){
		return this._setValue4debug(fieldName, value, isDataBinding);
	}
	
	var args = {};
	args["expr"] = fieldName;//赋值时，不用加表达式	
	args["value"] = value;//不要转成字符串，否则{}和[]都成为字符串了
	if(value instanceof Array){
		args["valueDataType"] = "JSONArray";//对应Java的JSONArray
	}else if(typeof value =="object"){
		args["valueDataType"] = "JSONObject";//对应Java的JSONObject
	}else{
		args["valueDataType"] = "String";//对应Java的String
	}
	args["isDataBinding"] = false;
	
	$service.call(this._UMCtx_setValue, args, true);	//同步赋值
	/*
	if(typeof isDataBinding == "undefined" || isDataBinding == true){
		$service.call(this._UMCtx_dataBind, {}, false);	//异步绑定
	}
	*/
}
function UMP$UI$Container$UMCtx$_setValue4debug(fieldName, value, isDataBinding){
	$$__debug_ctx[fieldName] = value;
}
function UMP$UI$Container$UMCtx$_setUMContext(ctx, isDataBinding){
	if($__isdebug()){
		return this._setUMContext4debug(ctx, isDataBinding);
	}
	var json = {};
	if(ctx.__baseClass == "UMP.UI.Mvc.Context"){
		try{
			json = ctx.unload();
		}catch(e){
			var info = "尝试setContext，但是参数ctx不是一个有效的Context类型";
			$console.log(info);
			alert(info+",更多请查看console日志") 
		}
	}else if(typeof ctx == "object"){
		json = ctx;	
	}else if(typeof ctx == "string"){
		json = ctx;		
	}	
	
	var args = {};
	args["context"] = json;//不要转成字符串，否则{}和[]都成为字符串了
	args["isDataBinding"] = false;
	
	$service.call(this._UMCtx_setUMContext, args, true);	//同步赋值
	if(typeof isDataBinding == "undefined" || isDataBinding == true){
		$service.call(this._UMCtx_dataBind, {}, false);	    //异步绑定		
	}
}
function UMP$UI$Container$UMCtx$_setUMContext4debug(ctx, isDataBinding){
	$$__debug_ctx = ctx;
}
function UMP$UI$Container$UMCtx$_setAppValue(json, isSync){
	/*
	var json={
		a:"x",
		b:"#{plug.x}",
		c:"#{name}",
		d:"#{cursor.x}"
	}
	*/
	if(typeof isSync == "undefined"){
		isSync = true;	//默认同步执行
	}
	var args = json;
	var strArgs = $jsonToString(args);	
	return $service.call(this._UMCtx_setAppValue, strArgs, isSync);
}


UMP.UI.Container.UMCtx.prototype ={
    /** 
	* Context服务，设置当前Context	
	* @param {JSON} json - 当前Context对应的JSON对象
	* @return {void}
	*/
	push : UMP$UI$Container$UMCtx$push,
	dataBind: UMP$UI$Container$UMCtx$dataBind,
	
	/** 
	* 执行数据绑定
	* @return {void}
	*/
	databind: UMP$UI$Container$UMCtx$dataBind,
	
	/** 
	* 执行数据收集
	* @return {void}
	*/
	dataCollect: UMP$UI$Container$UMCtx$dataCollect,
	datacollect: UMP$UI$Container$UMCtx$dataCollect,
	
	get : UMP$UI$Container$UMCtx$get,	
	
	/** 
	* 设置指定字段的值	
	* @param {String} fieldName - 字段名
	* @param {Object} value - 值
	* @return {void}
	*/
	put : UMP$UI$Container$UMCtx$put,
	put2 : UMP$UI$Container$UMCtx$put2,
	
	
	/** 
	* 获取指定字段的值	
	* @param {String} fieldName - 字段名
	* @return {String} 字符型字段值
	*/
	getString : UMP$UI$Container$UMCtx$getString,
	
	/** 
	* 获取指定字段的值	
	* @param {String} fieldName - 字段名
	* @return {JSON} 字段值对应的JSON对象
	*/
	getJSONObject : UMP$UI$Container$UMCtx$getJSONObject,
	
	/** 
	* 获取指定字段的值	
	* @param {String} fieldName - 字段名
	* @return {Array} 字段值对应的JSON数组
	*/
	getJSONArray : UMP$UI$Container$UMCtx$getJSONArray,
	
	/** 
	* 获取指定参数的值	
	* @param {String} paramName - 参数名
	* @return {Object} 参数值
	*/
	param : UMP$UI$Container$UMCtx$param,
	/** 
	* 获取当前Context中的所有参数
	* @return {JSONObject} 当前Context中的所有参数
	*/
	params : UMP$UI$Container$UMCtx$params,
	setApp : UMP$UI$Container$UMCtx$setApp,
	getApp : UMP$UI$Container$UMCtx$getApp,
	//私有方法
	_expr : function(fd){
		return (arguments.length == 0 || fd == undefined || fd == "") ? "#{CONTEXT}" : "#{"+fd+"}"
	},
	_getValue : UMP$UI$Container$UMCtx$_getValue,
	_setValue : UMP$UI$Container$UMCtx$_setValue,
	_getValue4debug : UMP$UI$Container$UMCtx$_getValue4debug,
	_setValue4debug : UMP$UI$Container$UMCtx$_setValue4debug,
	
	_setUMContext: UMP$UI$Container$UMCtx$_setUMContext,
	_setUMContext4debug: UMP$UI$Container$UMCtx$_setUMContext4debug,
	_setAppValue:UMP$UI$Container$UMCtx$_setAppValue
}
UMP.UI.Container.UMCtx.registerClass('UMP.UI.Container.UMCtx');
$ctx = new UMP.UI.Container.UMCtx();
//______________________________________________________________________________________________________ $ctx End


//______________________________________________________________________________________________________$param or $parameter
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCtxParameter=function(context){
	this._ctx = context;
}
function UMP$UI$Container$UMCtxParameter$get(paramName){
	if(typeof paramName == "undefined"){
		paramName = "arguments";
	}
	
	var expr = "#{plug."+paramName+"}";
	return this._ctx._getValue(expr);	//同步执行
}
function UMP$UI$Container$UMCtxParameter$getString(paramName){	
	var result = this.get(paramName)
	if(typeof result == "object"){
		return $jsonToString(result)
	}else{
		return result;
	}
}
function UMP$UI$Container$UMCtxParameter$getJSONObject(paramName){	
	var result = this.get(paramName);
	return typeof result == "string" ? $stringToJSON(result) : result;
}
function UMP$UI$Container$UMCtxParameter$getJSONArray(paramName){	
	var result = this.get(paramName);
	if(typeof result == "string"){
		return $stringToJSON(result)
	}else if(result instanceof Array){
		return result;
	}else{
		alert("参数[" + paramName + "]不是有效的数组类型，返回为null");
		return null;
	}
}
function UMP$UI$Container$UMCtxParameter$ctx(ctx){
	this._ctx = ctx;
}
UMP.UI.Container.UMCtxParameter.prototype ={	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {Object} 参数值
	*/
	get : UMP$UI$Container$UMCtxParameter$get,
	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {String} 参数值
	*/
	getString : UMP$UI$Container$UMCtxParameter$getString,		
	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {JSON} 参数值
	*/
	getJSONObject : UMP$UI$Container$UMCtxParameter$getJSONObject,
	
	/** 
	* 从当前Context的参数集合中获取指定参数名的值	
	* @param {String} paramName - 参数名
	* @return {Array} 参数值
	*/
	getJSONArray : UMP$UI$Container$UMCtxParameter$getJSONArray,
	ctx : UMP$UI$Container$UMCtxParameter$ctx
}
UMP.UI.Container.UMCtxParameter.registerClass('UMP.UI.Container.UMCtxParameter');
$parameter = new UMP.UI.Container.UMCtxParameter($ctx);
$param = $parameter;


$__isdebug = function(){

	if(CurrentEnvironment.DeviceType==CurrentEnvironment.Debug){
		return true;
	}
	return false;
	/*
	if(adrinvoker.call2!=null && UM_callNativeService!=null && UM_callNativeServiceNoraml!=null){
		return true;
	}else{
		return false;
	}	
	*/
}
$$__debug_ctx = function(){

}

