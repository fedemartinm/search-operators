import parser from '../../dist/search-operators';

/**
 * Terms
 */
test('unicode support', () => {
  expect(parser.parse('😊')).toEqual({
    terms: ['😊'],
  });
});

test('test simple word', () => {
  expect(parser.parse('search')).toEqual({
    terms: ['search'],
  });
});

test('remove spaces', () => {
  expect(parser.parse('   best   search')).toEqual({
    terms: ['best', 'search'],
  });
});

test('multiple terms', () => {
  expect(parser.parse('how to use react')).toEqual({
    terms: ['how', 'to', 'use', 'react'],
  });
});

test('code term', () => {
  expect(parser.parse('expect.assertions(1);')).toEqual({
    terms: ['expect.assertions(1);'],
  });
});

test('code terms', () => {
  expect(parser.parse(' await user.getUserName(1); return null')).toEqual({
    terms: ['await', 'user.getUserName(1);', 'return', 'null'],
  });
});

test('unicode terms', () => {
  expect(parser.parse('mamá く ま')).toEqual({
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
  });
});

test('exact phrases', () => {
  expect(parser.parse('"this" "that"')).toEqual({
    filters: [
      { type: 'exact', value: 'this' },
      { type: 'exact', value: 'that' },
    ],
  });
});

/**
 * Matches
 */

test('match whitout key', () => {
  expect(parser.parse('in:hell')).toEqual({
    terms: ['in:hell'],
  });
});

test('match whitout keys', () => {
  expect(parser.parse('from:a to:b')).toEqual({
    terms: ['from:a', 'to:b'],
  });
});

test('match keys', () => {
  expect(parser.parse('from:js in:general', { keys: ['from', 'in'] })).toEqual({
    filters: [
      { type: 'match', key: 'from', value: 'js' },
      { type: 'match', key: 'in', value: 'general' },
    ],
  });
});

test('not match whitout keys', () => {
  expect(parser.parse('not from:a')).toEqual({
    terms: ['not from:a'],
  });
});

test('not match whit keys', () => {
  expect(parser.parse('not in:general', { keys: ['in'] })).toEqual({
    filters: [{ type: 'not-match', key: 'in', value: 'general' }],
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
