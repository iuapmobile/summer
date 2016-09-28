
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
	jsonArgs["__keepCallback"] = true;
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


