;
(function($, _) {
  'use strict';

  var ev = ev || {
    start: "mousedown",
    move: "mousemove",
    end: "mouseup"
  };

  if ("ontouchstart" in document) {
    ev = {
      start: "touchstart",
      move: "touchmove",
      end: "touchend"
    };
  }
  $.event.special[_] = {
    setup: function() {
      $(this).off('click').on(ev.start + ' ' + ev.end + ' ' + ev.move, function(e) {
        ev.E = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
      }).on(ev.start, function(e) {
        ev.target = e.target;
        //ev.time = new Date().getTime();
        ev.startX = ev.dragX = ev.E.pageX;
        ev.startY = ev.dragY = ev.E.pageY;
        ev.isDragMove = true;

        if (ev.ltaptimer) {
          clearTimeout(ev.ltaptimer);
          ev.ltaptimer = null;
        }

        $(document).on(ev.move, function(e) {

          ev.endX = ev.E.pageX;
          ev.endY = ev.E.pageY;
          var distancex = ev.endX - ev.dragX,
            distancey = ev.endY - ev.dragY;

          ev.dragX = ev.endX;
          ev.dragY = ev.endY;

          if (ev.isDragMove && (Math.abs(distancex) > 1 || Math.abs(distancey) > 1)) {
            e.type = "drag";
            e.pageX = ev.endX;
            e.pageY = ev.endY;
            $.event.dispatch.call(ev.target, e, distancex, distancey);
          }
        })

        $(document).on(ev.end, function(e) {
          ev.isDragMove = false;
        })

        ev.ltaptimer = setTimeout(function() {
          e.type = "longtap";
          e.pageX = ev.endX;
          e.pageY = ev.endY;

          $.event.dispatch.call(this, e);
        }.bind(this), 1000);

        ev.isTouchmove = false;
      }).on(ev.end, function(e) {
        ev.endX = ev.E.pageX;
        ev.endY = ev.E.pageY;
        ev.isswipe = false;
        //if(ev.target != ev.E.target) return false;
        var distancex = ev.endX - ev.startX,
          distancey = ev.endY - ev.startY;

        ev.isswipe = false;

        if (ev.ltaptimer) {
          clearTimeout(ev.ltaptimer);
          ev.ltaptimer = null;
        }
        // 在部分设备上 touch 事件比较灵敏，导致按下和松开手指时地事件坐标会出现一点点变化

        if (Math.abs(ev.startX - ev.endX) < 6 && Math.abs(ev.startY - ev.endY) < 6) {
          e.type = "tap";
          e.pageX = ev.endX;
          e.pageY = ev.endY;
          $.event.dispatch.call(this, e);
          $(this).trigger("tap"); // 事件委托bug
        }
        
        if (!ev.isTouchmove) {
          return;
        }

        if (Math.abs(distancex) >= Math.abs(distancey)) {

          if (distancex < -5) {
            e.type = "swipeleft";
            e.pageX = ev.endX;
            e.pageY = ev.endY;

            $.event.dispatch.call(this, e, distancex, distancey);
            ev.isswipe = true;
          } else if (distancex > 5) {
            e.type = "swiperight";
            e.pageX = ev.endX;
            e.pageY = ev.endY;

            $.event.dispatch.call(this, e, distancex, distancey);
            ev.isswipe = true;
          }
        } else {
          if (distancey < -5) {
            e.type = "swipeup";
            e.pageX = ev.endX;
            e.pageY = ev.endY;

            $.event.dispatch.call(this, e, distancex, distancey);
            ev.isswipe = true;
          } else if (distancey > 5) {
            e.type = "swipedown";
            e.pageX = ev.endX;
            e.pageY = ev.endY;

            $.event.dispatch.call(this, e, distancex, distancey);
            ev.isswipe = true;
          }
        }
        if (ev.isswipe) {
          e.type = "swipe";
          e.pageX = ev.endX;
          e.pageY = ev.endY;

          $.event.dispatch.call(this, e, distancex, distancey);
        }
      }).on(ev.move, function(e) {

        if (ev.ltaptimer && (Math.abs(ev.endX - ev.startX) > 5 || Math.abs(ev.endY - ev.startY) > 5)) {
          clearTimeout(ev.ltaptimer);
          ev.ltaptimer = null;
        }
        ev.isTouchmove = true;
        e.preventDefault();
      });
    },

    /**
     * Disassembling event.
     */
    remove: function() {
      $(this).off(ev.start + ' ' + ev.move + ' ' + ev.end);
    }
  };


  $.each(["longtap", "drag", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown"], function() {
    $.event.special[this] = $.event.special["tap"];
    $.fn[this] = function(fn) {
      return this[fn ? 'on' : 'trigger'](this, fn);
    };
  })
})(jQuery, 'tap');