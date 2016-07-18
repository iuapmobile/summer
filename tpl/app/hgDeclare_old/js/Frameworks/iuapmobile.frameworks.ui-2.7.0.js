var UM = UM || {};
UM.UI = UM.UI || {};

UM.UI.eventType = UM.UI.eventType || {
	down: "mousedown",
	move: "mousemove",
	up: "mouseup"
};
UM.UI.isMobile = false;

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
	document.body.addEventListener('touchstart', function() {});
	$(document).on("click", ".um-list-left-icon", function(e) {
		e.stopPropagation();
	});
	$(document).on("touchmove", ".overlay", function(e) {
		e.preventDefault();
		return false;
	});
	// tabbar的点击激活状态
	$(document).on("click", ".um-tabbar li,.um-tabbar-item",function(){
		$(this).addClass("active").siblings().removeClass("active");
	})

	if(UM.UI.isMobile) {
		// 解决checkbox和radio bug
		$("label").on("change", function(e){
			$(this).addClass("um-label-change").siblings("label").addClass("um-label-change");
			setTimeout(function(){
				$(this).removeClass("um-label-change").siblings("label").removeClass("um-label-change");
			}.bind(this), 100);
		})
	}
	
});
/*window.addEventListener('load', function() {
	setTimeout(function() {
		window.scrollTo(0, 1);
	}, 20);
});*//* 折叠菜单 */ 
+ function($) {
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
        openList.trigger("collapse.close");
      } else {
        openList.slideDown("fast");
        openList.parent().addClass("um-open");
        openList.trigger("collapse.open");
      }
      e.preventDefault();
    };
    $(document).on("click", openBtn, collapse);
  })
}(jQuery);+ function($) {
    'use strict';
    $(function() {
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
    })
}(jQuery);+ function($) {
  'use strict';
  $(function() {
    function _UModal(type, options) {
      if (options && (options.constructor === String)) {
        this.settings = $.extend({}, this.defaults, {
          title: "",
          text: options
        });
      } else {
        this.settings = $.extend({}, this.defaults, options);
      }
      this.type = type;
      this.init();
    }
    _UModal.countWindow = 0;
    _UModal.prototype = {
      constructor: _UModal,
      overlay: $('<div class="overlay"></div>'),
      defaults: {
        title: window.location.host || "",
        text: "",
        btnText: ["取消", "确定"],
        overlay: true,
        cancle: function() {},
        ok: function(data) {},
        delay: null,
        callback: null
      },
      init: function() {
        var that = this,
          settings = this.settings,
          type = this.type,
          isTips = type === "tips",
          overlay = this.overlay,
          html;

        html = '<div class="um-modal"><div class="um-modal-content"><div class="um-modal-title">' +
          settings.title + '</div><div class="um-modal-text">' +
          settings.text + '</div>';

        if (type === "prompt") {
          html += '<div class="um-modal-input"><input type="text" class="form-control"></div>';
        }
        if (type === "login") {
          html += '<div class="um-modal-input"><input type="text" class="form-control"><input type="text" class="form-control"></div>';
        }

        isTips ? html += '</div>' : html += '</div><div class="um-modal-btns">';

        if (type === "confirm" || type === "login") {
          html += '<a href="#" class="btn cancle">' + settings.btnText[0] + '</a>';
        }

        if (type === "tips") {
          html += '</div>';
        } else {
          html += '<a href="#" class="btn ok">' + settings.btnText[1] +
            '</a></div></div>';
        }

        if (type === "loading") {
          html = '<div class="um-modal" style="overflow:visible;"><div class="um-loading"><div></div><div></div></div></div>';
        }
        if (settings.overlay && _UModal.countWindow == 0) {
          that.overlay.appendTo($('body'));
        }

        var modal = $(html).appendTo($('body')),
          modalH = modal.outerHeight(),
          wh = window.innerHeight;
        modal.css('top', (wh - modalH - 20) / 2);
        setTimeout(function() {
          modal.addClass('um-modal-in');
        }, 0);
        _UModal.countWindow++;
        that.destory = destory;

        var delay = settings.delay;
        var callback = settings.callback;

        if (!isNaN(delay)) {
          setTimeout(function() {
            if (type === 'tips' || type === 'loading') {
              that.destory();
            }
            settings.callback && settings.callback();
          }, settings.delay);
        }

        modal.on("click", '.btn', function(e) {
          e.preventDefault();
          if ($(this).hasClass('cancle')) {
            settings.cancle();
          }
          if ($(this).hasClass('ok')) {
            var input = modal.find('.form-control'),
              inputLen = input.length,
              data;
            if (inputLen) {
              if (inputLen == 1) data = modal.find('.form-control').val();
              else {
                data = [];
                $.each(input, function() {
                  data.push(this.value);
                });
              }
            }
            settings.ok(data);
          }
          destory();
        });

        function destory() {
          modal.removeClass('um-modal-in').addClass('um-modal-out').on('webkitTransitionEnd', function() {
            modal.off('webkitTransitionEnd');
            modal.removeClass('um-modal-out');
            modal.remove();
            //that.countWindow--;
          });
          // 避免遮罩闪烁
          _UModal.countWindow--;
          if (settings.overlay && _UModal.countWindow == 0) {
            overlay.remove();
          }
        }
        return that;
      }
    }
    window.UM.modal = function(type, options) {
      return new _UModal(type, options);
    }
  });
}(jQuery);;
(function($, parent, undefined) {
    'use strict';
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
            $.each($(".um-page"), function() {
                var $this = $(this);
                $this.data("originalClassList", $this.attr("class"));
            });

            var act = $(sessionStorage.initActivePageId);
            if (act.length && act.hasClass("um-page")) {
                act.addClass("active");
            } else {
                $(".um-page").eq(0).addClass("active");
            }
            //this._updateCurrent();
        },
        // 更新当前页指向
        _updateCurrent: function() {
            this.currPage = $(".um-page.active").eq(0);
            this.currId = this.currPage.attr("id");
        },
        // 改变页面
        changePage: function(options) {
            this.settings = $.extend(this.settings, options);

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
            var target = settings.target;
            var $target = $(target);
            if (!target || !$target || !$target.length || sessionStorage.initActivePageId === target) {
                return false; // 防止如首页链接到首页的错误导航
            }
            if (!this.currId && this.currPage.hasClass("um-page")) {
                alert("请填写当前页page id,否则无法返回该页");
                return false;
            }
            return true;
        },
        _pageAnimate: function() {
            var settings = this.settings,
                _this = this,
                target = $(settings.target),
                currPage = this.currPage,
                animEndEventName = _this.animEndEventName;

            target.trigger("beforePageIn");
            currPage.trigger("beforePageOut");

            target.addClass("active");
            // set in out Class
            _this._setTransitionClass(settings.transition);

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
    $(function() {
        parent.page = new Page();
    })
})(jQuery, UM)

$(function() {
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
            } else if (dataTarget) {
                // popup / panel
                var $dataTarget = $("#" + dataTarget);
                var overlay = $('<div class="overlay"></div>');
                $dataTarget.before(overlay);
                overlay.on(UM.UI.eventType.down, function() {
                    $dataTarget.removeClass("active") //.on("webkitTransitionEnd", function(){
                        //$dataTarget.off("webkitTransitionEnd");
                    overlay.remove();
                    //});
                });
                $dataTarget.addClass("active");
            }
        } catch (e) {
            console.log(e);
        }
    })
});/*
 *  webui popover plugin  - v1.1.3
 *  A lightWeight popover plugin with jquery ,enchance the  popover plugin of bootstrap with some awesome new features. It works well with bootstrap ,but bootstrap is not necessary!
 *  https://github.com/sandywalker/webui-popover
 *
 *  Made by Sandy Duan
 *  Under MIT License
 */
;
(function($, window, document, undefined) {

    'use strict';

    // Create the defaults once
    var pluginName = 'popover';
    var pluginClass = 'um-popover';
    var pluginType = 'um.popover';
    var defaults = {
        placement: 'auto',
        width: 'auto',
        height: 'auto',
        trigger: 'click',
        style: '',
        delay: {
            show: null,
            hide: null
        },
        async: {
            before: null, //function(that, xhr){}
            success: null //function(that, xhr){}
        },
        cache: true,
        multi: false,
        arrow: true,
        title: '',
        content: '',
        closeable: false,
        padding: true,
        url: '',
        type: 'html',
        constrains: null,
        animation: null,
        template: '<div class="um-popover">' +
            '<div class="arrow"></div>' +
            '<div class="um-popover-inner">' +
            '<a href="#" class="close">x</a>' +
            '<h3 class="um-popover-title"></h3>' +
            '<div class="um-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div>' +
            '</div>' +
            '</div>',
        backdrop: false,
        dismissible: true,
        onShow: null,
        onHide: null
    };


    var popovers = [];
    var backdrop = $('<div class="um-popover-backdrop"></div>');
    var _globalIdSeed = 0;
    var $document = $(document);



    // The actual plugin constructor
    function Popover(element, options) {
        this.$element = $(element);
        if (options) {
            if ($.type(options.delay) === 'string' || $.type(options.delay) === 'number') {
                options.delay = {
                    show: options.delay,
                    hide: options.delay
                }; // bc break fix
            }
        }
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._targetclick = false;
        this.init();
        popovers.push(this.$element);
    }

    Popover.prototype = {
        //init webui popover
        init: function() {
            //init the event handlers
            if (this.getTrigger() === 'click') {
                this.$element.off('click').on('click', $.proxy(this.toggle, this));
            } else if (this.getTrigger() === 'hover') {
                this.$element
                    .off('mouseenter mouseleave click')
                    .on('mouseenter', $.proxy(this.mouseenterHandler, this))
                    .on('mouseleave', $.proxy(this.mouseleaveHandler, this));
                // .on('click', function(e) {
                //     e.stopPropagation();
                // });
            }
            this._poped = false;
            this._inited = true;
            this._opened = false;
            this._idSeed = _globalIdSeed;
            if (this.options.backdrop) {
                backdrop.appendTo(document.body).hide();
            }
            _globalIdSeed++;
        },
        /* api methods and actions */
        destroy: function() {
            var index = -1;

            for (var i = 0; i < popovers.length; i++) {
                if (popovers[i] === this.$element) {
                    index = i;
                    break;
                }
            }

            popovers.splice(index, 1);


            this.hide();
            this.$element.data('plugin_' + pluginName, null);
            if (this.getTrigger() === 'click') {
                this.$element.off('click');
            } else if (this.getTrigger() === 'hover') {
                this.$element.off('mouseenter mouseleave');
            }
            if (this.$target) {
                this.$target.remove();
            }
        },
        hide: function(event) {
            if (!this._opened) {
                return;
            }
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.xhr) {
                this.xhr.abort();
                this.xhr = null;
            }
            var e = $.Event('hide.' + pluginType);
            this.$element.trigger(e);
            if (this.$target) {
                this.$target.removeClass('in').hide();
            }
            if (this.options.backdrop) {
                backdrop.hide();
            }
            this._opened = false;
            this.$element.trigger('hidden.' + pluginType);

            if (this.options.onHide) {
                this.options.onHide(this.$target);
            }

        },
        toggle: function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            this[this.getTarget().hasClass('in') ? 'hide' : 'show']();
        },
        hideAll: function() {
            for (var i = 0; i < popovers.length; i++) {
                popovers[i].popover('hide');
            }

            $document.trigger('hiddenAll.' + pluginType);
        },
        /*core method ,show popover */
        show: function() {

            var
                $target = this.getTarget().removeClass().addClass(pluginClass).addClass(this._customTargetClass);
            if (!this.options.multi) {
                this.hideAll();
            }
            if (this._opened) {
                return;
            }
            // use cache by default, if not cache setted  , reInit the contents 
            if (!this.getCache() || !this._poped || this.content === '') {
                this.content = '';
                this.setTitle(this.getTitle());
                if (!this.options.closeable) {
                    $target.find('.close').off('click').remove();
                }
                if (!this.isAsync()) {
                    this.setContent(this.getContent());
                } else {
                    this.setContentASync(this.options.content);
                    this.displayContent();
                    return;
                }
                $target.show();
            }
            this.displayContent();

            if (this.options.onShow) {
                this.options.onShow($target);
            }

            this.bindBodyEvents();
            if (this.options.backdrop) {
                backdrop.show();
            }
            this._opened = true;
        },
        displayContent: function() {
            var
            //element postion
                elementPos = this.getElementPosition(),
                //target postion
                $target = this.getTarget().removeClass().addClass(pluginClass).addClass(this._customTargetClass),
                //target content
                $targetContent = this.getContentElement(),
                //target Width
                targetWidth = $target[0].offsetWidth,
                //target Height
                targetHeight = $target[0].offsetHeight,
                //placement
                placement = 'bottom',
                e = $.Event('show.' + pluginType);
            //if (this.hasContent()){
            this.$element.trigger(e);
            //}
            if (this.options.width !== 'auto') {
                $target.width(this.options.width);
            }
            if (this.options.height !== 'auto') {
                $targetContent.height(this.options.height);
            }

            //init the popover and insert into the document body
            if (!this.options.arrow) {
                $target.find('.arrow').remove();
            }
            $target.detach().css({
                top: -2000,
                left: -2000,
                display: 'block'
            });
            if (this.getAnimation()) {
                $target.addClass(this.getAnimation());
            }
            $target.appendTo(document.body);
            targetWidth = $target[0].offsetWidth;
            targetHeight = $target[0].offsetHeight;
            placement = this.getPlacement(elementPos);
            this.initTargetEvents();
            var postionInfo = this.getTargetPositin(elementPos, placement, targetWidth, targetHeight);
            this.$target.css(postionInfo.position).addClass(placement).addClass('in');

            if (this.options.type === 'iframe') {
                var $iframe = $target.find('iframe');
                $iframe.width($target.width()).height($iframe.parent().height());
            }

            if (this.options.style) {
                this.$target.addClass(pluginClass + '-' + this.options.style);
            }

            if (!this.options.padding) {
                $targetContent.css('height', $targetContent.outerHeight());
                this.$target.addClass('um-no-padding');
            }
            if (!this.options.arrow) {
                this.$target.css({
                    'margin': 0
                });
            }
            if (this.options.arrow) {
                var $arrow = this.$target.find('.arrow');
                $arrow.removeAttr('style');
                if (postionInfo.arrowOffset) {
                    $arrow.css(postionInfo.arrowOffset);
                }
            }
            this._poped = true;
            this.$element.trigger('shown.' + pluginType);
        },

        isTargetLoaded: function() {
            return this.getTarget().find('i.glyphicon-refresh').length === 0;
        },

        /*getter setters */
        getTriggerElement: function() {
            return this.$element;
        },
        getTarget: function() {
            if (!this.$target) {
                var id = pluginName + this._idSeed;
                this.$target = $(this.options.template)
                    .attr('id', id)
                    .data('trigger-element', this.getTriggerElement());
                this._customTargetClass = this.$target.attr('class') !== pluginClass ? this.$target.attr('class') : null;
                this.getTriggerElement().attr('data-target', id);
            }
            return this.$target;
        },
        getTitleElement: function() {
            return this.getTarget().find('.' + pluginClass + '-title');
        },
        getContentElement: function() {
            return this.getTarget().find('.' + pluginClass + '-content');
        },
        getTitle: function() {
            return this.$element.attr('data-title') || this.options.title || this.$element.attr('title');
        },
        getUrl: function() {
            return this.$element.attr('data-url') || this.options.url;
        },
        getCache: function() {
            var dataAttr = this.$element.attr('data-cache');
            if (typeof(dataAttr) !== 'undefined') {
                switch (dataAttr.toLowerCase()) {
                    case 'true':
                    case 'yes':
                    case '1':
                        return true;
                    case 'false':
                    case 'no':
                    case '0':
                        return false;
                }
            }
            return this.options.cache;
        },
        getTrigger: function() {
            return this.$element.attr('data-trigger') || this.options.trigger;
        },
        getDelayShow: function() {
            var dataAttr = this.$element.attr('data-delay-show');
            if (typeof(dataAttr) !== 'undefined') {
                return dataAttr;
            }
            return this.options.delay.show === 0 ? 0 : this.options.delay.show || 100;
        },
        getHideDelay: function() {
            var dataAttr = this.$element.attr('data-delay-hide');
            if (typeof(dataAttr) !== 'undefined') {
                return dataAttr;
            }
            return this.options.delay.hide === 0 ? 0 : this.options.delay.hide || 100;
        },
        getConstrains: function() {
            var dataAttr = this.$element.attr('data-contrains');
            if (typeof(dataAttr) !== 'undefined') {
                return dataAttr;
            }
            return this.options.constrains;
        },
        getAnimation: function() {
            var dataAttr = this.$element.attr('data-animation');
            return dataAttr || this.options.animation;
        },
        setTitle: function(title) {
            var $titleEl = this.getTitleElement();
            if (title) {
                $titleEl.html(title);
            } else {
                $titleEl.remove();
            }
        },
        hasContent: function() {
            return this.getContent();
        },
        getContent: function() {
            if (this.getUrl()) {
                if (this.options.type === 'iframe') {
                    this.content = $('<iframe frameborder="0"></iframe>').attr('src', this.getUrl());
                }
            } else if (!this.content) {
                var content = '';
                if ($.isFunction(this.options.content)) {
                    content = this.options.content.apply(this.$element[0], arguments);
                } else {
                    content = this.options.content;
                }
                this.content = this.$element.attr('data-content') || content;
            }
            return this.content;
        },
        setContent: function(content) {
            var $target = this.getTarget();
            this.getContentElement().html(content);
            this.$target = $target;
        },
        isAsync: function() {
            return this.options.type === 'async';
        },
        setContentASync: function(content) {
            var that = this;
            this.xhr = $.ajax({
                url: this.getUrl(),
                type: 'GET',
                cache: this.getCache(),
                beforeSend: function(xhr) {
                    if (that.options.async.before) {
                        that.options.async.before(that, xhr);
                    }
                },
                success: function(data) {
                    that.bindBodyEvents();
                    if (content && $.isFunction(content)) {
                        that.content = content.apply(that.$element[0], [data]);
                    } else {
                        that.content = data;
                    }
                    that.setContent(that.content);
                    var $targetContent = that.getContentElement();
                    $targetContent.removeAttr('style');
                    that.displayContent();
                    if (that.options.async.success) {
                        that.options.async.success(that, data);
                    }
                    this.xhr = null;
                }
            });
        },

        bindBodyEvents: function() {
            if (this.options.dismissible) {
                $('body').off('keyup.um-popover').on('keyup.um-popover', $.proxy(this.escapeHandler, this));
                $('body').off('click.um-popover').on('click.um-popover', $.proxy(this.bodyClickHandler, this));
            }
        },

        /* event handlers */
        mouseenterHandler: function() {
            var self = this;
            if (self._timeout) {
                clearTimeout(self._timeout);
            }
            self._enterTimeout = setTimeout(function() {
                if (!self.getTarget().is(':visible')) {
                    self.show();
                }
            }, this.getDelayShow());
        },
        mouseleaveHandler: function() {
            var self = this;
            clearTimeout(self._enterTimeout);
            //key point, set the _timeout  then use clearTimeout when mouse leave
            self._timeout = setTimeout(function() {
                self.hide();
            }, this.getHideDelay());
        },
        escapeHandler: function(e) {
            if (e.keyCode === 27) {
                this.hideAll();
            }
        },
        bodyClickHandler: function() {
            if (this.getTrigger() === 'click') {
                if (this._targetclick) {
                    this._targetclick = false;
                } else {
                    this.hideAll();
                }
            }
        },

        targetClickHandler: function() {
            this._targetclick = true;
        },

        //reset and init the target events;
        initTargetEvents: function() {
            if (this.getTrigger() === 'hover') {
                this.$target
                    .off('mouseenter mouseleave')
                    .on('mouseenter', $.proxy(this.mouseenterHandler, this))
                    .on('mouseleave', $.proxy(this.mouseleaveHandler, this));
            }
            this.$target.find('.close').off('click').on('click', $.proxy(this.hide, this));
            this.$target.off('click.um-popover').on('click.um-popover', $.proxy(this.targetClickHandler, this));
        },
        /* utils methods */
        //caculate placement of the popover
        getPlacement: function(pos) {
            var
                placement,
                de = document.documentElement,
                db = document.body,
                clientWidth = de.clientWidth,
                clientHeight = de.clientHeight,
                scrollTop = Math.max(db.scrollTop, de.scrollTop),
                scrollLeft = Math.max(db.scrollLeft, de.scrollLeft),
                pageX = Math.max(0, pos.left - scrollLeft),
                pageY = Math.max(0, pos.top - scrollTop);
            //arrowSize = 20;

            //if placement equals auto，caculate the placement by element information;
            if (typeof(this.options.placement) === 'function') {
                placement = this.options.placement.call(this, this.getTarget()[0], this.$element[0]);
            } else {
                placement = this.$element.data('placement') || this.options.placement;
            }


            if (placement === 'auto') {
                var constrainsH = this.getConstrains() === 'horizontal',
                    constrainsV = this.getConstrains() === 'vertical';
                if (pageX < clientWidth / 3) {
                    if (pageY < clientHeight / 3) {
                        placement = constrainsH ? 'right-bottom' : 'bottom-right';
                    } else if (pageY < clientHeight * 2 / 3) {
                        if (constrainsV) {
                            placement = pageY <= clientHeight / 2 ? 'bottom-right' : 'top-right';
                        } else {
                            placement = 'right';
                        }
                    } else {
                        placement = constrainsH ? 'right-top' : 'top-right';
                    }
                    //placement= pageY>targetHeight+arrowSize?'top-right':'bottom-right';
                } else if (pageX < clientWidth * 2 / 3) {
                    if (pageY < clientHeight / 3) {
                        if (constrainsH) {
                            placement = pageX <= clientWidth / 2 ? 'right-bottom' : 'left-bottom';
                        } else {
                            placement = 'bottom';
                        }
                    } else if (pageY < clientHeight * 2 / 3) {
                        if (constrainsH) {
                            placement = pageX <= clientWidth / 2 ? 'right' : 'left';
                        } else {
                            placement = pageY <= clientHeight / 2 ? 'bottom' : 'top';
                        }
                    } else {
                        if (constrainsH) {
                            placement = pageX <= clientWidth / 2 ? 'right-top' : 'left-top';
                        } else {
                            placement = 'top';
                        }
                    }
                } else {
                    //placement = pageY>targetHeight+arrowSize?'top-left':'bottom-left';
                    if (pageY < clientHeight / 3) {
                        placement = constrainsH ? 'left-bottom' : 'bottom-left';
                    } else if (pageY < clientHeight * 2 / 3) {
                        if (constrainsV) {
                            placement = pageY <= clientHeight / 2 ? 'bottom-left' : 'top-left';
                        } else {
                            placement = 'left';
                        }
                    } else {
                        placement = constrainsH ? 'left-top' : 'top-left';
                    }
                }
            } else if (placement === 'auto-top') {
                if (pageX < clientWidth / 3) {
                    placement = 'top-right';
                } else if (pageX < clientHeight * 2 / 3) {
                    placement = 'top';
                } else {
                    placement = 'top-left';
                }
            } else if (placement === 'auto-bottom') {
                if (pageX < clientWidth / 3) {
                    placement = 'bottom-right';
                } else if (pageX < clientHeight * 2 / 3) {
                    placement = 'bottom';
                } else {
                    placement = 'bottom-left';
                }
            } else if (placement === 'auto-left') {
                if (pageY < clientHeight / 3) {
                    placement = 'left-top';
                } else if (pageY < clientHeight * 2 / 3) {
                    placement = 'left';
                } else {
                    placement = 'left-bottom';
                }
            } else if (placement === 'auto-right') {
                if (pageY < clientHeight / 3) {
                    placement = 'right-top';
                } else if (pageY < clientHeight * 2 / 3) {
                    placement = 'right';
                } else {
                    placement = 'right-bottom';
                }
            }
            return placement;
        },
        getElementPosition: function() {
            return $.extend({}, this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            });
        },

        getTargetPositin: function(elementPos, placement, targetWidth, targetHeight) {
            var pos = elementPos,
                elementW = this.$element.outerWidth(),
                elementH = this.$element.outerHeight(),
                position = {},
                arrowOffset = null,
                arrowSize = this.options.arrow ? 20 : 0,
                fixedW = 8,
                fixedH = 8;
                /*fixedW = elementW < arrowSize + 10 ? arrowSize : 0,
                fixedH = elementH < arrowSize + 10 ? arrowSize : 0;*/

            switch (placement) {
                case 'bottom':
                    position = {
                        top: pos.top + pos.height,
                        left: pos.left + pos.width / 2 - targetWidth / 2
                    };
                    break;
                case 'top':
                    position = {
                        top: pos.top - targetHeight,
                        left: pos.left + pos.width / 2 - targetWidth / 2
                    };
                    break;
                case 'left':
                    position = {
                        top: pos.top + pos.height / 2 - targetHeight / 2,
                        left: pos.left - targetWidth
                    };
                    break;
                case 'right':
                    position = {
                        top: pos.top + pos.height / 2 - targetHeight / 2,
                        left: pos.left + pos.width
                    };
                    break;
                case 'top-right':
                    position = {
                        top: pos.top - targetHeight,
                        left: pos.left - fixedW
                    };
                    arrowOffset = {
                        left: Math.min(elementW, targetWidth) / 2 + fixedW
                    };
                    break;
                case 'top-left':
                    position = {
                        top: pos.top - targetHeight,
                        left: pos.left - targetWidth + pos.width + fixedW
                    };
                    arrowOffset = {
                        left: targetWidth - Math.min(elementW, targetWidth) / 2 - fixedW
                    };
                    break;
                case 'bottom-right':
                    position = {
                        top: pos.top + pos.height,
                        left: pos.left - fixedW
                    };
                    arrowOffset = {
                        left: Math.min(elementW, targetWidth) / 2 + fixedW
                    };
                    break;
                case 'bottom-left':
                    position = {
                        top: pos.top + pos.height,
                        left: pos.left - targetWidth + pos.width + fixedW
                    };
                    arrowOffset = {
                        left: targetWidth - Math.min(elementW, targetWidth) / 2 - fixedW
                    };
                    break;
                case 'right-top':
                    position = {
                        top: pos.top - targetHeight + pos.height + fixedH,
                        left: pos.left + pos.width
                    };
                    arrowOffset = {
                        top: targetHeight - Math.min(elementH, targetHeight) / 2 - fixedH
                    };
                    break;
                case 'right-bottom':
                    position = {
                        top: pos.top - fixedH,
                        left: pos.left + pos.width
                    };
                    arrowOffset = {
                        top: Math.min(elementH, targetHeight) / 2 + fixedH
                    };
                    break;
                case 'left-top':
                    position = {
                        top: pos.top - targetHeight + pos.height + fixedH,
                        left: pos.left - targetWidth
                    };
                    arrowOffset = {
                        top: targetHeight - Math.min(elementH, targetHeight) / 2 - fixedH
                    };
                    break;
                case 'left-bottom':
                    position = {
                        top: pos.top - fixedH,
                        left: pos.left - targetWidth
                    };
                    arrowOffset = {
                        top: Math.min(elementH, targetHeight) / 2 + fixedH
                    };
                    break;

            }
            return {
                position: position,
                arrowOffset: arrowOffset
            };
        }
    };
    $.fn[pluginName] = function(options, noInit) {
        var results = [];
        var $result = this.each(function() {

            var popover = $.data(this, 'plugin_' + pluginName);
            if (!popover) {
                if (!options) {
                    popover = new Popover(this, null);
                } else if (typeof options === 'string') {
                    if (options !== 'destroy') {
                        if (!noInit) {
                            popover = new Popover(this, null);
                            results.push(popover[options]());
                        }
                    }
                } else if (typeof options === 'object') {
                    popover = new Popover(this, options);
                }
                $.data(this, 'plugin_' + pluginName, popover);
            } else {
                if (options === 'destroy') {
                    popover.destroy();
                } else if (typeof options === 'string') {
                    results.push(popover[options]());
                }
            }
        });

        return (results.length) ? results : $result;
    };

})(jQuery, window, document);
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
});/* 固定行固定列表格 */
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