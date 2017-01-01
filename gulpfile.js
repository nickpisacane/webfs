const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const notify_ = require('gulp-notify')
const webpack = require('webpack-stream')

const babelOptions = JSON.parse(fs.readFileSync('.babelrc', 'utf-8'))
console.log('babel options: ', babelOptions)
const notify = msg => notify_({
  title: 'WebFS',
  message: msg,
  icon: false,
  onLast: true
})

gulp.task('compile', () => {
  return gulp.src('src/**/*.js')
    .pipe(cache('src'))
    .pipe(babel(babelOptions))
    .pipe(gulp.dest('build'))
    .pipe(notify('Compiled SRC'))
})


gulp.task('build-client', () => {
  return gulp.src('src/client/index.js')
    .pipe(webpack({
      quiet: true,
      devtool: 'inline-source-map',
      output: {
        //path: path.join(__dirname, 'static'),
        filename: '_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]
      },
      plugins: [
        new webpack.webpack.DefinePlugin({
          NODE_ENV: JSON.stringify('development')
        })
      ]
    }))
    .pipe(gulp.dest('static'))
    .pipe(notify('Built client'))
})

gulp.task('default', [
  'compile',
  'build-client'
])

gulp.task('watch-client', () => {
  return gulp.watch('src/+(routes|client)/**/*.js', ['compile', 'build-client'])
})
gulp.task('watch-server', () => {
  return gulp.watch('src/server/**/*.js', ['compile'])
})

gulp.task('watch', ['watch-client', 'watch-server'])
