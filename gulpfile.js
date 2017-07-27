/**
 * gulp入口文件
 * Created by Administrator on 2017/4/27.
 */
const gulp = require('gulp');
//less文件编译
const less = require('gulp-less');
//ejs编译
const ejs = require('gulp-ejs');
//css文件压缩
const cssmin = require('gulp-minify-css');
//获取 uglify 模块（用于压缩 JS）
const uglify = require('gulp-uglify');
//监听
const watch = require('gulp-watch');
//异常警报
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
//debug
const debug = require('gulp-debug');
//文件更改编译
const changed = require('gulp-changed');
//本地Web服务器
const connect = require('gulp-connect');
//重命名
const rename = require('gulp-rename');
//静态服务器
const browserSync = require('browser-sync').create();
//启动node服务
const nodemon = require('gulp-nodemon');
//gulp顺序执行任务
const gulpSequence = require('gulp-sequence');
//合并多个stream
const merge = require('merge-stream');

//node服务与浏览器配置
gulp.task('server', function () {
    nodemon({
        script: './bin/SDDwww',
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
        browserSync.reload();
        console.log('restarted!')
    })
});

//文件编译
gulp.task('compile', function () {
    let fonts = gulp.src('src/public/fonts/**')
        .pipe(changed('dist/public/fonts'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(gulp.dest('dist/public/fonts'))//编译完成后输出
        .pipe(debug({title: '静态编译:'}));

    let images = gulp.src('src/public/images/**')
        .pipe(changed('dist/public/images'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(gulp.dest('dist/public/images'))//编译完成后输出
        .pipe(debug({title: '静态编译:'}));

    let plugins = gulp.src('src/public/plugins/**')
        .pipe(changed('dist/public/plugins'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(gulp.dest('dist/public/plugins'))//编译完成后输出
        .pipe(debug({title: '静态编译:'}));

    return merge(fonts, images, plugins)
});

//js文件编译
gulp.task('js', function () {
    return gulp.src('src/public/js/*.js')
        .pipe(changed('dist/public/js'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(uglify())
        .pipe(gulp.dest('dist/public/js'))
        .pipe(debug({title: 'js编译:'}));
});

//less文件编译
gulp.task('less', function () {
    return gulp.src('src/public/stylesheets/*.less')//less文件路径
        .pipe(changed('dist/public/stylesheets'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(less())//执行编译less
        .pipe(cssmin())//兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/public/stylesheets'))//编译完成后输出
        .pipe(debug({title: 'less编译:'}));
});

//routes文件编译
gulp.task('routes', function () {
    return gulp.src('src/routes/**')
        .pipe(changed('dist/routes'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(gulp.dest('dist/routes'))//编译完成后输出
        .pipe(debug({title: 'routes编译:'}));
});

//views文件编译
gulp.task('views', function () {
    return gulp.src('src/views/**')
        .pipe(changed('dist/views'))
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))//异常警报
        .pipe(gulp.dest('dist/views'))//编译完成后输出
        .pipe(debug({title: 'views编译:'}));
});

gulp.task('watch', function () {
    gulp.watch(['src/public/fonts/**', 'src/public/images/**', 'src/public/plugins/**'], ['compile', browserSync.reload]);
    gulp.watch('src/public/js/*.js', ['js', browserSync.reload]);
    gulp.watch('src/public/stylesheets/*.less', ['less', browserSync.reload]);
    gulp.watch('src/views/**', ['views', browserSync.reload]);
    gulp.watch('src/routes/**', ['routes']);
});

gulp.task('default', gulpSequence('routes', ['js', 'less', 'views', 'compile'], 'server', 'watch'));