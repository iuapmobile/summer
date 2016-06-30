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
