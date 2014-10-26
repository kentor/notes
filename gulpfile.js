var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
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
  var bundler = watchify(browserify('./public/js/main.js', watchify.args));

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

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
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
});

gulp.task('default', ['express', 'scripts', 'livereload', 'watch'], function() {

});
