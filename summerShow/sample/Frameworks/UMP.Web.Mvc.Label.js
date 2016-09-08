//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------

UMP.Web.UI.Label = function UMP$Web$UI$Label(element) {
    UMP.Web.UI.Label.initializeBase(this, [element]);
    this.initialize();
}
function UMP$Web$UI$Label$initialize() {
    UMP.Web.UI.Label.callBaseMethod(this, 'initialize');

}

function UMP$Web$UI$Label$set_value(val) {
    var oldValue = this.get('value');
    if (val != oldValue) {
        this.set("value", val);
        this._element.textContent = val;
        var args = {
            "oldValue" : oldValue,
            "value" : val
        }
        $(this._element).trigger("change", args);

    }
}

function UMP$Web$UI$Label$get_value() {
    return this.get("value");
}

UMP.Web.UI.Label.prototype = {
    initialize : UMP$Web$UI$Label$initialize,
    set_value : UMP$Web$UI$Label$set_value,
    get_value : UMP$Web$UI$Label$get_value
};
UMP.Web.UI.Label.registerClass('UMP.Web.UI.Label', UMP.Web.Mvc.JControl);