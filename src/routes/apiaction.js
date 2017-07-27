/**
 * API Action
 */
var URL = require("./apiurl");
var DataProxy = require("./data-proxy");

function send(req, res, url, reqType, method, params, callback) {

    var path = URL.geturl(url);

    if (typeof params == "function") {
        callback = params;
    }

    if (!reqType) {
        reqType = 'http';
    }

    new DataProxy({
        req: req,
        res: res,
        reqType: reqType,
        reqOption: {
            url: path,
            method: method,
            params: params || {},
            success: callback || function (res, data) {
                if (!data || data == "undefined" || data == "null") data = "{}";
                var json = JSON.parse(data);
                if (json.data === "" || json.data === null) {
                    res.status(200).json(json);
                } else {
                    res.status(200).json(json.data);
                }
            }
        }
    }).handleRequest();
}

exports.send = send;
