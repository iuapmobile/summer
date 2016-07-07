//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.companyIntroductionController');
ss.st.companyIntroductionController = function() {
    ss.st.companyIntroductionController.initializeBase(this);
    this.initialize();
}
function ss$st$companyIntroductionController$initialize(){
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
function ss$st$companyIntroductionController$onload(){
    //Your JavaScript below...
	$id("widget2").set("display","none");//设置更多隐藏
	
    var json = {
    	info:"某某年某某激光崛起于改革开放的前沿-某某市！这里良好的创业环境使某某一步一步走向成功，并成为中国激光装备行业的领军企业作为世界知名的激​光加工设备生产厂商，公司已成为**市高新技术企业，**市重点软件企业。",
    	linkAddress:"百度大厦",
    	address:"北京市海淀区上地街道上地十街"
    }
    
    $ctx.push(json);
}

function hiddenmore(){
	$id("widget2").set("display","none");
}
function showmore(){
	$id("widget2").set("display","block");
}
ss.st.companyIntroductionController.prototype = {
    initialize : ss$st$companyIntroductionController$initialize,
    onload : ss$st$companyIntroductionController$onload
};
ss.st.companyIntroductionController.registerClass('ss.st.companyIntroductionController',UMP.UI.Mvc.Controller);
