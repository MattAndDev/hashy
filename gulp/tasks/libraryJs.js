'use strict';

var gulp    = require('gulp');
var config  = require('../config').library;
var babel = require('gulp-babel');
var size    = require('gulp-filesize');
var handleErrors = require('../util/handleErrors');
var uglify = require('gulp-uglify');

gulp.task('libraryJs', ['browserify'], function() {
  return gulp.src(config.jsSrc)
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', handleErrors)
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
