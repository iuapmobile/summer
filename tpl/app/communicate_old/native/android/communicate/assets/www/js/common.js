/*
 http://opentest.yonyoutelecom.cn/condition/isvName.do
 http://opentest.yonyoutelecom.cn/condition/applyName.do
 http://opentest.yonyoutelecom.cn/condition/getCompanyName.do?q=&size=25&start=0
 http://opentest.yonyoutelecom.cn/company/getAllCompany.do?start=0&size=35&sortBy=id&sortOrder=desc&q=&_=1435653016639
 */
 var userInfo = $.parseJSON(localStorage.userInfo);
$isWeb = true;
var req = {
		// 查询省市列表接口
		queryConvience: {
			url: "http://opentest.yonyoutelecom.cn/mobile/queryConvience.do?region_type=1",
			params: {
				region_type: 1 // 1：省级；2：市；3：区县等
			}
		},
		// 查询ISV名称列表接口
		isvName: {
			url: "http://opentest.yonyoutelecom.cn/mobile/isvName.do",
			params: {
				account: userInfo.account
			}
		},
		// 3.10查询APP名称列表接口
		applyName: {
			url: "http://opentest.yonyoutelecom.cn/mobile/applyName.do",
			params: {
				account: userInfo.account
					/*,isv_id : ""*/
			}
		},
		// 查询企业信息列表接口
		companyName: {
			url: "http://opentest.yonyoutelecom.cn/mobile/getCompanyName.do",
			params: {
				account: userInfo.account,
				start: 0,
				size: 25,
				q: ""
					//app_id : ""
			}
		}
	}
	/*
	 回调函数
	 */

function isv_callback() {
	//$alert($ctx.getString());
	var result = $ctx.param("result");
	result = $stringToJSON(result);
	render("isv", result);
}

function applyName_callback() {
	//$alert($ctx.getString());
	var result = $ctx.param("result");
	result = $stringToJSON(result);
	render("applyName", result);
}

function companys_callback() {
	//$alert($ctx.getString());
	var result = $ctx.param("result");
	result = $stringToJSON(result);
	render("companys", result);
}

function doAudit_callback() {
	//$alert($ctx.getString());
	var result = $ctx.param("result");
	result = $stringToJSON(result);
	if (result.desc === "success") {
		$alert("审核成功");
	} else {
		$alert("审核失败");
	}
}

// 渲染数据
function render(wrap, data) {
	um.set(wrap, data);
}

// 发送请求
/*function requestData(url, params, callback) {
	$service.post({
		"url": url,
		"data": params,
		"callback": callback
	})
}*/
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
		// 过滤字段的拼接
	function filterStr(){
		/*c.id=7910;app.id=35;isv.id=28;c.status=0;c.create_time>='2015-06-29 00:00:00';c.create_time<='2015-07-01 23:59:59'*/
		var cid = $("#qiye").find("input:radio:checked").next(".none").html(),
			isvid = $("#isvname").find("input:radio:checked").next(".none").html(),
			appid = $("#yinyong").find("input:radio:checked").next(".none").html(),
			status = $("#status").find("input:radio:checked").next(".none").html(),
			start = $(".make").find("input[type=datetime-local]").eq(0).val(),
			end = $(".make").find("input[type=datetime-local]").eq(1).val();
		var str = "";
		str += cid ? "c.id=" + cid + ";" : "";
		str += appid ? "app.id=" + appid + ";" : "";
		str += isvid ? "isv.id=" + isvid + ";" : "";
		str += status ? "c.status=" + status + ";" : "";
		str += start ? "c.create_time>='" + new Date(start).format("yyyy-MM-dd hh:mm:ss") + ";" : "";
		str += end ? "'c.create_time<='" + new Date(end).format("yyyy-MM-dd hh:mm:ss") + "';" : "";
		return str;
	}
$(function() {
	// 数据过滤的选项
	/*$("#isv").on("click", function() {
		requestData(req.isvName.url, req.isvName.params, "isv_callback()");
	})*/
	/*$("#appname").on("click", function() {
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
})
$isWeb = true;