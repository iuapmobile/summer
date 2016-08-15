
//----------------------------------------------------------------------------------- Validator
UMP.Services.Validator = function UMP$Services$Validator(){
}
function UMP$Services$Validator$check(obj,paramNameArray,msg){
	for(var i=0,len=paramNameArray.length;i<len;i++){
		if(obj[paramNameArray[i]] == undefined || obj[paramNameArray[i]] == null){
			var str = "参数["+paramNameArray[i]+"]不能为空";
			alert(msg ? msg + str : str);
			return false;
		}		
	}
	return true;
}
function UMP$Services$Validator$checkIfExist(obj,paramNameArray,msg){
	for(var i=0,len=paramNameArray.length;i<len;i++){
		var key = paramNameArray[i];
		if(key in obj && UM.isEmpty(obj[key])){
			var str = "参数["+paramNameArray[i]+"]不能为空";
			alert(msg ? msg + str : str);
			return false;
		}			
	}
	return true;
}
function UMP$Services$Validator$isEmpty(obj){
	return UM.isEmpty(obj);
}
function UMP$Services$Validator$isJSONObject(obj){
    if ($isJSONObject(obj)) {
		alert("参数不是一个有效的JSONObject");
	}
}
function UMP$Services$Validator$isNamespace(ns){
	/*
	if (ns.isNullOrEmpty()) {
		var msg = "输入默认包名";
        alert(msg);
        return false;
    }
	*/
	if(typeof ns == "undefined" || ns === null){
		return false;
	}
	if(typeof ns == "string" && ns == ""){
		return false;
	}
    
	if (ns.indexOf(".") < 0 || ns.substring(0,1)=="." || ns.substring(ns.length-1)==".") {
		alert("包名非法，不包含.或以.开始结束");
		return false;
	}

	var nameArr = ns.split(".");
	for (var i=0, len=nameArr.length; i<len; i++) {
		var name = nameArr[i];
		if (name == "") {
			alert("非法的包名中连续含有两个.");
			return false;
		}else{
			var pattern = /^[a-z]+([a-zA-Z_][a-zA-Z_0-9]*)*$/;
			if(!pattern.test(name)){
				alert("非法的包名");
				return false
			}
		}
	}
    return true;
}
UMP.Services.Validator.prototype = {
	check : UMP$Services$Validator$check,
	checkIfExist : UMP$Services$Validator$checkIfExist,
	isJSONObject : UMP$Services$Validator$isJSONObject,
	isNamespace : UMP$Services$Validator$isNamespace
};
UMP.Services.Validator.registerClass('UMP.Services.Validator');
$validator = new UMP.Services.Validator();