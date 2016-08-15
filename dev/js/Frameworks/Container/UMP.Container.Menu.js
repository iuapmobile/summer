
//---------------------------------------------------------------------------------------------- $menu
UMP.Services.Menu = function UMP$Services$Menu(){
}
function UMP$Services$Menu$openDropDownList(args){
	/*
	var args = {
        controlid:"button1",
        dropDownListWidth:"200",
        dropItemsArray:[{
            name:"menu1",
            action:"menu1action()"
        },{
            name:"menu2",
            action:"menu2action()"
        },{
            name:"menu3",
            action:"menu3action()"
        }]
    }
	*/
	if(!$isJSONObject(args)){
		alert("调用$menu.openDropDownList()时的参数不是一个有效的JSONObject!");
	}
	$service.call("UMMenu.openDropDownList", args);

}
UMP.Services.Menu.prototype = {
	openDropDownList  : UMP$Services$Menu$openDropDownList 
};
UMP.Services.Menu.registerClass('UMP.Services.Menu');
$menu = new UMP.Services.Menu();
