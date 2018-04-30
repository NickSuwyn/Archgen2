const fs = require('fs');

module.exports = {

  DESCRIPTOR_PATH: './descriptor.json',

  //might not need
  splitByLine: function(fileString) {
    return fileString.split(/\r?\n/);
  },

  //might not need
  buildFileFromArray: function(array) {
    return array.join('\n');
  },

  getArchetypeDir: function(archetype) {
    const directory = process.env.ARCH_PATH + '/' + archetype;
    if (fs.existsSync(directory)) {
      return directory;
    } else {
      throw new Error(`Unable to locate given archetype. Make sure your ARCH_PATH environment variable is set and the ${archetype} archetype exists in that directory.
        ARCH_PATH: ${process.env.ARCH_PATH}
        Archetype: ${archetype}`);
    }
  },

  evaluateJS: function(str) {
    return eval("(function() {" + str + "})()");
  }
}
