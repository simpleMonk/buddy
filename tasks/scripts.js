var config = require('./config.js'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    ignore = require('gulp-ignore'),
    clean = require('./util.js').clean,
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    multiGlob = require('multi-glob');

var vendorJsFiles = config.path.vendor.js,
    srcJsFiles = config.path.src.js,
    developmentJsPath = config.path.development.js,
    srcSpecJsFiles = config.path.src.specs,
    developmentSpecJsPath = config.path.development.spec;

gulp.task('copy-vendor-js', ['clean-dev-vendor-js'], function () {
    gulp.src(vendorJsFiles)
        .pipe(ignore(/rx.angular.min.js/))
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(developmentJsPath))
        .pipe(connect.reload())
        .on('end', function () {
            gutil.log('successfully copied vendor scripts')
        })
        .on('error', function (err) {
            gutil.log(err);
        });
});

gulp.task('copy-src-js', ['clean-dev-app-js'], function () {
    gulp.src(srcJsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat("app.js"))
        .pipe(gulp.dest(developmentJsPath))
        .pipe(connect.reload())
        .on('end', function () {
            gutil.log('successfully copied source scripts');
        })
        .on('error', function (err) {
            gutil.log(err);
        });
});


gulp.task('run-specs', ['clean-dev-spec-js'], function () {
    gulp.src(srcSpecJsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('spec.js'))
        .pipe(gulp.dest(developmentSpecJsPath))
        .pipe(mocha({
            reporter: 'spec',
            ui: 'bdd'
        }))
        .on('error', function (err) {
            gutil.log('----------------------------');
            gutil.log(err.message);
            gutil.log('----------------------------');
        });

});


gulp.task('copy-browserified-src-files', ['clean-dev-app-js', 'lint-src-files'], function () {
    var browserifyCallback = function (files) {
        browserify({entries: files})
            .bundle()
            .pipe(source("app.js"))
            .pipe(gulp.dest(developmentJsPath))
            .on('end', function () {
                gutil.log('successfully copied source scripts');
            })
            .on('error', function (err) {
                gutil.log(err);
            });
    };

    browserifyFiles(srcJsFiles, browserifyCallback);
});

gulp.task('run-browserified-specs', ['clean-dev-spec-js', 'lint-spec-files'], function () {
    function browserifySpecCallback(files) {
        browserify({entries: files})
            .bundle()
            .pipe(source("spec.js"))
            .pipe(gulp.dest(developmentSpecJsPath))
            .pipe(mocha({
                reporter: 'spec',
                ui: 'bdd'
            }))
            .on('error', function (err) {
                gutil.log('----------------------------');
                gutil.log(err.message);
                gutil.log('----------------------------');
            });
    };

    browserifyFiles(srcSpecJsFiles, browserifySpecCallback);
});

gulp.task('clean-dev-app-js', function () {
    clean(developmentJsPath + "/app.js");
});
gulp.task('clean-dev-vendor-js', function () {
    clean(developmentJsPath + "/vendor.js");
});
gulp.task('clean-dev-spec-js', function () {
    clean(developmentJsPath + "/spec.js");
});

gulp.task('lint-src-files', function () {
    lint(srcJsFiles);
});
gulp.task('lint-spec-files', function () {
    lint(srcSpecJsFiles);
});


function browserifyFiles(srcGlob, browserifyCallback) {
    multiGlob.glob(srcGlob, function (err, files) {
        files = files.map(prefixFileName);
        browserifyCallback(files);
    });
};

function prefixFileName(fileName) {
    return "./" + fileName;
}

function lint(files) {
    gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
}



