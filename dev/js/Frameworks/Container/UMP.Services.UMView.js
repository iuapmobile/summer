
//___________________________________________________________________________________________________ $view UMP.Services.UMView
UMP.Services.UMView = function UMP$Services$UMView(){	
}
function UMP$Services$UMView$open2(jsonArgs){
	if(jsonArgs){
		var viewid = jsonArgs["viewid"];
		if(viewid == null || viewid == ""){
			alert("没有指定参数viewid");
		}else{
			$service.call("UMView.open",jsonArgs);
		}
	}
}
function UMP$Services$UMView$open(jsonArgs){
	if(jsonArgs){
		var viewid = jsonArgs["viewid"];
		if(viewid == null || viewid == ""){
			alert("没有指定参数viewid");
		}else{
			if($validator.isNamespace){
				var ind = viewid.indexOf("。");//半角
				if(ind>=0){
					alert("执行$view.open时，\n参数viewid["+viewid+"]的第"+(ind+1)+"个字母是中文点")
					return;
				}
				ind = viewid.indexOf("。");//全角
				if(ind>=0){
					alert("执行$view.open时，\n参数viewid["+viewid+"]的第"+(ind+1)+"个字母是中文点")
					return;
				}
				
				ind = viewid.indexOf(" ");//包含空格
				if(ind>=0){
					alert("执行$view.open时，\n参数viewid["+viewid+"]的第"+(ind+1)+"个字母是空格")
					return;
				}
				var ns = viewid.substring(0,viewid.lastIndexOf("."));
				if($validator.isNamespace(ns)){
					$service.call("UMView.open",jsonArgs);
				}else{
					alert("$view.open执行失败");
				}
			}else{
				$service.call("UMView.open",jsonArgs);
			}			
		}
	}
}
function UMP$Services$UMView$close(jsonArgs){
	if(typeof jsonArgs == "undefined"){
		jsonArgs = {
			resultcode : 0
		};
	}
	if($isJSONObject(jsonArgs)){
		$service.call("UMView.close",jsonArgs);
	}else{
		alert("请使用close({...})或close()形式的API");
	}	
}
function UMP$Services$UMView$closeWithCallBack(jsonArgs){
	/*
	json = {
		mydata:{a:2,b:45},
		resultcode:15
	}
	*/
	if(typeof jsonArgs == "undefined"){
		jsonArgs = {
			resultcode : 15
		};
	}
	if($isJSONObject(jsonArgs)){
		jsonArgs["resultcode"] = "15";
		$service.call("UMView.close",jsonArgs);
	}else{
		alert("请使用close({...})或close()形式的API");
	}
}
function UMP$Services$UMView$launcher(val){
	if(typeof val == "undefined"){
		return $service.readConfig("customuaplauncher");
	}else{
		return $service.writeConfig({
			"customuaplauncher" : val
		});
	}
}
function UMP$Services$UMView$openPop(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.openPop",jsonArgs);
	}
}
function UMP$Services$UMView$closePop(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.closePop",jsonArgs);
	}
}
function UMP$Services$UMView$openDialog(jsonArgs){
	/*
	style
	titile
	bingdire
	
	
	*/
	if(jsonArgs){
		if(jsonArgs["style"]==null || jsonArgs["style"]==""){
			jsonArgs["style"] = "ok";
		}else if(jsonArgs["style"]=="text-dialog"){
			if(jsonArgs["bindfield"]==null || jsonArgs["bindfield"] == ""){
				jsonArgs["bindfield"] = "bindfield";//默认指定绑定字段为bindfield
			}
		}
		$service.call("UMView.openDialog",jsonArgs);
	}
}
function UMP$Services$UMView$openReference(jsonArgs){
	if(jsonArgs){
		$service.call("UMView.openReference",jsonArgs);
	}
}
function UMP$Services$UMView$openPicker(jsonArgs){
	//参数过多，args为一个json对象
	//UMView.openPicker(args);
	/*    args结构如下：
	参数：
	"pickercount" 必填 枚举值是 1 ,2 ,3
	"datasource"  必填 数据源对应的字段名
	"title"  iOS 可以没有
	"okbuttontitle" 确定控钮 显示的文字
	"cancelbuttontitle" 取消控钮 显示的文字
	"picker1binder"    picker1收集在context中的字段名
	"picker2binder"    picker2收集在context中的字段名
	"picker3binder"    picker3收集在context中的字段名

	事件：
	"okaction"  确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
	"okaction"  确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
	" onselectedchange1"  picker1选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	" onselectedchange2"  picker2选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	" onselectedchange3"  picker3选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	
	*/
	//args形如args1
	var args1 ={
		pickercount:"1",
		datasource:"fieldA",
		title:"",
		okbuttontitle:"确定",
		cancelbuttontitle:"取消",
		picker1binder:"fieldA",
		picker2binder:"fieldB",
		picker3binder:"fieldC",
		okaction:"okAction",  //确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
		cancelaction:"cancelAction",  //确定 控钮的事件，事件中会收集picker中所选 中的数据 加入到context中。
		onselectedchange1:"action1",  //picker1选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
		onselectedchange2:"action2",  //picker2选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
		onselectedchange3:"action3"  //picker3选中值发生改变后的事件，用户可以在这事件中动态 改变 context中的数据。
	};
	
	if(jsonArgs){
		$service.call("UMView.openPicker",jsonArgs);
	}
}
function UMP$Services$UMView$alert(msg){
	var args = {
		title:"确认",
		style:"ok",		
		message:msg		
	};
	return this.openDialog(args);
}
function UMP$Services$UMView$confirm(msg){
	var args = {
		title:"确认",
		style:"ok-cancel",		
		message:msg		
	};
	return this.openDialog(args);
}
function UMP$Services$UMView$changePage(url, options){
	if(!url){
		alert("未指定url");
		return;
	}
	options = options || {};
	options["url"] = url;
	$service.call("UMView.changePage", options);
}
UMP.Services.UMView.prototype = {
	/** 
	* 打开一个新页面 	
	* @param {JSON} json - 打开一个新页面的参数设置{viewid:"xxx.xxx.xxx", isKeep:false, callback:"xxxActionId"}
	* @return {void}
	*/		
	open : UMP$Services$UMView$open,
	open2 : UMP$Services$UMView$open2,
	/** 
	* 关闭当前页面，默认resultcode为0，当resultcode==15时，表明可以执行open方法中定义的callback 	
	* @param {JSON} json - 打开一个新页面的参数设置{resultcode:15, callbackData:{a:1, b:2}}
	* @return {void}
	*/		
	//xxx
	close : UMP$Services$UMView$close,
	closeWithCallBack : UMP$Services$UMView$closeWithCallBack,
	launcher : UMP$Services$UMView$launcher,
	openPop : UMP$Services$UMView$openPop,
	closePop : UMP$Services$UMView$closePop,
	openDialog : UMP$Services$UMView$openDialog,
	openReference : UMP$Services$UMView$openReference,
	openPicker : UMP$Services$UMView$openPicker,
	alert : UMP$Services$UMView$alert,
	confirm : UMP$Services$UMView$confirm,
	changePage : UMP$Services$UMView$changePage
};
UMP.Services.UMView.registerClass('UMP.Services.UMView');
$view = new UMP.Services.UMView();
//----------------------------------------------------------------------------END
UMP.Services.UMWindow = function UMP$Services$UMWindow(){	
}
function UMP$Services$UMWindow$showModalDialog(args){
	if(!$isJSONObject(args)){
		alert("参数不是一个有效的JSONObject");
		return;
	}
	if(args["dialogId"]==null){
		alert("showModalDialog方法的参数dialogId是必填参数");
		return;
	}
	
	return $service.call("UMDialog.showModalDialog", args, false);
}
function UMP$Services$UMWindow$close(args){
	if(typeof args == "undefined"){
		args = {};
	}
	return $service.call("UMDialog.close", args, false);
}
UMP.Services.UMWindow.prototype = {
	showModalDialog : UMP$Services$UMWindow$showModalDialog,
	close : UMP$Services$UMWindow$close
};
UMP.Services.UMWindow.registerClass('UMP.Services.UMWindow');
$window = new UMP.Services.UMWindow();
//

