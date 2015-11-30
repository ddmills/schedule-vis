'use strict';

var
  gutil      = require('gulp-util'),
  jetpack    = require('fs-jetpack'),
  gulp       = require('gulp'),
  browserify = require('browserify'),
  babelify   = require('babelify')
;

var srcDir = 'app';
var destDir = 'build';

gulp.task('babelify', function() {
  browserify(srcDir + '/src/js/main.js', { debug : false })
    .transform(babelify.configure({ "presets": ["es2015"] }))
    .bundle()
    .on('error', function(error) {
      gutil.log('ERROR: ' + error.message);
    })
    .pipe(jetpack.createWriteStream(destDir + '/main.js'));
});


gulp.task('copy', function() {
  return jetpack.copy(srcDir, destDir, {
    overwrite: true,
    matching: '!*.js'
  });
});

gulp.task('watch', function() {
  gulp.watch(srcDir + '/**/*.js', ['babelify']);
});

gulp.task('default', ['copy', 'babelify', 'watch']);
