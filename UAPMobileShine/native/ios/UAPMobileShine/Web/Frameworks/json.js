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
