//-----------------------------------------------------------------------
// Copyright (C) Yonyou Corporation. All rights reserved.
// include : UMP.Web.EventMgr | UMP.Web.AttrEventMgr
// Author gct@yonyou.com
//-----------------------------------------------------------------------

UMP.Web.UI.RadioSet = function UMP$Web$UI$SRadioSet(element) {
    UMP.Web.UI.RadioSet.initializeBase(this, [element]);
    this.radioName = '';
    this.radios = [];
    this.initialize();
}
function UMP$Web$UI$RadioSet$initialize() {
    UMP.Web.UI.RadioSet.callBaseMethod(this, 'initialize');
    var $elem = $(this._element);
    var id = this._element.id;
    var radios = $elem.find('input[type=radio]');
    if(radios.length !== 0 && radios[0].name){
        this.radioName = radios[0].name;
    } else {
        alert('id为' + id +'的RadioSet控件内部必须存在单选框元素且第一个单选框的name属性不能为空');
    }
}

function UMP$Web$UI$RadioSet$get_name(val){
    var id = this._element.id;
    if(this.radioName){
        return this.radioName;
    } else {
        alert('id为' + id +'的RadioSet控件内部必须存在单选框元素且第一个单选框的name属性不能为空');
        return false;
    }
}
function UMP$Web$UI$RadioSet$set_value(val) {
    var oldValue = this.get_value();
    var radios;
    var len;
    var id = this._element.id;
    if (val != oldValue && this.radioName) {
        radios = $(this._element).find('input[type=radio][name=' + this.radioName +']');
        len = radios.length;
        if (!len) {
            alert('id为' + id +'的RadioSet控件在给绑定字段赋值时找不到name属性为'+ this.radioName + '的单选框!');
            return;
        }
        radios.each(function(){
           if(this.value == val){
               this.checked = true;
           }
        });
        this.set("value", val);
        var args = {
            "oldValue" : oldValue,
            "value" : val
        }
        $(this._element).trigger("change", args);
        //this.firechangeEvent(args);//触发DOM上的onchange
    }
}

function UMP$Web$UI$RadioSet$get_value() {
    return this.get("value");
}

UMP.Web.UI.RadioSet.prototype = {
    initialize : UMP$Web$UI$RadioSet$initialize,
    get_name : UMP$Web$UI$RadioSet$get_name,
    get_value : UMP$Web$UI$RadioSet$get_value,
    set_value : UMP$Web$UI$RadioSet$set_value
}
UMP.Web.UI.RadioSet.registerClass('UMP.Web.UI.RadioSet', UMP.Web.Mvc.JControl);