export default {
  rules: [
    //Skype whitespace and non printable ascii
    ['\\s+', ''],
    ['[\\x00-\\x1F]+', ''],
    //Inclusion - exclusion filters.
    ['\\"[^\\"]*\\"', "yytext = yytext.slice(1, -1); return 'EXACT_PHRASE';"],
    ['-\\w+', "yytext = yytext.slice(1);return 'EXCLUDE_OP'"],
    ['\\+\\w+', "yytext = yytext.slice(1);return 'INCLUDE_OP'"],
    //Match filter
    ['not', "return 'NOT_OP'"],
    [
      '\\w+:\\w+',
      "if(yy.options.keys.indexOf(yytext.split(':')[0])!==-1)return 'MATCH_OP'; return 'WORD';",
    ],
    //Words
    ['[^\\u0000-\\u007F]+', 'return "WORD";'],
    ['[!-~]+', 'return "WORD";'],
  ],
  options: {
    'case-insensitive': true,
  },
};
