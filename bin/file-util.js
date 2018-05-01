const fs = require('fs');
const a2 = require('./archetype-util');

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
  },

  printSuccess: function() {
    console.log(
      `.222222\\...222222\\.......................222222\\..............................................................
22..__22\\.22..__22\\.....................22..__22\\.............................................................
22./..22.|\\__/..22.|....................22./..\\__|22\\...22\\..2222222\\..2222222\\..222222\\...2222222\\..2222222\\.
22222222.|.222222..|......222222\\.......\\222222\\..22.|..22.|22.._____|22.._____|22..__22\\.22.._____|22.._____|
22..__22.|22..____/.......\\______|.......\\____22\\.22.|..22.|22./......22./......22222222.|\\222222\\..\\222222\\..
22.|..22.|22.|..........................22\\...22.|22.|..22.|22.|......22.|......22...____|.\\____22\\..\\____22\\.
22.|..22.|22222222\\.....................\\222222..|\\222222..|\\2222222\\.\\2222222\\.\\2222222\\.2222222..|2222222..|
\\__|..\\__|\\________|.....................\\______/..\\______/..\\_______|.\\_______|.\\_______|\\_______/.\\_______/.
..............................................................................................................`
    );
  }
}
