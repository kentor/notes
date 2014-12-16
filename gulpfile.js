var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var livereload = require('tiny-lr');
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');
var watchify   = require('watchify');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({ port: 4070 }));
  app.use(express.static(__dirname + '/public'));
  app.listen(4069);
});

gulp.task('scripts', function() {
  watchify.args.debug = true;
  var bundler = watchify(browserify('./src/js/app.js', watchify.args));

  bundler.on('update', rebundle);
  bundler.on('log', console.error);

  function rebundle() {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/js/'));
  }

  return rebundle();
});

var LINT = [
  'src/js/**/*.js',
  '!src/js/app.js',
];
gulp.task('lint', function() {
  gulp.src(LINT)
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = livereload();
  tinylr.listen(4070);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch('public/*.html', notifyLiveReload);
  gulp.watch('public/js/app.js', notifyLiveReload);
  gulp.watch(LINT, ['lint']);
});

gulp.task('build', function() {
  return browserify('./src/js/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('css', function() {
  gulp.src('src/css/app.styl')
    .pipe(stylus({
      'include css': true,
    }))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('watch-css', ['css'], function() {
  gulp.watch('src/css/**/*.styl', ['css']);
});

gulp.task('default', ['express', 'scripts', 'lint', 'livereload',
                      'watch-css', 'watch']);
