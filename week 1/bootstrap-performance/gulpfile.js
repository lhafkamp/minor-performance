const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');

const paths = {
  js: [
    'src/assets/js/vendor/jquery.min.js',
    'src/dist/js/bootstrap.js',
    'src/assets/js/docs.min.js',
    'src/assets/js/ie10-viewport-bug-workaround.js'
  ],
  css: [
    'src/dist/css/fonts.css',
    'src/dist/css/bootstrap.css',
    'src/assets/css/src/docs.css'
  ]
}

gulp.task('js', () => {
  gulp.src(paths.js)
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/dist/js'));
})

gulp.task('css', () => {
  return gulp.src(paths.css)
  .pipe(concatCss("style.css"))
  .pipe(cleanCSS({
    compatibility: 'ie8'
  }))
  .pipe(gulp.dest('src/dist/css/'));
});