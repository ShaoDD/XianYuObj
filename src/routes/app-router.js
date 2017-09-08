/**
 * Created by WinterKiSS on 2016/9/10.
 */
var Action = require("./apiaction");
var DataProxy = require("data-proxy");

var mysql = require('mysql');
//配置模块
var sqloperate = require('./SQL_interface/SQL_operate');

exports.appRouter = function (router) {
    //首页
    router.get("/app/index", function (req,res) {
        res.render("app/index",{
            css: 'index',
            layout: 'app/all-layout',
            jscript: 'index',
            title: '首页首页'
        })
    })
};