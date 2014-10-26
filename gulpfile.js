var gulp = require('gulp');

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({ port: 4070 }));
  app.use(express.static(__dirname + '/public'));
  app.listen(4069);
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
  gulp.watch('public/**/*.js', notifyLiveReload);
});

gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
