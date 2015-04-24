var gulp = require('gulp')
var babel = require('gulp-babel')
var karma = require('gulp-karma')

gulp.task('build', function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('test', ['build'], function () {
  return gulp.src('test/**/*.js', {
    read: false
  })
  .pipe(karma({
    action: 'run',
    files: ['{dist,test}/*.js'],

    // Test the common browsers
    browsers: ['PhantomJS','Firefox','Chrome'],

    // Test with mocha, but browserify tests with babelify
    // transform first, so I can use require and es6 stuff
    frameworks: ['browserify','mocha'],
    preprocessors: {
      '{dist,test}/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    }
  }))
  .once('error', function (e) {
    console.error(e.message)
  })
})

gulp.task('watch', function () {
  gulp.watch([
    'lib/**/*.js',
    'test/**/*.js'
  ], [
    'test'
  ])
})

gulp.task('default', [
  'watch'
])
