# @iobxt/objectifiler

A handy exporter module which aims to alevate dev effort

Disclaimer: This was a quick braindump.

It iterates over files in the provided directiory and exports them as an object. You may also provide a configuration object which will be used to configure each module, provided the module has an init function.

You can use this exporter one of two ways.

drop it into your index file and it will try to export the modules in the directory provided.

if your modules need to be initialised it will call the init function of each, passing in the config you have provided. It will try to match up an object in the config with the name of the file. You can also export the module with a name variable if you want the two to be different. if you dont want to initialise each module, you can just drop it in and it will export an object with all your files.

# Usage

Given the following directory sructure;

```
src
  withinit
    nested
      withInit.js
    withInit.js
  without
    foobar
      foo.js
    bar.js
  foo.js
index.js
```

and the index.js looks like this;

```javascript
const objectifier = require("objectifier");

module.exports = objectifier(__dirname);
```

You should be able to do this

```javascript
const foo = require("./src");

const bar = foo.withInit.init({ aName: { foo: "bar" } });

bar.without.foo();
bar.without.bar();
bar.without.foobar.foo();

bar.withInit.aName.foo();
bar.withInit.nested.aName.foo();
```
