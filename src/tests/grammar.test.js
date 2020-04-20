import parser from '../../dist/search-operators';

/**
 * Terms
 */
test('unicode support', () => {
  expect(parser.parse('😊')).toEqual({
    filters: [],
    terms: ['😊'],
  });
});

test('test simple word', () => {
  expect(parser.parse('search')).toEqual({
    filters: [],
    terms: ['search'],
  });
});

test('remove spaces', () => {
  expect(parser.parse('   best   search')).toEqual({
    filters: [],
    terms: ['best', 'search'],
  });
});

test('multiple terms', () => {
  expect(parser.parse('how to use react')).toEqual({
    filters: [],
    terms: ['how', 'to', 'use', 'react'],
  });
});

test('code term', () => {
  expect(parser.parse('expect.assertions(1);')).toEqual({
    filters: [],
    terms: ['expect.assertions(1);'],
  });
});

test('code terms', () => {
  expect(parser.parse(' await user.getUserName(1); return null')).toEqual({
    filters: [],
    terms: ['await', 'user.getUserName(1);', 'return', 'null'],
  });
});

test('unicode terms', () => {
  expect(parser.parse('mamá く ま')).toEqual({
    filters: [],
    terms: ['mamá', 'く', 'ま'],
  });
});

/**
 * Filters
 */
test('excluding word', () => {
  expect(parser.parse('-preact react')).toEqual({
    filters: [{ type: 'exclude', value: 'preact' }],
    terms: ['react'],
  });
});

test('excluding n words', () => {
  expect(parser.parse('-preact -redux -saga react')).toEqual({
    filters: [
      { type: 'exclude', value: 'preact' },
      { type: 'exclude', value: 'redux' },
      { type: 'exclude', value: 'saga' },
    ],
    terms: ['react'],
  });
});

test('exact word', () => {
  expect(parser.parse('+angular')).toEqual({
    filters: [{ type: 'exact', value: 'angular' }],
    terms: [],
  });
});

test('exact n words', () => {
  expect(parser.parse('+one +two nop')).toEqual({
    filters: [
      { type: 'exact', value: 'one' },
      { type: 'exact', value: 'two' },
    ],
    terms: ['nop'],
  });
});

test('exact phrase', () => {
  expect(parser.parse('"+1 +3 -3  &VÑ"')).toEqual({
    filters: [{ type: 'exact', value: '+1 +3 -3  &VÑ' }],
    terms: [],
  });
});

test('exact phrases', () => {
  expect(parser.parse('"this" "that"')).toEqual(
    expect.objectContaining({
      filters: expect.arrayContaining([
        expect.objectContaining({
          type: 'exact',
          value: 'this',
        }),
        expect.objectContaining({
          type: 'exact',
          value: 'that',
        }),
      ]),
      terms: [],
    })
  );
});

/**
 * Matches
 */

test('match whitout key', () => {
  expect(parser.parse('in:hell')).toEqual({
    filters: [],
    terms: ['in:hell'],
  });
});

test('match whitout keys', () => {
  expect(parser.parse('from:a to:b')).toEqual({
    filters: [],
    terms: ['from:a', 'to:b'],
  });
});

test('match keys', () => {
  expect(parser.parse('from:js in:general', { keys: ['from', 'in'] })).toEqual({
    filters: [
      { type: 'match', key: 'from', value: 'js' },
      { type: 'match', key: 'in', value: 'general' },
    ],
    terms: [],
  });
});

test('not match whitout keys', () => {
  expect(parser.parse('not from:a')).toEqual({
    filters: [],
    terms: ['not from:a'],
  });
});

test('not match whit keys', () => {
  expect(parser.parse('not in:general', { keys: ['in'] })).toEqual({
    filters: [{ type: 'not-match', key: 'in', value: 'general' }],
    terms: [],
  });
});

test('multiple params', () => {
  expect(
    parser.parse('+a -b "printf(x);" in:code not in:repos let:a text', {
      keys: ['in'],
    })
  ).toEqual(
    expect.objectContaining({
      filters: expect.arrayContaining([
        expect.objectContaining({
          type: 'not-match',
          key: 'in',
          value: 'repos',
        }),
        expect.objectContaining({ type: 'match', key: 'in', value: 'code' }),
        expect.objectContaining({ type: 'exact', value: 'a' }),
        expect.objectContaining({ type: 'exclude', value: 'b' }),
      ]),
      terms: ['let:a', 'text'],
    })
  );
});
