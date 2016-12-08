;
(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("requires a window with a document");
                }
                return factory(w);
            };
    } else if (typeof define === "function" && define.amd) {
        define(["jquery", "UM"], function () {
            return factory(global);
        });
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var activeDom = function (type, options) {
        this.type = type;
        if (options) {
            this.settings = options;
            var itemtarget = '#actionsheet';
            this.open(itemtarget);
        }

    }
    activeDom.prototype = {
        constructor: activeDom,
        open: function (target, pushPageDirection) {

            var that = this;
            this.$target = target && $(target).length && $(target);
            this.direction = pushPageDirection;
            if (target == '#actionsheet') {

                this._generateHTMl();
                this._showHtml();
                this.$target = this.actionSheet;
            }

            if (!this.$target || !this.$target.hasClass("um-" + this.type)) {
                return;
            }
            this.$target.addClass("active");
            var that = this;
            setTimeout(function () {
                that.$target.css('transform', 'translate3d(0, 0, 0)');
            }, 100)
            if (pushPageDirection) {
                var pushPageClass = "um-page-pushfrom" + pushPageDirection;
                this.$target.data("pushPageClass", pushPageClass);

                $(".um-page.active").addClass("um-transition-default").addClass(pushPageClass);
            }
            this.$overlay = pushPageDirection ? $('<div class="overlay"></div>') : $('<div class="overlay"></div>');

            this.$target.before(this.$overlay);
            //取消点击遮罩层
            /* this.$overlay.on(UM.UI.eventType.down, function () {
             that.close();
             });*/
        },
        _generateHTMl: function () {
            var settings = this.settings ? this.settings : {};
            var type = this.type,
                that = this;
            if (type == 'actionsheet') {
                var $content = $('<div class="um-actionsheet" id="actionsheet"> <ul class="um-list um-list-corner"> <li> <div class="btn action-cancle">取消</div> </li> </ul> </div>');
                var $firstUl = $('<ul class="um-list um-list-corner"></ul>');
                $content.prepend($firstUl);
                if (settings.title) {
                    var $title = $('<li> <p class="btn popup-title">' + settings.title + ' </p> </li>');
                    $firstUl.append($title)
                }
                if (settings.items) {
                    for (var i = 0; i < settings.items.length; i++) {
                        var $li = $('<li> <div class="btn action-item">' + settings.items[i] + '</div> </li>');
                        $firstUl.append($li);
                    }
                }
                that.content = $content;
            }


        },
        _showHtml: function () {
            var actionSheet = $(this.content).appendTo($('body'));
            $(this.content).css('transform', 'translate3d(0, 100%, 0)');
            this.actionSheet = actionSheet;
            this._attachEvent();
        },
        _attachEvent: function () {
            var that = this;
            that.actionSheet.on('click', '.action-item', function (e) {
                e.preventDefault();
                var index = $('.um-actionsheet .action-item').index($(this));
                var callback = that.settings.callbacks[index];
                setTimeout(function () {
                    callback();
                }, 100);
                that.close();
            });
            that.actionSheet.on('click', '.action-cancle', function () {
                that.close();
            })
        },

        close: function () {
            var that = this;
            if (!this.$target) {
                // 关闭所有
                $("um-" + this.type).removeClass("active");
                setTimeout(function () {
                    $("um-" + this.type).css('transform', 'translate3d(0, 100%, 0)');
                    that.$overlay.remove();
                }, 300)
            } else {
                this.$target.removeClass("active");
                if (this.direction == 'left' || this.direction == 'leftCover') {
                    that.$target.css('transform', 'translate3d(-100%, 0, 0)');
                } else if (this.direction == 'right' || this.direction == 'rightCover') {
                    that.$target.css('transform', 'translate3d(100%, 0, 0)');
                } else {
                    that.$target.css('transform', 'translate3d(0, 100%, 0)');
                }
                if (this.type == 'actionsheet') {
                    setTimeout(function () {
                        that.actionSheet.remove();
                    }, 1000)
                }
                that.$overlay.remove();
            }


            var pushPageClass = this.$target.data("pushPageClass");
            if (pushPageClass) {
                $(".um-page.active").removeClass(pushPageClass).one("webkitTransitionEnd", function () {
                    $(this).removeClass("um-transition-default");
                })
            }
        }
    }

    UM.actionsheet = function (options) {
        var type = 'actionsheet';
        return new activeDom(type, options)
    };
    //UM.actionsheet = new activeDom("actionsheet");
    UM.share = new activeDom("share");
    UM.sidebar = new activeDom("sidebar");
    UM.poppicker = new activeDom("poppicker");
}))