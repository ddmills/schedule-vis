'use strict';

var
  gutil      = require('gulp-util'),
  jetpack    = require('fs-jetpack'),
  gulp       = require('gulp'),
  browserify = require('browserify'),
  babelify   = require('babelify'),
  sass       = require('gulp-sass')
;

gulp.task('clean', function() {
  return jetpack.cwd('./build').dir('.', { empty : true });
});

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

gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['babelify']);
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['clean', 'html', 'sass', 'browserify', 'watch']);
