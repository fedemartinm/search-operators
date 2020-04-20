const Fuse = require('fuse.js');
const database = require('./data.js');
const options = {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: true,
  useExtendedSearch: true,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  keys: ['title'],
};

function search(value) {
  var fuseSearch = '';
  //filters to fuse syntax
  if (value.filters) {
    value.filters.forEach(function (f) {
      if (f.type === 'exact') {
        fuseSearch += "'" + f.value + ' ';
      } else if (f.type === 'exclude') {
        fuseSearch += '!' + f.value + ' ';
      }
    });
  }
  //add terms
  if (value.terms) {
    fuseSearch += value.terms.join(' ');
  }

  try {
    var res = new Fuse(database, options).search(fuseSearch, { limit: 4 });
    res.forEach(function (result) {
      //const { forum, title } = result.item.title;
      console.log(result.item.title);
      //  const check = score < 0.1 ? '✅' : '';
      //  process.stdout.write(`[${chalk.whiteBright.bold(forum)}]${check}:\t`);
      //  exactMarker(title, process.includedWords);
    });
    console.log('');
  } catch (ex) {
    console.log('Error', ex);
  }
}

module.exports = search;
