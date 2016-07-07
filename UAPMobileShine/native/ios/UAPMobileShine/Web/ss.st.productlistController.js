//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.productlistController');
ss.st.productlistController = function() {
    ss.st.productlistController.initializeBase(this);
    this.initialize();
}
function ss$st$productlistController$initialize(){
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
function ss$st$productlistController$opendetail(){
    //Your JavaScript below...
	$view.open({
		viewid:"ss.st.ProductDetail",
		myrow:"#{ctl.listview0.row}",
		isKeep:"false",
		srcViewId:"ss.st.Productlist"
	});
}
function ss$st$productlistController$myonload(){
    //Your JavaScript below...
    
    $id("widget2").set("display", "none");//设置更多隐藏

    var json = {
		products:[
			{id:"1001", url:"timg1.jpg",name:"热敏打印机", description:"产品参数          ", price: "2万/台"},
			{id:"1002", url:"timg2.jpg",name:"太阳能行业切割机", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台"},
			{id:"1003", url:"timg3.jpg",name:"脉冲激光点焊机", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台"},
			{id:"1004", url:"timg4.jpg",name:"龙门系列切割机", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台"},
			{id:"1005", url:"timg5.jpg",name:"激光内雕刻机", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台"},
			{id:"1006", url:"timg1.jpg",name:"热敏打印机", description:"产品参数          ", price: "2万/台"},
			{id:"1007", url:"timg2.jpg",name:"太阳能行业切割机", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台"},
			{id:"1008", url:"timg3.jpg",name:"脉冲激光点焊机", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台"},
			{id:"1009", url:"timg4.jpg",name:"龙门系列切割机", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台"},
			{id:"1010", url:"timg5.jpg",name:"激光内雕刻机", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台"},
			{id:"1011", url:"timg1.jpg",name:"热敏打印机", description:"产品参数          ", price: "2万/台"},
			{id:"1012", url:"timg2.jpg",name:"太阳能行业切割机", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台"},
			{id:"1013", url:"timg3.jpg",name:"脉冲激光点焊机", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台"},
			{id:"1014", url:"timg4.jpg",name:"龙门系列切割机", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台"},
			{id:"1015", url:"timg5.jpg",name:"激光内雕刻机", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台"},
			{id:"1016", url:"timg1.jpg",name:"热敏打印机", description:"产品参数          ", price: "2万/台"},
			{id:"1017", url:"timg2.jpg",name:"太阳能行业切割机", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台"},
			{id:"1018", url:"timg3.jpg",name:"脉冲激光点焊机", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台"},
			{id:"1019", url:"timg4.jpg",name:"龙门系列切割机", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台"},
			{id:"1020", url:"timg5.jpg",name:"激光内雕刻机", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台"}
		]
	}
	
	$ctx.push(json);
}
function showmore(){
	$id("widget2").set("display", "block");
}
function hiddenmore(){
	$id("widget2").set("display", "none");
}
ss.st.productlistController.prototype = {
    initialize : ss$st$productlistController$initialize,
    opendetail : ss$st$productlistController$opendetail,
    myonload : ss$st$productlistController$myonload,
};
ss.st.productlistController.registerClass('ss.st.productlistController',UMP.UI.Mvc.Controller);
