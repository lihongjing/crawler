import _ from 'lodash'
import gulp from 'gulp'
import browserSync from 'browser-sync'
import gutil from 'gulp-util'

const defaultConfig = {
  'src': [
    './public/{,**/}*.*'
  ],
  'options': {
    server: {
      baseDir: './public',
      index: 'index.html',
    },
    ui: {
      port: 9999
    }
  }
}

let conf

setOptions() // init

const TASK_NAME = 'server'

const task = gulp.task(TASK_NAME, function () {
  browserSync(conf.options)
})

task.setOptions = setOptions

export default task

function setOptions (opts) {
  conf = _.merge({}, defaultConfig, opts)
}
