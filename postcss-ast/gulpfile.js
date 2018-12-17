var gulp = require('gulp');
var postcss = require('gulp-postcss');
var fontstack = require('./gulp-postcss-url_replace');

gulp.task('css', function(){
    var processors = [fontstack({publicPath:'http://img.ddky.com'})];
    return gulp.src('./orderDetail.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});