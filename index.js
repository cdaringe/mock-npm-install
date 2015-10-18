/**
 * mock-npm-install
 * @module mock-npm-install
 */

var fs = require('fs');
var path = require('path');
var defaults = require('lodash.defaults');
var rpkg = require('./lib/random-package.js');
var rimraf = require('rimraf');

module.exports = {

    /**
     * install mock package
     * @param {object} opts
     * @param {object=}         opts.package obj representation of package.json
     * @param {nodeModulesDir=} opts.nodeModulesDir
     * @return {object} package.json js obj rep
     */
    install: function(opts) {
        opts = opts || {};
        opts = defaults(opts, {
            nodeModulesDir: path.resolve(process.cwd(), 'node_modules'),
            package: rpkg.gen(opts.package)
        });
        fs.mkdirSync(path.resolve(opts.nodeModulesDir, opts.package.name));
        fs.writeFileSync(
            path.resolve(opts.nodeModulesDir, opts.package.name, 'package.json'),
            JSON.stringify(opts.package, null, 2)
        );
        return opts.package;
    },

    /**
     * remove mock package
     * @param {object} opts
     * @param {string}   opts.name package name to remove
     * @param {nodeModulesDir=} opts.nodeModulesDir
     */
    remove: function(opts) {
        if (!opts || !opts.name || typeof opts.name !== 'string') {
            throw new TypeError('package name option expected');
        }
        opts = defaults(opts, {
            nodeModulesDir: path.resolve(process.cwd(), 'node_modules')
        });
        rimraf.sync(path.resolve(opts.nodeModulesDir, opts.name));
    }

};
