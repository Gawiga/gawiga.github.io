const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const siteDir = path.join(rootDir, '_site');

function readSiteFile(relativePath) {
  return fs.readFileSync(path.join(siteDir, relativePath), 'utf8');
}

function listHtmlFiles(directory, files = []) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      listHtmlFiles(entryPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path.relative(siteDir, entryPath).split(path.sep).join('/'));
    }
  });
  return files;
}

test('Home page preserves its visual hierarchy and responsive entry points', () => {
  const html = readSiteFile('index.html');

  assert.match(html, /<html lang="pt-br"[^>]*>/);
  assert.match(html, /name="viewport" content="width=device-width, initial-scale=1"/);
  assert.match(html, /class="header-site"/);
  assert.match(html, /class="site-title\b[^>]*>[^<]+<\/span>/);
  assert.match(html, /class="site-description\b[^>]*>[^<]+<\/span>/);
  assert.match(html, /class="icons-home"/);
  assert.match(html, /title="E-mail"/);
  assert.match(html, /title="GitHub"/);
  assert.match(html, /title="LinkedIn"/);
  assert.match(html, /class="down"[^>]+href="#scroll"/);
});

test('Navigation menu links stay on the current host', () => {
  const html = readSiteFile('index.html');

  assert.match(html, /aria-label="inicio" href="\/"/);
  assert.match(html, /aria-label="blog" href="\/blog\/"/);
  assert.match(html, /aria-label="rss" href="\/feed\.xml"/);
  assert.match(html, /aria-label="contato" href="\/#contato"/);
  assert.doesNotMatch(html, /href="https:\/\/www\.gawiga\.com\/(?:blog\/|feed\.xml|#contato)?"/);
});

test('Compiled stylesheet preserves the current visual system and breakpoints', () => {
  const css = readSiteFile('assets/css/main.css');

  assert.match(css, /\.header-site,\.header-post\{background:var\(--main-background\);height:100%/);
  assert.match(css, /--page-background:#171e1a/);
  assert.match(css, /--page-background:#f5f7f5/);
  assert.match(css, /\.header-site \.site-title\{font-size:3\.75rem/);
  assert.match(css, /@media only screen and \(min-width:37\.5rem\)\{\.header-site \.site-title\{[^}]*font-size:6\.25rem/);
  assert.match(css, /\.icons-home a\{[^}]*border-radius:50%/);
  assert.match(css, /@media only screen and \(max-width:37\.5rem\)\{\.post-item \.datetime\{/);
  assert.match(css, /@media only screen and \(min-width:37\.5rem\)\{\.header-post \.content\{[^}]*max-width:1000px/);
});

test('Every generated HTML page starts dark and includes the theme toggle', () => {
  const htmlFiles = listHtmlFiles(siteDir);

  assert.ok(htmlFiles.length > 0, 'expected generated HTML pages');
  htmlFiles.forEach((file) => {
    const html = readSiteFile(file);
    assert.match(html, /data-theme="dark"/, `${file} should default to dark mode`);
    assert.match(html, /id="theme-toggle"/, `${file} should include the theme toggle`);
    assert.match(html, /gawiga-theme/, `${file} should initialize the saved theme`);
    assert.match(html, /assets\/js\/theme\.js\?v=/, `${file} should load the theme controller`);
  });
});

test('Post pages preserve the visual hierarchy and responsive content layout', () => {
  const html = readSiteFile('blog/drex.html');

  assert.match(html, /<header class="header-post" role="banner">/);
  assert.match(html, /class="post-title"[^>]*itemprop="name"/);
  assert.match(html, /class="subtitle"/);
  assert.match(html, /class="down"[^>]+href="#scroll"/);
  assert.match(html, /class="post-content\b/);
  assert.match(html, /<article[^>]+class="post-content/);
});

test('Jekyll build generates critical public files', () => {
  [
    'index.html',
    'blog/index.html',
    'feed.xml',
    'sitemap.xml',
    'search.json',
    'assets/js/main.js',
    'assets/js/search.js',
    'assets/js/theme.js'
  ].forEach((file) => {
    assert.ok(fs.existsSync(path.join(siteDir, file)), `expected ${file} to exist`);
  });
});

test('Home page references the main stylesheet and script bundle', () => {
  const html = readSiteFile('index.html');

  assert.match(html, /href="\/assets\/css\/main\.css\?v=/);
  assert.match(html, /src="\/assets\/js\/main\.js\?v=/);
  assert.match(html, /blog-author\.webp/);
  assert.match(html, /width="350" height="351"/);
  assert.match(html, /blog-image\.jpg/);
  assert.doesNotMatch(html, /src="\/\/assets\/js\/main\.js/);
  assert.match(html, /data-search-src="\/assets\/js\/search\.js\?v=/);
});

test('Blog post links remain local and do not become protocol-relative URLs', () => {
  const blogHtml = readSiteFile('blog/index.html');

  assert.match(blogHtml, /href="\/blog\/orquestrando-agentes"/);
  assert.doesNotMatch(blogHtml, /href="\/\/blog\//);
});

test('Search implementation is excluded from the always-loaded bundle', () => {
  const mainBundle = readSiteFile('assets/js/main.js');
  const searchBundle = readSiteFile('assets/js/search.js');

  assert.doesNotMatch(mainBundle, /\.fn\.simpleJekyllSearch\s*=/);
  assert.match(searchBundle, /\.fn\.simpleJekyllSearch\s*=/);
});

test('Post pages use responsive WebP sources with dimensioned fallbacks', () => {
  const drexHtml = readSiteFile('blog/drex.html');
  const streetsHtml = readSiteFile('blog/sobre-ruas-e-afins/index.html');

  assert.match(drexHtml, /drex-360\.webp 360w/);
  assert.match(drexHtml, /src="\/assets\/img\/drex\.jpg"[^>]+width="800" height="600"/);
  assert.match(streetsHtml, /sobre-ruas-480\.webp 480w/);
  assert.match(streetsHtml, /loading="lazy" decoding="async"/);
});

test('Search index exposes the expected post metadata', () => {
  const searchIndex = JSON.parse(readSiteFile('search.json'));

  assert.ok(Array.isArray(searchIndex));
  assert.ok(searchIndex.length > 0, 'expected search index to contain posts');

  const firstPost = searchIndex[0];
  ['title', 'category', 'url', 'date'].forEach((field) => {
    assert.ok(field in firstPost, `expected field ${field} in search index entry`);
  });
});

test('Post pages render the lazy comments trigger', () => {
  const postHtml = readSiteFile('blog/drex.html');
  assert.match(postHtml, /id="load-comments"/);
});

test('Security headers template exists for compatible static hosts', () => {
  const headersFile = fs.readFileSync(path.join(rootDir, '_headers'), 'utf8');

  assert.match(headersFile, /Content-Security-Policy/);
  assert.match(headersFile, /Referrer-Policy/);
  assert.match(headersFile, /\/assets\/\*\s+Cache-Control: public, max-age=604800/);
  ['assets/css/bootstrap/bootstrap.css', 'assets/js/bootstrap/bootstrap.js', 'assets/js/bootstrap/bootstrap.js.map', 'assets/video/small.mp4'].forEach((file) => {
    assert.ok(!fs.existsSync(path.join(siteDir, file)), `expected unused ${file} to be omitted`);
  });
});
