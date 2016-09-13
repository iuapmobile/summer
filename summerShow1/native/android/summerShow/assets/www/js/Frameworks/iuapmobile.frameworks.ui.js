/*
 * Summer UI JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 3.0.0.20160823.2047
 */ 
var UM = UM || {};
UM.UI = UM.UI || {};

UM.UI.eventType = UM.UI.eventType || {
	down: "mousedown",
	move: "mousemove",
	up: "mouseup"
};
UM.UI.isMobile = false;// 判断是否是移动可触摸设备

if ("ontouchstart" in document) {
	UM.UI.eventType = {
		down: "touchstart",
		move: "touchmove",
		up: "touchend"
	};
	UM.UI.isMobile = true;
}

$(function() {
	// 远程调试 
	/*(function(e) {
		e.setAttribute("src", "http://10.2.112.94:8080/target/target-script-min.js#anonymous");
		document.getElementsByTagName("body")[0].appendChild(e);
	})(document.createElement("script"));
	*/
	//解决ios上无激活状态的问题
	document.body.addEventListener('touchstart', function() {});

	//消除点击click延迟
	//FastClick.attach(document.body);
	
	$(document).on("touchmove", ".overlay", function(e) {
		e.preventDefault();
		return false;
	})
	
});
/*window.addEventListener('load', function() {
	setTimeout(function() {
		window.scrollTo(0, 1);
	}, 20);
});*/
/* 折叠菜单 */ 
;
+function($) {
  'use strict';
  $(function() {
    var openBtn = '.um-collapse-btn';
    var collapse = function(e) {
      var openList;
      var targetName = $(this).data("target");
      openList = targetName ? $("#" + targetName) : $(this).siblings(".um-collapse-content");
      if (openList.is(":visible")) {
        openList.slideUp("fast");
        openList.parent().removeClass("um-open");
      } else {
        openList.slideDown("fast");
        openList.parent().addClass("um-open");
      }
      e.preventDefault();
    };
    $(document).on("click", openBtn, collapse);
  })
}(jQuery);
/**
*	@name							Elastic
*	@descripton						Elastic is jQuery plugin that grow and shrink your textareas automatically
*	@version						1.6.10
*	@requires						jQuery 1.2.6+
*
*	@author							Jan Jarfalk
*	@author-email					jan.jarfalk@unwrongest.com
*	@author-website					http://www.unwrongest.com
*
*	@licence						MIT License - http://www.opensource.org/licenses/mit-license.php
*/
;
(function(jQuery){ 
	jQuery.fn.extend({  
		elastic: function() {
		
			//	We will create a div clone of the textarea
			//	by copying these attributes from the textarea to the div.
			var mimics = [
				'paddingTop',
				'paddingRight',
				'paddingBottom',
				'paddingLeft',
				'fontSize',
				'lineHeight',
				'fontFamily',
				'width',
				'fontWeight',
				'border-top-width',
				'border-right-width',
				'border-bottom-width',
				'border-left-width',
				'borderTopStyle',
				'borderTopColor',
				'borderRightStyle',
				'borderRightColor',
				'borderBottomStyle',
				'borderBottomColor',
				'borderLeftStyle',
				'borderLeftColor'
				];
			
			return this.each( function() {
				
				// Elastic only works on textareas
				if ( this.type !== 'textarea' ) {
					return false;
				}
					
			var $textarea	= jQuery(this),
				$twin		= jQuery('<div />').css({'position': 'absolute','display':'none','word-wrap':'break-word'}),
				lineHeight	= parseInt($textarea.css('line-height'),10) || parseInt($textarea.css('font-size'),'10'),
				minheight	= parseInt($textarea.css('height'),10) || lineHeight*3,
				maxheight	= parseInt($textarea.css('max-height'),10) || Number.MAX_VALUE,
				goalheight	= 0;
				
				// Opera returns max-height of -1 if not set
				if (maxheight < 0) { maxheight = Number.MAX_VALUE; }
					
				// Append the twin to the DOM
				// We are going to meassure the height of this, not the textarea.
				$twin.appendTo($textarea.parent());
				
				// Copy the essential styles (mimics) from the textarea to the twin
				var i = mimics.length;
				while(i--){
					$twin.css(mimics[i].toString(),$textarea.css(mimics[i].toString()));
				}
				
				// Updates the width of the twin. (solution for textareas with widths in percent)
				function setTwinWidth(){
					curatedWidth = Math.floor(parseInt($textarea.width(),10));
					if($twin.width() !== curatedWidth){
						$twin.css({'width': curatedWidth + 'px'});
						
						// Update height of textarea
						update(true);
					}
				}
				
				// Sets a given height and overflow state on the textarea
				function setHeightAndOverflow(height, overflow){
				
					var curratedHeight = Math.floor(parseInt(height,10));
					if($textarea.height() !== curratedHeight){
						$textarea.css({'height': curratedHeight + 'px','overflow':overflow});
						
						// Fire the custom event resize
						$textarea.trigger('resize');
						
					}
				}
				
				// This function will update the height of the textarea if necessary 
				function update(forced) {
					
					// Get curated content from the textarea.
					var textareaContent = $textarea.val().replace(/&/g,'&amp;').replace(/ {2}/g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />');
					
					// Compare curated content with curated twin.
					var twinContent = $twin.html().replace(/<br>/ig,'<br />');
					
					if(forced || textareaContent+'&nbsp;' !== twinContent){
					
						// Add an extra white space so new rows are added when you are at the end of a row.
						$twin.html(textareaContent+'&nbsp;');
						
						// Change textarea height if twin plus the height of one line differs more than 3 pixel from textarea height
						if(Math.abs($twin.height() + lineHeight - $textarea.height()) > 3){
							
							var goalheight = $twin.height()+lineHeight;
							if(goalheight >= maxheight) {
								setHeightAndOverflow(maxheight,'auto');
							} else if(goalheight <= minheight) {
								setHeightAndOverflow(minheight,'hidden');
							} else {
								setHeightAndOverflow(goalheight,'hidden');
							}
							
						}
						
					}
					
				}
				
				// Hide scrollbars
				$textarea.css({'overflow':'hidden'});
				
				// Update textarea size on keyup, change, cut and paste
				$textarea.bind('keyup change cut paste', function(){
					update(); 
				});
				
				// Update width of twin if browser or textarea is resized (solution for textareas with widths in percent)
				$(window).bind('resize', setTwinWidth);
				$textarea.bind('resize', setTwinWidth);
				$textarea.bind('update', update);
				
				// Compact textarea on blur
				$textarea.bind('blur',function(){
					if($twin.height() < maxheight){
						if($twin.height() > minheight) {
							$textarea.height($twin.height());
						} else {
							$textarea.height(minheight);
						}
					}
				});
				
				// And this line is to catch the browser paste event
				$textarea.bind('input paste',function(e){ setTimeout( update, 250); });				
				
				// Run update once when elastic is initialized
				update();
				
			});
			
        } 
    }); 
})(jQuery);
// 多行文本自适应高度的调用
$("textarea.form-control").elastic();
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
  function _UModal(type, options) {
    if (options && (options.constructor === String)) {
      this.settings = $.extend({}, this.defaults, {
        title: options,
        text: ""
      });
    } else {
      this.settings = $.extend({}, this.defaults, options);
    }
    this.type = type;
    this._init();
  }
    _UModal.prototype = {
        constructor: _UModal,

        overlay: $('<div class="um-overlay"></div>'),

        defaults: {
            title: window.location.host || "",
            text: "",
            btnText: ["取消", "确定"],
            overlay: true,
            cancle: function() {},
            ok: function(data) {}
        },

        done: function(fn) {
            if (typeof fn === "function" && this._complete) {
                fn.call(this);
            }
        },

        _generateHTML: function() {

            var settings = this.settings,
                type = this.type,
                html;

            html = '<div class="um-modal"><div class="um-modal-content um-border-bottom">';

            if (settings.title) {
                html += '<div class="um-modal-title">' + settings.title + '</div>';
            }
            if (settings.text) {
                html += '<div class="um-modal-text">';
                //if(type === "tips") html += '<span class="um-ani-rotate"></span>';
                html += settings.text + '</div>';
            }
            if (type === "prompt") {
                html += '<div class="um-modal-input"><input type="text" class="form-control"></div>';
            }

            if (type === "login") {
                html += '<div class="um-modal-input"><input type="text" class="form-control" placeholder="请输入账号"><input type="password" class="form-control" placeholder="请输入密码"></div>';
            }

            type === "toast" ? html += '</div>' : html += '</div><div class="um-modal-btns">';

            if (type === "confirm" || type === "login" || type === "prompt") {
                html += '<a href="#" class="btn cancle">' + settings.btnText[0] + '</a>';
            }

            if (type === "toast") {
                html += '</div>';
                var that=this;
                var duration=settings.duration? settings.duration:2000;
                setTimeout(function(){
                    that.destory(that.modal);
                },duration)
            } else {
                html += '<a href="#" class="btn ok">' + settings.btnText[1] +
                    '</a></div></div>';
            }

            if (type === "loading") {
                var text=settings.text? settings.text:'正在加载';
                var icons=settings.icons ? settings.icons:'ti-reload';
                html = '<div class="um-modal" style="background-color: rgba(0, 0, 0, 0.2);width: 150px;margin-left: -75px;padding: 20px;border-radius: 12px;"><div style="color: #ffffff;">'+text+'</div><span class="um-ani-rotate '+icons+'"></span></div>';
            }
            this.html = html;
        },
        _showModal: function() {

            this.settings.overlay && this.overlay.appendTo($('body')).fadeIn(300);

            var modal = $(this.html).appendTo($('body')),

                modalH = modal.outerHeight(),
                wh = window.innerHeight;
            console.log(modal);
            modal.css('top', (wh - modalH - 20) / 2);

            setTimeout(function() {
                modal.addClass('um-modal-in');
            }, 100);

            this.modal = modal;
            this._attachEvent();
        },
        _attachEvent: function() {
            var that = this;
            that.modal.on("click", '.btn', function(e) {
                e.preventDefault();
                if ($(this).hasClass('cancle')) {
                    setTimeout(function() {
                        that.settings.cancle(data)
                    }, 100);
                }
                if ($(this).hasClass('ok')) {
                    var input = that.modal.find('.form-control'),
                        inputLen = input.length,
                        data;
                    if (inputLen) {
                        if (inputLen == 1) data = that.modal.find('.form-control').val();
                        else {
                            data = [];
                            $.each(input, function() {
                                data.push(this.value);
                            });
                        }
                    }
                    setTimeout(function() {
                        that.settings.ok(data)
                    }, 100);
                }
                that.destory(that.modal);
            });
        },
        destory: function() {
            var that = this;
            this.modal.removeClass('um-modal-in').addClass('um-modal-out').on('webkitTransitionEnd', function() {
                that.modal.off('webkitTransitionEnd');
                that.modal.removeClass('um-modal-out');
                that.modal.remove();
            });
            // 避免遮罩闪烁
            this.settings.overlay && this.overlay.remove();
        },
        _init: function() {

            this._generateHTML();
            this._showModal();

            if (this.type === 'tips' || this.type === 'loading') {
                this._complete = 1;
            }
        }
    }
    var loadingModal=null;/*用来接收loading对象*/
    var api={
        alert: function (options) {
            var $alert='alert';
            return new _UModal($alert,options);
        },
        confirm: function (options) {
            var $confirm='confirm';
            return new _UModal($confirm,options);
        },
        prompt: function (options) {
            var $prompt='prompt';
            return new _UModal($prompt,options);
        },
        login: function (options) {
            var $login='login';
            return new _UModal($login,options);
        },
        toast: function (options) {
            var $toast='toast';
            return new _UModal($toast,options);
        },
        showLoadingBar: function (options) {
            var $loading='loading';
            loadingModal = new _UModal($loading,options);
            //eturn loadingModal;
        },
        hideLoadingBar: function () {
            console.log(loadingModal);
            loadingModal.destroy();
        }
    };
    $.extend(UM,api);
}))

;
(function(ROOT, struct, undefined) {
    "use strict";
    var lastTime = 0,
        nextFrame = ROOT.requestAnimationFrame ||
        ROOT.webkitRequestAnimationFrame ||
        ROOT.mozRequestAnimationFrame ||
        ROOT.msRequestAnimationFrame ||
        function(callback) {
            var currTime = struct.prototype.now(),
                delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
            lastTime = currTime + delay;
            return setTimeout(callback, delay);
        },
        cancelFrame = ROOT.cancelAnimationFrame ||
        ROOT.webkitCancelAnimationFrame ||
        ROOT.webkitCancelRequestAnimationFrame ||
        ROOT.mozCancelRequestAnimationFrame ||
        ROOT.msCancelRequestAnimationFrame ||
        clearTimeout;

    var _forEach = function (iterate) {
        var i = 0,
            len = this.length,
            item;
        for (; i < len; i++) {
            item = this[i];
            if (typeof item != 'undefined') {
                iterate(item, i, this);
            }
        }
    }

    function each(arr, iterate) {
        return 'forEach' in arr ? arr.forEach(iterate) : _forEach.call(arr, iterate)
    }

    struct.prototype = {
        constructor: struct,
        playing: false,
        complete: false,
        percent: 0,
        bindEvent: function() {
            this.events = {};
            this.finish(function() {
                this.complete = true;
            });
        },
        on: function(ev, callback) {
            if (typeof ev == 'object') {
                for (var e in ev) {
                    this.on(e, ev[e]);
                }
            } else {
                if (!this.events[ev]) {
                    this.events[ev] = [];
                }
                this.events[ev].push(callback);
            }
            return this;
        },
        fire: function(ev) {
            var self = this,
                args = [].slice.call(arguments, 1);
            each(this.events[ev] || [], function(callback) {
                if (typeof callback == 'function') {
                    callback.apply(self, args);
                }
            });
            return this;
        },
        now: Date.now || function() {
            return +new Date;
        },
        toggle: function() {
            return this.playing ? this.stop() : this.start();
        },
        reset: function() {
            this.timeout = 0;
            return this.step();
        },
        _start: function() {
            if (!this.playing) {
                this.playing = true;
                this.tweenTime = this.now();
                if (this.complete) {
                    this.complete = false;
                    this.timeout = 0;
                }
                this.step().fire('start');
            }
            return this;
        },
        _step: function() {

            var self = this,
                total = this.duration,
                now = this.now(),
                frameTime = this.playing ? now - this.tweenTime : 0;
            this.percent = total ? this.easeFunc.call(null, this.timeout = Math.max(0, Math.min(total, this.timeout + frameTime)), 0, total, total) / total : 1;
            this.tweenTime = now;
            this.frameTime = frameTime;
            this.fire('step', self.percent, self.duration - self.timeout);
            if (this.timeout < total) {
                // percent百分比  timeout执行时间ms,total总共时间
                // console.log(this.percent, this.timeout, total)
                // cancelFrame(this._timer);
                if (this.playing) {
                    this._timer = nextFrame(function() {
                        self.step();
                    });
                }
            } else {
                this.stop().fire('finish');
            }
            return this;
        },
        _stop: function() {
            if (this.playing) {
                this.playing = false;
                cancelFrame(this._timer);
                this.fire('stop');
            }
            return this;
        },
        _finish: function() {
            if (!this.complete) {
                this.timeout = this.duration;
                this.step();
            }
            return this;
        },
        frame: function(time, fn) {
            var isFunc = typeof time == 'function',
                frameTime = 0,
                offset = 0;
            return this.step(function() {
                var dur = isFunc ? time.call(this) : time;
                frameTime += this.frameTime;
                if (frameTime >= dur) {
                    frameTime %= dur;
                    fn.call(this, (frameTime - offset) / dur);
                    offset = frameTime;
                }
            });
        },
        setDuration: function(duration) {
            var ratio = this.duration ? this.timeout / this.duration : 0;
            this.timeout = ratio * (this.duration = parseFloat(duration) || 0);
            return this;
        },
        setTween: function(tween) {
            this.easeFunc = typeof tween == 'function' ? tween : function(t, b, c, d) {
                return c * t / d + b;
            };
            return this;
        }
    }

    each("start step stop finish".split(" "), function(prop) {
        struct.prototype[prop] = function(callback) {
            if (typeof callback == 'function') {
                return this.on(prop, callback);
            }
            return this['_' + prop]();
        }
    });

   ROOT.UM.progress = function (duration, easeFunc) {
        return new struct(duration, easeFunc);
    }
    
})(window, function(duration, easeFunc) {
    /*
     * 动画类
     * @param int(ms) duration 动画执行时间
     * @param Function easeFunc 缓动公式 eg:linear=function(t,b,c,d){return c*t/d+b;}
     *                          其它公式参见 https://github.com/zhangxinxu/Tween/blob/master/tween.js
     */
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(duration, easeFunc);
    }
    this.setDuration(duration).setTween(easeFunc).bindEvent();
});
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
    function Page() {
        if (sessionStorage.hasAjax) {
            sessionStorage.clear();
        }
        // 获取缓存hash路径
        var hashArr = sessionStorage.hashArr;
        this.hashArr = hashArr && JSON.parse(hashArr) || [];

        // settings为动态的,defaults静态变量
        this.settings = $.extend({}, this.defaults);

        // 动画animation事件监听
        this.endCurrent = false;
        this.endNext = false;
        this.animEndEventName = "webkitAnimationEnd";
        this.outClass = "";
        this.inClass = "";

        this._init();
    }
    Page.prototype = {
        constructor: Page,
        defaults: {
            target: null,
            isReverse: 0,
            transition: "um"
        },
        _init: function() {
            var settings = this.settings;
            //1、先去掉active
            var indexPage = $(".um-page.active").length;
            if(indexPage) {
                indexPage = $(".um-page.active").eq(0).index();
                $(".um-page.active").removeClass("active");
            }

            //2、data缓存原class
            $.each($(".um-page"), function() {
                var $this = $(this);
                $this.data("originalClassList", $this.attr("class"));
            });

            //3、重新设置active
            var act = $(sessionStorage.initActivePageId);
            if (act.length && act.hasClass("um-page")) {
                act.addClass("active");
            } else {
                $(".um-page").eq(indexPage).addClass("active");
            }
        },
        // 更新当前页指向
        _updateCurrent: function() {
            this.currPage = $(".um-page.active").eq(0);
            this.currId = this.currPage.attr("id");
        },
        // 改变页面
        changePage: function(options) {
            //1、获取setting
            //var options;
            if(typeof options === "string") {//#xxx形式
                options = {
                    target: options
                }
            }
            this.settings = $.extend(this.settings, options);

            //2、
            this._updateCurrent();
            if (this._checkSettings()) {
                this._pageAnimate();

                this.hashArr.push(this.currId);
                this._cacheActivePageId(this.settings.target.slice(1));
                if (this.hashArr.length) {
                    sessionStorage.hashArr = JSON.stringify(this.hashArr);
                }
            }
        },
        // 缓存可视页面id
        _cacheActivePageId: function(id) {
            sessionStorage.initActivePageId = "#" + id;
        },
        // um-back 返回
        back: function() {
            var len = this.hashArr.length,
                lastHash;
            if (len) {
                // 获取上条hash
                lastHash = this.hashArr[len - 1];

                this._updateCurrent();
                this.settings.target = "#" + lastHash;
                this.settings.isReverse = 1;
                this._pageAnimate();

                this._cacheActivePageId(lastHash);
                this.hashArr.pop();
                sessionStorage.hashArr = JSON.stringify(this.hashArr);

                this.settings.isReverse = 0; //全局变量，重置为默认值
            }
        },
        _checkSettings: function() {
            var settings = this.settings;

            //1、检查target
            var target = settings.target;
            var $target = $(target);
            if (!target || !$target || !$target.length || sessionStorage.initActivePageId === target) {
                return false; // 防止如首页链接到首页的错误导航
            }

            //2、检查当前page有无id
            if (!this.currId && this.currPage.hasClass("um-page")) {
                alert("请填写当前页page id,否则无法返回该页");
                return false;
            }
            return true;
        },
        _pageAnimate: function() {
            var settings = this.settings,
                _this = this,
                target = $(settings["target"]),
                currPage = this.currPage,
                animEndEventName = _this.animEndEventName,
                zi = target.index() < currPage.index();

            target.trigger("beforePageIn");//先新入
            currPage.trigger("beforePageOut");//后旧出

            // 设置较大的zindex,放置被覆盖
            if(zi && !settings.isReverse) {//目标小于当前，并且不反向
                target.addClass("um-page-forward");
            }
            if(!zi && settings.isReverse) {//目标大于当前，并且反向
                currPage.addClass("um-page-forward");
            }

            target.addClass("active");//目标页面设置为active
            // set in out Class
            _this._setTransitionClass(settings["transition"]);

            if (currPage.length) {
                currPage.addClass(_this.outClass).on(animEndEventName, function() {
                    currPage.off(animEndEventName);
                    _this.endCurrent = true;
                    if (_this.endNext) {
                        _this._resetPage(target, currPage);
                    }
                });
            }

            target.addClass(_this.inClass).on(animEndEventName, function() {
                target.off(animEndEventName);
                _this.endNext = true;
                if (_this.endCurrent) {
                    _this._resetPage(target, currPage);
                }
                setTimeout(function() {
                    target.trigger("afterPageIn");
                    currPage.trigger("afterPageOut");
                }, 300);
            });
        },

        _setTransitionClass: function(flag) {
            var isReverse = this.settings.isReverse;
            switch (flag) {
                case "um":
                    this.outClass = 'out um-left-out';
                    this.inClass = 'in um-right-in';
                    if (isReverse) {
                        this.outClass = 'out um-right-out';
                        this.inClass = 'in um-left-in';
                    }
                    break;
                case "f7":
                    this.outClass = 'um-center-to-left';
                    this.inClass = 'um-right-to-center';
                    if (isReverse) {
                        this.outClass = 'um-center-to-right';
                        this.inClass = 'um-left-to-center';
                    }
                    break;
                case "pop":
                    this.outClass = 'um-noeffect';
                    this.inClass = 'um-moveFromBottom';
                    if (isReverse) {
                        this.outClass = 'um-moveToBottom';
                        this.inClass = 'um-noeffect';
                    }
                    break;
                case "stretch":
                    this.outClass = 'um-left-out'; //um-scaleLeftOut
                    this.inClass = 'um-scaleRightIn';
                    if (isReverse) {
                        this.outClass = 'um-right-out'; //um-scaleRightOut
                        this.inClass = 'um-scaleLeftIn';
                    }
                    break;
                case "drop":
                    this.outClass = 'um-noeffect';
                    this.inClass = 'um-moveFromTop';
                    if (isReverse) {
                        this.outClass = 'um-moveToTop';
                        this.inClass = 'um-noeffect';
                    }
                    break;
                case "slideup":
                    this.outClass = 'um-moveToTop';
                    this.inClass = 'um-moveFromBottom';
                    if (isReverse) {
                        this.outClass = 'um-moveToBottom';
                        this.inClass = 'um-moveFromTop';
                    }
                    break;
                case "fade": // fade
                    this.outClass = 'um-fadeOut';
                    this.inClass = 'um-fadeIn';
                    break;
                case "slide_scale":
                    this.outClass = 'um-scaleDown';
                    this.inClass = 'um-moveFromRight';
                    if (isReverse) {
                        this.outClass = 'um-scaleDown';
                        this.inClass = 'um-moveFromLeft';
                    }
                    break;
                case "scale_down_up":
                    this.outClass = 'um-scaleDownUp';
                    this.inClass = 'um-scaleUp';
                    if (isReverse) {
                        this.outClass = 'um-scaleDown';
                        this.inClass = 'um-scaleUpDown';
                    }
                    break;
                case "drop":
                    this.outClass = 'um-noeffect';
                    this.inClass = 'um-moveFromTop';
                    if (isReverse) {
                        this.outClass = 'um-moveToTop';
                        this.inClass = 'um-noeffect';
                    }
                    break;
                case "rotate":
                    this.outClass = 'um-rotateOutNewspaper';
                    this.inClass = 'um-rotateInNewspaper';
                    break;
                case "push_left":
                    this.outClass = 'um-rotatePushLeft';
                    this.inClass = 'um-moveFromRight';
                    if (isReverse) {
                        this.outClass = 'um-rotatePushRight';
                        this.inClass = 'um-moveFromLeft';
                    }
                    break;
                case "push_top":
                    this.outClass = 'um-rotatePushTop';
                    this.inClass = 'um-rotatePullBottom';
                    if (isReverse) {
                        this.outClass = 'um-rotatePushBottom';
                        this.inClass = 'um-rotatePullTop';
                    }
                    break;
                default:
                    this.outClass = 'out um-left-out';
                    this.inClass = 'in um-right-in';
                    if (isReverse) {
                        this.outClass = 'out um-right-out';
                        this.inClass = 'in um-left-in';
                    }
                    break;
            }
        },
        _resetPage: function($target, $currpage) {
            var settings = this.settings;
            this.endCurrent = false;
            this.endNext = false;
            $currpage.attr('class', $currpage.data('originalClassList'));
            $target.attr('class', $target.data('originalClassList') + ' ' + "active");
        }
    }
    $(function(){
        UM.page = new Page();
    })
    
    // 必须去除点击事件默认事件，否则会修改hash值，造成页面闪动
    $(document).on("click", "a[href^=#]", function(e){
        e.preventDefault();
        // click必须去除点击事件默认行为，否则会修改hash值，造成页面闪动
    //}).on(eventType.up, "a[href^=#]", function(e) {
    // 如果是touchstart,touchend事件不能去除默认行为,否则无法绑定click以及mouse事件
        var $this = $(this),
            target = $this.attr("href"),
            isback = $this.hasClass("um-back"),
            dataTarget = $(this).data("target"),
            transition = $(this).data("transition") || UM.page.defaults.transition,
            link = $(this).data("url");
        isReverse = (isback || $this.data("reverse")) ? 1 : 0;
        try {
            if (isback) {
                UM.page.back();
            } else if (target.indexOf("##") >= 0) {
                return;
            } else if ($(target).length) {
                if ($this.parents(".um-sidebar").length) {
                    $(".overlay").trigger(UM.UI.eventType.down);
                }
                UM.page.changePage({
                    target: target,
                    isReverse: isReverse,
                    transition: transition
                });
            } else if (link) { // 只针对a标签
                var uid;
                $.get(link).done(function(html) {
                    if (!html) return;
                    var html = $(html);
                    uid = html[0].id;
                    if (!uid) {
                        uid = "page" + (new Date()).getTime();
                        html.attr("id", uid);
                    }
                    $("body").append(html);
                    html.data("originalClassList", html.attr("class"));
                    var target = "#" + uid;
                    UModal.loading(null, 300, function() {
                        UM.page.changePage({
                            target: target
                        });
                    })

                    if ($this.data("cache") == false) {
                        $(target).on("afterPageOut", function() {
                            $(this).remove();
                        })
                    } else {
                        $this.attr("href", "#" + uid);
                        link = null;
                    }
                    // 有页面请求就不缓存路径，避免出错
                    sessionStorage.hasAjax = 1;
                }).fail(function() {
                    console.log("链接错误...");
                });
            } else if(dataTarget=='share'){
                UM.share.open('#' + dataTarget);
            }
        } catch (e) {
            console.log(e);
        }
    })

    return UM.page;
}))

/* 固定行固定列表格 */
;
+ function($) {
  'use strict';
  $(function() {

    var table_container = $(".um-table-container");
    if (table_container.length) {
      var init = function() {
        $.each(table_container, function() {
          var $this = $(this),
            row_w = $this.find(".um-tb-data").data("row-width"),
            parent_w = $this.find(".um-tb-body").innerWidth(),
            left_w = $this.find(".um-tb-body-left").outerWidth() || 0,
            data_w = parent_w - left_w;

          var isRow = $this.hasClass("table-row-scroll"), //固定列，行滚动
            isCol = $this.hasClass("table-col-scroll"); //固定行，列滚动

          if (isCol) {
            $this.find(".um-tb-body-left,.um-tb-data").height("auto");
          }
          if (isRow) {
            $this.find(".um-tb-data").css("overflow-x", "hidden");
          }
          $this.find(".um-tb-header-title table,.um-tb-data-table").width(Math.max(data_w, row_w));
        });
      };
      init();
      window.addEventListener("resize", init);
      $(".um-tb-data").on("scroll", function(e) {
        var table_container = $(this).closest(".um-table-container");
        var s1 = table_container.find(".um-tb-body-left")[0],
          s2 = table_container.find(".um-tb-header-title")[0];
        s1 && (s1.children[0].style.top = "-" + this.scrollTop + "px");
        s2 && (s2.children[0].style.left = "-" + this.scrollLeft + "px");
      });
    }
  });
}(jQuery);
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
        define(["jquery", "base", "UM"],function() {
            return factory(global);
        });
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var $html = $("<span class='um-water'></span>");
        $(document).on("click", "[um-water]", function(e) {
            var target = $(this);
            var x, y;
            if (UM.UI.isMobile && e.originalEvent && e.originalEvent.changedTouches) {
                x = e.originalEvent.changedTouches[0]['pageX'];
                y = e.originalEvent.changedTouches[0]['pageY'];
            } else {
                x = e.pageX;
                y = e.pageY;
            }
            x = x - 150 - target.offset().left; // - $("body").scrollLeft() 
            y = y - 150 - target.offset().top; // - $("body").scrollTop() 

            $html.css({
                left: x,
                top: y
            });
            $html.on("webkitAnimationEnd", function(e) {
                $html.off("webkitAnimationEnd").remove();
                target.removeClass("oh pr");
            })
            target.addClass("oh pr").append($html);
        })
}))

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
    var activeDom = function(type,options){
        this.type = type;
        if(options){
            this.settings=options;
            var itemtarget='#actionsheet';
            this.open(itemtarget);
        }

    }
    activeDom.prototype = {
        constructor: activeDom,
        open: function (target, pushPageDirection) {

            var that = this;
            this.$target = target && $(target).length && $(target);
            if(target=='#actionsheet'){

                this._generateHTMl();
                this._showHtml();
                this.$target=this.actionSheet;
            }

            if (!this.$target || !this.$target.hasClass("um-" + this.type)) {
                return;
            }
            this.$target.addClass("active");
            var that=this;
            setTimeout(function () {
                that.$target.css('transform','translate3d(0, 0, 0)');
            },100)
            if (pushPageDirection) {
                var pushPageClass = "um-page-pushfrom" + pushPageDirection;
                this.$target.data("pushPageClass", pushPageClass);

                $(".um-page.active").addClass("um-transition-default").addClass(pushPageClass);
            }
            this.$overlay = pushPageDirection ? $('<div class="overlay" style="background-color:rgba(0,0,0,0.1)"></div>') : $('<div class="overlay"></div>');

            this.$target.before(this.$overlay);

            this.$overlay.on(UM.UI.eventType.down, function () {
                that.close();
            });
        },
        _generateHTMl: function () {
            var settings=this.settings ? this.settings :{};
            var type=this.type,
                that=this;
            if(type == 'actionsheet'){
                var $content=$('<div class="um-actionsheet" id="actionsheet"> <ul class="um-list um-list-corner"> <li> <div class="btn action-cancle">取消</div> </li> </ul> </div>');
                var $firstUl=$('<ul class="um-list um-list-corner"></ul>');
                $content.prepend($firstUl);
                if(settings.title){
                    var $title=$('<li> <p class="btn popup-title">'+settings.title+' </p> </li>');
                    $firstUl.append($title)
                }
                if(settings.items){
                    for(var i=0; i<settings.items.length;i++){
                        var $li=$('<li> <div class="btn action-item">'+settings.items[i]+'</div> </li>');
                        $firstUl.append($li);
                    }
                }
                that.content=$content;
            }


        },
        _showHtml: function () {
            var actionSheet=$(this.content).appendTo($('body'));
            $(this.content).css('transform','translate3d(0, 100%, 0)');
            this.actionSheet=actionSheet;
            this._attachEvent();
        },
        _attachEvent: function () {
            var that=this;
            that.actionSheet.on('click','.action-item', function (e) {
                e.preventDefault();
                var index=$('.um-actionsheet .action-item').index($(this));
                var callback=that.settings.callbacks[index];
                setTimeout(function() {
                    callback();
                }, 100);
                that.close();
                setTimeout(function () {
                    that.actionSheet.remove();
                },1000)
            });
            that.actionSheet.on('click','.action-cancle',function(){
                that.close();
                setTimeout(function () {
                    that.actionSheet.remove();
                },1000)
            })
        },

        close: function () {
            var that=this;
            if (!this.$target) {
                // 关闭所有
                $("um-" + this.type).removeClass("active");
                setTimeout(function () {
                    $("um-" + this.type).css('transform','translate3d(0, 100%, 0)');
                    that.$overlay.remove();
                },300)
            } else {
                this.$target.removeClass("active");
                setTimeout(function () {
                    that.$target.css('transform','translate3d(0, 100%, 0)');
                    that.$overlay.remove();
                },300)
            }


            var pushPageClass = this.$target.data("pushPageClass");
            if (pushPageClass) {
                $(".um-page.active").removeClass(pushPageClass).one("webkitTransitionEnd", function () {
                    $(this).removeClass("um-transition-default");
                })
            }
        }
    }

    UM.actionsheet= function (options) {
        var type='actionsheet';
        return new activeDom(type,options)
    };
    //UM.actionsheet = new activeDom("actionsheet");
    UM.share = new activeDom("share");
    UM.sidebar = new activeDom("sidebar");
    UM.poppicker = new activeDom("poppicker");
}))
/* 日期插件调用 */
;
(function(UM){
    var _picker = function(selector,json){
        this.defaults = {
            theme: "ios7",
            mode: "scroller",
            display: "bottom",
            animate: ""     
        };
        this.initmobscroll(selector,json);
    }
    _picker.prototype.initmobscroll = function(selector,json){
        var options = $.extend(json,this.defaults);
        $(selector).scroller('destroy').scroller(options);
    }
    UM.picker = function(selector,json) {
        return new _picker(selector,json);
    }
})(UM)
/*
$(document).ready(function(){
    var opts = {'date': {preset: 'date'},'datetime': {preset: 'datetime'},'time': {preset: 'time'},'select': {preset: 'select'}};
    $.each(opts,function(value,item){
        UM.picker(".um-scroller-"+ value,item);
    });    
});
*/
$(document).on("click", ".um-tabbar li,.um-footerbar-item",function(){
	$(this).addClass("active").siblings().removeClass("active");
})
// 解决IOS和低端安卓设备 checkbox和radio bug
$("label").on("change", function(e){
	$(this).addClass("um-label-change").siblings("label").addClass("um-label-change");
	setTimeout(function(){
		$(this).removeClass("um-label-change").siblings("label").removeClass("um-label-change");
	}.bind(this), 100);
})