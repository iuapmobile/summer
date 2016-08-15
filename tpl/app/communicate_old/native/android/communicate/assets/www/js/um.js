/* 折叠菜单 */
+function ($) {
    'use strict';
    $(function(){
        var openBtn = '.collapse-btn';
        var collapse = function (e) {
          var openList;
          var targetName = $(this).data("target");
          openList = targetName ? $("#" + targetName):$(this).siblings(".collapse-content");
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
        $(document).on('click',openBtn,collapse);
    })
}(jQuery);
/* 模态框 */
+ function($) {
  'use strict';
  $(function() {
    function _UModal() {
      var title = window.location.host || "";
      this.countWindow = 0;
      this.defaultOptions = {
        title: title,
        text: "觉得咋样？",
        btnText: ["确定", "取消"],
        cancle: function() {},
        ok: function(data) {}
      };
    }

    _UModal.prototype.modal = function(type, options) {
      var that = this;
      that.countWindow++;
      var overlay = $('<div class="overlay"></div>');
      var _opt = $.extend(that.defaultOptions);

      if (!!options) {
        _opt = $.extend(_opt, options);
      }

      var isStr = options.constructor === String,
        isTips = type === "tips";

      var html;
      if (isStr) {
        html = '<div class="um-modal"><div class="um-modal-content"><div class="um-modal-text">' +
          options + '</div>';
      } else {
        html = '<div class="um-modal"><div class="um-modal-content"><div class="um-modal-title">' +
          _opt.title + '</div><div class="um-modal-text">' +
          _opt.text + '</div>';
      }

      if (type === "prompt") {
        html += '<div class="um-modal-input"><input type="text" class="form-control"></div>';
      }
      if (type === "login") {
        html += '<div class="um-modal-input"><input type="text" class="form-control"><input type="text" class="form-control"></div>';
      }

      isTips ? html += '</div>' : html += '</div><div class="um-modal-btns">';

      if (type === "confirm" || type === "login") {
        html += '<a href="##" class="btn cancle">' + _opt.btnText[1] + '</a>';
      }

      if (isTips) {
        html += '</div>';
      } else {
        html += '<a href="##" class="btn ok">' + _opt.btnText[0] +
          '</a></div></div>';
      }

      if (type === "loading") {
        html = '<div class="um-modal" style="overflow:visible;"><div class="loading"><div></div><div></div></div></div>';
      }

      overlay = overlay.appendTo($('body'));
      var modal = $(html).appendTo($('body')),
        modalH = modal.outerHeight(),
        wh = window.innerHeight;
      modal.css('top', (wh - modalH - 20) / 2);
      setTimeout(function() {
        modal.addClass('um-modal-in');
      }, 0);
      that.destory = destory;
      if (type === 'tips' || type === 'loading') {
        var delay = Number(arguments[2]);
        if ('' + delay !== 'NaN') {
          var callback;
          if (typeof arguments[3] == 'function') callback = arguments[3];
          setTimeout(function() {
            that.destory();
            callback && callback();
          }, delay);
        }
        return;
      }
      modal.on('click', '.btn', function(e) {
        e.preventDefault();
        if ($(this).hasClass('cancle')) {
          _opt.cancle();
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
          _opt.ok(data);
        }
        destory();
      });

      function destory() {
        modal.removeClass('um-modal-in').addClass('um-modal-out');
        modal.on('webkitTransitionEnd MSTransitionEnd transitionEnd', function() {
            modal.removeClass('um-modal-out');
            modal.remove();
            that.countWindow--;
          });
          // 避免遮罩闪烁
        if (that.countWindow > 0) {
          overlay.remove();
        }
      }
    };
    _UModal.prototype.alert = function(options) {
      this.modal("alert", options || this.defaultOptions);
      return this;
    };
    _UModal.prototype.tips = function(options, delay, callback) {
      this.modal("tips", options || this.defaultOptions, delay, callback);
      return this;
    };
    _UModal.prototype.confirm = function(options) {
      this.modal("confirm", options || this.defaultOptions);
      return this;
    };
    _UModal.prototype.prompt = function(options) {
      this.modal("prompt", options || this.defaultOptions);
      return this;
    };
    _UModal.prototype.loading = function(options, delay, callback) {
      this.modal("loading", options || this.defaultOptions, delay, callback);
      return this;
    };
    _UModal.prototype.login = function(options) {
      this.modal("login", options || this.defaultOptions);
      return this;
    };
    window.UModal = new _UModal();
  });
}(jQuery);
/* 页面切换动画 */
$(function() {
	var $pages = $('.um-page'),
		current = 0, // 初始化第一页
		endCurrPage = false,
		endNextPage = false,
		isReverse = 0,
		animEndEventNames = {
			'webkit': 'webkitAnimationEnd',
			'o': 'oAnimationEnd',
			'ms': 'MSAnimationEnd',
			'animation': 'animationend'
		},
		animEndEventName = animEndEventNames[prefix().lowercase] || animEndEventNames['animation'],
		outClass = '',
		inClass = '',
		hashArr = [];
	function prefix() {
		var styles = getCompStyle(document.documentElement),
			pre = (Array.prototype.slice.call(styles).join('')
				.match(/-(moz|webkit|ms)-/) || ['', 'o']
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	}

	function getCompStyle(elem, classes) {
		return (window.getComputedStyle ? window.getComputedStyle(elem, classes || null) : elem.currentStyle) || null;
	}

	function init() {
		$pages.each(function() {
			var $page = $(this);
			$page.data('originalClassList', $page.attr('class'));
		});

		var currentPage = "#" + $pages.eq(current).attr("id");
		$pages.eq(current).addClass('active');
	}

	function enterPage(e) {
		e.preventDefault();
		var $this = $(this);
		var $currPage = $this.closest(".um-page");
		var target = $this.attr("href");
		
		var isback = $this.hasClass("um-back") || $this.data("reverse");
		try {
			if(isback) {
				_back();
			}else if ($(target).length) {
				$nextPage = $(target);
				hashArr.push($currPage.attr("id"));
			}else {
				return;
			}
		} catch (e) {
			_back();
		}
		function _back(){
			var len = hashArr.length;
			if(len) {
				$nextPage = $("#" + hashArr[len - 1]);
				hashArr.pop();
			}
		}
		isReverse = isback?1:0;
		/*  f7 door slide  slideup  fade  slidefade  slideupfade  slide_ease  pop  
		slide_scale  scale_pop  scale_down_up  scale_slide  fall  rotate  push_left  
		push_top  turn  cube  cube_pop  cube_slide  cube_  flow */

		var trans = $(this).data("transition") || "f7";
		var options = {
			transition: trans,
			isReverse: isReverse,
			currPage: $currPage,
			nextPage: $nextPage
		};
		transFun(options);
	}

	function currPageTrans(options) {
		options.currPage.addClass(outClass).on(animEndEventName, function() {
			options.currPage.off(animEndEventName);
			endCurrPage = true;
			if (endNextPage) {
				onEndAnimation(options.currPage, options.nextPage);
			}
		});
	}

	function nextPageTrans(options) {
		options.nextPage.addClass(inClass).on(animEndEventName, function() {
			options.nextPage.off(animEndEventName);
			endNextPage = true;
			if (endCurrPage) {
				onEndAnimation(options.currPage, options.nextPage);
			}
		});
	}

	function transFun(options) {
		try {
			setTransitionClass(options.transition);
			options.nextPage.addClass("active");
			currPageTrans(options);
			nextPageTrans(options);
		} catch (e) {
			console.log(e);
		}
	}

	function onEndAnimation($outpage, $inpage) {
		endCurrPage = false;
		endNextPage = false;
		resetPage($outpage, $inpage);
	}

	function resetPage($outpage, $inpage) {
		$outpage.attr('class', $outpage.data('originalClassList'));
		$inpage.attr('class', $inpage.data('originalClassList') + ' active');
	}

	function setTransitionClass(flag) {
		switch (flag) {
			case "door":// 开门旋转
				outClass = 'um-rotatePushLeft';
				inClass = 'um-rotatePullRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-rotatePullLeft';
				}
				break;
			case "f7" :
				outClass = 'page-from-center-to-left';
				inClass = 'page-from-right-to-center';
				if (isReverse) {
					outClass = 'page-from-center-to-right';
					inClass = 'page-from-left-to-center';
				}
				break;
			case "slide":
				outClass = 'um-moveToLeft';
				inClass = 'um-moveFromRight';

				if (isReverse) {
					outClass = 'um-moveToRight';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "slideup": 
				outClass = 'um-moveToTop';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-moveToBottom';
					inClass = 'um-moveFromTop';
				}
				break;
			case "fade": // fade
				outClass = 'um-fadeOut';
				inClass = 'um-fadeIn';
				break;
			case "slidefade":
				outClass = 'um-moveToLeftFade';
				inClass = 'um-moveFromRightFade';
				if (isReverse) {
					outClass = 'um-moveToRightFade';
					inClass = 'um-moveFromLeftFade';
				}
				break;
			case "slideupfade":
				outClass = 'um-moveToTopFade';
				inClass = 'um-moveFromBottomFade';
				if (isReverse) {
					outClass = 'um-moveToBottomFade';
					inClass = 'um-moveFromTopFade';
				}
				break;
			case "slide_ease":
				outClass = 'um-moveToLeftEasing';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-moveToRightEasing';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "pop":
				outClass = 'um-fadeIn';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-moveToBottomEasing';
					inClass = 'um-fadeIn';
				}
				break;
			case "slide_scale":
				outClass = 'um-scaleDown';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-scaleDown';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "scale_pop":
				outClass = 'um-scaleDown';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-scaleDown';
					inClass = 'um-moveFromTop';
				}
				break;
			case "scale_down_up":
				outClass = 'um-scaleDownUp';
				inClass = 'um-scaleUp';
				if (isReverse) {
					outClass = 'um-scaleDown';
					inClass = 'um-scaleUpDown';
				}
				break;
			case "scale_slide":
				outClass = 'um-moveToLeft';
				inClass = 'um-scaleUp';
				if (isReverse) {
					outClass = 'um-moveToRight';
					inClass = 'um-scaleUp';
				}
				break;
			/*case 25:
				outClass = 'um-moveToTop';
				inClass = 'um-scaleUp';
				if (isReverse) {
					outClass = 'um-moveToBottom';
					inClass = 'um-scaleUp';
				}
				break;
			case 27:
				outClass = 'um-scaleDownCenter';
				inClass = 'um-scaleUpCenter';
				break;
			case 28:
				outClass = 'um-rotateRightSideFirst';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-rotateLeftSideFirst';
					inClass = 'um-moveFromLeft';
				}
				break;
			case 30:
				outClass = 'um-rotateTopSideFirst';
				inClass = 'um-moveFromTop';
				if (isReverse) {
					outClass = 'um-rotateBottomSideFirst';
					inClass = 'um-moveFromBottom';
				}
				break;
			case 32:
				outClass = 'um-flipOutRight';
				inClass = 'um-flipInLeft';
				if (isReverse) {
					outClass = 'um-flipOutLeft';
					inClass = 'um-flipInRight';
				}
				break;
			case 34:
				outClass = 'um-flipOutTop';
				inClass = 'um-flipInBottom';
				if (isReverse) {
					outClass = 'um-flipOutBottom';
					inClass = 'um-flipInTop';
				}
				break;
			case 40:
				outClass = 'um-rotatePushTop';
				inClass = 'um-moveFromBottom';
				if (isReverse) {
					outClass = 'um-rotatePushBottom';
					inClass = 'um-moveFromTop';
				}
				break;*/
			case "fall":
				outClass = 'um-rotateFall';
				inClass = 'um-scaleUp';
				break;
			case "rotate":
				outClass = 'um-rotateOutNewspaper';
				inClass = 'um-rotateInNewspaper';
				break;
			case "push_left":
				outClass = 'um-rotatePushLeft';
				inClass = 'um-moveFromRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-moveFromLeft';
				}
				break;
			case "push_top":
				outClass = 'um-rotatePushTop';
				inClass = 'um-rotatePullBottom';
				if (isReverse) {
					outClass = 'um-rotatePushBottom';
					inClass = 'um-rotatePullTop';
				}
				break;
			case "turn":
				outClass = 'um-rotatePushLeft';
				inClass = 'um-rotatePullRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-rotatePullLeft';
				}
				break;
			case "cube":
				outClass = 'um-rotateFoldLeft';
				inClass = 'um-moveFromRightFade';
				if (isReverse) {
					outClass = 'um-rotateFoldRight';
					inClass = 'um-moveFromLeftFade';
				}
				break;
			case "cube_pop":
				outClass = 'um-rotateFoldTop';
				inClass = 'um-moveFromBottomFade';
				if (isReverse) {
					outClass = 'um-rotateFoldBottom';
					inClass = 'um-moveFromTopFade';
				}
				break;
			case "cube_slide":
				outClass = 'um-moveToLeftFade';
				inClass = 'um-rotateUnfoldRight';
				if (isReverse) {
					outClass = 'um-moveToRightFade';
					inClass = 'um-rotateUnfoldLeft';
				}
				break;
			case "cube_":
				outClass = 'um-rotateCubeLeftOut';
				inClass = 'um-rotateCubeLeftIn';
				if (isReverse) {
					outClass = 'um-rotateCubeRightOut';
					inClass = 'um-rotateCubeRightIn';
				}
				break;
			case "flow":
				outClass = 'um-rotateSlideOut';
				inClass = 'um-rotateSlideIn';
				if (isReverse) {
					outClass = 'um-moveToRight';
					inClass = 'um-moveFromLeft';
				}
				break;
			/*case 52:
				outClass = 'um-moveToBottomFade';
				inClass = 'um-rotateUnfoldTop';
				if (isReverse) {
					outClass = 'um-moveToTopFade';
					inClass = 'um-rotateUnfoldBottom';
				}
				break;
			case 54:
				outClass = 'um-rotateRoomLeftOut';
				inClass = 'um-rotateRoomLeftIn';
				if (isReverse) {
					outClass = 'um-rotateRoomRightOut';
					inClass = 'um-rotateRoomRightIn';
				}
				break;
			case 56:
				outClass = 'um-rotateRoomTopOut';
				inClass = 'um-rotateRoomTopIn';
				if (isReverse) {
					outClass = 'um-rotateRoomBottomOut';
					inClass = 'um-rotateRoomBottomIn';
				}
				break;
			case 60:
				outClass = 'um-rotateCubeTopOut';
				inClass = 'um-rotateCubeTopIn';
				if (isReverse) {
					outClass = 'um-rotateCubeBottomOut';
					inClass = 'um-rotateCubeBottomIn';
				}
				break;
			case 62:
				outClass = 'um-rotateCarouselLeftOut';
				inClass = 'um-rotateCarouselLeftIn';
				if (isReverse) {
					outClass = 'um-rotateCarouselRightOut';
					inClass = 'um-rotateCarouselRightIn';
				}
				break;
			case 64:
				outClass = 'um-rotateCarouselTopOut';
				inClass = 'um-rotateCarouselTopIn';
				if (isReverse) {
					outClass = 'um-rotateCarouselBottomOut';
					inClass = 'um-rotateCarouselBottomIn';
				}
				break;*/
		}
	}

	init();
	$(document).on("click","a[href^=#]", enterPage);
	/*return {
		init: init
	};*/
});
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
      bar.on("touchstart mousedown", function() {
        var e = $(this).closest("li").index();
        window["swipe" + i].slide(e, 200);
      });
    });
  });
}(jQuery);
/* 固定行固定列表格 */
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
$(function(){
  /* 远程调试 
  (function(e){
    e.setAttribute("src","http://10.2.112.107:8080/target/target-script-min.js#anonymous");
    document.getElementsByTagName("body")[0].appendChild(e);
  })(document.createElement("script"));*/
});

