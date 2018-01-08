[ ![Codeship Status for cdaringe/mock-npm-install](https://codeship.com/projects/f54aa580-578b-0133-e7da-36edf9c92862/status?branch=master)](https://codeship.com/projects/109534)

See formal docs over @ http://cdaringe.github.io/mock-npm-install/index.html

# mock-npm-install

[![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/mock-npm-install.svg)](https://greenkeeper.io/)
Install or remove a dummy package into a node_modules/ folder.  All actions are synchronous, at the moment!

## usage
```js
var mockPackage = require('mock-npm-install');
var mock1 = mockPackage.install(); //=> node_modules/mock_package_1 now exists w/ package.json
mockPackage.remove({ name: mock1.name }); //=> removes the pkg folder
```

## api

- `install(opts)`, returns package.json js obj
  - `nodeModulesDir`, defaults to the current dir's node_modules folder
  - `package`, defaults to generic package.json equivalent js object. any object added here has the generic content `default`ed on to it


- `remove(opts)`
  - `name` should correspond to folder removed in node_modules
  - `nodeModulesDir`, defaults to the current dir's node_modules folder


## todo
enable async.
