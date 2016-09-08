//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------

Type.registerNamespace('UMP.Web.UI');
UMP.Web.UI.Input = function UMP$Web$UI$Input(element){
    UMP.Web.UI.Input.initializeBase(this, [element]);
    this._textbox = element;
    this.initialize();
}
function UMP$Web$UI$Input$initialize() {
    UMP.Web.UI.Input.callBaseMethod(this, 'initialize');


    //this._changeHandler = Function.createDelegate(this, this.input_onchange);
    //$addHandler(this._textbox, "change", this._changeHandler);
    //this.on("change",)

    //$(this._textbox).on("change", this.input_onchange);

    /*
     this._onfocusHandler = Function.createDelegate(this, this.input_onfocus);
     $addHandler(this._textbox, "focus", this._onfocusHandler);

     this._onblurHandler = Function.createDelegate(this, this.input_onblur);
     $addHandler(this._textbox, "blur", this._onblurHandler);
     */
}
//Public Method
function UMP$Web$UI$Input$get_value(){
    return this.get("value");
}
function UMP$Web$UI$Input$set_value(val){
    var oldValue = this.get_value();
    if(val != oldValue){
        this.set("value", val);
        this._textbox.value = val;
        var args = {
            "oldValue" : oldValue,
            "value" : val
        }
        debugger;
        //for IE this._element.fireEvent("onchange");
        var evt;
        if (document.createEvent) { // DOM Level 2 standard
            evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("change", true, true, window,       0, 0, 0, 0, 0, false, false, false, false, 0, null);
            this._element.dispatchEvent(evt);
        } else if (this._element.fireEvent) { // IE
            this._element.fireEvent('onclick');
        }
        //this._element.dispatchEvent("change");


        //$(this._element).trigger("change", args);
        //this.firechangeEvent(args);//触发DOM上的onchange
    }
}

function UMP$Web$UI$Input$input_onchange(){
    if (this._textbox.value != this.get_value()) {
        var oldValue = this._textbox.value;

        this.set_value(this._textbox.value);


    }
}
function UMP$Web$UI$Input$firechangeEvent(args) {
    args = args || {};
    this.raiseonchange(args);
}

//Event
function UMP$Web$UI$Input$add_onchange(handler) {
    this.get_events().addHandler("onchange", handler);
}
function UMP$Web$UI$Input$remove_onchange(handler) {
    this.get_events().removeHandler("onchange", handler);
}
function UMP$Web$UI$Input$raiseonchange(args) {
    var eh = this.get_events().getHandler("onchange");
    if (eh) {
        eh(this, args);
    }
}
UMP.Web.UI.Input.prototype = {
    initialize : UMP$Web$UI$Input$initialize,
    get_value : UMP$Web$UI$Input$get_value,
    set_value : UMP$Web$UI$Input$set_value,
    input_onchange : UMP$Web$UI$Input$input_onchange,
    firechangeEvent : UMP$Web$UI$Input$firechangeEvent,
    add_onchange : UMP$Web$UI$Input$add_onchange,
    remove_onchange : UMP$Web$UI$Input$remove_onchange,
    raiseonchange : UMP$Web$UI$Input$raiseonchange
};
UMP.Web.UI.Input.registerClass('UMP.Web.UI.Input', UMP.Web.Mvc.JControl);