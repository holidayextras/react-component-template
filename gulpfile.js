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
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var istanbul = require('gulp-jsx-coverage');

var NPM_JS = ['./src/**/*.js*'];
var NPM_STYLES = ['./src/**/*.less', './src/**/*.css'];
var DEMO_JS = ['./demo/src/**/*.js*'];
var DEMO_DEST = './demo/www/';
var NPM_DEST = './lib/';
var GH_PAGES = DEMO_DEST + '**/*';
var TESTS = ['./test/**/test*.jsx'];

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

// ----------------------------------
// --------- DEPLOY TASKS -----------
// ----------------------------------
gulp.task('publish-docs', function() {
  return gulp.src(GH_PAGES)
    .pipe(ghPages())
    .on('error', logError);
});

// ----------------------------------
// ----------- TEST TASKS -----------
// ----------------------------------
gulp.task('test', istanbul.createTask({
  src: TESTS,
  istanbul: {
    coverageVariable: 'COMPONENT_TEST_COVERAGE',
    exclude: /node_modules/
  },
  threshold: 100,
  thresholdType: 'lines',
  coverage: {
    reporters: ['text-summary']
  }
}));

// ----------------------------------
// --------- COMPOSITE TASKS --------
// ----------------------------------
gulp.task('build-all', function() {
  gulp.start('build', 'buildDemo', 'less');
});

gulp.task('start', function(cb) {
  return runSequence('build', 'buildDemo', 'less', 'connect', ['watch', 'open'], cb);
});
