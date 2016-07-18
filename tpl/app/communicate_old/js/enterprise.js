req.allCompany = {
	url: "http://opentest.yonyoutelecom.cn/mobile/getAllCompany.do",
	params: {
		account: userInfo.account,
		start: 0,
		size: 35,
		sortBy: "id",
		sortOrder: "desc",
		q: "",
		_: "9"
	}
};
req.doAudit = {
	url: "http://opentest.yonyoutelecom.cn/mobile/doAudit.do",
	params: {
		account: userInfo.account,
		id: "",
		status: "",
		auditMsg: ""
	}
}

function init_callback() {
	var data = $ctx.param("result");
	data = $stringToJSON(data);
	allJson = data.data["items"];
	render("allCompany", allJson);
}
var id = setTimeout(init_listener, 300);

function init_listener() {
	var pnode = $("#allCompany"),
		li = pnode.find("li"),
		count = 0;
	if (li.length === 0) {
		clearTimeout(id);
		id = setTimeout(init_listener, 300);
		return;
	}
	// 每个li元素下的radio监听
	pnode.on("change", "input[type=checkbox]", function(e) {
			if (this.checked) {
				count++;
			} else {
				count--;
			}
			$(".collect .um-orange").html(count);
		})
		// ISV详情
	pnode.on("click", "a", function(e) {
			var index = $(this).closest("li").index();
			render("isvDetail", allJson[index]);
		})
		// 全选按钮
	$(".collect").find("input[type=checkbox]").on("change", function() {
		if (this.checked) {
			pnode.find("input[type=checkbox]").prop("checked", true);
			count = pnode.length;
			$(".collect .um-orange").html(count);
		} else {
			pnode.find("input[type=checkbox]").prop("checked", false);
			$(".collect .um-orange").html(0);
		}
	})
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

// allJson 存储初始化大块数据
var allJson = allJson || {};
// 所有数据id集合
var ids = [];

$(function() {
	$("#status").find(".agree-btn").on("click", function() {
		$("#astatus").find(".choice").html($("#status").find("input:radio:checked").next().next().html());
	})

	// 过滤字段的拼接
	$("#filter").find(".agree-btn").on("click", function() {
			var str = filterStr();
			$alert(filterStr());
			req.allCompany.params.q = str;
			requestData(req.allCompany.url, req.allCompany.params, "init_callback()");
		})
		// 处理被选择数据的ID成字符串
	function dealIds() {
		var li = $("#allCompany").find("li");
		if (li.length === 0) {
			$alert("请等待数据解析完全");
			return;
		}
		var ids = [];
		$.each(li, function() {
			var id = $(this).find("input:radio:checked").next(".none").html();
			id && ids.push(id);
		})
		req.doAudit.params.id = ids.toString();
	}

	// 调用同意审批和拒绝审批
	var $main_footer = $("#main .um-footer");
	$main_footer.find(".refuse-btn").on("click", function() {
		dealIds();
		req.doAudit.params.status = 2;
		requestData(req.doAudit.url, req.doAudit.params, "doAudit_callback()")
	})

	$main_footer.find(".agree-btn").on("click", function() {
		dealIds();
		req.doAudit.params.status = 1;
		requestData(req.doAudit.url, req.doAudit.params, "doAudit_callback()")
	})

	$("#isvDetail").find(".refuse-btn").on("click", function() {
		req.doAudit.params.id = $("#isvDetail").find(".bind_id").html();
		req.doAudit.params.status = 2;
		requestData(req.doAudit.url, req.doAudit.params, "doAudit_callback()")
	}).find(".agree-btn").on("click", function() {
		req.doAudit.params.id = $("#isvDetail").find(".bind_id").html();
		req.doAudit.params.status = 1;
		requestData(req.doAudit.url, req.doAudit.params, "doAudit_callback()")
	})

	function init() {
		var str = "",
			dataInput = $(".make").find("input[type=datetime-local]");
		start = new Date().format("yyyy-MM-dd hh:mm:ss"),
			end = new Date(new Date() - 24 * 60 * 60 * 1000).format("yyyy-MM-dd hh:mm:ss");

		dataInput.eq(0).val(new Date().toLocaleString());
		dataInput.eq(1).val(new Date(new Date() - 24 * 60 * 60 * 1000).toLocaleString());

		str += "c.create_time>='" + start + ";";
		str += "'c.create_time<='" + end + "';";
		req.allCompany.params.q = str;
		requestData(req.allCompany.url, req.allCompany.params, "init_callback()");
	}
	init();
})

function $pageReady() {}