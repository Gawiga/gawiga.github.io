module.exports = {
  serverCommand: 'bundle exec jekyll serve --host localhost --port 4000',
  serverReadyPattern: 'Server address:',
  urls: [
    'http://localhost:4000/',
    'http://localhost:4000/blog/',
    'http://localhost:4000/blog/drex'
  ],
  numberOfRuns: 1,
  chromeFlags: ['--headless=new', '--no-sandbox'],
  assertions: {
    'categories:performance': { level: 'warn', minScore: 0.75 },
    'largest-contentful-paint': { level: 'warn', maxNumericValue: 4000 },
    'cumulative-layout-shift': { level: 'error', maxNumericValue: 0.1 },
    'total-byte-weight': { level: 'error', maxNumericValue: 750000 }
  },
  outputDir: './lighthouse-reports'
};