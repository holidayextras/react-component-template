'use strict';

var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var open = require('gulp-open');
var less = require('gulp-less');
var runSequence = require('run-sequence');

var NPM_JS = ['./src/**/*.js*'];
var NPM_STYLES = ['./src/**/*.less', './src/**/*.css'];
var DEMO_JS = ['./demo/src/**/*.js*'];
var DEMO_DEST = './demo/www/';
var NPM_DEST = './lib/';

function logError(error) {
  var errorString = error.toString();
  notify.onError({
    title: 'Build Error',
    message: errorString
  })(error);
  console.log(errorString);
  this.emit('end');
}

gulp.task('build', function() {
  return gulp.src(NPM_JS)
  .pipe(babel())
  .on('error', logError)
  .pipe(gulp.dest(NPM_DEST));
});

gulp.task('less', function() {
  return gulp.src(NPM_STYLES)
  .pipe(less())
  .on('error', logError)
  .pipe(gulp.dest(NPM_DEST))
  .pipe(gulp.dest(DEMO_DEST))
  .pipe(connect.reload());
});

gulp.task('buildDemo', function() {
  return gulp.src(DEMO_JS)
  .pipe(babel())
  .on('error', logError)
  .pipe(browserify({
    global: true,
    debug: true
  }))
  .on('error', logError)
  .pipe(uglify())
  .on('error', logError)
  .pipe(gulp.dest(DEMO_DEST))
  .pipe(connect.reload());
});

// ---------------------------------
// --------- WATCH TASKS -----------
// ---------------------------------
gulp.task('watch', function() {
  watch(NPM_JS, function() {
    gulp.start('build');
    gulp.start('buildDemo');
  });

  watch(NPM_STYLES, function() {
    gulp.start('less');
  });

  watch(DEMO_JS, function() {
    gulp.start('buildDemo');
  });
});

// ----------------------------------
// --------- SERVER TASKS -----------
// ----------------------------------

gulp.task('connect', function() {
  return connect.server({
    root: path.resolve('./demo/www/'),
    livereload: true,
    port: 8090
  });
});

gulp.task('open', function() {
  return gulp.src(__filename)
    .pipe(open({
      uri: 'http://localhost:8090/',
      app: 'google chrome'
    }));
});

gulp.task('start', function(cb) {
  return runSequence('build', 'buildDemo', 'connect', ['watch', 'open'], cb);
});
