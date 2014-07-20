var gulp = require('gulp'),
    config = require('./config.js'),
    gutil = require('gulp-util'),
    ignore = require('gulp-ignore'),
    clean = require('./util.js').clean,
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    concatcss = require('gulp-concat-css'),
    recess = require('gulp-recess'),
    notify = require('gulp-notify');


var srcStyleSheetFiles = config.path.src.css,
    devStyleSheetPath = config.path.development.css;


gulp.task('clean-stylesheet', function () {
    clean(devStyleSheetPath + "/*");
});

gulp.task('copy-less-css', ['clean-stylesheet', 'lint-less-files'], function () {
    gulp.src(srcStyleSheetFiles)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(concatcss('app.css'))
        .pipe(gulp.dest(devStyleSheetPath))
        .on('end', function () {
            gutil.log('successfully copied less files')
        })
        .on('error', function (err) {
            gutil.log(err.message);
        });
});


gulp.task('lint-less-files', function () {
    gulp.src(srcStyleSheetFiles)
        .pipe(recess())
        .on('error', function (err) {
            gutil.log(err.message);
        });
});
