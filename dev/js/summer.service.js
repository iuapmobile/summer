//summer native service v3.0.2016092011
+function(w,s){
	w.$__cbm = [];
	if(!s){
		s = {};
		w.summer = s;
	}
	//----------------------------------------------------------------------
	s.service = {
		call:function(serviceType, jsonArgs, isSync){
			try{
				jsonArgs = jsonArgs || {};
				var serviceparams = "";
				if(typeof jsonArgs == "string"){
					var json = $summer.strToJson(jsonArgs);
					if(typeof json == "string"){
						//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
						alert("调用服务[" + serviceType + "]时参数不是一个有效的json字符串。参数是" + jsonArgs);
						return;	
					}
					serviceparams = $summer.jsonToStr(json);
					if(typeof serviceparams == "object"){
						//转json后仍然为string，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
						alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式。参数是" + jsonArgs);
						return;	
					}			
				}else if(typeof jsonArgs == "object"){
					if(jsonArgs["callback"] && $summer.isFunction(jsonArgs["callback"]) && !jsonArgs["__keepCallback"]){
						//1、 callback:function(){}
						var newCallBackScript = "fun" + $summer.UUID(8, 16) + "()";//anonymous method
						while($__cbm[newCallBackScript]){
							newCallBackScript =  "fun" + $summer.UUID(8, 16) + "()";//anonymous method
						}
						$__cbm[newCallBackScript] = jsonArgs["callback"];//callback can be global or local, so define a reference function in $__cbm
						
						//
						window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
							try{
								//alert(typeof sender);
								//alert(typeof args);
								//$alert(sender);
								//$alert(args);
								if(args == undefined)
									args = sender;
								var _func = $__cbm[newCallBackScript];
								_func(sender, args);	
							}catch(e){
								alert(e);
							}finally{
								delete $__cbm[newCallBackScript];
								delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
								//alert("del ok");
								//alert(typeof $__cbm[newCallBackScript]);
								//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
							}				
						}
						jsonArgs["callback"] = newCallBackScript;				
					}else if(jsonArgs["callback"] && typeof(jsonArgs["callback"]) == "string" && !jsonArgs["__keepCallback"]){
						//2、 callback:"mycallback()"
						var cbName = jsonArgs["callback"].substring(0, jsonArgs["callback"].indexOf("("));
						var callbackFn = eval(cbName);
						if(typeof callbackFn != "function"){
							alert(cbName + " is not a global function, callback function must be a global function!");
							return;
						}
						
						var newCallBackScript = "fun" + $summer.UUID(8, 16) + "()";//anonymous method
						while(window[newCallBackScript]){
							newCallBackScript =  "fun" + $summer.UUID(8, 16) + "()";//anonymous method
						}
						//
						window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))] = function (sender, args){
							try{
								//alert(typeof sender);
								//alert(typeof args);
								//$alert(sender);
								//$alert(args);
								if(args == undefined)
									args = sender;
								callbackFn(sender, args);	
							}catch(e){
								alert(e);
							}finally{
								delete window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))];
								//alert("del ok");
								//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
							}				
						}
						jsonArgs["callback"] = newCallBackScript;
					}
					
					this.callBackProxy(jsonArgs , "error");
				
					serviceparams = $summer.jsonToStr(jsonArgs);
					if(typeof serviceparams == "object"){
						//转string后仍然为json，则报错，规定：调用服务的参数如果是字符串，必须是能转为json的字符串才行
						alert("调用服务[" + serviceType + "]时传递的参数不能标准化为json字符串，请检查参数格式" + jsonArgs);
						return;	
					}
				}else{
					alert("调用$service.call("+serviceType+", jsonArgs, "+isSync+")时不合法,参数jsonArgs类型为"+typeof jsonArgs);
					return;
				}
					
				if(isSync){
					return adrinvoker.call2(serviceType,serviceparams);//call2是同步调用
				}else{
					//默认异步执行
					return adrinvoker.call(serviceType,serviceparams);//call是异步调用 默认异步
				}
			}catch(e){
				var info="";
				if(isSync)	
					info = "调用$service.call(\""+serviceType+"\", jsonArgs, "+isSync+")时发生异常,请检查!";
				else
					info = "调用$service.call(\""+serviceType+"\", jsonArgs)时发生异常,请检查!";
				console.log(info);
				alert(info+", 更多请查看console日志;\n错误堆栈信息为:\n" + e.stack);
			}
		},
		callBackProxy : function(jsonArgs, callback_KEY){
			if(jsonArgs[callback_KEY] && typeof(jsonArgs[callback_KEY])=="function"){
				// callback:function(){}
				var newCallBackFnName = callback_KEY + $summer.UUID(8, 16);//anonymous method
				while($__cbm[newCallBackFnName]){
					newCallBackFnName =  callback_KEY + $summer.UUID(8, 16);//anonymous method
				}
				$__cbm[newCallBackFnName] = jsonArgs[callback_KEY];//callback can be global or local, so define a reference function in $__cbm
				
				//
				window[newCallBackFnName] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						var _func = jsonArgs[callback_KEY];
						_func(sender, args);	
					}catch(e){
						alert(e);
					}finally{
						delete $__cbm[newCallBackFnName];
						delete window[newCallBackFnName];
						//alert("del ok"); 
						//alert(typeof $__cbm[newCallBackScript]);
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}				
				}
				jsonArgs[callback_KEY] = newCallBackFnName + "()";				
			}else if(jsonArgs[callback_KEY] && typeof(jsonArgs[callback_KEY]) == "string"){
				// callback:"mycallback()"
				var cbName = jsonArgs[callback_KEY].substring(0, jsonArgs[callback_KEY].indexOf("("));
				var callbackFn = eval(cbName);
				if(typeof callbackFn != "function"){
					alert(cbName + " is not a global function, callback function must be a global function!");
					return;
				}
				
				var newCallBackFnName = callback_KEY + $summer.UUID(8, 16);//anonymous method
				while(window[newCallBackFnName]){
					newCallBackFnName =  callback_KEY + $summer.UUID(8, 16);//anonymous method
				}
				//
				window[newCallBackFnName] = function (sender, args){
					try{
						//alert(typeof sender);
						//alert(typeof args);
						//$alert(sender);
						//$alert(args);
						if(args == undefined)
							args = sender;
						callbackFn(sender, args);	
					}catch(e){
						alert(e);
					}finally{
						delete window[newCallBackFnName];
						//alert("del ok");
						//alert(typeof window[newCallBackScript.substring(0,newCallBackScript.indexOf("("))]);
					}				
				}
				jsonArgs[callback_KEY] = newCallBackFnName + "()";
			}
		},        
		callAction : function(controllerName, actionName, params, isDataCollect, callbackActionID, contextmapping, customArgs){
			if(arguments.length == 1 && typeof arguments[0] == "object"){
				var args = {};
				/*
				args  = {
					viewid:"xxx.xxx.xx",
					action:"methodName",
					params:{a:1,b:2},
					//isDataCollect:true,
					autoDataBinding:true,//请求回来会是否进行数据绑定
					contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
					callback:"actionid",			
					error:"errorActionId"//失败回调的ActionId			
				}
				*/
				args = controllerName;
				var sysParam = {
					viewid:"xxx.xxx.xx",
					action:"methodName",
					//"params" : {a:1,b:2},//自定义参数
					//isDataCollect:true,
					autoDataBinding:true,//请求回来会是否进行数据绑定
					contextmapping:"fieldPath",//将返回结果映射到指定的Context字段上，默认为替换整个Context
					callback:"actionid",			
					error:"errorActionId"//失败回调的ActionId			
				};
				for(key in args){
					if(!sysParam.hasOwnProperty(key) && typeof args[key] == "string"){
						args[key] = $summer.strToJson(args[key]);
					}
				}
				return s.callService("UMService.callAction", args, false);
			}else{
				var args = {};
				args["viewid"] = controllerName;
				args["action"] = actionName;
				args["params"] = params;
				args["isDataCollect"] = isDataCollect;
				args["callback"] = callbackActionID;
				args["contextmapping"] = contextmapping;
				if(customArgs){//处理自定义参数，用于该服务的参数扩展
					for(key in customArgs){
						args[key] = customArgs[key];
					}
				}
				//$service.call("UMService.callAction","{callback:'myback', contextmapping:'data'，viewid:'"+controllerName+"',isDataCollect:'false',params:{demo:'demo'},action:'needPwd'}");
				return s.callService("UMService.callAction", args);
			}
		}
	};//s.service end
	s.callService = s.service.call;
	s.callAction = s.service.callAction;
	
	///////////////////////////////////////////////////////////////////////////////////////////
	//summser.UMDevie.writeFile()
	//summer.camera.open() --->summer.openCamera()
	s.UMDevice = {
		writeFile : function(filePath, content){
			var args = {};
			if(filePath)
				args["path"] = filePath;
			if(content)
				args["content"] = content;
			return s.callService("UMFile.write", args, false);
		},
		readFile : function(filePath){
			var strContent = ""; 
			var args ={};
			if(filePath)
				args["path"] = filePath;
			strContent = s.callService("UMFile.read", args, true);	
			
			//苹果安卓统一返回处理结果
			if(strContent && strContent != ""){
				try{
					/*  取出缓存的值不再强行转化为json，按照绝大多数平台通常的处理方式，缓存取出来后必要时需自行类型转化
					obj = $stringToJSON(strContent);
					return obj;
					*/
					return strContent;
				}catch(e){
					return strContent;
				}
			}else{
				return null;
			}
		},
		openCamera : function(args){
			if($summer.checkIfExist(args, ["callback","compressionRatio"]))
				return s.callService("UMDevice.openCamera", args, false);
		},
		getTimeZoneID : function(){
			return	s.callService("UMDevice.getTimeZoneID", "", true);
		} ,
		getTimeZoneDisplayName : function(){
			return	s.callService("UMDevice.getTimeZoneDisplayName", {}, true); //无参调用统一使用{}
		},
		getLocation : function(json){
			var args = {};
			if(arguments.length == 1 && $summer.isJSONObject(arguments[0])){
				args = json;
			}else{
			    alert("调用capturePhoto服务时，参数不是一个有效的JSONObject");
				return;
			}
			var result = s.callService("UMDevice.getLocation", args);
			var returnVal = "";
			if(typeof result == "string"){
			    returnVal = "状态为"+result+", 可以通过callback获取返回值";
			}
			return returnVal;
		}
		
	};
	s.UMFile = {
		remove : function(args){
			return s.callService("UMFile.remove", args, false);//默认异步
		},
		exists : function(args){
			return s.callService("UMFile.exists", args, true);
		},
		download : function(jsonArgs){
			if($summer.isEmpty(jsonArgs.url)){
				alert("参数url不能为空");
			}
			if($summer.isEmpty(jsonArgs.filename)){
				alert("参数filename不能为空");
			}
			if($summer.isEmpty(jsonArgs.locate)){
				alert("参数locate不能为空");
			}
			if($summer.isEmpty(jsonArgs.override)){
				alert("参数override不能为空");
			}
			if($summer.isEmpty(jsonArgs.callback)){
				alert("参数callback不能为空 ");
			}
			jsonArgs["__keepCallback"] = true;
			return s.callService("UMFile.download", jsonArgs);//默认异步
		},
		open : function(args){
			if(!$summer.isJSONObject(args)){
				alert("调用$file.open方法时，参数不是一个有效的JSONObject");
			}
			return s.callService("UMDevice.openFile", args, false);//调用的是UMDevice的方法
		},
		getFileInfo : function(args){
			var json = args;
			if(typeof args == "string"){
				json = {"path" : args};
			}
			return s.callService("UMFile.getFileInfo",json, true);
		}

	};
	s.writeFile = s.UMDevice.writeFile;
	s.readFile = s.UMDevice.readFile;
	s.openCamera = s.UMDevice.openCamera;
	s.getTimeZoneID = s.UMDevice.getTimeZoneID;
	s.getTimeZoneDisplayName = s.UMDevice.getTimeZoneDisplayName;
	s.getLocation=s.UMDevice.getLocation;

}(window,summer);
