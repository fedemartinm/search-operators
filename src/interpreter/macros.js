/**
 * ES5 does support \uFFFF for matching e.g.: text: '[^\\u0000-\\u0020]+'
 * ES5 does not offer other any Unicode support.
 *
 * If necessary:
 * 1. Use custom a tokenizer + a package that brings Unicode support to JavaScript
 * 2. Use a babel plugin to transpile UNICODE rules.
 */
export default {
  text: '[^\\u0000-\\u0020]+',
  id: '\\w+',
};
