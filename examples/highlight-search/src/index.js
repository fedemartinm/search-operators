const parser = require('../../../dist/search-operators');
const readline = require('readline');
const figlet = require('figlet');
const chalk = require('chalk');
const highlight = require('./highlight');
const search = require('./search');

//welcome
console.log(
  chalk.yellow(figlet.textSync('search', { horizontalLayout: 'full' }))
);

//infinitely readline
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
(function recursiveAsyncReadLine() {
  rl.question('Search: ', function (line) {
    if (line === 'exit') {
      return rl.close();
    } else {
      parseSearch(line)
        .then(highlight)
        .then(search)
        .finally(function () {
          recursiveAsyncReadLine();
        });
    }
  });
})();

const options = {
  keys: ['in', 'from'],
};

//parse input
function parseSearch(line) {
  return new Promise(function (resolve) {
    try {
      const result = parser.parse(line, options);
      resolve({ result, tokens: parser.tokens });
    } catch {
      resolve(line.split(' '));
    }
  });
}
