const fs = require("fs");
const path = require("path");

module.exports = (there, ignore = ["index.js", "utils"]) => {
  const filterer = (file) => !ignore.includes(file);

  const exporter = (config, directory = there) => {
    const dir = fs.readdirSync(directory).filter(filterer);
    return dir.reduce((acc, file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        return {
          [path.basename(filePath)]: exporter(config, filePath),
          ...acc,
        };
      } else {
        const mod = require(filePath);
        const exportName = mod.name || path.basename(file, ".js");
        if (mod.init && !config) {
          return exporter;
        }
        // use the path to assign the config
        // e.g. if file exists under nested/foo
        // it should look for config under that file
        // also need to figure out how to export functions
        // even if corresponding config doesnt exist at all.
        const moduleConfig = config && config[mod.name || exportName];
        return {
          [exportName]: mod.init ? mod.init(moduleConfig) : mod,
          ...acc,
        };
      }
    }, {});
  };

  exporter.init = (config) => {
    return exporter(config);
  };

  return exporter();
};
