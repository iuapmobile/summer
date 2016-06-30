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
        define(["jquery", "UM"],function() {
            return factory(global);
        });
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	function Imgmark(options) {
		var defaults = {
			"selector": "",//水印选择器
			"imgmark": "",//水印图片路径
			//水印样式设置，类css
			"style": {
				position: "absolute",
				opacity: .5,
				right: 5,
				bottom: 5
			},
			"text": "",//水印文字
			"textStyle": {
				position: "absolute",
				opacity: .8,
				left: 10,
				bottom: 10,
				color: "#fff",
				fontWeight: "bold"
			}
		}
		this.settings = $.extend(true, {}, defaults, options);

		var settings = this.settings,
			$el = this.settings.selector && $(this.settings.selector).length && $(this.settings.selector),
			imgmark = this.settings.imgmark,
			text = this.settings.text;

		if (!($el && (imgmark || text))) return;

		$el.wrap($("<div/>", {
			class: "pr ib"
		}))

		if (imgmark) {
			var mark = new Image();
			mark.onload = function() {
				$el.after($("<img/>", {
					"src": imgmark,
					"css": settings.style
				}));
			}
			mark.src = imgmark;
		}
		if (text) {
			$el.after($("<span/>", {
				"text": text,
				"css": settings.textStyle
			}))
		}
	}
	UM.imgMark = function(options) {
		return new Imgmark(options);
	}
	return UM.imgMark;
}))
