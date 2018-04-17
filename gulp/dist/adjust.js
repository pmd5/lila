
var cdnAbsolutePath = require('gulp-cdn-absolute-path');

var distData = require('./data');

module.exports = {
    /**
     * 1. add staticServerDomain
     */
    adjustHtml: (gulp) => {
        return function adjustHtml(cb) {
            if (distData.currentConfig.staticServerDomain)
                return gulp.src(distData.currentConfig.buildPaths.tmp.dir + '/**/*.html')
                    .pipe(cdnAbsolutePath({
                        asset: distData.currentConfig.basePaths.webRoot,
                        cdn: distData.currentConfig.staticServerDomain || '',
                        exts: distData.currentConfig.fileLoaderSuffixes
                    }))
                    .pipe(gulp.dest(distData.currentConfig.buildPaths.tmp.dir));
            else cb();
        }
    }
};