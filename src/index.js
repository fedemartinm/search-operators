import SOGrammar from './interpreter/parser';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import { MODES } from 'syntax-cli/dist/grammar/grammar-mode';
import Grammar from 'syntax-cli/dist/grammar/grammar';
import LRParserGenerator from 'syntax-cli/dist/lr/lr-parser-generator-default';
import 'colors';

(() => {
  build();
})();

/**
 * Production build.
 * If you are editing search grammar, it's reccomended to
 * use syntax cli, to validate grammar, debug and other options.
 * @see https://github.com/DmitrySoshnikov/syntax
 *
 */
function build() {
  var grammarData = Grammar.dataFromString(JSON.stringify(SOGrammar), 'bnf');
  console.log(`✓ loaded grammar file...`.green);
  var grammar = Grammar.fromData(grammarData, { mode: MODES.SLR1 });

  const outputDir = join(__dirname, '../dist/');
  const outputFile = join(outputDir, 'parser.js');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  new LRParserGenerator({
    grammar: grammar,
    outputFile: outputFile,
    /*     options: {
      'resolve-conflicts': false,
    }, */
  }).generate();
  console.log(`✓ search-operators parser successfully generated`.green);
}
