
//___________________________________________________________________________________________________ $js
Type.registerNamespace('UMP.Services');
UMP.Services.UMJS=function(){	
	this._UMCtx_dataBind = "UMCtx.dataBind";	
	
	this._UMCtx_getValue = "UMCtx.getValue";
	
	this._UMCtx_setValue = "UMCtx.setValue";
	this._UMCtx_setUMContext = "UMCtx.setUMContext";
	this._UMCtx_setAppValue = "UMCtx.setAppValue";
}
function UMP$Services$UMJS$showLoadingBar(args){
	//显示loading： args = {opacity:0.8, background:#e3e3ea}
	return $service.call("UMJS.showLoadingBar", typeof args == "undefined" ? {} : args);
}
function UMP$Services$UMJS$hideLoadingBar(args){
	//隐藏loading：
	return $service.call("UMJS.hideLoadingBar",typeof args == "undefined" ? {} : args);
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
		alert("$toast方法不支持参数类型为["+typeof msg+"]的参数,不是一个有效的字符串或JSONObject");
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
