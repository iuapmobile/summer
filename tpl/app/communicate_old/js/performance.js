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
	})
	// 获取初始化数据的回调
function byProvince_callback() {
	var data = $ctx.param("result");
	data = $stringToJSON(data);
	data = data.data["items"];
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
	var data = $ctx.param("result");
	data = $stringToJSON(data);
	data = data.data["items"];
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
	var data = $ctx.param("result");
	data = $stringToJSON(data);
	data = data.data["items"];
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
	var data = $ctx.param("result");
	data = $stringToJSON(data);
	data = data.data["items"];
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
	var str = "",
		start = new Date().format("yyyy-MM-dd hh:mm:ss"),
		end = new Date(new Date() - 24 * 60 * 60 * 1000).format("yyyy-MM-dd hh:mm:ss");
	str += "c.create_time>='" + start + ";";
	str += "'c.create_time<='" + end + "';";
	req.byProvince.params.q = str;
	requestData(req.byProvince.url, req.byProvince.params, "byProvince_callback()");
	requestData(req.byAppName.url, req.byAppName.params, "byAppName_callback()");
	requestData(req.byIsvName.url, req.byIsvName.params, "byIsvName_callback()");
	requestData(req.byCom.url, req.byCom.params, "byCom_callback()");
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
		$("#isv").one("click", function() {
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
		})
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
			var str = filterStr();
			$alert(str);
			req.byProvince.params.q = str;
			req.byAppName.params.q = str;
			req.byIsvName.params.q = str;
			req.byCom.params.q = str;

			requestData(req.byProvince.url, req.byProvince.params, "byProvince_callback()");
			requestData(req.byAppName.url, req.byAppName.params, "byAppName_callback()");
			requestData(req.byIsvName.url, req.byIsvName.params, "byIsvName_callback()");
			requestData(req.byCom.url, req.byCom.params, "byCom_callback()");
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