const fs = require('file-system');
const a2 = require('./archetype-util');

module.exports = function() {
  let api = {};
  fs.readdirSync(process.env.ARCH_PATH).forEach(
    file => {
      if (file.includes('-api.js')) {
        api[file.replace('-api.js', '')] = require(process.env.ARCH_PATH + '/' + file)(a2);
      }
    }
  );
  return api;
}
