//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.productDetailController');
ss.st.productDetailController = function() {
    ss.st.productDetailController.initializeBase(this);
    this.initialize();
}
function ss$st$productDetailController$initialize(){
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

function ss$st$productDetailController$myonload(){
    //Your JavaScript below...
    //初始化演示数据
    var datasource = {
		products:[
			{id:"1001", url:"timg_1.jpg",name:"热敏打印机", ptype:"RMJ-P100", advantage:"寿命长、易保养", description:"产品参数          ", price: "2万/台", discount:"11月实行9折优惠"},
			{id:"1002", url:"timg_2.jpg",name:"太阳能行业切割机", ptype:"KIL-E200", advantage:"寿命长、易保养", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台", discount:"11月实行9折优惠"},
			{id:"1003", url:"timg_3.jpg",name:"脉冲激光点焊机", ptype:"YAR-W100", advantage:"噪音小", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台", discount:"11月实行9折优惠"},
			{id:"1004", url:"timg_4.jpg",name:"龙门系列切割机", ptype:"BRT-GF12", advantage:"实用实用", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台", discount:"11月实行9折优惠"},
			{id:"1005", url:"timg_5.jpg",name:"激光内雕刻机", ptype:"FDE-YJK09", advantage:"噪音小", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台", discount:"11月实行9折优惠"},
			{id:"1006", url:"timg_1.jpg",name:"热敏打印机", ptype:"RMJ-P100", advantage:"寿命长、易保养", description:"产品参数          ", price: "2万/台", discount:"11月实行9折优惠"},
			{id:"1007", url:"timg_2.jpg",name:"太阳能行业切割机", ptype:"KIL-E200", advantage:"寿命长、易保养", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台", discount:"11月实行9折优惠"},
			{id:"1008", url:"timg_3.jpg",name:"脉冲激光点焊机", ptype:"YAR-W100", advantage:"噪音小", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台", discount:"11月实行9折优惠"},
			{id:"1009", url:"timg_4.jpg",name:"龙门系列切割机", ptype:"BRT-GF12", advantage:"实用实用", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台", discount:"11月实行9折优惠"},
			{id:"1010", url:"timg_5.jpg",name:"激光内雕刻机", ptype:"FDE-YJK09", advantage:"噪音小", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台", discount:"11月实行9折优惠"},
			{id:"1011", url:"timg_1.jpg",name:"热敏打印机", ptype:"RMJ-P100", advantage:"寿命长、易保养", description:"产品参数          ", price: "2万/台", discount:"11月实行9折优惠"},
			{id:"1012", url:"timg_2.jpg",name:"太阳能行业切割机", ptype:"KIL-E200", advantage:"寿命长、易保养", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台", discount:"11月实行9折优惠"},
			{id:"1013", url:"timg_3.jpg",name:"脉冲激光点焊机", ptype:"YAR-W100", advantage:"噪音小", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台", discount:"11月实行9折优惠"},
			{id:"1014", url:"timg_4.jpg",name:"龙门系列切割机", ptype:"BRT-GF12", advantage:"实用实用", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台", discount:"11月实行9折优惠"},
			{id:"1015", url:"timg_5.jpg",name:"激光内雕刻机", ptype:"FDE-YJK09", advantage:"噪音小", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台", discount:"11月实行9折优惠"},
			{id:"1016", url:"timg_1.jpg",name:"热敏打印机", ptype:"RMJ-P100", advantage:"寿命长、易保养", description:"产品参数          ", price: "2万/台", discount:"11月实行9折优惠"},
			{id:"1017", url:"timg_2.jpg",name:"太阳能行业切割机", ptype:"KIL-E200", advantage:"寿命长、易保养", description:"型号：KIL-E200  优点：寿命长、易保养 ", price: "4万/台", discount:"11月实行9折优惠"},
			{id:"1018", url:"timg_3.jpg",name:"脉冲激光点焊机", ptype:"YAR-W100", advantage:"噪音小", description:"型号：YAR-W100  优点：噪音小 ", price: "5万/台", discount:"11月实行9折优惠"},
			{id:"1019", url:"timg_4.jpg",name:"龙门系列切割机", ptype:"BRT-GF12", advantage:"实用实用", description:"型号：BRT-GF12  优点：实用实用 ", price: "3万/台", discount:"11月实行9折优惠"},
			{id:"1020", url:"timg_5.jpg",name:"激光内雕刻机", ptype:"FDE-YJK09", advantage:"噪音小", description:"型号：FDE-YJK09  优点：噪音小", price: "1万/台", discount:"11月实行9折优惠"}
			
		]
	}

	//取当前Context的数据
	myrow = $param.getJSONObject("myrow");
    
    //在演示数据中查找到参数传递过来的记录行
    for(var i=0,len=datasource.products.length;i<len;i++){
    	var row = datasource.products[i];
    	if(row.id == myrow.id){
    		$ctx.put("id",row.id);//id
    		$ctx.put("pname",row.name);//名称
    		$ctx.put("purl",row.url);//图片
    		$ctx.put("ptype",row.ptype);//型号
    		$ctx.put("advantage",row.advantage);//优势
    		$ctx.put("price",row.price);//价格
    		$ctx.put("discount",row.discount);//折扣
   			break;
    	}    	
    }

	//都用数据绑定
    $ctx.databind();
}
function ss$st$productDetailController$back(){
    //Your JavaScript below...
    //var src = $ctx.param("srcViewId");//出错？？？？？？？？？？？？？？？讨论大小写
     
    //var src = $ctx.param("srcviewid");//正确
    var src = $param.getString("srcViewId");
    if(!src){
    	alert("没有指定原页面，请检查");
    	return;
    }
	$view.open({
		viewid:src,	
		isKeep:"false"
	});
}
ss.st.productDetailController.prototype = {
    initialize : ss$st$productDetailController$initialize,
    myonload : ss$st$productDetailController$myonload,
    back : ss$st$productDetailController$back
};
ss.st.productDetailController.registerClass('ss.st.productDetailController',UMP.UI.Mvc.Controller);
