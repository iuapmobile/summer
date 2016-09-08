$(function() {
	var shopData = {
		data: []
	};
	for (var i = 0; i < 35; i++) {
		var j = {};
		j.title = "ZJT股份有限公司" + i;
		j.content = ["生产", "加工", "销售", "包装", "采购"][parseInt(Math.random() * 5)];
		j.time = "星期" + ["一", "二", "三", "四", "五", "六", "七"][parseInt(Math.random() * 7)];
		j.status = ["审阅中", "已批准", "未提交"][i % 3];
		j.imgsrc = "img/s" + (i % 9 + 2) + ".png";
		j.tips = "提示" + i;
		shopData.data.push(j);
	}

	function shopModal() {
		var self = this;

		self.defaults = {
			activeIndex: 0,
			isAdd: false,
			isAllcheck: false,
			isCancle: true,
			initData: {
				title: "",
				content: "",
				status: "",
				time: "星期一",
				imgsrc: "img/s5.png",
				tips: ""
			}
		}
		self.listData = ko.observableArray(shopData.data);

		self.line = ko.observable(self.defaults.initData);

		self.tipsVisible = function() {
			return Math.random();
		}

		self.lineClick = function(data, e) {
			var lineData = $.extend({}, self.defaults.initData, data);
			self.line(lineData);
			var index = $(e.target).closest("li").index();

			self.defaults.activeIndex = index;
			self.defaults.isAdd = false;
		}

		self.addlist = function() {
			initData = {
				title: "",
				content: "",
				status: "",
				time: "星期一",
				imgsrc: "img/s5.png",
				tips: ""
			}
			self.line(initData);
			self.defaults.activeIndex = 0; //self.listData().length;
			self.defaults.isAdd = true;
		}
		self.save = function() {
			var newLine = new self.line();
			if (!newLine.title || !newLine.content) {
				UM.modal("alert", "亲，输入数据后才能保存哦！");
				return;
			}
			if (self.defaults.isAdd) {
				self.listData.splice(self.defaults.activeIndex, 0, newLine);
			} else {
				self.listData.splice(self.defaults.activeIndex, 1, newLine);
			}
			closeCheck();
			self.defaults.isCancle = !self.defaults.isCancle;
			UM.page.back();
		}

		self.checkAll = function() {
			self.defaults.isAllcheck = !self.defaults.isAllcheck;
			$("#shopContent").find("input:checkbox").prop("checked", self.defaults.isAllcheck);
		}
		self.edite = function(modal, e) {
			var target = $(e.target);
			if (self.defaults.isCancle) {
				openCheck();
			} else {
				closeCheck();
			}
			self.defaults.isCancle = !self.defaults.isCancle;
		}
		self.remove = function() {
			$.each($("#shopContent").find("input:checkbox:checked"), function() {
				var checkItem = $(this).closest(".list-item");
				var i = checkItem.index()
				checkItem.slideUp(400, function() {
					closeCheck();
					var index = checkItem.index();
					checkItem.remove();
				});
			});
			$("#edite_list").trigger("click");
		}
	}

	ko.applyBindings(new shopModal());

	function openCheck() {
		$("#shopContent").find(".um-list-item").addClass("um-list-left-open");
		$("#index #check").removeClass("none");
		$("#edite_list").removeClass("ti-pencil-alt").html("取消");
	}

	function closeCheck() {
		$("#shopContent").find(".um-list-item").removeClass("um-list-left-open");
		$("#index #check").addClass("none");
		$("#edite_list").html("").addClass("ti-pencil-alt");
	}
});