const forEach = require('lodash/forEach');
const fs = require('fs');
const fse = require('fs-extra');

const logger = require('../../../util/logger');

const projectConfig = require('../../../project_config');

/**
 * Rename html after building.
 *
 * @param cb
 */
module.exports = function renameHtml(cb) {
  logger.log('Renaming html files.', { prefix: !0, preLn: !0, postLn: !0 });

  if (!projectConfig.renameHtml) {
    return cb();
  }

  forEach(projectConfig.renameHtml, (targetModule, sourceModule) => {
    const targetPath = `${projectConfig.buildPaths.dist.html}/${targetModule}.html`;
    const sourcePath = `${projectConfig.buildPaths.dist.html}/${sourceModule}.html`;

    if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
      fse.moveSync(sourcePath, targetPath, { overwrite: !0 });
    }

    // html to jsp, php ...
    if (projectConfig.htmlExtension) {
      const targetPath2 = `${projectConfig.buildPaths.dist.html}/${targetModule}.${projectConfig.htmlExtension}`;
      const sourcePath2 = `${projectConfig.buildPaths.dist.html}/${sourceModule}.${projectConfig.htmlExtension}`;

      if (fs.existsSync(sourcePath2) && !fs.existsSync(targetPath2)) {
        fse.moveSync(sourcePath2, targetPath2, { overwrite: !0 });
      }
    }
  });

  cb();
};