const fs = require('fs')
const gulp = require('gulp')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const notify_ = require('gulp-notify')
const webpack = require('webpack-stream')
const del = require('del')
const nodemon = require('gulp-nodemon')

const babelOptions = JSON.parse(fs.readFileSync('.babelrc', 'utf-8'))
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
    .on('error', function (err) {
      console.error(err.stack)
      this.emit('end')
    })
    .pipe(gulp.dest('build'))
    .pipe(notify('Compiled SRC'))
})

gulp.task('build-client', () => {
  return gulp.src('src/client/index.js')
    .pipe(webpack({
      quiet: true,
      devtool: 'inline-source-map',
      output: {
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

gulp.task('clean', () => {
  return del('build')
})

gulp.task('default', [
  'clean',
  'compile',
  'build-client'
])

gulp.task('watch-compile', () => {
  return gulp.watch('src/**/*.js', ['clean', 'compile'])
})

gulp.task('watch-build-client', () => {
  return gulp.watch('src/!(server)/**/*.js', ['build-client'])
})

gulp.task('watch', ['default', 'watch-compile', 'watch-build-client'])

gulp.task('dev', ['build-client'], () => {
  return nodemon({
    script: './scripts/dev.js',
    exec: './node_modules/.bin/babel-node',
    tasks: ['build-client'],
    watch: 'src',
    env: {
      NODE_ENV: 'development'
    }
  })
})
