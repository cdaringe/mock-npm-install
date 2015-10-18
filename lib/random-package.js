var defaults = require('lodash.defaults');
module.exports = {
    _randPkgCount: 0,
    _getRandPkgNum: function() { ++this._randPkgCount; return this._randPkgCount; },

    gen: function(pkg) {
        pkg = pkg || {};
        defaults(pkg, {
            name: 'mock_package_' + this._getRandPkgNum(),
            version: '1.0.0',
            description: 'mock package',
            main: "mockpackage.js",
            scripts: {
                test: "npm test"
            },
            keywords: [ 'mock-package' ],
            author: 'mock-auth',
            license: 'MIT',
         });
         return pkg;
    }
};
