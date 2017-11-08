const cssnext = require('postcss-cssnext');
const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const sourcemaps = require('gulp-sourcemaps');

const processors = [
  postcssImport(),
  postcssUrl({
    maxSize: 100,
    url: 'inline',
  }),
  cssnext({
    browsers: ['last 1 version'],
  }),
];

gulp.task('css', function(done) {
  return gulp
    .src('src/css/app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', done)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});

gulp.task('css:watch', ['css'], function() {
  gulp.watch('src/css/**/*', ['css']);
});

gulp.task('css:build', function() {
  return gulp
    .src('src/css/app.css')
    .pipe(postcss(processors))
    .pipe(minifycss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('public/css'));
});

const staticFiles = [
  'src/CNAME',
  'src/fonts/**/*',
  'src/images/**/*',
  'src/index.html',
];

gulp.task('static', function() {
  return gulp.src(staticFiles, { base: 'src/' }).pipe(gulp.dest('public'));
});

gulp.task('static:watch', ['static'], function() {
  gulp.watch(staticFiles, ['static']);
});

gulp.task('default', ['css:watch', 'static:watch']);

gulp.task('build', ['css:build', 'static']);
