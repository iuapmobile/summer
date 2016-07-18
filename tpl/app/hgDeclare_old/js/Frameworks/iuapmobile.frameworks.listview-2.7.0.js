(function (root) {
    function ListView(selector, options) {
        var me = this;
        options = options || {};
        me._events = new UM.EventMgr();
        me.$element = $(selector);
        me.$parent = me.$element.parent();
        me.$list = me.$element.children('ul');
        me.$domUp = null; //上拉时显示条
        me.$domDown = null;  //下拉时显示条
        me.$domLoad = null; //上拉下拉释放时加载的DOM结构
        me.$domResult = null; //上拉下拉时显示条
        me._loadHeight = 0; //列表整体高度
        me._childrenHeight = 0; //列表子元素ul高度
        me._scrollTop = 0; //列表滚动条距离顶端距离
        me.touches = null; //列表手指触摸对象
        me.pullDirection = ''; //手指在列表上的上下滑动方向
        me._startY = 0; //手指在列表上触摸开始时，其位置的纵坐标
        me._curY = 0; //手指在列表上滑动时，其当前位置的纵坐标
        me._moveY = 0; //手指在列表上滑动的纵向位移
        me._offsetY = 0; //手指在列表上滑动的纵向距离
        me.longTapEvent = null; //手指在列表上的长按定时器

        me.config = {
            insertDOM: false,  //列表是否允许上下拉追加内容
            isScroll: true, //列表是否允许内容上下滚动
            isLoading: false, //列表是否正在加载内容
            hasOpeningItemMenu: false, //列表是否存在打开的行菜单
            ensureTouchDirect: false, //是否已明确手指滑动方向(上下左右)
            tapHoldEnable: false, //是否已开启长按事件监听
            itemClickEnable: false, //是否已开启行点击事件监听
            itemDeleteEnable: false, //是否已开启行删除事件监听
            pullDownEnable: false, //是否已开启下拉事件监听
            pullUpEnable: false, //是否已开启上拉事件监听
            itemSwipeEnable: false //是否已开启行左右滑动事件监听
        };

        me._touchMethods = {
            fnTouches: function (e) {
                if (!e.touches) {
                    e.touches = e.originalEvent.touches;
                }
            },

            fnTouchstart: function (e, me) {
                me._startY = e.touches[0].pageY;
                me._loadHeight = me.$element.height();
                me._childrenHeight = me.$element.children().height();
                me._scrollTop = me.$element.scrollTop();
            },

            fnTouchmove: function (e, me) {
                me._curY = e.touches[0].pageY;
                me._moveY = me._curY - me._startY;

                if (me._moveY > 0) {
                    me.pullDirection = 'down';
                } else if (me._moveY < 0) {
                    me.pullDirection = 'up';
                }

                var _absMoveY = Math.abs(me._moveY);

                // 加载上方
                if (me.config.pullUpEnable && me._scrollTop <= 0 && me.pullDirection == 'down') {
                    e.preventDefault();
                    if (!me.config.insertDOM) {
                        me.$element.prepend('<div class="' + me.opts.domUp.domClass + '"></div>');
                        me.config.insertDOM = true;
                    }

                    me.$domUp = $('.' + me.opts.domUp.domClass);
                    me._touchMethods.fnTransition(me.$domUp, 0);

                    // 下拉
                    if (_absMoveY <= me.opts.pullDistance) {
                        me._offsetY = _absMoveY;
                        me.$domUp.html(me.opts.domUp.domRefresh);
                        // 指定距离 < 下拉距离 < 指定距离*2
                    } else if (_absMoveY > me.opts.pullDistance && _absMoveY <= me.opts.pullDistance * 2) {
                        me._offsetY = me.opts.pullDistance + (_absMoveY - me.opts.pullDistance) * 0.5;
                        me.$domUp.html(me.opts.domUp.domUpdate);
                        // 下拉距离 > 指定距离*2
                    } else {
                        me._offsetY = me.opts.pullDistance + me.opts.pullDistance * 0.5 + (_absMoveY - me.opts.pullDistance * 2) * 0.2;
                    }

                    me.$domUp.css({'height': me._offsetY});
                }

                // 加载下方
                if (me.config.pullDownEnable && me._childrenHeight <= (me._loadHeight + me._scrollTop) && me.pullDirection == 'up') {
                    e.preventDefault();
                    if (!me.config.insertDOM) {
                        me.$element.append('<div class="' + me.opts.domDown.domClass + '"></div>');
                        me.config.insertDOM = true;
                    }

                    me.$domDown = $('.' + me.opts.domDown.domClass);
                    me._touchMethods.fnTransition(me.$domDown, 0);


                    if (_absMoveY <= me.opts.pullDistance) {
                        me._offsetY = _absMoveY;
                        me.$domDown.html(me.opts.domDown.domRefresh);
                        // 指定距离 < 上拉距离 < 指定距离*2
                    } else if (_absMoveY > me.opts.pullDistance && _absMoveY <= me.opts.pullDistance * 2) {
                        me._offsetY = me.opts.pullDistance + (_absMoveY - me.opts.pullDistance) * 0.5;
                        me.$domDown.html(me.opts.domDown.domUpdate);
                        // 上拉距离 > 指定距离*2
                    } else {
                        me._offsetY = me.opts.pullDistance + me.opts.pullDistance * 0.5 + (_absMoveY - me.opts.pullDistance * 2) * 0.2;
                    }

                    me.$domDown.css({'height': me._offsetY});
                    me.$element.scrollTop(me._offsetY + me._scrollTop);
                }
            },

            fnTouchend: function (me) {
                var _absMoveY = Math.abs(me._moveY);
                if (me.config.insertDOM) {
                    if (me.pullDirection == 'down') {
                        me.$domResult = me.$domUp;
                        me.domLoad = me.opts.domUp.domLoad;
                    } else if (me.pullDirection == 'up') {
                        me.$domResult = me.$domDown;
                        me.domLoad = me.opts.domDown.domLoad;
                    }

                    me._touchMethods.fnTransition(me.$domResult, 300);

                    if (_absMoveY > me.opts.pullDistance) {
                        me.$domResult.css({'height': me.$domResult.children().height()});
                        me.$domResult.html(me.domLoad);
                        me._touchMethods.fnCallback(me);
                    } else {
                        me.$domResult.css({'height': '0'}).on('webkitTransitionEnd', function () {
                            me.config.insertDOM = false;
                            $(this).remove();
                        });
                    }
                    me._moveY = 0;
                }
            },

            fnTouchDirection: function (me, touchPosOri, touchPosNow) {
                var xspace = touchPosNow.pageX - touchPosOri.pageX;
                var yspace = touchPosNow.pageY - touchPosOri.pageY;
                var angle = Math.atan2(xspace, yspace);
                var cosv = Math.abs(Math.cos(angle));
                me.config.ensureTouchDirect = true;
                if (cosv >= 0.78) {
                    if (yspace > 0) return 'down';
                    if (yspace < 0) return 'up';
                } else if (cosv < 0.78) {
                    if (xspace > 0) return 'right';
                    if (xspace < 0) return 'left';
                }
                return '';
            },

            fnCallback: function (me) {
                me.config.isLoading = true;
                if (me.config.pullDownEnable && me.pullDirection == 'down') {
                    if (!!me.$domResult) {
                        me.$domResult.css({'height': 50})
                    }
                    setTimeout(function () {
                        me._events.trigger("pullDown", me, {});
                    }, 1000);
                } else if (me.config.pullUpEnable && me.pullDirection == 'up') {
                    if (!!me.$domResult) {
                        me.$domResult.css({'height': 50})
                    }
                    setTimeout(function () {
                        me._events.trigger("pullUp", me, {});
                    }, 1000);
                }
            },

            fnTransition: function (dom, num) {
                dom.css({
                    '-webkit-transition': 'all ' + num + 'ms',
                    'transition': 'all ' + num + 'ms'
                });
            }
        };
        me.init(options);
    };

    ListView.prototype.init = function (options) {
        var me = this;
        if (!me.$list || me.$list.length == 0) {
            console.log('列表控件缺少必要的ul元素');
            return false;
        }

        me.opts = $.extend({}, {
            height:0,
            width:0,
            domUp: {
                domClass: 'um-listview-up',
                domRefresh: '<div class="um-listview-refresh">↓下拉刷新</div>',
                domUpdate: '<div class="um-listview-update">↑释放更新</div>',
                domLoad: '<div class="um-listview-load"><span class="pullLoading"></span>加载中...</div>'
            },
            domDown: {
                domClass: 'um-listview-down',
                domRefresh: '<div class="um-listview-refresh">↑上拉加载更多</div>',
                domUpdate: '<div class="um-listview-update">↓释放加载</div>',
                domLoad: '<div class="um-listview-load"><span class="pullLoading"></span>加载中...</div>'
            },
            hasItemMenu: true,
			showLoadingBar: true,
            pullDistance: 50,                                                       // 拉动距离,单位为px
            tapHoldTime: 500,                                                //长按事件多久之后触发，单位为ms
            itemDeleteAnimateTime: 500
        }, options);

        // 绑定触摸
        me.$element.on('touchstart', function (e) {
            var $openingItemMenu;
            var canExitItemMenu;
            if (me.opts.hasItemMenu) {
                $openingItemMenu = me.$list.find('.um-swipe-open');
                canExitItemMenu = $openingItemMenu.length && $openingItemMenu.find(e.target).length == 0;
                if (canExitItemMenu) {
                    me.config.hasOpeningItemMenu = true;
                    $openingItemMenu.removeClass('um-swipe-open').parent('.um-list-item').css('transform', 'translate3d(0,0,0)');
                    return false;
                }

            }
            me.config.tapHoldEnable && (me.longTapEvent = setTimeout(function () {
                me._events.trigger("longTap", me, {});
            }, me.opts.tapHoldTime));
            if (!me.config.isLoading) {
                me._touchMethods.fnTouches(e);
                me._touchMethods.fnTouchstart(e, me);
            }
        });
        me.$element.on('touchmove', function (e) {
            me.longTapEvent && clearTimeout(me.longTapEvent);
            if (me.config.hasOpeningItemMenu) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            if (!me.config.isLoading) {
                me._touchMethods.fnTouches(e, me);
                me._touchMethods.fnTouchmove(e, me);
            }
        });
        me.$element.on('touchend', function (e) {
            me.longTapEvent && clearTimeout(me.longTapEvent);
            me.config.hasOpeningItemMenu = false;
            if (!me.config.isLoading) {
                me._touchMethods.fnTouchend(me);
            }
        });

        me.$list.on('touchstart', '.um-listview-row', function (e) {
            if (!me.config.itemSwipeEnable) return;
            me.config.isScroll = true;
            me.config.ensureTouchDirect = false;
            var touch = e.originalEvent.targetTouches[0];
            var touchPos = {pageX: touch.pageX, pageY: touch.pageY};
            $(this).data('touchPosOri', touchPos);
        });

        me.$list.on('touchmove', '.um-listview-row', function (e) {
            if (!me.config.itemSwipeEnable) return;
            var touch, touchPosOri;
            var touchPosNow;
            var touchDirection;
            var $elem;
            var rowIndex;
            if (!me.config.isScroll) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (me.config.ensureTouchDirect) return;
            $elem = $(this);
            rowIndex = $elem.index();
            touch = e.originalEvent.targetTouches[0];
            touchPosNow = {pageX: touch.pageX, pageY: touch.pageY};
            touchPosOri = $(this).data('touchPosOri');
            touchDirection = me._touchMethods.fnTouchDirection(me, touchPosOri, touchPosNow);
            switch (touchDirection) {
                case 'left':
                    e.preventDefault();
                    e.stopPropagation();
                    me.config.isScroll = false;
                    !me.config.hasOpeningItemMenu && me._events.trigger('itemSwipeLeft', me, {
                        rowIndex: rowIndex,
                        $target: $elem
                    });
                    break;
                case 'right':
                    e.preventDefault();
                    e.stopPropagation();
                    me.config.isScroll = false;
                    !me.config.hasOpeningItemMenu && me._events.trigger('itemSwipeRight', me, {
                        rowIndex: rowIndex,
                        $target: $elem
                    });
                    break;
                default:
                    me.config.isScroll = true;
            }

        });

        me.$list.on('touchend', '.um-listview-row', function (e) {
            if (!me.itemSwipeSupport) return;
            me.config.ensureTouchDirect = false;
            me.config.isScroll = true;
            $(this).removeData('touchPosOri');
        });

        me.resizeFn = function () {
            if (me.opts.height > 0) {
                me.$element.height(me.opts.height);
            } else {
                me.$parent.addClass('um-listview-adaptation');
            }

            if (me.opts.width > 0) {
                me.$element.width(me.opts.width);
            } 
        };

        me.resizeFn();
    };

    ListView.prototype.refresh = function () {
        var me = this;
		me.hideLoadingBar();
    };
	
	ListView.prototype.hideLoadingBar = function(){
		var me = this;
        if (!me.$domResult) return false;
        if (me.pullDirection == 'down') {
            me.$element.scrollTop(0);
        } else if (me.pullDirection == 'up') {
            me.$element.scrollTop(me.$element[0].scrollHeight);
        }
        me.config.isLoading = false;
        me.config.insertDOM = false;
        me.$domResult.remove();
	}

    ListView.prototype.on = function (event, callback) {
        var me = this;
        if (typeof event !== 'string') {
            console.log('on方法的第一个参数必须为字符串');
            return false;
        }
        switch (event) {
            case "pullDown":
                me.pullDown(callback);
                break;
            case "pullUp":
                me.pullUp(callback);
                break;
            case "tapHold":
                me.tapHold(callback);
                break;
            case "itemSwipeLeft":
                me.itemSwipeLeft(callback);
                break;
            case "itemSwipeRight":
                me.itemSwipeRight(callback);
                break;
            case "itemClick":
                me.itemClick(callback);
                break;
            case "itemDelete":
                me.itemDelete(callback);
                break;
        }

        return me;
    };

    ListView.prototype.pullDown = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me.config.pullDownEnable = true;
            me._events.on('pullDown', callback);
        }
        return me;
    };

    ListView.prototype.pullUp = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me.config.pullUpEnable = true;
            me._events.on('pullUp', callback);
        }
        return me;
    };

    ListView.prototype.tapHold = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me.config.tapHoldEnable = true;
            me._events.on("longTap", callback);
        }
        return me;
    };

    ListView.prototype.itemClick = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me._events.on("itemClick", callback);
            if (!me.config.itemClickEnable) {
                me.$list.delegate('.um-listview-row', 'click', function (e) {
                    var $target = $(this);
                    var rowIndex = $target.index();
                    var args = {
                        rowIndex: rowIndex,
                        $target: $target
                    }
                    me._events.trigger("itemClick", me, args);

                });
                me.config.itemClickEnable = true;
            }
        }
        return me;
    };

    ListView.prototype.itemDelete = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me._events.on("itemDelete", function(sender,args){
                var $domSideMenu = args.$target.find('.um-swipe-btns');
                $domSideMenu.removeClass('um-swipe-open');
                callback(sender,args);
            });
            if (!me.config.itemDeleteEnable) {
                me.$list.delegate('.um-listview-row ' + '.um-delete', 'click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var $target = $(this).closest('li');
                    var rowIndex = $target.index();
                    var args = {
                        rowIndex: rowIndex,
                        $target: $target
                    }
                    me._events.trigger("itemDelete", me, args);
                });
                me.config.itemDeleteEnable = true;
            }
        }
        return me;
    };

    ListView.prototype.itemSwipeLeft = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me.config.itemSwipeEnable = true;
            me._events.on('itemSwipeLeft', callback);
        }
        return me;
    };

    ListView.prototype.itemSwipeRight = function (callback) {
        var me = this;
        if (typeof callback == 'function') {
            me.config.itemSwipeEnable = true;
            me._events.on('itemSwipeRight', callback);
        }
        return me;
    };

    ListView.prototype.showItemMenu = function ($elem) {
        if (typeof $elem !== 'object') return false;
        var $domSideMenu = $elem.find('.um-swipe-btns');
        var $domSideMenu_w = $domSideMenu.width();
        $domSideMenu.addClass('um-swipe-open');
        $elem.children('.um-list-item').css('transform', 'translate3d(' + (-$domSideMenu_w) + 'px,0,0)');
    };

    ListView.prototype.hideItemMenu = function ($elem) {
        if (typeof $elem !== 'object') return false;
        var $domSideMenu = $elem.find('.um-swipe-btns');
        $domSideMenu.removeClass('um-swipe-open');
        $elem.children('.um-list-item').css('transform', 'translate3d(0,0,0)');

    };

    root.UM.ListView = ListView;
    root.UM.listview = function (selector, opts) {
        return new ListView(selector, opts);
    };
})(this);
