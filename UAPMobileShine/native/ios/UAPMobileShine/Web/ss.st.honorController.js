//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.honorController');
ss.st.honorController = function() {
    ss.st.honorController.initializeBase(this);
    this.initialize();
}
function ss$st$honorController$initialize(){
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
function ss$st$honorController$onload(){
    //Your JavaScript below...
	//$id("widget2").setAttribute("display","none");//设置更多隐藏
		
    var context = {"address":"北京市东城区珠市口大街0号","postcode":"100062","totalnum":"共8家","othercompany":"内蒙、福建、广东、吉林、辽宁、厦门、天津"};//var context = $ctx.get()
	$ctx.push(context);
}
function hiddenmore(){
	$id("widget2").set("display","none");
}
function showmore(){
	$id("widget2").set("display","block");
}

ss.st.honorController.prototype = {
    initialize : ss$st$honorController$initialize,
    onload : ss$st$honorController$onload
};
ss.st.honorController.registerClass('ss.st.honorController',UMP.UI.Mvc.Controller);
