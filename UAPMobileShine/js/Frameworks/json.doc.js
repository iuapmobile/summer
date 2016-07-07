
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// Author： gct
Array.prototype.remove = function(i){
    if(isNaN(i) || i >= this.length){
	    return false;
	}
	this.splice(i,1);
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
/**
* 将JSON对象转化为字符串
* @param {JSON} obj - JSON对象
* @returns {String} 返回JSON对象对应的字符串
*/	
$jsonToString = function (obj){
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
				var string = [];
				for (var property in obj){
					var vv = THIS.jsonToString(obj[property]);
					var p = THIS.jsonToString(property);
					if(p.indexOf("\"")>=0){

					}else{
						p="\""+p+"\"";
					}
					if(obj[property] instanceof Array){
						
					}else if(vv.toString().indexOf("\"")>=0){//哪一种情况??
					 
					}
					else{
						vv="\"" +vv+"\"" ;
						//string.push("\""+THIS.jsonToString(property)+"\"" + ':'+"\"" + THIS.jsonToString(obj[property])+"\"");
					}
					string.push(p + ':'+vv);
					}
				return '{' + string.join(',') + '}';  
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
jsonToString = $jsonToString;

/**
* 将字符串转化为JSON对象
* @param {String} str -字符串
* @returns {String} 返回字符串对应的JSON对象
*/
$stringToJSON = function (str){
    if(str == null || (typeof str == "string" && str == ""))
		return null;
		
	if(typeof str == "string"){
		try{
			if(str.indexOf("\n") >= 0){				
				str = str.replace(/\n/g,"\\n");
			}
			var json = eval('(' + str + ')');	
			return json;
		}catch(e){
			//alert("stringToJSON Exception! not a valid json string ");
			return str;
		}
	}else if(typeof str == "object"){
		return str;
	}else{
		alert("$stringToJSON()出错!未识别的参数类型");
		return str;//不会走到这里
	}
}

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
stringToJSON = $stringToJSON;
