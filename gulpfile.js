var gulp = require('gulp');
//gulp中插件应用 下载--》取到--》应用
//压缩html  
var htmlClean = require('gulp-htmlclean');
//压缩图片
var imageMin = require('gulp-imagemin');
//压缩js
var uglify = require('gulp-uglify');

//去掉js中的调试语句
var debug = require('gulp-strip-debug');
//将less--》css
var less = require('gulp-less');

//压缩css
var cleanCss = require('gulp-clean-css');

//postcss autoprefixer添加前缀
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

//开启服务器
var connect = require('gulp-connect');

var folder = {
    src: 'src/',
    dist: 'dist/'
}
//判断当前环境变量
var devMod = process.env.NODE_ENV == 'development';
//设置环境变量
//export NODE_ENV=development


gulp.task("html", function () { //创建任务
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
    if (!devMod) { //生产环境压缩
        page.pipe(htmlClean())  //压缩后再调用输出

    }
    page.pipe(gulp.dest(folder.dist + 'html/'));
});

gulp.task("image", function () { //创建任务
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())  //压缩后再调用输出
        .pipe(gulp.dest(folder.dist + 'image/'));
});

gulp.task("css", function () { //创建任务
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));
    if (!devMod) {
        page.pipe(cleanCss())
    }

    page.pipe(gulp.dest(folder.dist + 'css/'));
});

gulp.task("js", function () { //创建任务
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())

    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }

    page.pipe(gulp.dest(folder.dist + 'js/'));
});

gulp.task("server", function () {
    connect.server({
        port: '8888',
        livereload: true
    });
});

//开启监听，实现自动刷新
gulp.task("watch", function () {
    gulp.watch(folder.src + 'html/*', ["html"]);
    gulp.watch(folder.src + 'css/*', ["css"]);
    gulp.watch(folder.src + 'js/*', ["js"]);

});
gulp.task("default", ["html", "css", "js", "image", "server", "watch"]);

//gulp.src
//gulp.dest
//gulp.task
//gulp.watch