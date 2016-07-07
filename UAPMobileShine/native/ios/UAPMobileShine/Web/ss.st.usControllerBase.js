//JavaScript Framework 2.0 Code
Type.registerNamespace('ss.st.usControllerBase');
ss.st.usControllerBase = function() {
    //Step 1：inherit the base class
    var args = {
        "context" : "ugheader",
        "controller" : "usController",
        "namespace" : "ss.st"
    };
    ss.st.usControllerBase.initializeBase(this,[args]);
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openProductList(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openLinkus(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openHonor(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openFAQ(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openMain(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openCompanyIntroduction(json){
    //No javascript because of invoking the native common services
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$pageload(json){
    //<action id="pageload" method="jspageload" containerName=""></action>
    var args = {
        "actionid" : "pageload",
        "method" : "jspageload",
        "json" : json
    };
    return this.execMethod(args);
}
//Auto Generate JavaScript Code...
function ss$st$usControllerBase$openUserSuggest(json){
    //No javascript because of invoking the native common services
}
ss.st.usControllerBase.prototype = {

    openProductList : ss$st$usControllerBase$openProductList,
    openLinkus : ss$st$usControllerBase$openLinkus,
    openHonor : ss$st$usControllerBase$openHonor,
    openFAQ : ss$st$usControllerBase$openFAQ,
    openMain : ss$st$usControllerBase$openMain,
    
    openCompanyIntroduction : ss$st$usControllerBase$openCompanyIntroduction,
    pageload : ss$st$usControllerBase$pageload,
    openUserSuggest : ss$st$usControllerBase$openUserSuggest
};
ss.st.usControllerBase.registerClass('ss.st.usControllerBase',UMP.UI.Mvc.ControllerBase);
