/**
 * Search-Operators grammar file
 * entry point for syntax
 */

import bnf from './bnf';
import lex from './lexical';
import moduleInclude from './module';

export default {
  lex,
  moduleInclude,
  // Not relevant to this grammar
  // since operations are atomic
  operators: [
    [`left`, `EXACT_PHRASE`],
    [`left`, `NOT_MATCH`],
    [`left`, `MATCH`],
    [`left`, `EXCLUDE_WORD`],
    [`left`, `INCLUDE_WORD`],
    [`left`, `TEXT`],
  ],
  bnf,
};
