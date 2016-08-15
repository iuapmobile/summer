
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
		c.eval(js, ctx, sender, args, uicontrols);
	}
}

UMP.UI.Mvc.Router.prototype = {
    route : UMP$UI$Mvc$Router$route,	
	eval : UMP$UI$Mvc$Router$eval
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
			$$__debug_ctx = args.json;
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
		js = js.trim();
		if(js.indexOf("this.")==0 && js.indexOf("(")>0 && js.indexOf(")")>js.indexOf("(") ){
			$$__debug_ctx = json;
			
			$document.uiMD(uiMD);//接受ui元数据
			
			//eval(js);//this.xxx()
			var funcName = js.substring(0, js.indexOf("("));
			var func = eval(funcName)
			func.apply(this, [sender, args]);
		}else{
			if($isFunction($__cbm[js])){
				//callback队列中是否存在
				var func = $__cbm[js];
				func.apply(this, [sender, args]);				
			}else{
				var funcName = js.substring(0, js.indexOf("("));
				if(this.evaljs){
					//this.evaljs(js);//xxx()
					var func = eval(funcName);
					func.apply(this, [sender, args]);					
				}else{
					var func = eval(funcName);
					func.apply(this, [sender, args]);				
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





