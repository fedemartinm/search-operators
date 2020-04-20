# search-operators
A search operators parser to filter search requests

- supports unicode terms
- case-insensitive
- based on LR parser
- 3kb gziped

### Parsing strings
```js
const searchOperators = require('./search-operators');
var value = searchOperators.parse('+github.com useState useEffect');
console.log(value); 
//the parser will separate the text in terms and filters.
//{
//  "filters": [{ "type": "exact", "value": "github.com" }],
//  "terms": ["useState","useEffect"]
//}
```


### Operators


Operator | Description  | Parser input | Parser output |
| :--: | -- | -- | -- |
| **" "** | exact word or phrase | "bash history file"   | { filters : [ { type: 'exact', value: 'bash history file' } ] }
| **+** | exact word | +github.com   | { filters:[ { type: 'exact', value: 'github.com' } ] }
| **-** | exclude word | -php  | { filters:[ { type: 'exclude', value: 'php' } ] }
| **:** | match | in:general  | { filters:[ { type: 'match', key:'in', value: 'general' } ] }
| **not :** | inverse match  | not in:random  | { filters:[ { type: 'not-match', key:'in', value: 'random' } ] }

### API
- Parse
```js 
parser.parse(
  search, //string to parse
  { keys:[] } //keys used by match operator
);
```
- Tokens
```js 
//populated after parse, contains token location
//useful to highlight syntax!
parser.parse("-😊");
console.log(parser.tokens);
//{
//    type: 'EXCLUDE_OP',
//    value: '😊',
//    startOffset: 0,
//    endOffset: 3,
//    startLine: 1,
//    endLine: 1,
//    startColumn: 0,
//    endColumn: 3
//}
```

### Development

This project is intended to be extended or modified.  It's uses syntax to generate the parser; in case you need to modify the grammar, [syntax](https://github.com/DmitrySoshnikov/syntax) is very well documented. Any contribution is very appreciated.

1. Fork [search-operators](https://github.com/fedemartinm/search-operators/) repo.
2. Make your changes
3. Validate grammar with `npm run validate`
4. Test parser with `npm run test`

Use `npm run build` to transpile and generate production build.

## Licence 
[MIT](https://github.com/fedemartinm/search-operators/blob/master/LICENSE) do whatever you want to do!

