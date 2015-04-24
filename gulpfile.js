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
    configFile: 'karma.conf.js',
    action: 'run'
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
