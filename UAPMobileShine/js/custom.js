$isWeb = true
$(function() {
	//alert("$ is ok")
	$pageReady();
});
			
function $pageReady() {
	//alert("$pageReady is executing");
	
	
	
	 var list1 = $("#list1");
     var contactsJson = {};
     var index = 0;
    list1.delegate("li","tap",function(){
        index = $(this).index();
		//alert("点击了"+index+"行");
        //$cache.write("curItem",JSON.stringify(contactsJson.list[index]));
		localStorage["curItem"] = JSON.stringify(contactsJson.list[index]);
		
       /* $.mobile.changePage("edit.html", {"transition": "slide"});*/
    });
    $(document).on("tap","#save",function(){
        var ifSave = $confirm("确定要保存吗?");
        if(ifSave){
			//alert(JSON.stringify(contactsJson));
            //$cache.write("contacts",JSON.stringify(contactsJson));
			localStorage["contacts"] = JSON.stringify(contactsJson);
        }
    });
    $(document).on("pagebeforeshow","#page4",function(){
	//debugger;
		//alert("pagebeforeshow")
        var contactsForm = $("#contactsForm");
        //var curItem = $cache.read("curItem")||"";
		var curItem = localStorage["curItem"];
		//alert("localStorage出来结果为" + curItem);
        var item;
        if(curItem){
            curItem = JSON.parse(curItem);
            for(item in curItem){
                //contactsForm.find("input[name="+ item + "]").attr("value",curItem[item]);
				contactsForm.find("input[name="+ item + "]").val(curItem[item]);
            }
        }
    });
    $(document).on("pagebeforehide","#page4",function(){
        var formData = $("form[id=contactsForm]").serializeArray();
        var name,value;
        var dealedData = {};
        for(var i = 0; i< formData.length; i++){
            name = formData[i]['name'];
            value = formData[i]['value'];
            dealedData[name] = value;
        }
        contactsJson.list[index] = dealedData;
        render(contactsJson.list);
    });

    display();
    function display(){
        var contactsList = {list:[
            {"name":"林彪","phone":"1111111","birth":"2013-04-25","experience":2},
            {"name":"周恩来","phone":"1111111","birth":"2013-04-25","experience":3},
            {"name":"宋庆龄","phone":"1111111","birth":"2013-04-25","experience":5},
            {"name":"蒋介石","phone":"1111111","birth":"2013-04-25","experience":7}
        ]};

        //var contacts = $cache.read("contacts");
		var contacts = localStorage["contacts"];
        if(contacts){
            contactsJson = JSON.parse(contacts);

        } else {
            //$cache.write("contacts",JSON.stringify(contactsList));
			localStorage["contacts"] = JSON.stringify(contactsList);
            contactsJson = contactsList || {};
        }
        render(contactsJson.list);
    }

    function render(list){
        var i;
        var len = Array.isArray(list) && list.length;
        var fragment = document.createDocumentFragment();
        if (len) {
            for (i = 0; i < len; i++) {
                li = document.createElement('li');
                li.innerHTML = '<a href="#page4" data-transition="slide"><img src="css/uap-blue-icons/btn_fav_touch.png" alt=""><h3>' + list[i].name + '</h3><p>' + list[i].phone + '</p></a>';
                fragment.appendChild(li);
            }
            list1.html(fragment).listview("refresh");
        }
    }
}
