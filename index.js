const fs = require("fs");
const path = require("path");

const IGNORE_DEFAULT = "index.js";

/**
 * Recursively builds the provided directory as an object.
 * @param {*} there the abs path of the directory thats being exported.
 * @param {*} ignore any files/dirs to be ignored from exporting.
 * @returns hopefully, an object.
 */
module.exports = (there, ignore = []) => {
  const filterer = (file) => ![IGNORE_DEFAULT, ...ignore].includes(file);

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
        // TODO: use the path to assign the config
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
