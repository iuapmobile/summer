//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.usController');
ss.st.usController = function() {
    ss.st.usController.initializeBase(this);
    this.initialize();
}
function ss$st$usController$initialize(){
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

function ss$st$usController$jspageload(){
    //Your JavaScript below...
       var json={ugs:[]};
     
    for(var idx=0,len=9;idx<len;idx++){
    	var ug = {};
    	ug["ugid"]  = "ug"+idx;
    	ug["ugcontent"]  = "I like";
    	ug["uguser"]  = "jessca";
    	json.ugs.push(ug);    	
    }
    
    var i = 0;
    json.ugs[i]["uguser"] = "张三";
    json.ugs[i++]["ugcontent"] = "售后服务好，赞！！";
        
    json.ugs[i]["uguser"] = "李四";
    json.ugs[i++]["ugcontent"] = "有信誉，有保障，值得信赖！！";
 
    json.ugs[i]["uguser"] = "王五";
    json.ugs[i++]["ugcontent"] = "价格实惠，售后服务好!";
 
 	json.ugs[i]["uguser"] = "张三";
    json.ugs[i++]["ugcontent"] = "售后服务好，赞！！";
        
    json.ugs[i]["uguser"] = "李四";
    json.ugs[i++]["ugcontent"] = "有信誉，有保障，值得信赖！！";
 
    json.ugs[i]["uguser"] = "王五";
    json.ugs[i++]["ugcontent"] = "价格实惠，售后服务好!";
    
    json.ugs[i]["uguser"] = "张三";
    json.ugs[i++]["ugcontent"] = "售后服务好，赞！！";
        
    json.ugs[i]["uguser"] = "李四";
    json.ugs[i++]["ugcontent"] = "有信誉，有保障，值得信赖！！";
 
    json.ugs[i]["uguser"] = "王五";
    json.ugs[i++]["ugcontent"] = "价格实惠，售后服务好!"; 
      
    $ctx.push(json);
}
ss.st.usController.prototype = {
    initialize : ss$st$usController$initialize,
    jspageload : ss$st$usController$jspageload
};
ss.st.usController.registerClass('ss.st.usController',UMP.UI.Mvc.Controller);

function showmore(){
	$id("widget2").set("display", "block");
}
function hiddenmore(){
	$id("widget2").set("display", "none");
}
