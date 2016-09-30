'use strict';

import gulp from 'gulp'
import webpack from 'webpack-stream'
import handleErrors from '../util/handleErrors'
import config from '../config'
import uglify from 'gulp-uglify'
import webpackConfig from '../.webpack.config.js'
import runSequence from 'run-sequence'

gulp.task('scripts', () => {
  runSequence('scripts_test', 'scripts_dist')
})

// for tests
gulp.task('scripts_test', () => {
  return gulp.src(config.scripts.test.src)
    .pipe(webpack(webpackConfig.test))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.scripts.test.dest))
})

// for production
gulp.task('scripts_dist', () => {
  return gulp.src(config.scripts.src)
    .pipe(webpack(webpackConfig.dist))
    .on('error', handleErrors)
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest))
})
