//=========================================================================
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UM.Graphics
// Author iUAP Mobile
//-----------------------------------------------------------------------
/*!
 * UAP Mobile JavaScript Library v2.7.0
 */
(function(window, undefined) {
	if (!window.UM)
		window.UM = {};

	function WaterMark() {}

	WaterMark.prototype.watermark = function(options) {
		if (!options || typeof options !== "object")
			return;
		var self = this;
		/*  var canvas = document.createElement("canvas");*/
		var canvas = document.getElementById("test");
		var ctx = canvas.getContext("2d");
		var oImg;
		var imageFormat;
		var imageURL = "";

		if (options.src && options.target && typeof options.src == "string" && typeof options.target == "string") {
			//修正options属性
			if ( typeof options.watermark !== "string")
				options.watermark = "";
			if ( typeof options.watermarkStyle !== "object" || options.watermarkStyle == null)
				options.watermarkStyle = {};
			options.text = options.text || "";
			if ( typeof options.textStyle !== "object" || options.textStyle == null)
				options.textStyle = {};

			//创建水印，并转换canvas为图片保存到本地
			imageFormat = options.target.substr(options.target.lastIndexOf(".") + 1) || "png";
			oImg = document.createElement("img");
			//创建图片
			oImg.src = options.src;
			oImg.onload = function() {
				var oImgW = oImg.width;
				var oImgH = oImg.height;
				canvas.setAttribute("width", oImgW);
				canvas.setAttribute("height", oImgH);
				ctx.drawImage(oImg, 0, 0);
				try {
					options.text && self.addText(canvas, options.text, options.textStyle);
					if (options.watermark) {
						self.addWatermark(canvas, options.watermark, options.watermarkStyle, function(canvas) {
							imageURL = self.execImageURL(canvas, imageFormat);
							self.saveImageLocal(imageURL, options.target);
						});
					} else {
						imageURL = self.execImageURL(canvas, imageFormat);
						self.saveImageLocal(imageURL, options.target);
					}
				} catch(e) {
					alert(e.name + e.message);
				}
			};
		}

	};

	WaterMark.prototype.addText = function(canvas, text, textStyle) {
		var cansW = canvas.getAttribute("width");
		var cansH = canvas.getAttribute("height");
		var ctx = canvas.getContext("2d");
		var left = textStyle.left || 10;
		var right = textStyle.right;
		var top = textStyle.top;
		var bottom = textStyle.bottom || 10;
		if (!left) {
			ctx.textAlign = "end";
		}
		if (!top) {
			ctx.textBaseline = "bottom"
		}
		left = left || (cansW - right);
		top = top || (cansH - bottom);
		ctx.font = (textStyle.fontSize || 14) + "px " + (textStyle.fontFamily || "黑体");
		ctx.fillStyle = textStyle.color || "black";
		ctx.fillText(text, left, top);
	};

	WaterMark.prototype.addWatermark = function(canvas, watermark, watermarkStyle, callback) {
		var cansW = canvas.getAttribute("width");
		var cansH = canvas.getAttribute("height");
		var ctx = canvas.getContext("2d");
		var left = watermarkStyle.left;
		var top = watermarkStyle.top;
		var width = watermarkStyle.width;
		var height = watermarkStyle.height;

		var watermarkImg = document.createElement("img");
		watermarkImg.src = watermark;
		watermarkImg.onload = function() {
			var watermarkImgW = watermarkImg.width;
			var watermarkImgH = watermarkImg.height;
			watermarkWHRatio = watermarkImgW / watermarkImgH;
			if (!height && width) {
				height = width / watermarkWHRatio;
			}
			if (!width && height) {
				width = height * watermarkWHRatio;
			}
			if (!width || !height) {
				width = watermarkImgW;
				height = watermarkImgH;
			}
			left = left || ("right" in watermarkStyle) && (cansW - width - watermarkStyle.right) || (cansW - width - 10);
			top = top || (("bottom" in watermarkStyle) && (cansH - height - watermarkStyle.bottom)) || (cansH - height - 10);
			ctx.drawImage(watermarkImg, left, top, width, height);
			( typeof callback == "function") && callback(canvas);
		};
	};

	WaterMark.prototype.execImageURL = function(canvas, imageFormat) {
		imageFormat = "image/" + imageFormat;
		var imageURL = canvas.toDataURL(imageFormat);
		return imageURL;
	}

	WaterMark.prototype.saveImageLocal = function(imageURL, target) {
		var aLink = document.createElement("a");
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("click", false, false);
		//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
		aLink.download = target;
		aLink.href = imageURL;
		aLink.dispatchEvent(evt);
	};

	var webWaterMark = null;

	var graphics = {
		watermark : function(json) {
			/* json for example
			 {
			 src: "img/rose.jpg", //原图路径
			 target: "xy.png",//加水印后的图片名称
			 watermark: "img/app.png",//水印图片路径
			 watermarkStyle: {"width": 40, "height": 40, "right": 20, "bottom": 10},//水印图片样式，可选参数 ，默认右下方10px处，支持top、bottom、left、right、width、height
			 text: "这是水印文字内容",//水印文字内容
			 textStyle: {"fontSize": 20, "fontFamily": "宋体", "color": "red", "left": 20, "bottom": 10} //水印文字样式，可选参数，默认左下方10px处，支持fontFamily, fontSize, color,top、bottom、left、right、width、height
			 }
			 */
			try {
				if (!( webWaterMark instanceof WaterMark)) {
					webWaterMark = new waterMark();
				}
				webWaterMark.watermark(json);
			} catch(e) {
				console.warn(e.name + ":" + e.message);
			}

		},
	};
	window.UM.Graphics = graphics;
	return window.UM.Graphics;
})(window);

