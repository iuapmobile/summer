var PageTransitions = (function() {
	var $pages = $('div.um-page'),
		current = 0, // 初始化第一页
		endCurrPage = false,
		endNextPage = false,
		isReverse = 0,
		/*animEndEventNames = ['webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd', 'animationend'],
		animEndEventNames = ['webkitAnimationEnd','oAnimationEnd','MSAnimationEnd','animationend'];
		animEndEventName = animEndEventNames[0],*/
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
	};

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
		e.stopPropagation();
		var $currPage = $(this).closest(".um-page");
		var target = $(this).attr("href");
		var $this = $(this);
		var isback = $this.hasClass("um-back") || $this.data("reverse");
		try {
			if(isback) {
				_back();
			}else if ($(target).length) {
				$nextPage = $(target);
				hashArr.push($currPage.attr("id"));
			}
		} catch (e) {
			_back();
		}

		function _back() {
			var len = hashArr.length;
			if (len) {
				$nextPage = $("#" + hashArr[len - 1]);
				hashArr.pop();
			}
		}
		isReverse = isback?1:0;
		//var transition = Number($(this).data("transition")) || 1;
		// door
		/*
		f7
		slide
		slideup
		fade
		slidefade
		slideupfade
		slide_ease
		pop
		slide_scale
		scale_pop
		scale_down_up
		scale_slide
		*/

		var trans = $(this).data("transition") || "f7";
		var options = {
			transition: trans,
			isReverse: isReverse,
			currPage: $currPage,
			nextPage: $nextPage
		}
		transFun(options);
		return false;
	}

	function currPageTrans(options) {
		options.currPage.addClass(outClass).one(animEndEventName, function() {
			options.currPage.off(animEndEventName);
			endCurrPage = true;
			if (endNextPage) {
				onEndAnimation(options.currPage, options.nextPage);
			}
		});
	}

	function nextPageTrans(options) {
		options.nextPage.addClass(inClass).one(animEndEventName, function() {
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
			console.log(e)
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
			case "door": // 开门旋转
				outClass = 'um-rotatePushLeft';
				inClass = 'um-rotatePullRight';
				if (isReverse) {
					outClass = 'um-rotatePushRight';
					inClass = 'um-rotatePullLeft';
				}
				break;
			case "f7":
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
		}
	}

	init();
	$(document).on("click", "a[href^=#]", enterPage);
	return {
		init: init
	};
})();