//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.linkusController');
ss.st.linkusController = function() {
    ss.st.linkusController.initializeBase(this);
    this.initialize();
}
function ss$st$linkusController$initialize(){
    //you can programing by $ctx API
    //get the context data through $ctx.get()
    //set the context data through $ctx.push(json)
    //set the field of the context through $ctx.put(fieldName, fieldValue)
    //get the parameter of the context through $ctx.param(parameterName)
    //Demo Code:
    //    var str = $ctx.get();      //获取当前Context对应的字符串，可以直接alert($ctx.get())
    //    var json = $ctx.getJSONObject(); //获取当前Context，返回值为json
    //    json["x"] = "a";        //为当前json增加字段
    //    json["y"] = [];           //为当前json增加数组
    //    $ctx.push(json);            //设置context
    //    
    //    var x = $ctx.get("x");    //获取x字段值
    //    $ctx.put("x", "b");     //设置x字段值
    //    var p1 = $ctx.param("p1");   //获取参数p1的值
    
    //your initialize code below...
    
}
function ss$st$linkusController$viewPage0_onload(){
   
   
   /*
    <label id="label2">联系地址</label>
        <div id="panel5">
            <label id="label4">地址:北京市海淀区上地街道上地十街</label> 
        </div>
        <div id="panel6">
            <label id="label3">百度大厦</label>
            <image id="image1" scaletype="fitcenter" src="mappoint.png"/> 
        </div>
        <mapView id="mapview0" address=""/>
   */
    var animations = [{
			type:"translate",	//移动类型
			duration:"500",	//毫秒，默认1000
			fromX:"400",			//int类型，leftMargin的大小
			toX:"17",			//int类型，leftMargin的大小
			fromY:"0",			//int类型，topMargin的大小
			toY:"0",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
	},{
			type:"alpha",		//渐隐类型
			duration:1500,	//毫秒，默认1000
			fromAlpha:0.3,	//float类型，0-1，0为全透，1为完全不透
			toAlpha:1,		//float类型，0-1，0为全透，1为完全不透
			repeatCount:0		//int类型，重复的次数
	}];		
	$document.getElementById("label2").animate(animations);
	$document.getElementById("label2").setAttribute("text","联系地址");
	
	
	  var animations = [{
			type:"translate",	//移动类型
			duration:"700",	//毫秒，默认1000
			fromX:"400",			//int类型，leftMargin的大小
			toX:"0",			//int类型，leftMargin的大小
			fromY:"0",			//int类型，topMargin的大小
			toY:"0",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
	},{
			type:"alpha",		//渐隐类型
			duration:2000,	//毫秒，默认1000
			fromAlpha:0.3,	//float类型，0-1，0为全透，1为完全不透
			toAlpha:1,		//float类型，0-1，0为全透，1为完全不透
			repeatCount:0		//int类型，重复的次数
	}];	
	$document.getElementById("panel5").animate(animations);
	$document.getElementById("label4").setAttribute("text","地址：北京市海淀区北清路68号");
	
	
	
	 var animations = [{
			type:"translate",	//移动类型
			duration:"1000",	//毫秒，默认1000
			fromX:"400",			//int类型，leftMargin的大小
			toX:"0",			//int类型，leftMargin的大小
			fromY:"0",			//int类型，topMargin的大小
			toY:"0",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
	},{
			type:"alpha",		//渐隐类型
			duration:3000,	//毫秒，默认1000
			fromAlpha:0.3,	//float类型，0-1，0为全透，1为完全不透
			toAlpha:1,		//float类型，0-1，0为全透，1为完全不透
			repeatCount:0		//int类型，重复的次数
	}];	
	$document.getElementById("panel6").animate(animations);
	$document.getElementById("label3").setAttribute("text","用友软件园");
	
	//地图动画
	  var animations = [{
			type:"translate",	//移动类型
			duration:"1500",	//毫秒，默认1000
			fromX:"400",			//int类型，leftMargin的大小
			toX:"17",			//int类型，leftMargin的大小
			fromY:"0",			//int类型，topMargin的大小
			toY:"0",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
	},{
			type:"alpha",		//渐隐类型
			duration:2000,	//毫秒，默认1000
			fromAlpha:0,	//float类型，0-1，0为全透，1为完全不透
			toAlpha:1,		//float类型，0-1，0为全透，1为完全不透
			repeatCount:0		//int类型，重复的次数
	}];	
	$document.getElementById("mapview0").animate(animations);
}
ss.st.linkusController.prototype = {
    viewPage0_onload : ss$st$linkusController$viewPage0_onload,
    initialize : ss$st$linkusController$initialize
};
ss.st.linkusController.registerClass('ss.st.linkusController',UMP.UI.Mvc.Controller);

function showmore(){
	$id("widget2").set("display","block");
}
function hiddenmore(){
	$id("widget2").set("display","none");
}


