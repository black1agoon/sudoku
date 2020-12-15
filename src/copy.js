const {series, src, dest, watch} = require('gulp')
const gulp = require('gulp')
function webpack(cb) {
  cb()
}

function less(cb) {
  cb()
}

function doWatch(cb) {
  cb()
}

// 转译 javascript
webpack(() => {
  const webpack = require('webpack-stream')
  const config = require('./webpack.config.js')
  src('./js/**/*.js')
    .pipe(webpack(config))
    .pipe(dest('../www/js'))
})


// 编译 less -> css
less(() => {
  const less = require('gulp-less')
  src('./less/*.less')
    .pipe(less())
    .pipe(dest('../www/css'))
})

doWatch(() => {
  watch('less/**/*.less', () => {
    const less = require('gulp-less')
    src('./less/*.less')
      .pipe(less())
      .pipe(dest('../www/css'))
  })
  watch('js/**/*.js', () => {
    const webpack = require('webpack-stream')
    const config = require('./webpack.config.js')
    src('./js/**/*.js')
      .pipe(webpack(config))
      .pipe(dest('../www/js'))
  })
})

exports.default = series(webpack, less, doWatch)
