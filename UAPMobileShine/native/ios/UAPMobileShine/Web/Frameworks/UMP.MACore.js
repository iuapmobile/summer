
//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
//-----------------------------------------------------------------------
// UMP.MACore.js
// UMP.UI.Mvc Framework Base.


Function.__typeName = 'Function';
Function.createDelegate = function Function$createDelegate(instance, method) {     
    return function() {
        return method.apply(instance, arguments);
    }
}

if(typeof(window)=="undefined"){
    this.window=this;
}

window.Type = Function;

window.__rootNamespaces = [];
window.__registeredTypes = {};

Type.__fullyQualifiedIdentifierRegExp = new RegExp("^[^.0-9 \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]([^ \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]*[^. \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\])?$", "i");
Type.__identifierRegExp = new RegExp("^[^.0-9 \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\][^. \\s|,;:&*=+\\-()\\[\\]{}^%#@!~\\n\\r\\t\\f\\\\]*$", "i");

Type.prototype.callBaseMethod = function Type$callBaseMethod(instance, name, baseArguments) {

    var baseMethod = this.getBaseMethod(instance, name);
    if (!baseMethod) throw "Error.invalidOperation(String.format(Sys.Res.methodNotFound, name))";
    if (!baseArguments) {
        return baseMethod.apply(instance);
    }
    else {
        return baseMethod.apply(instance, baseArguments);
    }
}

Type.prototype.getBaseMethod = function Type$getBaseMethod(instance, name) {

    if (!this.isInstanceOfType(instance)) throw "Error.argumentType('instance', Object.getType(instance), this)";
    var baseType = this.getBaseType();
    if (baseType) {
        var baseMethod = baseType.prototype[name];
        return (baseMethod instanceof Function) ? baseMethod : null;
    }

    return null;
}

Type.prototype.getBaseType = function Type$getBaseType() {
    if (arguments.length !== 0) throw "Error.parameterCount()";
    return (typeof(this.__baseType) === "undefined") ? null : this.__baseType;
}

Type.prototype.getInterfaces = function Type$getInterfaces() {
    /// <returns type="Array" elementType="Type" mayBeNull="false" elementMayBeNull="false"></returns>
    if (arguments.length !== 0) throw "Error.parameterCount()";
    var result = [];
    var type = this;
    while(type) {
        var interfaces = type.__interfaces;
        if (interfaces) {
            for (var i = 0, l = interfaces.length; i < l; i++) {
                var interfaceType = interfaces[i];
                if (!Array.contains(result, interfaceType)) {
                    result[result.length] = interfaceType;
                }
            }
        }
        type = type.__baseType;
    }
    return result;
}

Type.prototype.getName = function Type$getName() {
    /// <returns type="String"></returns>
    if (arguments.length !== 0) throw "Error.parameterCount()";
    return (typeof(this.__typeName) === "undefined") ? "" : this.__typeName;
}

Type.prototype.implementsInterface = function Type$implementsInterface(interfaceType) {

    this.resolveInheritance();

    var interfaceName = interfaceType.getName();
    var cache = this.__interfaceCache;
    if (cache) {
        var cacheEntry = cache[interfaceName];
        if (typeof(cacheEntry) !== 'undefined') return cacheEntry;
    }
    else {
        cache = this.__interfaceCache = {};
    }

    var baseType = this;
    while (baseType) {
        var interfaces = baseType.__interfaces;
        if (interfaces) {
            if (Array.indexOf(interfaces, interfaceType) !== -1) {
                return cache[interfaceName] = true;
            }
        }

        baseType = baseType.__baseType;
    }

    return cache[interfaceName] = false;
}

Type.prototype.inheritsFrom = function Type$inheritsFrom(parentType) {

    this.resolveInheritance();
    var baseType = this.__baseType;
    while (baseType) {
        if (baseType === parentType) {
            return true;
        }
        baseType = baseType.__baseType;
    }

    return false;
}

Type.prototype.initializeBase = function Type$initializeBase(instance, baseArguments) {

    if (!this.isInstanceOfType(instance)) throw "Error.argumentType('instance', Object.getType(instance), this)";

    this.resolveInheritance();
    if (this.__baseType) {
        if (!baseArguments) {
            this.__baseType.apply(instance);
        }
        else {
            this.__baseType.apply(instance, baseArguments);
        }
    }

    return instance;
}

Type.prototype.isImplementedBy = function Type$isImplementedBy(instance) {

    if (typeof(instance) === "undefined" || instance === null) return false;

    var instanceType = Object.getType(instance);
    return !!(instanceType.implementsInterface && instanceType.implementsInterface(this));
}

Type.prototype.isInstanceOfType = function Type$isInstanceOfType(instance) {

    if (typeof(instance) === "undefined" || instance === null) return false;

    if (instance instanceof this) return true;

    var instanceType = Object.getType(instance);
    return !!(instanceType === this) ||
           (instanceType.inheritsFrom && instanceType.inheritsFrom(this)) ||
           (instanceType.implementsInterface && instanceType.implementsInterface(this));
}

Type.prototype.registerClass = function Type$registerClass(typeName, baseType, interfaceTypes) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(typeName)) throw "Error.argument('typeName', Sys.Res.notATypeName)";
        var parsedName;
    try {
        parsedName = eval(typeName);
    }
    catch(e) {
        throw "Error.argument('typeName', Sys.Res.argumentTypeName)";
    }
    if (parsedName !== this) throw "Error.argument('typeName', Sys.Res.badTypeName)";
    if (window.__registeredTypes[typeName]){		
		//暂时不处理重复注册类的情况，重复出测时，后面的生效
		//throw "Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, typeName))";		
		//throw "重复注册！已经注册了类型["+typeName+"]，请检查";
		//ctx1.a-->ctx2
		//ctx2.b-->ctx2
		//ctx2会出现重复注册的情况
	}
    if ((arguments.length > 1) && (typeof(baseType) === 'undefined')){
		alert("baseType of [" + typeName + " ] is 'undefined', probably error in the baseType");
		throw "Error.argumentUndefined('baseType')";
	}
	if(typeof baseType == "string"){
		alert("baseType of [" + typeName + " ] is not a class but a string["+baseType+"], please modify it");
		throw "Error.argument('baseType', Sys.Res.baseNotAClass)";
	}
	if (baseType && !baseType.__class){
		alert("baseType of [" + typeName + " ] is not a class, probably error in the baseType");
		throw "Error.argument('baseType', Sys.Res.baseNotAClass)";
	}
	
    this.prototype.constructor = this;
    this.__typeName = typeName;
    this.__class = true;
    if (baseType) {
        this.__baseType = baseType;
        this.__basePrototypePending = true;
    }
        if (!window.__classes) window.__classes = {};
    window.__classes[typeName.toUpperCase()] = this;

                if (interfaceTypes) {
        this.__interfaces = [];
        for (var i = 2; i < arguments.length; i++) {
            var interfaceType = arguments[i];
            if (!interfaceType.__interface) throw "Error.argument('interfaceTypes[' + (i - 2) + ']', Sys.Res.notAnInterface)";
            this.resolveInheritance();
            for (var methodName in interfaceType.prototype) {
                var method = interfaceType.prototype[methodName];
                if (!this.prototype[methodName]) {
                    this.prototype[methodName] = method;
                }
            }
            this.__interfaces.push(interfaceType);
        }
    }
    window.__registeredTypes[typeName] = true;

    return this;
}

Type.prototype.registerInterface = function Type$registerInterface(typeName) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(typeName)) "throw Error.argument('typeName', Sys.Res.notATypeName)";
        var parsedName;
    try {
        parsedName = eval(typeName);
    }
    catch(e) {
        throw "Error.argument('typeName', Sys.Res.argumentTypeName)";
    }
    if (parsedName !== this) throw "Error.argument('typeName', Sys.Res.badTypeName)";
        if (window.__registeredTypes[typeName]) throw "Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, typeName))";
    this.prototype.constructor = this;
    this.__typeName = typeName;
    this.__interface = true;
    window.__registeredTypes[typeName] = true;

    return this;
}

Type.prototype.resolveInheritance = function Type$resolveInheritance() {
    if (arguments.length !== 0) "throw Error.parameterCount()";

    if (this.__basePrototypePending) {
        var baseType = this.__baseType;

        baseType.resolveInheritance();

        for (var memberName in baseType.prototype) {
            var memberValue = baseType.prototype[memberName];
            if (!this.prototype[memberName]) {
                this.prototype[memberName] = memberValue;
            }
        }
        delete this.__basePrototypePending;
    }
}

Type.getRootNamespaces = function Type$getRootNamespaces() {
    /// <returns type="Array"></returns>
    if (arguments.length !== 0) throw "Error.parameterCount()";
    return Array.clone(window.__rootNamespaces);
}

Type.isClass = function Type$isClass(type) {

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__class;
}

Type.isInterface = function Type$isInterface(type) {

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__interface;
}

Type.isNamespace = function Type$isNamespace(object) {

    if ((typeof(object) === 'undefined') || (object === null)) return false;
    return !!object.__namespace;
}

Type.parse = function Type$parse(typeName, ns) {

    var fn;
    if (ns) {
        if (!window.__classes) return null;
        fn = window.__classes[ns.getName().toUpperCase() + '.' + typeName.toUpperCase()];
        return fn || null;
    }
    if (!typeName) return null;
    if (!Type.__htClasses) {
        Type.__htClasses = {};
    }
    fn = Type.__htClasses[typeName];
    if (!fn) {
        fn = eval(typeName);
        if (typeof(fn) !== 'function') throw "Error.argument('typeName', Sys.Res.notATypeName)";
        Type.__htClasses[typeName] = fn;
    }
    return fn;
}

Type.registerNamespace = function Type$registerNamespace(namespacePath) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(namespacePath)) throw "Error.argument('namespacePath', Sys.Res.invalidNameSpace)";
    var rootObject = window;
    var namespaceParts = namespacePath.split('.');

    for (var i = 0; i < namespaceParts.length; i++) {
        var currentPart = namespaceParts[i];
        var ns = rootObject[currentPart];
        if (ns && !ns.__namespace) {
            //throw "Error.invalidOperation(String.format(Sys.Res.namespaceContainsObject, namespaceParts.splice(0, i + 1).join('.')))";
			//alert("注册命名空间失败   Type.registerNamespace");
        }
        if (!ns) {
            ns = rootObject[currentPart] = {};
            if (i === 0) {
                window.__rootNamespaces[window.__rootNamespaces.length] = ns;
            }
            ns.__namespace = true;
            ns.__typeName = namespaceParts.slice(0, i + 1).join('.');
            var parsedName;
            try {
                parsedName = eval(ns.__typeName);
            }
            catch(e) {
                parsedName = null;
            }
            if (parsedName !== ns) throw Error.argument('namespacePath', Sys.Res.invalidNameSpace);
            ns.getName = function ns$getName() {return this.__typeName;}
        }
        rootObject = ns;
    }
}
Object.__typeName = 'Object';

Object.getType = function Object$getType(instance) {

    var ctor = instance.constructor;
    if (!ctor || (typeof(ctor) !== "function") || !ctor.__typeName || (ctor.__typeName === 'Object')) {
        return Object;
    }
    return ctor;
}

Object.getTypeName = function Object$getTypeName(instance) {

    return Object.getType(instance).getName();
}

Array.__typeName = 'Array';

Array.add = Array.enqueue = function Array$enqueue(array, item) {
        array[array.length] = item;
}

Array.addRange = function Array$addRange(array, items) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="items" type="Array" elementMayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "items", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;


        array.push.apply(array, items);
}

Array.clear = function Array$clear(array) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;

    array.length = 0;
}

Array.clone = function Array$clone(array) {

    if (array.length === 1) {
        return [array[0]];
    }
    else {
                        return Array.apply(null, array);
    }
}

Array.contains = function Array$contains(array, item) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    return (Array.indexOf(array, item) >= 0);
}

Array.dequeue = function Array$dequeue(array) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <returns mayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true}
    ]);
    if (e) throw e;

    return array.shift();
}

Array.forEach = function Array$forEach(array, method, instance) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="method" type="Function"></param>
    /// <param name="instance" optional="true" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "method", type: Function},
        {name: "instance", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    for (var i = 0, l = array.length; i < l; i++) {
        var elt = array[i];
        if (typeof(elt) !== 'undefined') method.call(instance, elt, i, array);
    }
}

Array.indexOf = function Array$indexOf(array, item, start) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" optional="true" mayBeNull="true"></param>
    /// <param name="start" optional="true" mayBeNull="true"></param>
    /// <returns type="Number"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true, optional: true},
        {name: "start", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

    if (typeof(item) === "undefined") return -1;
    var length = array.length;
    if (length !== 0) {
                start = start - 0;
                if (isNaN(start)) {
            start = 0;
        }
        else {
                                    if (isFinite(start)) {
                                start = start - (start % 1);
            }
                        if (start < 0) {
                start = Math.max(0, length + start);
            }
        }

                for (var i = start; i < length; i++) {
            if ((typeof(array[i]) !== "undefined") && (array[i] === item)) {
                return i;
            }
        }
    }
    return -1;
}

Array.insert = function Array$insert(array, index, item) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="index" mayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "index", mayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    array.splice(index, 0, item);
}

Array.parse = function Array$parse(value) {
    /// <param name="value" type="String" mayBeNull="true"></param>
    /// <returns type="Array" elementMayBeNull="true"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String, mayBeNull: true}
    ]);
    if (e) throw e;

    if (!value) return [];
    var v = eval(value);
    if (!Array.isInstanceOfType(v)) throw Error.argument('value', Sys.Res.arrayParseBadFormat);
    return v;
}

Array.remove = function Array$remove(array, item) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="item" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "item", mayBeNull: true}
    ]);
    if (e) throw e;

    var index = Array.indexOf(array, item);
    if (index >= 0) {
        array.splice(index, 1);
    }
    return (index >= 0);
}

Array.removeAt = function Array$removeAt(array, index) {
    /// <param name="array" type="Array" elementMayBeNull="true"></param>
    /// <param name="index" mayBeNull="true"></param>
    var e = Function._validateParams(arguments, [
        {name: "array", type: Array, elementMayBeNull: true},
        {name: "index", mayBeNull: true}
    ]);
    if (e) throw e;

    array.splice(index, 1);
}

function Sys$Enum$parse(value, ignoreCase) {
    /// <param name="value" type="String"></param>
    /// <param name="ignoreCase" type="Boolean" optional="true"></param>
    /// <returns></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", type: String},
        {name: "ignoreCase", type: Boolean, optional: true}
    ]);
    if (e) throw e;

    var values, parsed, val;
    if (ignoreCase) {
        values = this.__lowerCaseValues;
        if (!values) {
            this.__lowerCaseValues = values = {};
            var prototype = this.prototype;
            for (var name in prototype) {
                values[name.toLowerCase()] = prototype[name];
            }
        }
    }
    else {
        values = this.prototype;
    }
    if (!this.__flags) {
        val = (ignoreCase ? value.toLowerCase() : value);
        parsed = values[val.trim()];
        if (typeof(parsed) !== 'number') throw Error.argument('value', String.format(Sys.Res.enumInvalidValue, value, this.__typeName));
        return parsed;
    }
    else {
        var parts = (ignoreCase ? value.toLowerCase() : value).split(',');
        var v = 0;

        for (var i = parts.length - 1; i >= 0; i--) {
            var part = parts[i].trim();
            parsed = values[part];
            if (typeof(parsed) !== 'number') throw Error.argument('value', String.format(Sys.Res.enumInvalidValue, value.split(',')[i].trim(), this.__typeName));
            v |= parsed;
        }
        return v;
    }
}

function Sys$Enum$toString(value) {
    /// <param name="value" optional="true" mayBeNull="true"></param>
    /// <returns type="String"></returns>
    var e = Function._validateParams(arguments, [
        {name: "value", mayBeNull: true, optional: true}
    ]);
    if (e) throw e;

            if ((typeof(value) === 'undefined') || (value === null)) return this.__string;
    if ((typeof(value) != 'number') || ((value % 1) !== 0)) throw Error.argumentType('value', Object.getType(value), this);
    var values = this.prototype;
    var i;
    if (!this.__flags || (value === 0)) {
        for (i in values) {
            if (values[i] === value) {
                return i;
            }
        }
    }
    else {
        var sorted = this.__sortedValues;
        if (!sorted) {
            sorted = [];
            for (i in values) {
                sorted[sorted.length] = {key: i, value: values[i]};
            }
            sorted.sort(function(a, b) {
                return a.value - b.value;
            });
            this.__sortedValues = sorted;
        }
        var parts = [];
        var v = value;
        for (i = sorted.length - 1; i >= 0; i--) {
            var kvp = sorted[i];
            var vali = kvp.value;
            if (vali === 0) continue;
            if ((vali & value) === vali) {
                parts[parts.length] = kvp.key;
                v -= vali;
                if (v === 0) break;
            }
        }
        if (parts.length && v === 0) return parts.reverse().join(', ');
    }
    throw Error.argumentOutOfRange('value', value, String.format(Sys.Res.enumInvalidValue, value, this.__typeName));
}

Type.prototype.registerEnum = function Type$registerEnum(name, flags) {

    if (!Type.__fullyQualifiedIdentifierRegExp.test(name)) throw "Error.argument('name', Sys.Res.notATypeName)";
        var parsedName;
    try {
        parsedName = eval(name);
    }
    catch(e) {
        throw "Error.argument('name', Sys.Res.argumentTypeName)";
    }
    if (parsedName !== this) throw "Error.argument('name', Sys.Res.badTypeName)";
    if (window.__registeredTypes[name]) throw "Error.invalidOperation(String.format(Sys.Res.typeRegisteredTwice, name))";
    for (var i in this.prototype) {
        var val = this.prototype[i];
        if (!Type.__identifierRegExp.test(i)) throw "Error.invalidOperation(String.format(Sys.Res.enumInvalidValueName, i))";
        if (typeof(val) !== 'number' || (val % 1) !== 0) throw "Error.invalidOperation(Sys.Res.enumValueNotInteger)";
        if (typeof(this[i]) !== 'undefined') throw "Error.invalidOperation(String.format(Sys.Res.enumReservedName, i))";
    }
    for (var i in this.prototype) {
        this[i] = this.prototype[i];
    }
    this.__typeName = name;
    this.parse = Sys$Enum$parse;
    this.__string = this.toString();
    this.toString = Sys$Enum$toString;
    this.__flags = flags;
    this.__enum = true;
    window.__registeredTypes[name] = true;
}

Type.isEnum = function Type$isEnum(type) {
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__enum;
}

Type.isFlags = function Type$isFlags(type) {
    /// <param name="type" mayBeNull="true"></param>
    /// <returns type="Boolean"></returns>
    var e = Function._validateParams(arguments, [
        {name: "type", mayBeNull: true}
    ]);
    if (e) throw e;

    if ((typeof(type) === 'undefined') || (type === null)) return false;
    return !!type.__flags;
}




/**************************************************定义 全命名空间 Class **********************************/
//UMP.register = UMP.registerNamespace = Type.registerNamespace
Type.registerNamespace('Sys');

/****************************************** Sys.Component Define ******************************************/
Sys.Component = function Sys$Component() {
    this._id = null;
};
function Sys$Component$get_id() {
    return this._id;
}
Sys.Component.prototype = {
    get_id: Sys$Component$get_id
};
Sys.Component.registerClass('Sys.Component')

/****************************************** Sys._Application Define ******************************************/
Sys._Application = function Sys$_Application() {    
    this._components = {};
    this._createdComponents = [];    
}

function UMP$Sys$_Application$findComponent(id, parent) { 
    if(parent){
	    alert("Exception in the Method[UMP$Sys$_Application$findComponent]");
		return Sys.Application._components[id] || null;
        if(Sys.IContainer.isInstanceOfType(parent)){
                return parent.findComponent(id);                
		}
		else{
			return parent[id]|| null;
		}
	}
    return Sys.Application._components[id] || null;
}
Sys._Application.prototype = {
    findComponent: UMP$Sys$_Application$findComponent 
};
Sys._Application.registerClass('Sys._Application', Sys.Component, Sys.IContainer);
Sys.Application = new Sys._Application();



/****************************************** Sys.EventHandlerList Define ******************************************/
Sys.EventHandlerList = function Sys$EventHandlerList() {
if (arguments.length !== 0) throw Error.parameterCount();
this._list = {};
}

function Sys$EventHandlerList$addHandler(id, handler) {
Array.add(this._getEvent(id, true), handler);
////alert("fire addHandler");
}

function Sys$EventHandlerList$removeHandler(id, handler) {
var evt = this._getEvent(id);
if (!evt) return;
Array.remove(evt, handler);
}

function Sys$EventHandlerList$getHandler(id) {
var evt = this._getEvent(id);
if (!evt || (evt.length === 0)) return null;
evt = Array.clone(evt);
if (!evt._handler) {
evt._handler = function (source, args) {
for (var i = 0, l = evt.length; i < l; i++) {
evt[i](source, args);
}
};
}
return evt._handler;
}

function Sys$EventHandlerList$_getEvent(id, create) {
if (!this._list[id]) {
if (!create) return null;
this._list[id] = [];
}
return this._list[id];
}

Sys.EventHandlerList.prototype = {
addHandler: Sys$EventHandlerList$addHandler,
removeHandler: Sys$EventHandlerList$removeHandler,
getHandler: Sys$EventHandlerList$getHandler,

_getEvent: Sys$EventHandlerList$_getEvent
}
Sys.EventHandlerList.registerClass('Sys.EventHandlerList');

Sys.EventArgs = function Sys$EventArgs() {
    if (arguments.length !== 0) throw Error.parameterCount();
}
Sys.EventArgs.registerClass('Sys.EventArgs');
Sys.EventArgs.Empty = new Sys.EventArgs();








Type.registerNamespace('Sys.UI');

/****************************************** Sys.UI.DomEvent Define ******************************************/
Sys.UI.DomEvent = function Sys$UI$DomEvent(eventObject) {
    var e = eventObject;
    this.rawEvent = e;
    this.altKey = e.altKey;
    if (typeof (e.button) !== 'undefined') {
        this.button = (typeof (e.which) !== 'undefined') ? e.button :
            (e.button === 4) ? Sys.UI.MouseButton.middleButton :
            (e.button === 2) ? Sys.UI.MouseButton.rightButton :
            Sys.UI.MouseButton.leftButton;
    }
    if (e.type === 'keypress') {
        this.charCode = e.charCode || e.keyCode;
    }
    else if (e.keyCode && (e.keyCode === 46)) {
        this.keyCode = 127;
    }
    else {
        this.keyCode = e.keyCode;
    }
    /*this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.ctrlKey = e.ctrlKey;
    this.target = e.target ? e.target : e.srcElement;
    if (this.target) {
    var loc = Sys.UI.DomElement.getLocation(this.target);
    this.offsetX = (typeof(e.offsetX) !== 'undefined') ? e.offsetX : window.pageXOffset + (e.clientX || 0) - loc.x;
    this.offsetY = (typeof(e.offsetY) !== 'undefined') ? e.offsetY : window.pageYOffset + (e.clientY || 0) - loc.y;
    }
    this.screenX = e.screenX;
    this.screenY = e.screenY;*/
    this.shiftKey = e.shiftKey;
    this.type = e.type;
}

function Sys$UI$DomEvent$preventDefault() {
    if (arguments.length !== 0) throw Error.parameterCount();
    if (this.rawEvent.preventDefault) {
        this.rawEvent.preventDefault();
    }
    else if (window.event) {
        window.event.returnValue = false;
    }
}
function Sys$UI$DomEvent$stopPropagation() {
    if (arguments.length !== 0) throw Error.parameterCount();
    if (this.rawEvent.stopPropagation) {
        this.rawEvent.stopPropagation();
    }
    else if (window.event) {
        window.event.cancelBubble = true;
    }
}
Sys.UI.DomEvent.prototype = {
    preventDefault: Sys$UI$DomEvent$preventDefault,
    stopPropagation: Sys$UI$DomEvent$stopPropagation
}
Sys.UI.DomEvent.registerClass('Sys.UI.DomEvent');




/****************************************** Global Method API Define ******************************************/
//  $addHandler
//  var $find
//  var $get

var $find = Sys.Application.findComponent;
var $get = function () {
    return document.getElementById(id);
}
var $addHandler = Sys.UI.DomEvent.addHandler = function Sys$UI$DomEvent$addHandler(element, eventName, handler) {
    if (!element._events) {
        element._events = {};
    }
    var eventCache = element._events[eventName];
    if (!eventCache) {
        element._events[eventName] = eventCache = [];
    }
    var browserHandler;
    if (element.addEventListener) {
        browserHandler = function (e) {
            return handler.call(element, new Sys.UI.DomEvent(e));
        }
        element.addEventListener(eventName, browserHandler, false);
    }
    else if (element.attachEvent) {
        browserHandler = function () {
            return handler.call(element, new Sys.UI.DomEvent(window.event));
        }
        element.attachEvent('on' + eventName, browserHandler);
    }
    eventCache[eventCache.length] = { handler: handler, browserHandler: browserHandler };
}

var $removeHandler = Sys.UI.DomEvent.removeHandler = function Sys$UI$DomEvent$removeHandler(element, eventName, handler) {
    var browserHandler = null;
    if ((typeof(element._events) !== 'object') || (element._events == null)) {
		alert("Error in $removeHandler");
		return;
	}
    
	var cache = element._events[eventName];
    if (!(cache instanceof Array)){
		alert("Error in $removeHandler");
		return;
	}
	
    for (var i = 0, l = cache.length; i < l; i++) {
        if (cache[i].handler === handler) {
            browserHandler = cache[i].browserHandler;
            break;
        }
    }
    if (typeof(browserHandler) !== 'function') {
		alert("Error in $removeHandler");
		return;
	}
    if (element.removeEventListener) {
        element.removeEventListener(eventName, browserHandler, false);
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + eventName, browserHandler);
    }
    cache.splice(i, 1);
}

