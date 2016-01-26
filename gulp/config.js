'use strict';

var dest = "./dist";
var test = "./test";
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
    src: src + "/sass/**/*.{sass,scss}",
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
    partialsGlob: "**/*.html",
    partialsSrc: src + '/html/partials/',
    src: src + "/html/*.tpl.html",
    dest: test + "/"
  },

  jslint: {
    srcJs: src + '/js/**/*.js'
  },

  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/js/*.js',
    dest: dest,
    cssDest: dest + '/css',
    jsDest: dest + '/js'
  },


  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/main.js',
      dest: dest + '/js',
      outputName: 'main.js',
      // Additional file extentions to make optional
      extensions: ['.js'],
      // list of modules to make require-able externally
      require: ['jquery']
  },{
    entries: src + '/js/main.js',
    dest: test + '/js',
    outputName: 'main.js',
    // Additional file extentions to make optional
    extensions: ['.js'],
    // list of modules to make require-able externally
    require: ['jquery']
  }
  ]
  }
};
