//summerBridge serivce 3.0.0.20160802
+function(w,s){
	//1、兼容Android
    if(w.adrinvoker) alert(w.adrinvoker);
    var adrinvoker = {};
    if(w.adrinvoker && w.adrinvoker.call2) alert(w.adrinvoker.call2);

    adrinvoker.call = function(srvName, strJson){
		if(navigator.platform.toLowerCase().indexOf("win")>=0){
			alert("执行"+srvName+"完毕\n参数是："+strJson);
			return;
		}

		var plug = summer.require('summer-plugin-service.XService');
		plug.call(srvName,$summer.strToJson(strJson));
    }

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
	if(typeof CurrentEnvironment != "undefined"){
		if($summer.os == "ios"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceIOS;
		}else if($summer.os == "android"){
			CurrentEnvironment.DeviceType = CurrentEnvironment.DeviceAndroid;
		}else{}
	}
	if(typeof UM_callNativeService == "undefined"){
		var UM_callNativeService = function(serviceType,strParams){//同步调用
			return adrinvoker.call2(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeService is exist! fatal error!");
		alert(UM_callNativeService);
	}
	w.UM_callNativeService = UM_callNativeService;
	if(typeof UM_callNativeServiceNoraml == "undefined"){
		UM_callNativeServiceNoraml = function(serviceType,strParams){//异步调用
			return adrinvoker.call(serviceType,strParams);
		}
	}else{
		alert("UM_callNativeServiceNoraml is exist! fatal error!");
		alert(UM_callNativeServiceNoraml);
	}
	w.UM_callNativeServiceNoraml = UM_callNativeServiceNoraml;			
}(window,summer);
