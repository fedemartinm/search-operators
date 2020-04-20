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
}
function removeQuotes( ){
  yytext = yytext.slice(1,-1);
}
function removeUnary( ){
  yytext = yytext.slice(1);
}
function notMatch( ){
  var key = yytext.slice(4).split(':')[0]; 
  if(yy.options.keys.indexOf(key)!==-1){
    yytext = yytext.slice(4);
    return true;
  }
  return false;
}
function match( ){
  var key = yytext.split(':')[0]; 
  if(yy.options.keys.indexOf(key)!==-1){
    return true;
  }
  return false;
}
`;
