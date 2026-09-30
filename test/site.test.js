const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const siteDir = path.join(rootDir, '_site');

function readSiteFile(relativePath) {
  return fs.readFileSync(path.join(siteDir, relativePath), 'utf8');
}

test('Jekyll build generates critical public files', () => {
  [
    'index.html',
    'blog/index.html',
    'feed.xml',
    'sitemap.xml',
    'search.json',
    'assets/js/main.js',
    'assets/js/search.js'
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

test('Search implementation is excluded from the always-loaded bundle', () => {
  const mainBundle = readSiteFile('assets/js/main.js');
  const searchBundle = readSiteFile('assets/js/search.js');

  assert.doesNotMatch(mainBundle, /simpleJekyllSearch/);
  assert.match(searchBundle, /simpleJekyllSearch/);
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
