export default `
yyparse.onParseBegin = function(string){
  yyparse.tokens = [];
  if( typeof yy.options.keys === 'undefined'){
      yy.options.keys = [];
  }
};
yyparse.onShift = function(token){
  yyparse.tokens.push(token);
  return token;
}`;
