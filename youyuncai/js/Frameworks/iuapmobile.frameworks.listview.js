/*
 * Summer UI JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 3.0.0.20160805
 */ 
( typeof require == "function") && require.config({
	baseUrl : 'js',
	paths : {
		jquery : "jquery-2.1.4.min",
		UM : "Frameworks/iuapmobile.frameworks.core"
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
		function ListView(selector, options) {
			this._events = new UM.EventMgr();
			this.$element = $(selector);
			this.$parent = this.$element.parent();
			this.$list = this.$element.children('ul');
			this._$domUp = null; //上拉时显示条
			this._$domDown = null; //下拉时显示条
			this._$domLoad = null; //上拉下拉释放时加载的DOM结构
			this._$domResult = null; //上拉下拉时显示条
			this._contentHeight = 0; //列表整个高度
			this._viewHeight = 0; //列表可视高度		
			this._scrollTop = 0; //列表滚动条距离顶端距离		
			this._pullDirection = ''; //手指在列表上的上下滑动方向
			this._isPulling = false; //列表是否处于上下拖拽状态	
			this._startY = 0; //手指在列表上触摸开始时，其位置的纵坐标		
			this._curY = 0; //手指在列表上滑动时，其当前位置的纵坐标		
			this._moveY = 0; //手指在列表上滑动的纵向位移		
			this._offsetY = 0; //手指在列表上滑动的纵向距离
			this._longTapEvent = null; //手指在列表上的长按定时器
	
			this.init(options);
		};

		ListView.prototype.init = function(options) {
			var self = this;
			if (!self.$list || self.$list.length == 0) {
				console.log('列表控件缺少必要的ul元素');
				return false;
			}
            self.config = {
				insertDOM : false, //列表是否允许上下拉追加内容
				isScroll : true, //列表是否允许内容上下滚动
				//isLoading : false, //列表是否正在加载内容
				hasOpeningItemMenu : false, //列表是否存在打开的行菜单
				ensureTouchDirect : false, //是否已明确手指滑动方向(上下左右)
				tapHoldEnable : false, //是否已开启长按事件监听
				itemClickEnable : false, //是否已开启行点击事件监听
				itemDeleteEnable : false, //是否已开启行删除事件监听
				pullDownEnable : false, //是否已开启下拉事件监听
				pullUpEnable : false, //是否已开启上拉事件监听
				itemSwipeEnable : false //是否已开启行左右滑动事件监听
			};

			self._touchMethods = {
				fnTouches : function(e) {
					if (!e.touches) {
						e.touches = e.originalEvent.touches;
					}
				},

				fnTouchstart : function(e, self) {
					self._startY = e.touches[0].pageY;
					self._viewHeight = self.$element.height();
					self._contentHeight = self.$element.get(0).scrollHeight;
					self._scrollTop = self.$element.scrollTop();
				},

				fnTouchmove : function(e, self) {
					self._curY = e.touches[0].pageY;
					self._moveY = self._curY - self._startY;

					if (self._moveY > 0) {
						self._pullDirection = 'down';
					} else if (self._moveY < 0) {
						self._pullDirection = 'up';
					}

					var _absMoveY = Math.abs(self._moveY);

					// 加载上方
					if (self.config.pullDownEnable && self._scrollTop <= 0 && self._pullDirection == 'down') {
						e.preventDefault();
						if (!self.config.insertDOM) {
							self.$element.prepend('<div class="' + self.opts.domUp.domClass + '"></div>');
							self.config.insertDOM = true;
						}

						self._$domUp = $('.' + self.opts.domUp.domClass);
						self._touchMethods.fnTransition(self._$domUp, 0);

						// 下拉
						if (_absMoveY <= self.opts.pullDistance) {
							self._offsetY = _absMoveY;
							self._$domUp.html(self.opts.domUp.domRefresh);
							// 指定距离 < 下拉距离 < 指定距离*2
						} else if (_absMoveY > self.opts.pullDistance && _absMoveY <= self.opts.pullDistance * 2) {
							self._offsetY = self.opts.pullDistance + (_absMoveY - self.opts.pullDistance) * 0.5;
							self._$domUp.html(self.opts.domUp.domUpdate);
							// 下拉距离 > 指定距离*2
						} else {
							self._offsetY = self.opts.pullDistance + self.opts.pullDistance * 0.5 + (_absMoveY - self.opts.pullDistance * 2) * 0.2;
						}

						self._$domUp.css({
							'height' : self._offsetY
						});
					}

					// 加载下方
					if (self.config.pullUpEnable && self._contentHeight <= (self._viewHeight + self._scrollTop) && self._pullDirection == 'up') {
						e.preventDefault();
						if (!self.config.insertDOM) {
							self.$element.append('<div class="' + self.opts.domDown.domClass + '"></div>');
							self.config.insertDOM = true;
						}

						self._$domDown = $('.' + self.opts.domDown.domClass);
						self._touchMethods.fnTransition(self._$domDown, 0);

						if (_absMoveY <= self.opts.pullDistance) {
							self._offsetY = _absMoveY;
							self._$domDown.html(self.opts.domDown.domRefresh);
							// 指定距离 < 上拉距离 < 指定距离*2
						} else if (_absMoveY > self.opts.pullDistance && _absMoveY <= self.opts.pullDistance * 2) {
							self._offsetY = self.opts.pullDistance + (_absMoveY - self.opts.pullDistance) * 0.5;
							self._$domDown.html(self.opts.domDown.domUpdate);
							// 上拉距离 > 指定距离*2
						} else {
							self._offsetY = self.opts.pullDistance + self.opts.pullDistance * 0.5 + (_absMoveY - self.opts.pullDistance * 2) * 0.2;
						}

						self._$domDown.css({
							'height' : self._offsetY
						});
						self.$element.scrollTop(self._offsetY + self._scrollTop);
					}
				},

				fnTouchend : function(self) {
					var _absMoveY = Math.abs(self._moveY);
					if (self.config.insertDOM) {
						if (self._pullDirection == 'down') {
							self._$domResult = self._$domUp;
							self.domLoad = self.opts.domUp.domLoad;
						} else if (self._pullDirection == 'up') {
							self._$domResult = self._$domDown;
							self.domLoad = self.opts.domDown.domLoad;
						}

						self._touchMethods.fnTransition(self._$domResult, 300);

						if (_absMoveY > self.opts.pullDistance) {
							self._$domResult.css({
								'height' : self._$domResult.children().height()
							});
							self._$domResult.html(self.domLoad);
							self._touchMethods.fnCallback(self);
						} else {
							self._$domResult.css({
								'height' : '0'
							}).on('webkitTransitionEnd', function() {
								self.config.insertDOM = false;
								$(this).remove();
							});
						}
						self._moveY = 0;
					}
				},

				fnTouchDirection : function(self, touchPosOri, touchPosNow) {
					var xspace = touchPosNow.pageX - touchPosOri.pageX;
					var yspace = touchPosNow.pageY - touchPosOri.pageY;
					var angle = Math.atan2(xspace, yspace);
					var cosv = Math.abs(Math.cos(angle));
					self.config.ensureTouchDirect = true;
					if (cosv >= 0.78) {
						if (yspace > 0)
							return 'down';
						if (yspace < 0)
							return 'up';
					} else if (cosv < 0.78) {
						if (xspace > 0)
							return 'right';
						if (xspace < 0)
							return 'left';
					}
					return '';
				},

				fnCallback : function(self) {
					//self.config.isLoading = true;
					if (self.config.pullDownEnable && self._pullDirection == 'down') {
						if (!!self._$domResult) {
							self._$domResult.css({
								'height' : 50
							})
						}
						this.isPulling = true;
						setTimeout(function() {
							self._events.trigger("pullDown", self, {});
						}, 1000);
					} else if (self.config.pullUpEnable && self._pullDirection == 'up') {
						if (!!self._$domResult) {
							self._$domResult.css({
								'height' : 50
							})
						}
						this.isPulling = true;
						setTimeout(function() {
							self._events.trigger("pullUp", self, {});
						}, 1000);
					}
				},

				fnTransition : function(dom, num) {
					dom.css({
						'-webkit-transition' : 'all ' + num + 'ms',
						'transition' : 'all ' + num + 'ms'
					});
				}
			};
			
			self.opts = $.extend({}, {
				height : 0,
				width : 0,
				domUp : {
					domClass : 'um-listview-up',
					domRefresh : '<div class="um-listview-refresh">↓下拉刷新</div>',
					domUpdate : '<div class="um-listview-update">↑释放更新</div>',
					domLoad : '<div class="um-listview-load"><span class="pullLoading"></span>加载中...</div>'
				},
				domDown : {
					domClass : 'um-listview-down',
					domRefresh : '<div class="um-listview-refresh">↑上拉加载更多</div>',
					domUpdate : '<div class="um-listview-update">↓释放加载</div>',
					domLoad : '<div class="um-listview-load"><span class="pullLoading"></span>加载中...</div>'
				},
				hasItemMenu : true,
				showLoadingBar : true,
				pullDistance : 50, // 拉动距离,单位为px
				tapHoldTime : 500, //长按事件多久之后触发，单位为ms
				itemDeleteAnimateTime : 500
			}, options);

			// 绑定触摸
			self.$list.on('touchstart', function(e) {
				var $openingItemMenu;
				var canExitItemMenu;
				if (self.opts.hasItemMenu) {
					$openingItemMenu = self.$list.find('.um-swipe-open');
					canExitItemMenu = $openingItemMenu.length && $openingItemMenu.find(e.target).length == 0;
					if (canExitItemMenu) {
						self.config.hasOpeningItemMenu = true;
						$openingItemMenu.removeClass('um-swipe-open').parent('.um-list-item').css('transform', 'translate3d(0,0,0)');
						return false;
					}

				}

				self.config.tapHoldEnable && (self._longTapEvent = setTimeout(function() {
					self._events.trigger("longTap", self, {});
				}, self.opts.tapHoldTime));
				if (!self.isPulling){
					self._touchMethods.fnTouches(e);
					self._touchMethods.fnTouchstart(e, self);
				}
			});
			self.$list.on('touchmove', function(e) {
				self._longTapEvent && clearTimeout(self._longTapEvent);
				if (self.config.hasOpeningItemMenu) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				}

				if (!self.isPulling) {
					self._touchMethods.fnTouches(e, self);
					self._touchMethods.fnTouchmove(e, self);
				}
			});
			self.$list.on('touchend', function(e) {
				self._longTapEvent && clearTimeout(self._longTapEvent);
				self.config.hasOpeningItemMenu = false;
				if (!self.isPulling) {
					
					self._touchMethods.fnTouchend(self);
				}
			});

			self.$list.on('touchstart', '.um-listview-row', function(e) {
				if (!self.config.itemSwipeEnable)
					return;
				self.config.isScroll = true;
				self.config.ensureTouchDirect = false;
				var touch = e.originalEvent.targetTouches[0];
				var touchPos = {
					pageX : touch.pageX,
					pageY : touch.pageY
				};
				$(this).data('touchPosOri', touchPos);
			});

			self.$list.on('touchmove', '.um-listview-row', function(e) {
				if (!self.config.itemSwipeEnable)
					return;
				var touch, touchPosOri;
				var touchPosNow;
				var touchDirection;
				var $elem;
				var rowIndex;
				if (!self.config.isScroll) {
					e.preventDefault();
					e.stopPropagation();
				}
				if (self.config.ensureTouchDirect)
					return;
				$elem = $(this);
				rowIndex = $elem.index();
				touch = e.originalEvent.targetTouches[0];
				touchPosNow = {
					pageX : touch.pageX,
					pageY : touch.pageY
				};
				touchPosOri = $(this).data('touchPosOri');
				touchDirection = self._touchMethods.fnTouchDirection(self, touchPosOri, touchPosNow);
				switch (touchDirection) {
					case 'left':
						e.preventDefault();
						e.stopPropagation();
						self.config.isScroll = false;
						!self.config.hasOpeningItemMenu && self._events.trigger('itemSwipeLeft', self, {
							rowIndex : rowIndex,
							$target : $elem
						});
						break;
					case 'right':
						e.preventDefault();
						e.stopPropagation();
						self.config.isScroll = false;
						!self.config.hasOpeningItemMenu && self._events.trigger('itemSwipeRight', self, {
							rowIndex : rowIndex,
							$target : $elem
						});
						break;
					default:
						self.config.isScroll = true;
				}

			});

			self.$list.on('touchend', '.um-listview-row', function(e) {
				if (!self.itemSwipeSupport)
					return;
				self.config.ensureTouchDirect = false;
				self.config.isScroll = true;
				$(this).removeData('touchPosOri');
			});

			self.resizeFn = function() {
				if (self.opts.height > 0) {
					self.$element.height(self.opts.height);
				} else {
					self.$parent.addClass('um-listview-adaptation');
				}

				if (self.opts.width > 0) {
					self.$element.width(self.opts.width);
				}
			};

			self.resizeFn();
		};

		ListView.prototype.refresh = function() {
			this._continuousPullTimes = 0;
			this.hideLoadingBar();
		};

		ListView.prototype.hideLoadingBar = function() {
			if (!this._$domResult)
				return false;
			if (this._pullDirection == 'down') {
				this.$element.scrollTop(0);
			} else if (this._pullDirection == 'up') {
				this.$element.scrollTop(this.$element[0].scrollHeight);
			}
			//this.config.isLoading = false;
			this.config.insertDOM = false;
			this._$domResult.remove();
			this.isPulling = false;
			this.config.itemSwipeEnable = true;
		}

		ListView.prototype.on = function(event, callback) {
			if ( typeof event !== 'string') {
				console.log('on方法的第一个参数必须为字符串');
				return false;
			}
			switch (event) {
				case "pullDown":
					this.pullDown(callback);
					break;
				case "pullUp":
					this.pullUp(callback);
					break;
				case "tapHold":
					this.tapHold(callback);
					break;
				case "itemSwipeLeft":
					this.itemSwipeLeft(callback);
					break;
				case "itemSwipeRight":
					this.itemSwipeRight(callback);
					break;
				case "itemClick":
					this.itemClick(callback);
					break;
				case "itemDelete":
					this.itemDelete(callback);
					break;
			}

			return this;
		};

		ListView.prototype.pullDown = function(callback) {
			if ( typeof callback == 'function') {
				this.config.pullDownEnable = true;
				this._events.on('pullDown', callback);
			}
			return this;
		};

		ListView.prototype.pullUp = function(callback) {
			if ( typeof callback == 'function') {
				this.config.pullUpEnable = true;
				this._events.on('pullUp', callback);
			}
			return this;
		};

		ListView.prototype.tapHold = function(callback) {
			if ( typeof callback == 'function') {
				this.config.tapHoldEnable = true;
				this._events.on("longTap", callback);
			}
			return this;
		};

		ListView.prototype.itemClick = function(callback) {
			var self = this;
			if ( typeof callback == 'function') {
				this._events.on("itemClick", callback);
				if (!this.config.itemClickEnable) {
					this.$list.delegate('.um-listview-row', 'click', function(e) {
						window.event.preventDefault();		
						var $target = $(this);
						var $swipeBtns = $target.find(".um-swipe-btns");
						var rowIndex = $target.index();
						var args = {
							rowIndex : rowIndex,
							$target : $target
						}
						if($swipeBtns.length && $swipeBtns.find(e.target).length)return;
						self._events.trigger("itemClick", self, args);  
					});
					self.config.itemClickEnable = true;
				}
			}
			return this;
		};

		ListView.prototype.itemDelete = function(callback) {
			var self = this;
			if ( typeof callback == 'function') {
				this._events.on("itemDelete", function(sender, args) {
					var $domSideMenu = args.$target.find('.um-swipe-btns');
					$domSideMenu.removeClass('um-swipe-open');
					callback(sender, args);
				});
				if (!this.config.itemDeleteEnable) {
					this.$list.delegate('.um-listview-row ' + '.um-delete', 'click', function(e) {
						e.stopPropagation();
						e.preventDefault();
						var $target = $(this).closest('li');
						var rowIndex = $target.index();
						var args = {
							rowIndex : rowIndex,
							$target : $target
						}
						self._events.trigger("itemDelete", self, args);
					});
					this.config.itemDeleteEnable = true;
				}
			}
			return this;
		};

		ListView.prototype.itemSwipeLeft = function(callback) {
			if ( typeof callback == 'function') {
				this.config.itemSwipeEnable = true;
				this._events.on('itemSwipeLeft', callback);
			}
			return this;
		};

		ListView.prototype.itemSwipeRight = function(callback) {
			if ( typeof callback == 'function') {
				this.config.itemSwipeEnable = true;
				this._events.on('itemSwipeRight', callback);
			}
			return this;
		};

		ListView.prototype.showItemMenu = function($elem) {
			if ( typeof $elem !== 'object')
				return false;
			var $domSideMenu = $elem.find('.um-swipe-btns');
			var $domSideMenu_w = $domSideMenu.width();
			$domSideMenu.addClass('um-swipe-open');
			$elem.children('.um-list-item').css('transform', 'translate3d(' + (-$domSideMenu_w) + 'px,0,0)');
		};

		ListView.prototype.hideItemMenu = function($elem) {
			if ( typeof $elem !== 'object')
				return false;
			var $domSideMenu = $elem.find('.um-swipe-btns');
			$domSideMenu.removeClass('um-swipe-open');
			$elem.children('.um-list-item').css('transform', 'translate3d(0,0,0)');

		};

		window.UM.ListView = ListView;
		window.UM.listview = function(selector, opts) {
			return new ListView(selector, opts);
		};
	}));
