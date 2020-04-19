export default {
  macros: {
    text: '[^\\u0020]+',
    identifier: '\\w+',
  },
  rules: [
    //Skype whitespace and non printable ascii
    ['\\s+', ''],
    ['[\\x00-\\x1F]+', ''],
    //['[\\x00-\\x20]+', ''],
    //['[\\7F\\x00-\\x20]+', ''],
    //Inclusion - exclusion filters.
    [
      '\\"[^\u0022]+\\"',
      "yytext = yytext.slice(1, -1); return 'EXACT_PHRASE';",
    ],
    ['\\+{text}', "yytext = yytext.slice(1);return 'INCLUDE_OP'"],
    ['-{text}', "yytext = yytext.slice(1);return 'EXCLUDE_OP'"],
    //Match filter
    [
      'not {identifier}:{identifier}',
      "var k = yytext.slice(4).split(':')[0]; if(yy.options.keys.indexOf(k)!==-1){yytext = yytext.slice(4);return 'NOT_MATCH_OP'}; return 'TEXT';",
    ],
    [
      '{identifier}:{identifier}',
      "if(yy.options.keys.indexOf(yytext.split(':')[0])!==-1)return 'MATCH_OP'; return 'TEXT';",
    ],
    //Text
    ['{text}', "return 'TEXT'"],
  ],
  options: {
    'case-insensitive': true,
  },
};
