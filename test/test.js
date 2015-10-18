var test = require('tape');
var fs = require('fs');
var path = require('path');
var modMocker = require('../index.js');
var glob = require('glob');
var rimraf = require('rimraf');

// options is optional
var packages = glob.sync('node_modules/mock_package_*');
packages.forEach(function(pkg) {
    rimraf.sync(pkg);
});

var mock1;
test('install/remove mock module', function(t) {
    var mock1Dir;
    mock1 = modMocker.install();
    mock1Dir = path.resolve(process.cwd(), 'node_modules', mock1.name);
    t.ok(fs.statSync(mock1Dir), 'mock install dir exists');
    t.ok(fs.statSync(path.resolve(mock1Dir, 'package.json')), 'mock install package.json exists');
    modMocker.remove({ name: mock1.name });
    t.throws(function() { fs.statSync(mock1Dir); }, Error, 'removes node_modules/mock_package_xyz');

    var mock2Dir;
    mock2 = modMocker.install({ nodeModulesDir: path.resolve(process.cwd(), 'test/node_modules') });
    mock2Dir = path.resolve(process.cwd(), 'test/node_modules', mock2.name);
    t.ok(fs.statSync(mock2Dir), 'mock install dir exists w/ custom node_modules path');
    t.ok(fs.statSync(path.resolve(mock2Dir, 'package.json')), 'mock install package.json exists w/ custom node_modules path');
    modMocker.remove({
        nodeModulesDir: path.resolve(process.cwd(), 'test/node_modules'),
        name: mock2.name
    });
    t.throws(function() { fs.statSync(mock2Dir); }, Error, 'removes package in custom node_modules/ path');
    t.end();
});
