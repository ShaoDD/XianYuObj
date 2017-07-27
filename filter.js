/**
 * Created by Administrator on 2016/10/17 0017.
 */
var sysConfig = require('./config');
var utils = require('./utils');
var async = require('async');
var https = require('https');
var expiredTime = 900000000;
var webdebug = true;
var jwt = require('jsonwebtoken');
var base64 = require('base64url');
var md5 = require('md5');

exports.filterFun = function (req, res, next) {
    console.log("**********Start**********");
    var url = req.originalUrl;
    if (url === "/") {
        return res.redirect("/app/index");
    }
    var boo = sysConfig.isWhiteList(url);
    if (boo) {
        return next();
    } else {
        console.log("**********拦截**********");
        clientFun(req, res, next);
    }
};

var clientFun = function (req, res, next) {
    var url = req.originalUrl;
    var referer = req.headers.referer;
    console.log(url);
    if (url.indexOf("/api") != -1) {
        console.log("[[[(api)]]]");
        clientApi(req, res, next)
    } else if (url.indexOf("/app") != -1) {
        console.log("[[[(app)]]]");
        clientApp(req, res, next);
    } else if (url.indexOf("/web") != -1) {
        console.log("[[[(web)]]]");
        clientWeb(req, res, next)
    }
};

var clientApp = function (req, res, next) {
    var url = req.originalUrl;
    var oldUrl = url;
    var sessionid = req.cookies.sessionid;
    var boo = false;
    boo = sysConfig.isApp(url);
    if (boo) {
        if (!sessionid) {
            return res.redirect('/app/login');
        }
    }
    return next();
};

var clientWeb = function (req, res, next) {
    var url = req.originalUrl;
    var sessionid = req.cookies.sessionid;
    var boo = false;
    boo = sysConfig.isWeb(url);
    if (boo) {
        if (!sessionid) {
            return res.redirect('/web/login');
        }
    }
    return next();
};

var clientApi = function (req, res, next) {
    return next()
};