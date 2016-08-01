
//
Type.registerNamespace('UMP.UI.Container');
UMP.UI.Container.UMAnimation=function(){	

}

function UMP$UI$Container$UMAnimation$animate(id, settings, callback){
	/*
	var args=  {
		id:"widget2",
		animations : [{
			type:"scale",		
			duration:2000,
			fromWidth:-1,			
			toWidth:-1,
			fromHeight:0,			
			toHeight:201,			
			pivotX:0,
			pivotY:0
		}]
	}
	*/
	if($isJSONObject(id)){
		$service.call("UMJS.animation", id, false);	
	}else{
		var args = {	
			id : id
		};
		if($isJSONArray(settings)){
			args["animations"] = settings;
		} else if($isJSONObject(settings)){
			var list = [];
			list.push(settings);
			args["animations"] = list;
		} else {
			alert("调用 animate 方法时，第二个参数settings不是一个有效的JSONArray对象");
		}
		if(callback)
			args["callback"] = callback;
		$service.call("UMJS.animation", args, false);
	}

}
function UMP$UI$Container$UMAnimation$show(){
}
function UMP$UI$Container$UMAnimation$hidden(){
}
UMP.UI.Container.UMAnimation.prototype ={
	show : UMP$UI$Container$UMAnimation$show,
	hidden : UMP$UI$Container$UMAnimation$hidden,
	animate : UMP$UI$Container$UMAnimation$animate
}
UMP.UI.Container.UMAnimation.registerClass('UMP.UI.Container.UMAnimation');
$anim = new UMP.UI.Container.UMAnimation();