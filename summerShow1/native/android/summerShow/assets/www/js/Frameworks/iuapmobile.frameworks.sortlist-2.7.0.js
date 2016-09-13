( typeof require == "function") && require.config({
	baseUrl : 'js',
	paths : {
		jquery : "jquery-2.1.4.min",
		UM : "Frameworks/iuapmobile.frameworks.core-2.7.0"
	}
}); ( function(global, factory) {
		if ( typeof module === "object" && typeof module.exports === "object") {
			module.exports = global.document ? factory(global, true) : function(w) {
				if (!w.document) {
					throw new Error("listview requires a window with a document");
				}
				return factory(w);
			};
		} else if ( typeof define === "function" && define.amd) {
			define(["jquery", "UM"], function() {
				return factory(global);
			});
		} else {
			factory(global);
		}

	}( typeof window !== "undefined" ? window : this, function(window) {
		function SortList(selector, options) {
			options = options || {};
			this._events = new UM.EventMgr();
			this.$element = $(selector);
			this.element = this.$element[0];
			this.$parent = this.$element.parent();
			this.naviItems = [];
			this.curGroupIndex = 0;
			this.resizeFn = null;
			this.resizeEnable = false;
			this.$scroll = this.$element.find('.um-sortlist-content');
			this.config = {
				naviEnable : false,
				itemClickEnable : false //是否已开启行点击事件监听
			};
			this.init(options);
		}


		SortList.prototype.init = function(options) {
			this.opts = $.extend({}, {
				height : 0,
				width : 0,
				collapsible : true
			}, options);

			if (this.opts.collapsible) {
				this.$scroll.delegate('.um-sortlist-title', 'click', function() {
					var $elem = $(this);
					var $parent = $elem.parent();
					var $sibling = $elem.siblings('ul');

					if ($parent.hasClass('um-sortlist-collapsed')) {
						$parent.removeClass('um-sortlist-collapsed');
						$sibling.slideDown(500);
					} else {
						$parent.addClass('um-sortlist-collapsed');
						$sibling.slideUp(500);
					}
				});
			}

			this.resizeFn = function() {
				var parent = this.$parent[0];
				var parentStyle = window.getComputedStyle(parent);
				var selfStyle = window.getComputedStyle(this.element)
				var parentPaddingTop = parseInt(parentStyle['padding-top']) || 0;
				var parentPaddingBottom = parseInt(parentStyle['padding-bottom']) || 0;
				var parentPaddingLeft = parseInt(parentStyle['padding-left']) || 0;
				var parentPaddingRight = parseInt(parentStyle['padding-right']) || 0;
				var selfMarginTop = parseInt(selfStyle['margin-top']) || 0;
				var selfMarginBottom = parseInt(selfStyle['margin-bottom']) || 0;
				var selfMarginLeft = parseInt(selfStyle['margin-left']) || 0;
				var selfMarginRight = parseInt(selfStyle['margin-right']) || 0;
				if (this.opts.height > 0) {
					this.$element.height(this.opts.height);
				} else {
					this.$element.height(parent.offsetHeight - parentPaddingTop - parentPaddingBottom - selfMarginTop - selfMarginBottom);
				}

				if (this.opts.width > 0) {
					this.$element.width(this.opts.width);
				} else {
					this.$element.width(parent.offsetWidth - parentPaddingLeft - parentPaddingRight - selfMarginLeft - selfMarginRight);
				}
			};

			this.resizeFn();
		}

		SortList.prototype.setNaviItems = function(arr) {
			var self = this;
			var fragment, ul, li, $navi, $naviParent;
			if (!Array.isArray(arr) || arr.length == 0)
				return false;
			this.naviItems = arr;
			$navi = $('<ul class="um-box-hc"></ul>');
			fragment = document.createDocumentFragment();
			arr.forEach(function(item) {
				li = document.createElement('li');
				li.innerHTML = item;
				fragment.appendChild(li);
			});
			$navi.html(fragment);

			$naviParent = this.$element.find('.um-sortlist-navi');
			if ($naviParent.length) {
				$naviParent.html($navi);
			} else {
				$naviParent = $('<div class="um-sortlist-navi"></div>');
				$naviParent.html($navi);
				this.$element.append($naviParent);
			}

			if (!this.opts.naviEnable) {
				$('.um-sortlist-navi').on('touchstart touchmove', 'ul', function(e) {
					e.preventDefault();
					var touches = e.originalEvent.targetTouches[0];
					var pageX = touches.pageX;
					var pageY = touches.pageY;
					var targetGroup;
					var naviIndex = -1;
					var targetNavLi = document.elementFromPoint(pageX, pageY);
					var $targetNavLi = $(targetNavLi);
					if ($(this).find(targetNavLi).length) {
						naviIndex = $targetNavLi.index();
						targetGroup = self.$scroll.find('.um-sortlist-group').get(naviIndex);
						targetGroup && self.$scroll.scrollTop(targetGroup.offsetTop);
					}
				});

				this.opts.naviEnable = true;
			}

		}

		SortList.prototype.on = function(event, callback) {
			if ( typeof event !== 'string') {
				console.log('on方法的第一个参数必须为字符串');
				return false;
			}
			switch (event) {
				case "itemClick":
					this.itemClick(callback);
					break;
			}

			return this;
		};

		SortList.prototype.itemClick = function(callback) {
			var self = this;
			if ( typeof callback == 'function') {
				this._events.on("itemClick", callback);
				if (!this.config.itemClickEnable) {
					this.$scroll.delegate('.um-sortlist-row', 'click', function(e) {
						window.event.preventDefault();
						var $target = $(this);
						var $rows = $('.um-sortlist-row');
						var groupIndex = $target.closest('.um-sortlist-group').index();
						var childIndex = $target.index();
						var rowIndex = $rows.index(this);
						var args = {
							groupIndex : groupIndex,
							childIndex : childIndex,
							rowIndex : rowIndex,
							$target : $target
						};
						self._events.trigger("itemClick", self, args);
					});
					this.config.itemClickEnable = true;
				}
			}
			return this;
		};

		window.UM.SortList = SortList;
		window.UM.sortList = function(selector, opts) {
			if (selector == undefined)
				return;
			return new SortList(selector, opts);
		}
	}));
