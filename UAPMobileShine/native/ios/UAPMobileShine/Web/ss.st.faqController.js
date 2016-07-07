//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.faqController');
ss.st.faqController = function() {
    ss.st.faqController.initializeBase(this);
    this.initialize();
}
function ss$st$faqController$initialize(){
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
function ss$st$faqController$faqload(){
    //Your JavaScript below...
	$id("widget2").set("display","none");//设置更多隐藏
		
    var json={faqs:[]};
     
    for(var idx=0,len=4;idx<len;idx++){
    	var faq = {};
    	faq["id"]  = "faq"+idx;
    	faq["question"]  = "demo";
    	faq["answer"]  = "demo";
    	faq["answer2"]  = "demo";    	
    	json.faqs.push(faq);    	
    }
    
    var i = 0;
    json.faqs[i]["answer"] = "答：线条变细主要通过改变硬件结构实现。";
    json.faqs[i]["answer2"] = "如加小孔、换扩束镜和镜头、改善激光模式等。";    
    json.faqs[i++]["question"] = "如何让我的打标机线条更细？";
        
    json.faqs[i]["answer"] = "答：你可以尝试使用多级别校正或者高精度";
    json.faqs[i]["answer2"] = "校正来提高打标的精确。";    
    json.faqs[i++]["question"] = "我的CO2-L120XP精度不够怎么办？";
 
    json.faqs[i]["answer"] = "答：线条变细主要通过改变硬件结构实现。";
    json.faqs[i]["answer2"] = "如加小孔、换扩束镜和镜头、改善激光模式等。";    
    json.faqs[i++]["question"] = "如何让我的打标机线条更细？";
 
    json.faqs[i]["answer"] = "答：你可以尝试使用多级别校正或者高精度";
    json.faqs[i]["answer2"] = "校正来提高打标的精确。";    
    json.faqs[i++]["question"] = "我的CO2-L120XP精度不够怎么办？";
      
    $ctx.push(json);   
}
function showmore(){
	$id("widget2").set("display","block");
}
function hiddenmore(){
	$id("widget2").set("display","none");
}
ss.st.faqController.prototype = {
    initialize : ss$st$faqController$initialize,
    faqload : ss$st$faqController$faqload
};
ss.st.faqController.registerClass('ss.st.faqController',UMP.UI.Mvc.Controller);
