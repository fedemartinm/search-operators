export default `/**
 *  Search operators parser v(${process.env.npm_package_version})
 *
 *  https://github.com/fedemartinm/search-operators
 *
 *  Usage: 
 *
 *   const result = require('search-operators')
 *         .parse('-printf +printf how to use');
 *
 *   Result: {
 *      filters:[
 *          { type: 'exclude', value: 'printf' },
 *          { type: 'exact', value: 'prints' }
 *              ],
 *      terms: [ 'how', 'to', 'use' ]
 *   }
 *
 */`;
