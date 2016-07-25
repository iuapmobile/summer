
function openWin(obj){

	var aa=obj;
	alert(aa);
	var time=getNowFormatDate();
	console.log(time)
	var time1="2016-07-01 11:47:42";
	var time2="浙AE398T";
	var t=encodeURI(time2);
	console.log(time)
	var md5str = hex_md5("57f320c6-edd0-4bfe-8910-63b2dfd331d8appkeyfeb0698c-8b26-49bb-8e69-c3ba2a462e59formatjsonisoffsetlonlat1methodGetVehcileInfosessionidtimestamp2016-07-02 14:55:42vehicle浙AE398T57f320c6-edd0-4bfe-8910-63b2dfd331d8");
	var si = md5str.toUpperCase();
//	alert(typeof si);
	console.log(si)
	si = Number(si);
    var Obj = {
    
    	vehicle : "浙AE398T"

    };
	ajaxRequest("APiV3CallService/VehicleInfo", "get",  Obj, function(data){
		var da=data;
		alert($summer.jsonToStr(da.result.data));
     //   callBack(data);
		//	var da=data;
			var lat=da.result.data[0].Lat;
			var lon=da.result.data[0].Lon;
			var pla=da.result.data[0].PlaceName;
			var roa=da.result.data[0].RoadName;

			localStorage.setItem("la",lat);
			localStorage.setItem("lo",lon);
			localStorage.setItem("pl",pla);
			localStorage.setItem("ro",roa);
			
			summer.openWin({
				id:'follow',
				url:'html/follow.html',
				pageParam:{
					lat:lat,
					lon:lon
					}
			});		
			
	});	
}

/*function abcde(bodyParam){
	alert("ttttttttt");
	$.ajax({
		type : "get",
		url :"http://api.e6gps.com/public/v3/Inface/Call" ,
//				"?method=GetVehcileInfo&appkey=feb0698c-8b26-49bb-8e69-c3ba2a462e59&timestamp=2016-07-02 14:55:42&format=json&vehicle=%E6%B5%99AE398T&sessionid=&isoffsetlonlat=1&sign=52589555CB12A9C5854259DAE4D4D0D5",
		data:bodyParam,
		dataType:"jsonp",
		jsonp:"callBack",
//		jsonpClassback:'he',
		success:function(data){
//			alert($summer.jsonToStr(data));
//	        callBack(data);
	       
		},
		beforeSend:function(){}
		error:function(data){
			
			alert('error:'+$summer.jsonToStr(data));
		}
	});
}
*/
	
	
	