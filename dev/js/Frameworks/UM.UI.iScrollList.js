    
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com 
// UAP Mobile JavaScript Library v2.7.0
//-----------------------------------------------------------------------
(function(window, UM, undefined){
    UM.iScrollList = function(selector){
        var iScrollList = function(selector){
            var self = this;
            self.element =  document.querySelector(selector);
            if($) self.$element = $(selector);
            self._iScroll = null;
            this._events = new UM.EventMgr();
            self.init(self.element.id);
        }

        // 初始化
        iScrollList.prototype.init = function(id){
            var self = this;
            var   pullDownEl = document.querySelector("#" + id + ' .pullDown');
            var   pullDownOffset = pullDownEl.offsetHeight;
            var   pullUpEl = document.querySelector("#" + id + ' .pullUp');   
            var   pullUpOffset = pullUpEl.offsetHeight;

            this._iScroll = new iScroll(id, {
                scrollbarClass: 'myScrollbar', /* 重要样式 */
                useTransition: false, /* 此属性不知用意，本人从true改为false */
                topOffset: pullDownOffset,
                onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = 'pullDown';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    } else if (pullUpEl.className.match('loading')) {
                        pullUpEl.className = 'pullUp';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'pullDown flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'pullDown';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'pullUp flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始加载...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'pullUp';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'pullDown loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '更新中...';                
                        self.pullDownAction();   // Execute custom function (ajax call?)
                    } else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'pullUp loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';                
                        self.pullUpAction(); // Execute custom function (ajax call?)
                    }
                }
            });
        };


        /**
         * 下拉刷新 （自定义实现此方法）
         * myScroll.refresh();      // 数据加载完成后，调用界面更新方法
         */
        iScrollList.prototype.pullDownAction = function() {
            this._events.trigger("pullDown");
            return this;
        }

        iScrollList.prototype.refresh = function(){
            this._iScroll.refresh();
            return this;
        }

        /**
         * 滚动翻页 （自定义实现此方法）
         * myScroll.refresh();      // 数据加载完成后，调用界面更新方法
         */
        iScrollList.prototype.pullUpAction = function() {
            this._events.trigger("pullUp");
            return this;
        }

        iScrollList.prototype.on = function(eventName, handler) {
            this._events.on(eventName,handler);
            return this;
        }

        iScrollList.prototype.trigger = function(eventName) {
            this._events.trigger(eventName, this, {});
            return this;
        }

        return new iScrollList(selector);
    } 
})(window, UM);