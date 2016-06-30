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
});