import macros from './macros';
export default {
  macros,
  rules: [
    // Skip whitespace and non printable ascii
    ['\\s+', ''],
    ['[\\x00-\\x1F]+', ''],

    // Constraint expressions
    ['\\"[^\u0022]+\\"', "return removeQuotes(), 'EXACT_PHRASE'"],
    ['\\+{text}', "return removeUnary(), 'INCLUDE_WORD'"],
    ['-{text}', "return removeUnary(), 'EXCLUDE_WORD'"],

    //Match expression
    ['not {id}:{id}', "return notMatch() ? 'NOT_MATCH' : 'TEXT';"],
    ['{id}:{id}', "return match() ? 'MATCH' : 'TEXT';"],

    //Unicode text
    ['{text}', "return 'TEXT'"],
  ],
  options: {
    'case-insensitive': true,
  },
};
