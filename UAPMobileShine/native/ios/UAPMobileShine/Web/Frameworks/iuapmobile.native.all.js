//
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// Author： gct
// iUAP Mobile JS Framework 2.7.0
//
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
if(typeof __$jvm == "undefined"){
	__$jvm = {};
}
__$getInstance = function(className){
	try{
		var T = eval(className);            
    }catch(e1){
		var msg = "命名空间" + className + "异常！\n请检查" + className + "所在js文件是否有语法错误。\n建议启动调试进行排查，也可查看浏览器的控制台...";
		$exception(e1, msg);
		return;
    }
	
	if(T){
		if(__$jvm[className]){
			return __$jvm[className];
		}else{
			var isFailed = false;
			try{
				__$jvm[className] = new T();
				__$jvm[className].__typeName = className;
			}catch(e2){
				isFailed = true;
				var msg = className + " 类的构造函数发生错误，可能是由于" + className + ".prototype有语法错误，\n建议启动调试进行排查，也可查看浏览器的控制台"
				$exception(e2, msg);
			}finally{
				if(isFailed && __$jvm[className]){
					delete __$jvm[className];
				}
				delete isFailed;
			}
			return __$jvm[className];			
		}
	}else{
		alert("当前命名空间下没有"+className+"类型，返回null");
		return null;
	}
}


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
				return "\"\"";
		
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
			return "\"\"";
		case false:  
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
	if(obj == undefined || obj == null || obj.toString() == ""){
		return true;
	}
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
    if (parsedName !== this) throw "Error.argument('typeName', Sys.Res.badTypeName)";
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
//-----------------------------------------------------------------------
// UAP Mobile Web js



UM_CallAction=function(){
	
}
UM_CallRemoteService=function(serviceName,actionName,params,contextSource,contextKey){
	
}
SysHelper=function(){
}
SysHelper.prototype.navigate=function(viewid){

}
SysHelper.prototype.callAction=function(actionid){

}
UM_Sys=new SysHelper();
//
ControlsHelper=function(){
}
ControlsHelper.prototype.get=function(cid){
	this._cid = cid;
    return this;
}
ControlsHelper.prototype.set=function(attrid,value){

}
ControlsHelper.prototype.call=function(methodname,param){

}
UM_Controls=new ControlsHelper();
//
ContextHelper=function(){
}
ContextHelper.prototype.init=function(ctx){
    
	this._ctx = ctx;
    return this;
}
ContextHelper.prototype.setValue=function(propname,value){
	if(eval("this._ctx."+propname)==null){alert("error!  no property: "+propname);}else{
        eval("this._ctx."+propname+"=\""+value+"\"");
    }
}
ContextHelper.prototype.getValue=function(propname){
    if(eval("this._ctx."+propname)==null){alert("error!  no property: "+propname);}else{
        return eval("this._ctx."+propname);
    }
}
UM_Context=new ContextHelper();

CommonNativeCallService=function(){
	this.GetDeviceData = "um_getDevicedata";
	this.GetUserData = "um_getUserData";
	this.GetAppData = "um_getAppData";
	this.GetAppConfigData = "um_getAppConfigData";
	this.CallTel="um_CallTel";
	this.SendMsg="um_SendMsg";
	this.IsConnect = "um_IsConnect";
	this.GetCurrentLanguage = "um_GetCurrentLanguage";
	this.GetCurrentLocation = "um_GetCurrentLocation";
    //
    this.Store = "um_Store";
    this.Restore = "um_Restore";
}
//
CommonNativeCallService.prototype.store=function(key,value){

    
}
CommonNativeCallService.prototype.reStore=function(key){
	

}
//设备信息公共服务
CommonNativeCallService.prototype.getDeviceData=function(){
	

}
CommonNativeCallService.prototype.getUserData=function(){

}
CommonNativeCallService.prototype.getAppData=function(){

}
CommonNativeCallService.prototype.getAppConfigData=function(){

}
//公共服务设备调用
//打电话
CommonNativeCallService.prototype.callTel=function(tel){  

}
//发短信
CommonNativeCallService.prototype.sendMsg=function(tel,msg){

}
//网络是否连接
CommonNativeCallService.prototype.isConnect=function(){

}
//语言环境
CommonNativeCallService.prototype.getCurrentLanguage=function(){

}

//GPS info
CommonNativeCallService.prototype.getCurrentLocation=function(){
    return UM_callNativeService(this.GetCurrentLocation);
}
CommonNativeCallService.prototype.callService=function(serviceType,serviceparams){

}
UM_NativeCall = new CommonNativeCallService();

if(typeof alert == 'undefined'){
	alert = function(args){
		debugger;
	}
}
if(typeof adrinvoker == 'undefined'){
	adrinvoker = function(args){
		debugger;
	}
	adrinvoker.call2 = function(svrName, args, isSync){
		var str = "执行原生服务adrinvoker.call2(name, args)\n"; 
		str += "--name : " + svrName + "\n";
		str += "--args : " + args;
		alert(str);
		$console.log(str);
	}
	adrinvoker.call = function(svrName, args, isSync){
		var str = "执行原生服务adrinvoker.call(name, args)\n"; 
		str += "--name : " + svrName + "\n";
		str += "--args : " + args;
		alert(str);
		$console.log(str);
	}
}

if(typeof console == 'undefined'){
	console = function(args){
		debugger;
	}
}﻿
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// tea.js @VERSION 2.5
// Author gct(debugger)
//-----------------------------------------------------------------------
// UMContainer by gct

CurrentEnvironment={};
CurrentEnvironment.DeviceIOS="ios";
CurrentEnvironment.DeviceAndroid="android";
CurrentEnvironment.DeviceWin8="win8";
CurrentEnvironment.DevicePC="pc";
CurrentEnvironment.Debug="debug";
CurrentEnvironment.DeviceType="android";

$environment = CurrentEnvironment;
if(!UM) UM={};
UM.platform = {};
UM.platform.OS = CurrentEnvironment.DeviceType;
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
//最基本平台内部调用服务的API，所有公共服务都通过callService调用执行，对外API为--------------------------$service.call
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
				var strFn = "fun" + uuid(8, 16) + "()";//anonymous method
				while($__cbm[strFn]){
					strFn =  "fun" + uuid(8, 16) + "()";//anonymous method
				}
				$__cbm[strFn] = jsonArgs["callback"];
				jsonArgs["callback"] = strFn;				
			}
		
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
UMP.Services.Controls.prototype = {
	get: UMP$Services$Controls$get,
	set: UMP$Services$Controls$set,
	insert : UMP$Services$Controls$insert,
	focus : UMP$Services$Controls$focus,
	blur : UMP$Services$Controls$blur
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
function UMP$UI$Container$UMCtx$dataBind(jsonArgs){
	if(typeof jsonArgs == "undefined"){
		$service.call(this._UMCtx_dataBind, {}, false);	//异步执行  dataBind无需参数	
	}else{
		$service.call(this._UMCtx_dataBind, jsonArgs, false);	//异步执行  dataBind之后可指定callback	
	}
}
function UMP$UI$Container$UMCtx$dataCollect(){
	$service.call(this._UMCtx_dataCollect, {}, true);	//同步执行  dataBind无需参数		
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
	if(arguments.length == 0){
		var expr = "#{CONTEXT}";
		return this._getValue(expr);
	}else{		
		var expr = "#{"+fieldName+"}";
		return this._getValue(expr);
	}
}
function UMP$UI$Container$UMCtx$getString(fieldName){	
	//此方法仅仅支持获取Context本身和Context字段的值
	var expr = "";
	if(arguments.length == 0 || fieldName == ""){
		expr = "#{CONTEXT}";
	}else{
		expr = "#{"+fieldName+"}";//字段表达式
	}
	
	var obj = this._getValue(expr);//同步执行
	var str = $jsonToString(obj);
	return str;
}
function UMP$UI$Container$UMCtx$getJSONObject(fieldName){	
	//此方法仅仅支持获取Context本身和Context字段的值
	var expr = "";
	if(arguments.length == 0 || fieldName == ""){
		expr = "#{CONTEXT}";
	}else{
		expr = "#{"+fieldName+"}";//字段表达式
	}
	
	var str = this._getValue(expr);//同步执行
	var obj = $stringToJSON(str);
	if($isJSONObject(obj)){
		return obj;
	}else{
		alert("getJSONObject("+fieldName+")返回值不是一个有效的JSONObject，其值为" + str);
	}
}
function UMP$UI$Container$UMCtx$getJSONArray(fieldName){	
	//此方法仅仅支持获取Context字段的值
	var expr = "#{"+fieldName+"}";//字段表达式
	var str = this._getValue(expr);
	var obj = $stringToJSON(str);	//同步执行
    if($isJSONArray(obj)){
		return obj;
	}else{
		alert("getJSONArray("+fieldName+")返回值不是一个有效的JSONArray，其值为" + str);
	}	
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
	readFile: UMP$Services$Cache$readFile
};
UMP.Services.Cache.registerClass('UMP.Services.Cache');
$cache = new UMP.Services.Cache();
$store = $cache;

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
		if($isEmpty(args["startIndex"])){
			args["startIndex"] = 0;
		}
		if($isEmpty(args["endIndex"])){
			args["endIndex"] = 9;
		}
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
	//openDB:UMP$Services$Sqlite$openDB,
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
function UMP$Services$UMDevice$getAlbumPath(){
	return $service.call("UMDevice.getAlbumPath", {}, true);
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


//========================================= $camera ======================================================== $camera
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMCamera=function(){	
	this._UMDevice_openCamera = "UMDevice.openCamera";
	this._UMDevice_openPhotoAlbum = "UMDevice.openPhotoAlbum";
}

function UMP$UI$Container$UMCamera$open(json){
	var args = {};
	if(json.bindfield)
		args["bindfield"] = json["bindfield"];
	if(json.callback)
		args["callback"] = json["callback"];
	return $service.call(this._UMDevice_openCamera,args,false);
}
function UMP$UI$Container$UMCamera$openPhotoAlbum(json){
	if(!json) return;
	var args = {};
	if(json.bindfield)
		args["bindfield"] = json["bindfield"];
	if(json.callback)
		args["callback"] = json["callback"];
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
function UMP$Services$UMJS$showLoadingBar(){
	//显示loading：
	return $service.call("UMJS.showLoadingBar",{});
}
function UMP$Services$UMJS$hideLoadingBar(){
	//隐藏loading：
	return $service.call("UMJS.hideLoadingBar",{});
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
		alert("$toast方法的参数无效,不是一个有效的字符串或JSONObject");
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
		"bindfield" : "upload",
		"filename" : imagePath,
		"callback" : "uploadImageCallback()"
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
		callback:"downloadfromserverCB()"
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
function UMP$Services$Validator$isEmpty(obj){
	
	if ($isJSONObject(obj)) {
		return $isEmpty(obj);
	} else if ($isJSONArray(obj)) {
		for(var i=0, len = obj.length;i<len;i++){			
			return this.isEmpty(obj[i]);
		}
	}else{
		return true;
	}

}
function UMP$Services$Validator$isValidNumber(obj){
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
	isEmpty : UMP$Services$Validator$isEmpty,
	isValidNumber : UMP$Services$Validator$isValidNumber,
	isJSONObject : UMP$Services$Validator$isJSONObject,
	isNamespace : UMP$Services$Validator$isNamespace
};
UMP.Services.Validator.registerClass('UMP.Services.Validator');
$validator = new UMP.Services.Validator();
﻿
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





//////////////////////////////////////////////////////////////////
// �ں���������ִ��js����
function $UMP$eval(code) {
    if (!code) {
        return;
    }
    var srcCode = "(function() {\n" + code + "}) ();";
    eval(code);
}


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
UMP.UI.Mvc.Entity.registerClass('UMP.UI.Mvc.Entity');/************************************ UAP Mobile 2.0 SP1 JS Framework *********************************/

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

Type.registerNamespace('UMP.UI.Mvc');

UMP.UI.Mvc.ContextType = function(){};
UMP.UI.Mvc.ContextType.prototype = {
    Context : 0,
	FieldSet1 : 1,
	FieldSetN : 2
}
UMP.UI.Mvc.ContextType.registerEnum("UMP.UI.Mvc.ContextType");


UMP.UI.Mvc.Context = function UMP$UI$Mvc$Context(id, entity, json){
	this._id = id;
	this.__entity = entity;//元数据结构	
	this.__json = json;//context的json数据，由原生传递过来
	this.__baseClass = "UMP.UI.Mvc.Context";//记录类型
	if(entity){
		if(entity.tag().toLowerCase() == "context"){
			this._contextType = UMP.UI.Mvc.ContextType.Context;//用来标识当前的Context对象是1还是N
		}else if(entity.tag().toLowerCase() == "fieldset"){
			if(entity.attr("relation") == "1"){
				this._contextType = UMP.UI.Mvc.ContextType.FieldSet1;//用来标识当前的Context对象是1还是N
			}else if(entity.attr("relation") && entity.attr("relation").toLowerCase() == "n"){
				this._contextType = UMP.UI.Mvc.ContextType.FieldSetN;//用来标识当前的Context对象是1还是N
			}else{
				$alert("UMP.UI.Mvc.Context的构造函数出错！暂不支持类型定义为"+entity.tag()+"的fieldSet");
			}
		}else{
			$alert("UMP.UI.Mvc.Context的构造函数出错！暂不支持类型定义为"+entity.tag()+"的Context");
		}
	}
	this._fields={};//存放Field类型对象的字段
	this._links = {};//存放Context类型Fieldset对象的字典
	
	this._rows =[];// 1条或N条, Entity[] data  该数组存放的是 Entity 类型	
	
	
	this._userDataKeys =[];//存放用户自定义数据Key
	
	this._events = {};
	this.__CONST_EVENT_ONCHANGE = "onchange";
	
	if(this.__entity)
		this._id = this.__entity.id();
		
	this._disposed = false;//标示Action结束后，context是否需要提交原生Container
}
function UMP$UI$Mvc$Context$entity(){
	return this.__entity;
}
function UMP$UI$Mvc$Context$json(json){
	if(json == undefined){
		return this.__json;
	}else{
		this.__json = json;
	}
}

function UMP$UI$Mvc$Context$contextType(type){
	if(type == undefined){
		return this._contextType;
	}else{
		this._contextType = type;
	}
}

function UMP$UI$Mvc$Context$id(val){
	if(val == undefined){
		return this._id;
	}else{
		this._id = val;
	}
	
}
function UMP$UI$Mvc$Context$getFields(){
	return this._fields;
}
function UMP$UI$Mvc$Context$field(id){
	return this._fields[id];
}
function UMP$UI$Mvc$Context$getlinks(){
	return this._links;
}
function UMP$UI$Mvc$Context$has(id){
    if(this._fields[id]!=null)
	    return true;
	return false
}

function UMP$UI$Mvc$Context$get(rowIndex, fieldName){
	if(fieldName == undefined){
		//只有一个参数的时候，理解为get(fieldName)的情况
		fieldName = rowIndex;
		return this.__getFieldValue(fieldName);
	}else{
		return this.__getRowFieldValue(rowIndex,fieldName);
	}
}
function UMP$UI$Mvc$Context$__getFieldValue(fieldName){
	var fd = this._fields[fieldName];
	
	if(fd instanceof UMP.UI.Mvc.Field)
		return fd.get();
	if(fd instanceof UMP.UI.Mvc.Context || fd instanceof UMP.UI.Mvc.ContextTable)
		return fd;
	
	//此时fd可能是undefined，或者是一个简单类型（用户自己新增的一个不存在Entity定义的字段）
	
	var has = false;
	for(var i=0,len = this._userDataKeys.length;i<len;i++){
		var akey = this._userDataKeys[i];
		if(fieldName == akey){
			has = true;
			break;
		}
	}
	
	var userValue = null;
	if(has){			
		userValue = this[fieldName];
	}		
	return userValue;
}
function UMP$UI$Mvc$Context$__getRowFieldValue(rowIndex, fieldName){
    //1、if field, return the field's value
		
	//var rows = this._fields[this.id()];
	var rows = this.rows();
	if(rowIndex >= this.rows().length){
		$alert("试图取" + this.id() +"[" + rowIndex + "]的字段[" + fieldName +"]值时，超出了数组的最大长度"+this.rows().length);
		return null;
	}
	var ctxObj = rows[rowIndex];
	var oldValue = ctxObj.__getFieldValue(fieldName);	
    return oldValue;
}

function UMP$UI$Mvc$Context$set(rowIndex, fName, fValue){
	
	if(fValue == undefined){
		//2个参数的情况		
		this.__setFieldValue(rowIndex,fName);
	}else{
		//3个参数的情况
		this.__setRowFieldValue(rowIndex, fName, fValue);	
	}
}
function UMP$UI$Mvc$Context$__setFieldValue(fName, fValue, silent){
	if(!this.has(fName)){//此时有两种可能		
		if(this.__entity){
			//1、仅仅是context没有该字段，entity是有该字段的定义
			if(this.__entity.property(fName)){
				//动态创建context的field
				var newfield = new UMP.UI.Mvc.Field(fName, "", this.__entity.property(fName));		
				this.addField(fName, newfield);
			}else{
				//alert("set value Failed! try to set [" + fValue + "] to the Field["+fName+"], but not exist the field in the entity!");
				//this.addField(fName, fValue);
				this.addUserData(fName, fValue);
				return;
			}
		}else{
			//alert("set value Failed! try to set [" + fValue + "] to the Field["+fName+"], but no the field and no the entity!");
			//this.addField(fName, fValue);
			this.addUserData(fName, fValue);
			return;
		}
	}else{//一定是简单类型，非Field类型
	    var fd = this._fields[fName];
		if(!(fd instanceof UMP.UI.Mvc.Field)){
			this.addUserData(fName, fValue);
			return;
		}
	}
	var fd = this._fields[fName];	
	
	var oldValue = fd.get();
	if(oldValue==fValue)
		return;
		
	fd.set(fValue);	
	
	if(!silent){	
		var newValue = fd.get();
		var args = {
			context : this,		
			fieldName : fName,
			srcValue : fValue,
			oldValue : oldValue,
			value : newValue
		};
		this.fireEvent(this.__CONST_EVENT_ONCHANGE, fName, args);
	}
}

function UMP$UI$Mvc$Context$val(fName, fValue){
	if(fValue == undefined){		
		this.get(fName);		
	}else{
		this.set(fName, fValue);
	}
}
function UMP$UI$Mvc$Context$__setRowFieldValue(rowIndex, fName, fValue){
	
	//var rows = this._fields[this.id()];
	if(rowIndex >= this.length()){
		throw new Error("设置的行索引超出了最大索引值[the rowIndex of the row yon set is " + rowIndex + ", but the length of rows == "+this.length()+"]");
		return;
	}
	var rows = this._rows;
	var ctxObj = rows[rowIndex];
	var oldValue = ctxObj.get(fName);
	
	if(oldValue==fValue)
		return;
	
	ctxObj.__setFieldValue(fName,fValue,true);//静默赋值，无需触发change事件,由__setRowFieldValue触发
	var newValue = ctxObj.get(fName);	
	var args = {
	    context : this,
		rowIndex : rowIndex,
        fieldName : fName,
		srcValue : fValue,
		oldValue : oldValue,
		value : newValue
	};
	this.fireEvent(this.__CONST_EVENT_ONCHANGE, fName, args);
}
function UMP$UI$Mvc$Context$setRow(rowIndex, fName, fValue){
	var oldValue = this.get(fName);	
	if(oldValue==fValue)
		return;
	
	this.__setFieldValue(fName,fValue,true);//静默赋值，无需触发change事件,由下面代码触发change事件
	var newValue = this.get(fName);	
	var args = {
	    context : this,
		rowIndex : rowIndex,
        fieldName : fName,
		srcValue : fValue,
		oldValue : oldValue,
		value : newValue
	};
	this.fireEvent(this.__CONST_EVENT_ONCHANGE, fName, args);
}
function UMP$UI$Mvc$Context$length(){
	if(this._rows)
		return this._rows.length;
	else
		return 0;
}
function UMP$UI$Mvc$Context$rows() {
    return this._rows;
}
function UMP$UI$Mvc$Context$row(index) {
    return this._rows[index];
}	
function UMP$UI$Mvc$Context$rowSelector() {
	return "ListViewSelector";
}

function UMP$UI$Mvc$Context$removeRow(index){
	this._rows.remove(index);
}
function UMP$UI$Mvc$Context$removeRow2(index){
    this._rows = this._rows.remove2(index);
}
/*
function UMP$UI$Mvc$Context$addRow(entity){
	this._rows.push(entity);
}
*/
function UMP$UI$Mvc$Context$addField(id, fieldObj){
	
	
	this._fields[id] = fieldObj;	
	//this._rows.push(fieldObj);
}
function UMP$UI$Mvc$Context$removeField(context){

}

function UMP$UI$Mvc$Context$addRow(json){
	var id = this.__entity.id();
	var newFieldSet = new UMP.UI.Mvc.Context(id, this.__entity);
	_$um$CRUD$loadFieldSet(newFieldSet, json, this.__entity);//entity.fields[k]是一个soline的定义  json[k]是一个数组
	newFieldSet.contextType(UMP.UI.Mvc.ContextType.FieldSet1);//此时一定是FieldSet1，因为是一个数组的一个元素
	
	this._rows.push(newFieldSet);
	//this._fields[id].push(newFieldSet);
}
function UMP$UI$Mvc$Context$addJSON(jsonRow){
    //通过json来增加一行数据
	alert("UMP.UI.Mvc.Context.addJSON方法已经废弃，请使用新插件重新build代码");
	var curJSON = this.unload();
	var array = curJSON[this.entity().id()];
	if(_$um$isArray(array)){
		array[array.length] = jsonRow;//新增一条记录		
		this.load(curJSON);//将json状态到context中
	}else{
		alert(this.id()+"不是一个json的Array");
	}
}
function UMP$UI$Mvc$Context$getUserDataKeys(){	
	return this._userDataKeys;
}
function UMP$UI$Mvc$Context$addUserData(ukey, udata){
	var has = false;
	for(var i=0,len = this._userDataKeys.length;i<len;i++){
		var akey = this._userDataKeys[i];
		if(ukey == akey){
			has = true;
			break;
		}
	}
	
	if(!has){
		this._userDataKeys.push(ukey);
	}
	this[ukey] = udata;
}

function UMP$UI$Mvc$Context$addLink(id,context){
	//this._fields[id] = context;	
	/*
	if(context.entity()){
		if(context.entity().attr("relation")){
			var relation = context.entity().attr("relation").toLowerCase();
			if(relation =="1" ){
				context.contextType(UMP.UI.Mvc.ContextType.FieldSet1);
			}else if(relation =="n" ){
				context.contextType(UMP.UI.Mvc.ContextType.FieldSetN);
			}else{
				alert("addLink failed! because the context[" + context.id() + "'s relation is " + relation +"]");
			}
		}
	}else{
		alert("addLink failed! because context.entity() is null, addLink method is invalid");
	}
	*/
	this.addField(id, context);
	//this._links[id] = context;
}
function UMP$UI$Mvc$Context$removeLink(contextID){
	this._links[contextID] = null;
	delete this._links[contextID];
}

function UMP$UI$Mvc$Context$params(){
	return this["parameter"];	
}

function UMP$UI$Mvc$Context$param(name){
	var paras = this.params();
	if(paras){
		return paras[name];
	}else{
		return null;
	}
}

function UMP$UI$Mvc$Context$load(json) {
	if(_$um$isArray(json)){
		alert("UMP.UI.Mvc.Context.load方法参数接受JSON对象，不接受数组");
		return;
	}
	
	var tag = this.entity().tag().toLowerCase();	
	if(tag == "context"){
		return _$um$CRUD$load(this, json, this.__entity);
	}else{
		return _$um$CRUD$loadFieldSet1(this, json, this.__entity);			
	}
}
function UMP$UI$Mvc$Context$reload(json) {
	//load是追加
	//reload是重新加载
}
function UMP$UI$Mvc$Context$unload() {
	var tag = this.entity().tag().toLowerCase();
	if(tag == "context"){
		return _$um$CRUD$Context2JSON(this);
	}else{	
		return _$um$CRUD$FieldSet2JSON(this);
	}
}
function UMP$UI$Mvc$Context$empty() {
	this._fields = {};
}
function UMP$UI$Mvc$Context$clear() {
	this._fields = {};
	/*
	for(var key in this._fields){
		var fd = this._fields[key];
		if(fd instanceof UMP.UI.Mvc.Field){
			fd.set("");
		}else if(fd instanceof UMP.UI.Mvc.ContextTable){
			fd.clear();
		}else if(fd instanceof UMP.UI.Mvc.Context){
			fd.clear();
		}else{
			alert("字段["+key+"]不支持clear方法");
		}		
	}
	*/	
}

function UMP$UI$Mvc$Context$dispose(){
	this._disposed = true;
}
function UMP$UI$Mvc$Context$restore(){
	this._disposed = false;
}

function UMP$UI$Mvc$Context$isDisposed(){
	return this._disposed;
}

//Event
function UMP$UI$Mvc$Context$attachEvent(eventName,fieldName,handler) {
    if(!this._events[eventName])
		this._events[eventName]={};
		
	if(!this._events[eventName][fieldName])	
		this._events[eventName][fieldName] = [];
		
	this._events[eventName][fieldName].push(handler);	
}
function UMP$UI$Mvc$Context$detachEvent(eventName,fieldName,handler) {	
	if(!this._events[eventName])
		return;
		
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
function UMP$UI$Mvc$Context$fireEvent(eventName, fieldName, args) {

	//1、触发元数据上的事件
	this.__entity.fireEvent(eventName, fieldName, args);
	
	//2、触发数据上的事件
	/*  Context本身是数据，不提供注册事件，在Context元数据中注册事件
    if(this._events[eventName]){
		var handlers = this._events[eventName][fieldName];
		if(handlers){
			for(var i=0,len=handlers.length;i<len;i++){
				var func = handlers[i];
				if(typeof args ==="undefined"){
					agrs = {
						"eventName":eventName,
						"fieldName":fieldName
					};
				}
				func(this,args);
			}
		}
	}
	*/
}	
	

UMP.UI.Mvc.Context.prototype = {
    entity: UMP$UI$Mvc$Context$entity,
	json: UMP$UI$Mvc$Context$json,
	
	contextType: UMP$UI$Mvc$Context$contextType,
	
	id: UMP$UI$Mvc$Context$id,
	getFields: UMP$UI$Mvc$Context$getFields,
	fields: UMP$UI$Mvc$Context$getFields,
	field: UMP$UI$Mvc$Context$field,
	
	get: UMP$UI$Mvc$Context$get,
	set: UMP$UI$Mvc$Context$set,
	val: UMP$UI$Mvc$Context$val,
	
	length: UMP$UI$Mvc$Context$length,
	rows: UMP$UI$Mvc$Context$rows,
	row: UMP$UI$Mvc$Context$row,
	rowSelector: UMP$UI$Mvc$Context$rowSelector,
	addRow: UMP$UI$Mvc$Context$addRow,
	addJSON: UMP$UI$Mvc$Context$addJSON,
	removeRow: UMP$UI$Mvc$Context$removeRow,
	removeRow2: UMP$UI$Mvc$Context$removeRow2,
	
	has: UMP$UI$Mvc$Context$has,
	
	addField: UMP$UI$Mvc$Context$addField,
	removeField: UMP$UI$Mvc$Context$removeField,
	
	getUserDataKeys: UMP$UI$Mvc$Context$getUserDataKeys,
	addUserData: UMP$UI$Mvc$Context$addUserData,

	addLink: UMP$UI$Mvc$Context$addLink,
	removeLink: UMP$UI$Mvc$Context$removeLink,
	
	//private method
	__getFieldValue: UMP$UI$Mvc$Context$__getFieldValue,
	__setFieldValue: UMP$UI$Mvc$Context$__setFieldValue,	
	__getRowFieldValue: UMP$UI$Mvc$Context$__getRowFieldValue,
	__setRowFieldValue: UMP$UI$Mvc$Context$__setRowFieldValue,
	
	params: UMP$UI$Mvc$Context$params,
	param: UMP$UI$Mvc$Context$param,//must not named [parameter] because of the parameter is context keyword
	
	load: UMP$UI$Mvc$Context$load,	
	unload: UMP$UI$Mvc$Context$unload,	
	
	clear: UMP$UI$Mvc$Context$clear,
	//empty: UMP$UI$Mvc$Context$empty,//delete是js关键字 只能使用empty来代替delete	
	
	dispose: UMP$UI$Mvc$Context$dispose,
	isDisposed: UMP$UI$Mvc$Context$isDisposed,
	restore: UMP$UI$Mvc$Context$restore,
	/*  Context本身是数据，不提供注册事件，在Context元数据中注册事件
	attachEvent: UMP$UI$Mvc$Context$attachEvent,
    detachEvent: UMP$UI$Mvc$Context$detachEvent,
	*/
	fireEvent: UMP$UI$Mvc$Context$fireEvent	
};
UMP.UI.Mvc.Context.registerClass('UMP.UI.Mvc.Context');

/*
var $$context=null;
var $UMP$CreateContextDefine = function (id, entity) {
	//1、创建Model
    var curModel = new UMP.UI.Mvc.Model(modelName);
	if(modelName =="CustomerSubmit")
	    $$CurrentModel = curModel;
	
	//2、根据Model元数据创建Fields
	var fieldsMD = modelMetaData["Fields"]
	for(var fieldID in fieldsMD){
		var fieldMD = fieldsMD[fieldID];
		if(fieldMD){
			//set包含了创建字段过程，同时将字段设置成元数据中该字段的默认值
			var kv = {};
			kv[fieldMD.id] = fieldMD.DefaultValue;
			curModel.set(kv);//kv == {FirstName:"my first"}
		}
	}
	
	$UMP$getMM().set(modelName, curModel);
};
*/
UMP.UI.Mvc.ContextTable = function UMP$UI$Mvc$ContextTable(id, entity, json){
	//Step 1：inherit the base class
    //com.yy.um.ContextTable.initializeBase(this);
	this._id = id;
	this.__entity= entity;
	this._rows =[];
	this.__json = json;
	this.__baseClass = "UMP.UI.Mvc.ContextTable";//记录类型
}
function UMP$UI$Mvc$ContextTable$entity(){
	return this.__entity;
}
function UMP$UI$Mvc$ContextTable$json(json){
	if(json == undefined){
		return this.__json;
	}else{
		this.__json = json;
	}
}

function UMP$UI$Mvc$ContextTable$id(val){
	if(val == undefined){
		return this._id;
	}else{
		this._id = val;
	}
	
}
function UMP$UI$Mvc$ContextTable$rows(){
	return this._rows;
}
function UMP$UI$Mvc$ContextTable$row(index){
	return this._rows[index];
}
function UMP$UI$Mvc$ContextTable$get(index, fieldName){
	var ctx = this._rows[index];
	return ctx.get(fieldName);	
}
function UMP$UI$Mvc$ContextTable$set(rowIndex, fieldName, fieldValue){
	var ctx = this._rows[rowIndex];	
	var oldValue = ctx.get(fieldName);
	if(oldValue==fieldValue)
		return;
	
	ctx.__setFieldValue(fieldName,fieldValue,true);//静默赋值，无需触发change事件,由下面代码触发change事件
	var newValue = ctx.get(fieldName);
	var args = {
	    eventSource : this,
		rowContext : ctx,
		rowIndex : rowIndex,
        fieldName : fieldName,
		srcValue : fieldValue,
		oldValue : oldValue,
		value : newValue
	};
	ctx.fireEvent(ctx.__CONST_EVENT_ONCHANGE, fieldName, args);
}

function UMP$UI$Mvc$ContextTable$length(){
	return this._rows.length;
}

function UMP$UI$Mvc$ContextTable$add(json){
	if(json instanceof UMP.UI.Mvc.Context){
		this._rows[this._rows.length] = json;
	}else if(!_$um$isArray(json)){	
		var id = this.__entity.id();
		var newFieldSet = new UMP.UI.Mvc.Context(id, this.__entity);
		_$um$CRUD$loadFieldSet1(newFieldSet, json, this.__entity);
		this._rows.push(newFieldSet);
	}
}
function UMP$UI$Mvc$ContextTable$remove(index){
	return this._rows.remove(index);
}
function UMP$UI$Mvc$ContextTable$empty(){	
	this._rows = [];
}
function UMP$UI$Mvc$ContextTable$clear(){	
	this._rows = [];
	/*
	for(var i=0,len=this._rows.length;i<len;i++){
		this._rows[i].clear();
	}
	*/
}
function UMP$UI$Mvc$ContextTable$load(index, json){
	if(typeof json === "undefined"){
		if(_$um$isArray(index)){
			_$um$CRUD$loadFieldSetN(this, index, this.entity());
		}else{
			$alert("UMP.UI.Mvc.ContextTable.load()传入一个参数时，只接受数组，");
		}		
	}else{		
		if(index >= this._rows.length){
			alert("UMP.UI.Mvc.ContextTable.load()出错,"+this.entity().id()+"["+index+"]为超出了范围，当前数组的长度为"+this._rows.length);
			return;
		}
		var ctx = this._rows[index];
		if(ctx){
			ctx.load(json);
		}else{
			alert("UMP.UI.Mvc.ContextTable.load()出错,"+this.entity().id()+"["+index+"]为undefined,应该是一个UMP.UI.Mvc.Context对象");
		}
	}	
}
function UMP$UI$Mvc$ContextTable$unload(){
	var array = _$um$CRUD$Context2JSON(this);
	return array;
}

UMP.UI.Mvc.ContextTable.prototype = {
	id: UMP$UI$Mvc$ContextTable$id,
	entity: UMP$UI$Mvc$ContextTable$entity,
	json: UMP$UI$Mvc$ContextTable$json,
	
	length: UMP$UI$Mvc$ContextTable$length,
	rows: UMP$UI$Mvc$ContextTable$rows,
	row: UMP$UI$Mvc$ContextTable$row,
	
	get: UMP$UI$Mvc$ContextTable$get,
	set: UMP$UI$Mvc$ContextTable$set,
	
	add: UMP$UI$Mvc$ContextTable$add,
	addRow: UMP$UI$Mvc$ContextTable$add,
	remove: UMP$UI$Mvc$ContextTable$remove,
	
	
	clear: UMP$UI$Mvc$ContextTable$clear,//clear的是数据，而非结构
	//empty: UMP$UI$Mvc$ContextTable$empty,//delete是js关键字 只能使用empty来代替delete
	
	load: UMP$UI$Mvc$ContextTable$load,	
	unload: UMP$UI$Mvc$ContextTable$unload
	
};
UMP.UI.Mvc.ContextTable.registerClass('UMP.UI.Mvc.ContextTable');
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Document = function UMP$UI$Mvc$Document(){
	this._tree = {};
	this._events = {};
	this._uimd = {};
}

function UMP$UI$Mvc$Document$initialize(){    
	this._tree = {};	
}

//Public Method
function UMP$UI$Mvc$Document$getElementById(id){    
	if(!this._tree[id]){		
		//create temp a object dynamically
		var ele = this.createAbsElement();
		ele.id(id);
		this._tree[id] = ele;
	}
	return this._tree[id];
	
}
function UMP$UI$Mvc$Document$getElementsByTagName(){
}

function UMP$UI$Mvc$Document$createAttribute(name){	
}

function UMP$UI$Mvc$Document$createElement(tag){
	if(tag==null || tag==""){
		alert("请指定创建Element的tag类型");
		return;
	}
	var newJControl = new UMP.UI.Mvc.Element(tag);
	newJControl.isAbs(false);
	return newJControl;
}
function UMP$UI$Mvc$Document$createTextNode(){	
}
function UMP$UI$Mvc$Document$getChilds(){
	return this._tree;	
}
function UMP$UI$Mvc$Document$appendChild(){	
}
function UMP$UI$Mvc$Document$removeChild(){	
}
function UMP$UI$Mvc$Document$replaceChild(newObj,oldObj){	
	if(this._tree[oldObj.id()]){
		delete this._tree[oldObj.id()];
		this._tree[newObj.id()] = newObj;
	}
}
function UMP$UI$Mvc$Document$insertBefore(){	
}

function UMP$UI$Mvc$Document$createAbsElement(tag){
	var newJControl = new UMP.UI.Mvc.Element(tag);
	newJControl.isAbs(true);
	return newJControl;
}
function UMP$UI$Mvc$Document$parseType(ele, type) {
    var control = new type();

    if (ele.isAbs() == true) {
        //all attr clone
        for (var key in ele.attrs()) {
            control.attr(key, ele.attr(key));
        }

        $document.replaceChild(control, ele);
        ele = control;
        return ele;
    }

    return ele;
}

function UMP$UI$Mvc$Document$SetNative(eleId, attrName, attrValue) {	
	$controls.set(eleId, attrName, attrValue);
}

function UMP$UI$Mvc$Document$clear(){	
	$document = new UMP.UI.Mvc.Document();	
}

function UMP$UI$Mvc$Document$dataToJSON(){
	var json = {};	
	for(var id in this.getChilds()){
		var jcontrolData ={};
		var child = $document.getElementById(id);
		jcontrolData["attributes"] = child.attrs();		
		json[id] = jcontrolData;
	}
	return $jsonToString(json);

}
function UMP$UI$Mvc$Document$dataToString(){	
	return $jsonToString(this.dataToJSON());
}

function UMP$UI$Mvc$Document$uiMD(json){
	if(typeof json == "undefined"){
		return this._uimd;
	}else{
		this._uimd = json;
	}
}

function  UMP$UI$Mvc$Document$attachEvent(eventName, handler){
	if(!this._events[eventName]){
		this._events[eventName] = [];
	}
	
	this._events[eventName].push(handler);
}
function  UMP$UI$Mvc$Document$fireEvent(eventName){
	if(this._events[eventName]){
		if($isJSONArray(this._events[eventName])){
			while(this._events[eventName].length>0){
				var func = this._events[eventName].shift();
				if($isFunction(func)){
					func();
				}else{
					alert(func + "不是一个有效的function");
				}
			}
		}else{
			alert("$document._events[" + eventName + "]不是一个有效的handler数组!");
		}
	}else{
		alert("没有注册事件" + eventName);
	}
}
UMP.UI.Mvc.Document.prototype = {
	initialize : UMP$UI$Mvc$Document$initialize,
	
	//Visit Node
	/** 
	* 根据控件id获取控件
	* @param {String} id -  控件id, widget内的控件id为"xxx_xxx"形式，即widgetID_控件ID
	* @return {Object}
	*/
	getElementById: UMP$UI$Mvc$Document$getElementById,
	getElementsByTagName: UMP$UI$Mvc$Document$getElementsByTagName,	
		
	createAttribute: UMP$UI$Mvc$Document$createAttribute,
	
	//Node Operating
	createElement: UMP$UI$Mvc$Document$createElement,
	createTextNode: UMP$UI$Mvc$Document$createTextNode,	
	
	getChilds: UMP$UI$Mvc$Document$getChilds,
	
	appendChild: UMP$UI$Mvc$Document$appendChild,	
	removeChild: UMP$UI$Mvc$Document$removeChild,
	replaceChild: UMP$UI$Mvc$Document$replaceChild,
	insertBefore: UMP$UI$Mvc$Document$insertBefore,
	
	createAbsElement: UMP$UI$Mvc$Document$createAbsElement,
	parseType: UMP$UI$Mvc$Document$parseType,
	
	
	SetNative : UMP$UI$Mvc$Document$SetNative,
	clear : UMP$UI$Mvc$Document$clear,
	
	dataToJSON: UMP$UI$Mvc$Document$dataToJSON,
	dataToString: UMP$UI$Mvc$Document$dataToString,
	
	uiMD : UMP$UI$Mvc$Document$uiMD,
	
	attachEvent : UMP$UI$Mvc$Document$attachEvent,
	on : UMP$UI$Mvc$Document$attachEvent,
	fireEvent : UMP$UI$Mvc$Document$fireEvent
};
UMP.UI.Mvc.Document.registerClass('UMP.UI.Mvc.Document');
$document = new UMP.UI.Mvc.Document();
$id = function(id){
    return $document.getElementById(id);
}
_$um$getDocumentData = function(){
	var result = {};
	
	for(var id in $document.getChilds()){
		var jcontrolData ={};
		var child = $document.getElementById(id);
		jcontrolData["attributes"] = child.attrs();		
		result[id] = jcontrolData;
	}
	return $jsonToString(result);
}


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

//__________________________________________________________________________________________ JControlBase
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.JControlBase = function UMP$UI$Mvc$JControlBase() {
    UMP.UI.Mvc.JControlBase.initializeBase(this, []);
	//0 default true
	this._isAbs = true;
	
	//1、常量
	this._tag = "";
	
	//2、Attribute
	this._attrs = {};
	this._absAttrs = {};
	
	//3、Event
	this._events = {};
		
}
function UMP$UI$Mvc$JControlBase$parseType(obj, type) {
    var control = new type();

    if (obj.isAbs() == true) {
        //all attr clone
        for (var key in obj.attrs()) {
            control.attr(key, obj.attr(key));
        }

        $document.replaceChild(control, obj);
        obj = control;
        return obj;
    }

    return obj;
}

function UMP$UI$Mvc$JControlBase$get_visible(){
	return this.attr("visible");
}
function UMP$UI$Mvc$JControlBase$set_visible(val){
	this.attr("visible", val);
}
function UMP$UI$Mvc$JControlBase$get_disabled(){
	return this.attr("disabled");
}
function UMP$UI$Mvc$JControlBase$set_disabled(val){
	this.attr("disabled", val);
}

//=================================== CSS ===========================================
function UMP$UI$Mvc$JControlBase$get_background(){
	return this.attr("background");
}
function UMP$UI$Mvc$JControlBase$set_background(val){
	this.attr("background", val);
}
function UMP$UI$Mvc$JControlBase$background(val){	
	if(typeof val ==="undefined"){
		return this.get_background();
	}else{
		this.set_background(val);
	}	
}

function UMP$UI$Mvc$JControlBase$get_backgroundImage(){
	return this.attr("backgroundImage");
}
function UMP$UI$Mvc$JControlBase$set_backgroundImage(val){
	this.attr("backgroundImage", val);
}
function UMP$UI$Mvc$JControlBase$backgroundImage(val){
	if(typeof val ==="undefined"){
		return this.get_backgroundImage();
	}else{
		this.set_backgroundImage(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_width(){
	return this.attr("width");
}
function UMP$UI$Mvc$JControlBase$set_width(val){
	this.attr("width", val);
}
function UMP$UI$Mvc$JControlBase$width(val){
	if(typeof val ==="undefined"){
		return this.get_width();
	}else{
		this.set_width(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_height(){
	return this.attr("height");
}
function UMP$UI$Mvc$JControlBase$set_height(val){
	this.attr("height", val);
}
function UMP$UI$Mvc$JControlBase$height(val){
	if(typeof val ==="undefined"){
		return this.get_height();
	}else{
		this.set_height(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_layout(){
	return this.attr("layout");
}
function UMP$UI$Mvc$JControlBase$set_layout(val){
	this.attr("layout", val);
}
function UMP$UI$Mvc$JControlBase$layout(val){
	if(typeof val ==="undefined"){
		return this.get_layout();
	}else{
		this.set_layout(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_weight(){
	return this.attr("weight");
}
function UMP$UI$Mvc$JControlBase$set_weight(val){
	this.attr("weight", val);
}
function UMP$UI$Mvc$JControlBase$weight(val){
	if(typeof val ==="undefined"){
		return this.get_weight();
	}else{
		this.set_weight(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_halign(){
	return this.attr("halign");
}
function UMP$UI$Mvc$JControlBase$set_halign(val){
	this.attr("halign", val);
}
function UMP$UI$Mvc$JControlBase$halign(val){
	if(typeof val ==="undefined"){
		return this.get_halign();
	}else{
		this.set_halign(val);
	}
}
function UMP$UI$Mvc$JControlBase$get_valign(){
	return this.attr("valign");
}
function UMP$UI$Mvc$JControlBase$set_valign(val){
	this.attr("valign", val);
}
function UMP$UI$Mvc$JControlBase$valign(val){
	if(typeof val ==="undefined"){
		return this.get_valign();
	}else{
		this.set_valign(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingTop(){
	return this.attr("paddingTop");
}
function UMP$UI$Mvc$JControlBase$set_paddingTop(val){
	this.attr("paddingTop", val);
}
function UMP$UI$Mvc$JControlBase$paddingTop(val){
	if(typeof val ==="undefined"){
		return this.get_paddingTop();
	}else{
		this.set_paddingTop(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingBottom(){
	return this.attr("paddingBottom");
}
function UMP$UI$Mvc$JControlBase$set_paddingBottom(val){
	this.attr("paddingBottom", val);
}
function UMP$UI$Mvc$JControlBase$paddingBottom(val){
	if(typeof val ==="undefined"){
		return this.get_paddingBottom();
	}else{
		this.set_paddingBottom(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingLeft(){
	return this.attr("paddingLeft");
}
function UMP$UI$Mvc$JControlBase$set_paddingLeft(val){
	this.attr("paddingLeft", val);
}
function UMP$UI$Mvc$JControlBase$paddingLeft(val){
	if(typeof val ==="undefined"){
		return this.get_paddingLeft();
	}else{
		this.set_paddingLeft(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingRight(){
	return this.attr("paddingRight");
}
function UMP$UI$Mvc$JControlBase$set_paddingRight(val){
	this.attr("paddingRight", val);
}
function UMP$UI$Mvc$JControlBase$paddingRight(val){
	if(typeof val ==="undefined"){
		return this.get_paddingRight();
	}else{
		this.set_paddingRight(val);
	}
}

//margin
function UMP$UI$Mvc$JControlBase$get_marginTop(){
	return this.attr("marginTop");
}
function UMP$UI$Mvc$JControlBase$set_marginTop(val){
	this.attr("marginTop", val);
}
function UMP$UI$Mvc$JControlBase$marginTop(val){
	if(typeof val ==="undefined"){
		return this.get_marginTop();
	}else{
		this.set_marginTop(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_marginBottom(){
	return this.attr("marginBottom");
}
function UMP$UI$Mvc$JControlBase$set_marginBottom(val){
	this.attr("marginBottom", val);
}
function UMP$UI$Mvc$JControlBase$marginBottom(val){
	if(typeof val ==="undefined"){
		return this.get_marginBottom();
	}else{
		this.set_marginBottom(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_marginLeft(){
	return this.attr("marginLeft");
}
function UMP$UI$Mvc$JControlBase$set_marginLeft(val){
	this.attr("marginLeft", val);
}
function UMP$UI$Mvc$JControlBase$marginLeft(val){
	if(typeof val ==="undefined"){
		return this.get_marginLeft();
	}else{
		this.set_marginLeft(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_marginRight(){
	return this.attr("marginRight");
}
function UMP$UI$Mvc$JControlBase$set_marginRight(val){
	this.attr("marginRight", val);
}
function UMP$UI$Mvc$JControlBase$marginRight(val){
	if(typeof val ==="undefined"){
		return this.get_marginRight();
	}else{
		this.set_marginRight(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_backgroundColorDis(){
	return this.attr("backgroundColorDis");
}
function UMP$UI$Mvc$JControlBase$set_backgroundColorDis(val){
	this.attr("backgroundColorDis", val);
}
function UMP$UI$Mvc$JControlBase$backgroundColorDis(val){
	if(typeof val ==="undefined"){
		return this.get_backgroundColorDis();
	}else{
		this.set_backgroundColorDis(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_backgroundImageDis(){
	return this.attr("backgroundImageDis");
}
function UMP$UI$Mvc$JControlBase$set_backgroundImageDis(val){
	this.attr("backgroundImageDis", val);
}
function UMP$UI$Mvc$JControlBase$backgroundImageDis(val){
	if(typeof val ==="undefined"){
		return this.get_backgroundImageDis();
	}else{
		this.set_backgroundImageDis(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_pressedImage(){
	return this.attr("pressedImage");
}
function UMP$UI$Mvc$JControlBase$set_pressedImage(val){
	this.attr("pressedImage", val);
}
function UMP$UI$Mvc$JControlBase$pressedImage(val){
	if(typeof val ==="undefined"){
		return this.get_pressedImage();
	}else{
		this.set_pressedImage(val);
	}
}
function UMP$UI$Mvc$JControlBase$get_pressedColor(){
	return this.attr("pressedColor");
}
function UMP$UI$Mvc$JControlBase$set_pressedColor(val){
	this.attr("pressedColor", val);
}
function UMP$UI$Mvc$JControlBase$pressedColor(val){
	if(typeof val ==="undefined"){
		return this.get_pressedColor();
	}else{
		this.set_pressedColor(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_color(){
	return this.attr("color");
}
function UMP$UI$Mvc$JControlBase$set_color(val){
	this.attr("color", val);
}
function UMP$UI$Mvc$JControlBase$color(val){
	if(typeof val ==="undefined"){
		return this.get_color();
	}else{
		this.set_color(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_fontFamily(){
	return this.attr("fontFamily");
}
function UMP$UI$Mvc$JControlBase$set_fontFamily(val){
	this.attr("fontFamily", val);
}
function UMP$UI$Mvc$JControlBase$fontFamily(val){
	if(typeof val ==="undefined"){
		return this.get_fontFamily();
	}else{
		this.set_fontFamily(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_fontSize(){
	return this.attr("fontSize");
}
function UMP$UI$Mvc$JControlBase$set_fontSize(val){
	this.attr("fontSize", val);
}
function UMP$UI$Mvc$JControlBase$fontSize(val){
	if(typeof val ==="undefined"){
		return this.get_fontSize();
	}else{
		this.set_fontSize(val);
	}
}

UMP.UI.Mvc.JControlBase.prototype = {
	parseType: UMP$UI$Mvc$JControlBase$parseType,

	//common attribute
	get_visible: UMP$UI$Mvc$JControlBase$get_visible,
	set_visible: UMP$UI$Mvc$JControlBase$set_visible,
	get_disabled: UMP$UI$Mvc$JControlBase$get_disabled,
	set_disabled: UMP$UI$Mvc$JControlBase$set_disabled,
	
	//css
	get_background: UMP$UI$Mvc$JControlBase$get_background,
	set_background: UMP$UI$Mvc$JControlBase$set_background,
	background: UMP$UI$Mvc$JControlBase$background,
	
	get_backgroundImage: UMP$UI$Mvc$JControlBase$get_backgroundImage,
	set_backgroundImage: UMP$UI$Mvc$JControlBase$set_backgroundImage,
	backgroundImage: UMP$UI$Mvc$JControlBase$backgroundImage,
	
	get_width: UMP$UI$Mvc$JControlBase$get_width,
	set_width: UMP$UI$Mvc$JControlBase$set_width,
	width: UMP$UI$Mvc$JControlBase$width,
	
	get_height: UMP$UI$Mvc$JControlBase$get_height,
	set_height: UMP$UI$Mvc$JControlBase$set_height,
	height: UMP$UI$Mvc$JControlBase$height,
	
	get_layout: UMP$UI$Mvc$JControlBase$get_layout,
	set_layout: UMP$UI$Mvc$JControlBase$set_layout,
	layout: UMP$UI$Mvc$JControlBase$layout,
	
	get_weight: UMP$UI$Mvc$JControlBase$get_weight,
	set_weight: UMP$UI$Mvc$JControlBase$set_weight,
	weight: UMP$UI$Mvc$JControlBase$weight,
	
	get_halign: UMP$UI$Mvc$JControlBase$get_halign,
	set_halign: UMP$UI$Mvc$JControlBase$set_halign,
	halign: UMP$UI$Mvc$JControlBase$halign,
	
	get_valign: UMP$UI$Mvc$JControlBase$get_valign,
	set_valign: UMP$UI$Mvc$JControlBase$set_valign,
	valign: UMP$UI$Mvc$JControlBase$valign,
	
	get_paddingTop: UMP$UI$Mvc$JControlBase$get_paddingTop,
	set_paddingTop: UMP$UI$Mvc$JControlBase$set_paddingTop,
	paddingTop: UMP$UI$Mvc$JControlBase$paddingTop,
	
	get_paddingBottom: UMP$UI$Mvc$JControlBase$get_paddingBottom,
	set_paddingBottom: UMP$UI$Mvc$JControlBase$set_paddingBottom,
	paddingBottom: UMP$UI$Mvc$JControlBase$paddingBottom,
	
	get_paddingLeft: UMP$UI$Mvc$JControlBase$get_paddingLeft,
	set_paddingLeft: UMP$UI$Mvc$JControlBase$set_paddingLeft,
	paddingLeft: UMP$UI$Mvc$JControlBase$paddingLeft,
	
	get_paddingRight: UMP$UI$Mvc$JControlBase$get_paddingRight,
	set_paddingRight: UMP$UI$Mvc$JControlBase$set_paddingRight,
	paddingRight: UMP$UI$Mvc$JControlBase$paddingRight,
	
	get_marginTop: UMP$UI$Mvc$JControlBase$get_marginTop,
	set_marginTop: UMP$UI$Mvc$JControlBase$set_marginTop,
	marginTop: UMP$UI$Mvc$JControlBase$marginTop,
	
	get_marginBottom: UMP$UI$Mvc$JControlBase$get_marginBottom,
	set_marginBottom: UMP$UI$Mvc$JControlBase$set_marginBottom,
	marginBottom: UMP$UI$Mvc$JControlBase$marginBottom,
	
	get_marginLeft: UMP$UI$Mvc$JControlBase$get_marginLeft,
	set_marginLeft: UMP$UI$Mvc$JControlBase$set_marginLeft,
	marginLeft: UMP$UI$Mvc$JControlBase$marginLeft,
	
	get_marginRight: UMP$UI$Mvc$JControlBase$get_marginRight,
	set_marginRight: UMP$UI$Mvc$JControlBase$set_marginRight,
	marginRight: UMP$UI$Mvc$JControlBase$marginRight,

	get_backgroundColorDis: UMP$UI$Mvc$JControlBase$get_backgroundColorDis,
	set_backgroundColorDis: UMP$UI$Mvc$JControlBase$set_backgroundColorDis,	
	get_backgroundImageDis: UMP$UI$Mvc$JControlBase$get_backgroundImageDis,
	set_backgroundImageDis: UMP$UI$Mvc$JControlBase$set_backgroundImageDis,

	get_pressedImage: UMP$UI$Mvc$JControlBase$get_pressedImage,
	set_pressedImage: UMP$UI$Mvc$JControlBase$set_pressedImage,	
	get_pressedColor: UMP$UI$Mvc$JControlBase$get_pressedColor,
	set_pressedColor: UMP$UI$Mvc$JControlBase$set_pressedColor,
	
	get_color: UMP$UI$Mvc$JControlBase$get_color,
	set_color: UMP$UI$Mvc$JControlBase$set_color,
	color: UMP$UI$Mvc$JControlBase$color,
	
	get_fontFamily: UMP$UI$Mvc$JControlBase$get_fontFamily,
	set_fontFamily: UMP$UI$Mvc$JControlBase$set_fontFamily,
	fontFamily: UMP$UI$Mvc$JControlBase$fontFamily,
	
	get_fontSize: UMP$UI$Mvc$JControlBase$get_fontSize,
	set_fontSize: UMP$UI$Mvc$JControlBase$set_fontSize,
	fontSize: UMP$UI$Mvc$JControlBase$fontSize
	
};
UMP.UI.Mvc.JControlBase.registerClass('UMP.UI.Mvc.JControlBase', UMP.UI.Mvc.Element);


Type.registerNamespace('UMP.UI.JControl');
//__________________________________________________________________________________________ Label
UMP.UI.JControl.Label = function UMP$UI$JControl$Label(obj){	
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Label.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Label);
		return ele;
    }
}
UMP.UI.JControl.Label.prototype = {
	get_text: function(){
        return this.attr("content");
    },
    set_text:function(text){
        this.attr("content", text);
    },
	get_bindfield:function(){
        this.attr("bindfield");
    },
	set_bindfield: function(fieldName){
        this.attr("bindfield", fieldName);
    }
};
UMP.UI.JControl.Label.registerClass('UMP.UI.JControl.Label',UMP.UI.Mvc.JControlBase);





//__________________________________________________________________________________________ Button
UMP.UI.JControl.Button = function UMP$UI$JControl$Button(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Button.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Button);
		return ele;
    }
}
UMP.UI.JControl.Button.prototype = {
	get_text:function(){
		return this.attr("text");
	},
	set_text:function(text){
		this.attr("text",text);
	},
	get_onclick:function(){
		return this.attr("onclick");
	},
	set_onclick:function(val){
		this.attr("onclick", val);
	}
};
UMP.UI.JControl.Button.registerClass('UMP.UI.JControl.Button',UMP.UI.Mvc.JControlBase);

//__________________________________________________________________________________________ Input
UMP.UI.JControl.Input = function UMP$UI$JControl$Input(obj){
    UMP.UI.JControl.Input.initializeBase(this, []);
	this._bindfield = "";
}
function UMP$UI$JControl$Input$get_value(){
	this.attr("value");
}
function UMP$UI$JControl$Input$set_value(value){
	return this.attr("value", value);
}
function UMP$UI$JControl$Input$val(value){
	if(typeof value === "undefined"){
		this.get_value();
	}else{
		this.set_value(value);
	}	
}

function UMP$UI$JControl$Input$get_readOnly(){
	return this.attr("readOnly");
}
function UMP$UI$JControl$Input$set_readOnly(val){
	this.attr("readOnly", val);
}
function UMP$UI$JControl$Input$readOnly(val){
	if(typeof val === "undefined"){
		this.get_readOnly();
	}else{
		this.set_readOnly(val);
	}
}

function UMP$UI$JControl$Input$get_maxlength(){
	return this.attr("maxlength");
}
function UMP$UI$JControl$Input$set_maxlength(val){
	this.attr("maxlength", val);
}
function UMP$UI$JControl$Input$maxlength(val){
	if(typeof val === "undefined"){
		this.get_maxlength();
	}else{
		this.set_maxlength(val);
	}
}

function UMP$UI$JControl$Input$get_placeholder(){
	return this.attr("placeholder");
}
function UMP$UI$JControl$Input$set_placeholder(val){
	this.attr("placeholder", val);
}
function UMP$UI$JControl$Input$placeholder(val){
	if(typeof val === "undefined"){
		this.get_placeholder();
	}else{
		this.set_placeholder(val);
	}
}

function UMP$UI$JControl$Input$get_bindfield(){
	return this.attr("bindfield");
}
function UMP$UI$JControl$Input$set_bindfield(fieldName){
	this.attr("bindfield", fieldName);
}
function UMP$UI$JControl$Input$bindfield(fieldName){
	if(typeof fieldName === "undefined"){
		this.get_bindfield();
	}else{
		this.set_bindfield(fieldName);
	}
}
UMP.UI.JControl.Input.prototype = {	
	//HTML5 standard API
	get_value: UMP$UI$JControl$Input$get_value,
	set_value: UMP$UI$JControl$Input$set_value,	
	//JQuery Style API
	val: UMP$UI$JControl$Input$val,
	
	get_readOnly: UMP$UI$JControl$Input$get_readOnly,
	set_readOnly: UMP$UI$JControl$Input$set_readOnly,	
	readOnly: UMP$UI$JControl$Input$readOnly,
	 
	get_maxlength: UMP$UI$JControl$Input$get_maxlength,
	set_maxlength: UMP$UI$JControl$Input$set_maxlength,	
	maxlength: UMP$UI$JControl$Input$maxlength,
	
	get_placeholder: UMP$UI$JControl$Input$get_placeholder,
	set_placeholder: UMP$UI$JControl$Input$set_placeholder,	
	placeholder: UMP$UI$JControl$Input$placeholder,
	
	
	get_bindfield: UMP$UI$JControl$Input$get_bindfield,
	set_bindfield: UMP$UI$JControl$Input$set_bindfield,
	bindfield: UMP$UI$JControl$Input$bindfield
};
UMP.UI.JControl.Input.registerClass('UMP.UI.JControl.Input',UMP.UI.Mvc.JControlBase);








//__________________________________________________________________________________________ TextBox
UMP.UI.JControl.TextBox = function UMP$UI$JControl$TextBox(ele){	
    if(this instanceof UMP.UI.JControl.TextBox){
	    var aaa = "类型转换";
	}
	if(this.__typeName=="UMP.UI.JControl"){
	    var aaa = "类型转换";
	}
	
	
	if(typeof ele == "undefined"){
       UMP.UI.JControl.TextBox.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.TextBox);
		return ele;
    }
}
UMP.UI.JControl.TextBox.prototype = {
    get_text: function () {
        return this.val();
    },
    set_text: function (text) {
        this.val(text);
    }
};
UMP.UI.JControl.TextBox.registerClass('UMP.UI.JControl.TextBox',UMP.UI.JControl.Input);





//__________________________________________________________________________________________ Number
UMP.UI.JControl.Number = function UMP$UI$JControl$Number(){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Number.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Number);
		return ele;
    }
}
UMP.UI.JControl.Number.prototype = {
    get_max: function () {
        return this.attr("max");
    },
    set_max: function (val) {
        this.attr("max", val);
    },
    get_min: function () {
        return this.attr("min");
    },
    set_min: function (val) {
        this.attr("min", val);
    },
    get_currency: function () {
        return this.attr("currency");
    },
    set_currency: function (val) {
        this.attr("currency", val);
    },
    get_precision: function () {
        return this.attr("max");
    },
    set_precision: function (val) {
        this.attr("precision", val);
    },
    get_roundType: function () {
        return this.attr("max");
    },
    set_roundType: function (val) {
        this.attr("roundType", val);
    },
    get_roundValue: function () {
        return this.attr("max");
    },
    set_roundValue: function (val) {
        this.attr("roundValue", val);
    }
};
UMP.UI.JControl.Number.registerClass('UMP.UI.JControl.Number',UMP.UI.JControl.Input);


//__________________________________________________________________________________________ ComboBox
UMP.UI.JControl.ComboBox = function UMP$UI$JControl$ComboBox(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.ComboBox.initializeBase(this, []);
	   
	   this._options = [];
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.ComboBox);
		return ele;
    }
}
UMP.UI.JControl.ComboBox.prototype = {
    get_datasource: function () {
        return this.attr("datasource");
    },
    set_datasource: function (val) {
        this.attr("datasource", val);
    },
	get_options: function () {
        return this.attr("options");
    },
    set_options: function (val) {
        this.attr("options", val);
    }
};
UMP.UI.JControl.ComboBox.registerClass('UMP.UI.JControl.ComboBox', UMP.UI.JControl.Input);


//__________________________________________________________________________________________ CheckBox
UMP.UI.JControl.CheckBox = function UMP$UI$JControl$CheckBox(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.CheckBox.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.CheckBox);
		return ele;
    }
}
UMP.UI.JControl.CheckBox.prototype = {
    get_checked: function () {
        return this.attr("checked");
    },
    set_checked: function (val) {
        this.attr("checked", val);
    }
};
UMP.UI.JControl.CheckBox.registerClass('UMP.UI.JControl.CheckBox', UMP.UI.JControl.Input);

//__________________________________________________________________________________________ Switch
UMP.UI.JControl.Switch = function UMP$UI$JControl$Switch(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Switch.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Switch);
		return ele;
    }
}
UMP.UI.JControl.Switch.prototype = {
    get_value: function () {
        return this.attr("value");
    },
    set_value: function (text) {
        this.attr("value", val);
    }
};
UMP.UI.JControl.Switch.registerClass('UMP.UI.JControl.Switch', UMP.UI.JControl.Input);


//__________________________________________________________________________________________ Image
UMP.UI.JControl.Image = function UMP$UI$JControl$Image(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Image.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Image);
		return ele;
    }
}
UMP.UI.JControl.Image.prototype = {
    get_src: function () {
        return this.attr("src");
    },
    set_src: function (val) {
        this.attr("src", val);
    }
};
UMP.UI.JControl.Image.registerClass('UMP.UI.JControl.Image', UMP.UI.Mvc.JControlBase);

//__________________________________________________________________________________________ toggleButton
UMP.UI.JControl.ToggleButton = function UMP$UI$JControl$ToggleButton(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.ToggleButton.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.ToggleButton);
		return ele;
    }
}
UMP.UI.JControl.ToggleButton.prototype = {
    get_textOn: function () {
        return this.attr("textOn");
    },
    set_textOn: function (val) {
        this.attr("textOn", val);
    },
	get_textOff: function () {
        return this.attr("textOff");
    },
    set_textOff: function (val) {
        this.attr("textOff", val);
    },
    get_checked: function () {
        return this.attr("checked");
    },
    set_checked: function (val) {
        this.attr("checked", val);
    },
	get_onclick: function () {
        return this.attr("onclick");
    },
    set_onclick: function (val) {
        this.attr("onclick", val);
    }
};
UMP.UI.JControl.ToggleButton.registerClass('UMP.UI.JControl.ToggleButton', UMP.UI.Mvc.JControlBase);

//__________________________________________________________________________________________ Tooltipbar
UMP.UI.JControl.Tooltipbar = function UMP$UI$JControl$Tooltipbar(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Tooltipbar.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Tooltipbar);
		return ele;
    }
}
UMP.UI.JControl.Tooltipbar.prototype = {
    get_value: function () {
        return this.attr("value");
    },
    set_value: function (text) {
        this.attr("value", val);
    }
};
UMP.UI.JControl.Tooltipbar.registerClass('UMP.UI.JControl.Tooltipbar', UMP.UI.Mvc.JControlBase);



$context = null;
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
//1、每一个Context有tag attributes fields组成
//1、每一个Field有tag attributes组成
$$$orderUNode= {
	tag:"context",
	namespace:"com.yonyou.um",
	attributes:{id:"order", from_type:"mbe", filter:"", iscascade:"false"},
	fields:{
		a:{tag:"field", attributes:{id:"a", type:"string"}},
		b:{tag:"field", attributes:{id:"b", type:"string"}},
		c:{tag:"field", attributes:{id:"c", type:"string"}},
		lines:{
			tag:"fieldset",
			attributes:{id:"lines", from:"soline", type:"string", relation:"n", parent_field:"", child_field:"", from_type:"mbe", iscascade:"false"},
			fields:{
				la:{tag:"field", attributes:{id:"la", type:"string"}},
				lb:{tag:"field", attributes:{id:"lb", type:"string"}},
				lc:{tag:"field", attributes:{id:"lc", type:"string"}},
				detail:{
					tag:"fieldset",
					attributes:{id:"detail", from:"linedetail", type:"string", relation:"n", parent_field:"", child_field:"", from_type:"mbe", iscascade:"false"},
					fields:{
						da:{tag:"field", attributes:{id:"da", type:"string"}},
						db:{tag:"field", attributes:{id:"db", type:"string"}},
						dc:{tag:"field", attributes:{id:"dc", type:"string"}}
					}			
				}
			}
		},
		cust:{
			tag:"fieldset",
			attributes:{id:"cust", from:"customer", type:"string", relation:"1", parent_field:"", child_field:"", from_type:"mbe", iscascade:"false"},
			fields:{
				ca:{tag:"field", attributes:{id:"ca", type:"string"}},
				cb:{tag:"field", attributes:{id:"cb", type:"string"}},
				cc:{tag:"field", attributes:{id:"cc", type:"string"}}
			}
		}	
	}
};


$um$createContextDefine = function(id, metaData){
	var entity = new UMP.UI.Mvc.Entity("context");
	
	for(var key in metaData.attributes){
		entity.attr(key,metaData.attributes[key]);
	}

	for(var key in metaData.fields){
		var tag = metaData.fields[key].tag;
		if(tag=="field"){
			var prop = $um$createProperty4fd(metaData.fields[key]);
			entity.addProperty(prop);
		}else if(tag=="fieldset"){
			var prop = $um$createProperty4fdset(metaData.fields[key]);
			entity.addProperty(prop);
		}

	}
	return entity;
}
$um$initEntity = function(entity, id, metaData){
	
	entity.namespace(metaData.namespace);
	
	for(var key in metaData.attributes){
		entity.attr(key,metaData.attributes[key]);
	}

	for(var key in metaData.fields){
		var tag = metaData.fields[key].tag;
		if(tag=="field"){
			var prop = $um$createProperty4fd(metaData.fields[key]);
			entity.addProperty(prop);
		}else if(tag=="fieldset"){
			var prop = $um$createProperty4fdset(metaData.fields[key]);
			entity.addProperty(prop);
		}

	}
	return entity;
}

$um$createProperty4fd = function(metaData){
    if(metaData.tag=="field"){
        var prop = new UMP.UI.Mvc.Property("field");
	    for(var key in metaData.attributes){
		    prop.attr(key,metaData.attributes[key]);
	    }
		return prop;
	}else{
	    alert("$um$createProperty4fd Error!");
	    return null;
	}
}
$um$createProperty4fdset = function(metaData){
    if(metaData.tag=="fieldset"){
        var fdset = new UMP.UI.Mvc.Entity("fieldset");
		
		fdset.namespace(metaData.namespace);
		
	    for(var key in metaData.attributes){
		    fdset.attr(key,metaData.attributes[key]);
	    }
		
		for(var key in metaData.fields){
		    if(metaData.fields[key].tag=="field"){
			    var obj = $um$createProperty4fd(metaData.fields[key]);
				fdset.addProperty(obj);
			}else if(metaData.fields[key].tag=="fieldset"){
			    var obj = $um$createProperty4fdset(metaData.fields[key]);
				fdset.addProperty(obj);
			}
	    }
		return fdset;
	}else{
	    alert("$um$createProperty4fdset Error!");
	    return null;
	}
}
$$$json = {
		a:1,
		b:2,
		c:3,
		lines:[
			{la:12,lb:13,lc:14,detail:[{da:1001,db:1002,dc:1003},{da:2001,db:2002,dc:2003}]},
			{la:22,lb:23,lc:24,detail:[{da:1004,db:1005,dc:1006},{da:2004,db:2005,dc:2006}]}
		],
		cust:{ca:"112",cb:"ab23",cc:"dept1"}		
};
/*
so._rows = [{a:1,b:2,c:3}];
var soline={};
soline._rows=[{la:11,lb:22,lc:33},{la:111,lb:222,lc:333}];
so.addLink({"soline":soline});//so._links ={lines:soline};


so.get_lines().getRow(1);//so._soline
*/



_$um$isField = function(obj){
	//number,boolean,string,function,object,undefined
	if(typeof(obj) == "number" || typeof(obj)=="boolean" || typeof(obj)=="string"){
		return true;
	}else if(typeof(obj) == "object"){ 
		return false;
	}else if(typeof(obj) == "function"){
		return false;
	}
}

_$um$isArray = function(obj){	
	if(obj instanceof Array)
		return true;
	else
		return false;
}

//-------------------------------------------------------- CRUD Load-------------------------------------------------------- Begin
//$面向开发人员  _$面向平台内部
_$um$CRUD$load = function(ctx,json,entity){//相当于数据加载过程--------------------------------------------------------load    	
    if(entity==null){//no context define 兼容老的没有entity定义的情况		
		/*************************** $console.log begin *************************************/	
			try{
				var strlog = "[info] _$um$CRUD$load(ctx,json,entity)....正在执行，此时entity==null,将return null";
				$console.log(strlog);
				strlog = "接下来在xxxControllerBase中的$context将是一个json，而不是一个强类型的context,通常这是由于没有产生context代码引起的";
				$console.log(strlog);
				strlog = "在xxxcontroller中的ctx和$context="+$jsonToString(json);
				$console.log(strlog);
			}catch(e){
				$console.alert("Log Exception:" + e.stack);
			}
		/*************************** $console.log end ***************************************/	
		return null;
	}
	
	if(json == null){
		/*************************** $console.log begin *************************************/	
			try{
				var strlog = "[info] _$um$CRUD$load(ctx,json,entity)....正在执行,此时json==null,这基本不可能,将return ctx";
				$console.log(strlog);
			}catch(e){
				$console.alert("Log Exception:" + e.stack);
			}
		/*************************** $console.log end ***************************************/	
		return ctx;	
	}
	
	if(entity.tag()=="context"){
		_$um$CRUD$loadFieldSet1(ctx, json, entity);		
	}else if(entity.tag()=="fieldset"){
		_$um$CRUD$loadFieldSet(ctx, key, json, entity);
	}
	
	ctx.unload();
	ctx.json(json);//将原始的json加入强类型Context中
	
	/*************************** $console.log begin *************************************/	
		try{
			var strlog = "[info] _$um$CRUD$load(ctx,json,entity)....执行完毕,数据加载过程完毕,即将返回一个强类型的Context，此时ctx.unload()=="+ctx.unload();			
			strlog += ";此时$jsonToString(json)=="+$jsonToString(json);
			$console.log(strlog);
			
		}catch(e){
			$console.alert("Log Exception:" + e.stack);
		}
	/*************************** $console.log end ***************************************/
	return ctx;	
}

_$um$CRUD$loadFieldSet = function(ctx, key, json, entity){
	var fieldset = entity.property(key);
	var relation = fieldset.attr("relation");
	if(relation){
		//本应relation做严格检查，鉴于原生没有做检查，暂不根据relation做检查，而根据json来做动态加载
		//if(relation=="n"){
		if(json[key] instanceof Array){
			var ctxN = new UMP.UI.Mvc.ContextTable(key,fieldset);
			_$um$CRUD$loadFieldSetN(ctxN, json[key], fieldset);
			ctx.addLink(key, ctxN);
		//}else if(relation=="1"){
		}else if(typeof(json[key]) =="object"){
			var ctx1 = new UMP.UI.Mvc.Context(key,fieldset);
			_$um$CRUD$loadFieldSet1(ctx1, json[key], fieldset);
			ctx.addLink(key, ctx1);
		}else{
			alert(ctx.id()+"的字段"+ key + "不支持relation为" +entity.property(key).attr("relation").toString());
		}
	}else{
		alert(ctx.id()+"的字段"+ key + "没有定义relation，请检查Context定义");
	}
}

_$um$CRUD$loadFieldSetN = function (ctxN,jsonArray,entity){
    if(!jsonArray)
		return;
	if(!_$um$isArray(jsonArray)){
		$alert(entity.id() + "在Context定义中表达1:N，但其对应的json数据不是一个数组,而是" + $jsonToString(jsonArray));
		return;
	}
	/*
	if(isReload){
		ctxN.clear();//先清空
	}
	*/
	for(var i=0,len=jsonArray.length;i<len;i++){
		var ctx1 = new UMP.UI.Mvc.Context(entity.id(), entity);
		_$um$CRUD$loadFieldSet1(ctx1, jsonArray[i], entity);
		ctxN.add(ctx1);
	}	
}
_$um$CRUD$loadFieldSet1 = function(ctx,json,entity){
    if(!json) return;

	if(!entity) entity = ctx.md;
	/*
	if(isReload){
		ctx.clear();//先清空
	}
	*/
	for(var key in json){
		if(entity.property(key)==null){//规则1：entity中没有定义，不处理			
			ctx.addUserData(key, json[key]);			
		}else{
			if(entity.property(key).tag()=="field"){
				var newfield = new UMP.UI.Mvc.Field(key, json[key], entity.property(key));
				ctx.addField(key, newfield);
			}else if(entity.property(key).tag()=="fieldset"){
				_$um$CRUD$loadFieldSet(ctx, key, json, entity);
			}
		}
	}	
}
//-------------------------------------------------------- CRUD unLoad-------------------------------------------------------- End


_$um$CRUD$Context2JSON = function(ctx){//-----------controller结束的时候，由强类型context转化成json
	if(ctx.entity().tag() == "context"){
		return _$um$CRUD$fieldset12json(ctx);	
	}else if(ctx.entity().tag() == "fieldset"){
		return _$um$CRUD$FieldSet2JSON(ctx);
	}else{
		alert("_$um$CRUD$Context2JSON出错！不支持参数ctx这种类型，ctx.entity().tag()==" + ctx.entity().tag());
	}
}

_$um$CRUD$FieldSet2JSON = function(fset){
    if(!fset) return {};
	
	if(fset instanceof UMP.UI.Mvc.ContextTable){
		return _$um$CRUD$fieldsetN2json(fset);
	}else if(fset instanceof UMP.UI.Mvc.Context){
		return _$um$CRUD$fieldset12json(fset);	
	}else{
		debugger;
		alert("Exception in _$um$CRUD$FieldSet2JSON method ,\n\n the Context[" + fset.id() +"] con not be translated to a json because of fset.contextType() == " + fset.contextType());
	}
}
_$um$CRUD$fieldsetN2json = function(fset){
    var json = [];
	
	//var array = fset.field(fset.id());
	var array = fset.rows();
	for(var i=0,len=array.length;i<len;i++){    
	    var fset1 = array[i];
		var obj = _$um$CRUD$fieldset12json(fset1);
		json.push(obj);
	}	
    return json;
}
_$um$CRUD$fieldset12json = function(ctx){
    var json = {};    
    for(var key in ctx.fields()){
	    var fd = ctx.field(key);
		if(fd instanceof UMP.UI.Mvc.Field){
		    json[key] = fd.get();
		}else if(fd instanceof UMP.UI.Mvc.ContextTable || fd instanceof UMP.UI.Mvc.Context){
		    var obj = _$um$CRUD$FieldSet2JSON(fd);
	        json[key] = obj;
		}else{
			alert("_$um$CRUD$fieldset12json()出错! "+ctx.id()+"的字段"+key+"是一个不支持类型");
		}
	}
	
	//handle the userData
	if(ctx.getUserDataKeys()){
		for(var i=0,len = ctx.getUserDataKeys().length;i<len;i++){
			var ukey = ctx.getUserDataKeys()[i];
			json[ukey] = ctx[ukey];
		}
	}
	return json;
}

_$um$CRUD$field2json = function(fd){
    var json = {};
	if(fd instanceof UMP.UI.Mvc.Field){
		json[key] = fd.get();
	}else{
		alert("_$um$CRUD$field2json()时传入参数不是一个UMP.UI.Mvc.Field类型的对象");
	}
	return json;
}











$um$callAction = function(actionid,actionFun){
	alert("$um$callAction executing.....");
}﻿
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
	var cBase = __$getInstance(controllerBaseId);
	cBase.execute(actionid, json);
}
function UMP$UI$Mvc$Router$eval(controllerid, js, ctx, sender, args, uicontrols){
	//if($isWeb && false){
	if(false){
		$__controller.eval(js, ctx, sender, args);
	}else{
		var c = __$getInstance(controllerid);
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
		$__controller.eval(js, ctx, sender, args);
	}else{
		var c = __$getInstance(controllerid);
		if(c){
			if(!custom) alert("调试发生异常");
			custom["debug"] = "begin";//custom内已经含有id信息，用于标识该次执行JS的唯一标识
			$service.call("UMJS.debug",custom,true);//同步通知安卓原生调试开始
			
			c.eval(js, ctx, sender, args, {});
			
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
			this._controller = __$getInstance(cT);
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
						var func = eval(funcName);
						if($isFunction(func)){
							func.apply(this, [sender, args]);		
						}else{
							alert("一个未定义的方法["+funcName+"]，请检查该方法的定义，并且确保语法问题");
						}
					}catch(e){
						if(e){
							if(e.stack){
								alert(e.stack);
							}else{
								alert(e);
							}
						}else{
							alert("执行方法["+funcName+"]发生未知异常...")
						}
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
$__controller = new UMP.UI.Mvc.Controller();
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





