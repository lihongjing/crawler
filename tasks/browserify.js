import gulp from 'gulp'
import gutil from 'gulp-util'
import _ from 'lodash'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import rename from 'gulp-rename'
import path from 'path'

const defaultConfig = {
  files: {
    'entry': 'src/index.react.js',
    'dest': 'public/assets/js',
  }
}

let conf

setOptions()

const TASK_NAME = 'browserify'

const task = gulp.task(TASK_NAME, (cb) => {
  browserify(conf.files.entry)
    // .add(conf.files.entry)
    .transform(babelify)
    .bundle()
    .on('error', function(e) {
      gutil.log('Browserify Error', e)
    })
    .pipe(source(conf.files.entry))
    .pipe(rename(function(pathObj){
      pathObj.dirname = path.relative('src', pathObj.dirname)
      pathObj.basename = pathObj.basename.replace('.react', '')
    }))
    .pipe(gulp.dest(conf.files.dest))
})

task.setOptions = setOptions

export default task

function setOptions (opts) {
  conf = _.merge({}, defaultConfig, opts)
}
