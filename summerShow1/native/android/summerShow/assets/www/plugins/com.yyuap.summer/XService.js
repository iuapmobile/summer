cordova.define("summer-plugin-service.XService", function(require, exports, module) {

        var exec = require('cordova/exec');

        var service = {};

        service.call = function(method, params, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XService", "call", [method,params]);
        };

        module.exports = service;

    }
);
