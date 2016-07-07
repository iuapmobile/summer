//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.mainController');
ss.st.mainController = function() {
    ss.st.mainController.initializeBase(this);
    this.initialize();
}
function ss$st$mainController$initialize(){
    //you can programing by $ctx API
    //get the context data through $ctx.get()
    //set the context data through $ctx.push(json)
    //set the field of the context through $ctx.put(fieldName, fieldValue)
    //get the parameter of the context through $ctx.param(parameterName)
    //Demo Code:
    //    var str = $ctx.getString();      //获取当前Context对应的字符串
    //    alert($ctx.getString())          //alert当前Context对应的字符串
    //    var json = $ctx.getJSONObject(); //获取当前Context，返回值为json
    //    json["x"] = "a";        //为当前json增加字段
    //    json["y"] = [];           //为当前json增加数组
    //    $ctx.push(json);            //设置context，并自动调用数据绑定
    //    
    //    put方法需手动调用databind()
    //    var x = $ctx.get("x");    //获取x字段值
    //    $ctx.put("x", "b");     //设置x字段值
    //    $ctx.put("x", "b");     //设置x字段值
    //    $ctx.databind();            //调用数据绑定才能将修改的字段绑定到控件上
    //    var p1 = $param.getString("p1");   //获取参数p2的值，返回一个字符串
    //    var p2 = $param.getJSONObject("p2");   //获取参数p3的值，返回一个JSON对象
    //    var p3 = $param.getJSONArray("p3");   //获取参数p1的值，返回一个数组
    
    //your initialize code below...
    
}
function ss$st$mainController$myonload(){
    //Your JavaScript below...
    //$id("widget2").setAttribute("display","none");//设置更多隐藏

    var json = {
		products:[
			{id:"1001", url:"timg1.jpg",name:"热敏打印机", description:"产品参数          ", price: "2万/台"},
			{id:"1002", url:"timg2.jpg",name:"太阳能行业切割机", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台"},
			{id:"1003", url:"timg3.jpg",name:"脉冲激光点焊机", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台"},
			{id:"1004", url:"timg4.jpg",name:"龙门系列切割机", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台"},
			{id:"1005", url:"timg5.jpg",name:"激光内雕刻机", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台"}
		]
	}
	
	$ctx.push(json);
}
function ss$st$mainController$opendetail(){
	
	var args = {
		viewid:"ss.st.ProductDetail",
		myrow:"#{ctl.listview0.row}",
		isKeep:"false",
		srcViewId:"ss.st.Main"
	}
	//$service.call("UMView.open",args);
	$view.open(args);
}
function showmore(){
	$document.getElementById("widget2").setAttribute("display","block");
	var animations = [{
			type:"scale",		
			duration:700,	
			fromWidth:"fill",			
			toWidth:"fill",
			fromHeight:"0",			
			toHeight:"68",			
			pivotX:"0",
			pivotY:"0"
	}];
    $document.getElementById("widget2").animate(animations)



	$document.getElementById("widget1_button5").setAttribute("display","none");
	$document.getElementById("widget1_button11").setAttribute("display","block");
	var animations =  [{
			type:"translate",	//移动类型
			duration:"700",	//毫秒，默认1000
			fromX:"0",			//int类型，leftMargin的大小
			toX:"0",			//int类型，leftMargin的大小
			fromY:"0",			//int类型，topMargin的大小
			toY:"30",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
		},{
			type:"translate",	//移动类型
			duration:"700",	//毫秒，默认1000
			fromX:"0",			//int类型，leftMargin的大小
			toX:"0",			//int类型，leftMargin的大小
			fromY:"30",			//int类型，topMargin的大小
			toY:"0",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
		}];		
	$document.getElementById("widget1_button5").animate(animations);
	$document.getElementById("widget1_button11").animate(animations)
}
function hiddenmore(){
	$id("widget2").set("display","none");
	var animations =  [{
			type:"scale",		
			duration:"700",	
			fromWidth:"fill",			
			toWidth:"fill",
			fromHeight:"68",			
			toHeight:"0",			
			pivotX:"0",
			pivotY:"0"
	}];		
	$document.getElementById("widget2").animate(animations)



	$id("widget1_button5").set("display","block");
	$id("widget1_button11").set("display","none");
    var animations =  [{
			type:"translate",	//移动类型
			duration:"700",	//毫秒，默认1000
			fromX:"0",			//int类型，leftMargin的大小
			toX:"0",			//int类型，leftMargin的大小
			fromY:"0",			//int类型，topMargin的大小
			toY:"30",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
		},{
			type:"translate",	//移动类型
			duration:"700",	//毫秒，默认1000
			fromX:"0",			//int类型，leftMargin的大小
			toX:"0",			//int类型，leftMargin的大小
			fromY:"30",			//int类型，topMargin的大小
			toY:"0",			//int类型，topMargin的大小
			repeatCount:"0"		//int类型，重复的次数
		}];		
	$document.getElementById("widget1_button5").animate(animations);
	$document.getElementById("widget1_button11").animate(animations)
}
ss.st.mainController.prototype = {
    initialize : ss$st$mainController$initialize,
    myonload : ss$st$mainController$myonload,
    opendetail : ss$st$mainController$opendetail
};
ss.st.mainController.registerClass('ss.st.mainController',UMP.UI.Mvc.Controller);
