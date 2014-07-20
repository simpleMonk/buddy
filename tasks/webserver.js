var gulp = require('gulp'),
    config = require('./config.js'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');


gulp.task('run-dev-server', function () {
    connect.server({
        root: [config.path.development.self],
        port: 8000,
        livereload: true
    });
});

