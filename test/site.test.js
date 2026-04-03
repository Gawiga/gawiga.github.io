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
    'search.json'
  ].forEach((file) => {
    assert.ok(fs.existsSync(path.join(siteDir, file)), `expected ${file} to exist`);
  });
});

test('Home page references the main stylesheet and script bundle', () => {
  const html = readSiteFile('index.html');

  assert.match(html, /assets\/css\/main\.css/);
  assert.match(html, /assets\/js\/main\.js/);
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
