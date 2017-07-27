/**
 * API Action
 */
var URL = require("./apiurl");
var DataProxy   = require("./data-proxy");

function send(req, res, url, params, callback) {

    var path = URL.geturl(url);

    if(typeof params == "function") {
        callback = params;
    }

    new DataProxy({
        req : req,
        res : res,
        reqType : "http",
        reqOption : {
            url : path,
            params : params || {},
            success : callback || function(res,data){
                if(!data || data == "undefined" || data == "null")data="{}";
                var json = JSON.parse(data);
                if(json.data === "" || json.data===null) {
                    res.status(200).json(json);
                }else {
                    res.status(200).json(json.data);
                }
            }
        }
    }).handleRequest();
}

exports.send = send;