'use strict';
/* Notes:
   - gulp/tasks/browserSync.js watches and reloads compiled files
   - watchers are made using `gulp-watch` so new files are automatically watched
*/

var gulp     = require('gulp');
var config   = require('../config');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task('watch', ['clean'], () => {

  runSequence('default', ['browserSync'])

  watch(config.scripts.srcAll, () => {
    runSequence('scripts')
  })


  watch(config.sass.src, () => {
    runSequence('sass')
  })

  watch([config.markup.src, config.markup.partialsSrc + config.markup.partialsGlob], () => {
    runSequence('markup', browserSync.reload)
  })
})
