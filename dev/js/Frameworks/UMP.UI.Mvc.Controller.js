
//=================================================== UMP.UI.Mvc.Router =========================================================
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Router = function UMP$UI$Mvc$Router(){
	//_actionMapping决定调用顺序
}
var __debugger = true;
function UMP$UI$Mvc$Router$route(controllerBaseId, actionid, ctx){    
	var json = ctx;	
	if(typeof ctx =="string"){
	    json = $stringToJSON(ctx);
	}	
	var cBase = __$getInstance(controllerBaseId);
	cBase.execute(actionid, json);
}
function UMP$UI$Mvc$Router$eval(controllerid, js, ctx, sender, args, uicontrols){
	//if($isWeb && false){
	if(false){
		$__controller.eval(js, ctx, sender, args);
	}else{
		var c = __$getInstance(controllerid);
		if(c){
			c.eval(js, ctx, sender, args, uicontrols);
		}else{			
			alert(controllerid + "未能正确初始化加载，可能是由于语法错误导致未能正确加载\n建议启动调试进行排查，也可查看浏览器的控制台")
			return;
		}
	}
}
function UMP$UI$Mvc$Router$debug(controllerid, js, ctx, sender, args, custom){
	//if($isWeb && false){
	if(false){
		$__controller.eval(js, ctx, sender, args);
	}else{
		var c = __$getInstance(controllerid);
		if(c){
			if(!custom) alert("调试发生异常");
			custom["debug"] = "begin";//custom内已经含有id信息，用于标识该次执行JS的唯一标识
			$service.call("UMJS.debug",custom,true);//同步通知安卓原生调试开始
			
			c.eval(js, ctx, sender, args, {});
			
			custom["debug"] = "end";
			$service.call("UMJS.debug",custom,true);//同步通知安卓原生调试结束
		}else{			
			alert(controllerid + "未能正确初始化加载，可能是由于语法错误导致未能正确加载\n建议启动调试进行排查，也可查看浏览器的控制台")
			return;
		}
	}
}
UMP.UI.Mvc.Router.prototype = {
    route : UMP$UI$Mvc$Router$route,	
	eval : UMP$UI$Mvc$Router$eval,
	debug : UMP$UI$Mvc$Router$debug
};
UMP.UI.Mvc.Router.registerClass('UMP.UI.Mvc.Router');

if(typeof $router == "undefined")  {
	$router = new UMP.UI.Mvc.Router();
}
function $pageReady(){
	//$document.fireEvent("pageReady");
	$document.fireEvent("pageReady");
}

//================================== UMP.UI.Mvc.ControllerBase ==========================================================================
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.ControllerBase = function UMP$UI$Mvc$ControllerBase(args) {	
	//this._context = null;
	//this._entity = null;
	this._controller = null;
	
	if(args){
		var context = args["context"];
		var controller = args["controller"];
		var namespace = args["namespace"];
			
		
		var controllerFullName = eval(namespace + "." + controller);
		var cT = eval(controllerFullName);	
		if(cT){
			this._controller = __$getInstance(cT);
			if(cT.initializeBase){
				cT.initializeBase(this._controller);
			}
		}else{
			alert("please check the js file["+controllerFullName+".js], it probably has some syntax wrong.");        
		}
	}
}
function UMP$UI$Mvc$ControllerBase$execute(actionid, json){
	var action = eval("this." + actionid);
	try{
		//json = action.apply(this, [json]);//不使用apply，则this为window
		eval("this."+actionid+"(json)")
	}catch(e){
        if(e.stack){
            alert(e.stack);
        }else{
            alert(e.name + ":" + e.message);
        }
    }    
	return json;
}
function UMP$UI$Mvc$ControllerBase$execMethod(args){
	try{    	
        if(!args.method){
			alert("Action[" + args.actionid + "]不存在Method[" + args.method + "]");
		}
		if(this._controller){					
			if(this._controller.initialize)
				this._controller.initialize();
			
			//var method = eval("this._controller." + args.method);
			//method.apply(this._controller, [args.json]);//不使用apply，则this为window
			//$$__debug_ctx = args.json;
			$ctx._setUMContext4debug(args.json);//debug Context
			//$document.uiMD(uiMD);//debug UIControl MetaData
		
			this._controller.method(args.method, args);
		}		
    }catch(e){
        alert(e.stack);
    }    
}
UMP.UI.Mvc.ControllerBase.prototype = {
	execute : UMP$UI$Mvc$ControllerBase$execute,
	execMethod : UMP$UI$Mvc$ControllerBase$execMethod	
};
UMP.UI.Mvc.ControllerBase.registerClass('UMP.UI.Mvc.ControllerBase');







Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Controller = function UMP$UI$Mvc$Controller(args) {	
}
function UMP$UI$Mvc$Controller$method(methodName, args){
	try{
		var func = eval("this."+methodName);
		func.apply(this, [args]);
		//or
		//eval("this."+methodName+"()");
	}catch(e){
        alert(e.stack);
    }    
}
function UMP$UI$Mvc$Controller$eval(js, json, sender, args, uiMD){
	try{
		$ctx._setUMContext4debug(json);//debug Context
		$document.uiMD(uiMD);//debug UIControl MetaData
		
		js = js.trim();
		if(js.indexOf("this.")==0 && js.indexOf("(")>0 && js.indexOf(")")>js.indexOf("(") ){
			//this.xxx()
			var funcName = js.substring(0, js.indexOf("("));
			var func = eval(funcName)
			if(func){
				func.apply(this, [sender, args]);
			}else{
				var m = funcName.substring(5);
				alert("调用[" + this.__typeName + "]的[" + m + "]方法异常：\n请检查"+this.__typeName+".prototype中是否有" + m + "的定义");
			}	
		}else{
			//xxx()
			if($isFunction($__cbm[js])){
				//callback队列中是否存在
				var func = $__cbm[js];
				func.apply(this, [sender, args]);				
			}else{
				var funcName = js.substring(0, js.indexOf("("));
				if(false && this.evaljs){
					//this.evaljs(js);//xxx()
					var func = eval(funcName);
					func.apply(this, [sender, args]);					
				}else{
					try{
						var func = eval(funcName);
						if($isFunction(func)){
							func.apply(this, [sender, args]);		
						}else{
							$exception(e,"执行了一个未定义的方法["+funcName+"]，请检查该方法的定义，并且确保语法问题");
						}
					}catch(e){
						if(e){
							if(e.stack){
								alert(e.stack);
							}else{
								alert(e);
							}
						}else{
							alert("执行方法["+funcName+"]发生未知异常...")
						}
					}		
				}
			}			
		}
    }catch(e){
        alert(e.stack);
    }    
}
UMP.UI.Mvc.Controller.prototype = {	
	method: UMP$UI$Mvc$Controller$method,
	eval: UMP$UI$Mvc$Controller$eval	
};
UMP.UI.Mvc.Controller.registerClass('UMP.UI.Mvc.Controller');
$__controller = new UMP.UI.Mvc.Controller();
/*
//================================== UMP.UI.Mvc.Action ==========================================================================
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.Action = function UMP$UI$Mvc$Action(id, method, ctx) {
	this._id = id;
	this._method = method;
	this._ctx = ctx;
}
function UMP$UI$Mvc$Action$execute(func, ctx){	
	return func.apply(this, [func, ctx]);
}
function UMP$UI$Mvc$Action$method(func, ctx){	
	return func.apply(this, [func, ctx]);
}
UMP.UI.Mvc.Action.prototype = {
	execute: UMP$UI$Mvc$Action$execute,	
	method: UMP$UI$Mvc$Action$method	
};
UMP.UI.Mvc.Action.registerClass('UMP.UI.Mvc.Action');
*/





