fincludeWord = function includeWord(value) {
  process.includedWords.push(value);
};

excludeWord = function excludeWord(value) {
  process.excludedWords.push(value);
};

exactWord = function exactWord(value) {
  process.exactWords.push(value);
};

match = function match(key, value, match) {
  let matchString;
  switch (key) {
    case 'from':
      if (match) process.from.push(value);
      else process.notFrom.push(value);
      break;
    case 'in':
      if (match) process.in.push(value);
      else process.notIn.push(value);
      break;
    case 'has':
      if (match) process.having.push(value);
      else process.notHaving.push(value);
      break;
  }
};

yyparseEvents = function (yyparser) {
  console.log('attaching events');
  yyparser.onParseBegin = (string) => {
    process.from = [];
    process.notFrom = [];
    process.having = [];
    process.notHaving = [];
    process.in = [];
    process.notIn = [];
    process.includedWords = [];
    process.exactWords = [];
    process.excludedWords = [];
    //console.log('Custom hook on parse begin. Parsing:', string, '\\n');
  };

  yyparser.onParseEnd = (value) => {
    /*if(process.from.length)
        console.log('Find from user:',process.from);
        if(process.notFrom.length)
        console.log('Exclude from user:',process.notFrom);
        if(process.in.length)
        console.log('Find in forum:',process.in);
        if(process.notIn.length)
        console.log('Exclude find in',process.notIn);
        if(process.having.length)
        console.log('With tags:',process.having);
        if(process.notHaving.length)
        console.log('Without tags:',process.notHaving);
        if(process.exactWords.length)
        console.log('with exact words:',process.exactWords);
        if(process.includedWords.length)
        console.log('with aprox. words:',process.includedWords);
        if(process.excludedWords.length)
        console.log('without words:',process.excludedWords);
        //console.log('Custom hook on parse end. Parsed:\\n\\n', value, '\\n');*/
  };
};
