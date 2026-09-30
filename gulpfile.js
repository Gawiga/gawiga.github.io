const { src, dest, series } = require('gulp');
const fs = require('node:fs/promises');
const path = require('node:path');
const concat = require('gulp-concat');
const stylus = require('stylus');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const jeet = require('jeet');
const rupture = require('rupture');

async function styles() {
  const sourcePath = path.join(__dirname, 'src/styl/main.styl');
  const outputPath = path.join(__dirname, 'assets/css/main.css');
  const source = await fs.readFile(sourcePath, 'utf8');
  const compiled = await new Promise((resolve, reject) => {
    stylus(source)
      .set('filename', sourcePath)
      .set('compress', true)
      .use(jeet())
      .use(rupture())
      .render((error, css) => error ? reject(error) : resolve(css));
  });
  const prefixed = await postcss([postcssImport(), autoprefixer()]).process(compiled, {
    from: sourcePath,
    to: outputPath
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, prefixed.css);
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

function themeScripts() {
  return src('src/js/theme.js')
    .pipe(terser())
    .pipe(dest('assets/js'));
}

exports.build = series(styles, mainScripts, searchScripts, themeScripts);
