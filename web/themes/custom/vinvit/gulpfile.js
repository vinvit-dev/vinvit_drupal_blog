const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const del = require('del');
const concat = require('gulp-concat')

const scss = () => {
    return gulp.src('./scss/**/*.scss', { sourcemaps: true})
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(postcss([ autoprefixer({ overrideBrowserslist: ['last 4 versions']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/'))
}

function reset() {
  return del('./css/', {force: true});
}

const watcher = () => {
    gulp.watch('./scss/', scss)
}

exports.default = gulp.series(reset, scss, watcher);
