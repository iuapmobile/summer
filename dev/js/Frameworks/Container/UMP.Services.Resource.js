
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
