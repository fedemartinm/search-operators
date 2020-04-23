var parser = require('search-operators');
const readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//infinitely readline
(function recursiveAsyncReadLine() {
  rl.question('Search: ', function (line) {
    if (line === 'exit') return rl.close();
    else parseSearch(line);
    recursiveAsyncReadLine();
  });
})();

//parse input
function parseSearch(line) {
  try {
    console.log(parser.parse(line));
    //uncomment to see tokens
    //console.log('Tokens', parser.tokens);
  } catch (ex) {
    //this can happen
    //should consider adopting a common strategy
    console.error(ex);
    console.log({ terms: line.split(' ') });
  }
}
