//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------

UMP.Web.UI.Checkbox = function UMP$Web$UI$SCheckbox(element) {
    UMP.Web.UI.Checkbox.initializeBase(this, [element]);
    this.initialize();
}
function UMP$Web$UI$Checkbox$initialize() {
    UMP.Web.UI.Checkbox.callBaseMethod(this, 'initialize');
}

function UMP$Web$UI$Checkbox$set_value(val) {
    var oldValue = this.get_value();
    var len;
    if (val !== oldValue) {
        this._element.checked = val;
        this.set("value", val);
        var args = {
            "oldValue" : oldValue,
            "value" : val
        }
        $(this._element).trigger("change", args);
        //this.firechangeEvent(args);//触发DOM上的onchange
    }
}

function UMP$Web$UI$Checkbox$get_value() {
    return this.get("value");
}

UMP.Web.UI.Checkbox.prototype = {
    initialize : UMP$Web$UI$Checkbox$initialize,
    get_value : UMP$Web$UI$Checkbox$get_value,
    set_value : UMP$Web$UI$Checkbox$set_value
}
UMP.Web.UI.Checkbox.registerClass('UMP.Web.UI.Checkbox', UMP.Web.Mvc.JControl);