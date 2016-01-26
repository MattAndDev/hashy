'use strict';

var gulp    = require('gulp');
var config  = require('../config').library;
var babel = require('gulp-babel');
var size    = require('gulp-filesize');
var uglify = require('gulp-uglify');

gulp.task('libraryJs', ['browserify'], function() {
  return gulp.src(config.jsSrc)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
