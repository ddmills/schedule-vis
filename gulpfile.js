'use strict';

var
  gutil      = require('gulp-util'),
  gulp       = require('gulp'),
  browserify = require('browserify'),
  babelify   = require('babelify'),
  source     = require('vinyl-source-stream'),
  buffer     = require('vinyl-buffer'),
  browser    = require('browser-sync'),
  sass       = require('gulp-sass'),
  clean      = require('gulp-clean'),
  uglify     = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps')
;

/*
* Delete javascript from the build directory
*/
gulp.task('clean-scripts', function() {
  gulp.src('build/**/*.js', {read: false})
    .pipe(clean());
});

/*
* Delete CSS from the build directory
*/
gulp.task('clean-css', function() {
  gulp.src('build/**/*.css', {read: false})
    .pipe(clean());
});

/*
* Delete HTML from the build directory
*/
gulp.task('clean-html', function() {
  gulp.src('build/**/*.html', {read: false})
    .pipe(clean());
});

/*
* Delete the contents of the build directory
*/
gulp.task('clean', function() {
  gulp.src('build', {read: false})
    .pipe(clean());
});

/*
 * Transpile es6 code to es5 using Babel and browserify
 */
gulp.task('transpile', ['clean-scripts'], function() {
  return browserify('source/js/main.js', { debug : true })
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'))
    .pipe(browser.stream());
});

/*
 * Copy HTML files over
 */
gulp.task('html', ['clean-html'], function() {
  return gulp.src('source/**/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browser.stream());
});

/*
 * Start a server from buid directory
 */
gulp.task('serve', function() {
  browser({
    server: {
      baseDir: './build'
    }
  });
});

/*
 * Convert SASS files to CSS
 */
gulp.task('sass', ['clean-css'], function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
});

/*
 * Watch for when JS, HTML, or SCSS files change so they can be updated
 */
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['transpile']);
  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/sass/**/*.scss', ['sass']);
});

gulp.task('build', ['html', 'sass', 'transpile']);
gulp.task('default', ['build', 'serve', 'watch']);
