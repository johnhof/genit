module.exports = require('./helpers').defaults(
  require('./synchronous'),
  require('./asynchronous'),
  require('./helpers')
);
console.log(Object.keys(module.exports))
