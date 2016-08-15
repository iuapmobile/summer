var option = {
	legend : {
		x : 'center',y : 'bottom',itemGap : 15,
		textStyle : {
			color : 'auto',fontSize : 12
		},
		selected : {
			"新增用户" : true,"活跃用户" : true,"新增企业" : false,"活跃企业" : false,"通话次数" : false,"通话时间" : false
		},
		data : ["新增用户", "活跃用户", "新增企业", "", "活跃企业", "通话次数", "通话时间"]
	},
	xAxis : [{
		type : 'category',boundaryGap : true,
		axisLine : {
			lineStyle : {
				width : 2
			}
		},
		axisLabel : {
			interval : 'auto',rotate : -45,clickable : true,
			textStyle : {color : '#767676'}
		},
		axisTick : {
			interval : 'auto',onGap : false
		},
		splitLine : {
			show : true,onGap : false,
			lineStyle : {type : 'dashed'}
		},
		data : []
	}],
	yAxis : [{
		type : 'value',
		axisLine : {
			lineStyle : {width : 2}
		},
		axisLabel : {
			textStyle : {color : '#3F3F3F'}
		},
		splitLine : {
			show : true,onGap : false,
			lineStyle : {type : 'dashed'}
		}
	}],
	grid : {
		x : 60,y : 20,x2 : 20,y2 : 150
	},
	series : [{
		name : '新增用户',type : 'line',symbol : 'emptyCircle',symbolSize : 3,
		itemStyle : {normal : {lineStyle : {width : 3}}},
		data : []
	}, {
		name : '活跃用户',type : 'line',symbol : 'emptyCircle',symbolSize : 3,
		itemStyle : {normal : {lineStyle : {width : 3}}},
		data : []
	}, {
		name : '新增企业',type : 'line',symbol : 'emptyCircle',symbolSize : 3,
		itemStyle : {normal : {lineStyle : {width : 3}}},
		data : []
	}, {
		name : '活跃企业',type : 'line',symbol : 'emptyCircle',symbolSize : 3,
		itemStyle : {normal : {lineStyle : {width : 3}}},
		data : []
	}, {
		name : '通话次数',type : 'line',symbol : 'emptyCircle',symbolSize : 3,
		itemStyle : {normal : {lineStyle : {width : 3}}},
		data : []
	}, {
		name : '通话时间',type : 'line',symbol : 'emptyCircle',symbolSize : 3,
		itemStyle : {normal : {lineStyle : {width : 3}}},
		data : []
	}]
};
var data={
	"flag": "000000",
	"data": {
		"totalItemNum": 4,
		"items": [
			{
				"callingnum": 20003,
				"activeusers": 100035,
				"time": "2015-06-04",
				"callingduration": 95631,
				"activecarriers": 12369,
				"addedusers": 12231,
				"addedcarriers": 5691
			},
			{
				"callingnum": 15000,
				"activeusers": 23698,
				"time": "2015-06-03",
				"callingduration":48555,
				"activecarriers": 7893,
				"addedusers": 5532,
				"addedcarriers": 4531
			},
			{
				"callingnum": 11003,
				"activeusers": 29098,
				"time": "2015-06-02",
				"callingduration": 36999,
				"activecarriers": 4569,
				"addedusers": 3412,
				"addedcarriers": 3691
			},
			{
				"callingnum": 8639,
				"activeusers": 10004,
				"time": "2015-06-01",
				"callingduration": 12336,
				"activecarriers": 2369,
				"addedusers": 1032,
				"addedcarriers": 1231
			}
		]
	},
	"desc": "success"
}
var myChart;
var oldData=[];
function renderChart(array){
	//myChart未初始化
	if(myChart == undefined){
		var myChart = echarts.init(document.getElementById('chart'));
		myChart.on(echarts.config.EVENT.CLICK, xAxisClick);
	}
	if(option.xAxis[0].data.length){
		option.xAxis[0].data = [];
		for (var i=0; i < option.series.length; i++) {
		  option.series[i].data = [];
		};
	}
	oldData = array;
	for (var i = 0; i < array.length; i++) {
		//设置图表横坐标轴
		option.xAxis[0].data[i] = array[array.length - i - 1].time;
		option.series[0].data[i] = array[array.length - i - 1].addedusers;
		//新增用户
		option.series[1].data[i] = array[array.length - i - 1].activeusers;
		//活跃用户
		option.series[2].data[i] = array[array.length - i - 1].addedcarriers;
		//新增企业
		option.series[3].data[i] = array[array.length - i - 1].activecarriers;
		//活跃用户
		option.series[4].data[i] = array[array.length - i - 1].callingnum;
		//通话次数
		option.series[5].data[i] = array[array.length - i - 1].callingduration;
		//通话时长
	};
	myChart.clear();
	myChart.setOption(option); 
}

function xAxisClick(param) {
	/*
	param: { data: dataIndex: event: name: seriesIndex: seriesName: special: type: value:}
	*/
	//判断是x坐标轴点击还是坐标点点击：param。data == "undefined"为x轴点击
	if ( typeof param.data == "undefined") {
		
		for(var i = 0; i < oldData.length; i++){
			if(param.name == oldData[i].time){
				um.set("isvDetail", oldData[i]);
				window.location.hash = "isvDetail";
				break;
			}
		}

	}
}

//默认获取当天的数据
function  assembleUrl(statisticstype,isvid, applyid, corpid, startTime, endTime) {
	var url = "http://opentest.yonyoutelecom.cn/mobile/queryNewAdd.do?";
	url += "account=" + userInfo.account;
	url += "&start=0&size=35";
	url += "&q=statisticstype=" + (statisticstype == null? "4":statisticstype);
	url += filter(isvid) == true? (";isvid=" + isvid) :  "";
	url += filter(applyid) == true?(";applyid=" + applyid) : "";
	url += filter(corpid) == true?(";corpid=" + corpid) :"";
	url += filter(corpid) == true?(";corpid=" + corpid):"";
	url += ";startTime=" + (filter(startTime) == true?startTime: new Date().format("yyyy-MM-dd"));
	url += ";endTime=" + (filter(endTime) == true?endTime: new Date().format("yyyy-MM-dd"));
	alert(url);
	$service.get({
		"url" : url,
		"callback" : "callback()",
		"timeout" : "5"//可选参数，超时时间，单位为秒
	});
}

function filter(str){
	if(str == null || str == "" || typeof(str) == "undefined"){
		return false;
	}
	return true;
}

function callback(){
	var array = data.data.items;
	//图标展示
	console.log(array);
	renderChart(array);
	//列表展示
	var str;
	for (var i=0; i < array.length; i++) {
		str += "<tr><td style='font-size:12px;'>" + array[i].time +
		"</td><td style='font-size:12px;'>" + array[i].addedusers +
		"</td><td style='font-size:12px;'>" + array[i].activeusers +
		"</td><td style='font-size:12px;'>" + array[i].addedcarriers +
		"</td><td style='font-size:12px;'>" + array[i].activecarriers +
		"</td><td style='font-size:12px;'>" + array[i].callingnum +
		"</td><td style='font-size:12px;'>" + array[i].callingduration +
		"</td><tr>";
	}
	$("#byList tr").remove();
	$("#byList").append(str);
}
