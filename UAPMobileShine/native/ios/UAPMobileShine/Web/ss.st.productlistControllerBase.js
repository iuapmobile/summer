//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.productlistControllerBase');
ss.st.productlistControllerBase = function() {
    //Step 1：inherit the base class
    var args = {
        "context" : "",
        "controller" : "productlistController",
        "namespace" : "ss.st"
    };
    ss.st.productlistControllerBase.initializeBase(this,[args]);
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$linkus(json){
    //<action id="linkus" method="linkus" containerName=""></action>
    var args = {
        "actionid" : "linkus",
        "method" : "linkus",
        "json" : json
    };
    return this.execMethod(args);
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$openProductList(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$openHonor(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$openFAQ(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$hiddenmore(json){
    //<action id="hiddenmore" method="hiddenmore" containerName=""></action>
    var args = {
        "actionid" : "hiddenmore",
        "method" : "hiddenmore",
        "json" : json
    };
    return this.execMethod(args);
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$opendetailAction(json){
    //<action id="opendetailAction" method="opendetail" containerName=""></action>
    var args = {
        "actionid" : "opendetailAction",
        "method" : "opendetail",
        "json" : json
    };
    return this.execMethod(args);
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$openMain(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$back(json){
    //<action id="back" method="back" containerName=""></action>
    var args = {
        "actionid" : "back",
        "method" : "back",
        "json" : json
    };
    return this.execMethod(args);
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$onloadAction(json){
    //<action id="onloadAction" method="myonload" containerName=""></action>
    var args = {
        "actionid" : "onloadAction",
        "method" : "myonload",
        "json" : json
    };
    return this.execMethod(args);
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$openCompanyIntroduction(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$productlistControllerBase$showmore(json){
    //<action id="showmore" method="showmore" containerName=""></action>
    var args = {
        "actionid" : "showmore",
        "method" : "showmore",
        "json" : json
    };
    return this.execMethod(args);
}
ss.st.productlistControllerBase.prototype = {
    linkus : ss$st$productlistControllerBase$linkus,
    openProductList : ss$st$productlistControllerBase$openProductList,
    openHonor : ss$st$productlistControllerBase$openHonor,
    openFAQ : ss$st$productlistControllerBase$openFAQ,
    hiddenmore : ss$st$productlistControllerBase$hiddenmore,
    opendetailAction : ss$st$productlistControllerBase$opendetailAction,
    openMain : ss$st$productlistControllerBase$openMain,
    back : ss$st$productlistControllerBase$back,
    onloadAction : ss$st$productlistControllerBase$onloadAction,
    openCompanyIntroduction : ss$st$productlistControllerBase$openCompanyIntroduction,
    showmore : ss$st$productlistControllerBase$showmore
};
ss.st.productlistControllerBase.registerClass('ss.st.productlistControllerBase',UMP.UI.Mvc.ControllerBase);
