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
    var activeDom = function(type){
        this.type = type;
    }
    activeDom.prototype = {
        constructor: activeDom,
        open: function(target, pushPageDirection){
            var that = this;
            this.$target = target && $(target).length && $(target);

            if(!this.$target || !this.$target.hasClass("um-" + this.type)) {
                return;
            } 
            this.$target.addClass("active");
            if (pushPageDirection) {
                var pushPageClass = "um-page-pushfrom" + pushPageDirection;
                this.$target.data("pushPageClass", pushPageClass);

                $(".um-page.active").addClass("um-transition-default").addClass(pushPageClass);
            }
            this.$overlay = pushPageDirection? $('<div class="overlay" style="background-color:rgba(0,0,0,0.1)"></div>'): $('<div class="overlay"></div>');

            this.$target.before(this.$overlay);
            
            this.$overlay.on(UM.UI.eventType.down, function() {
                that.close();
            });
        },
        close: function(){
            if(!this.$target) {
                // 关闭所有
                $("um-" + this.type).removeClass("active");
            } else {
                this.$target.removeClass("active");
            }
            this.$overlay.remove();
            var pushPageClass = this.$target.data("pushPageClass");
            if (pushPageClass) {
                $(".um-page.active").removeClass(pushPageClass).one("webkitTransitionEnd", function(){
                    $(this).removeClass("um-transition-default");
                })
            }
        }
    }
    UM.actionsheet = new activeDom("actionsheet");
    UM.sidebar = new activeDom("sidebar");
    UM.poppicker = new activeDom("poppicker");
}))