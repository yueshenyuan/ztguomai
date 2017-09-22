// 引入组件
 var gulp = require('gulp'),                    // 引入Gulp
     minifycss = require('gulp-minify-css'),    // css压缩
     uglify = require('gulp-uglify'),        // js压缩
     concat = require('gulp-concat'),        // 文件合并
     rename = require('gulp-rename'),        // 文件更名
     less = require('gulp-less'),            // less2css
     notify = require('gulp-notify'),        // 提示信息
     connect = require('gulp-connect'),      //livereload
     zip = require('gulp-zip');              //生成zip包
 
// less to css
gulp.task('less2css', function () {
    return    gulp.src('./less/*.less')
            .pipe(less())
            .pipe(gulp.dest('./css'))
            .pipe(notify({ message: 'less2css task ok' }));
});

// 合并、压缩、重命名css
gulp.task('css', function() {
    return    gulp.src('src/css/*.css')
            .pipe(concat('main.css'))
            .pipe(gulp.dest('./dest/css'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest('./dest/css'))
            .pipe(notify({ message: 'css task ok' }))
            .pipe(connect.reload());
});

// 合并、压缩js文件
gulp.task('js', function() {

    return    gulp.src('src/js/*.js')
            .pipe(concat('main.js'))
            .pipe(gulp.dest('dest/js'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            .pipe(gulp.dest('dest/js'))
            .pipe(notify({ message: 'js task ok' }));
});

// 监测html文件改动
gulp.task('html', function(){
	return  gulp.src('*.html')
			.pipe(gulp.dest('src'))
			.pipe(notify({ message: 'html task ok' }))
			.pipe(connect.reload());
})

// 监控文件改动
gulp.task('watch', function(){
	gulp.watch('less/*', function(e){
		gulp.run('less2css');
	})
	gulp.watch('*.html', function(e){
		gulp.run('html');
	})
})

 //定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

// 生成zip包
gulp.task('zip', function() {
    return gulp.src(['**/*.*', '!node_modules/**/*.*', '!package.json', '!src/less/*.*', '!src/export/*.*', '!gulpfile.js'])
        .pipe(zip('test.zip'))
        .pipe(gulp.dest('export'));
});

// 默认任务
gulp.task('default', function(){

gulp.run('less2css', 'html', 'watch', 'connect');
 
//  // Watch .css files
//  gulp.watch('src/css/*.css', ['css']);
// 
//  // Watch .js files
//  gulp.watch('src/js/*.js', ['js']);

});
 
//定义一个testLess任务（自定义任务名称）
//gulp.task('testLess', function () {
//    gulp.src('src/less/index.less') //该任务针对的文件
//        .pipe(less()) //该任务调用的模块
//        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
//});
// 
//gulp.task('default',['testLess']); //定义默认任务