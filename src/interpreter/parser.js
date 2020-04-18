/**
 * Module includes.
 *
 * The "moduleInclude" directive allows including an arbitrary code at the
 * beginning of the generated parser file. As an example, can be the code
 * to require modules for corresponding AST nodes, or direct AST nodes
 * definitions.
 *
 * The code may define callbacks for several parse events, attaching them
 * to the `yyparse` object. For example:
 *
 *   yyparse.onParseBegin = (string) => {
 *     console.log('Parsing:', string);
 *   };
 *
 * ./bin/syntax -g ./examples/module-include.g.js -m slr1 -o './parser.js'
 *
 * > require('./parser').parse('2 + 2 * 2');
 *
 * BinaryExpression {
 *   type: 'Binary',
 *   left:  PrimaryExpression { type: 'Primary', value: '2' },
 *   right: BinaryExpression {
 *     type: 'Binary',
 *     left:  PrimaryExpression { type: 'Primary', value: '2' },
 *     right: PrimaryExpression { type: 'Primary', value: '2' },
 *     op: '*',
 *   },
 *   op: '+',
 * }
 */

export default {
  lex: {
    rules: [
      //Skipe
      ['\\s+', ''], //whitespace
      ['[\\x00-\\x1F]+', ''], //non-printable ascii
      //Exclude op.
      ['\\"[^\\"]*\\"', "yytext = yytext.slice(1, -1); return 'EXACT_PHRASE';"],
      ['-\\w+', "return 'EXCLUDE_OP'"],
      ['\\+\\w+', "return 'INCLUDE_OP'"],
      //Match op
      ['not', "return 'NOT_OP'"],
      ['(from|in|has):\\w+', "return 'MATCH_OP'"],
      //alphanumeric & underscore
      ['\\w+', "return 'WORD';"],
      //Symbol
      ['[\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7F]', "return 'SYMBOL';"],
    ],
    options: {
      'case-insensitive': false,
    },
  },

  moduleInclude: "require('./runtime.js');attachEvents(yyparse);",

  operators: [['nonassoc', 'SYMBOL']],

  bnf: {
    E: [['Filters'], ['Filters Terms'], ['Terms']],
    Filters: [['Filters Filter'], ['Filter']],
    Filter: [['LogicalFilter'], ['MatchFilter'], ['ExactFilter']],
    ExactFilter: [['EXACT_PHRASE', 'exactWord($1);']],
    MatchFilter: [
      ['NOT_OP MATCH_OP', "match(...$2.split(':'),false);"],
      ['MATCH_OP', "match(...$1.split(':'),true);"],
    ],
    LogicalFilter: [
      ['EXCLUDE_OP', 'excludeWord($1.slice(1));'],
      ['INCLUDE_OP', 'exactWord($1.slice(1));'],
    ],

    Terms: [['Terms Term'], ['Term']],
    Term: [
      ['Symbols Word', 'includeWord($2);'],
      ['Word Symbols', 'includeWord($1);'],
      ['Word', 'includeWord($1);'],
    ],
    Word: ['WORD'],
    Symbols: [['Symbols Symbol'], ['Symbol']],
    Symbol: ['SYMBOL'],
    Symbol2: ['SYMBOL'],
  },
};
