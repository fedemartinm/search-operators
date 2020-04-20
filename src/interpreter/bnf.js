export default {
  Searchs: [
    [
      'Searchs Search',
      '$$={\
            filters: [].concat($1.filters, $2.filters),\
            terms:   [].concat($1.terms, $2.terms)\
          }',
    ],
    ['Search', '$$ = $1'],
  ],
  Search: [
    ['Term', '$$={ filters:[ ], terms:[ $1 ]}'],
    ['Filter', '$$={ filters:[ $1 ], terms:[ ]}'],
  ],
  Filter: [['LogicalFilter'], ['MatchFilter'], ['ExactFilter']],
  ExactFilter: [['EXACT_PHRASE', '$$ = { type:"exact" , value:$1};']],
  MatchFilter: [
    [
      'NOT_MATCH',
      '$$ = {type:"not-match",key:$1.split(":")[0],value:$1.split(":")[1] };',
    ],
    [
      'MATCH',
      '$$ = {type:"match",key:$1.split(":")[0],value:$1.split(":")[1] };',
    ],
  ],
  LogicalFilter: [
    ['EXCLUDE_WORD', '$$ = { type:"exclude", value:$1 };'],
    ['INCLUDE_WORD', '$$ = { type:"exact", value:$1 };'],
  ],
  Term: [['TEXT', '$$ = $1']],
};
