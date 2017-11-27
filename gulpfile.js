var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.build.config');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');

var paths = {

  css: 'src/**/*.css',
  distcss: 'build/src',

  html: 'src/**/*.html',
  disthtml: 'build/src/',

  parent: 'build/',

  manifest: './manifest.json',

  icons: 'icons/**/*',
  distIcons: 'build/icons'
};

gulp.task('js', function() {
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/src'));
});

/**
 * copy all css to build
 * @return {[type]} [description]
 */
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.disthtml));
})

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.distcss));
})

gulp.task('manifest', function() {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest(paths.parent));
})

gulp.task('icons', function() {
  return gulp.src(paths.icons)
    .pipe(gulp.dest(paths.distIcons));
})

gulp.task('clean', function() {

  return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('copy', ['html', 'css', 'manifest', 'icons', 'js']);

gulp.task('zip', function() {
  return gulp.src('build/**')
    .pipe(zip('dict.zip'))
    .pipe(gulp.dest('build'))
});

gulp.task('build', function() {
  runSequence('copy', 'zip');
});
