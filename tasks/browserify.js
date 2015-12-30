import gulp from 'gulp'
import _ from 'lodash'

const defaultConfig = {
  src: {
    'entry': 'src/index.react.js',
    'dest': 'public/assets/js',
    'options': {
      'external': vendors
    }
  }
}

let conf

setOptions()

const TASK_NAME = 'browserify'

const task = gulp.task(TASK_NAME, (cb) => {
  gulp.src(conf.src.entry)
})

task.setOptions = setOptions

export default task

function setOptions (opts) {
  conf = _.merge({}, defaultConfig, opts)
}
