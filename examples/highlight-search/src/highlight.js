const chalk = require('chalk');

function highlight(search) {
  return new Promise(function (resolve) {
    var searchString = '';
    try {
      search.tokens.forEach(function (token) {
        switch (token.type) {
          case 'EXCLUDE_OP':
            searchString += chalk.redBright('-' + token.value + ' ');
            break;
          case 'INCLUDE_OP':
            searchString += chalk.greenBright('+' + token.value + ' ');
            break;
          case 'EXACT_PHRASE':
            searchString += chalk.bold.whiteBright('"' + token.value + '" ');
            break;
          case 'MATCH_OP':
            searchString +=
              chalk.whiteBright.bgBlueBright(' ' + token.value + ' ') + ' ';
            break;
        }
      });
      //Write
      if (search.result.terms && search.result.terms.length) {
        searchString += search.result.terms.join(' ');
      }
      console.log('Searching:', searchString);
    } catch {
      /*nothing happens */
    }
    resolve(search.result);
  });
}

module.exports = highlight;
