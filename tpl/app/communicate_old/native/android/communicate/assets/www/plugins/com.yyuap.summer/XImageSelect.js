cordova.define("summer-plugin-service.XImageSelect", function(require, exports, module) {

        var exec = require('cordova/exec');

        var service = {};

        service.imageSelect = function( params, successCallback, errorCallback) {
            exec(successCallback, errorCallback, "XImageSelect", "imageSelect", [params]);
        };

        module.exports = service;

    }
);
