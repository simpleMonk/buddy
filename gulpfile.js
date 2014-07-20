var gulp = require('gulp'),
    config = require('./tasks/config.js'),
    clean = require('./tasks/util.js').clean,
    runSequence = require('run-sequence'),
    watch = require('gulp-watch');

require('./tasks/templates.js');
require('./tasks/webserver.js');
require('./tasks/scripts.js');
require('./tasks/styles.js');
require('./tasks/dist.js');

var src = config.path.src;
var vendor = config.path.vendor;

gulp.task('default', function () {
    runSequence('prepare-dev', 'watch', 'run-dev-server');
});

gulp.task('watch', function () {
    gulp.watch([src.js, vendor.js], ['prepare-dev-js']);
    gulp.watch([src.templates], ['copy-templates']);
    gulp.watch([src.index], ['copy-index-file']);
    gulp.watch([src.css], [ 'copy-less-css']);
    gulp.watch([src.specs], ['lint-src-files', 'run-browserified-specs']);

});

gulp.task('clean-dev', function () {
    clean(config.path.development.self + "/*");
});

gulp.task('clean-dist', function () {
    clean(config.path.dist.self + "/*");
});


gulp.task('prepare-dev', function (cb) {
    runSequence('clean-dev',
        'prepare-dev-js',
        'prepare-dev-templates',
        'copy-less-css',
        cb);
});

gulp.task('prepare-dev-js', function () {
    runSequence('copy-vendor-js', 'copy-browserified-src-files', 'run-browserified-specs');
});

gulp.task('prepare-dev-templates', ['copy-index-file', 'copy-templates']);

gulp.task('build', function () {
    runSequence('clean-dist', ['build-js', 'build-css', 'build-templates'], 'run-dist-server');
});






