// Search Operators declaration file

export = SearchOperators;

declare namespace SearchOperators {
  /**
   * Search operator applyed to text.
   */
  export interface SearchOperator {
    type: 'match' | 'not-match' | 'exact' | 'exclude';
    value: string;
    in?: string;
  }

  /**
   * Parse result object.
   */
  export interface ParseResult {
    filters: SearchOperator[];
    terms: [];
  }

  /**
   * Parse options.
   * keys:Allowed match operator's keys.
   */
  export interface ParseOptions {
    keys: string[];
  }

  /**
   * Smallest element recognized by parser.
   */
  export interface Token {
    // Basic data.
    type:
      | 'TEXT'
      | 'INCLUDE_WORD'
      | 'EXCLUDE_WORD'
      | 'EXACT_PHRASE'
      | 'MATCH'
      | 'NOT_MATCH';
    value: string;

    // Location data.
    startOffset: number;
    endOffset: number;
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
  }

  /**
   * Extract search terms and filters.
   * @param search text to parse
   * @param options parse options.
   * @throws "Unexpected token Exception" exception, showing the actual
   * line from the source, pointing with the ^ marker to the bad token.
   */
  export function parse(search: string, options?: ParseOptions): ParseResult;

  /**
   * Tokens corresponding to the last parse operation.
   */
  export let tokens: Token[];
}
