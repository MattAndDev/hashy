'use strict';

var dest = './dist';
var test = './test';
var src = './src';

module.exports = {
  destFolder: dest,
  testFolder: test,

  browserSync: {
    port: 9000,
    server: {
      // Serve up our build folder
      baseDir: test
    },
    notify: false,
    open: false
  },

  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: test + '/css',
    prefix: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ],
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },


  markup: {
    partialsGlob: '**/*.html',
    partialsSrc: src + '/html/partials/',
    src: src + '/html/*.tpl.html',
    dest: test + '/'
  },


  library: {
    jsSrc: src + '/js/hashy.js',
    dest: dest
  },

  // ============================================
  // scripts.js
  // ============================================

  scripts: {
    srcAll: src + '/js/**/*.js',
    src: src + '/js/hashy.js',
    dest: dest + '/',
    test: {
      src: src + '/js/main.js',
      dest: test + '/'
    }
  }
};
