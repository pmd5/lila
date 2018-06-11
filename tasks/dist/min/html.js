
const htmlmin = require('gulp-htmlmin');

const logger = require('../../../util/logger');

const current = require('../current');

/**
 * Make a function.
 *
 * @param gulp
 * @returns {function}
 */
module.exports = gulp => {
    return cb => {
        logger.log('Start minimizing html files.');

        if (current.config.minHtml){
            let options = current.config.minHtmlOptions || {
                removeComments: !0,
                collapseWhitespace: !0,
                collapseBooleanAttributes: !0,
                removeEmptyAttributes: !0,
                removeScriptTypeAttributes: !0,
                removeStyleLinkTypeAttributes: !0,
                minifyJS: !1,
                minifyCSS: !0
            };

            return gulp.src(current.config.buildPaths.tmp.dir + '/**/*.html')
                .pipe(htmlmin(options))
                .pipe(gulp.dest(current.config.buildPaths.tmp.dir));
        }
        else cb();

    }
};
