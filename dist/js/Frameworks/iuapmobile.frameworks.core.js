
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// Author： gct@yonyou.com
// iUAP Mobile JS Framework 3.0.0.20160823.2047

(function(window){
	window._UM = window.UM;
	var UM = {};
	
	if ( typeof define === "function" && define.amd ) {
		define( "UM", [], function() {
			return UM;
		});
	}
	window.UM = UM;
	UM.noConflict = function( deep ) {
		if ( deep && window.UM === UM ) {
			window.UM = window._UM;
		}
		return UM;
	};
})(window);
if(typeof UM == "undefined") UM = {};
UM.alert = function(msg){
	try{
		if(typeof msg == "string"){
			alert(msg);
		}else if(msg.__baseClass == "UMP.UI.Mvc.Context"){    
			alert($jsonToString(msg.unload()));
		}else if(typeof msg == "object"){
			alert($jsonToString(msg));
		}else{
			alert(msg);
		}	
	}catch(e){
		alert(msg);
	}
}
$alert = UM.alert;
UM.confirm = function(msg){
	try{
		return confirm(msg);
	}catch(e){
		alert(msg);
		return false;
	}
}
$confirm = UM.confirm;

(function(root){
	root.__jvm = root.__jvm || {};
	root.__getInstance = function(className){
		try{
			var T = eval(className);            
		}catch(e1){
			var msg = "命名空间" + className + "异常！\n请检查" + className + "所在js文件是否有语法错误。\n建议启动调试进行排查，也可查看浏览器的控制台...";
			$exception(e1, msg);
			return;
		}
		
		if(T){
			if(root.__jvm[className]){
				return root.__jvm[className];
			}else{
				var isFailed = false;
				try{
					root.__jvm[className] = new T();
					root.__jvm[className].__typeName = className;
				}catch(e2){
					isFailed = true;
					var msg = className + " 类的构造函数发生错误，可能是由于" + className + ".prototype有语法错误，\n建议启动调试进行排查，也可查看浏览器的控制台"
					$exception(e2, msg);
				}finally{
					if(isFailed && root.__jvm[className]){
						delete root.__jvm[className];
					}
					delete isFailed;
				}
				return root.__jvm[className];			
			}
		}else{
			alert("当前命名空间下没有"+className+"类型，返回null");
			return null;
		}
	}
})(UM)

/**
* 删除左右两端的空格
*/
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
* 删除左边的空格
*/
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g, "");
}
/**
* 删除右边的空格
*/
String.prototype.rtrim=function(){
    return this.replace(/(\s*$)/g, "");
}
String.prototype.isNullOrEmpty=function(){
	if(typeof this == "undefined" || this === null){
		return true;
	}
	if(typeof this == "string" && this == ""){
		return true;
	}
	return false;
}

//给Number类型增加一个add方法，使用时直接用 .add 即可完成加法计算。
Number.prototype.add = function (arg) {
    var accAdd = function(arg1, arg2){
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };

    return accAdd(arg, this);
};

//给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成减法计算。
Number.prototype.sub = function (arg) {
    return this.add(this, -arg);
};

//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成乘法计算。
Number.prototype.mul = function (arg) {
    var accMul = function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };

    return accMul(arg, this);
};

//给Number类型增加一个div方法，，使用时直接用 .div 即可完成除法计算。
Number.prototype.div = function (arg) {
    var accDiv = function(arg1,arg2){
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    };
    return accDiv(this, arg);
};

Array.prototype.remove = function(i){
    if(isNaN(i) || i < 0 || i >= this.length){
	    return this;
	}
	this.splice(i,1);
	return this;
}
Array.prototype.remove2 = function(i){
    if(isNaN(i))
	    return this;
	if(i < 0 || i >= this.length)
	    return this;
	else
	    return this.slice(0,i).concat(this.slice(i+1,this.length));
}
Array.prototype.remove3 = function(dx){
    if(isNaN(dx) || dx > this.length){
		return false;
	}
	for(var i=0,n=0;i<this.length;i++){
		if(this[i]!=this[dx]){
			this[n++]=this[i];
		}
	}
	this.length-=1;
}
Array.prototype.insert = function (i, item){
  return this.splice(i, 0, item);
}
Date.prototype.format = function(format){
	// (new Date()).format("yyyy-MM-dd hh:mm:ss")
    var o = {
        "M+" : this.getMonth()+1, //month 
        "d+" : this.getDate(), //day 
        "h+" : this.getHours(), //hour 
        "m+" : this.getMinutes(), //minute 
        "s+" : this.getSeconds(), //second 
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
        "S" : this.getMilliseconds() //millisecond 
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
} 

//--------------map--------------
Map = function() {
    var struct = function(key, value) {
        this.key = key;
        this.value = value;
    }
    
    var put = function(key, value){
        for (var i = 0; i < this.arr.length; i++) {
            if ( this.arr[i].key === key ) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    }
    
    var get = function(key) {
        for (var i = 0; i < this.arr.length; i++) {
            if ( this.arr[i].key === key ) {
                return this.arr[i].value;
            }
        }
        return null;
    }
    
    var remove = function(key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if ( v.key === key ) {
                continue;
            }
            this.arr.unshift(v);
        }
    }
    
    var size = function() {
        return this.arr.length;
    }
    
    var isEmpty = function() {
        return this.arr.length <= 0;
    }
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

//-----------------------------------------------------------------------


// json

UM.jsonToString = function (obj){
    var THIS = this;
    switch(typeof(obj)){
        case 'string':            
			try{
				return eval('"'+ obj.replace(/(["\\])/g, '\\$1') +'"');            
            }catch(e){
				return obj;
            }
		case 'array':
			return '[' + obj.map(THIS.jsonToString).join(',') + ']';
		case 'object':
			if(obj instanceof Array){
				var strArr = [];
				var len = obj.length;
				/*
				for(var i=0; i<len; i++){
					strArr.push(THIS.jsonToString(obj[i]));
				}				
				return '[' + strArr.join(',') + ']';
				*/
				
				for(var i=0; i<len; i++){					
					var item = null;
					if(typeof obj[i] == "string"){
						item = "\"" + obj[i] + "\"";
					}else if(typeof obj[i] == "object"){
						item = THIS.jsonToString(obj[i]);
					}else{						
						item = THIS.jsonToString(obj[i]);
					}
					
					strArr.push(item);
				}				
				return '[' + strArr.join(',') + ']';
			}else if(obj==null){
				//return 'null';
				return "";//兼容老版本		
				//return "\"\"";
		
			}else{
				var list = [];
				for (var property in obj){
					var vv = THIS.jsonToString(obj[property]);
					var p = THIS.jsonToString(property);
					if(p.indexOf("\"")>=0){

					}else{
						p="\""+p+"\"";
					}
					if(obj[property] instanceof Array){
						
					}else if(vv.toString().indexOf("\"")>=0){//哪一种情况??
						
						if(typeof obj[property] == "string"){
							if(obj[property].indexOf("{")>-1 && obj[property].indexOf("}")>obj[property].indexOf("{")){//
								if(JSON.tryParseJSON(obj[property])){
									//vv = vv.replace(/\"/g,"\\\""); 
									vv = vv.replace(/(["\\])/g, '\\$1');									
									vv="\"" +vv+"\"" ;
								}else{
									vv = vv.replace(/(["\\])/g, '\\$1');
									vv="\"" +vv+"\"" ;
								}
							}else{
								//vv = vv.replace(/\"/g,"\\\"");  
								vv = vv.replace(/(["\\])/g, '\\$1');								
								vv="\"" +vv+"\"" ;
							}
						}
						
					}
					else{
						vv="\"" +vv+"\"" ;
						//list.push("\""+THIS.jsonToString(property)+"\"" + ':'+"\"" + THIS.jsonToString(obj[property])+"\"");
					}
					list.push(p + ':'+vv);
					}
				return '{' + list.join(',') + '}';  
			}  
		case 'number':  
			return obj;
		case 'boolean':  
			return "\"" + obj.toString() + "\"";
		case 'undefined': 
			return "";//兼容老版本		
			//return "\"\"";
		default:  
			return obj;  
		}  
}
$jsonToString = UM.jsonToString;
jsonToString = UM.jsonToString;
UM.stringToJSON = function (str){
    if(str == null || (typeof str == "string" && str == ""))
		return null;
		
	if(typeof str == "string"){
		try{
			if(str.indexOf("\n") >= 0){				
				str = str.replace(/\n/g,"\\n");
			}
			if(str.indexOf("\r") >= 0){				
				str = str.replace(/\r/g,"\\r");
			}
			if(!isNaN(str)){
				return str;
			}
			if(/^[\d.]+$/.test(str)){
				return str;
			}
			var result = eval('(' + str + ')');
			if(Object.prototype.toString.call(result) === '[object Object]'){
				return result;
			}
			if(Object.prototype.toString.call(result) === '[object Array]'){
				return result;
			}
			return str;
		}catch(e){
			//alert("stringToJSON Exception! not a valid json string ");
			return str;
		}
	}else if(typeof str == "object"){
		return str;
	}else{
		alert("$stringToJSON()出错! 试图将一个["+ typeof str +"]类型的参数执行stringToJSON!");
		return str;//不会走到这里
	}
}
$stringToJSON = UM.stringToJSON;
stringToJSON = UM.stringToJSON;
UM.jsonToFormatString = function (json){
	var array = [];
	for(prop in json){
		if(json.hasOwnProperty(prop)){
			array.push(prop + " : \"" + json[prop] + "\"");
		}
	}	
	return "{\n    " + array.join(",\n    ") + "\n}";
}
$jsonToFormatString = UM.jsonToFormatString;

UM.isJSONObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';;
}
$isJSONObject = UM.isJSONObject
if(JSON){
	JSON.isJSON = JSON.isJSON || function(obj){
		if(Object.prototype.toString.call(obj) === '[object Object]'){
			try{
				var str1 = JSON.stringify(obj);
				var str2 = JSON.stringify(JSON.parse(JSON.stringify(obj)));
				return str1==str2;
			}catch(e){
				return false;
			}
		}
	}
	JSON.tryParse = JSON.tryParse || function(str){
		try{
			var json = JSON.parse(str);
			return true;
		}catch(e){
			return false;
		}
	}
	JSON.tryParseJSON = JSON.tryParseJSON || function(str){
		try{
			var obj = JSON.parse(str);
			if(Object.prototype.toString.call(obj) === '[object Object]'){
				return true;
			}
			return false;
		}catch(e){
			return false;
		}
	}
}
UM.isWindow= function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
}
$isWindow = UM.isWindow;
UM.isPlainObject = function (obj) {   
	var key;
	if ( !obj || !$isJSONObject(obj) || obj.nodeType || $isWindow( obj ) ) {
		return false;
	}

	try {
		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwnProperty.call(obj, "constructor") &&
				!hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
		}
	} catch ( e ) {
		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}

	// Handle iteration over inherited properties before own properties.
	for ( key in obj ) {
		return hasOwnProperty.call( obj, key );
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	for ( key in obj ) {}

	return key === undefined || hasOwnProperty.call( obj, key );
}
$isPlainObject = UM.isPlainObject;
UM.isJSONArray = function (obj) {   
  return Object.prototype.toString.call(obj) === '[object Array]';    
}
$isJSONArray = UM.isJSONArray;
UM.isFunction = function (obj) {   
  return Object.prototype.toString.call(obj) === '[object Function]';    
}
$isFunction = UM.isFunction;
//是否为空字符串
UM.isEmpty = function(obj){
	if(obj == undefined || obj == null || (obj.toString && obj.toString() == "")){
		return true;
	}
	return false;
}
$isEmpty = UM.isEmpty;
$translateToArray = function(json){
	for(key in json){
		var val = json[key];
		if(val == "{}"){
			json[key] = {};
		}else if(val == "[]"){
			json[key] = [];
		}
		else if(typeof val == "object"){
			json[key] = $translateToArray(val);
		}
	}
	return json;
}


function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}

// 8 character ID (base=2)
//uuid(8, 2)  //  "01001010"
// 8 character ID (base=10)
//uuid(8, 10) // "47473046"
// 8 character ID (base=16)
//uuid(8, 16) // "098F4D35"
$exception = function (e, msg){
	msg = msg ? msg + "\r\n" : "";
	if(e){
		if(e.stack){
			alert(msg + e.stack);
		}else{
			alert(msg + e);
		}
	}else{
		alert("发生异常:" + msg);
	}
}
$e = $exception;


//编解码
UMCodec = function () {

};
UMCodec.prototype.urlDecode = function (zipStr) {
    if (!zipStr) return;
    var uzipStr = "";
    for (var i = 0; i < zipStr.length; i++) {
        var chr = zipStr.charAt(i);
        if (chr == "+") {
            uzipStr += " ";
        } else if (chr == "%") {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                uzipStr += decodeURI("%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
                i += 8;
            } else {
                uzipStr += this.asciiToString(parseInt("0x" + asc));
                i += 2;
            }
        } else {
            uzipStr += chr;
        }
    }

    return uzipStr;
}

/*UMCodec.prototype.stringToAscii = function (str) {
    if (!str) return;
    return str.charCodeAt(0).toString(16);
}*/

UMCodec.prototype.asciiToString = function (asccode) {
    if (!asccode) return;
    return String.fromCharCode(asccode);
}
$codec = new UMCodec();


//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
//-----------------------------------------------------------------------
// UMP.MACore.js
// UMP.UI.Mvc Framework Base.


Function.__typeName = 'Function';
Function.createDelegate = function Function$createDelegate(instance, method) {     
    return function() {
        return method.apply(instance, arguments);
    }
}

if(typeof(window)=="undefined"){
    this.window=this;
}

window.Type = Function;

window.__rootNamespaces = [];
window.__registeredTypes = {};

Type.__fullyQualifiedIdentifierRegExp = new RegExp("^[^.0-9 \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]([^ \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]*[^. \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\])?$", "i");
Type.__identifierRegExp = new RegExp("^[^.0-9 \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\][^. \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]*$", "i");

Type.prototype.callBaseMethod = function Type$callBaseMethod(instance, name, baseArguments) {

    var baseMethod = this.getBaseMethod(instance, name);
    if (!baseMethod) throw "Error.invalidOperation(String.format(Sys.Res.methodNotFound, name))";
    if (!baseArguments) {
        return baseMethod.apply(instance);
    }
    else {
        return baseMethod.apply(instance, baseArguments);
    }
}

Type.prototype.getBaseMethod = function Type$getBaseMethod(instance, name) {

    if (!this.isInstanceOfType(instance)) throw "Error.argumentType('instance', Object.getType(instance), this)";
    var baseType = this.getBaseType();
    if (baseType) {
        var baseMethod = baseType.prototype[name];
        return (baseMethod instanceof Function) ? baseMethod : null;
    }

    return null;
}

Type.prototype.getBaseType = function Type$getBaseType() {
    if (arguments.length !== 0) throw "Error.parameterCount()";
    return (typeof(this.__baseType) === "undefined") ? null : this.__baseType;
}

Type.prototype.getInterfaces = function Type$getInterfaces() {
    /// <returns type="Array" elementType="Type" mayBeNull="false" elementMayBeNull="false"></returns>
    if (arguments.length !== 0) throw "Error.parameterCount()";
    var result = [];
    var type = this;
    while(type) {
        var interfaces = type.__interfaces;
        if (interfaces) {
            for (var i = 0, l = interfaces.length; i < l; i++) {
                var interfaceType = interfaces[i];
                if (!Array.contains(result, interfaceType)) {
                    result[result.length] = interfaceType;
                }
            }
        }
        type = type.__baseType;
    }
    return result;
}

Type.prototype.getName = function Type$getName() {
    /// <returns type="String"></returns>
    if (arguments.length !== 0) throw "Error.parameterCount()";
    return (typeof(this.__typeName) === "undefined") ? "" : this.__typeName;
}

Type.prototype.implementsInterface = function Type$implementsInterface(interfaceType) {

    this.resolveInheritance();

    var interfaceName = interfaceType.getName();
    var cache = this.__interfaceCache;
    if (cache) {
        var cacheEntry = cache[interfaceName];
        if (typeof(cacheEntry) !== 'undefined') return cacheEntry;
    }
    else {
        cache = this.__interfaceCache = {};
    }

    var baseType = this;
    while (baseType) {
        var interfaces = baseType.__interfaces;
        if (interfaces) {
            if (Array.indexOf(interfaces, interfaceType) !== -1) {
                return cache[interfaceName] = true;
            }
        }

        baseType = baseType.__baseType;
    }

    return cache[interfaceName] = false;
}

Type.prototype.inheritsFrom = function Type$inheritsFrom(parentType) {

    this.resolveInheritance();
    var baseType = this.__baseType;
    while (baseType) {
        if (baseType === parentType) {
            return true;
        }
        baseType = baseType.__baseType;
    }

    return false;
}

Type.prototype.initializeBase = function Type$initializeBase(instance, baseArguments) {

    if (!this.isInstanceOfType(instance)) throw "Error.argumentType('instance', Object.getType(instance), this)";

    this.resolveInheritance();
    if (this.__baseType) {
        if (!baseArguments) {
            this.__baseType.apply(instance);
        }
        else {
            this.__baseType.apply(instance, baseArguments);
        }
    }

    return instance;
}

Type.prototype.isImplementedBy = function Type$isImplementedBy(instance) {

    if (typeof(instance) === "undefined" || instance === null) return false;

    var instanceType = Object.getType(instance);
    return !!(instanceType.implementsInterface && instanceType.implementsInterface(this));
}

Type.prototype.isInstanceOfType = function Type$isInstanceOfType(instance) {

    if (typeof(instance) === "undefined" || instance === null) return false;

    if (instance instanceof this) return true;

    var instanceType = Object.getType(instance);
    return !!(instanceType === this) ||
           (instanceType.inheritsFrom && instanceType.inheritsFrom(this)) ||
           (instanceType.implementsInterface && instanceType.implementsInterface(this));
}

Type.prototype.registerClass = function Type$registerClass(typeName, baseType, interfaceTypes) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(typeName)) throw "Error.argument('typeName', Sys.Res.notATypeName)";
        var parsedName;
    try {
        parsedName = eval(typeName);
    }
    catch(e) {
        throw "Error.argument('typeName', Sys.Res.argumentTypeName)";
    }
    if (parsedName !== this) {
		var errInfo = this.name + "试图注册一个已经存在的["+typeName+"]类型，请检查";
		alert(errInfo);
		//throw errInfo;
		return this;
	}
	
    if (window.__registeredTypes[typeName]){		
		//暂时不处理重复注册类的情况，重复出测时，后面的生效
		//throw "Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, typeName))";		
		//throw "重复注册！已经注册了类型["+typeName+"]，请检查";
		//ctx1.a-->ctx2
		//ctx2.b-->ctx2
		//ctx2会出现重复注册的情况
	}
    if ((arguments.length > 1) && (typeof(baseType) === 'undefined')){
		alert("baseType of [" + typeName + " ] is 'undefined', probably error in the baseType");
		throw "Error.argumentUndefined('baseType')";
	}
	if(typeof baseType == "string"){
		alert("baseType of [" + typeName + " ] is not a class but a string["+baseType+"], please modify it");
		throw "Error.argument('baseType', Sys.Res.baseNotAClass)";
	}
	if (baseType && !baseType.__class){
		alert("baseType of [" + typeName + " ] is not a class, probably error in the baseType");
		throw "Error.argument('baseType', Sys.Res.baseNotAClass)";
	}
	
    this.prototype.constructor = this;
    this.__typeName = typeName;
    this.__class = true;
    if (baseType) {
        this.__baseType = baseType;
        this.__basePrototypePending = true;
    }
        if (!window.__classes) window.__classes = {};
    window.__classes[typeName.toUpperCase()] = this;

                if (interfaceTypes) {
        this.__interfaces = [];
        for (var i = 2; i < arguments.length; i++) {
            var interfaceType = arguments[i];
            if (!interfaceType.__interface) throw "Error.argument('interfaceTypes[' + (i - 2) + ']', Sys.Res.notAnInterface)";
            this.resolveInheritance();
            for (var methodName in interfaceType.prototype) {
                var method = interfaceType.prototype[methodName];
                if (!this.prototype[methodName]) {
                    this.prototype[methodName] = method;
                }
            }
            this.__interfaces.push(interfaceType);
        }
    }
    window.__registeredTypes[typeName] = true;

    return this;
}

Type.prototype.registerInterface = function Type$registerInterface(typeName) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(typeName)) "throw Error.argument('typeName', Sys.Res.notATypeName)";
        var parsedName;
    try {
        parsedName = eval(typeName);
    }
    catch(e) {
        throw "Error.argument('typeName', Sys.Res.argumentTypeName)";
    }
    if (parsedName !== this) throw "Error.argument('typeName', Sys.Res.badTypeName)";
        if (window.__registeredTypes[typeName]) throw "Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, typeName))";
    this.prototype.constructor = this;
    this.__typeName = typeName;
    this.__interface = true;
    window.__registeredTypes[typeName] = true;

    return this;
}

Type.prototype.resolveInheritance = function Type$resolveInheritance() {
    if (arguments.length !== 0) "throw Error.parameterCount()";

    if (this.__basePrototypePending) {
        var baseType = this.__baseType;

        baseType.resolveInheritance();

        for (var memberName in baseType.prototype) {
            var memberValue = baseType.prototype[memberName];
            if (!this.prototype[memberName]) {
                this.prototype[memberName] = memberValue;
            }
        }
        delete this.__basePrototypePending;
    }
}

Type.getRootNamespaces = function Type$getRootNamespaces() {
    /// <returns type="Array"></returns>
    if (arguments.length !== 0) throw "Error.parameterCount()";
    return Array.clone(window.__rootNamespaces);
}

Type.isClass = function Type$isClass(type) {

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__class;
}

Type.isInterface = function Type$isInterface(type) {

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__interface;
}

Type.isNamespace = function Type$isNamespace(object) {

    if ((typeof(object) === 'undefined') || (object === null)) return false;
    return !!object.__namespace;
}

Type.parse = function Type$parse(typeName, ns) {

    var fn;
    if (ns) {
        if (!window.__classes) return null;
        fn = window.__classes[ns.getName().toUpperCase() + '.' + typeName.toUpperCase()];
        return fn || null;
    }
    if (!typeName) return null;
    if (!Type.__htClasses) {
        Type.__htClasses = {};
    }
    fn = Type.__htClasses[typeName];
    if (!fn) {
        fn = eval(typeName);
        if (typeof(fn) !== 'function') throw "Error.argument('typeName', Sys.Res.notATypeName)";
        Type.__htClasses[typeName] = fn;
    }
    return fn;
}

Type.registerNamespace = function Type$registerNamespace(namespacePath) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(namespacePath)) throw "Error.argument('namespacePath', Sys.Res.invalidNameSpace)";
    var rootObject = window;
    var namespaceParts = namespacePath.split('.');

    for (var i = 0; i < namespaceParts.length; i++) {
        var currentPart = namespaceParts[i];
        var ns = rootObject[currentPart];
        if (ns && !ns.__namespace) {
            //throw "Error.invalidOperation(String.format(Sys.Res.namespaceContainsObject, namespaceParts.splice(0, i + 1).join('.')))";
			//alert("注册命名空间失败   Type.registerNamespace");
        }
        if (!ns) {
            ns = rootObject[currentPart] = {};
            if (i === 0) {
                window.__rootNamespaces[window.__rootNamespaces.length] = ns;
            }
            ns.__namespace = true;
            ns.__typeName = namespaceParts.slice(0, i + 1).join('.');
            var parsedName;
            try {
                parsedName = eval(ns.__typeName);
            }
            catch(e) {
                parsedName = null;
            }
            if (parsedName !== ns) throw Error.argument('namespacePath', Sys.Res.invalidNameSpace);
            ns.getName = function ns$getName() {return this.__typeName;}
        }
        rootObject = ns;
    }
}
Object.__typeName = 'Object';

Object.getType = function Object$getType(instance) {

    var ctor = instance.constructor;
    if (!ctor || (typeof(ctor) !== "function") || !ctor.__typeName || (ctor.__typeName === 'Object')) {
        return Object;
    }
    return ctor;
}

Object.getTypeName = function Object$getTypeName(instance) {

    return Object.getType(instance).getName();
}

Array.__typeName = 'Array';

Array.add = Array.enqueue = function Array$enqueue(array, item) {
        array[array.length] = item;
}

Array.addRange = function Array$addRange(array, items) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="items" type="Array" elementMayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "items", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;


        array.push.apply(array, items);
}

Array.clear = function Array$clear(array) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;

    array.length = 0;
}

Array.clone = function Array$clone(array) {

    if (array.length === 1) {
        return [array[0]];
    }
    else {
                        return Array.apply(null, array);
    }
}

Array.contains = function Array$contains(array, item) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    return (Array.indexOf(array, item) >= 0);
}

Array.dequeue = function Array$dequeue(array) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <returns mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;

    return array.shift();
}

Array.forEach = function Array$forEach(array, method, instance) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="method" type="Function"></param>
    /// <param name="instance" optional="true" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "method", type: Function},
        {name: "instance", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    for (var i = 0, l = array.length; i < l; i++) {
        var elt = array[i];
        if (typeof(elt) !== 'undefined') method.call(instance, elt, i, array);
    }
}

Array.indexOf = function Array$indexOf(array, item, start) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" optional="true" mayBeNull="true"></param>
    /// <param name="start" optional="true" mayBeNull="true"></param>
    /// <returns type="Number"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true, optional: true},
        {name: "start", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    if (typeof(item) === "undefined") return -1;
    var length = array.length;
    if (length !== 0) {
                start = start - 0;
                if (isNaN(start)) {
            start = 0;
        }
        else {
                                    if (isFinite(start)) {
                                start = start - (start % 1);
            }
                        if (start < 0) {
                start = Math.max(0, length + start);
            }
        }

                for (var i = start; i < length; i++) {
            if ((typeof(array[i]) !== "undefined") && (array[i] === item)) {
                return i;
            }
        }
    }
    return -1;
}

Array.insert = function Array$insert(array, index, item) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="index" mayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "index", mayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    array.splice(index, 0, item);
}

Array.parse = function Array$parse(value) {
    /// <param name="value" type="String" mayBeNull="true"></param>
    /// <returns type="Array" elementMayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String, mayBeNull: true}
    ]);
    if (e) throw e;

    if (!value) return [];
    var v = eval(value);
    if (!Array.isInstanceOfType(v)) throw Error.argument('value', Sys.Res.arrayParseBadFormat);
    return v;
}

Array.remove = function Array$remove(array, item) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    var index = Array.indexOf(array, item);
    if (index >= 0) {
        array.splice(index, 1);
    }
    return (index >= 0);
}

Array.removeAt = function Array$removeAt(array, index) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="index" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "index", mayBeNull: true}
    ]);
    if (e) throw e;

    array.splice(index, 1);
}

function Sys$Enum$parse(value, ignoreCase) {
    /// <param name="value" type="String"></param>
    /// <param name="ignoreCase" type="Boolean" optional="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String},
        {name: "ignoreCase", type: Boolean, optional: true}
    ]);
    if (e) throw e;

    var values, parsed, val;
    if (ignoreCase) {
        values = this.__lowerCaseValues;
        if (!values) {
            this.__lowerCaseValues = values = {};
            var prototype = this.prototype;
            for (var name in prototype) {
                values[name.toLowerCase()] = prototype[name];
            }
        }
    }
    else {
        values = this.prototype;
    }
    if (!this.__flags) {
        val = (ignoreCase ? value.toLowerCase() : value);
        parsed = values[val.trim()];
        if (typeof(parsed) !== 'number') throw Error.argument('value', String.format(Sys.Res.enumInvalidValue, value, this.__typeName));
        return parsed;
    }
    else {
        var parts = (ignoreCase ? value.toLowerCase() : value).split(',');
        var v = 0;

        for (var i = parts.length - 1; i >= 0; i--) {
            var part = parts[i].trim();
            parsed = values[part];
            if (typeof(parsed) !== 'number') throw Error.argument('value', String.format(Sys.Res.enumInvalidValue, value.split(',')[i].trim(), this.__typeName));
            v |= parsed;
        }
        return v;
    }
}

function Sys$Enum$toString(value) {
    /// <param name="value" optional="true" mayBeNull="true"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

            if ((typeof(value) === 'undefined') || (value === null)) return this.__string;
    if ((typeof(value) != 'number') || ((value % 1) !== 0)) throw Error.argumentType('value', Object.getType(value), this);
    var values = this.prototype;
    var i;
    if (!this.__flags || (value === 0)) {
        for (i in values) {
            if (values[i] === value) {
                return i;
            }
        }
    }
    else {
        var sorted = this.__sortedValues;
        if (!sorted) {
            sorted = [];
            for (i in values) {
                sorted[sorted.length] = {key: i, value: values[i]};
            }
            sorted.sort(function(a, b) {
                return a.value - b.value;
            });
            this.__sortedValues = sorted;
        }
        var parts = [];
        var v = value;
        for (i = sorted.length - 1; i >= 0; i--) {
            var kvp = sorted[i];
            var vali = kvp.value;
            if (vali === 0) continue;
            if ((vali & value) === vali) {
                parts[parts.length] = kvp.key;
                v -= vali;
                if (v === 0) break;
            }
        }
        if (parts.length && v === 0) return parts.reverse().join(', ');
    }
    throw Error.argumentOutOfRange('value', value, String.format(Sys.Res.enumInvalidValue, value, this.__typeName));
}

Type.prototype.registerEnum = function Type$registerEnum(name, flags) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(name)) throw "Error.argument('name', Sys.Res.notATypeName)";
        var parsedName;
    try {
        parsedName = eval(name);
    }
    catch(e) {
        throw "Error.argument('name', Sys.Res.argumentTypeName)";
    }
    if (parsedName !== this) throw "Error.argument('name', Sys.Res.badTypeName)";
    if (window.__registeredTypes[name]) throw "Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, name))";
    for (var i in this.prototype) {
        var val = this.prototype[i];
        if (!Type.__identifierRegExp.test(i)) throw "Error.invalidOperation(String.format(Sys.Res.enumInvalidValueName, i))";
        if (typeof(val) !== 'number' || (val % 1) !== 0) throw "Error.invalidOperation(Sys.Res.enumValueNotInteger)";
        if (typeof(this[i]) !== 'undefined') throw "Error.invalidOperation(String.format(Sys.Res.enumReservedName, i))";
    }
    for (var i in this.prototype) {
        this[i] = this.prototype[i];
    }
    this.__typeName = name;
    this.parse = Sys$Enum$parse;
    this.__string = this.toString();
    this.toString = Sys$Enum$toString;
    this.__flags = flags;
    this.__enum = true;
    window.__registeredTypes[name] = true;
}

Type.isEnum = function Type$isEnum(type) {
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__enum;
}

Type.isFlags = function Type$isFlags(type) {
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__flags;
}




/**************************************************定义 全命名空间 Class **********************************/
//UMP.register = UMP.registerNamespace = Type.registerNamespace
Type.registerNamespace('Sys');

/****************************************** Sys.Component Define ******************************************/
Sys.Component = function Sys$Component() {
    this._id = null;
};
function Sys$Component$get_id() {
    return this._id;
}
Sys.Component.prototype = {
    get_id: Sys$Component$get_id
};
Sys.Component.registerClass('Sys.Component')

/****************************************** Sys._Application Define ******************************************/
Sys._Application = function Sys$_Application() {    
    this._components = {};
    this._createdComponents = [];    
}

function UMP$Sys$_Application$findComponent(id, parent) { 
    if(parent){
	    alert("Exception in the Method[UMP$Sys$_Application$findComponent]");
		return Sys.Application._components[id] || null;
        if(Sys.IContainer.isInstanceOfType(parent)){
                return parent.findComponent(id);                
		}
		else{
			return parent[id]|| null;
		}
	}
    return Sys.Application._components[id] || null;
}
Sys._Application.prototype = {
    findComponent: UMP$Sys$_Application$findComponent 
};
Sys._Application.registerClass('Sys._Application', Sys.Component, Sys.IContainer);
Sys.Application = new Sys._Application();



/****************************************** Sys.EventHandlerList Define ******************************************/
Sys.EventHandlerList = function Sys$EventHandlerList() {
if (arguments.length !== 0) throw Error.parameterCount();
this._list = {};
}

function Sys$EventHandlerList$addHandler(id, handler) {
Array.add(this._getEvent(id, true), handler);
////alert("fire addHandler");
}

function Sys$EventHandlerList$removeHandler(id, handler) {
var evt = this._getEvent(id);
if (!evt) return;
Array.remove(evt, handler);
}

function Sys$EventHandlerList$getHandler(id) {
var evt = this._getEvent(id);
if (!evt || (evt.length === 0)) return null;
evt = Array.clone(evt);
if (!evt._handler) {
evt._handler = function (source, args) {
for (var i = 0, l = evt.length; i < l; i++) {
evt[i](source, args);
}
};
}
return evt._handler;
}

function Sys$EventHandlerList$_getEvent(id, create) {
if (!this._list[id]) {
if (!create) return null;
this._list[id] = [];
}
return this._list[id];
}

Sys.EventHandlerList.prototype = {
addHandler: Sys$EventHandlerList$addHandler,
removeHandler: Sys$EventHandlerList$removeHandler,
getHandler: Sys$EventHandlerList$getHandler,

_getEvent: Sys$EventHandlerList$_getEvent
}
Sys.EventHandlerList.registerClass('Sys.EventHandlerList');

Sys.EventArgs = function Sys$EventArgs() {
    if (arguments.length !== 0) throw Error.parameterCount();
}
Sys.EventArgs.registerClass('Sys.EventArgs');
Sys.EventArgs.Empty = new Sys.EventArgs();








Type.registerNamespace('Sys.UI');

/****************************************** Sys.UI.DomEvent Define ******************************************/
Sys.UI.DomEvent = function Sys$UI$DomEvent(eventObject) {
    var e = eventObject;
    this.rawEvent = e;
    this.altKey = e.altKey;
    if (typeof (e.button) !== 'undefined') {
        this.button = (typeof (e.which) !== 'undefined') ? e.button :
            (e.button === 4) ? Sys.UI.MouseButton.middleButton :
            (e.button === 2) ? Sys.UI.MouseButton.rightButton :
            Sys.UI.MouseButton.leftButton;
    }
    if (e.type === 'keypress') {
        this.charCode = e.charCode || e.keyCode;
    }
    else if (e.keyCode && (e.keyCode === 46)) {
        this.keyCode = 127;
    }
    else {
        this.keyCode = e.keyCode;
    }
    /*this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.ctrlKey = e.ctrlKey;
    this.target = e.target ? e.target : e.srcElement;
    if (this.target) {
    var loc = Sys.UI.DomElement.getLocation(this.target);
    this.offsetX = (typeof(e.offsetX) !== 'undefined') ? e.offsetX : window.pageXOffset + (e.clientX || 0) - loc.x;
    this.offsetY = (typeof(e.offsetY) !== 'undefined') ? e.offsetY : window.pageYOffset + (e.clientY || 0) - loc.y;
    }
    this.screenX = e.screenX;
    this.screenY = e.screenY;*/
    this.shiftKey = e.shiftKey;
    this.type = e.type;
}

function Sys$UI$DomEvent$preventDefault() {
    if (arguments.length !== 0) throw Error.parameterCount();
    if (this.rawEvent.preventDefault) {
        this.rawEvent.preventDefault();
    }
    else if (window.event) {
        window.event.returnValue = false;
    }
}
function Sys$UI$DomEvent$stopPropagation() {
    if (arguments.length !== 0) throw Error.parameterCount();
    if (this.rawEvent.stopPropagation) {
        this.rawEvent.stopPropagation();
    }
    else if (window.event) {
        window.event.cancelBubble = true;
    }
}
Sys.UI.DomEvent.prototype = {
    preventDefault: Sys$UI$DomEvent$preventDefault,
    stopPropagation: Sys$UI$DomEvent$stopPropagation
}
Sys.UI.DomEvent.registerClass('Sys.UI.DomEvent');




/****************************************** Global Method API Define ******************************************/
//  $addHandler
//  var $find
//  var $get

var $find = Sys.Application.findComponent;
var $get = function () {
    return document.getElementById(id);
}
var $addHandler = Sys.UI.DomEvent.addHandler = function Sys$UI$DomEvent$addHandler(element, eventName, handler) {
    if (!element._events) {
        element._events = {};
    }
    var eventCache = element._events[eventName];
    if (!eventCache) {
        element._events[eventName] = eventCache = [];
    }
    var browserHandler;
    if (element.addEventListener) {
        browserHandler = function (e) {
            return handler.call(element, new Sys.UI.DomEvent(e));
        }
        element.addEventListener(eventName, browserHandler, false);
    }
    else if (element.attachEvent) {
        browserHandler = function () {
            return handler.call(element, new Sys.UI.DomEvent(window.event));
        }
        element.attachEvent('on' + eventName, browserHandler);
    }
    eventCache[eventCache.length] = { handler: handler, browserHandler: browserHandler };
}

var $removeHandler = Sys.UI.DomEvent.removeHandler = function Sys$UI$DomEvent$removeHandler(element, eventName, handler) {
    var browserHandler = null;
    if ((typeof(element._events) !== 'object') || (element._events == null)) {
		alert("Error in $removeHandler");
		return;
	}
    
	var cache = element._events[eventName];
    if (!(cache instanceof Array)){
		alert("Error in $removeHandler");
		return;
	}
	
    for (var i = 0, l = cache.length; i < l; i++) {
        if (cache[i].handler === handler) {
            browserHandler = cache[i].browserHandler;
            break;
        }
    }
    if (typeof(browserHandler) !== 'function') {
		alert("Error in $removeHandler");
		return;
	}
    if (element.removeEventListener) {
        element.removeEventListener(eventName, browserHandler, false);
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + eventName, browserHandler);
    }
    cache.splice(i, 1);
}



//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// UMP.Container.js @VERSION 3.0.0
// Author gct(debugger)

CurrentEnvironment={};
CurrentEnvironment.DeviceIOS="ios";
CurrentEnvironment.DeviceAndroid="android";
CurrentEnvironment.DeviceWin8="win8";
CurrentEnvironment.DevicePC="pc";
CurrentEnvironment.Debug="debug";
CurrentEnvironment.DeviceType="android";
$environment = CurrentEnvironment;
(function(env){
	var browser={
		info:function(){
			var ua = navigator.userAgent, app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				//trident: ua.indexOf('Trident') > -1, //IE内核
				//presto: ua.indexOf('Presto') > -1, //opera内核
				webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				//gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
				mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
				iPad: ua.indexOf('iPad') > -1 //是否iPad
				//webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		lang:(navigator.browserLanguage || navigator.language).toLowerCase()
	};
	
	if(browser.info.android){
		env.DeviceType="android";
	}else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
		env.DeviceType="ios";
	}
})(CurrentEnvironment);

+function(UM, undefined){
    UM.platform = {};
	UM.platform.OS = "";
	UM.platform.ANDROID = "android";
	UM.platform.IOS = "ios";
	UM.platform.HTML5 = "HTML5"; 
}(UM);

$isWeb = false;
$__cbm = [];
//
SysHelper=function(){	
}
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.SysHelper=function(){
	this._version = "";
	this._cancelpush = false;//默认false 默认不取消push,控制一次Action是否需要提交
}
function UMP$UI$Container$SysHelper$navigate(viewid){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		UM_SysNavigate(viewid);
	}else{
		if(adrinvoker){
			adrinvoker.call("UMView.open","{viewid:'" + viewid + "'}");
		}else{
			var error = "adrinvoker is undefined; navigate is executing, the parameter viewid is ["+ viewid+"]";
			alert(error);
		}
	}
}
//这里的$sys.callAction为JS调用dsl中的定义的Action，即UI端的Action，调用服务器端的Action为$service.callAction(.....)
function UMP$UI$Container$SysHelper$callAction(actionid,ctx){	
	//
	if(ctx){//CallAction之前做一次push同步
		var args = {};
		//because the native container check [document] and [context] forcibly, args must have the tow return object
		//1、args must have document
		if(typeof $document != "undefined"){
			args["document"] = $document.dataToString();
		}else{
			args["document"] = {};
		}
		//2、args must have context	
		try{
			args["context"] = jsonToString(ctx);
			_$sys.push(args);
		}catch(e){
			alert(e.stack);
		}
	}
	//

	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		//JS调用IOS Action
		UM_SysCallAction(actionid);
	}else{
		//JS调用android Action
		if(adrinvoker){
			adrinvoker.call("UMJS.callAction","{actionid:'" + actionid + "'}");
		}else{
			var error = "adrinvoker is undefined; callAction is executing, the parameter action is ["+ actionid+"]";
			alert(error);
		}
	}	
}
function UMP$UI$Container$SysHelper$cancelPush(val){
	if(typeof val == "undefined"){
		return this._cancelpush;
	}else{
		this._cancelpush = val;
	}
}
function UMP$UI$Container$SysHelper$push(jsonArgs){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		//JS调用IOS Action
		  var str = jsonToString(jsonArgs);
		//JS调用IOS Action
		UM_NativeCall.callService("UMJS.push", str);

	}else{
		//JS调用android Action
		var str = jsonToString(jsonArgs);
		if(adrinvoker){
			adrinvoker.call("UMJS.push", str);
		}else{
			var error = "adrinvoker is undefined; push is executing, the parameter jsonArgs is ["+ str+"]";
			alert(error);
		}
	}	
}
function UMP$UI$Container$SysHelper$version(val){
	if(typeof val === "undefined")
		return this._version;
	else
		this._version = val;		
}
function UMP$UI$Container$SysHelper$pull(){
}
UMP.UI.Container.SysHelper.prototype ={
	navigate : UMP$UI$Container$SysHelper$navigate,
	callAction : UMP$UI$Container$SysHelper$callAction,
	cancelPush : UMP$UI$Container$SysHelper$cancelPush,
	push : UMP$UI$Container$SysHelper$push,
	pull : UMP$UI$Container$SysHelper$pull,
	version : UMP$UI$Container$SysHelper$version
}
UMP.UI.Container.SysHelper.registerClass('UMP.UI.Container.SysHelper');
UM_Sys = new UMP.UI.Container.SysHelper();
$js = UM_Sys;
_$sys = UM_Sys;
$sys = _$sys;





//_______________________________________________________________________________________________ $service = UM_NativeCall
//原生调用公共服务
CommonNativeCallService=function(){
	this.GetDeviceData = "um_getDevicedata";//ios--ok
	this.GetUserData = "um_getUserData";//ios--ok
	this.GetAppData = "um_getAppData";//ios--ok
	this.GetAppConfigData = "um_getAppConfigData";//没有提供???
	this.CallTel="um_CallTel";//ios--ok
	this.SendMsg="um_SendMsg";//ios--ok
	this.IsConnect = "um_IsConnect";//ios--ok
	this.GetCurrentLanguage = "um_GetCurrentLanguage";//ios--ok
	this.GetCurrentLocation = "um_GetCurrentLocation";//ios--ok
    //
    this.Store = "um_Store";//ios--ok
    this.Restore = "um_Restore";//ios--ok
	
	this._APIIsObsolete = "the API is obsolete, but continue executing...please use the new API: ";
}
//native service bridge, 最基本平台内部调用服务的API，所有公共服务都通过callService调用执行，对外API为--------------------------$service.call
/*
serviceType:平台提供的服务类型
jsonArgs: json类型
isSync:默认false，是否同步调用
*/
CommonNativeCallService.prototype.callService=function(serviceType, jsonArgs, isSync){
	try{		
		var serviceparams = "";
		if(typeof jsonArgs == "string"){
			var json = stringToJSON(jsonArgs);
			if(typeof json == "string"){
				//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
				alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
				return;	
			}
			serviceparams = jsonToString(json);
			if(typeof serviceparams == "object"){
				//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
				alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式。参数是" + jsonArgs);
				return;	
			}			
		}else if(typeof jsonArgs == "object"){
			if(jsonArgs["callback"] && $isFunction(jsonArgs["callback"])){
				//1、 callback:function(){}
				var newCallBackScript = "fun" + uuid(8, 16) + "()";//anonymous method
				while($__cbm[newCallBackScript]){
					newCallBackScript =  "fun" + uuid(8, 16) + "()";//anonymous method
				}
				$__cbm[newCallBackScript] = jsonArgs["callback"];//callback can be global or local, so define a reference function in $__cbm
				
				//
				window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						var _func = $__cbm[newCallBackScript];
						_func(sender, args);	
					}catch(e){
						alert(e);
					}finally{
						delete $__cbm[newCallBackScript];
						delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
						//alert("del ok");
						//alert(typeof $__cbm[newCallBackScript]);
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}				
				}
				jsonArgs["callback"] = newCallBackScript;				
			}else if(jsonArgs["callback"] && typeof(jsonArgs["callback"]) == "string"){
				//2、 callback:"mycallback()"
				var cbName = jsonArgs["callback"].substring(0, jsonArgs["callback"].indexOf("("));
				var callbackFn = eval(cbName);
				if(typeof callbackFn != "function"){
					alert(cbName + " is not a global function, callback function must be a global function!");
					return;
				}
				
				var newCallBackScript = "fun" + uuid(8, 16) + "()";//anonymous method
				while(window[newCallBackScript]){
					newCallBackScript =  "fun" + uuid(8, 16) + "()";//anonymous method
				}
				//
				window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						callbackFn(sender, args);	
					}catch(e){
						alert(e);
					}finally{
						delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
						//alert("del ok");
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}				
				}
				jsonArgs["callback"] = newCallBackScript;
			}
			
			this.callBackProxy(jsonArgs , "error");
		
			serviceparams = jsonToString(jsonArgs);
			if(typeof serviceparams == "object"){
				//转string后仍然为json，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
				alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式" + jsonArgs);
				return;	
			}
		}else{
			alert("调用$service.call("+serviceType+", jsonArgs, "+isSync+")时不合法,参数jsonArgs类型为"+typeof jsonArgs);
			return;
		}
			
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			/*
			//IOS需要严格的JSON格式，故在此统一检查并处理一下
			if(typeof serviceparams == "string"){
				var json = stringToJSON(serviceparams);
				serviceparams = jsonToString(json);			
			}else if(typeof serviceparams == "object"){
				serviceparams = jsonToString(serviceparams);
			}
			*/
			if(isSync){
				return UM_callNativeService(serviceType,serviceparams);//同步调用
			}else{
				return UM_callNativeServiceNoraml(serviceType,serviceparams);//异步调用，多用于CallAction等，服务可支持callBack，通过callback参数
			}
		}else if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceAndroid){
			if(isSync){
				return adrinvoker.call2(serviceType,serviceparams);//call2是同步调用
			}else{
				//默认异步执行
				return adrinvoker.call(serviceType,serviceparams);//call是异步调用 默认异步
			}
		}else if(CurrentEnvironment.DeviceType==CurrentEnvironment.Debug){
			//alert("CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType + ", 已经执行")
			console.log("CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType + ", 服务["+serviceType+"]已经执行，参数是"+serviceparams);
		}else{
			alert("CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType + ", $service.call Not Implementation!")
		}
	}catch(e){
		var info="";
		if(isSync)	
			info = "调用$service.call(\""+serviceType+"\", jsonArgs, "+isSync+")时发生异常,请检查!";
		else
			info = "调用$service.call(\""+serviceType+"\", jsonArgs)时发生异常,请检查!";
		$console.log(info);
		alert(info+", 更多请查看console日志;\n错误堆栈信息为:\n" + e.stack);
	}
}

CommonNativeCallService.prototype.callBackProxy = function(jsonArgs, callback_KEY){
	if(jsonArgs[callback_KEY] && $isFunction(jsonArgs[callback_KEY])){
		// callback:function(){}
		var newCallBackFnName = callback_KEY + uuid(8, 16);//anonymous method
		while($__cbm[newCallBackFnName]){
			newCallBackFnName =  callback_KEY + uuid(8, 16);//anonymous method
		}
		$__cbm[newCallBackFnName] = jsonArgs[callback_KEY];//callback can be global or local, so define a reference function in $__cbm
		
		//
		window[newCallBackFnName] = function (sender, args){
			try{
				//alert(typeof sender);
				//alert(typeof args);
				//$alert(sender);
				//$alert(args);
				if(args == undefined)
					args = sender;
				var _func = jsonArgs[callback_KEY];
				_func(sender, args);	
			}catch(e){
				alert(e);
			}finally{
				delete $__cbm[newCallBackFnName];
				delete window[newCallBackFnName];
				//alert("del ok"); 
				//alert(typeof $__cbm[newCallBackScript]);
				//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
			}				
		}
		jsonArgs[callback_KEY] = newCallBackFnName + "()";				
	}else if(jsonArgs[callback_KEY] && typeof(jsonArgs[callback_KEY]) == "string"){
		// callback:"mycallback()"
		var cbName = jsonArgs[callback_KEY].substring(0, jsonArgs[callback_KEY].indexOf("("));
		var callbackFn = eval(cbName);
		if(typeof callbackFn != "function"){
			alert(cbName + " is not a global function, callback function must be a global function!");
			return;
		}
		
		var newCallBackFnName = callback_KEY + uuid(8, 16);//anonymous method
		while(window[newCallBackFnName]){
			newCallBackFnName =  callback_KEY + uuid(8, 16);//anonymous method
		}
		//
		window[newCallBackFnName] = function (sender, args){
			try{
				//alert(typeof sender);
				//alert(typeof args);
				//$alert(sender);
				//$alert(args);
				if(args == undefined)
					args = sender;
				callbackFn(sender, args);	
			}catch(e){
				alert(e);
			}finally{
				delete window[newCallBackFnName];
				//alert("del ok");
				//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
			}				
		}
		jsonArgs[callback_KEY] = newCallBackFnName + "()";
	}
}

//该方法是通过服务调用MA上一个controller的某一个Action
/*  示例代码 $service.callAction("nc.bs.hr.wa.payslip.HrController","needPwd",{demo:'demo'},false,"myback","returnData");
controllerName：  String类型， MA上的Controller的FullName, 例如"nc.bs.hr.wa.payslip.HrController"
actionName：      String类型， Controller上的Action名称，例如"needPwd"
params：          json类型,    Action所需的参数,例如{demo:"demo"}
isDataCollect：   Boolean类型, 调用Action时候是否需要收集数据，例如true
callbackActionID：String类型， 执行完Action后的回调Action，例如"myCallBack"
contextmapping：  String类型， 执行完Action后，将Action的返回值映射到Context的映射关系，例如"data"或"data.x"
*/          
CommonNativeCallService.prototype.callAction=function(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
	if(arguments.length == 1 && typeof arguments[0] == "object"){
		var args = {};
		/*
		args  = {
			viewid:"xxx.xxx.xx",
			action:"methodName",
			params:{a:1,b:2},
			//isDataCollect:true,
			autoDataBinding:true,//请求回来会是否进行数据绑定
			contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
			callback:"actionid",			
			error:"errorActionId"//失败回调的ActionId			
		}
		*/
		args = controllerName;
		var sysParam = {
			viewid:"xxx.xxx.xx",
			action:"methodName",
			//"params" : {a:1,b:2},//自定义参数
			//isDataCollect:true,
			autoDataBinding:true,//请求回来会是否进行数据绑定
			contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
			callback:"actionid",			
			error:"errorActionId"//失败回调的ActionId			
		};
		for(key in args){
			if(!sysParam.hasOwnProperty(key) && typeof args[key] == "string"){
				args[key] = $stringToJSON(args[key]);
			}
		}
		return UM_NativeCall.callService("UMService.callAction", args, false);
	}else{
		var args = {};
		args["viewid"] = controllerName;
		args["action"] = actionName;
		args["params"] = params;
		args["isDataCollect"] = isDataCollect;
		args["callback"] = callbackActionID;
		args["contextmapping"] = contextmapping;
		if(customArgs){//处理自定义参数，用于该服务的参数扩展
			for(key in customArgs){
				args[key] = customArgs[key];
			}
		}
		//$service.call("UMService.callAction","{callback:'myback', contextmapping:'data'，viewid:'"+controllerName+"',isDataCollect:'false',params:{demo:'demo'},action:'needPwd'}");
		return UM_NativeCall.callService("UMService.callAction", args);
	}
}
//本地缓存 调用$cache即可
CommonNativeCallService.prototype.store=function(key, value){
	$cache.write(key, value);
}
CommonNativeCallService.prototype.reStore=function(key){
	$cache.read(key);
}
//设备信息公共服务
CommonNativeCallService.prototype.getDeviceData=function(){
	
    return UM_callNativeService(this.GetDeviceData);
}
CommonNativeCallService.prototype.getUserData=function(){
    return UM_callNativeService(this.GetUserData);
}
CommonNativeCallService.prototype.getAppData=function(){
    return UM_callNativeService(this.GetAppData);
}
CommonNativeCallService.prototype.getAppConfigData=function(){
    return UM_callNativeService(this.GetAppConfigData);
}

//写ip
CommonNativeCallService.prototype.writeConfig=function(key,val){
	//1、准备参数
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = key;
	}else if(arguments.length == 2){
		args[key] = val;
	}else{
		alert("writeConfig时,参数不合法");
		return;
	}
	//2、调用服务
	UM_NativeCall.callService("UMService.writeConfigure", args);
} 
CommonNativeCallService.prototype.loadConfig=function(key, fieldName){
	/*
	$service.load({
		"host":"field1",
		"ip":"field2",
		"a":"b",
		"c":"d";
	
	})
	*/
	//1、准备参数
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = key;
	}else if(arguments.length == 2 && typeof key == "string" && typeof fieldName == "string"){
		args[key] = fieldName;
	}else{
		alert("调用$service.loadConfig(" + typeof key + ", "+ typeof fieldName+")时参数有误！");
		return;
	}
	
	
	//2、调用服务
	return UM_NativeCall.callService("UMService.loadConfigure", args, true);
} 
CommonNativeCallService.prototype.readConfig=function(name){
	//1、准备参数
	var args = {};
	if(typeof name == "string")
		args[name] = name;	
	else{
		alert("readConfig时，不支持参数[name]的参数类型为" + typeof name);
		return;
	}
	
	//2、调用服务
	return UM_NativeCall.callService("UMService.readConfigure", args, true);
} 
CommonNativeCallService.prototype.login=function(username,passwd){
	return UM_NativeCall.callService("UMService.login", "{\"username\":\"" +username + "\",\"passwd\":\"" +passwd + "\"}");
}

CommonNativeCallService.prototype.transInfoService = function(infoid, binderfiled, transtype){
	/*	参数：
	infoid : 请求的ID
	binderfiled : 用于绑定webview的字段名
	transtype ：一个枚举值，目前分为word|other
	*/
	var args = {};
	args["infoid"] = infoid;
	args["binderfiled"] = binderfiled;
	
	if(transtype != null)//可选参数	
		args["transtype"] = transtype;
		
	return $service.call("UMService.transInfoService", $jsonToString(args));
}
CommonNativeCallService.prototype.get = function(json){
	/*	参数：
	url : 请求的ID
	callback : 用于绑定webview的字段名
	*/
	if($isJSONObject(json)){
		if(!json.url){
			alert("请输入请求的url");
			return;
		}
		return $service.call("UMService.get", json, false);
	}else{
		alert("参数不是有效的JSONObject");
	}
}
CommonNativeCallService.prototype.post = function(json){
	/*	参数：
	url : "http://academy.yonyou.com/api/loginLx.ashx",//请求的url,
	data: {key:"6480-4230-27FD-8AA0",user:"apitest",pwd:"123456"},
	callback : "mycallback()"
	*/
	if($isJSONObject(json)){
		if(!json.url){
			alert("请输入请求的url");
			return;
		}
		return $service.call("UMService.post", json, false);	
	}else{
		alert("参数不是有效的JSONObject");
	}
}
UM_NativeCall = new CommonNativeCallService();
$service = UM_NativeCall;
$service.call = UM_NativeCall.callService;//===CommonNativeCallService.prototype.callService=function(serviceType, serviceparams, isSync){
//-----------------------------------------------------------------------




//______________________________________________________________________________________________________ UM_Controls 谨慎使用
ControlsHelper=function(){
}
ControlsHelper.prototype.get=function(cid){
	this._cid = cid;
    return this;
}
ControlsHelper.prototype.set=function(attrid,value){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		UM_setControlAttribute(this._cid,attrid,value);
	}else{
		adrinvoker.call("UMJS.setProperty","{id:'" + this._cid + "',"+attrid+":'" + value + "'}");
	}
}
ControlsHelper.prototype.call=function(methodname,param){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		UM_callControlMethod(this._cid,methodname,param);
	}else{
		alert("No Implementation");
	}
}
UM_Controls=new ControlsHelper();

//______________________________________________________________________________________________________ $controls
//UI控件相关服务 只是get和set
Type.registerNamespace('UMP.Services');
UMP.Services.Controls = function UMP$Services$Controls(){
	
}
function UMP$Services$Controls$get(cid,propertyName){	
	var args = {};
	args["id"] = cid;
	args["propertyName"] = propertyName;
	
	var strArgs = $jsonToString(args);
	var result = $service.callService("UMJS.getProperty", strArgs, true);//同步get
	var flag = "$$UErrMsg$";
	if(result != null && result.indexOf(flag)==0){
		alert(result.substring(flag.length));
		return "";
	}
	return result
}
function UMP$Services$Controls$set(cid, propertyName, propertyValue){
	var args = {};
	args["id"] = cid;
	args[propertyName] = propertyValue;
	
	var strArgs = $jsonToString(args);
	return $service.callService("UMJS.setProperty", strArgs, false);//异步set
}
function UMP$Services$Controls$insert(args){
	/*args = {
		id:"inp
		ut0",
		value:"xxx",
		index:""
	}*/
	if(!$isJSONObject(args)){
		alert("the paramter of insert requires a JSONObject");
	}
	if(args["id"] == null){
		alert("insert方法必须指定参数id，即控件的id")
	}
	
	//     $service.call("UMJS.insert", { id:"textbox0", content:"5555"});
	return $service.call("UMJS.insert", args, false);//异步insert
}
function UMP$Services$Controls$focus(args){
	//$id("textbox0").set("ispopup", "true");
    //autofocus
	if(!$isJSONObject(args)){
		alert("the paramter of focus requires a JSONObject");
	}
	if(args["id"] == null){
		alert("focus方法必须指定参数id，即控件的id");
		return;
	}
	return $service.callService("UMJS.focus", args, false);//异步set
}
function UMP$Services$Controls$blur(args){
	if(!$isJSONObject(args)){
		alert("the paramter of blur requires a JSONObject");
	}
	if(args["id"] == null){
		alert("focus方法必须指定参数id，即控件的id");
		return;
	}
	return $service.callService("UMJS.blur", args, false);//异步set
}
function UMP$Services$Controls$invoke(args){
	if(!$isJSONObject(args)){
		alert("the paramter of invoke requires a JSONObject");
	}
	if(args["id"] == null){
		alert("invoke方法必须指定参数id，即控件的id");
		return;
	}
	return $service.call("UMJS.invoke", args, false);//异步set
}
UMP.Services.Controls.prototype = {
	get: UMP$Services$Controls$get,
	set: UMP$Services$Controls$set,
	insert : UMP$Services$Controls$insert,
	focus : UMP$Services$Controls$focus,
	blur : UMP$Services$Controls$blur,
	invoke : UMP$Services$Controls$invoke
};
UMP.Services.Controls.registerClass('UMP.Services.Controls');
var $controls = new UMP.Services.Controls();

//__________________________________________________________________________________________ UMP.UI.Container.Dom
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.Dom = function UMP$UI$Container$Dom(){		
}
function UMP$UI$Container$Dom$set(cid, status, tag, jsonAttrs){

	var testdata = {
		"button1" : {
			"status" : "add",
			"tag" : "intput",
			"attributes" : {"id" : "button1", "type" : "button", "text":"abc"}        
         },
		"div1" : {
			"status" : "mod",
			"tag" : "div",
            "attributes" : {"id" : "div1", "background":"#e3e3e3", "visible":"true"}
        }
	};
	
	if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceIOS){
		UM_setControlAttribute(cid, attrName, attrValue);
	}else{
		var data = {
			"status": status,
			"tag" : tag,
			"attributes": jsonAttrs
		};
		var cData = {
			"id" : data
		};
		var strCData = $jsonToString(cData);
		adrinvoker.call("UMJS.setProperty", strCData);
	}
}
function UMP$UI$Container$Dom$push(doc){
    for(id in doc._tree){
		this.set(id, doc[id]);
	}
}
function UMP$UI$Container$Dom$pull(){
}
UMP.UI.Container.Dom.prototype = {
	set: UMP$UI$Container$Dom$set,
	push: UMP$UI$Container$Dom$push,
	pull: UMP$UI$Container$Dom$pull
};
UMP.UI.Container.Dom.registerClass('UMP.UI.Container.Dom');
var $dom = new UMP.UI.Container.Dom();




//
callbackMap = new Map();
//
MessagePool=function(){
    this.Message=new Array();
    this.ErrorMessage=new Array();
    this.MessageLevel={};
    this.MessageLevel.All=-1;
    this.MessageLevel.Warnning=1;
    this.MessageLevel.Error=2;
}
MessagePool.prototype.log=function(level, msg){
    if(level==this.MessageLevel.Error){
        this.ErrorMessage.push(msg);
    }else{
        this.Message.push(msg);
    }
}
MessagePool.prototype.getErrorMessage=function(){
    var result="[";
    for(var i=0;i<this.ErrorMessage.length;i++){
        if(i==this.ErrorMessage.length-1){
            result+="\""+this.ErrorMessage.shift()+"\""
        }else{
            result+="\""+this.ErrorMessage.shift()+"\",";
        }
    }
    result+="]";
    return result;
}
MessagePool.prototype.getWarnningMessage=function(){
    var result="[";
    for(var i=0;i<this.Message.length;i++){
        if(i==this.Message.length-1){
            result+=this.Message.shift()
        }else{
            result+=this.Message.shift()+",";
        }
    }
    result+="]";
    return result;
}
MessagePool.prototype.getMessage=function(level){
    var msg;
    if(level==this.MessageLevel.Error){
        msg=this.getErrorMessage();
    }else if(level==this.MessageLevel.All){
        var err=this.getErrorMessage();
        var war= this.getWarnningMessage();
        msg="{\"error\":"+err+",\"warnning\":"+war+"}";
    }
    else{
        msg= this.getWarnningMessage();
    }
    
    return msg;
}
//system message pool
messagePool=new MessagePool();
//
RequestContext=function(){
    this.Source=""; //viewid windowid ...
    this.Key="";
};
CommonCRUD=function(){};
CommonCRUD.prototype.loadModel=function(modelname, jsondata){
    $UMP$getMM().set(modelname,jsondata);
}

//dispacherCallbackHandler  for any plat
CommonCRUD.prototype.dispacherCallbackHandler=function(jsondata,key){alert(jsondata);
    //var d=stringToJSON(jsondata);
    callbackMap.get(key).call(this,jsondata);
}
CommonCRUD.prototype.callService=function(serviceName, actionName, params,context,handler){
    
    context.Key = serviceName + actionName+context.Source;
    callbackMap.put(context.Key,handler);
    //call remote service any plat 
    UM_CallRemoteService(serviceName,actionName,params,context.Source,context.Key);
}
commonService=new CommonCRUD();
Controllers={};

function getController(controllername){
    /*var c=Controllers.controllername;
    if(!c){
        c=Controllers.controllername=eval("(new "+controllername+"())");
    }*/
    return eval("(new "+controllername+"())");
}

function setControlValue(cid,attrid,value){
	return UM_setControlAttribute(cid,attrid,value);
}

function getModel(modelname){
    return jsonToString($UMP$getMM().get(modelname));
}

function updateModel(modelname,param){
    $UMP$getMM().get(modelname).set(stringToJSON(param));
}
//register model event
function bindEvent(eventname,filedname,modelname){
    //need modify
    modelname="CustomerSubmit";
    $UMP$getMM().get(modelname).bind(eventname,filedname, function(a,value,params){
    //controller:current controller? and to which webview?
    //{"data":{"pLastName":"changed"},"source":{"change":"pLastName"}}
    var eventobject={};
    eventobject.data=a.changed;
    eval("eventobject.source={\""+eventname+"\":\""+modelname+"."+filedname+"\"}");
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
                  UM_CallAction("","dispacherEventToWeView",jsonToString(eventobject));
     }else{
                  dispacherEventAndroid(jsonToString(eventobject));
    }
                                     
                                     
    });
}


////////// dispacherEvent from js container to native android or webview
function dispacherEventAndroid(parameters){
    
}

//___________________________________________________________________________________________________ UMP.Services.Calendar
/*
UMCalendar.getToToday       日历跳转到今天，并加载数据（没有参数）
           getMonthChange   日历翻页时获取，月数据的服务  （参数同callaction）
           getDayChange     日历点击具体日，时获取数据的服务 （参数同callaction）
           getCalendarTitle  获取日历当前的年-月 用于界面title显示（没有参数）

*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Calendar = function UMP$Services$Calendar(){
	this._getToToday="UMCalendar.getToToday";
	this._getMonthChange="UMCalendar.getMonthChange";
	this._getDayChange="UMCalendar.getDayChange";
	this._getCalendarTitle="UMCalendar.getCalendarTitle";
}
function UMP$Services$Calendar$getToToday(calendarID){
	var args={};
	args["id"] = calendarID;	
	var strArgs = $jsonToString(args);
	return $service.call(this._getToToday, strArgs); 
}
function UMP$Services$Calendar$getMonthChange(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
	var args = {};
	args["viewid"] = controllerName;
	args["action"] = actionName;
	args["params"] = params;
	args["isDataCollect"] = isDataCollect;
	args["callback"] = callbackActionID;
	args["contextmapping"] = contextmapping;
	if(customArgs){//处理自定义参数，用于该服务的参数扩展
		for(key in customArgs){
			args[key] = customArgs[key];
		}
	}
	
   	var strArgs = $jsonToString(args);
	return $service.call(this._getMonthChange, strArgs);   
}
function UMP$Services$Calendar$getDayChange(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
	var args = {};
	args["viewid"] = controllerName;
	args["action"] = actionName;
	args["params"] = params;
	args["isDataCollect"] = isDataCollect;
	args["callback"] = callbackActionID;
	args["contextmapping"] = contextmapping;
	if(customArgs){//处理自定义参数，用于该服务的参数扩展
		for(key in customArgs){
			args[key] = customArgs[key];
		}
	}
	
   	var strArgs = $jsonToString(args);
	return $service.call(this._getDayChange, strArgs);   
}
function UMP$Services$Calendar$getCalendarTitle(calendarID){
	var args={};
	args["id"] = calendarID;	
	var strArgs = $jsonToString(args);
	return $service.call(this._getCalendarTitle, strArgs); 
}
UMP.Services.Calendar.prototype = {
	getToToday : UMP$Services$Calendar$getToToday,
	getMonthChange : UMP$Services$Calendar$getMonthChange,
	getDayChange : UMP$Services$Calendar$getDayChange,
	getCalendarTitle : UMP$Services$Calendar$getCalendarTitle
};
UMP.Services.Calendar.registerClass('UMP.Services.Calendar');
var $calendar = new UMP.Services.Calendar();


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



//___________________________________________________________________________________________________ $cache UMP.Services.Cache
Type.registerNamespace('UMP.Services');
//写缓存文件
/*
UMFile.write(UMEventArgs args) 参数：append 覆盖还是追加 charset字符字符集  content是内容 path文件名

UMFile.read(UMEventArgs args)  参数：charset字符字符集  maxlength读取最大长度 path文件名
读取出的内容会放在ctx中，key值为content

UMService.callAction  发送请求
*/ 
UMP.Services.Cache = function UMP$Services$Cache(){	
	this._store = "um_Store";//ok
    this._restore = "um_Restore";//ok	
}
var ___cache_UIState = {};
function UMP$Services$Cache$get(charset){
	if($environment.DeviceType == $environment.DeviceIOS){
		return $service.reStore();
	}else if($environment.DeviceType == $environment.DeviceAndroid){
		var args ={};
		if(charset)
			args["charset"] = charset;
			
		var str = $jsonToString(args);
		var strContent = UM_NativeCall.callService("UMFile.read", str, true);
		//alert("get =="+strContent);
		return strContent;
	}
}
function UMP$Services$Cache$set(content, append, charset, isSync){
	if($environment.DeviceType == $environment.DeviceIOS){
		alert("Cache API [push] no implementation...pls consult the IOS developer of UMP");
	}else if($environment.DeviceType == $environment.DeviceAndroid){
		var args ={};
		if(content)
			args["content"] = content;
		if(append)
			args["append"] = append;
		if(charset)
			args["charset"] = charset;	
		
		var str = $jsonToString(args);
		if(typeof isSync == "undefined")
			return UM_NativeCall.callService("UMFile.write", str, true);//默认都是同步调用，避免write后read不到最新的结果
		else
			return UM_NativeCall.callService("UMFile.write", str, isSync);
		//___cache_UIState["content"] = content;
	}
}
function UMP$Services$Cache$write2(key, value, append, charset, isSync){
	if($environment.DeviceType == $environment.DeviceIOS){
		var str = value;
		if(typeof value != "string"){
			str = $jsonToString(value);
		}		
		UM_callNativeService(this._store, key, str);		
	}else if($environment.DeviceType == $environment.DeviceAndroid){
	    var args={};
		var oldObj = $cache.get();
		if(!oldObj)
			oldObj = {};
		oldObj[key] = value;
		args["content"] = oldObj;
		
		
		if(append)
			args["append"] = append;
		if(charset)
			args["charset"] = charset;	
		
		var str = $jsonToString(args);	
		
		//___cache_UIState["content"] = content;
		//alert("write之前的=="+str);
		if(typeof isSync == "undefined")
			return UM_NativeCall.callService("UMFile.write", str, true);//默认都是同步调用，避免write后read不到最新的结果
		else
			return UM_NativeCall.callService("UMFile.write", str, isSync);
	}
}
function UMP$Services$Cache$read2(key, maxlength, charset){
	var strContent = "";
	if($environment.DeviceType == $environment.DeviceIOS){		
        strContent = UM_callNativeService(this._restore, key);
	}else if($environment.DeviceType == $environment.DeviceAndroid){
	   var content = {};
	   
		var args ={};
		if(maxlength)
			args["maxlength"] = maxlength;
		if(charset)
			args["charset"] = charset;	
		
		var str = $jsonToString(args);	
		strContent = UM_NativeCall.callService("UMFile.read", str, true);		
	}
	//alert("read出来的字符串是"+strContent);
	//苹果安卓统一返回处理结果
	if(strContent && strContent != ""){
		try{
			var obj = $stringToJSON(strContent);
			return obj[key];
		}catch(e){
			return null;
		}
	}else{
		return null;
	}
}

function UMP$Services$Cache$writeFile(filePath, content, append, charset, isSync){
	if($isJSONObject(filePath)){		
		return $service.call("UMFile.write", filePath, true);
	}else{
		if($environment.DeviceType == $environment.DeviceIOS){
			var str = content;
			if(typeof content != "string"){
				str = $jsonToString(content);
			}
			return UM_callNativeService(this._store, filePath, str);	
		}else if($environment.DeviceType == $environment.DeviceAndroid){
			var args = {};
			if($isJSONObject(append) && arguments.length == 3){
				args = append;
				if(filePath)
					args["path"] = filePath;
				if(content)
					args["content"] = content;
			}else{				
				if(filePath)
					args["path"] = filePath;
				if(content)
					args["content"] = content;	
				if(append)
					args["append"] = append;
				if(charset)
					args["charset"] = charset;
			}
			if(typeof isSync == "undefined")
				return UM_NativeCall.callService("UMFile.write", args, true);//默认都是同步调用，避免write后read不到最新的结果
			else
				return UM_NativeCall.callService("UMFile.write", args, isSync);
		}
	}
}
function UMP$Services$Cache$readFile(filePath, maxlength, charset){
	var strContent = "";
	if($environment.DeviceType == $environment.DeviceIOS){
		strContent = UM_callNativeService(this._restore, filePath);	
	}else if($environment.DeviceType == $environment.DeviceAndroid){  
		var args ={};
		if(filePath)
			args["path"] = filePath;
		if(maxlength)
			args["maxlength"] = maxlength;
		if(charset)
			args["charset"] = charset;
			
		var str = $jsonToString(args);
		strContent = UM_NativeCall.callService("UMFile.read", str, true);		
	}
	
	//苹果安卓统一返回处理结果
	if(strContent && strContent != ""){
		try{
			/*  取出缓存的值不再强行转化为json，按照绝大多数平台通常的处理方式，缓存取出来后必要时需自行类型转化
			obj = $stringToJSON(strContent);
			return obj;
			*/
			return strContent;
		}catch(e){
			return strContent;
		}
	}else{
		return null;
	}
}
UMP.Services.Cache.prototype = {
	get: UMP$Services$Cache$get,
	set: UMP$Services$Cache$set,
	push: UMP$Services$Cache$set,
	write2: UMP$Services$Cache$write2,
	read2: UMP$Services$Cache$read2,
	
	write: UMP$Services$Cache$writeFile,
	read: UMP$Services$Cache$readFile,
	writeFile: UMP$Services$Cache$writeFile,
	readFile: UMP$Services$Cache$readFile,
	remove:function(key){
		return $file.remove.apply(this, arguments);
	},
	removeItem:function(key){
		return $file.remove.apply(this, arguments);
	},
	getItem:function(key){
		return this.readFile(key);
	},
	setItem:function(key,value){
		return this.writeFile(key,value);
	}
};
UMP.Services.Cache.registerClass('UMP.Services.Cache');
$cache = new UMP.Services.Cache();
$localStorage = $cache;
$localStore = $cache;


//___________________________________________________________________________________________________ UMP.Services.Sqlite
//Sqlite相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Sqlite = function UMP$Services$Sqlite(){
	this.UMSQLite_execSql = "UMSQLite.execSql";
	this.UMSQLite_query = "UMSQLite.query";
	this.UMSQLite_queryByPage = "UMSQLite.queryByPage";
	this.UMSQLite_exist = "UMSQLite.exist";
	this.UMSQLite_openDB = "UMSQLite.openDB";	
}
function UMP$Services$Sqlite$execSql(args){
/*
    var sql = "CREATE TABLE person (_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, xclass VARCHAR)";
    var param = {
       db : dbname,
       sql : sql
    }    
    $sqlite.execSql(param);
*/
	if($isJSONObject(args)){
		if($isEmpty(args["db"])){
			alert("请输入参数db");
			return;
		}
		if($isEmpty(args["sql"])){
			alert("请输入参数sql");
			return;
		}
		return $service.call(this.UMSQLite_execSql, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用execSql({...})形式的API");
	}
	
}

//查询记录并分页返回
//参数db：必选 数据库名字  
//参数sql：必选   查询sql语句  
//参数startIndex： 可选  起始记录数索引 默认0
//参数endIndex：  可选  结束记录索引（含） 默认9
function UMP$Services$Sqlite$query(args){
	/*
	$sqlite.query({
       "db" : dbname,
       "sql" : sql,
       "startIndex" : 0,   //从第几条记录开始
       "endIndex" : 9   //到第几条记录结束(含)    
    });
	*/
	if($isJSONObject(args)){
		/*
		if($isEmpty(args["startIndex"])){
			args["startIndex"] = 0;
		}
		if($isEmpty(args["endIndex"])){
			args["endIndex"] = 9;
		}
		*/
		return $service.call(this.UMSQLite_query, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用query({...})形式的API");
	}
}

//查询返回指定页面的数据
//参数db：必选 数据库名字  
//参数sql：必选   查询sql语句  
//参数pagesize：  可选  每页记录数 默认10
//参数pageIndex： 可选  指定页码 默认0
function UMP$Services$Sqlite$queryByPage(args){
/*
    $sqlite.queryByPage({
       "db" : dbName,
       "sql" : sql,
       "pageSize" : pageSize,   //pageIndex=页号，从0开始
       "pageIndex" : pageNo //pageSize=每页的记录数，从1开始
    })
*/
	if($isJSONObject(args)){
		if($isEmpty(args["pageSize"])){
			args["pageSize"] = 10;
		}
		if($isEmpty(args["pageIndex"])){
			args["pageIndex"] = 0;
		}
		return $service.call(this.UMSQLite_queryByPage, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用queryByPage({...})形式的API");
	}
	
}
function UMP$Services$Sqlite$exist(args){
	if($isJSONObject(args)){
		if($isEmpty(args["db"])){
			alert("请输入参数db");
			return;
		}
		return $service.call(this.UMSQLite_exist, args, true);
	}else{
		alert("参数不是一个有效的JSONObject，请使用exist({...})形式的API");
	}
}
UMP.Services.Sqlite.prototype = {
	open:function(json){
		return this.openOrCreateDB(json);
	},
	openOrCreateDB:function(json){
		if($isJSONObject(json) && $isEmpty(json["db"])){	
			return $service.call(this.UMSQLite_openDB, json, false);
		}else{
			alert("参数不是一个有效的JSONObject，请确保参数是一个有效的JSON且含有db键值");
		}
	},
	openDB:function(args){
		if($isJSONObject(args) && $isEmpty(args["db"])){			
			return $service.call(this.UMSQLite_openDB, args, false);
		}else{
			alert("参数不是一个有效的JSONObject，请使用openDB({...})形式的API");
		}
	},
	//delDB:UMP$Services$Sqlite$delDB,
	execSql:UMP$Services$Sqlite$execSql,
	query:UMP$Services$Sqlite$query,	//查询（默认分页）
	queryByPage:UMP$Services$Sqlite$queryByPage,//查询指定页的数据
	exist : UMP$Services$Sqlite$exist
};
UMP.Services.Sqlite.registerClass('UMP.Services.Sqlite');
var $sqlite = new UMP.Services.Sqlite();


//___________________________________________________________________________________________________ UMP.Services.Network
//网络相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Network = function UMP$Services$Network(){	
	this.um_IsConnect = "um_IsConnect";//ios--ok	
	this.UMNetwork_isAvailable = "UMNetwork.isAvailable";//andriod--ok
	
	
	this.UMNetwork_networkState = "UMNetwork.networkState";//andriod--ok
	
	this.UMNetwork_getNetworkInfo  = "UMNetwork.getNetworkInfo";
	
}

function UMP$Services$Network$isConnect(){
	var result = false;
	if($environment.DeviceType == $environment.DeviceIOS){		
		result = $service.call(this.um_IsConnect, {}, true);	
	}else if($environment.DeviceType == $environment.DeviceAndroid){		
		result = $service.call(this.UMNetwork_isAvailable, {}, true);
	}
	if(result != null && result.toString().toLowerCase() == "true"){
		return true;
	}else{
		return false;
	}
}	
function UMP$Services$Network$available(){
	return this.isConnect();
}
function UMP$Services$Network$networkState(){
    /*
	if($environment.DeviceType == $environment.DeviceIOS){
		alert("该服务[networkState]苹果未实现，请联系苹果开发人员");
		return {};	
	}else if($environment.DeviceType == $environment.DeviceAndroid){		
		var result = $service.call(this.UMNetwork_networkState, {}, true);
		if(typeof result == "String"){
			return $stringToJSON(result);
		}else{
			return result;
		}
	}
	*/
	var result = $service.call(this.UMNetwork_networkState, {}, true);
	if(typeof result == "String"){
		return $stringToJSON(result);
	}else{
		return result;
	}
}
function UMP$Services$Network$getNetworkInfo(){
    /*
	if($environment.DeviceType == $environment.DeviceIOS){
		alert("该服务[getNetworkInfo]苹果未实现，请联系苹果开发人员");
		return {};
	}else if($environment.DeviceType == $environment.DeviceAndroid){		
		var result = $service.call(this.UMNetwork_getNetworkInfo, {}, true);//同步
		if(typeof result == "String"){
			return $stringToJSON(result);
		}else{
			return result;
		}
	}
	*/
	var result = $service.call(this.UMNetwork_getNetworkInfo, {}, true);//同步
	if(typeof result == "String"){
		return $stringToJSON(result);
	}else{
		return result;
	}
}
UMP.Services.Network.prototype = {
	isConnect: UMP$Services$Network$isConnect,
	available: UMP$Services$Network$available,
	isAvailable: UMP$Services$Network$available,
	networkState: UMP$Services$Network$networkState,
	getNetworkInfo: UMP$Services$Network$getNetworkInfo
};
UMP.Services.Network.registerClass('UMP.Services.Network');
var $net = new UMP.Services.Network();


//___________________________________________________________________________________________________ $console 
//console相关服务
if(typeof __debugger == "undefined"){
	__debugger = false;
}
UMP.Services.Console = function UMP$Services$Console(){	
}
function UMP$Services$Console$log(info){
	if(__debugger){
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
		
		}else{
			if(console){
				console.log("__________"+info);//console是原生JS中定义的对象
			}
		}
	}
}
function UMP$Services$Console$alert(info){
	if(__debugger){
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			$alert(info);	
		}else{
			$alert(info);	
		}
	}
}
UMP.Services.Console.prototype = {
	log : UMP$Services$Console$log,
	alert : UMP$Services$Console$alert
};
UMP.Services.Console.registerClass('UMP.Services.Console');
$console = new UMP.Services.Console();


//___________________________________________________________________________________________________ $res UMP.Services.Resource
//Resource相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Resource = function UMP$Services$Resource(){
	this._getResString="um_getResString";
}
function UMP$Services$Resource$getResString(resid, isSync){
	if(typeof isSync == "undefined"){
		isSync = true;//默认同步方式调用资源
	}
	var str = "";
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	str = UM_callNativeService(this._getResString, resid);
    }else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		str = $service.call("UMService.getResString", "{resname:'" + resid + "'}", isSync);//默认同步调用
    }
    return str;
}
UMP.Services.Resource.prototype = {
	getResString : UMP$Services$Resource$getResString
};
UMP.Services.Resource.registerClass('UMP.Services.Resource');
$res = new UMP.Services.Resource();


//___________________________________________________________________________________________________ $view UMP.Services.UMView
UMP.Services.UMView = function UMP$Services$UMView(){	
}
function UMP$Services$UMView$open2(jsonArgs){
	if(jsonArgs){
		var viewid = jsonArgs["viewid"];
		if(viewid == null || viewid == ""){
			alert("没有指定参数viewid");
		}else{
			$service.call("UMView.open",jsonArgs);
		}
	}
}
function UMP$Services$UMView$open(jsonArgs){
	if(jsonArgs){
		var viewid = jsonArgs["viewid"];
		if(viewid == null || viewid == ""){
			alert("没有指定参数viewid");
		}else{
			if($validator.isNamespace){
				var ind = viewid.indexOf("。");//半角
				if(ind>=0){
					alert("执行$view.open时，\n参数viewid["+viewid+"]的第"+(ind+1)+"个字母是中文点")
					return;
				}
				ind = viewid.indexOf("。");//全角
				if(ind>=0){
					alert("执行$view.open时，\n参数viewid["+viewid+"]的第"+(ind+1)+"个字母是中文点")
					return;
				}
				
				ind = viewid.indexOf(" ");//包含空格
				if(ind>=0){
					alert("执行$view.open时，\n参数viewid["+viewid+"]的第"+(ind+1)+"个字母是空格")
					return;
				}
				var ns = viewid.substring(0,viewid.lastIndexOf("."));
				if($validator.isNamespace(ns)){
					$service.call("UMView.open",jsonArgs);
				}else{
					alert("$view.open执行失败");
				}
			}else{
				$service.call("UMView.open",jsonArgs);
			}			
		}
	}
}
function UMP$Services$UMView$close(jsonArgs){
	if(typeof jsonArgs == "undefined"){
		jsonArgs = {
			resultcode : 0
		};
	}
	if($isJSONObject(jsonArgs)){
		$service.call("UMView.close",jsonArgs);
	}else{
		alert("请使用close({...})或close()形式的API");
	}	
}
function UMP$Services$UMView$closeWithCallBack(jsonArgs){
	/*
	json = {
		mydata:{a:2,b:45},
		resultcode:15
	}
	*/
	if(typeof jsonArgs == "undefined"){
		jsonArgs = {
			resultcode : 15
		};
	}
	if($isJSONObject(jsonArgs)){
		jsonArgs["resultcode"] = "15";
		$service.call("UMView.close",jsonArgs);
	}else{
		alert("请使用close({...})或close()形式的API");
	}
}
function UMP$Services$UMView$launcher(val){
	if(typeof val == "undefined"){
		return $service.readConfig("customuaplauncher");
	}else{
		return $service.writeConfig({
			"customuaplauncher" : val
		});
	}
}
function UMP$Services$UMView$openPop(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.openPop",jsonArgs);
	}
}
function UMP$Services$UMView$closePop(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.closePop",jsonArgs);
	}
}
function UMP$Services$UMView$openDialog(jsonArgs){
	/*
	style
	titile
	bingdire
	
	
	*/
	if(jsonArgs){
		if(jsonArgs["style"]==null || jsonArgs["style"]==""){
			jsonArgs["style"] = "ok";
		}else if(jsonArgs["style"]=="text-dialog"){
			if(jsonArgs["bindfield"]==null || jsonArgs["bindfield"] == ""){
				jsonArgs["bindfield"] = "bindfield";//默认指定绑定字段为bindfield
			}
		}
		$service.call("UMView.openDialog",jsonArgs);
	}
}
function UMP$Services$UMView$openReference(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.openReference",jsonArgs);
	}
}
function UMP$Services$UMView$openPicker(jsonArgs){
	//参数过多，args为一个json对象
	//UMView.openPicker(args);
	/*    args结构如下：
	参数：
	"pickercount" 必填 枚举值是 1 ,2 ,3
	"datasource"  必填 数据源对应的字段名
	"title"  iOS 可以没有
	"okbuttontitle" 确定控钮 显示的文字
	"cancelbuttontitle" 取消控钮 显示的文字
	"picker1binder"    picker1收集在context中的字段名
	"picker2binder"    picker2收集在context中的字段名
	"picker3binder"    picker3收集在context中的字段名

	事件：
	"okaction"  确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
	"okaction"  确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
	" onselectedchange1"  picker1选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	" onselectedchange2"  picker2选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	" onselectedchange3"  picker3选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	
	*/
	//args形如args1
	var args1 ={
		pickercount:"1",
		datasource:"fieldA",
		title:"",
		okbuttontitle:"确定",
		cancelbuttontitle:"取消",
		picker1binder:"fieldA",
		picker2binder:"fieldB",
		picker3binder:"fieldC",
		okaction:"okAction",  //确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
		cancelaction:"cancelAction",  //确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
		onselectedchange1:"action1",  //picker1选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
		onselectedchange2:"action2",  //picker2选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
		onselectedchange3:"action3"  //picker3选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	};
	
	if(jsonArgs){
		$service.call("UMView.openPicker",jsonArgs);
	}
}
function UMP$Services$UMView$alert(msg){
	var args = {
		title:"确认",
		style:"ok",		
		message:msg		
	};
	return this.openDialog(args);
}
function UMP$Services$UMView$confirm(msg){
	var args = {
		title:"确认",
		style:"ok-cancel",		
		message:msg		
	};
	return this.openDialog(args);
}
function UMP$Services$UMView$changePage(url, options){
	if(!url){
		alert("未指定url");
		return;
	}
	options = options || {};
	options["url"] = url;
	$service.call("UMView.changePage", options);
}
UMP.Services.UMView.prototype = {
	/** 
	* 打开一个新页面 	
	* @param {JSON} json - 打开一个新页面的参数设置{viewid:"xxx.xxx.xxx", isKeep:false, callback:"xxxActionId"}
	* @return {void}
	*/		
	open : UMP$Services$UMView$open,
	open2 : UMP$Services$UMView$open2,
	/** 
	* 关闭当前页面，默认resultcode为0，当resultcode==15时，表明可以执行open方法中定义的callback 	
	* @param {JSON} json - 打开一个新页面的参数设置{resultcode:15, callbackData:{a:1, b:2}}
	* @return {void}
	*/		
	//xxx
	close : UMP$Services$UMView$close,
	closeWithCallBack : UMP$Services$UMView$closeWithCallBack,
	launcher : UMP$Services$UMView$launcher,
	openPop : UMP$Services$UMView$openPop,
	closePop : UMP$Services$UMView$closePop,
	openDialog : UMP$Services$UMView$openDialog,
	openReference : UMP$Services$UMView$openReference,
	openPicker : UMP$Services$UMView$openPicker,
	alert : UMP$Services$UMView$alert,
	confirm : UMP$Services$UMView$confirm,
	changePage : UMP$Services$UMView$changePage
};
UMP.Services.UMView.registerClass('UMP.Services.UMView');
$view = new UMP.Services.UMView();
//----------------------------------------------------------------------------END
UMP.Services.UMWindow = function UMP$Services$UMWindow(){	
}
function UMP$Services$UMWindow$showModalDialog(args){
	if(!$isJSONObject(args)){
		alert("参数不是一个有效的JSONObject");
		return;
	}
	if(args["dialogId"]==null){
		alert("showModalDialog方法的参数dialogId是必填参数");
		return;
	}
	
	return $service.call("UMDialog.showModalDialog", args, false);
}
function UMP$Services$UMWindow$close(args){
	if(typeof args == "undefined"){
		args = {};
	}
	return $service.call("UMDialog.close", args, false);
}
UMP.Services.UMWindow.prototype = {
	showModalDialog : UMP$Services$UMWindow$showModalDialog,
	close : UMP$Services$UMWindow$close
};
UMP.Services.UMWindow.registerClass('UMP.Services.UMWindow');
$window = new UMP.Services.UMWindow();
//



//___________________________________________________________________________________________________ $umdevice UMP.Services.UMDevice
UMP.Services.UMDevice = function UMP$Services$UMDevice(){
	this._UMDevice_getDeviceInfo="UMDevice.getDeviceInfo";
    this._UMDevice_captureTwodcode="UMDevice.captureTwodcode";
	this._deviceInfo_Screen = null;
}
function UMP$Services$UMDevice$getTimeZoneID(){
	return	UM_NativeCall.callService("UMDevice.getTimeZoneID", "", true);
}
function UMP$Services$UMDevice$getTimeZoneDisplayName(){
	return	UM_NativeCall.callService("UMDevice.getTimeZoneDisplayName", "", true);
}
function UMP$Services$UMDevice$getDeviceInfo(jsonArgs){
	/*
		用法1、使用同步调用直接获取返回值。
		var devinfo = call2("UMDevice.getDeviceInfo");        //无参数
		
		用法2、使用异步调用方法，CallBack中获取返回值
		call("UMDevice.getDeviceInfo","{bindfield:devinf,callback:sendToMA}"); 
	*/
	var result = "";
	if(jsonArgs){
		result = $service.call(this._UMDevice_getDeviceInfo, $jsonToString(jsonArgs), false);
	}else{
		result = $service.call(this._UMDevice_getDeviceInfo, "", true);
	}
	//alert(result);
	//alert($jsonToString(result););
	return result;
	/*
	var jsonArgs = {
		bindfield:devinf,
		callback:sendToMA
	};
	return	UM_NativeCall.callService(this._UMDevice_getDeviceInfo, $jsonToString(jsonArgs), false);
	*/
	
}
function UMP$Services$UMDevice$getLocation(json){
	/*
	return $service.call("UMDevice.getLocation", {
		"bindfield" : "location",  //
		"single":"true",  //是否只获取1次
		"isgetaddress" : "true",  //是否获取地址
		"network" : "true",   //是否wify定位
		"callback" : "locationcallback()"
	});
	*/
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = json;
	}else{
	    alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
		return;
	}
	var result = $service.call("UMDevice.getLocation", args);
	var returnVal = "";
	if(typeof result == "string"){
	    returnVal = "状态为"+result+", 可以通过callback获取返回值";
	}
	return returnVal;
}
function UMP$Services$UMDevice$captureTwodcode(json){
	var result = "";
	if(jsonArgs){
		result = $service.call(this._UMDevice_captureTwodcode, $jsonToString(jsonArgs), false);
	}else{
		result = $service.call(this._UMDevice_captureTwodcode, "", true);
	}
	return result;
}
function UMP$Services$UMDevice$capturePhoto(args){
	/*
	var params = {
		bindfield : "image",
		callback : "imageCallback()"
	};
	*/
	if(!$isJSONObject(args)){
		alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
	}
	$service.call("UMDevice.capturePhoto", args);

}
function UMP$Services$UMDevice$getAlbumPath(args){
	//args = { allAlbum: true}    ---> [{path:"xx/xx/UAPIMage1"},{path:"xx/xx/UAPIMage2"}，{path:"xx/xx/UAPIMage3"}]
	return $service.call("UMDevice.getAlbumPath", typeof args == "undefined" ? {} : args, true);
}
function UMP$Services$UMDevice$getAppAlbumPath(jsonArgs){
	if(jsonArgs){
		if(!$isJSONObject(jsonArgs)){
			alert("调用 getAppAlbumPath 服务时，参数不是一个有效的JSONObject");
			return;
		}
	}else{
		jsonArgs = {};
	}
	return $service.call("UMDevice.getAppAlbumPath", jsonArgs, true);
}
function UMP$Services$UMDevice$generateQRCode(json){
	return $scanner.generateQRCode(json);
}

function UMP$Services$UMDevice$sendMail(receive, title, content){
    var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = receive;
	}else{
		args["receive"] = receive;
		args["title"] = title;
		args["content"] = content;
	}
	$service.call("UMDevice.sendMail", args);
	
	/*
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	UM_callNativeService(this._SENDEMAIL,mail,body);
    }else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		$service.call("UMDevice.sendMail", "{mail:'"+mail+"',body:'"+body+"'}");
    }
	*/
}
function UMP$Services$UMDevice$saveContact(args){
/*
    var params = {
              tel:"",//手机号码
              employeename:"",//联系人名称
      jobname:"",//职位
      orgname:"",//部门名称
      address:"",//单位地址
      email:"",//邮箱
      officetel:""//办公电话
       };
	   */
	if(!$isJSONObject(args)){
		alert("调用saveContact服务时，参数不是一个有效的JSONObject");
	}
	$service.call("UMDevice.saveContact", args);
}
function UMP$Services$UMDevice$getContacts(){
	return $service.call("UMDevice.getContactPerson", {}, true);
}
function UMP$Services$UMDevice$openAddressBook(){
    return $service.call("UMDevice.openAddressBook",{});
}
function UMP$Services$UMDevice$getInternalMemoryInfo(){
    return $service.call("UMDevice.getInternalMemoryInfo",{},true);
}
function UMP$Services$UMDevice$getExternalStorageInfo(){
    return $service.call("UMDevice.getExternalStorageInfo",{},true);
}
function UMP$Services$UMDevice$getMemoryInfo(){
    return $service.call("UMDevice.getMemoryInfo",{},true);
}
function UMP$Services$UMDevice$gotoMapView(args){
	/*
	var args = {
		posX:"",//位置信息x坐标
		posY:"",//位置信息y坐标
		bindfield:"",//绑定字段
		auto:"false",//是否自动定位
		aroundpoi :"",//周围兴趣点
		keyword:"",//要定位的关键字
		onaroundpoiclick:"",//兴趣点点击触发的JS方法
		onmylocationclick:""//我的位置点击触发的JS方法
	};
	*/
	if(!$isJSONObject(args)){
		alert("调用gotoMapView服务时，参数不是一个有效的JSONObject");
	}
    return $service.call("UMDevice.gotoMapView",args);
}
function UMP$Services$UMDevice$openWebView(args){
    if(!$isJSONObject(args)){
		alert("调用gotoMapView服务时，参数不是一个有效的JSONObject");
	}
	/*
	var args = {url:"http://www.baidu.com"};
	*/
	return $service.call("UMDevice.openWebView", args);
}
function UMP$Services$UMDevice$screenShot(args){
    if(!$isJSONObject(args)){
		alert("调用screenshot服务时，参数不是一个有效的JSONObject");
	}
	return $service.call("UMDevice.screenshot",args,true);
}
function UMP$Services$UMDevice$notify(args){
	/*var params = {
	  "sendTime" : "2015-02-03 13:54:30",
	  "sendBody" : "您设置了消息提醒事件",
	  "icon": "app.png"
	};*/
    $service.call("UMService.localNotification", args);
}
function UMP$Services$UMDevice$getScreenWidth(){
	if(!this._deviceInfo_Screen){
		var strd_info = $device.getDeviceInfo();	
		var info = $stringToJSON(strd_info);
		this._deviceInfo_Screen = info.screen;
	}
	if(this._deviceInfo_Screen){
		return this._deviceInfo_Screen.width;		
	}else{
		$toast("未能获取到该设备的屏幕信息");
	}
}
function UMP$Services$UMDevice$getScreenHeight(){
	if(!this._deviceInfo_Screen){
		var strd_info = $device.getDeviceInfo();	
		var info = $stringToJSON(strd_info);
		this._deviceInfo_Screen = info.screen;
	}
	if(this._deviceInfo_Screen){
		return this._deviceInfo_Screen.height;		
	}else{
		$toast("未能获取到该设备的屏幕信息");
	}
}
function UMP$Services$UMDevice$getScreenDensity(){
	if(!this._deviceInfo_Screen){
		var strd_info = $device.getDeviceInfo();	
		var info = $stringToJSON(strd_info);
		this._deviceInfo_Screen = info.screen;
	}
	if(this._deviceInfo_Screen){
		return this._deviceInfo_Screen.density;		
	}else{
		$toast("未能获取到该设备的屏幕信息");
	}
}
function UMP$Services$UMDevice$currentOrientation(){
	return $service.call("UMDevice.currentOrientation", {}, true);
}
UMP.Services.UMDevice.prototype = {	
	getTimeZoneID : UMP$Services$UMDevice$getTimeZoneID,
	getTimeZoneDisplayName : UMP$Services$UMDevice$getTimeZoneDisplayName,
	getDeviceInfo : UMP$Services$UMDevice$getDeviceInfo,
	captureTwodcode : UMP$Services$UMDevice$captureTwodcode,
	getLocation : UMP$Services$UMDevice$getLocation,
	/** 
	* 打开扫描仪器	
	* 启动二维码扫描
	* { bindfield:"xxxx", framewidth:"100", frameheight:"100", 
	   frametext:"扫一扫"
	  }
	* @param {JSON} json -  { bindfield:"xxxx", framewidth:"100", frameheight:"100",frametext:"扫一扫"}
	* @return {void}
	*/
	openscan : UMP$Services$UMDevice$captureTwodcode,
	capturePhoto  : UMP$Services$UMDevice$capturePhoto,
	getAlbumPath : UMP$Services$UMDevice$getAlbumPath,
	getAppAlbumPath : UMP$Services$UMDevice$getAppAlbumPath,
	generateQRCode : UMP$Services$UMDevice$generateQRCode,
	sendMail : UMP$Services$UMDevice$sendMail,
    saveContact : UMP$Services$UMDevice$saveContact,
	getContacts : UMP$Services$UMDevice$getContacts,
	
	openAddressBook : UMP$Services$UMDevice$openAddressBook,
	getInternalMemoryInfo  : UMP$Services$UMDevice$getInternalMemoryInfo ,
	getExternalStorageInfo  : UMP$Services$UMDevice$getExternalStorageInfo ,
	getMemoryInfo  : UMP$Services$UMDevice$getMemoryInfo ,
	gotoMapView : UMP$Services$UMDevice$gotoMapView,
	openWebView : UMP$Services$UMDevice$openWebView,
	screenShot: UMP$Services$UMDevice$screenShot,
	notify	: UMP$Services$UMDevice$notify,
	getScreenWidth : UMP$Services$UMDevice$getScreenWidth,
	getScreenHeight : UMP$Services$UMDevice$getScreenHeight,
	getScreenDensity : UMP$Services$UMDevice$getScreenDensity,
	currentOrientation : UMP$Services$UMDevice$currentOrientation
};
UMP.Services.UMDevice.registerClass('UMP.Services.UMDevice');
$device = new UMP.Services.UMDevice();//命名规范 $device === UMDevice
$umdevice = $device;

//___________________________________________________________________________________________________ $badge --> UMP.Services.Badge
//Badge相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Badge = function UMP$Services$Badge(){
}
function UMP$Services$Badge$showBadge(args){
    /*
	var args = {
		target:"image0",
		text:"1234",
        position:"topright"
    };
	*/
	return $service.call("UMBadgeService.ShowBadge", args); 
}
function UMP$Services$Badge$hideBadge(args){
	/*
	var args = {
		target:"image0"
	};
	*/
	return $service.call("UMBadgeService.HideBadge", args);
}
UMP.Services.Badge.prototype = {
	showBadge: UMP$Services$Badge$showBadge,
	hideBadge : UMP$Services$Badge$hideBadge
};
UMP.Services.Badge.registerClass('UMP.Services.Badge');
$badge = new UMP.Services.Badge();


//___________________________________________________________________________________________________ $tel --> UMP.Services.Telephone
//电话相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Telephone = function UMP$Services$Telephone(){
    this._SAVECONTACT="um_saveContact";//?????
	this._CALLTEL="um_CallTel";//ios--ok	
	this._SENDMSG = "um_SendMsg";//ios--ok
	this._SENDEMAIL = "um_SendEmail";//ios--ok
}
/*
function UMP$Services$Telephone$saveContact(tel, employeename, jobname, orgname, adress){
    if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	UM_callNativeService(this._SAVECONTACT, tel, employeename, jobname, orgname, adress);
	}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		var args = {};
		args["tel"] = tel;
		args["employeename"] = employeename;
		args["jobname"] = jobname;
		args["orgname"] = orgname;
		args["adress"] = adress;
		$service.call("UMDevice.saveContact", $jsonToString(args));
	}else{
		alert("Not implementate UMP$Services$Telephone$saveContact in CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType);
	}
}
*/
function UMP$Services$Telephone$call(tel){
	if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
    	UM_callNativeService(this._CALLTEL, tel);
		//UM_callNativeServiceNoraml
	}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
   		$service.call("UMDevice.callPhone", "{tel:'"+tel+"'}");
	}else{
		alert("Not implementate UMP$Services$Telephone$call in CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType);
	}
}
function UMP$Services$Telephone$sendMsg(tel, body){
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		var args = tel;		
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			return UM_callNativeService(this._SENDMSG, args.tel, args.body);
		}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
			return $service.call("UMDevice.sendMsg", args);
		}
	}else{
		if(CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS){
			UM_callNativeService(this._SENDMSG, tel, body);
		}else if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid) {
			//$service.call("UMDevice.sendMessage", "{recevie:'"+tel+"',message:'"+body+"'}");
			$service.call("UMDevice.sendMsg", "{tel:'"+tel+"',body:'"+body+"'}");
		}
	}
}
function UMP$Services$Telephone$sendMail(receive, title, content){
	var args = {};
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		args = receive;
	}else{
		args["receive"] = receive;
		args["title"] = title;
		args["content"] = content;
	}
    return $device.sendMail(args);	
}
function UMP$Services$Telephone$saveContact(args){
	return $device.saveContact(args)
}
UMP.Services.Telephone.prototype = {
	call: UMP$Services$Telephone$call,
	sendMsg: UMP$Services$Telephone$sendMsg,
	sendMail: UMP$Services$Telephone$sendMail,
	saveContact : UMP$Services$Telephone$saveContact
};
UMP.Services.Telephone.registerClass('UMP.Services.Telephone');
$tel = new UMP.Services.Telephone();




//___________________________________________________________________________________________________ $vibrator --> UMP.Services.Vibrator
//振荡器相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.UMPush = function UMP$Services$UMPush(){

}
function UMP$Services$UMPush$registerDevice(json){
	if(!json) json = {};
	return $service.call("UMPush.registerDevice", json, false);
}
function UMP$Services$UMPush$removeDevice(json){
	if(!json) json = {};
	return $service.call("UMPush.removeDevice", json, false);
}
UMP.Services.UMPush.prototype = {
	registerDevice : UMP$Services$UMPush$registerDevice,
	removeDevice : UMP$Services$UMPush$removeDevice
};
UMP.Services.UMPush.registerClass('UMP.Services.UMPush');
$upush = new UMP.Services.UMPush();



//___________________________________________________________________________________________________ $vibrator --> UMP.Services.Vibrator
//振荡器相关服务
/*
*/ 
Type.registerNamespace('UMP.Services');
UMP.Services.Vibrator = function UMP$Services$Vibrator(){

}
function UMP$Services$Vibrator$vibrate(ms){
	if(typeof ms == "undefined")
		ms = 30;
	
	return $service.call("UMDevice.vibrator",{s:ms});
}
UMP.Services.Vibrator.prototype = {
	vibrate : UMP$Services$Vibrator$vibrate
};
UMP.Services.Vibrator.registerClass('UMP.Services.Vibrator');
$vibrator = new UMP.Services.Vibrator();

UMP.Services.UMGraphics = function UMP$Services$UMGraphics(){

}
UMP.Services.UMGraphics.prototype = {
	watermark : function(json){
		/*
		json = {
				src : "a/b/c/x.png", //原图片路径
				watermark : "a/b/y.png",//水印图片路径
				target : "a/b/xy.png"//输出路径
		};
		*/
		return $service.call("UMGraphics.watermark", json, false);
	}
}
UMP.Services.UMGraphics.registerClass('UMP.Services.UMGraphics');
$graphics = new UMP.Services.UMGraphics();

//========================================= $camera ======================================================== $camera
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCamera=function(){	
	this._UMDevice_openCamera = "UMDevice.openCamera";
	this._UMDevice_openPhotoAlbum = "UMDevice.openPhotoAlbum";
}

function UMP$UI$Container$UMCamera$open(args){
	/*{
		bindfield:
		callback:
		compressionRatio:""
	}
	*/
	if($validator.checkIfExist(args, ["bindfield","callback","compressionRatio"]))
		return $service.call(this._UMDevice_openCamera,args,false);
}
function UMP$UI$Container$UMCamera$openPhotoAlbum(json){
	if(!json) return;
	var args = {};
	if(json.bindfield)
		args["bindfield"] = json["bindfield"];
	if(json.callback)
		args["callback"] = json["callback"];
	if(json.compressionRatio)
		args["compressionRatio"] = json["compressionRatio"];
	return $service.call(this._UMDevice_openPhotoAlbum, args, false)//异步调用服务
}
UMP.UI.Container.UMCamera.prototype ={
	open : UMP$UI$Container$UMCamera$open,
	openPhotoAlbum : UMP$UI$Container$UMCamera$openPhotoAlbum
}
UMP.UI.Container.UMCamera.registerClass('UMP.UI.Container.UMCamera');
$camera = new UMP.UI.Container.UMCamera();

//========================================= $scanner ======================================================== $scanner
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMScanner=function(){	
	this._UMDevice_captureTwodcode = "UMDevice.captureTwodcode";
	this._UMDevice_createTwocodeImage = "UMDevice.createTwocodeImage";
}

function UMP$UI$Container$UMScanner$open(jsonArgs){
	var result = "";
	if(jsonArgs){
		if(jsonArgs["frameclose"] == null){
			jsonArgs["frameclose"] =  "true";//默认扫描后关闭
		}			
		result = $service.call(this._UMDevice_captureTwodcode, jsonArgs, false);
	}else{
		result = $service.call(this._UMDevice_captureTwodcode, "", true);
	}
}
function UMP$UI$Container$UMScanner$generateQRCode(jsonArgs){
	//twocode-size  //二维码大小，默认180*180，二维码为正方形
	//twocode-content  //二维码内容，字符串
	if($isJSONObject(jsonArgs)){
		if(typeof jsonArgs["size"] != "undefined"){
			jsonArgs["twocode-size"] =  jsonArgs["size"];
		}
		if(typeof jsonArgs["content"] != "undefined"){
			jsonArgs["twocode-content"] =  jsonArgs["content"];
		}
		if(typeof jsonArgs["twocode-size"] == "undefined"){
			jsonArgs["twocode-size"] =  "180";
		}
		if(typeof jsonArgs["twocode-content"] == "undefined"){
			alert("参数twocode-content不能为空，此参数用来标识扫描二维码后的返回值");
			return;
		}
	}else{
		alert("generateQRCode方法的参数不是一个有效的JSONObject!");
		return;
	}
	
	return $service.call(this._UMDevice_createTwocodeImage, jsonArgs, true);
}
UMP.UI.Container.UMScanner.prototype ={
    /** 
	* 打开扫描仪器	
	* 启动二维码扫描
	* { bindfield:"xxxx", framewidth:"100", frameheight:"100", 
	   frametext:"扫一扫"
	  }
	* @param {JSON} json -  { bindfield:"xxxx", callback:"myCallBack()", framewidth:"100", frameheight:"100",frametext:"扫一扫"}
	* @return {void}
	*/
	open : UMP$UI$Container$UMScanner$open,
	generateQRCode : UMP$UI$Container$UMScanner$generateQRCode
}
UMP.UI.Container.UMScanner.registerClass('UMP.UI.Container.UMScanner');
$scanner = new UMP.UI.Container.UMScanner();
//______________________________________________________________________________________________________ $scanner End


//___________________________________________________________________________________________________ $js
Type.registerNamespace('UMP.Services');
UMP.Services.UMJS=function(){	
	this._UMCtx_dataBind = "UMCtx.dataBind";	
	
	this._UMCtx_getValue = "UMCtx.getValue";
	
	this._UMCtx_setValue = "UMCtx.setValue";
	this._UMCtx_setUMContext = "UMCtx.setUMContext";
	this._UMCtx_setAppValue = "UMCtx.setAppValue";
}
function UMP$Services$UMJS$showLoadingBar(args){
	//显示loading： args = {opacity:0.8, background:#e3e3ea}
	return $service.call("UMJS.showLoadingBar", typeof args == "undefined" ? {} : args);
}
function UMP$Services$UMJS$hideLoadingBar(args){
	//隐藏loading：
	return $service.call("UMJS.hideLoadingBar",typeof args == "undefined" ? {} : args);
}
function UMP$Services$UMJS$toast(msg){
	//$service.call("UMJS.toast", {"msg":"保存成功"}, false);
	var json = {};
	if(typeof msg == "undefined"){
		json = {"msg" : "undefined"};
	}else if(msg == null){
		json = {"msg" : "null"};
	}else if(typeof msg == "string"){
		json = {"msg" : msg};
	}else if($isJSONObject(msg)){
		json = msg;
	}else{
		alert("$toast方法不支持参数类型为["+typeof msg+"]的参数,不是一个有效的字符串或JSONObject");
		return;
	}
	return $service.call("UMJS.toast", json, false);
}
function UMP$Services$UMJS$runjs(json){
	if($isJSONObject(json)){
		return $service.call("UMJS.runjs", json, false);
	}else{
		alert("$js.runjs 方法参数不是有效的JSONObject");
	}
}
function UMP$Services$UMJS$refresh(args){
	$service.call("UMJS.refresh", args, false);//非同步调用
}
function UMP$Services$UMJS$getTimeTicks(){
	return $service.call("UMJS.getTimeTicks", {}, true);
}
function UMP$Services$UMJS$randomUUID(){
	return $service.call("UMJS.randomUUID", {}, true);
}
function UMP$Services$UMJS$urlDecode(content){
//$service.call(“UMJS.urlDecode, {content:”http%3A%2F%2Fwpzs.yonyouyidong.com%3A8380%2Fflyer%2F17872%2F146337.html”},true)
	var json = content;
	if(typeof content == "string"){
		json = {"content" : content};
	}
	return $service.call("UMJS.urlDecode", json, true);
}
function UMP$Services$UMJS$urlEncode(content){
//$service.call(“UMJS.urlEncode, {content:”用友 软件abg”},true)
	var json = content;
	if(typeof content == "string"){
		json = {"content" : content};
	}
	return $service.call("UMJS.urlEncode", json, true);
}
function UMP$Services$UMJS$backConfirm(){
	//Android - 对物理back添加监听事件，弹出对话框：
	return $service.call("UMJS.addback", {}, false);
}
UMP.Services.UMJS.prototype ={
	getTimeTicks : UMP$Services$UMJS$getTimeTicks,
	randomUUID : UMP$Services$UMJS$randomUUID,
	urlDecode : UMP$Services$UMJS$urlDecode,
	urlEncode : UMP$Services$UMJS$urlEncode,
	showLoadingBar : UMP$Services$UMJS$showLoadingBar,
	hideLoadingBar : UMP$Services$UMJS$hideLoadingBar,
	toast : UMP$Services$UMJS$toast,
	refresh : UMP$Services$UMJS$refresh,
	runjs : UMP$Services$UMJS$runjs,
	backConfirm : UMP$Services$UMJS$backConfirm
}
UMP.Services.UMJS.registerClass('UMP.Services.UMJS');
$js = new UMP.Services.UMJS();
$toast = $js.toast;

UMP.Services.UMEncryption=function(){
	
}
function UMP$Services$UMEncryption$md5HexUtf8(data){
	var json = data;
	if(typeof data == "string"){
		json = {"data" : data};
	}
	return $service.call("UMEncryption.md5HexUtf8", json, true);
}
UMP.Services.UMEncryption.prototype ={
	md5HexUtf8 : UMP$Services$UMEncryption$md5HexUtf8,
	md5 : UMP$Services$UMEncryption$md5HexUtf8
}
UMP.Services.UMEncryption.registerClass('UMP.Services.UMEncryption');
$encryption = new UMP.Services.UMEncryption();
//$service.call("UMEncryption.md5HexUtf8",{data:"123456"},true)

UMP.Services.UMWXShare=function(){
}

function UMP$Services$UMWXShare$init(json){
	//$service.call("UMWXShare.init", {"appid":"wx9aaa6c47f70709e3"}, false); 	
	if($isJSONObject(json)){
		return $service.call("UMWXShare.init", json, false);
	}else{
		alert("$wxshare.init 方法参数不是有效的JSONObject");
	}
}
function UMP$Services$UMWXShare$sendText(json){
	//$service.call("UMWXShare.sendText", {"text":"text哈哈哈哈哈","type":"chat"}, false); 
	//$service.call("UMWXShare.sendText", {"text":"text哈哈哈哈哈","type":"friends"}, false); 
	
	if($isJSONObject(json)){
		return $service.call("UMWXShare.sendText", json, false);
	}else{
		alert("$wxshare.sendText 方法参数不是有效的JSONObject");
	}
}
function UMP$Services$UMWXShare$sendImage(json){
	//$service.call("UMWXShare.sendImage", {"image":"rpt.png","type":"chat"}, false); 
	//$service.call("UMWXShare.sendImage", {"image":"rpt.png","type":"friends"}, false); 
	if($isJSONObject(json)){
		return $service.call("UMWXShare.sendImage", json, false);
	}else{
		alert("$wxshare.sendImage 方法参数不是有效的JSONObject");
	}
}
function UMP$Services$UMWXShare$sendTextandImage(json){
	//$service.call("UMWXShare.sendTextandImage",{"url":"http://mobile.yyuap.com/","title":"图文测试","des":"正文描述","image":"rpt.png","type":"chat"},false); 
	if($isJSONObject(json)){
		return $service.call("UMWXShare.sendTextandImage", json, false);
	}else{
		alert("$wxshare.sendTextandImage 方法参数不是有效的JSONObject");
	}
}
UMP.Services.UMWXShare.prototype ={
	init : UMP$Services$UMWXShare$init,
	sendText : UMP$Services$UMWXShare$sendText,
	sendImage : UMP$Services$UMWXShare$sendImage,
	sendTextandImage : UMP$Services$UMWXShare$sendTextandImage	
}
UMP.Services.UMWXShare.registerClass('UMP.Services.UMWXShare');
$wxshare = new UMP.Services.UMWXShare();


//
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMAnimation=function(){	

}

function UMP$UI$Container$UMAnimation$animate(id, settings, callback){
	/*
	var args=  {
		id:"widget2",
		animations : [{
			type:"scale",		
			duration:2000,
			fromWidth:-1,			
			toWidth:-1,
			fromHeight:0,			
			toHeight:201,			
			pivotX:0,
			pivotY:0
		}]
	}
	*/
	if($isJSONObject(id)){
		$service.call("UMJS.animation", id, false);	
	}else{
		var args = {	
			id : id
		};
		if($isJSONArray(settings)){
			args["animations"] = settings;
		} else if($isJSONObject(settings)){
			var list = [];
			list.push(settings);
			args["animations"] = list;
		} else {
			alert("调用 animate 方法时，第二个参数settings不是一个有效的JSONArray对象");
		}
		if(callback)
			args["callback"] = callback;
		$service.call("UMJS.animation", args, false);
	}

}
function UMP$UI$Container$UMAnimation$show(){
}
function UMP$UI$Container$UMAnimation$hidden(){
}
UMP.UI.Container.UMAnimation.prototype ={
	show : UMP$UI$Container$UMAnimation$show,
	hidden : UMP$UI$Container$UMAnimation$hidden,
	animate : UMP$UI$Container$UMAnimation$animate
}
UMP.UI.Container.UMAnimation.registerClass('UMP.UI.Container.UMAnimation');
$anim = new UMP.UI.Container.UMAnimation();

//___________________________________________________________________________________________________ UMP.Services.File
UMP.Services.UMFile = function UMP$Services$UMFile(){
	this._downloadFile="UMService.downloadFile";
	this._UMFile_upload="UMFile.upload";
	this._UMFile_download = "UMFile.download";
}
function UMP$Services$UMFile$downloadFile(fileid, downloadpath, filename, filetype, filesize, downflag, startposition, endposition){
	var args = {};
	args["fileid"]=fileid;//args.put("fileid","0001A11000000000ZEYD"); 文件ID
	args["downloadpath"]=downloadpath;//args.put("downloadpath","0001A11000000000ZEYD"); 文件下载路径
	args["filename"]=filename;//args.put("filename","abc"); 文件名称
	args["filetype"]=filetype;//args.put("filetype","doc"); 文件类型	
	args["filesize"]=filesize;//args.put("filesize"] = args.put("filesize","300"); 文件大小
	args["downflag"]=downflag;//args.put("downflag","false"); 是否断点续传
	args["startposition"]=startposition;//args.put("startposition","false"); 断点续传时开始位置
	args["endposition"]=endposition;//args.put("endposition","false"); 断点续传时结束位置
	
	
   	var strArgs = $jsonToString(args);
	return $service.call(this._downloadFile, strArgs);   
}
function UMP$Services$UMFile$upload(jsonArgs){
	/*
	var json = {
		"url" : "http://10.2.112.22:8080/umserver/upload",
		"filename" : imagePath,
		"bindfield" : "serverFileInfo",//上传后的服务器文件信息JSON对象，其中的url是地址，例如{url:http://xx/xx/xx.png}
		"callback" : "afterupload()"//在callback中通过bindfield可以获取上传后的服务器端文件地址
	};
	*/
	if ($isEmpty(jsonArgs.url)) {
		alert("参数url不能为空");//上传的地址
	}
	if ($isEmpty(jsonArgs.filename)) {
		alert("参数filename不能为空");//filename是要上传的文件的全路径+文件名
	}
	return $service.call(this._UMFile_upload, jsonArgs);//默认异步
}
function UMP$Services$UMFile$download(jsonArgs){
	/*
	var args = {
		url:upload.url,
		filename:"baidu.png",
		locate:"downloadTest/image",
		override:"true",
		callback:"afterDownload()"
	};
	*/
	if($isEmpty(jsonArgs.url)){
		alert("参数url不能为空");
	}
	if($isEmpty(jsonArgs.filename)){
		alert("参数filename不能为空");
	}
	if($isEmpty(jsonArgs.locate)){
		alert("参数locate不能为空");
	}
	if($isEmpty(jsonArgs.override)){
		alert("参数override不能为空");
	}
	if($isEmpty(jsonArgs.callback)){
		alert("参数callback不能为空");
	}
	
	return $service.call(this._UMFile_download, jsonArgs);//默认异步
}

function UMP$Services$UMFile$writeFile(filePath, content, append, charset, isSync){	
	if($environment.DeviceType == $environment.DeviceIOS){
		var str = content;
		if(typeof content != "string"){
			str = $jsonToString(content);
		}
		return UM_callNativeService(this._store, filePath, str);	
	}else if($environment.DeviceType == $environment.DeviceAndroid){
		var args ={};
		
		if(filePath)
			args["path"] = filePath;
		if(content)
			args["content"] = content;	
		if(append)
			args["append"] = append;
		if(charset)
			args["charset"] = charset;
		
		
		//var str = $jsonToString(args);
		
		if(typeof isSync == "undefined")
			return UM_NativeCall.callService("UMFile.write", args, true);//默认都是同步调用，避免write后read不到最新的结果
		else
			return UM_NativeCall.callService("UMFile.write", args, isSync);
		//___cache_UIState[path] = content;
	}
}
function UMP$Services$UMFile$write(args, isSync){
	//$service.call("UMFile.write",{"path":"filetest/test.txt",	"content":"天空中最微弱的星也有权利争取最美的灿烂" },true);
	if(typeof isSync == "undefined"){
		isSync = true
	}
	return UM_NativeCall.callService("UMFile.write", args, isSync);
}
function UMP$Services$UMFile$remove(args, isSync){
	//参数path支持文件和文件夹两种,$service.call("UMFile.delete",{"path":"filetest/test.txt"},true);
	return $service.call("UMFile.delete", args, typeof isSync == "undefined" ? false : true);//默认异步删除
}
function UMP$Services$UMFile$getFileInfo(args){
	//return $service.call("UMFile.getFileInfo",{"path":"filetest/test.txt"}, true);
	var json = args;
	if(typeof args == "string"){
		json = {"path" : args};
	}
	return $service.call("UMFile.getFileInfo",json, true);
}
function UMP$Services$UMFile$open(args){
	//return $service.call("UMDevice.openFile", {filename:"log.txt",filetype:"txt",filepath:"filetest/"}, false);
	if(!$isJSONObject(args)){
		alert("调用$file.open方法时，参数不是一个有效的JSONObject");
	}
	return $service.call("UMDevice.openFile", args, false);//调用的是UMDevice的方法
}
function UMP$Services$UMFile$ftpUpload(args){
	//return $service.call("UMDevice.ftpUpload",{"url":"10.2.112.44","port":"21","username":"UAPFTP","password":"UAPFTP","remotePath":"/UAPAndroid/test/sunny/","fileNamePath":"/storage/emulated/0/DCIM","fileName":"miss.jpg","compresize":"99","remoteFileName":"Mr.jpg"},false);
	if(!$isJSONObject(args)){
		alert("调用$file.open方法时，参数不是一个有效的JSONObject");
		return;
	}
	return $service.call("UMDevice.ftpUpload", args, false);//调用的是UMDevice的方法
}
function UMP$Services$UMFile$ftpDownload(args){
	//$service.call("UMDevice.ftpDownload",{"url":"10.2.112.44","port":"21","username":"UAPFTP","password":"UAPFTP","remotePath":"/UAPAndroid/test/sunny/","fileNamePath":"/storage/emulated/0/aaaaanewPath/ccc/","fileName":"Mr.jpg"},false);
	if(!$isJSONObject(args)){
		alert("调用$file.open方法时，参数不是一个有效的JSONObject");
		return;
	}
	return $service.call("UMDevice.ftpDownload", args, false);//调用的是UMDevice的方法
}
UMP.Services.UMFile.prototype = {
	downloadFile : UMP$Services$UMFile$downloadFile,
	upload : UMP$Services$UMFile$upload,
	download : UMP$Services$UMFile$download,
	writeFile : UMP$Services$UMFile$writeFile,
	write : UMP$Services$UMFile$write,
	remove : UMP$Services$UMFile$remove,
	getFileInfo: UMP$Services$UMFile$getFileInfo,
	open: UMP$Services$UMFile$open,
	ftpUpload : UMP$Services$UMFile$ftpUpload,
	ftpDownload : UMP$Services$UMFile$ftpDownload
};
UMP.Services.UMFile.registerClass('UMP.Services.UMFile');
$file = new UMP.Services.UMFile();
//----------------------------------------------------------------------------END



//___________________________________________________________________________________________________ UMP.Services.File
UMP.Services.UAPappStore = function UMP$Services$UAPappStore(){
}
function UMP$Services$UAPappStore$updateAPP(json){
	/*
		$service.call("UAPappStore.updateAPP", {
			url : $ctx.getApp("tempurl"),
			override : "true",
			callback:"upcomplete()"
		}, false);
	*/
	if(!$isJSONObject(json)){
		alert("调用$UAPappStore.updateAPP方法时，参数不是一个有效的JSONObject");
		return;
	}
	return $service.call("UAPappStore.updateAPP", json, false);
}
UMP.Services.UAPappStore.prototype = {
	updateAPP : UMP$Services$UAPappStore$updateAPP
};
UMP.Services.UAPappStore.registerClass('UMP.Services.UAPappStore');
$UAPappStore = new UMP.Services.UAPappStore();




//---------------------------------------------------------------------------------------------- $menu
UMP.Services.Menu = function UMP$Services$Menu(){
}
function UMP$Services$Menu$openDropDownList(args){
	/*
	var args = {
        controlid:"button1",
        dropDownListWidth:"200",
        dropItemsArray:[{
            name:"menu1",
            action:"menu1action()"
        },{
            name:"menu2",
            action:"menu2action()"
        },{
            name:"menu3",
            action:"menu3action()"
        }]
    }
	*/
	if(!$isJSONObject(args)){
		alert("调用$menu.openDropDownList()时的参数不是一个有效的JSONObject!");
	}
	$service.call("UMMenu.openDropDownList", args);

}
UMP.Services.Menu.prototype = {
	openDropDownList  : UMP$Services$Menu$openDropDownList 
};
UMP.Services.Menu.registerClass('UMP.Services.Menu');
$menu = new UMP.Services.Menu();


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

//___________________________________________________________________________________________________ UMP.Services.DebugMgr
Type.registerNamespace('UMP.Services');
UMP.Services.DebugMgr = function(){
	this._jsList = {};
	this._del = {};
	this._body = null;
	this._debugArea = null;
}
UMP.Services.DebugMgr.prototype ={
	reg : function (id, key, handler){
		if(this._del[id]){
			return;
		}

		this._jsList[id] = handler;
		var li = document.createElement("li");
		var btn = document.createElement("button");
		btn.innerHTML = "点击此时可以调试>> " + key;
		btn.onclick = handler;
		li.style +="margin:10px"
		li.appendChild(btn);
		this.getDebugArea().appendChild(li); 
	},
	clear : function (){
		for(key in this._jsList){
			this._del[key] = "deleted";
			var script = document.querySelector("#"+key);
			var scriptP = script.parentNode;
			script.innerHTML = "";
			scriptP.removeChild(script);
		}

		this._jsList = {};
		this.getDebugArea().innerHTML = "";
	},
	insertJS : function (id, str){
		var script = document.createElement("script");
		script.innerHTML =str;
		script.id = id;
		script.um_id = id;
		this.getDebugArea().appendChild(script); 
	},
	getBody : function (){
		if(this._body == null){
			if(document){
				this._body = document.querySelector("body");
			}else{
				alet("no exist document, pls check it ?");
			}
		}
		return this._body;
	},
	getDebugArea : function (){
		if(this._debugArea == null){
			if(document){
				this._debugArea = document.createElement("ul");
				this.getBody().appendChild(this._debugArea); 
			}else{
				alet("no exist document, pls check it ?");
			}
		}
		return this._debugArea;
	}
}
UMP.Services.DebugMgr.registerClass('UMP.Services.DebugMgr');
$debugMgr= new UMP.Services.DebugMgr();

//controller.js
//=================================================== UMP.UI.Mvc.Router =========================================================
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Router = function UMP$UI$Mvc$Router(){
	//_actionMapping决定调用顺序
}
var __debugger = true;
function UMP$UI$Mvc$Router$route(controllerBaseId, actionid, ctx){    
	var json = ctx;	
	if(typeof ctx =="string"){
	    json = $stringToJSON(ctx);
	}	
	var cBase = UM.__getInstance(controllerBaseId);
	cBase.execute(actionid, json);
}
function UMP$UI$Mvc$Router$eval(controllerid, js, ctx, sender, args, uicontrols){
	//if($isWeb && false){
	if(false){
		UM.__controller.eval(js, ctx, sender, args);
	}else{
		var c = UM.__getInstance(controllerid);
		if(c){
			c.eval(js, ctx, sender, args, uicontrols);
		}else{			
			alert(controllerid + "未能正确初始化加载，可能是由于语法错误导致未能正确加载\n建议启动调试进行排查，也可查看浏览器的控制台")
			return;
		}
	}
}
function UMP$UI$Mvc$Router$debug(controllerid, js, ctx, sender, args, custom){
	//if($isWeb && false){
	if(false){
		UM.__controller.eval(js, ctx, sender, args);
	}else{
		var c = UM.__getInstance(controllerid);
		if(c){
			if(!custom) alert("调试发生异常");
			custom["debug"] = "begin";//custom内已经含有id信息，用于标识该次执行JS的唯一标识
			$service.call("UMJS.debug",custom,true);//同步通知安卓原生调试开始
			
			c.eval(js, ctx, sender, args, {});//执行Controller中的eval方法
			
			custom["debug"] = "end";
			$service.call("UMJS.debug",custom,true);//同步通知安卓原生调试结束
		}else{			
			alert(controllerid + "未能正确初始化加载，可能是由于语法错误导致未能正确加载\n建议启动调试进行排查，也可查看浏览器的控制台")
			return;
		}
	}
}
UMP.UI.Mvc.Router.prototype = {
    route : UMP$UI$Mvc$Router$route,	
	eval : UMP$UI$Mvc$Router$eval,
	debug : UMP$UI$Mvc$Router$debug
};
UMP.UI.Mvc.Router.registerClass('UMP.UI.Mvc.Router');

if(typeof $router == "undefined")  {
	$router = new UMP.UI.Mvc.Router();
}
function $pageReady(){
	//$document.fireEvent("pageReady");
	if(typeof $document != "undefined"){
		$document.fireEvent("pageReady");
	}
}

//================================== UMP.UI.Mvc.ControllerBase ==========================================================================
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.ControllerBase = function UMP$UI$Mvc$ControllerBase(args) {	
	//this._context = null;
	//this._entity = null;
	this._controller = null;
	
	if(args){
		var context = args["context"];
		var controller = args["controller"];
		var namespace = args["namespace"];
			
		
		var controllerFullName = eval(namespace + "." + controller);
		var cT = eval(controllerFullName);	
		if(cT){
			this._controller = UM.__getInstance(cT);
			if(cT.initializeBase){
				cT.initializeBase(this._controller);
			}
		}else{
			alert("please check the js file["+controllerFullName+".js], it probably has some syntax wrong.");        
		}
	}
}
function UMP$UI$Mvc$ControllerBase$execute(actionid, json){
	var action = eval("this." + actionid);
	try{
		//json = action.apply(this, [json]);//不使用apply，则this为window
		eval("this."+actionid+"(json)")
	}catch(e){
        if(e.stack){
            alert(e.stack);
        }else{
            alert(e.name + ":" + e.message);
        }
    }    
	return json;
}
function UMP$UI$Mvc$ControllerBase$execMethod(args){
	try{    	
        if(!args.method){
			alert("Action[" + args.actionid + "]不存在Method[" + args.method + "]");
		}
		if(this._controller){					
			if(this._controller.initialize)
				this._controller.initialize();
			
			//var method = eval("this._controller." + args.method);
			//method.apply(this._controller, [args.json]);//不使用apply，则this为window
			//$$__debug_ctx = args.json;
			$ctx._setUMContext4debug(args.json);//debug Context
			//$document.uiMD(uiMD);//debug UIControl MetaData
		
			this._controller.method(args.method, args);
		}		
    }catch(e){
        alert(e.stack);
    }    
}
UMP.UI.Mvc.ControllerBase.prototype = {
	execute : UMP$UI$Mvc$ControllerBase$execute,
	execMethod : UMP$UI$Mvc$ControllerBase$execMethod	
};
UMP.UI.Mvc.ControllerBase.registerClass('UMP.UI.Mvc.ControllerBase');







Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Controller = function UMP$UI$Mvc$Controller(args) {	
}
function UMP$UI$Mvc$Controller$method(methodName, args){
	try{
		var func = eval("this."+methodName);
		func.apply(this, [args]);
		//or
		//eval("this."+methodName+"()");
	}catch(e){
        alert(e.stack);
    }    
}
function UMP$UI$Mvc$Controller$eval(js, json, sender, args, uiMD){
	try{
		$ctx._setUMContext4debug(json);//debug Context
		if(typeof $document != "undefined"){//H5工程无需$document
			$document.uiMD(uiMD);//debug UIControl MetaData
		}
		js = js.trim();
		if(js.indexOf("this.")==0 && js.indexOf("(")>0 && js.indexOf(")")>js.indexOf("(") ){
			//this.xxx()
			var funcName = js.substring(0, js.indexOf("("));
			var func = eval(funcName)
			if(func){
				func.apply(this, [sender, args]);
			}else{
				var m = funcName.substring(5);
				alert("调用[" + this.__typeName + "]的[" + m + "]方法异常：\n请检查"+this.__typeName+".prototype中是否有" + m + "的定义");
			}	
		}else{
			//xxx()
			if($isFunction($__cbm[js])){
				//callback队列中是否存在
				var func = $__cbm[js];
				func.apply(this, [sender, args]);				
			}else{
				var funcName = js.substring(0, js.indexOf("("));
				if(false && this.evaljs){
					//this.evaljs(js);//xxx()
					var func = eval(funcName);
					func.apply(this, [sender, args]);					
				}else{
					try{
						var func = null;
						try{
							func = eval(funcName);
						}catch(e){
							var info = "找不到方法["+funcName+"]的定义\n\n";
							e.stack ? alert(info + e.stack) : alert(info + e);
							return;
						}
						if($isFunction(func)){
							func.apply(this, [sender, args]);		
						}else{
							alert("要执行的["+funcName+"]不是一个有效的function，请检查");
						}
					}catch(e){
						e.stack ? alert(e.stack) : alert(e);						
					}		
				}
			}			
		}
    }catch(e){
        alert(e.stack);
    }    
}
UMP.UI.Mvc.Controller.prototype = {	
	method: UMP$UI$Mvc$Controller$method,
	eval: UMP$UI$Mvc$Controller$eval	
};
UMP.UI.Mvc.Controller.registerClass('UMP.UI.Mvc.Controller');
UM.__controller = new UMP.UI.Mvc.Controller();
/*
//================================== UMP.UI.Mvc.Action ==========================================================================
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Action = function UMP$UI$Mvc$Action(id, method, ctx) {
	this._id = id;
	this._method = method;
	this._ctx = ctx;
}
function UMP$UI$Mvc$Action$execute(func, ctx){	
	return func.apply(this, [func, ctx]);
}
function UMP$UI$Mvc$Action$method(func, ctx){	
	return func.apply(this, [func, ctx]);
}
UMP.UI.Mvc.Action.prototype = {
	execute: UMP$UI$Mvc$Action$execute,	
	method: UMP$UI$Mvc$Action$method	
};
UMP.UI.Mvc.Action.registerClass('UMP.UI.Mvc.Action');
*/







//=========================================================================
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------
/*!
 * UAP Mobile JavaScript Library v2.7.0
 */
(function( window, undefined ) {
    UM = window.UM || {};
    UM._inherit = (function () {
        var F = function () {
        };
        return function (C, P) {
            F.prototype = P.prototype;
            C.prototype = new F();
            C.base =  P.prototype;
            C.prototype.constructor = C;
        };
    })();

    UM.EventMgr = function() {
        this._events = {};
        /*
         this._events = {
         "oninit" :[function(){},function(){}],
         "onload" :[function(){},function(){}]
         }
         */
    }
    UM.EventMgr.prototype.on = function(evtName, handler) {
        if (this._events[evtName] == null) {
            this._events[evtName] = [];
        }
        this._events[evtName].push(handler);
    }
    UM.EventMgr.prototype.off = function(evtName, handler) {
        var handlers = this._events[evtName];
        if (typeof handler == "undefined") {
            delete handlers;
        } else {
            var index = -1;
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handler == handlers[i]) {
                    index = i;
                    break;
                }
            }
            if (index > 0)
                handlers.remove(index);
        }
    }
    UM.EventMgr.prototype.trigger = function(evtName, sender, args) {
        try{
            var handlers = this._events[evtName] || [];
            var handler;
            args = args || {};
            for (var i=0,len=handlers.length; i < len; i++) {
                handler = handlers[i];
                handler(sender, args);
            }
        }catch(e){
            alert(e);
        }
    }

	UM.NativeContainer = function() {
		this._eventMgr = new UM.EventMgr();
    }
	UM.NativeContainer.prototype.onReady = function(handler){
		this._eventMgr.on("ready", handler)
	},
	UM.NativeContainer.prototype.on = function(evtName, handler){
		this._eventMgr.on(evtName, handler)
	},
	UM.NativeContainer.prototype.off = function(evtName, handler){
		this._eventMgr.off(evtName, handler)
	},
	UM.NativeContainer.prototype.trigger = function(evtName, sender, args){
		this._eventMgr.trigger(evtName, sender, args)
	}
	
	UM.nativeContainer = new UM.NativeContainer();
	
})( window );


//=========================================================================
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UM.Graphics
// Author iUAP Mobile
//-----------------------------------------------------------------------
/*!
 * UAP Mobile JavaScript Library v2.7.0
 */
(function(window, undefined) {
	if (!window.UM)
		window.UM = {};

	function WaterMark() {}

	WaterMark.prototype.watermark = function(options) {
		if (!options || typeof options !== "object")
			return;
		var self = this;
		/*  var canvas = document.createElement("canvas");*/
		var canvas = document.getElementById("test");
		var ctx = canvas.getContext("2d");
		var oImg;
		var imageFormat;
		var imageURL = "";

		if (options.src && options.target && typeof options.src == "string" && typeof options.target == "string") {
			//修正options属性
			if ( typeof options.watermark !== "string")
				options.watermark = "";
			if ( typeof options.watermarkStyle !== "object" || options.watermarkStyle == null)
				options.watermarkStyle = {};
			options.text = options.text || "";
			if ( typeof options.textStyle !== "object" || options.textStyle == null)
				options.textStyle = {};

			//创建水印，并转换canvas为图片保存到本地
			imageFormat = options.target.substr(options.target.lastIndexOf(".") + 1) || "png";
			oImg = document.createElement("img");
			//创建图片
			oImg.src = options.src;
			oImg.onload = function() {
				var oImgW = oImg.width;
				var oImgH = oImg.height;
				canvas.setAttribute("width", oImgW);
				canvas.setAttribute("height", oImgH);
				ctx.drawImage(oImg, 0, 0);
				try {
					options.text && self.addText(canvas, options.text, options.textStyle);
					if (options.watermark) {
						self.addWatermark(canvas, options.watermark, options.watermarkStyle, function(canvas) {
							imageURL = self.execImageURL(canvas, imageFormat);
							self.saveImageLocal(imageURL, options.target);
						});
					} else {
						imageURL = self.execImageURL(canvas, imageFormat);
						self.saveImageLocal(imageURL, options.target);
					}
				} catch(e) {
					alert(e.name + e.message);
				}
			};
		}

	};

	WaterMark.prototype.addText = function(canvas, text, textStyle) {
		var cansW = canvas.getAttribute("width");
		var cansH = canvas.getAttribute("height");
		var ctx = canvas.getContext("2d");
		var left = textStyle.left || 10;
		var right = textStyle.right;
		var top = textStyle.top;
		var bottom = textStyle.bottom || 10;
		if (!left) {
			ctx.textAlign = "end";
		}
		if (!top) {
			ctx.textBaseline = "bottom"
		}
		left = left || (cansW - right);
		top = top || (cansH - bottom);
		ctx.font = (textStyle.fontSize || 14) + "px " + (textStyle.fontFamily || "黑体");
		ctx.fillStyle = textStyle.color || "black";
		ctx.fillText(text, left, top);
	};

	WaterMark.prototype.addWatermark = function(canvas, watermark, watermarkStyle, callback) {
		var cansW = canvas.getAttribute("width");
		var cansH = canvas.getAttribute("height");
		var ctx = canvas.getContext("2d");
		var left = watermarkStyle.left;
		var top = watermarkStyle.top;
		var width = watermarkStyle.width;
		var height = watermarkStyle.height;

		var watermarkImg = document.createElement("img");
		watermarkImg.src = watermark;
		watermarkImg.onload = function() {
			var watermarkImgW = watermarkImg.width;
			var watermarkImgH = watermarkImg.height;
			watermarkWHRatio = watermarkImgW / watermarkImgH;
			if (!height && width) {
				height = width / watermarkWHRatio;
			}
			if (!width && height) {
				width = height * watermarkWHRatio;
			}
			if (!width || !height) {
				width = watermarkImgW;
				height = watermarkImgH;
			}
			left = left || ("right" in watermarkStyle) && (cansW - width - watermarkStyle.right) || (cansW - width - 10);
			top = top || (("bottom" in watermarkStyle) && (cansH - height - watermarkStyle.bottom)) || (cansH - height - 10);
			ctx.drawImage(watermarkImg, left, top, width, height);
			( typeof callback == "function") && callback(canvas);
		};
	};

	WaterMark.prototype.execImageURL = function(canvas, imageFormat) {
		imageFormat = "image/" + imageFormat;
		var imageURL = canvas.toDataURL(imageFormat);
		return imageURL;
	}

	WaterMark.prototype.saveImageLocal = function(imageURL, target) {
		var aLink = document.createElement("a");
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", false, false);
		//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
		aLink.download = target;
		aLink.href = imageURL;
		aLink.dispatchEvent(evt);
	};

	var webWaterMark = null;

	var graphics = {
		watermark : function(json) {
			/* json for example
			 {
			 src: "img/rose.jpg", //原图路径
			 target: "xy.png",//加水印后的图片名称
			 watermark: "img/app.png",//水印图片路径
			 watermarkStyle: {"width": 40, "height": 40, "right": 20, "bottom": 10},//水印图片样式，可选参数 ，默认右下方10px处，支持top、bottom、left、right、width、height
			 text: "这是水印文字内容",//水印文字内容
			 textStyle: {"fontSize": 20, "fontFamily": "宋体", "color": "red", "left": 20, "bottom": 10} //水印文字样式，可选参数，默认左下方10px处，支持fontFamily, fontSize, color,top、bottom、left、right、width、height
			 }
			 */
			try {
				if (!( webWaterMark instanceof WaterMark)) {
					webWaterMark = new waterMark();
				}
				webWaterMark.watermark(json);
			} catch(e) {
				console.warn(e.name + ":" + e.message);
			}

		},
	};
	window.UM.Graphics = graphics;
	return window.UM.Graphics;
})(window);

