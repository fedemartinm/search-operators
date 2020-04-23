const chalk = require('chalk');

function highlight(search) {
  return new Promise(function (resolve) {
    var searchString = '';
    try {
      search.tokens.forEach(function (token) {
        switch (token.type) {
          case 'EXCLUDE_WORD':
            searchString += chalk.redBright('-' + token.value + ' ');
            break;
          case 'INCLUDE_WORD':
            searchString += chalk.greenBright('+' + token.value + ' ');
            break;
          case 'EXACT_PHRASE':
            searchString += chalk.bold.whiteBright('"' + token.value + '" ');
            break;
          case 'NOT_MATCH':
            searchString +=
              chalk.whiteBright.bgBlueBright('not ' + token.value + ' ') + ' ';
            break;
          case 'MATCH':
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
