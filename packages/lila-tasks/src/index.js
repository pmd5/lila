import app from './app';
import * as lila from './lila';
import { registerTask } from './tasks';
import { registerConfigGenerator } from './make-config';
import entry from './entry';
import {
  correctHtml,
  replaceHtml,
  insertHtml,
  convertHtml,
  backupHtml,
  renameHtml,
  syncAll,
  saveCache,
  syncHtml,
  syncSourceMap,
  delDev,
  delBuild,
} from './built-in-tasks';

registerTask('@lila/correct-html', correctHtml);
registerTask('@lila/replace-html', replaceHtml);
registerTask('@lila/insert-html', insertHtml);
registerTask('@lila/convert-html', convertHtml);
registerTask('@lila/backup-html', backupHtml);
registerTask('@lila/rename-html', renameHtml);
registerTask('@lila/sync-all', syncAll);
registerTask('@lila/save-cache', saveCache);
registerTask('@lila/sync-html', syncHtml);
registerTask('@lila/sync-sourcemap', syncSourceMap);
registerTask('@lila/del-dev', delDev);
registerTask('@lila/del-build', delBuild);

app.lila = lila;

// below code should be executed after register built-in tasks
const configGenerator = entry(lila);

if (typeof configGenerator !== 'function')
  throw new Error('lila.js exported function should return another function');

registerConfigGenerator(configGenerator);

export default lila;