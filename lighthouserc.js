module.exports = {
  serverCommand: 'bundle exec jekyll serve --host 127.0.0.1 --port 4000',
  serverReadyPattern: 'Server address:',
  urls: [
    'http://127.0.0.1:4000/',
    'http://127.0.0.1:4000/blog/',
    'http://127.0.0.1:4000/blog/drex'
  ],
  numberOfRuns: 1,
  chromeFlags: ['--no-sandbox'],
  assertions: {
    'categories:performance': { level: 'warn', minScore: 0.75 },
    'largest-contentful-paint': { level: 'warn', maxNumericValue: 4000 },
    'cumulative-layout-shift': { level: 'error', maxNumericValue: 0.1 },
    'total-byte-weight': { level: 'error', maxNumericValue: 750000 }
  },
  outputDir: './lighthouse-reports'
};