module.exports = function (config) {
  config.set({
    browsers: [
      'PhantomJS',
      'Firefox',
      'Chrome'
    ],

    frameworks: [
      'browserify',
      'mocha'
    ],

    preprocessors: {
      '{dist,test}/*.js': [
        'browserify'
      ]
    },

    files: [
      'dist/index.js',
      'test/*.js'
    ],

    browserify: {
      debug: true,
      transform: [
        "babelify"
      ]
    },
  })
}
