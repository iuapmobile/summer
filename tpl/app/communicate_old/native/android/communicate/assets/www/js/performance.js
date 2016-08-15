$.extend(req, {
		// http://opentest.yonyoutelecom.cn/mobile/queryByProvince.do?
		//account=hgp&q=isvid=28;applyid=36;corpid=3169;startTime=2015-06-04+00:00:00;endTime=2015-06-04+23:59:59
		byProvince: {
			url: "http://opentest.yonyoutelecom.cn/mobile/queryByProvince.do",
			params: {
				account: userInfo.account,
				q: ""
			}
		},
		// http://opentest.yonyoutelecom.cn/mobile/queryByAppName.do
		// ?account=hgp&q=isvid=28;applyid=36;corpid=3169;startTime=2015-06-04+00:00:00;endTime=2015-06-04+23:59:59
		byAppName: {
			url: "http://opentest.yonyoutelecom.cn/mobile/queryByAppName.do",
			params: {
				account: userInfo.account,
				q: ""
			}
		},
		// 查询ISV名称列表接口
		// http://opentest.yonyoutelecom.cn/mobile/queryByISVName.do
		// ?account=hgp&q=isvid=28;applyid=36;corpid=3169;startTime=2015-06-04+00:00:00;endTime=2015-06-04+23:59:59
		byIsvName: {
			url: "http://opentest.yonyoutelecom.cn/mobile/queryByISVName.do",
			params: {
				account: userInfo.account,
				q: ""
			}
		},
		// http://opentest.yonyoutelecom.cn/mobile/queryByCom.do
		//?account=hgp&start=0&size=35&q=isvid=28;applyid=36;corpid=3169;startTime=2015-06-04+00:00:00;endTime=2015-06-04+23:59:59
		byCom: {
			url: "http://opentest.yonyoutelecom.cn/mobile/queryByCom.do",
			params: {
				account: userInfo.account,
				start: 0,
				size: 25,
				q: ""
			}
		}
	});
//设定后台数据
var byProvince_data={
	"flag": "000000",
	"desc": "success",
	"data": {
		"totalItemNum": 1,
		"items": [
			{
				"gift_amount": 0,
				"com_amount": 0,
				"carriername": "",
				"comEmpty": false,
				"consume_gift_amount": 0,
				"carriernum": 0,
				"callingduration": 4,
				"activenum": 1,
				"isvname": "",
				"regionname": " 北京 ",
				"applicationname": "",
				"empty": false,
				"registernum": 1
			}
		]
	}
};
var byCom_data={
	"flag": "000000",
	"desc": "success",
	"data": {
		"totalItemNum": 2,
		"items": [
			{
				"gift_amount": 0,
				"com_amount": 0,
				"carriername": "",
				"comEmpty": true,
				"consume_gift_amount": 0,
				"carriernum": 1,
				"callingduration": 0,
				"activenum": 0,
				"isvname": " 用友通 信",
				"regionname": "",
				"applicationname": "",
				"empty": false,
				"registernum": 0
			},
			{
				"gift_amount": 0,
				"com_amount": 0,
				"carriername": "",
				"comEmpty": false,
				"consume_gift_amount": 0,
				"carriernum": 1,
				"callingduration": 4,
				"activenum": 1,
				"isvname": " 畅捷 通",
				"regionname": "",
				"applicationname": "",
				"empty": false,
				"registernum": 1
			}
		]
	}
}
var byIsvName_data={
	"flag": "000000",
	"desc": "success",
	"data": {
		"totalItemNum": 2,
		"items": [
			{
				"gift_amount": 0,
				"com_amount": 0,
				"carriername": "",
				"comEmpty": true,
				"consume_gift_amount": 0,
				"carriernum": 1,
				"callingduration": 0,
				"activenum": 0,
				"isvname": " 用友通 信",
				"regionname": "",
				"applicationname": "",
				"empty": false,
				"registernum": 0
			},
			{
				"gift_amount": 0,
				"com_amount": 0,
				"carriername": "",
				"comEmpty": false,
				"consume_gift_amount": 0,
				"carriernum": 1,
				"callingduration": 4,
				"activenum": 1,
				"isvname": " 畅捷 通",
				"regionname": "",
				"applicationname": "",
				"empty": false,
				"registernum": 1
			}
		]
	}
};
var byAppName_data={
	"flag": "000000",
	"data": {
		"totalItemNum": 10,
		"items": [
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": true,
				"com_amount": 0,
				"applicationname": "51 外 勤",
				"empty": true,
				"activenum": 0,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 0,
				"callingduration": 0,
				"carriernum": 0,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": " 协同 OA",
				"empty": false,
				"activenum": 1,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 1,
				"callingduration": 73,
				"carriernum": 2,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": " 企业测试调 试",
				"empty": false,
				"activenum": 2,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 2,
				"callingduration": 8,
				"carriernum": 1,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": " 企业测试正 式",
				"empty": false,
				"activenum": 1,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 1,
				"callingduration": 8,
				"carriernum": 1,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": "App 测试调 试",
				"empty": false,
				"activenum": 2,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 2,
				"callingduration": 23,
				"carriernum": 1,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": "App 测试正 式",
				"empty": false,
				"activenum": 1,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 1,
				"callingduration": 4,
				"carriernum": 1,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": true,
				"com_amount": 0,
				"applicationname": "NC6",
				"empty": false,
				"activenum": 0,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 0,
				"callingduration": 0,
				"carriernum": 12,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": " 企业空 间",
				"empty": false,
				"activenum": 1,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 1,
				"callingduration": 250,
				"carriernum": 1,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": false,
				"com_amount": 0,
				"applicationname": " 工作 圈",
				"empty": false,
				"activenum": 1694,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 2947,
				"callingduration": 48224,
				"carriernum": 2738,
				"gift_amount": 0
			},
			{
				"carriername": "",
				"isvname": "",
				"comEmpty": true,
				"com_amount": 0,
				"applicationname": " 顾家家 居",
				"empty": false,
				"activenum": 0,
				"consume_gift_amount": 0,
				"regionname": "",
				"registernum": 0,
				"callingduration": 0,
				"carriernum": 1,
				"gift_amount": 0
			}
		]
	},
	"desc": "success"
}
	// 获取初始化数据的回调
function byProvince_callback() {
	/*var data = $ctx.param("result");
	data = $stringToJSON(data);*/
	var data = byProvince_data.data["items"];
	var str = "";
	for (var i = 0, len = data.length; i < len; i++) {
		str += '<tr><td>' + data[i].regionname +
			'</td><td>' + data[i].registernum +
			'</td><td>' + data[i].activenum +
			'</td><td>' + data[i].callingduration +
			'</td></tr>';
	}
	$("#byProvince").append(str);
}

function byCom_callback() {
	/*var data = $ctx.param("result");
	data = $stringToJSON(data);*/
	var data = byCom_data.data["items"];
	var str = "";
	for (var i = 0, len = data.length; i < len; i++) {
		str += '<tr><td>' + data[i].isvname +
			'</td><td>' + data[i].registernum +
			'</td><td>' + data[i].activenum +
			'</td><td>' + data[i].callingduration +
			'</td></tr>';
	}
	$("#byCom").append(str);
}

function byIsvName_callback() {
	/*var data = $ctx.param("result");
	data = $stringToJSON(data);*/
	var data =byIsvName_data.data["items"];
	var str = "";
	for (var i = 0, len = data.length; i < len; i++) {
		str += '<tr><td>' + data[i].isvname +
			'</td><td>' + data[i].carriernum +
			'</td><td>' + data[i].registernum +
			'</td><td>' + data[i].activenum +
			'</td><td>' + data[i].callingduration +
			'</td></tr>';
	}
	$("#byIsvName").append(str);
}

function byAppName_callback() {
	/*var data = $ctx.param("result");
	data = $stringToJSON(data);*/
	var data = byAppName_data.data["items"];
	var str = "";
	for (var i = 0, len = data.length; i < len; i++) {
		str += '<tr><td>' + data[i].applicationname +
			'</td><td>' + data[i].carriernum +
			'</td><td>' + data[i].registernum +
			'</td><td>' + data[i].activenum +
			'</td><td>' + data[i].callingduration +
			'</td></tr>';
	}
	$("#byAppName").append(str);
}

function init() {
	/*var str = "",
		start = new Date().format("yyyy-MM-dd hh:mm:ss"),
		end = new Date(new Date() - 24 * 60 * 60 * 1000).format("yyyy-MM-dd hh:mm:ss");
	str += "c.create_time>='" + start + ";";
	str += "'c.create_time<='" + end + "';";
	req.byProvince.params.q = str;*/
	/*requestData(req.byProvince.url, req.byProvince.params, "byProvince_callback()");
	requestData(req.byAppName.url, req.byAppName.params, "byAppName_callback()");
	requestData(req.byIsvName.url, req.byIsvName.params, "byIsvName_callback()");
	requestData(req.byCom.url, req.byCom.params, "byCom_callback()");*/
	byProvince_callback();
	byAppName_callback();
	byIsvName_callback();
	byCom_callback();
}

function $pageReady() {}
// 发送请求
function requestData(url, params, callback) {
	$service.post({
		"url": url,
		"data": params,
		"callback": callback,
		"timeout": 6000
	})
}



Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	}
	return format;
}
$(function() {
		$("#table-nav li").click(function() {
			var index = $(this).index();
			var contentH = window.innerHeight - 78 - 100;
			$(this).addClass("active").siblings().removeClass("active");
			$(".um-table-container").eq(index).height(contentH)
				.find(".um-tb-data").height(contentH - 60).end()
				.siblings(".table-row-scroll").height(0);
		})
		$("#table-nav li").eq(0).trigger("click");

		// 数据过滤的选项
		/*$("#isv").one("click", function() {
			requestData(req.isvName.url, req.isvName.params, "isv_callback()");
		})
		$("#appname").on("click", function() {
			var isvid = $("#isvname").find("input:radio:checked").next(".none").html();
			if (isvid) req.applyName.params.isv_id = isvid;
			requestData(req.applyName.url, req.applyName.params, "applyName_callback()");
		})

		$("#companys").on("click", function() {
			var appid = $("#yinyong").find("input:radio:checked").next(".none").html();
			if (appid) req.companyName.params.app_id = appid;
			requestData(req.companyName.url, req.companyName.params, "companys_callback()");
		})*/
		$("#isvname").find(".agree-btn").on("click", function() {
			$("#isv").find(".choice").html($("#isvname").find("input:radio:checked").next().next().html());
		})

		$("#qiye").find(".agree-btn").on("click", function() {
			$("#companys").find(".choice").html($("#qiye").find("input:radio:checked").next().next().html());
		})

		$("#yinyong").find(".agree-btn").on("click", function() {
			$("#appname").find(".choice").html($("#yinyong").find("input:radio:checked").next().next().html());
		})
		$("#filter").find(".agree-btn").on("click", function() {
			/*var str = filterStr();
			$alert(str);
			req.byProvince.params.q = str;
			req.byAppName.params.q = str;
			req.byIsvName.params.q = str;
			req.byCom.params.q = str;

			requestData(req.byProvince.url, req.byProvince.params, "byProvince_callback()");
			requestData(req.byAppName.url, req.byAppName.params, "byAppName_callback()");
			requestData(req.byIsvName.url, req.byIsvName.params, "byIsvName_callback()");
			requestData(req.byCom.url, req.byCom.params, "byCom_callback()");*/
		})
		$("#table-nav li").click(function() {
			var index = $(this).index();
			var contentH = window.innerHeight - 78 - 100;
			$(this).addClass("active").siblings().removeClass("active");
			$(".um-table-container").eq(index).height(contentH).find(".um-tb-data").height(contentH - 60).end().siblings(".table-row-scroll").height(0);
		})
		$("#table-nav li").eq(0).trigger("click");
		init();
	})