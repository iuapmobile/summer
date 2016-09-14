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
	if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid || CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS) {
   		$service.call("UMDevice.callPhone", "{tel:'"+tel+"'}");
	}else{
		alert("Not implementate UMP$Services$Telephone$call in CurrentEnvironment.DeviceType == " + CurrentEnvironment.DeviceType);
	}
}
function UMP$Services$Telephone$sendMsg(tel, body){
	if(arguments.length == 1 && $isJSONObject(arguments[0])){
		var args = tel;		
	if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid || CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS) {
			return $service.call("UMDevice.sendMsg", args);
		}
	}else{
	if(CurrentEnvironment.DeviceType == CurrentEnvironment.DeviceAndroid || CurrentEnvironment.DeviceType==CurrentEnvironment.DeviceIOS) {
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