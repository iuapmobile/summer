
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
