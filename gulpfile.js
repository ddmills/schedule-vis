'use strict';

var
  gutil      = require('gulp-util'),
  jetpack    = require('fs-jetpack'),
  gulp       = require('gulp'),
  browserify = require('browserify'),
  babelify   = require('babelify'),
  sass       = require('gulp-sass')
;

/*
 * Delete the contents of the build directory
 */
gulp.task('clean', function() {
  return jetpack.cwd('./build').dir('.', { empty : true });
});

/*
 * Transpile es6 code to es5 using Babel and browserify
 */
gulp.task('transpile', function() {
  browserify('source/js/main.js', { debug : false })
    .transform(babelify.configure({ "presets": ["es2015"] }))
    .bundle()
    .on('error', function(error) { gutil.log('ERROR: ' + error.message); })
    .pipe(jetpack.createWriteStream('build/main.js'));
});

/*
 * Copy HTML files over
 */
gulp.task('html', function() {
  return jetpack.copy('source', 'build', {
    overwrite: true,
    matching: '!*.js'
  });
});

/*
 * Convert SASS files to CSS
 */
gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

/*
 * Watch for when JS, HTML, or SCSS files change so they can be updated
 */
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['babelify']);
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/sass/**/*.scss', ['sass']);
});

/*
 * To run the default task, simply execute the `gulp` command
 */
gulp.task('default', ['clean', 'html', 'sass', 'transpile', 'watch']);
