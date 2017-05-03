/**
 * gulp入口文件
 * Created by Administrator on 2017/4/27.
 */
var gulp = require('gulp');
//less文件编译
var less = require('gulp-less');
//ejs编译
var ejs = require('gulp-ejs');
//css文件压缩
var cssmin = require('gulp-minify-css');
//获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
//监听
var watch = require('gulp-watch');
//异常警报
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
//debug
var debug = require('gulp-debug');
//文件更改编译
var changed = require('gulp-changed');
//本地Web服务器
var connect = require('gulp-connect');
//重命名
var rename = require('gulp-rename');
//静态服务器
var browserSync = require('browser-sync').create();
//启动node服务
var nodemon = require('gulp-nodemon');

//node服务与浏览器配置
gulp.task('server', function () {
    nodemon({
        script: './bin/www',
        // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型
        ignore: ["gulpfile.js", "node_modules/", "dist/public", "dist/views", "src/"],
        env: {'NODE_ENV': 'development'}
    }).on('start', function () {
        browserSync.init({
            proxy: "http://localhost:9001",
            browser: 'chrome'
        }, function () {
            browserSync.reload();
            console.log("browser refreshed!")
        });
    }).on('restart', function () {
        console.log('restarted!')
    })
});

//文件编译
gulp.task('compile', function () {
    gulp.src('src/**')
        .pipe(changed('dist'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch('src/**'))//监听修改文件
        .pipe(gulp.dest('dist'))//编译完成后输出
        .pipe(debug({title: '编译:'}))
});

gulp.task('default', ['compile', 'server']);