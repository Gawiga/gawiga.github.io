const { src, dest, series } = require('gulp');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const terser = require('gulp-terser');
const jeet = require('jeet');
const rupture = require('rupture');
const koutoSwiss = require('kouto-swiss');
const prefixer = require('autoprefixer-stylus');

function styles() {
  return src('src/styl/main.styl')
    .pipe(stylus({
      use: [koutoSwiss(), prefixer(), jeet(), rupture()],
      compress: true
    }))
    .pipe(dest('assets/css'));
}

function mainScripts() {
  return src(['src/js/azepto.js', 'src/js/scroll.js', 'src/js/zmain.js'])
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(dest('assets/js'));
}

function searchScripts() {
  return src('src/js/simpleJekyllSearch.js')
    .pipe(concat('search.js'))
    .pipe(terser())
    .pipe(dest('assets/js'));
}

exports.build = series(styles, mainScripts, searchScripts);
