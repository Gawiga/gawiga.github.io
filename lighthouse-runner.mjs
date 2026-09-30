import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const config = require('./lighthouserc.js');
const preset = process.env.LIGHTHOUSE_PRESET || 'mobile';
const outputDir = path.resolve(config.outputDir);
const lighthouseCli = fileURLToPath(new URL('./node_modules/lighthouse/cli/index.js', import.meta.url));

function waitForServer(server) {
  return new Promise((resolve, reject) => {
    let output = '';
    const readyPattern = new RegExp(config.serverReadyPattern);
    const timeout = setTimeout(() => reject(new Error('Timed out waiting for Jekyll server.')), 60000);

    server.stdout.on('data', (chunk) => {
      const text = chunk.toString();
      process.stdout.write(text);
      output += text;
      if (readyPattern.test(output)) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.once('close', (code) => {
      clearTimeout(timeout);
      reject(new Error(`Jekyll server exited before becoming ready (${code}).`));
    });
  });
}

function runLighthouse(url, reportPath) {
  const args = [
    lighthouseCli,
    url,
    '--output=json',
    `--output-path=${reportPath}`,
    `--chrome-flags=${config.chromeFlags.join(' ')}`,
    '--no-enable-error-reporting'
  ];
  if (preset === 'desktop') args.push('--preset=desktop');

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      stdio: 'inherit',
      env: { ...process.env, TMPDIR: '/tmp', TMP: '/tmp', TEMP: '/tmp' }
    });
    child.once('error', reject);
    child.once('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Lighthouse exited with code ${code} for ${url}.`));
    });
  });
}

function reportAssertions(lhr, url) {
  let failures = 0;
  for (const [id, assertion] of Object.entries(config.assertions)) {
    let actual;
    let condition;
    if (id === 'categories:performance') {
      actual = lhr.categories.performance?.score;
      condition = actual === null || actual === undefined || actual < assertion.minScore;
    } else {
      actual = lhr.audits[id]?.numericValue;
      condition = actual === null || actual === undefined || actual > assertion.maxNumericValue;
    }

    if (condition) {
      const message = `[${assertion.level}] ${url}: ${id}=${actual}; threshold=${assertion.minScore ?? assertion.maxNumericValue}`;
      console[assertion.level === 'error' ? 'error' : 'warn'](message);
      if (assertion.level === 'error') failures += 1;
    }
  }
  return failures;
}

function stopServer(server) {
  if (!server?.pid) return;
  try {
    if (process.platform === 'win32') server.kill('SIGTERM');
    else process.kill(-server.pid, 'SIGTERM');
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}

let server;
try {
  await mkdir(outputDir, { recursive: true });
  server = spawn(config.serverCommand, {
    shell: true,
    detached: process.platform !== 'win32',
    stdio: ['ignore', 'pipe', 'inherit']
  });
  await waitForServer(server);

  let failures = 0;
  for (const url of config.urls) {
    for (let run = 0; run < config.numberOfRuns; run += 1) {
      const pathname = new URL(url).pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home';
      const reportPath = path.join(outputDir, `${pathname}-${preset}-${run + 1}.json`);
      await runLighthouse(url, reportPath);
      const lhr = require(reportPath);
      failures += reportAssertions(lhr, url);
    }
  }
  if (failures > 0) process.exitCode = 1;
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  stopServer(server);
}