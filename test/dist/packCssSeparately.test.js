const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const dotLilaDir = path.join(__dirname, 'demo/.lila');
const distDir = path.join(__dirname, 'demo/project/dist');

describe('dist packCssSeparately', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(dotLilaDir)) {
      fse.removeSync(dotLilaDir);
    }
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
  });
  afterAll(() => {
    if (fs.existsSync(dotLilaDir)) {
      fse.removeSync(dotLilaDir);
    }
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
  });

  test('dist: packCssSeparately', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, { local: 'packCssSeparately' }),
    });

    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Pack source codes and static files into production successfully.');
      // 4 files: png, ico, js, html, css
      expect(filesCount(distDir)).toBe(5);
      done();
    });
  });
});
