/**
 * Created by wdb on 5/16/15.
 */
define([
    "jquery"
], function($) {
    var IO = {
        post : function(url,param,callback) {
            var data = {};
            if (typeof param === "object") {
                var hasProp = false;
                for (var prop in param) {
                    hasProp = true;
                    break;
                }
                if (hasProp) {
                    data = param;
                }
            } else if (typeof param === "function") {
                callback = param;
            }

            $.ajax({
                url:url,
                type:"post",
                data: data,
                dataType:'json',
                success: function(d){
                    if(typeof(callback) === "function") {
                        callback(d);
                    }
                },
                error: function(x, t, e) {}
            });
        },
        get : function(url,param,callback) {
            var data = {};
            if (typeof param === "object") {
                var hasProp = false;
                for (var prop in param) {
                    hasProp = true;
                    break;
                }
                if (hasProp) {
                    data = param;
                }
            } else if (typeof param === "function") {
                callback = param;
            }

            $.ajax({
                url:url,
                type:"get",
                data: data,
                dataType:'json',
                success: function(d){
                    if(typeof(callback) === "function") {
                        callback(d);
                    }
                },
                error: function(x, t, e) {}
            });
        }
    };
    return IO;
});