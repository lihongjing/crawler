import gulp from 'gulp'
import newer from 'gulp-newer'
import _ from 'lodash'
import mergeSteam from 'merge-stream'

const defaultConfig = {
  'files': [
    {
      'src': 'src/index.html',
      'dest': 'public/'
    },
    {
      'src': 'src/vendor/css/*.*',
      'dest': 'public/assets/css/'
    }
  ]
}

let conf

setOptions() // init

const TASK_NAME = 'copy'
const task = gulp.task(TASK_NAME, function () {

  function bundleThis (fileConf = {}) {

    function bundle () {
      return gulp.src(fileConf.src)
        .pipe(newer(fileConf.dest))
        .pipe(gulp.dest(fileConf.dest))
    }

    // if (watcher.isWatching()) {
    //   gulp.watch(fileConf.src, function () {
    //     bundle()
    //   })
    // }

    return bundle()
  }

  return mergeSteam.apply(gulp, _.map(conf.files, bundleThis))

})

task.setOptions = setOptions

export default task

function setOptions (opts) {
  conf = _.merge({}, defaultConfig, opts)
}
