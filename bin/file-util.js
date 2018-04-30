const fs = require('fs');

module.exports = {

  DESCRIPTOR_PATH: './descriptor.json',

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

  evaluateJS: function(str, desc, entity) {
    return eval("(function() {" + str + "})()");
  },

  createOuputFileObject: function(file) {
    file = file.split('\n');
    const url = file.splice(0, 1)[0];
    file = file.join('\n');
    return { url: url.replace('\r',''), contents: file};
  }
}
