//summerBridge 3.0.0.20160906
+function(w,s){
	/*  加上如下注释代码，ios无法再声明summerBridge
	if(typeof summerBridge == "undefined"){
		summerBridge = {
			callSync:function(){
				alert("请将执行的逻辑放入summerready中");
			}
		}
	}
	*/
	//1、兼容Android
    if(w.adrinvoker) alert(w.adrinvoker);
    var adrinvoker = {};
    if(w.adrinvoker && w.adrinvoker.call2) alert(w.adrinvoker.call2);

	//Asynchronous call run as corodva bridge
    adrinvoker.call = function(srvName, strJson){
		if(navigator.platform.toLowerCase().indexOf("win")>=0){
			alert("执行"+srvName+"完毕\n参数是："+strJson);
			return;
		}
		
		strJson = strJson || '{}';
		
		var plug = summer.require('summer-plugin-service.XService');
		plug.call(srvName,$summer.strToJson(strJson));
    }

	//Synchronous call as summer bridge
    adrinvoker.call2 = function(srvName, strJson){
		if(navigator.platform.toLowerCase().indexOf("win")>=0){
			alert("执行"+srvName+"完毕\n参数是："+strJson);
			return;
		}
		if(typeof summerBridge != "undefined"){
			return summerBridge.callSync(srvName,strJson);
		}else{
			alert("summerBridge is not defined by native successfully!");
		}
    }
    w.adrinvoker = adrinvoker;
	
	//2、兼容ios
	//ios Synchronous
	if(typeof CurrentEnvironment != "undefined"){
		if($summer.os == "ios"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceIOS;
		}else if($summer.os == "android"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceAndroid;
		}else{}
	}
	if(typeof UM_callNativeService == "undefined"){
		var UM_callNativeService = function(serviceType,strParams){//同步调用，和安卓统一接口
			return adrinvoker.call2(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeService is exist! fatal error!");
		alert(UM_callNativeService);
	}
	w.UM_callNativeService = UM_callNativeService;
	
	//ios Asynchronous
	if(typeof UM_callNativeServiceNoraml == "undefined"){
		UM_callNativeServiceNoraml = function(serviceType,strParams){//异步调用，和安卓统一接口
			return adrinvoker.call(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeServiceNoraml is exist! fatal error!");
		alert(UM_callNativeServiceNoraml);
	}
	w.UM_callNativeServiceNoraml = UM_callNativeServiceNoraml;	

	//3、
	s.callSync = function(serivceName, strJson){
		var strParam = strJson;
		if(typeof strJson == "object"){
			strParam = JSON.stringify(strJson);
		}else if(typeof strJson != "string"){
			strParam = strJson.toString();
		}
		try{
			return summerBridge.callSync(serivceName, strParam);
		}catch(e){
			if($summer.os == "pc"){
				return strJson;
			}
			alert(e);
		}
	}
	//20160815
	s.callCordova = function(cordovaPlugName, plugFnName, json, successFn, errFn){
		if(this.canrequire() && !this.__debug){
            var plug = this.cordova.require(cordovaPlugName);
			if(plug[plugFnName]){
				plug[plugFnName](json, successFn, errFn);
			}else{
				alert("the cordova plug["+cordovaPlugName+"]'s method[" + plugFnName + "] not implementation");
			}
		}else{
			console.log("the cordova plug["+cordovaPlugName+"]'s method[" + plugFnName + "] executed!");
		}
	}
	
}(window,summer);
