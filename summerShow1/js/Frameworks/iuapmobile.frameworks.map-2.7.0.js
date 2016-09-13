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
		function Map(selector, options) {
			this.$elem = $(selector);
			this._centerMarker = null;
			this.init(options);
		};

		Map.prototype.init = function(options) {
			var _id = this.$elem.attr("id");
			var _defaultOptions = {
				enableToolBar : false,
				enableScale : false,
				enableMapType : false,
				amapOptions : {
					center : [116.39, 39.9],
					zoom : 12, // 缩放级别
				}
			};

			if (this.$elem.length == 0 || !(_id)) {
				console.warn("页面中必须存在存放地图的区域，且该区域要有一个唯一的id值！");
				return;
			}

			var options = $.extend(true, {}, _defaultOptions, options);

			//创建地图实例
			this.map = new AMap.Map(_id, options.amapOptions);

			//添加基础插件
			if (options.enableToolBar) {
				this.addToolBar();
			}
			if (options.enableScale) {
				this.addScale();
			}
			if (options.enableMapType) {
				this.addMapType();
			}

			//设置地图高度
			this.$elem.parent().css("position", "relative").end().css({
				"position" : "absolute",
				"top" : 0,
				"left" : 0,
				"width" : "100%",
				"height" : "100%"
			});
		};

		//获取地图实例
		Map.prototype.getAMap = function() {
			return this.map;
		}

		Map.prototype.addToolBar = function(options) {
			var _self = this;
			if ( typeof options !== "object")
				options = {};
			this.map.plugin(["AMap.ToolBar"], function() {
				var _toolBar = new AMap.ToolBar(options);
				_self.map.addControl(_toolBar);
			});
		}

		Map.prototype.addScale = function() {
			var _self = this;
			if ( typeof options !== "object")
				options = {};
			this.map.plugin(["AMap.Scale"], function() {
				var _scale = new AMap.Scale();
				_self.map.addControl(_scale);
			});
		}
		Map.prototype.addMapType = function() {
			var _self = this;
			if ( typeof options !== "object")
				options = {};
			this.map.plugin(["AMap.MapType"], function() {
				var _mapType = new AMap.MapType();
				_self.map.addControl(_mapType);
			});
		}
		/**
		 * 地图上添加标记，删除标记
		 *
		 */
		Map.prototype.createMarker = function(markerObj, ifFitView) {
			/* markerObj结构：
			 {
			 icon: "http://js.webapi.amap.com/theme/v1.3/markers/b/loc.png",
			 position: [116.205467, 39.907761],
			 title:"鼠标滑过时标记提示内容",
			 content:"设置标注标签"
			 }
			 */
			if ( typeof markerObj !== "object") {
				console.warn("addMarker方法的第一个参数必须存在，而且为对象！");
				return;
			}
			if (!Array.isArray(markerObj.position) || (markerObj.position.length !== 2)) {
				console.warn("请设置标注经纬度数组！");
				return;
			}
			var _marker = new AMap.Marker({
				map : this.map,
				icon : markerObj.icon,
				position : [markerObj.position[0], markerObj.position[1]],
				offset : new AMap.Pixel(-12, -36)
			});
			_marker.setMap(this.map);

			markerObj.title && _marker.setTitle(markerObj.title);

			markerObj.content && _marker.setContent(markerObj.content);

			ifFitView && this.map.setFitView();

			return _marker;
		}

		Map.prototype.clearMarker = function(marker) {
			marker && this.map.clearMap(marker);
		}

		Map.prototype.createMarkers = function(markersArr, ifFitView) {
			/* markersArr结构：
			 [{
			 icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png",
			 position: [116.205467, 39.907761],
			 title:"鼠标滑过时标记提示内容",
			 label:"设置标注标签"
			 }]
			 */
			var _self = this;
			var _marker = null;
			var _markers = [];

			Array.isArray(markersArr) && markersArr.forEach(function(markerObj) {
				try {
					_marker = _self.createMarker(markerObj);
				} catch(e) {
					console.warn(e.name + e.message);
				}
				_marker && _markers.push(_marker);
			});

			ifFitView && this.map.setFitView();

			return _markers;
		}

		Map.prototype.clearAllMarkers = function() {
			var _self = this;
			var markers = this.getAllMarkers();
			Array.isArray(markers) && markers.forEach(function(marker) {
				_self.clearMarker(marker);
			});
		}

		Map.prototype.getAllMarkers = function() {
			var _markers = [];
			try {
				_markers = this.map.getAllOverlays("marker");
			} catch(e) {
				console.warn(e.name + e.message);
				return;
			}
			return _markers;
		}

		window.UM.Map = Map;
		window.UM.map = function(selector, opts) {
			return new Map(selector, opts);
		};
	}));

