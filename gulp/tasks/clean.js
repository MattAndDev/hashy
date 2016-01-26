'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var config   = require('../config');

gulp.task('clean', function(){
  del([config.destFolder, config.testFolder]);
});
