
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var rd = require('rd');
var pathUtil = require('../../util/path');
var fillModuleFields = require('../../util/fill_module_fields');

// comma match
var commaMarkRegExp = /,/;
// asterisk match
var asteriskMarkRegExp = /\*/;

/**
 * get modules of a asterisk module
 *
 * example: getModules('test/*', config) = ['test/index', 'test/index2', 'test/index/index', ...]
 *
 * @param module
 * @param config
 * @returns {*}
 */
var getModules = (module, config) => {
    if (!asteriskMarkRegExp.test(module)) return [module];

    var dir;
    var modules = [];

    // all module
    if (module == '*') dir = config.buildPaths.dev.html;
    // test/*
    else if (module.slice(-2) == '/*') dir = config.buildPaths.dev.html + '/' + module.slice(0, -2);
    // other
    else throw new Error('can not resolve module ' + module);

    // get all modules
    rd.eachFileFilterSync(dir, (file) => {
        var index = path.relative(config.buildPaths.dev.html, file);
        index.slice(-5) == '.html' && modules.push(pathUtil.replaceBackSlash(index));
    });

    return modules;
};

module.exports = (config) => {
    var module = config.module;
    var hasCommaMark = commaMarkRegExp.test(module);
    var hasAsteriskMark = asteriskMarkRegExp.test(module);

    config.multiModules = !1;
    config.processingData.moduleIndex = 0;
    config.modules = [];

    // single module, no comma, no asterisk
    if (!hasCommaMark && !hasAsteriskMark) {
        config.modules.push(module);
        fillModuleFields(config);

        return;
    }

    /**
     * module array
     *
     * example: ['test/index', 'test2/*']
     *
     * @type {Array}
     */
    var modules = [];
    /**
     * formatted module array(make all asterisk module to real module)
     *
     * example: ['test/index', 'test2/index', 'test2/index2', ...]
     *
     * @type {Array}
     */
    var formattedModules = [];
    /**
     * modules after removing module which be mapped
     *
     * @type {Array}
     */
    var modulesWithoutMappedFile = [];

    // handle comma
    if (hasCommaMark) modules = module.split(',');
    else modules = [module];


    modules.forEach((item) => {
        formattedModules = _.concat(formattedModules, getModules(item, config));
    });
    formattedModules.forEach((item) => {
        config.processingData.mappedFiles.indexOf(item) === -1 && modulesWithoutMappedFile.push(
            item.slice(-5) == '.html' ? item.slice(0, -5) : item
        );
    });

    config.modules = modulesWithoutMappedFile;
    config.multiModules = !0;
    config.module = config.modules[config.processingData.moduleIndex];
    fillModuleFields(config);
};