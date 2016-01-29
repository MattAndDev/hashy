'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config   = require('../config').jslint;

gulp.task('eslint', function(){
  return gulp.src(config.srcJs)
    .pipe(eslint())
    .pipe(eslint.format());
});