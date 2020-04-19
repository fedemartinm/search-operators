import 'colors';

import { existsSync, mkdirSync, writeFileSync } from 'fs';

import Grammar from 'syntax-cli/dist/grammar/grammar';
import LRParserGenerator from 'syntax-cli/dist/lr/lr-parser-generator-default';
import { MODES } from 'syntax-cli/dist/grammar/grammar-mode';
import SearchGrammar from './interpreter/grammar';
import header from './header';
import { join } from 'path';

/**
 * Production build.
 * If you are editing search grammar, it's reccomended to
 * use syntax cli, to validate grammar, debug and other options.
 * @see https://github.com/DmitrySoshnikov/syntax
 *
 */
var grammarData = Grammar.dataFromString(JSON.stringify(SearchGrammar), 'bnf');

console.log(`✓ loaded grammar file...`.green);
var grammar = Grammar.fromData(grammarData, { mode: MODES.SLR1 });

const grammarTempFile = join(__dirname, 'grammar.temp.js');
const outputDir = join(__dirname, '../dist/');
const outputFile = join(outputDir, 'search-operators.js');

//Prepare /lib
if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

let code = new LRParserGenerator({
  grammar: grammar,
}).generate();

//Add custom header
code = `${header}\n${code}`;

//Save file and finish
writeFileSync(outputFile, code);
console.log(`✓ search-operators parser successfully generated`.green);

//copy generated grammad (validate-grammar script)
writeFileSync(grammarTempFile, JSON.stringify(SearchGrammar));
