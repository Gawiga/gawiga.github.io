const preset = process.env.LIGHTHOUSE_PRESET || 'mobile';

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'bundle exec jekyll serve --host 127.0.0.1 --port 4000',
      startServerReadyPattern: 'Server address:',
      url: [
        'http://127.0.0.1:4000/',
        'http://127.0.0.1:4000/blog/',
        'http://127.0.0.1:4000/blog/drex'
      ],
      numberOfRuns: 1,
      settings: {
        ...(preset === 'desktop' ? { preset: 'desktop' } : {}),
        chromeFlags: '--no-sandbox'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.75 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-byte-weight': ['error', { maxNumericValue: 750000 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    }
  }
};