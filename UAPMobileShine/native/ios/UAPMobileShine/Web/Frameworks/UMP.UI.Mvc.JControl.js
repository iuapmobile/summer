
//__________________________________________________________________________________________ JControlBase
Type.registerNamespace('UMP.UI.Mvc');
UMP.UI.Mvc.JControlBase = function UMP$UI$Mvc$JControlBase() {
    UMP.UI.Mvc.JControlBase.initializeBase(this, []);
	//0 default true
	this._isAbs = true;
	
	//1、常量
	this._tag = "";
	
	//2、Attribute
	this._attrs = {};
	this._absAttrs = {};
	
	//3、Event
	this._events = {};
		
}
function UMP$UI$Mvc$JControlBase$parseType(obj, type) {
    var control = new type();

    if (obj.isAbs() == true) {
        //all attr clone
        for (var key in obj.attrs()) {
            control.attr(key, obj.attr(key));
        }

        $document.replaceChild(control, obj);
        obj = control;
        return obj;
    }

    return obj;
}

function UMP$UI$Mvc$JControlBase$get_visible(){
	return this.attr("visible");
}
function UMP$UI$Mvc$JControlBase$set_visible(val){
	this.attr("visible", val);
}
function UMP$UI$Mvc$JControlBase$get_disabled(){
	return this.attr("disabled");
}
function UMP$UI$Mvc$JControlBase$set_disabled(val){
	this.attr("disabled", val);
}

//=================================== CSS ===========================================
function UMP$UI$Mvc$JControlBase$get_background(){
	return this.attr("background");
}
function UMP$UI$Mvc$JControlBase$set_background(val){
	this.attr("background", val);
}
function UMP$UI$Mvc$JControlBase$background(val){	
	if(typeof val ==="undefined"){
		return this.get_background();
	}else{
		this.set_background(val);
	}	
}

function UMP$UI$Mvc$JControlBase$get_backgroundImage(){
	return this.attr("backgroundImage");
}
function UMP$UI$Mvc$JControlBase$set_backgroundImage(val){
	this.attr("backgroundImage", val);
}
function UMP$UI$Mvc$JControlBase$backgroundImage(val){
	if(typeof val ==="undefined"){
		return this.get_backgroundImage();
	}else{
		this.set_backgroundImage(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_width(){
	return this.attr("width");
}
function UMP$UI$Mvc$JControlBase$set_width(val){
	this.attr("width", val);
}
function UMP$UI$Mvc$JControlBase$width(val){
	if(typeof val ==="undefined"){
		return this.get_width();
	}else{
		this.set_width(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_height(){
	return this.attr("height");
}
function UMP$UI$Mvc$JControlBase$set_height(val){
	this.attr("height", val);
}
function UMP$UI$Mvc$JControlBase$height(val){
	if(typeof val ==="undefined"){
		return this.get_height();
	}else{
		this.set_height(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_layout(){
	return this.attr("layout");
}
function UMP$UI$Mvc$JControlBase$set_layout(val){
	this.attr("layout", val);
}
function UMP$UI$Mvc$JControlBase$layout(val){
	if(typeof val ==="undefined"){
		return this.get_layout();
	}else{
		this.set_layout(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_weight(){
	return this.attr("weight");
}
function UMP$UI$Mvc$JControlBase$set_weight(val){
	this.attr("weight", val);
}
function UMP$UI$Mvc$JControlBase$weight(val){
	if(typeof val ==="undefined"){
		return this.get_weight();
	}else{
		this.set_weight(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_halign(){
	return this.attr("halign");
}
function UMP$UI$Mvc$JControlBase$set_halign(val){
	this.attr("halign", val);
}
function UMP$UI$Mvc$JControlBase$halign(val){
	if(typeof val ==="undefined"){
		return this.get_halign();
	}else{
		this.set_halign(val);
	}
}
function UMP$UI$Mvc$JControlBase$get_valign(){
	return this.attr("valign");
}
function UMP$UI$Mvc$JControlBase$set_valign(val){
	this.attr("valign", val);
}
function UMP$UI$Mvc$JControlBase$valign(val){
	if(typeof val ==="undefined"){
		return this.get_valign();
	}else{
		this.set_valign(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingTop(){
	return this.attr("paddingTop");
}
function UMP$UI$Mvc$JControlBase$set_paddingTop(val){
	this.attr("paddingTop", val);
}
function UMP$UI$Mvc$JControlBase$paddingTop(val){
	if(typeof val ==="undefined"){
		return this.get_paddingTop();
	}else{
		this.set_paddingTop(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingBottom(){
	return this.attr("paddingBottom");
}
function UMP$UI$Mvc$JControlBase$set_paddingBottom(val){
	this.attr("paddingBottom", val);
}
function UMP$UI$Mvc$JControlBase$paddingBottom(val){
	if(typeof val ==="undefined"){
		return this.get_paddingBottom();
	}else{
		this.set_paddingBottom(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingLeft(){
	return this.attr("paddingLeft");
}
function UMP$UI$Mvc$JControlBase$set_paddingLeft(val){
	this.attr("paddingLeft", val);
}
function UMP$UI$Mvc$JControlBase$paddingLeft(val){
	if(typeof val ==="undefined"){
		return this.get_paddingLeft();
	}else{
		this.set_paddingLeft(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_paddingRight(){
	return this.attr("paddingRight");
}
function UMP$UI$Mvc$JControlBase$set_paddingRight(val){
	this.attr("paddingRight", val);
}
function UMP$UI$Mvc$JControlBase$paddingRight(val){
	if(typeof val ==="undefined"){
		return this.get_paddingRight();
	}else{
		this.set_paddingRight(val);
	}
}

//margin
function UMP$UI$Mvc$JControlBase$get_marginTop(){
	return this.attr("marginTop");
}
function UMP$UI$Mvc$JControlBase$set_marginTop(val){
	this.attr("marginTop", val);
}
function UMP$UI$Mvc$JControlBase$marginTop(val){
	if(typeof val ==="undefined"){
		return this.get_marginTop();
	}else{
		this.set_marginTop(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_marginBottom(){
	return this.attr("marginBottom");
}
function UMP$UI$Mvc$JControlBase$set_marginBottom(val){
	this.attr("marginBottom", val);
}
function UMP$UI$Mvc$JControlBase$marginBottom(val){
	if(typeof val ==="undefined"){
		return this.get_marginBottom();
	}else{
		this.set_marginBottom(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_marginLeft(){
	return this.attr("marginLeft");
}
function UMP$UI$Mvc$JControlBase$set_marginLeft(val){
	this.attr("marginLeft", val);
}
function UMP$UI$Mvc$JControlBase$marginLeft(val){
	if(typeof val ==="undefined"){
		return this.get_marginLeft();
	}else{
		this.set_marginLeft(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_marginRight(){
	return this.attr("marginRight");
}
function UMP$UI$Mvc$JControlBase$set_marginRight(val){
	this.attr("marginRight", val);
}
function UMP$UI$Mvc$JControlBase$marginRight(val){
	if(typeof val ==="undefined"){
		return this.get_marginRight();
	}else{
		this.set_marginRight(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_backgroundColorDis(){
	return this.attr("backgroundColorDis");
}
function UMP$UI$Mvc$JControlBase$set_backgroundColorDis(val){
	this.attr("backgroundColorDis", val);
}
function UMP$UI$Mvc$JControlBase$backgroundColorDis(val){
	if(typeof val ==="undefined"){
		return this.get_backgroundColorDis();
	}else{
		this.set_backgroundColorDis(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_backgroundImageDis(){
	return this.attr("backgroundImageDis");
}
function UMP$UI$Mvc$JControlBase$set_backgroundImageDis(val){
	this.attr("backgroundImageDis", val);
}
function UMP$UI$Mvc$JControlBase$backgroundImageDis(val){
	if(typeof val ==="undefined"){
		return this.get_backgroundImageDis();
	}else{
		this.set_backgroundImageDis(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_pressedImage(){
	return this.attr("pressedImage");
}
function UMP$UI$Mvc$JControlBase$set_pressedImage(val){
	this.attr("pressedImage", val);
}
function UMP$UI$Mvc$JControlBase$pressedImage(val){
	if(typeof val ==="undefined"){
		return this.get_pressedImage();
	}else{
		this.set_pressedImage(val);
	}
}
function UMP$UI$Mvc$JControlBase$get_pressedColor(){
	return this.attr("pressedColor");
}
function UMP$UI$Mvc$JControlBase$set_pressedColor(val){
	this.attr("pressedColor", val);
}
function UMP$UI$Mvc$JControlBase$pressedColor(val){
	if(typeof val ==="undefined"){
		return this.get_pressedColor();
	}else{
		this.set_pressedColor(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_color(){
	return this.attr("color");
}
function UMP$UI$Mvc$JControlBase$set_color(val){
	this.attr("color", val);
}
function UMP$UI$Mvc$JControlBase$color(val){
	if(typeof val ==="undefined"){
		return this.get_color();
	}else{
		this.set_color(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_fontFamily(){
	return this.attr("fontFamily");
}
function UMP$UI$Mvc$JControlBase$set_fontFamily(val){
	this.attr("fontFamily", val);
}
function UMP$UI$Mvc$JControlBase$fontFamily(val){
	if(typeof val ==="undefined"){
		return this.get_fontFamily();
	}else{
		this.set_fontFamily(val);
	}
}

function UMP$UI$Mvc$JControlBase$get_fontSize(){
	return this.attr("fontSize");
}
function UMP$UI$Mvc$JControlBase$set_fontSize(val){
	this.attr("fontSize", val);
}
function UMP$UI$Mvc$JControlBase$fontSize(val){
	if(typeof val ==="undefined"){
		return this.get_fontSize();
	}else{
		this.set_fontSize(val);
	}
}

UMP.UI.Mvc.JControlBase.prototype = {
	parseType: UMP$UI$Mvc$JControlBase$parseType,

	//common attribute
	get_visible: UMP$UI$Mvc$JControlBase$get_visible,
	set_visible: UMP$UI$Mvc$JControlBase$set_visible,
	get_disabled: UMP$UI$Mvc$JControlBase$get_disabled,
	set_disabled: UMP$UI$Mvc$JControlBase$set_disabled,
	
	//css
	get_background: UMP$UI$Mvc$JControlBase$get_background,
	set_background: UMP$UI$Mvc$JControlBase$set_background,
	background: UMP$UI$Mvc$JControlBase$background,
	
	get_backgroundImage: UMP$UI$Mvc$JControlBase$get_backgroundImage,
	set_backgroundImage: UMP$UI$Mvc$JControlBase$set_backgroundImage,
	backgroundImage: UMP$UI$Mvc$JControlBase$backgroundImage,
	
	get_width: UMP$UI$Mvc$JControlBase$get_width,
	set_width: UMP$UI$Mvc$JControlBase$set_width,
	width: UMP$UI$Mvc$JControlBase$width,
	
	get_height: UMP$UI$Mvc$JControlBase$get_height,
	set_height: UMP$UI$Mvc$JControlBase$set_height,
	height: UMP$UI$Mvc$JControlBase$height,
	
	get_layout: UMP$UI$Mvc$JControlBase$get_layout,
	set_layout: UMP$UI$Mvc$JControlBase$set_layout,
	layout: UMP$UI$Mvc$JControlBase$layout,
	
	get_weight: UMP$UI$Mvc$JControlBase$get_weight,
	set_weight: UMP$UI$Mvc$JControlBase$set_weight,
	weight: UMP$UI$Mvc$JControlBase$weight,
	
	get_halign: UMP$UI$Mvc$JControlBase$get_halign,
	set_halign: UMP$UI$Mvc$JControlBase$set_halign,
	halign: UMP$UI$Mvc$JControlBase$halign,
	
	get_valign: UMP$UI$Mvc$JControlBase$get_valign,
	set_valign: UMP$UI$Mvc$JControlBase$set_valign,
	valign: UMP$UI$Mvc$JControlBase$valign,
	
	get_paddingTop: UMP$UI$Mvc$JControlBase$get_paddingTop,
	set_paddingTop: UMP$UI$Mvc$JControlBase$set_paddingTop,
	paddingTop: UMP$UI$Mvc$JControlBase$paddingTop,
	
	get_paddingBottom: UMP$UI$Mvc$JControlBase$get_paddingBottom,
	set_paddingBottom: UMP$UI$Mvc$JControlBase$set_paddingBottom,
	paddingBottom: UMP$UI$Mvc$JControlBase$paddingBottom,
	
	get_paddingLeft: UMP$UI$Mvc$JControlBase$get_paddingLeft,
	set_paddingLeft: UMP$UI$Mvc$JControlBase$set_paddingLeft,
	paddingLeft: UMP$UI$Mvc$JControlBase$paddingLeft,
	
	get_paddingRight: UMP$UI$Mvc$JControlBase$get_paddingRight,
	set_paddingRight: UMP$UI$Mvc$JControlBase$set_paddingRight,
	paddingRight: UMP$UI$Mvc$JControlBase$paddingRight,
	
	get_marginTop: UMP$UI$Mvc$JControlBase$get_marginTop,
	set_marginTop: UMP$UI$Mvc$JControlBase$set_marginTop,
	marginTop: UMP$UI$Mvc$JControlBase$marginTop,
	
	get_marginBottom: UMP$UI$Mvc$JControlBase$get_marginBottom,
	set_marginBottom: UMP$UI$Mvc$JControlBase$set_marginBottom,
	marginBottom: UMP$UI$Mvc$JControlBase$marginBottom,
	
	get_marginLeft: UMP$UI$Mvc$JControlBase$get_marginLeft,
	set_marginLeft: UMP$UI$Mvc$JControlBase$set_marginLeft,
	marginLeft: UMP$UI$Mvc$JControlBase$marginLeft,
	
	get_marginRight: UMP$UI$Mvc$JControlBase$get_marginRight,
	set_marginRight: UMP$UI$Mvc$JControlBase$set_marginRight,
	marginRight: UMP$UI$Mvc$JControlBase$marginRight,

	get_backgroundColorDis: UMP$UI$Mvc$JControlBase$get_backgroundColorDis,
	set_backgroundColorDis: UMP$UI$Mvc$JControlBase$set_backgroundColorDis,	
	get_backgroundImageDis: UMP$UI$Mvc$JControlBase$get_backgroundImageDis,
	set_backgroundImageDis: UMP$UI$Mvc$JControlBase$set_backgroundImageDis,

	get_pressedImage: UMP$UI$Mvc$JControlBase$get_pressedImage,
	set_pressedImage: UMP$UI$Mvc$JControlBase$set_pressedImage,	
	get_pressedColor: UMP$UI$Mvc$JControlBase$get_pressedColor,
	set_pressedColor: UMP$UI$Mvc$JControlBase$set_pressedColor,
	
	get_color: UMP$UI$Mvc$JControlBase$get_color,
	set_color: UMP$UI$Mvc$JControlBase$set_color,
	color: UMP$UI$Mvc$JControlBase$color,
	
	get_fontFamily: UMP$UI$Mvc$JControlBase$get_fontFamily,
	set_fontFamily: UMP$UI$Mvc$JControlBase$set_fontFamily,
	fontFamily: UMP$UI$Mvc$JControlBase$fontFamily,
	
	get_fontSize: UMP$UI$Mvc$JControlBase$get_fontSize,
	set_fontSize: UMP$UI$Mvc$JControlBase$set_fontSize,
	fontSize: UMP$UI$Mvc$JControlBase$fontSize
	
};
UMP.UI.Mvc.JControlBase.registerClass('UMP.UI.Mvc.JControlBase', UMP.UI.Mvc.Element);


Type.registerNamespace('UMP.UI.JControl');
//__________________________________________________________________________________________ Label
UMP.UI.JControl.Label = function UMP$UI$JControl$Label(obj){	
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Label.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Label);
		return ele;
    }
}
UMP.UI.JControl.Label.prototype = {
	get_text: function(){
        return this.attr("content");
    },
    set_text:function(text){
        this.attr("content", text);
    },
	get_bindfield:function(){
        this.attr("bindfield");
    },
	set_bindfield: function(fieldName){
        this.attr("bindfield", fieldName);
    }
};
UMP.UI.JControl.Label.registerClass('UMP.UI.JControl.Label',UMP.UI.Mvc.JControlBase);





//__________________________________________________________________________________________ Button
UMP.UI.JControl.Button = function UMP$UI$JControl$Button(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Button.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Button);
		return ele;
    }
}
UMP.UI.JControl.Button.prototype = {
	get_text:function(){
		return this.attr("text");
	},
	set_text:function(text){
		this.attr("text",text);
	},
	get_onclick:function(){
		return this.attr("onclick");
	},
	set_onclick:function(val){
		this.attr("onclick", val);
	}
};
UMP.UI.JControl.Button.registerClass('UMP.UI.JControl.Button',UMP.UI.Mvc.JControlBase);

//__________________________________________________________________________________________ Input
UMP.UI.JControl.Input = function UMP$UI$JControl$Input(obj){
    UMP.UI.JControl.Input.initializeBase(this, []);
	this._bindfield = "";
}
function UMP$UI$JControl$Input$get_value(){
	this.attr("value");
}
function UMP$UI$JControl$Input$set_value(value){
	return this.attr("value", value);
}
function UMP$UI$JControl$Input$val(value){
	if(typeof value === "undefined"){
		this.get_value();
	}else{
		this.set_value(value);
	}	
}

function UMP$UI$JControl$Input$get_readOnly(){
	return this.attr("readOnly");
}
function UMP$UI$JControl$Input$set_readOnly(val){
	this.attr("readOnly", val);
}
function UMP$UI$JControl$Input$readOnly(val){
	if(typeof val === "undefined"){
		this.get_readOnly();
	}else{
		this.set_readOnly(val);
	}
}

function UMP$UI$JControl$Input$get_maxlength(){
	return this.attr("maxlength");
}
function UMP$UI$JControl$Input$set_maxlength(val){
	this.attr("maxlength", val);
}
function UMP$UI$JControl$Input$maxlength(val){
	if(typeof val === "undefined"){
		this.get_maxlength();
	}else{
		this.set_maxlength(val);
	}
}

function UMP$UI$JControl$Input$get_placeholder(){
	return this.attr("placeholder");
}
function UMP$UI$JControl$Input$set_placeholder(val){
	this.attr("placeholder", val);
}
function UMP$UI$JControl$Input$placeholder(val){
	if(typeof val === "undefined"){
		this.get_placeholder();
	}else{
		this.set_placeholder(val);
	}
}

function UMP$UI$JControl$Input$get_bindfield(){
	return this.attr("bindfield");
}
function UMP$UI$JControl$Input$set_bindfield(fieldName){
	this.attr("bindfield", fieldName);
}
function UMP$UI$JControl$Input$bindfield(fieldName){
	if(typeof fieldName === "undefined"){
		this.get_bindfield();
	}else{
		this.set_bindfield(fieldName);
	}
}
UMP.UI.JControl.Input.prototype = {	
	//HTML5 standard API
	get_value: UMP$UI$JControl$Input$get_value,
	set_value: UMP$UI$JControl$Input$set_value,	
	//JQuery Style API
	val: UMP$UI$JControl$Input$val,
	
	get_readOnly: UMP$UI$JControl$Input$get_readOnly,
	set_readOnly: UMP$UI$JControl$Input$set_readOnly,	
	readOnly: UMP$UI$JControl$Input$readOnly,
	 
	get_maxlength: UMP$UI$JControl$Input$get_maxlength,
	set_maxlength: UMP$UI$JControl$Input$set_maxlength,	
	maxlength: UMP$UI$JControl$Input$maxlength,
	
	get_placeholder: UMP$UI$JControl$Input$get_placeholder,
	set_placeholder: UMP$UI$JControl$Input$set_placeholder,	
	placeholder: UMP$UI$JControl$Input$placeholder,
	
	
	get_bindfield: UMP$UI$JControl$Input$get_bindfield,
	set_bindfield: UMP$UI$JControl$Input$set_bindfield,
	bindfield: UMP$UI$JControl$Input$bindfield
};
UMP.UI.JControl.Input.registerClass('UMP.UI.JControl.Input',UMP.UI.Mvc.JControlBase);








//__________________________________________________________________________________________ TextBox
UMP.UI.JControl.TextBox = function UMP$UI$JControl$TextBox(ele){	
    if(this instanceof UMP.UI.JControl.TextBox){
	    var aaa = "类型转换";
	}
	if(this.__typeName=="UMP.UI.JControl"){
	    var aaa = "类型转换";
	}
	
	
	if(typeof ele == "undefined"){
       UMP.UI.JControl.TextBox.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.TextBox);
		return ele;
    }
}
UMP.UI.JControl.TextBox.prototype = {
    get_text: function () {
        return this.val();
    },
    set_text: function (text) {
        this.val(text);
    }
};
UMP.UI.JControl.TextBox.registerClass('UMP.UI.JControl.TextBox',UMP.UI.JControl.Input);





//__________________________________________________________________________________________ Number
UMP.UI.JControl.Number = function UMP$UI$JControl$Number(){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Number.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Number);
		return ele;
    }
}
UMP.UI.JControl.Number.prototype = {
    get_max: function () {
        return this.attr("max");
    },
    set_max: function (val) {
        this.attr("max", val);
    },
    get_min: function () {
        return this.attr("min");
    },
    set_min: function (val) {
        this.attr("min", val);
    },
    get_currency: function () {
        return this.attr("currency");
    },
    set_currency: function (val) {
        this.attr("currency", val);
    },
    get_precision: function () {
        return this.attr("max");
    },
    set_precision: function (val) {
        this.attr("precision", val);
    },
    get_roundType: function () {
        return this.attr("max");
    },
    set_roundType: function (val) {
        this.attr("roundType", val);
    },
    get_roundValue: function () {
        return this.attr("max");
    },
    set_roundValue: function (val) {
        this.attr("roundValue", val);
    }
};
UMP.UI.JControl.Number.registerClass('UMP.UI.JControl.Number',UMP.UI.JControl.Input);


//__________________________________________________________________________________________ ComboBox
UMP.UI.JControl.ComboBox = function UMP$UI$JControl$ComboBox(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.ComboBox.initializeBase(this, []);
	   
	   this._options = [];
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.ComboBox);
		return ele;
    }
}
UMP.UI.JControl.ComboBox.prototype = {
    get_datasource: function () {
        return this.attr("datasource");
    },
    set_datasource: function (val) {
        this.attr("datasource", val);
    },
	get_options: function () {
        return this.attr("options");
    },
    set_options: function (val) {
        this.attr("options", val);
    }
};
UMP.UI.JControl.ComboBox.registerClass('UMP.UI.JControl.ComboBox', UMP.UI.JControl.Input);


//__________________________________________________________________________________________ CheckBox
UMP.UI.JControl.CheckBox = function UMP$UI$JControl$CheckBox(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.CheckBox.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.CheckBox);
		return ele;
    }
}
UMP.UI.JControl.CheckBox.prototype = {
    get_checked: function () {
        return this.attr("checked");
    },
    set_checked: function (val) {
        this.attr("checked", val);
    }
};
UMP.UI.JControl.CheckBox.registerClass('UMP.UI.JControl.CheckBox', UMP.UI.JControl.Input);

//__________________________________________________________________________________________ Switch
UMP.UI.JControl.Switch = function UMP$UI$JControl$Switch(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Switch.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Switch);
		return ele;
    }
}
UMP.UI.JControl.Switch.prototype = {
    get_value: function () {
        return this.attr("value");
    },
    set_value: function (text) {
        this.attr("value", val);
    }
};
UMP.UI.JControl.Switch.registerClass('UMP.UI.JControl.Switch', UMP.UI.JControl.Input);


//__________________________________________________________________________________________ Image
UMP.UI.JControl.Image = function UMP$UI$JControl$Image(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Image.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Image);
		return ele;
    }
}
UMP.UI.JControl.Image.prototype = {
    get_src: function () {
        return this.attr("src");
    },
    set_src: function (val) {
        this.attr("src", val);
    }
};
UMP.UI.JControl.Image.registerClass('UMP.UI.JControl.Image', UMP.UI.Mvc.JControlBase);

//__________________________________________________________________________________________ toggleButton
UMP.UI.JControl.ToggleButton = function UMP$UI$JControl$ToggleButton(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.ToggleButton.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.ToggleButton);
		return ele;
    }
}
UMP.UI.JControl.ToggleButton.prototype = {
    get_textOn: function () {
        return this.attr("textOn");
    },
    set_textOn: function (val) {
        this.attr("textOn", val);
    },
	get_textOff: function () {
        return this.attr("textOff");
    },
    set_textOff: function (val) {
        this.attr("textOff", val);
    },
    get_checked: function () {
        return this.attr("checked");
    },
    set_checked: function (val) {
        this.attr("checked", val);
    },
	get_onclick: function () {
        return this.attr("onclick");
    },
    set_onclick: function (val) {
        this.attr("onclick", val);
    }
};
UMP.UI.JControl.ToggleButton.registerClass('UMP.UI.JControl.ToggleButton', UMP.UI.Mvc.JControlBase);

//__________________________________________________________________________________________ Tooltipbar
UMP.UI.JControl.Tooltipbar = function UMP$UI$JControl$Tooltipbar(ele){
	if(typeof ele == "undefined"){
       UMP.UI.JControl.Tooltipbar.initializeBase(this, []);
    }else{
	    ele = $document.parseType(ele, UMP.UI.JControl.Tooltipbar);
		return ele;
    }
}
UMP.UI.JControl.Tooltipbar.prototype = {
    get_value: function () {
        return this.attr("value");
    },
    set_value: function (text) {
        this.attr("value", val);
    }
};
UMP.UI.JControl.Tooltipbar.registerClass('UMP.UI.JControl.Tooltipbar', UMP.UI.Mvc.JControlBase);


