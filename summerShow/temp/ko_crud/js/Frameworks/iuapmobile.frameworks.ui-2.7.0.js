var eventType;
if("onmousedown" in document) {
  eventType = ["mousedown","click"];
}else if("ontouchstart" in document) {
 eventType = ["touchstart","touchend"];
}
var UM = UM || {};
var getUid = function(){
	return "page"+(new Date()).getTime();
};
$(function() {
	// 远程调试 
	/*(function(e) {
		e.setAttribute("src", "http://10.2.112.94:8080/target/target-script-min.js#anonymous");
		document.getElementsByTagName("body")[0].appendChild(e);
	})(document.createElement("script"));
	document.body.addEventListener('touchstart', function() {});*/
	$(document).on("click",".um-list-left-icon",function(e){
		e.stopPropagation();
	});
	$(document).on("touchmove",".overlay",function(e){
		e.preventDefault();
		return false;
	});
});
window.addEventListener('load', function(){
   setTimeout(function(){ window.scrollTo(0, 1); }, 20);
});/* 折叠菜单 */
+function ($) {
    'use strict';
    $(function(){
        var openBtn = '.um-collapse-btn';
        var collapse = function (e) {
          var openList;
          var targetName = $(this).data("target");
          openList = targetName ? $("#" + targetName):$(this).siblings(".um-collapse-content");
          if(openList.is(":visible")) {
            openList.slideUp("fast");
            openList.parent().removeClass("um-open");
            openList.trigger("collapse.close");
          }else {
            openList.slideDown("fast");
            openList.parent().addClass("um-open");
            openList.trigger("collapse.open");
          }
          e.preventDefault();
        };
        $(document).on(eventType[0],openBtn,collapse);
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
      defaults: {
        title: window.location.host || "",
        text: "觉得咋样？",
        btnText: ["取消", "确定"],
        delay: 300,
        overlay: 1,
        cancle: function() {},
        ok: function(data) {},
        callback: null
      },
      overlay: $('<div class="overlay"></div>'),
      init: function() {
        console.log(_UModal.countWindow)
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
          html = '<div class="um-modal" style="overflow:visible;"><div class="loading"><div></div><div></div></div></div>';
        }
        if (settings.overlay && _UModal.countWindow==0) {
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
        if (type === 'tips' || type === 'loading' && delay) {
          var callback = settings.callback;
          setTimeout(function() {
            that.destory();
            callback && callback();
          }, delay);
          return;
        }
        modal.on(eventType[1], '.btn', function(e) {
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
          if (settings.overlay && _UModal.countWindow==0) {
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
}(jQuery);function Page() {
    if (sessionStorage.hasAjax) {
        sessionStorage.clear();
    }
    // 获取缓存hash路径
    var hashArr = sessionStorage.hashArr;
    this.hashArr = hashArr && JSON.parse(hashArr) || [];

    // settings为动态的,defaults静态变量
    this.settings = $.extend(this.defaults);

    // 动画animation事件监听
    this.endCurrent = false;
    this.endNext = false;
    this.animEndEventName = "webkitAnimationEnd";
    this.outClass = '';
    this.inClass = '';

    this.init();

    // this.currPage = null;// 当前页
    // this.currId = null; // 当前页id
}
Page.prototype = {
    constructor:Page,
    defaults: {
        target: null,
        isReverse: 0,
        transition: "um",
        url: null,
        beforePageIn: function() {},
        afterPageIn: function() {},
        beforePageOut: function() {},
        afterPageOut: function() {}
    },
    init: function() {
        var settings = this.settings;
        $.each($(".um-page"), function() {
            var $this = $(this);
            $this.data("originalClassList", $this.attr("class"));
        });

        var act = $(sessionStorage.initActivePageId);
        if (act.length) {
            act.addClass("active");
        } else {
            $(".um-page").eq(0).addClass("active");
        }
        this.updateCurrent();
    },
    // 更新当前页指向
    updateCurrent: function() {
        this.currPage = $(".um-page.active").eq(0);
        this.currId = this.currPage.attr("id");
    },
    // 改变页面
    changePage: function(options) {

        this.settings = $.extend(this.settings, options);
        this.updateCurrent();
        this.checkOptions();
        if (this.hashArr.length) {
            sessionStorage.hashArr = JSON.stringify(this.hashArr);
        }
    },
    // 缓存可视页面id
    cacheActivePageId: function(id) {
        sessionStorage.initActivePageId = "#" + id;
    },
    // um-back 返回
    back: function() {
        var len = this.hashArr.length,
            lastHash;
        if (len) {
            // 获取上条hash
            lastHash = this.hashArr[len - 1];

            this.updateCurrent();
            this.cacheActivePageId(lastHash);

            this.settings.target = $(sessionStorage.initActivePageId); // ???
            this.hashArr.pop();

            sessionStorage.hashArr = JSON.stringify(this.hashArr);
            this.settings.isReverse = 1;

            this.pageAnimate();
            this.settings.isReverse = 0; //全局变量，重置为默认值
        }
    },
    checkOptions: function() {
        var settings = this.settings;
        if (!this.currId) {
            console.log("请填写page id,否则无法返回该页");
            return false;
        }
        if (settings.target && settings.target.length) {
            this.hashArr.push(this.currId);
            this.cacheActivePageId(settings.target.attr("id"));
            this.pageAnimate();
        }
    },
    pageAnimate: function() {
        var settings = this.settings,
            _this = this,
            target = settings.target,
            currPage = this.currPage,
            animEndEventName = _this.animEndEventName;
        target.trigger("beforePageIn");
        currPage.trigger("beforePageOut");

        target.addClass("active");
        // set in out Class
        _this.setTransitionClass(settings.transition);

        if(currPage.length) {
          currPage.addClass(_this.outClass).on(animEndEventName, function() {
            currPage.off(animEndEventName);
            _this.endCurrent = true;
            if (_this.endNext) {
                _this.resetPage(target, _this.currPage);
            }
          });
        } else {
          _this.endCurrent = true;
        }
        
        target.addClass(_this.inClass).on(animEndEventName, function() {
            target.off(animEndEventName);
            _this.endNext = true;
            if (_this.endCurrent) {
                _this.resetPage(target, _this.currPage);
            }
            setTimeout(function() {
                target.trigger("afterPageIn");
                _this.currPage.trigger("afterPageOut");
            }, 300);
        });
    },

    setTransitionClass: function(flag) {
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
            case "flip":
                this.outClass = 'um-flipOutRight';
                this.inClass = 'um-flipInLeft';
                if (isReverse) {
                    this.outClass = 'um-flipOutLeft';
                    this.inClass = 'um-flipInRight';
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
    resetPage: function($target, $currpage) {
        var settings = this.settings;
        endCurrent = false;
        endNext = false;
        $currpage.attr('class', $currpage.data('originalClassList'));
        $target.attr('class', $target.data('originalClassList') + ' ' + "active");
    }
}
$(function() {
    UM.page = new Page();
    $(document).on("click", "a[href^=#]", function(e) {
        e.preventDefault();
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
                target = $(target);
                if($this.parents(".panel").length) {
                  $(".overlay").trigger(eventType[0]);
                }
                if (sessionStorage.initActivePageId === "#" + target[0].id) return;// 防止如首页链接到首页的错误导航
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
                        uid = getUid();
                        html.attr("id", uid);
                    }
                    $("body").append(html);
                    html.data("originalClassList", html.attr("class"));
                    var target = $("#" + uid);
                    UModal.loading(null, 300, function() {
                        UM.page.changePage({
                            target: target
                        });
                    })

                    if ($this.data("cache") == false) {
                        target.on("afterPageOut", function() {
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
                 $dataTarget.before(overlay)
                overlay.on(eventType[0], function() {
                    $dataTarget.removeClass("active")//.on("webkitTransitionEnd", function(){
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
/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
*/

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {

    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length < 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while(pos--) {

      var slide = slides[pos];

      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }

    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index-1), -width, 0);
      move(circle(index+1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';

    container.style.visibility = 'visible';

  }

  function prev() {

    if (options.continuous) slide(index-1);
    else if (index) slide(index-1);

  }

  function next() {

    if (options.continuous) slide(index+1);
    else if (index < slides.length - 1) slide(index+1);

  }

  function circle(index) {

    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;

  }

  function slide(to, slideSpeed) {

    // do nothing if already on requested slide
    if (index == to) return;

    if (browser.transitions) {

      var direction = Math.abs(index-to) / (index-to); // 1: backward, -1: forward

      // get the actual position of the slide
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / width;

        // if going forward but to < index, use to = slides.length + to
        // if going backward but to > index, use to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // move all the slides between index and to in the right direction
      while (diff--) move( circle((to > index ? to : index) - diff - 1), width * direction, 0);

      to = circle(to);

      move(index, width * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous) move(circle(to - direction), -(width * direction), 0); // we need to get the next in place

    } else {

      to = circle(to);
      animate(index * -width, to * -width, slideSpeed || speed);
      //no fallback for a circular continuous if the browser does not accept transitions
    }

    index = to;
    offloadFn(options.callback && options.callback(index, slides[index]));
  }

  function move(index, dist, speed) {

    translate(index, dist, speed);
    slidePos[index] = dist;

  }

  function translate(index, dist, speed) {

    var slide = slides[index];
    var style = slide && slide.style;

    if (!style) return;

    style.webkitTransitionDuration =
    style.MozTransitionDuration =
    style.msTransitionDuration =
    style.OTransitionDuration =
    style.transitionDuration = speed + 'ms';

    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
    style.MozTransform =
    style.OTransform = 'translateX(' + dist + 'px)';

  }

  function animate(from, to, speed) {

    // if not an animation, just reposition
    if (!speed) {

      element.style.left = to + 'px';
      return;

    }

    var start = +new Date;

    var timer = setInterval(function() {

      var timeElap = +new Date - start;

      if (timeElap > speed) {

        element.style.left = to + 'px';

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

        clearInterval(timer);
        return;

      }

      element.style.left = (( (to - from) * (Math.floor((timeElap / speed) * 100) / 100) ) + from) + 'px';

    }, 4);

  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }


  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
        case 'resize': offloadFn(setup); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {

        // prevent native scrolling
        event.preventDefault();

        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end

          translate(circle(index-1), delta.x + slidePos[circle(index-1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index+1), delta.x + slidePos[circle(index+1)], 0);

        } else {

          delta.x =
            delta.x /
              ( (!index && delta.x > 0               // if first slide and sliding left
                || index == slides.length - 1        // or if last slide and sliding right
                && delta.x < 0                       // and if sliding at all
              ) ?
              ( Math.abs(delta.x) / width + 1 )      // determine resistance level
              : 1 );                                 // no resistance if false

          // translate 1:1
          translate(index-1, delta.x + slidePos[index-1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index+1, delta.x + slidePos[index+1], 0);
        }

      }

    },
    end: function(event) {

      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds =
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {

        if (isValidSlide && !isPastBounds) {

          if (direction) {

            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index-1), -width, 0);
              move(circle(index+2), width, 0);

            } else {
              move(index-1, -width, 0);
            }

            move(index, slidePos[index]-width, speed);
            move(circle(index+1), slidePos[circle(index+1)]-width, speed);
            index = circle(index+1);

          } else {
            if (options.continuous) { // we need to get the next in this direction in place

              move(circle(index+1), width, 0);
              move(circle(index-2), -width, 0);

            } else {
              move(index+1, width, 0);
            }

            move(index, slidePos[index]+width, speed);
            move(circle(index-1), slidePos[circle(index-1)]+width, speed);
            index = circle(index-1);

          }

          options.callback && options.callback(index, slides[index]);

        } else {

          if (options.continuous) {

            move(circle(index-1), -width, speed);
            move(index, 0, speed);
            move(circle(index+1), width, speed);

          } else {

            move(index-1, -width, speed);
            move(index, 0, speed);
            move(index+1, width, speed);
          }

        }

      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    },
    transitionEnd: function(event) {

      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {

        if (delay) begin();

        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }

    }

  }

  // trigger setup
  setup();

  // start auto slideshow if applicable
  if (delay) begin();


  // add event listeners
  if (browser.addEventListener) {

    // set touchstart event on element
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

    window.onresize = function () { setup() }; // to play nice with old IE

  }

  // expose the Swipe API
  return {
    setup: function() {

      setup();

    },
    slide: function(to, speed) {

      // cancel slideshow
      stop();

      slide(to, speed);

    },
    prev: function() {

      // cancel slideshow
      stop();

      prev();

    },
    next: function() {

      // cancel slideshow
      stop();

      next();

    },
    stop: function() {

      // cancel slideshow
      stop();

    },
    getPos: function() {

      // return current index position
      return index;

    },
    getNumSlides: function() {

      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();

      // reset element
      element.style.width = '';
      element.style.left = '';

      // reset slides
      var pos = slides.length;
      while(pos--) {

        var slide = slides[pos];
        slide.style.width = '';
        slide.style.left = '';

        if (browser.transitions) translate(pos, 0, 0);

      }

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
}
/* 滑动菜单 */ 
+ function($) {
  'use strict';
  $(function() {
    /* swipe tab bar */
    var tabbar = $('[data-action="swipeTab"]');
    $.each(tabbar, function(i, e) {
      var bar = $(this).find("li");
      var targetName = tabbar.eq(i).data("target");
      var target = document.getElementById(targetName);
      window["swipe" + i] = Swipe(target, {
        // startSlide: 4,
        // auto: 3000,
        // continuous: true,
        // disableScroll: true,
        // stopPropagation: true,
        //transitionEnd: function(index, element) {},
        callback: function(index, element) {
          bar.removeClass("active").eq(index).addClass("active");
        }
      });
      bar.on(eventType[0], function() {
        var e = $(this).closest("li").index();
        window["swipe" + i].slide(e, 200);
      });
    });
  });
}(jQuery);/* 固定行固定列表格 */
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