'use strict';

var
  gutil      = require('gulp-util'),
  jetpack    = require('fs-jetpack'),
  gulp       = require('gulp'),
  browserify = require('browserify'),
  babelify   = require('babelify')
;

gulp.task('browserify', function() {
  browserify('source/js/main.js', { debug : false })
    .transform(babelify.configure({ "presets": ["es2015"] }))
    .bundle()
    .on('error', function(error) { gutil.log('ERROR: ' + error.message); })
    .pipe(jetpack.createWriteStream('build/main.js'));
});

gulp.task('html', function() {
  return jetpack.copy('source', 'build', {
    overwrite: true,
    matching: '!*.js'
  });
});

gulp.task('watch', function() {
  gulp.watch('source/**/*.js', ['babelify']);
  gulp.watch('source/**/*.html', ['html']);
});

gulp.task('default', ['html', 'browserify', 'watch']);
