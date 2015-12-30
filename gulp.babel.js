import gulp from 'gulp'
import gutil from 'gulp-util'
import runSequence from 'run-sequence'

import './tasks/clean'
import './tasks/server'
import './tasks/copy'

if (gutil.env.prod) {
  process.env.NODE_ENV = 'production'
} else if (gutil.env.dev) {
  process.env.NODE_ENV = 'development'
}

gulp.task('dev', () => {
  runSequence('clean', 'copy', 'server')
})

gulp.task('prod', () => {
  runSequence('clean', 'copy')
})

gulp.task('default', ['dev'])
