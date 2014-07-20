var config = require('./config.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('./util.js').clean,
    connect = require('gulp-connect'),
    src = config.path.src,
    dev = config.path.development;

var removeIndexFile = clean(dev.index),
    cleanHtmlTemplates = clean(dev.templates);

gulp.task("copy-templates", cleanHtmlTemplates, function () {
    gulp.src(src.templates)
        .pipe(gulp.dest(dev.templates))
        .pipe(connect.reload())
        .on('end', function () {
            gutil.log('successfully copied html files')
        })
        .on('error', function (err) {
            gutil.log(err);
        });
});

gulp.task("copy-index-file", removeIndexFile, function () {
    gulp.src(src.index)
        .pipe(gulp.dest(dev.self))
        .pipe(connect.reload())
        .on('end', function () {
            gutil.log('successfully copied index file')
        })
        .on('error', function (err) {
            gutil.log(err);
        });
});

