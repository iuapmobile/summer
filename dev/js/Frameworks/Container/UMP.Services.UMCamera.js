
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
