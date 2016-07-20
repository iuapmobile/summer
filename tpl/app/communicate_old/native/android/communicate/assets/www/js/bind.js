;
(function (root, factory) {

    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.um = factory();
        root.$view = function(selector, createOptions){
            return um.dom(selector,createOptions);
        };
        root.$model = function(selector, value){
            if(value !== undefined){
                selector && (um.set(selector, value));
            } else {
                if(selector) return um.get(selector);
                return um.get();
            }
        };
        root.$$ = function(arg){
            var type = typeof arg;
            if(!arg) return;
            if(type === 'function'){
                return um.u.ready(arg);
            } else {
                return um.u.dom(arg);
            }
        }

    }

})(this, function () {
    "use strict";
    var um, u, tagPrefix = "data-um";

    //////////////////////////////
    // EVENT EMITTER DEFINITION //
    //////////////////////////////


    var EventEmitter = function () {

        this._watchers = {};
        this._watchersAll = {};

    };

    EventEmitter.prototype.constructor = EventEmitter;

    EventEmitter.prototype.watchAll = function (handler) {

        this._watchersAll = this._watchersAll || [];
        if (!_u.contains(this._watchersAll, handler)) {
            this._watchersAll.push(handler);
        }

    }

    EventEmitter.prototype.watch = function (selector, handler) {

        if (!this._watchers) {
            this._watchers = {};
        }
        this._watchers[selector] = this._watchers[selector] || [];
        this._watchers[selector].push(handler);

    }

    EventEmitter.prototype.findWatcherDeps = function (selector) {

        // Go up to look for parent watchers
        // ex: if "some.nested.value" is the selector, it should also trigger for "some"

        var result = [];
        var watchers = _u.keys(this._watchers);
        watchers.forEach(function (watcher) {
            if (startsWith(selector, watcher)) {
                result.push(watcher);
            }
        });
        return result;

    }

    EventEmitter.prototype.emitChange = function (selector /* , arguments */) {

        if (!this._watchers) {
            this._watchers = {};
        }

        var self = this;

        // Send data down to the local watchers
        var deps = self.findWatcherDeps(selector);
        deps.forEach(function (item) {
            if (self._watchers[item]) {
                self._watchers[item].forEach(function (handler) {
                    handler.apply(self, [self.get(item)]);
                });
            }
        });

        // Send data down to the global watchers
        if (!self._watchersAll || !_u.isArray(self._watchersAll)) {
            return;
        }
        self._watchersAll.forEach(function (watcher) {
            if (_u.isFunction(watcher)) {
                watcher.apply(self, [selector, self.get(selector)]);
            }
        });

    };


    ///////////////////////////////////////////////////
    // _w (strip of the required underscore methods) //
    ///////////////////////////////////////////////////


    var _u = {};

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;

    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;

    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    var flatten = function (input, shallow, strict, output) {
        if (shallow && _u.every(input, _u.isArray)) {
            return concat.apply(output, input);
        }
        for (var i = 0, length = input.length; i < length; i++) {
            var value = input[i];
            if (!_u.isArray(value) && !_u.isArguments(value)) {
                if (!strict) output.push(value);
            } else if (shallow) {
                push.apply(output, value);
            } else {
                flatten(value, shallow, strict, output);
            }
        }
        return output;
    };

    var createCallback = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value);
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other);
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };

    _u.compact = function (array) {
        return _u.filter(array, _u.identity);
    };

    _u.filter = function (obj, predicate, context) {
        var results = [];
        if (obj == null) return results;
        predicate = _u.iteratee(predicate, context);
        _u.each(obj, function (value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };

    _u.identity = function (value) {
        return value;
    };

    _u.every = function (obj, predicate, context) {
        if (obj == null) return true;
        predicate = _u.iteratee(predicate, context);
        var keys = obj.length !== +obj.length && _u.keys(obj),
            length = (keys || obj).length,
            index, currentKey;
        for (index = 0; index < length; index++) {
            currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };

    _u.union = function () {
        return _u.uniq(flatten(arguments, true, true, []));
    };

    _u.uniq = function (array, isSorted, iteratee, context) {
        if (array == null) return [];
        if (!_u.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = _u.iteratee(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            if (isSorted) {
                if (!i || seen !== value) result.push(value);
                seen = value;
            } else if (iteratee) {
                var computed = iteratee(value, i, array);
                if (_u.indexOf(seen, computed) < 0) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (_u.indexOf(result, value) < 0) {
                result.push(value);
            }
        }
        return result;
    };

    _u.pick = function (obj, iteratee, context) {
        var result = {}, key;
        if (obj == null) return result;
        if (_u.isFunction(iteratee)) {
            iteratee = createCallback(iteratee, context);
            for (key in obj) {
                var value = obj[key];
                if (iteratee(value, key, obj)) result[key] = value;
            }
        } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            obj = new Object(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                key = keys[i];
                if (key in obj) result[key] = obj[key];
            }
        }
        return result;
    };

    _u.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    _u.keys = function (obj) {
        if (!_u.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_u.has(obj, key)) keys.push(key);
        return keys;
    };

    _u.contains = function (obj, target) {
        if (obj == null) return false;
        if (obj.length !== +obj.length) obj = _u.values(obj);
        return _u.indexOf(obj, target) >= 0;
    };

    _u.sortedIndex = function (array, obj, iteratee, context) {
        iteratee = _u.iteratee(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = low + high >>> 1;
            if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
        }
        return low;
    };

    _u.property = function (key) {
        return function (obj) {
            return obj[key];
        };
    };

    _u.iteratee = function (value, context, argCount) {
        if (value == null) return _u.identity;
        if (_u.isFunction(value)) return createCallback(value, context, argCount);
        if (_u.isObject(value)) return _u.matches(value);
        return _u.property(value);
    };

    _u.pairs = function (obj) {
        var keys = _u.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };

    _u.matches = function (attrs) {
        var pairs = _u.pairs(attrs), length = pairs.length;
        return function (obj) {
            if (obj == null) return !length;
            obj = new Object(obj);
            for (var i = 0; i < length; i++) {
                var pair = pairs[i], key = pair[0];
                if (pair[1] !== obj[key] || !(key in obj)) return false;
            }
            return true;
        };
    };

    _u.indexOf = function (array, item, isSorted) {
        if (array == null) return -1;
        var i = 0, length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
            } else {
                i = _u.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    };

    _u.values = function (obj) {
        var keys = _u.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    _u.extend = function (obj) {
        if (!_u.isObject(obj)) return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    };

    _u.isArray = function (obj) {
        return toString.call(obj) === '[object Array]';
    };

    _u.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    _u.isUndefined = function (obj) {
        return obj === void 0;
    };

    _u.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    _u.isFunction = function (obj) {
        var type = typeof obj;
        return type === 'function';
    }

    _u.each = function (obj, iteratee, context) {
        if (obj == null) return obj;
        iteratee = createCallback(iteratee, context);
        var i, length = obj.length;
        if (length === +length) {
            for (i = 0; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _u.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };

    _u.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
        _u['is' + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });


    ///////////////////////////////////////////////////////////
    // _json (strip of the required underscore.json methods) //
    ///////////////////////////////////////////////////////////

    var deepJSON = function (obj, key, value, remove) {

        var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
            root,
            i = 0,
            n = keys.length;

        // Set deep value
        if (arguments.length > 2) {

            root = obj;
            n--;

            while (i < n) {
                key = keys[i++];
                obj = obj[key] = _u.isObject(obj[key]) ? obj[key] : {};
            }

            if (remove) {
                if (_u.isArray(obj)) {
                    obj.splice(keys[i], 1);
                } else {
                    delete obj[keys[i]];
                }
            } else {
                obj[keys[i]] = value;
            }

            value = root;

            // Get deep value
        } else {
            while ((obj = obj[keys[i++]]) != null && i < n) {
            }
            ;
            value = i < n ? void 0 : obj;
        }

        return value;

    }

    var _json = {}

    _json.VERSION = '0.1.0';
    _json.debug = true;

    _json.exit = function (source, reason, data, value) {

        if (!_json.debug) return;

        var messages = {};
        messages.noJSON = "Not a JSON";
        messages.noString = "Not a String";
        messages.noArray = "Not an Array";
        messages.missing = "Missing argument";

        var error = {source: source, data: data, value: value};
        error.message = messages[reason] ? messages[reason] : "No particular reason";
        console.log("Error", error);
        return;

    }

    _json.is = function (json) {

        return (toString.call(json) == "[object Object]");

    }

    _json.isStringified = function (string) {

        var test = false;
        try {
            test = /^[\],:{}\s]*$/.test(string.replace(/\\["\\\/bfnrtu]/g, '@').
                replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
        } catch (e) {
        }
        return test;

    }

    _json.get = function (json, selector) {

        if (json == undefined) return _json.exit("get", "missing", "json", json);
        if (selector == undefined) return _json.exit("get", "missing", "selector", selector);
        if (!_u.isString(selector)) return _json.exit("get", "noString", "selector", selector);
        return deepJSON(json, selector);

    };

    _json.set = function (json, selector, value) {

        if (json == undefined) return _json.exit("set", "missing", "json", json);
        if (selector == undefined) return _json.exit("set", "missing", "selector", selector);
        if (!_u.isString(selector)) return _json.exit("set", "noString", "selector", selector);
        return value ? deepJSON(json, selector, value) : _json.remove(json, selector);
        // return deepJSON(json, selector, value); // Now removes the property if the value is empty. Maybe should keep it instead?

    };

    _json.remove = function (json, selector) {

        if (json == undefined) return _json.exit("remove", "missing", "json", json);
        if (selector == undefined) return _json.exit("remove", "missing", "selector", selector);
        if (!_u.isString(selector)) return _json.exit("remove", "noString", "selector", selector);
        return deepJSON(json, selector, null, true);

    }

    _json.push = function (json, selector, value, force) {

        if (json == undefined) return _json.exit("push", "missing", "json", json);
        if (selector == undefined) return _json.exit("push", "missing", "selector", selector);
        var array = _json.get(json, selector);
        if (!_u.isArray(array)) {
            if (force) {
                array = [];
            } else {
                return _json.exit("push", "noArray", "array", array);
            }
        }
        array.push(value);
        return _json.set(json, selector, array);

    }

    _json.unshift = function (json, selector, value) {

        if (json == undefined) return _json.exit("unshift", "missing", "json", json);
        if (selector == undefined) return _json.exit("unshift", "missing", "selector", selector);
        if (value == undefined) return _json.exit("unshift", "missing", "value", value);
        var array = _json.get(json, selector);
        if (!_u.isArray(array)) return _json.exit("unshift", "noArray", "array", array);
        array.unshift(value);
        return _json.set(json, selector, array);

    }

    _json.flatten = function (json) {

        if (json.constructor.name != "Object") return _json.exit("flatten", "noJSON", "json", json);

        var result = {};

        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++) {
                    recurse(cur[i], prop ? prop + "." + i : "" + i);
                    if (l == 0) result[prop] = [];
                }
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty) result[prop] = {};
            }
        }

        recurse(json, "");
        return result;

    }

    _json.unflatten = function (data) {

        if (Object(data) !== data || Array.isArray(data))
            return data;
        var result = {}, cur, prop, idx, last, temp;
        for (var p in data) {
            cur = result, prop = "", last = 0;
            do {
                idx = p.indexOf(".", last);
                temp = p.substring(last, idx !== -1 ? idx : undefined);
                cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
                prop = temp;
                last = idx + 1;
            } while (idx >= 0);
            cur[prop] = data[p];
        }
        return result[""];

    }

    _json.prettyprint = function (json) {

        return JSON.stringify(json, undefined, 2);

    }

    //////////////////////////////////////////
    // uQuery (mini replacement for jQuery) //
    //////////////////////////////////////////

    var uQuery = function () {
    };

    uQuery.constructor = uQuery;

    uQuery.prototype.dom = function (selector, createOptions) {

        var self = this,
            elements = [];

        if (createOptions) {
            var element = document.createElement(selector);
            for (var k in createOptions) {
                element[k] = createOptions[k];
            }
        } else {
            if (_u.isString(selector)) {
                elements = [].slice.call(document.querySelectorAll(selector));
            } else {
                if (_u.isObject(selector) && selector.attributes) {
                    elements = [selector];
                }
            }
            self._elements = elements;
            self.length = elements.length;
            return self;
        }

    }

    uQuery.prototype.trigger = function(event, data){
        var self = this,
            elements = self._elements || [],
            element = elements[0] || {};
        data = data || '';
        if (document.createEventObject){
            // IE浏览器支持fireEvent方法
            var evt = document.createEventObject();
            evt.data = data;
            return element.fireEvent('on'+event,evt)
        } else{
            // 其他标准浏览器使用dispatchEvent方法
            var evt = document.createEvent( 'HTMLEvents' );
            // initEvent接受3个参数：
            // 事件类型，是否冒泡，是否阻止浏览器的默认行为
            evt.initEvent(event, true, true);
            evt.data = data;
            return !element.dispatchEvent(evt);
        }
    }

    uQuery.prototype.on = function (events, fn) {

        var self = this,
            elements = self._elements;
        events = events.split(" ");
        for (var i = 0, lenEl = elements.length; i < lenEl; i++) {
            var element = elements[i];
            for (var j = 0, lenEv = events.length; j < lenEv; j++) {
                if (element.addEventListener) {
                    element.addEventListener(events[j], fn, false);
                }
            }
        }

    }

    uQuery.prototype.find = function (selector) {

        var self = this,
            element = self.get(0),
            elements = [];

        if (_u.isString(selector)) {
            elements = [].slice.call(element.querySelectorAll(selector));
        }
        self._elements = elements;
        return self;

    }

    uQuery.prototype.get = function (index, chain) {

        var self = this,
            elements = self._elements || [],
            element = elements[index] || {};

        if (chain) {
            self._element = element;
            return self;
        } else {
            return _u.isNumber(index) ? element : elements;
        }

    }

    uQuery.prototype.reverse = function () {
        this._elements = this._elements.reverse();
        return this;
    }

    uQuery.prototype.val = function (value) {
        return this.prop("value", value);
    }

    uQuery.prototype.type = function (value) {
        return this.prop("type", value);
    }

    uQuery.prototype.html = function (value) {
        return this.prop("innerHTML", value);
    }

    uQuery.prototype.text = function (value) {
        return this.prop("innerHTML", escapeHTML(value));
    }

    uQuery.prototype.prop = function (prop, value) {

        var self = this,
            elements = self._elements;

        for (var i in elements) {
            if (_u.isUndefined(value)) {
                return elements[i][prop];
            } else {
                elements[i][prop] = value;
            }
        }

    }

    uQuery.prototype.attr = function (attr, value) {

        var self = this,
            elements = self._elements;
        for (var i in elements) {
            if (value === undefined) {
                return elements[i].getAttribute(attr);
            } else {
                elements[i].setAttribute(attr, value);
            }
        }
        return self;

    }

    uQuery.prototype.removeAttr = function (attr) {
        var self = this;
        for (var i in self._elements) self._elements[i].removeAttribute(attr);
        return self;
    }

    uQuery.prototype.addClass = function (c) {
        var self = this;
        for (var i in self._elements) self._elements[i].classList.add(c);
        return self;
    }

    uQuery.prototype.removeClass = function (c) {
        var self = this;
        for (var i in self._elements) self._elements[i].classList.remove(c);
        return self;
    }

    uQuery.prototype.parents = function (selector) {
        var self = this,
            element = self.get(0),
            parent = element.parentNode,
            parents = [];

        while (parent !== null) {
            var o = parent,
                matches = matchesSelector(o, selector),
                isNotDomRoot = (o.doctype === undefined) ? true : false;
            if (!selector) {
                matches = true;
            }
            if (matches && isNotDomRoot) {
                parents.push(o);
            }
            parent = o.parentNode;
        }
        self._elements = parents;
        return self;
    }

    uQuery.prototype.parent = function (selector) {
        var self = this,
            element = self.get(0),
            o = element.parentNode,
            matches = matchesSelector(o, selector);
        if (!selector) {
            matches = true;
        }
        return matches ? o : {};
    }

    uQuery.prototype.clone = function (chain) {
        var self = this,
            element = self.get(0),
            clone = element.cloneNode(true);
        self._elements = [clone];
        return chain ? self : clone;
    }

    uQuery.prototype.empty = function (chain) {
        var self = this,
            element = self.get(0);
        if (!element || !element.hasChildNodes) {
            return chain ? self : element;
        }

        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }
        return chain ? self : element;
    }

    uQuery.prototype.replaceWith = function (newDOM) {
        var self = this,
            oldDOM = self.get(0),
            parent = oldDOM.parentNode;
        parent.replaceChild(newDOM, oldDOM);
    }

    uQuery.prototype.ready = function (callback) {

        if (document && _u.isFunction(document.addEventListener)) {
            document.addEventListener("DOMContentLoaded", callback, false);
        } else if (window && _u.isFunction(window.addEventListener)) {
            window.addEventListener("load", callback, false);
        } else {
            document.onreadystatechange = function () {
                if (document.readyState === "complete") {
                    callback();
                }
            }
        }

    }


    //////////
    // MISC //
    //////////

    var matchesSelector = function (el, selector) {
        var matchers = ["matches", "matchesSelector", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"],
            fn = null;
        for (var i in matchers) {
            fn = matchers[i];
            if (_u.isFunction(el[fn])) {
                return el[fn](selector);
            }
        }
        return false;
    }

    var startsWith = function (str, starts) {

        if (starts === "") {
            return true;
        }
        if (str === null || starts === null) {
            return false;
        }
        str = String(str);
        starts = String(starts);
        return str.length >= starts.length && str.slice(0, starts.length) === starts;

    }

    var endsWith = function (str, ends) {

        if (ends === "") {
            return true;
        }
        if (str === null || ends === null) {
            return false;
        }
        str = String(str);
        ends = String(ends);
        return str.length >= ends.length && str.slice(str.length - ends.length, str.length) === ends;

    }

    var cleanEmptyKeys = function (object) {

        return _u.pick(object, _u.compact(_u.keys(object)));

    }

    var filterStartingWith = function (object, string, type) { // true: pick - false: omit

        var keys = _u.keys(object);
        keys.forEach(function (key) {
            if (type) {
                if (!startsWith(key, string)) {
                    delete object[key];
                }
            } else {
                if (startsWith(key, string)) {
                    delete object[key];
                }
            }
        });
        return object;

    }

    var selectNested = function (data, keys, type) { // true: pick - false: omit

        // Flatten / unflatten to allow for nested picks / omits (doesn't work with regular pick)
        // ex:  data = {something:{nested:"value"}}
        //		keys = ['something.nested']

        var flat = _json.flatten(data);
        for (var i in keys) flat = filterStartingWith(flat, keys[i], type);
        var unflat = _json.unflatten(flat);
        // Unflatten returns an object with an empty property if it is given an empty object
        return cleanEmptyKeys(unflat);

    }

    var pickAndMergeParentArrays = function (object, selector) {

        // Example:
        // object = { a: [1,2,3], a.b: [4,5,6], c: [7,8,9] }
        // fn(object, "a.b")
        // > [1,2,3,4,5,6]

        var keys = [];
        if (selector) {

            // Set bindings for the specified selector

            // (bindings that are repeat items)
            var split = selector.split("."),
                lastKey = split[split.length - 1],
                isArrayItem = !isNaN(lastKey);

            if (isArrayItem) {
                split.pop();
                var key = split.join(".");
                keys = object[key] ? _u.union(keys, object[key]) : keys;
            }

            // (bindings with keys starting with, to include nested bindings)
            for (var key in object) {
                if (startsWith(key, selector)) {
                    keys = _u.union(keys, object[key]);
                }
            }

        } else {

            // Set bindings for all selectors
            for (var key in object) {
                keys = _u.union(keys, object[key]);
            }

        }
        return keys;

    }

    var isPrintableKey = function (e) {

        var keycode = e.keyCode;
        if (!keycode) {
            return true;
        }

        var valid =
            (keycode === 8) || // delete
            (keycode > 47 && keycode < 58) || // number keys
            keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
            (keycode > 64 && keycode < 91) || // letter keys
            (keycode > 95 && keycode < 112) || // numpad keys
            (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
            (keycode > 218 && keycode < 223);   // [\]' (in order)

        return valid;

    }

    var escapeHTML = function (str) {
        return str && _u.isString(str) ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
    }


    ////////////////////
    // UM DEFINITION //
    ////////////////////


    var UM = function () {

        this.data = {};
        this._bindings = {};
        this.options = {
            persistent: true,
            timeoutInput: 50,
            timeoutDOM: 500
        };

    };

    // Inherit from EventEmitter
    UM.prototype = Object.create(EventEmitter.prototype);
    UM.constructor = UM;

    //////////////////////////
    // DOM METHODS CHAINING //
    //////////////////////////

    UM.prototype.dom = function (element) {

        this._element = u.dom(element).get(0);
        return this;

    };

    //////////////////////////////
    // DOM METHODS: DOM -> JSON //
    //////////////////////////////

    UM.prototype.toStorage = function (options, element) {

        var self = this,
            element = element || self._element,
            options = options || self.dom(element).getOptions(),
            data = self.dom(element).toJSON(options),
            scope = self.dom(element).scope(),
            selector = scope ? scope + "." + options.bindfield : options.bindfield;

        if (options.readonly) {
            return false;
        }
        self.set(selector, data, options);

    }

    UM.prototype.toJSON = function (options, element) {

        var self = this,
            element = element || self._element,
            data = self.dom(element).getValue(),
            options = options || self.dom(element).getOptions();

        if (_u.isArray(options.pick)) {
            data = selectNested(data, options.pick, true);
        }
        if (_u.isArray(options.omit)) {
            data = selectNested(data, options.omit, false);
        }

        return data;

    }

    //////////////////////////////
    // DOM METHODS: JSON -> DOM //
    //////////////////////////////

    UM.prototype.fromStorage = function (options, element) {

        var self = this,
            element = element || self._element,
            options = options || self.dom(element).getOptions();

        if (options.writeonly) {
            return false;
        }

        var scope = self.dom(element).scope(),
            selector = scope ? scope + "." + options.bindfield : options.bindfield,
            data = self.get(selector);

        self.dom(element).fromJSON(data, options);

    }

    UM.prototype.fromJSON = function (data, options, element) {

        var self = this,
            element = element || self._element,
            options = options || self.dom(element).getOptions();

        if (options.writeonly) {
            return false;
        }

        if (_u.isObject(data)) {
            if (_u.isArray(options.pick)) {
                data = selectNested(data, options.pick, true);
            }
            if (_u.isArray(options.omit)) {
                data = selectNested(data, options.omit, false);
            }
            var currentData = _u.isObject(self.dom(element).toJSON()) ? self.dom(element).toJSON() : {};
            data = _u.extend(currentData, data);
        }

        if (options.json) {
            data = _json.isStringified(data) ? data : _json.prettyprint(data);
        }

        self.dom(element).setValue(data, options);

    }

    /////////////////////////////////
    // DOM METHODS: GET - SET HTML //
    /////////////////////////////////

    UM.prototype.getValue = function (element) {

        var self = this,
            element = element || self._element;

        var getters = {
            "SELECT": function () {
                return u.dom(element).val();
            },
            "INPUT": function () {
                var type = u.dom(element).type();
                if (_u.contains(["text", "password"], type)) {
                    return u.dom(element).val();
                }
                if (_u.contains(["checkbox", "radio"], type)) {
                    return u.dom(element).prop("checked") ? u.dom(element).val() : null;
                }

            },
            "TEXTAREA": function () {
                return u.dom(element).val();
            }
        }
        var defaultGetter = function (a) {
            return u.dom(element).html();
        }

        var elementType = u.dom(element).get(0).tagName;
        var getter = getters[elementType] || defaultGetter;
        return getter();

    }

    UM.prototype._transforms = {
        uppercase: function (data) {
            return _u.isString(data) ? data.toUpperCase() : data;
        },
        lowercase: function (data) {
            return _u.isString(data) ? data.toLowerCase() : data;
        },
        reverse: function (data) {
            return data && data.split && _u.isFunction(data.split) ? data.split("").reverse().join("") : data;
        }
    };

    UM.prototype.registerTransform = function (name, transform) {
        var self = this;
        if (_u.isFunction(transform)) {
            self._transforms[name] = transform;
        }
    }

    UM.prototype.setValue = function (data, options, element) {
        var self = this,
            element = element || self._element,
            options = options || self.dom(element).getOptions();
        console.log(data);

       /* options.transform = options.transform || [];
        options.transform.forEach(function (transformName) {
            var transform = self._transforms[transformName] || function (data) {
                    return data
                };
            data = transform(data);
        });*/

        var setters = {

            "SELECT": function (a) {
                u.dom(element).val(a);
            },
            "INPUT": function (a) {
                if (!_u.isString(a)) {
                    a = JSON.stringify(a);
                }
                var type = u.dom(element).get(0).type;
                if (_u.contains(["text", "password"], type)) {
                    u.dom(element).val(a || "");
                } else if (_u.contains(["checkbox", "radio"], type)) {
                    if (a === u.dom(element).val()) {
                        u.dom(element).prop("checked", true);
                    } else {
                        u.dom(element).prop("checked", false);
                    }
                } else {
                    u.dom(element).val(a || "");
                }

            },
            "TEXTAREA": function (a) {
                if (!_u.isString(a)) {
                    a = JSON.stringify(a);
                }
                u.dom(element).val(a || "");
            },
            "PRE": function (a) {
                if (options.html) {
                    u.dom(element).html(a);
                } else {
                    u.dom(element).text(a);
                }
            },
            "A": function (a) {
                if (options.href) {
                    var scope, key, val;
                    scope = um.dom(element).scope();
                    key = scope ? scope + '.' + options.href : options.href;
                    val = um.get(key);
                    u.dom(element).attr("href", val);
                }

                if (options.html) {
                    w.dom(element).html(a);
                } else {
                    w.dom(element).text(a);
                }
            },
            "IMG": function (a) {

                if (!a) {
                    a = options.default || "";
                    u.dom(element).attr("src", a);
                    return false;
                }

                var isValidImageUrl = function (url, cb) {
                    u.dom(element).addClass("um-loading");
                    u.dom("img", {
                        src: url,
                        onerror: function () {
                            cb(false);
                        },
                        onload: function () {
                            cb(true);
                        }
                    });
                }

                isValidImageUrl(a, function (response) {
                    u.dom(element).removeClass("um-loading");
                    if (response) {
                        u.dom(element).removeClass("um-error").addClass("um-success");
                    } else {
                        if (a) {
                            u.dom(element).addClass("um-error");
                        } else {
                            u.dom(element).removeClass("um-error").removeClass("um-success");
                        }
                        a = options.default || "";
                    }
                    u.dom(element).attr("src", a);
                });

            }

        }
        var defaultSetter = function (a) {

            if (options.html) {
                u.dom(element).html(a);
            } else {
                u.dom(element).text(a);
            }

        }

        var elementType = u.dom(element).get(0).tagName;
        var setter = setters[elementType] || defaultSetter;
      /*  data = data || '';*/
        setter(data);

    }

    UM.prototype.setDefault = function (force, options, element) {

        var self = this,
            element = element || self._element,
            force = force || false,
            options = options ? _u.extend(self.dom(element).getOptions(), options) : self.dom(element).getOptions();

        // Should we just set the default value in the DOM, or also in the datastore?
        if (!options.default) {
            return false;
        }
        if (force) {
            self.set(options.bindfield, options.default, options);
        } else {
            self.dom(element).setValue(options.default, options);
        }

    }

    UM.prototype.setDefaults = function () {

        var self = this,
            dataSelector = "[" + tagPrefix + "-default]";

        var elements = u.dom(dataSelector).get();
        for (var i in elements) {
            var element = elements[i],
                options = self.dom(element).getOptions(),
                selector = options.bindfield || null,
                data = selector ? self.get(selector) : null;
            if (!data) {
                self.dom(element).setDefault();
            }
        }

    }

    ///////////////////////////////////
    // DOM METHODS: EVENTS LISTENERS //
    ///////////////////////////////////
    UM.prototype.on = function (events, fn, element) {
        var self = this,
            element = element || self._element;
        u.dom(element).on(events, fn);
        return this;
    };


    /////////////////////////////////////
    // DOM METHODS: GET - SET BINDINGS //
    /////////////////////////////////////

    // Scans the DOM to look for new bindings
    UM.prototype.registerBindings = function () {

        // Dealing with bindings removed from the DOM by just resetting all the bindings all the time.
        // Isn't there a better way?
        // One idea would be to add a "way-bound" class to bound elements
        // self._bindings = {};

        var self = this;
        var selector = "[" + tagPrefix + "-bindfield]";
        self._bindings = {};

        var elements = u.dom(selector).get();
        for (var i in elements) {
            var element = elements[i],
                options = self.dom(element).getOptions(),
                scope = self.dom(element).scope(),
                selector = scope ? scope + "." + options.bindfield : options.bindfield;

            self._bindings[selector] = self._bindings[selector] || [];
            if (!_u.contains(self._bindings[selector], u.dom(element).get(0))) {
                self._bindings[selector].push(u.dom(element).get(0));
            }

        }

    }

    UM.prototype.updateBindings = function (selector) {

        var self = this;
        self._bindings = self._bindings || {};

        // Set bindings for the data selector
        var bindings = pickAndMergeParentArrays(self._bindings, selector);
        bindings.forEach(function (element) {
            var focused = (u.dom(element).get(0) === u.dom(":focus").get(0)) ? true : false;
            if (!focused) {
                self.dom(element).fromStorage();
            }
        });

        // Set bindings for the global selector
        if (self._bindings["__all__"]) {
            self._bindings["__all__"].forEach(function (element) {
                self.dom(element).fromJSON(self.data);
            });
        }

    }

    ////////////////////////////////////
    // DOM METHODS: GET - SET REPEATS //
    ////////////////////////////////////

    UM.prototype.registerRepeats = function () {

        // Register repeats
        var self = this;
        var selector = "[" + tagPrefix + "-repeat]";
        self._repeats = self._repeats || {};
        self._repeatsCount = self._repeatsCount || 0;

        var elements = u.dom(selector).get();
        for (var i in elements) {
            var element = elements[i],
                options = self.dom(element).getOptions();

            self._repeats[options.repeat] = self._repeats[options.repeat] || [];

            var wrapperAttr = tagPrefix + "-repeat-wrapper=\"" + self._repeatsCount + "\"",
                parent = u.dom(element).parent("[" + wrapperAttr + "]");
            if (!parent.length) {

                self._repeats[options.repeat].push({
                    id: self._repeatsCount,
                    element: u.dom(element).clone(true).removeAttr(tagPrefix + "-repeat").removeAttr(tagPrefix + "-filter").get(0),
                    selector: options.repeat,
                    filter: options.filter
                });

                var wrappertag = options.wrappertag || "div";
                var wrapper = document.createElement(wrappertag);
                u.dom(wrapper).attr(tagPrefix + "-repeat-wrapper", self._repeatsCount);
                u.dom(wrapper).attr(tagPrefix + "-scope", options.repeat);
                if (options.filter) {
                    u.dom(wrapper).attr(tagPrefix + "-filter", options.filter);
                }

                u.dom(element).replaceWith(wrapper);
                self.updateRepeats(options.repeat);

                self._repeatsCount++;

            }

        }

    }

    /*
     UM.prototype._filters = {
     noFalsy: function(item ) {
     if (!item) {
     return false;
     } else {
     return true;
     }
     }
     };

     UM.prototype.registerFilter = function(name, filter) {
     var self = this;
     if (_w.isFunction(filter)) { self._filters[name] = filter; }
     }
     */

    UM.prototype.updateRepeats = function (selector) {

        var self = this;
        self._repeats = self._repeats || {};

        var repeats = pickAndMergeParentArrays(self._repeats, selector);

        repeats.forEach(function (repeat) {

            var wrapper = "[" + tagPrefix + "-repeat-wrapper=\"" + repeat.id + "\"]",
                data = self.get(repeat.selector),
                items = [];

            repeat.filter = repeat.filter || [];
            u.dom(wrapper).empty();

            for (var key in data) {

                /*
                 var item = data[key],
                 test = true;
                 for (var i in repeat.filter) {
                 var filterName = repeat.filter[i];
                 var filter = self._filters[filterName] || function(data) { return data };
                 test = filter(item);
                 if (!test) { break; }
                 }
                 if (!test) { continue; }
                 */

                u.dom(repeat.element).attr(tagPrefix + "-scope", key);
                var html = u.dom(repeat.element).get(0).outerHTML;
                html = html.replace(/\$\$key/gi, key);
                items.push(html);

            }

            u.dom(wrapper).html(items.join(""));
            self.registerBindings();
            self.updateBindings();

        });

    }

    ////////////////////////
    // DOM METHODS: FORMS //
    ////////////////////////

    UM.prototype.updateForms = function () {


        var self = this;
        var selector = "form[" + tagPrefix + "-bindfield]";

        var elements = u.dom(selector).get();

        for (var i in elements) {

            var form = elements[i],
                options = self.dom(form).getOptions(),
                formDataSelector = options.bindfield;
            u.dom(form).removeAttr(tagPrefix + "-bindfield");

            // Reverse needed to set the right index for "[]" names
            var inputs = u.dom(form).find("[name]").reverse().get();
            for (var i in inputs) {

                var input = inputs[i],
                    name = u.dom(input).attr("name");

                if (endsWith(name, "[]")) {
                    var array = name.split("[]")[0],
                        arraySelector = "[name^='" + array + "']",
                        arrayIndex = u.dom(form).find(arraySelector).get().length;
                    name = array + "." + arrayIndex;
                }
                var selector = formDataSelector + "." + name;
                options.bindfield = selector;
                self.dom(input).setOptions(options);
                u.dom(input).removeAttr("name");

            }

        }

    }

    /////////////////////////////////////////////
    // DOM METHODS: GET - SET ALL DEPENDENCIES //
    /////////////////////////////////////////////

    UM.prototype.registerDependencies = function () {

        this.registerBindings();
        this.registerRepeats();

    }

    UM.prototype.updateDependencies = function (selector) {

        this.updateBindings(selector);
        this.updateRepeats(selector);
        this.updateForms(selector);

    }

    //////////////////////////////////
    // DOM METHODS: OPTIONS PARSING //
    //////////////////////////////////

    UM.prototype.setOptions = function (options, element) {

        var self = this,
            element = self._element || element;

        for (var k in options) {
            var attr = tagPrefix + "-" + k,
                value = options[k];
            u.dom(element).attr(attr, value);
        }

    }

    UM.prototype.getOptions = function (element) {

        var self = this,
            element = element || self._element,
            defaultOptions = {
                bindfield: null,
                html: false,
                readonly: false,
                writeonly: false,
                persistent: false
            };
        return _u.extend(defaultOptions, self.dom(element).getAttrs(tagPrefix));

    }

    UM.prototype.getAttrs = function (prefix, element) {

        var self = this,
            element = element || self._element;

        var parseAttrValue = function (key, value) {

            var attrTypes = {
                pick: "array",
                omit: "array",
                readonly: "boolean",
                writeonly: "boolean",
                json: "boolean",
                html: "boolean",
                persistent: "boolean"
            };

            var parsers = {
                array: function (value) {
                    return value.split(",");
                },
                boolean: function (value) {
                    if (value === "true") {
                        return true;
                    }
                    if (value === "false") {
                        return false;
                    }
                    return true;
                }
            };
            var defaultParser = function () {
                return value;
            };
            var valueType = attrTypes[key] || null;
            var parser = parsers[valueType] || defaultParser;

            return parser(value);

        }

        var attributes = {};
        var attrs = [].slice.call(u.dom(element).get(0).attributes);
        attrs.forEach(function (attr) {
            var include = (prefix && startsWith(attr.name, prefix + "-")) ? true : false;
            if (include) {
                var name = (prefix) ? attr.name.slice(prefix.length + 1, attr.name.length) : attr.name;
                var value = parseAttrValue(name, attr.value);
                if (_u.contains(["transform", "filter"], name)) {
                    value = value.split("|");
                }
                attributes[name] = value;
            }
        });

        return attributes;

    }

    //////////////////////////
    // DOM METHODS: SCOPING //
    //////////////////////////

    UM.prototype.scope = function (options, element) {

        var self = this,
            element = element || self._element,
            scopeAttr = tagPrefix + "-scope",
            scopeBreakAttr = tagPrefix + "-scope-break",
            scopes = [],
            scope = "";

        var parentsSelector = "[" + scopeBreakAttr + "], [" + scopeAttr + "]";
        var elements = u.dom(element).parents(parentsSelector).get();
        for (var i in elements) {
            var el = elements[i];
            if (u.dom(el).attr(scopeBreakAttr)) {
                break;
            }
            var attr = u.dom(el).attr(scopeAttr);
            scopes.unshift(attr);
        }
        if (u.dom(element).attr(scopeAttr)) {
            scopes.push(u.dom(element).attr(scopeAttr));
        }
        if (u.dom(element).attr(scopeBreakAttr)) {
            scopes = [];
        }

        scope = _u.compact(scopes).join(".");

        return scope;

    }

    //////////////////
    // DATA METHODS //
    //////////////////

    UM.prototype.get = function (selector) {

        var self = this;
        if (selector !== undefined && !_u.isString(selector)) {
            return false;
        }
        if (!self.data) {
            return {};
        }
        return selector ? _json.get(self.data, selector) : self.data;

    }

    UM.prototype.set = function (selector, value, options) {

        if (!selector) {
            return false;
        }
        if (selector.split(".")[0] === "this") {
            console.log("Sorry, \"this\" is a reserved word in um.js");
            return false;
        }

        var self = this;
        options = options || {};

        if (selector) {

            if (!_u.isString(selector)) {
                return false;
            }
            self.data = self.data || {};
            self.data = selector ? _json.set(self.data, selector, value) : {};

            self.updateDependencies(selector);
            if (!options.silent)self.emitChange(selector, value);
            if (options.persistent) {
                self.backup(selector);
            }
        }

    }

    UM.prototype.push = function (selector, value, options) {

        if (!selector) {
            return false;
        }

        var self = this;
        options = options || {};

        if (selector) {
            self.data = selector ? _json.push(self.data, selector, value, true) : {};
        }

        self.updateDependencies(selector);
        if (!options.silent) self.emitChange(selector, null);
        if (options.persistent) {
            self.backup(selector);
        }

    }

    UM.prototype.unshift = function (selector, value, options) {

        if (!selector) {
            return false;
        }

        var self = this;
        options = options || {};

        if (selector) {
            self.data = selector ? _json.unshift(self.data, selector, value, true) : {};
        }

        self.updateDependencies(selector);
        if(!options.silent) self.emitChange(selector, null);
        if (options.persistent) {
            self.backup(selector);
        }

    }


    UM.prototype.remove = function (selector, options) {

        var self = this;
        options = options || {};

        if (selector) {
            self.data = _json.remove(self.data, selector);
        } else {
            self.data = {};
        }

        self.updateDependencies(selector);
        if (!options.silent) self.emitChange(selector, null);
        if (options.persistent) {
            self.backup(selector);
        }

    }

    UM.prototype.clear = function () {

        this.remove(null, {persistent: true});

    }

    //////////////////////////
    // LOCALSTORAGE METHODS //
    //////////////////////////

    UM.prototype.backup = function () {

        var self = this;
        if (!self.options.persistent) {
            return;
        }
        try {
            var data = self.data || {};
            localStorage.setItem(tagPrefix, JSON.stringify(data));
        } catch (e) {
            console.log("Your browser does not support localStorage.");
        }

    }

    UM.prototype.restore = function () {

        var self = this;
        if (!self.options.persistent) {
            return;
        }
        try {
            var data = localStorage.getItem(tagPrefix);
            try {
                data = JSON.parse(data);
                for (var key in data) {
                    self.set(key, data[key]);
                }
            } catch (e) {
            }
        } catch (e) {
            console.log("Your browser does not support localStorage.");
        }

    }


    //////////////////////
    // WATCH DOM EVENTS //
    //////////////////////

    um = new UM();

    var timeoutInput = null;
    var eventInputChange = function (e) {
        if (timeoutInput) {
            clearTimeout(timeoutInput);
        }
        timeoutInput = setTimeout(function () {
            var element = u.dom(e.target).get(0);
            um.dom(element).toStorage();
        }, um.options.timeout);
    }

    var eventClear = function (e) {
        e.preventDefault();
        var options = um.dom(this).getOptions();
        um.remove(options.bindfield, options);
    }

    var eventPush = function (e) {
        e.preventDefault();
        var options = um.dom(this).getOptions();
        if (!options || !options["action-push"]) {
            return false;
        }
        var split = options["action-push"].split(":"),
            selector = split[0] || null,
            value = split[1] || null;
        um.push(selector, value, options);
    }

    var eventRemove = function (e) {
        e.preventDefault();
        var options = um.dom(this).getOptions();
        if (!options || !options["action-remove"]) {
            return false;
        }
        um.remove(options["action-remove"], options);
    }

    var timeoutDOM = null;
    var eventDOMChange = function () {

        // We need to register dynamically added bindings so we do it by watching DOM changes
        // We use a timeout since "DOMSubtreeModified" gets triggered on every change in the DOM (even input value changes)
        // so we can limit the number of scans when a user is typing something
        if (timeoutDOM) {
            clearTimeout(timeoutDOM);
        }
        timeoutDOM = setTimeout(function () {
            um.registerDependencies();
            setEventListeners();
        }, um.options.timeoutDOM);

    }

    //////////////
    // INITIATE //
    //////////////

    u = new uQuery();
    um.u = u;
    um._u = _u;
    um._json = _json;

    var setEventListeners = function () {

        u.dom("body").on("DOMSubtreeModified", eventDOMChange);
        u.dom("[" + tagPrefix + "-bindfield]").on("input change", eventInputChange);
        u.dom("[" + tagPrefix + "-clear]").on("click", eventClear);
        u.dom("[" + tagPrefix + "-action-remove]").on("click", eventRemove);
        u.dom("[" + tagPrefix + "-action-push]").on("click", eventPush);


    }

    var eventInit = function () {

        setEventListeners();
        um.restore();
        um.setDefaults();
        um.registerDependencies();
        um.updateDependencies();

    }

    u.ready(eventInit);

    return um;
});