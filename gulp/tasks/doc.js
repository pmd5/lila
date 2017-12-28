
'use strict';

var fs = require('fs');
var fsExtra = require('fs-extra');
var del = require('del');
var jsdoc = require('gulp-jsdoc3');

var projectConfig = require('../../project_config');

module.exports = (gulp) => {

    var copyFiles = (cb) => {

        // copy src/js
        fsExtra.copySync(projectConfig.buildPaths.src.js, projectConfig.buildPaths.doc_tmp.dir);

        // delete directories defined in projectConfig.doc.exclude
        if (projectConfig.doc && projectConfig.doc.exclude) {
            projectConfig.doc.exclude.forEach((dir) => {
                var dirPath = projectConfig.buildPaths.doc_tmp.dir + '/' + dir;
                fs.existsSync(dirPath) && fsExtra.removeSync(dirPath);
            });
        }
        cb();
    };

    // generate documents
    var generate = (cb) => {
        gulp.src(projectConfig.docSrc, {read: false})
            .pipe(jsdoc({
                opts: {
                    destination: projectConfig.buildPaths.doc.dir
                }
            }, cb));
    };

    var deleteCopiedFiles = () => {
        // delete tmp directory
        return del([projectConfig.buildPaths.doc_tmp.dir], {force: !0});
    };

    // register task
    gulp.task('doc', gulp.series(copyFiles, generate, deleteCopiedFiles));
};
