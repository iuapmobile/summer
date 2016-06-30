;
(function(global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function(w) {
				if (!w.document) {
					throw new Error("requires a window with a document");
				}
				return factory(w);
			};
	} else if (typeof define === "function" && define.amd) {
		define(["jquery", "UM"], function() {
			return factory(global);
		});
	} else {
		factory(global);
	}

}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	
		var raty = function(options) {
			this.defaults = {
				id: null, //评分控件的id名字
				number: 5, // 评分星级
				half: false, //是否支持半星
				score: 0, //初始值
				showText: false, //是否显示文字描述
				text: [], //文字描述
				click: function(score, evt) {} //点击回调函数，score为点击的星级
			}
			this.settings = $.extend(true, {}, this.defaults, options);
			this.init();
		}
		raty.prototype = {
			init: function() {
				var _this = this;
				var $el = $("#" + this.settings.id).addClass("um-grade");
				if (!$el || !$el.length) return;
				var number = this.settings.number;

				for (var i = 0; i < number; i++) {
					$el.append($("<div/>", {
						"class": "um-grade-out",
						title: this.settings.text[i]
					}));
				}

				if (this.settings.showText) {
					$el.append($("<div/>", {
						"class": "um-grade-text"
					}))
				}
				this.score(this.settings.score);
				$el.on("click", ".um-grade-out", function(e) {
					var index = $(this).index();
					_this.score(index + 1, e);
					_this._half(e);
					$(this).trigger("myclick", [index + 1, e]);
				})
			},
			bindClick: function(fn) {
				$("#" + this.settings.id).on("myclick", function(event, data, e) {
					fn.call(null, data, e);
				});
			},
			score: function(score, ev) {
				var number = this.settings.number;
				var $el = $("#" + this.settings.id);
				if (score < 0 || score > number) {
					console.warn("评分数超出范围");
					return;
				};
				var number = number;

				if (this.settings.showText) {
					if (this.settings.text[score - 1]) {
						$el.find(".um-grade-msg").html(this.settings.text[score - 1]);
					} else {
						$el.find(".um-grade-msg").html(this.defaults.text[score - 1]);
					}
				}
				$el.find(".um-grade-out:lt(" + score + ")").addClass("um-grade-in").end().find(".um-grade-out:gt(" + (score - 1) + ")").removeClass("um-grade-in");
			},
			_half: function(e) {
				var ishalf = this.settings.half;
				var $el = $("#" + this.settings.id);
				var px = $(e.target).offset().left + $(e.target).width() / 2;
				var cx = e.pageX;
				var index = $(e.target).index();

				if (ishalf) {
					$el.find(".um-grade-out").removeClass("um-grade-half");
					if (px > cx) {
						px > cx && $el.find(".um-grade-out").eq(index).addClass("um-grade-half").siblings(".um-grade-out").removeClass("half");
						this.settings.click(index + 0.5, e);
					} else {
						$el.find(".um-grade-out").removeClass("um-grade-half");
						this.settings.click(index + 1, e);
					}
				} else {
					this.settings.click(index + 1, e);
				}
			}
		}
		UM.raty = function(o) {
			return new raty(o);
		}
		return UM.raty;
}))