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
		function Calendar(selector, options) {
			try {
				this.$elem = $(selector);
				this.isUmStyle = this.$elem.hasClass("um-calendar");
				this._defaultEventMinutes = 0;
				this.init(options);
			} catch(e) {
				console.warn(e.name + e.message);
				return;
			}
		}


		Calendar.prototype.init = function(options) {
			//options配置
			var defaultOptions = {
				header : {
					left : "prev",
					center : "title",
					right : "next"
				},
				// time formats
				titleFormat : {
					month : "yyyy 年  MM 月",
					week : "yyyy 年 MMMM d[ yyyy]{ '&#8212;'[ MMM] d}",
					day : "yyyy/M/d"
				},
				columnFormat : {
					month : 'ddd',
					week : 'ddd M/d',
					day : 'dddd M/d'
				},
				timeFormat : {// for event elements
					"agenda" : 'HH:mm{ - HH:mm}' // default
				},

				// locale
				isRTL : false,
				firstDay : 0,
				allDayText : "全    天",
				axisFormat : "HH(:mm) 点",
				monthNames : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				monthNamesShort : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				dayNames : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				dayNamesShort : ["日", "一", "二", "三", "四", "五", "六"],
				buttonText : {
					today : '今天',
					month : '月',
					week : '周',
					day : '天'
				},
				defaultEventMinutes : 120
			};
			var eventAfterRender;
			var self = this;

			var _eventAfterRender = function(event, element, view) {
				var $elem = $(element);
				if (!self.isUmStyle)
					return;
				if ($elem.hasClass("fc-event-vert")) {
					$elem.css("width", "50px");
				}
				var periodDates = self._getPeriodDates(event);
				periodDates.forEach(function(date) {
					var $elem = view.element.find(".fc-day[data-date='" + date + "']");
					$elem.addClass("exist-event");
				});
			}
			var _viewDisplay = function(currentView) {
				if (!self.isUmStyle)
					return;
				var $elem = self.$elem;
				var parentHeight = $elem.parent().height();
				var headerHeight = $elem.find(".fc-header").height();
				var marginTop = parseInt($elem.css("margin-top") || 0);
				var marginBottom = parseInt($elem.css("margin-bottom") || 0);
				var contentHeight = parentHeight - headerHeight - marginTop - marginBottom;
				if (currentView.name === "agendaWeek" || currentView.name === "agendaDay") {
					currentView.setHeight(contentHeight);
				}
			}
			options = $.extend(true, {}, defaultOptions, options);

			//调整日历事件
			if (options.eventAfterRender == "function") {
				eventAfterRender = options.eventAfterRender;
				options.eventAfterRender = function(event, element, view) {
					eventAfterRender(event, element, view);
					_eventAfterRender(event, element, view);
				}
			} else {
				options.eventAfterRender = _eventAfterRender;
			}

			//调整视图渲染尺寸
			if (options.viewDisplay == "function") {
				viewDisplay = options.viewDisplay;
				options.viewDisplay = function(currentView) {
					viewDisplay(currentView);
					_viewDisplay(currentView);
				}
			} else {
				options.viewDisplay = _viewDisplay;
			}

			this._defaultEventMinutes = options.defaultEventMinutes;

			//构造fullCalendar实例
			this.$elem.fullCalendar(options);

			//设置fullCalendar风格
			if (this.isUmStyle) {
				this.$elem.addClass("um-calendar");
			}
		};

		//私有，返回两个日期间经历的日期数组
		Calendar.prototype._getPeriodDates = function(event) {
			var eventStart = event.start;
			var eventEnd = event.end;
			var periodDates = [];
			var date = "";
			var startDate = $.fullCalendar.formatDate(eventStart, "yyyy-MM-dd");
			var startTimeStamp = new Date(startDate).getTime();
			var endDate, endTimeStamp = 0, timeStamp = 0, periodLen = 0;

			if (event.allDay) {
				eventEnd = eventEnd ? eventEnd : eventStart;
			} else if (event.end == null) {
				eventEnd = new Date(eventStart.getTime() + this._defaultEventMinutes * 60 * 1000);

			}

			endDate = $.fullCalendar.formatDate(eventEnd, "yyyy-MM-dd");
			endTimeStamp = new Date(endDate).getTime();
			periodLen = (endTimeStamp - startTimeStamp) / (24 * 60 * 60 * 1000);

			for (var i = 0; i <= periodLen; i++) {
				timeStamp = startTimeStamp + i * 86400000;
				date = $.fullCalendar.formatDate(new Date(timeStamp), "yyyy-MM-dd");
				periodDates.push(date);
			}

			return periodDates;
		};

		//获取某一天包含的日程事件数组
		Calendar.prototype.getEvents = function(date) {
			var self = this;
			var events = [];
			var startDate;
			var endDate;
			var clientEvents = this.$elem.fullCalendar("clientEvents") || [];
			if(date){
				date = new Date(date);
				startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			    endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
			}
			clientEvents.forEach(function(clientEvent) {
				delete clientEvent.source;
				if(!date){
					events.push(clientEvent);
					return;
				}
				var eventStart = $.fullCalendar.parseDate(clientEvent.start);
				var eventEnd = clientEvent.end ? $.fullCalendar.parseDate(clientEvent.end) : null;
				if (clientEvent.allDay) {
					eventEnd = eventEnd || eventStart;
					eventEnd = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate(), 23, 59, 59);
					eventStart = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate(), 0, 0, 0);
				} else if (clientEvent.end == null) {
					eventEnd = new Date(eventStart.getTime() + self._defaultEventMinutes * 60 * 1000);
				}

				if (eventStart <= endDate && eventEnd >= startDate) {
					events.push(clientEvent);
				}
			});

			return events;
		};

		window.UM.Calendar = Calendar;
		window.UM.calendar = function(selector, opts) {
			if (selector == undefined)
				return;
			return new Calendar(selector, opts);
		}
	}));

