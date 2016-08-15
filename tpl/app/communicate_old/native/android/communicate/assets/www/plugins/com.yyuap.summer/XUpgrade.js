cordova.define("summer-plugin-core.XUpgrade", function(require, exports, module) {

        var exec = require('cordova/exec');

        var service = {};

        service.checkVer = function(params, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XUpgrade", "checkVersion", [params]);
        };

        service.downLoad = function(params, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XUpgrade", "upgrade", [params])
        }

        service.getVer = function(params, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XUpgrade", "getVersion",[params])
        }

        module.exports = service;

    }
);
