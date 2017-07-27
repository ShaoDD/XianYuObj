/**
 * Created by WinterKiSS on 2016/9/10.
 */
var Action = require("./apiaction");

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
        Action.send(req, res, 'CNodeTopics', 'https', 'get', {}, function (res, data) {
            var data = JSON.parse(data);
            for (var i = 0; i < data.data.length; i++) {
                var now_date = new Date();
                var last_date = new Date(data.data[i].last_reply_at);
                var last_type = 1;
                var last_time = parseInt((now_date.getTime() - last_date.getTime()) / (1000 * 60 * 60));
                if (last_time == 0) {
                    last_type = 2;
                    last_time = parseInt((now_date.getTime() - last_date.getTime()) / (1000 * 60))
                } else if (last_time >= 24) {
                    last_type = 3;
                    last_time = parseInt((now_date.getTime() - last_date.getTime()) / (1000 * 60 * 60 * 24))
                }
                data.data[i].last_type = last_type;
                data.data[i].last_time = last_time;
            }
            console.log(data.data[10]);
            res.render("app/test", {
                css: 'test',
                layout: 'app/all-layout',
                jscript: 'test',
                title: '测试11221',
                data: data.data
            })
        })
    })
};