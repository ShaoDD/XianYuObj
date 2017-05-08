/**
 * Created by WinterKiSS on 2016/9/10.
 */
var Action = require("./apiaction");
var DataProxy = require("data-proxy");

var mysql = require('mysql');
//配置模块
var sqloperate = require('./SQL_interface/SQL_operate');

exports.appRouter = function (router) {
    router.get("/app/maptest", function (req, res) {
        res.render("app/mapTest", {
            css: 'mapTest',
            layout: 'app/all-layout',
            jscript: 'mapTest',
            title: 'aaaa'
        })
    });

    // router.get("/app/index", function (req, res) {
    //     // var db = 'dd_financial';
    //     // var con = '';
    //     // sqloperate.selectSQL(db,con,res);
    //     res.render("app/index", {
    //         css: 'index',
    //         layout: 'app/all-layout',
    //         jscript: 'index',
    //         title: '首页'
    //     })
    // });

    //首页
    router.get("/app/index", function (req, res) {
        res.render("app/index", {
            css: 'index',
            layout: 'app/all-layout',
            jscript: 'index',
            title: '首页'
        })
    });

    //测试页面
    router.get("/app/test", function (req, res) {
        res.render("app/test", {
            css: 'test',
            layout: 'app/all-layout',
            jscript: 'test',
            title: '测试'
        })
    })
};