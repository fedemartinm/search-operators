import SearchGrammar from './interpreter/grammar';
import { join } from 'path';
import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { MODES } from 'syntax-cli/dist/grammar/grammar-mode';
import Grammar from 'syntax-cli/dist/grammar/grammar';
import LRParserGenerator from 'syntax-cli/dist/lr/lr-parser-generator-default';
import header from './header';
import 'colors';

import 'syntax-cli/dist/bin/syntax';

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
  var grammarData = Grammar.dataFromString(
    JSON.stringify(SearchGrammar),
    'bnf'
  );

  console.log(`✓ loaded grammar file...`.green);
  var grammar = Grammar.fromData(grammarData, { mode: MODES.SLR1 });

  const grammarTempFile = join(__dirname, 'grammar.temp.js');
  const headerFile = join(__dirname, './header.txt');
  const outputDir = join(__dirname, '../dist/');
  const outputFile = join(outputDir, 'search-operators.js');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  let code = new LRParserGenerator({
    grammar: grammar,
    /*     options: {
      'resolve-conflicts': false,
    }, */
  }).generate();

  //Add custom header
  code = `${header}\n${code}`;

  //Save file and finish
  writeFileSync(outputFile, code);
  console.log(`✓ search-operators parser successfully generated`.green);

  //IF
  writeFileSync(grammarTempFile, JSON.stringify(SearchGrammar));
}
