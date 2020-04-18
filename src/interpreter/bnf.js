export default {
  Search: [
    ['Filters', '$$ = {filters:$1}'],
    ['Filters Terms', '$$ = {filters:$1,terms:$2}'],
    ['Terms Filters', '$$ = {filters:$2,terms:$1}'],
    ['Terms', '$$ = {terms:$1}'],
  ],
  Filters: [
    ['Filters Filter', '$$ = [].concat($1, $2);'],
    ['Filter', '$$=[$1]'],
  ],
  Filter: [['LogicalFilter'], ['MatchFilter'], ['ExactFilter']],
  ExactFilter: [['EXACT_PHRASE', '$$ = {type:"exact",value:$1};']],
  MatchFilter: [
    [
      'NOT_OP MATCH_OP',
      '$$ = {type:"not-match",key:$2.split(":")[0],value:$2.split(":")[1] };',
    ],
    [
      'MATCH_OP',
      '$$ = {type:"match",key:$1.split(":")[0],value:$1.split(":")[1] };',
    ],
  ],
  LogicalFilter: [
    ['EXCLUDE_OP', '$$ = {type:"exclude",value:$1};'],
    ['INCLUDE_OP', '$$ = {type:"exact",value:$1};'],
  ],

  Terms: [
    ['Terms Term', '$$ = [].concat($1, $2);'],
    ['Term', '$$=[$1]'],
  ],
  Term: [['Word']],
  Word: ['WORD'],
};
