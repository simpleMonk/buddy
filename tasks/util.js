var config = require('./config.js'),
    gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    gutil = require('gulp-util')
    del = require('del');


function clean(globFolder) {
    gulp.src(globFolder)
        .pipe(rimraf({force: true}))
        .on('error', function (err) {
            gutil.log(err);
        });
};

exports.clean= clean;


