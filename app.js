/**
 * NodeJS应用服务器启动入口
 *
 * @type {exports|*}
 */
const express = require('express');
const partials = require('express-partials');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('dmp-webapp');
const fs = require('fs');
const routes = require('./dist/routes/router');
const filter = require('./filter');

const app = express();
//端口号
app.set('port', process.env.PORT || 9001);
//设置视图路径
app.set('views', path.join(__dirname, './dist/views'));
// 设置试图引擎
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//视图片段
app.use(partials());
//日志记录器
app.use(logger('dev'));
//解析客户端请求中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//解析和存储cookie
app.use(cookieParser());
//静态文件支持
app.use(express.static(path.join(__dirname, './dist/public')));

//拦截器
app.use(filter.filterFun);
//路由
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;