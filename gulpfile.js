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
//本地Web服务器
var connect = require('gulp-connect');
//重命名
var rename = require('gulp-rename');
//静态服务器
var browserSync = require('browser-sync').create();
//重启node服务
var nodemon = require('gulp-nodemon');

// //启动本地web服务
// gulp.task('webServer', function () {
//     connect.server({
//         root: 'dest',
//         livereload: true,
//         port: 9001
//     })
// });

gulp.task('serve', ['routes', 'less', 'js', 'ejs', 'plugins'], function () {
    browserSync.init({
        proxy: "http://localhost:9001"
    });
});

//routes文件编译
gulp.task('routes', function () {
    gulp.src('src/routes/*.js')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch('src/routes/*.js'))//监听修改文件
        .pipe(gulp.dest('routes/app'))//编译完成后输出
        .pipe(connect.reload())
        .pipe(browserSync.stream());
});

//less文件编译
gulp.task('less', function () {
    gulp.src('src/less/*.less')//less文件路径
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch('src/less/*.less'))//监听修改文件
        .pipe(less())//执行编译less
        .pipe(cssmin())//兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('public/stylesheets/app'))//编译完成后输出
        .pipe(connect.reload())
        .pipe(browserSync.stream());
});

//js文件编译
gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch('src/js/*.js'))//监听修改文件
        .pipe(uglify())
        .pipe(gulp.dest('public/js/biz/app'))
        .pipe(connect.reload())
        .pipe(browserSync.stream());
});

//js插件编译
gulp.task('plugins', function () {
    gulp.src(['src/plugins/**/*', 'src/plugins/*'])
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch(['src/plugins/**/*', 'src/plugins/*']))//监听修改文件
        .pipe(gulp.dest('public/plugins'))
        .pipe(connect.reload())
        .pipe(browserSync.stream());
});

//html文件编译
gulp.task('ejs', function () {
    gulp.src('src/views/app/*.ejs')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch('src/views/app/*.ejs'))//监听修改文件
        .pipe(gulp.dest('views/app'))
        .pipe(connect.reload())
        .pipe(browserSync.stream());

    gulp.src('src/views/layout/*.ejs')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(watch('src/views/layout/*.ejs'))//监听修改文件
        .pipe(gulp.dest('views/layout'))
        .pipe(connect.reload())
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);