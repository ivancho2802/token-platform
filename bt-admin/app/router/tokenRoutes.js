(function() {
    var TokenRouter, tokenRouter,
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
    TokenRouter = (function() {
      function TokenRouter() {
        this.data = {
          values: {},
          contexts: []
        };
        this.globalContext = {};
      }
      TokenRouter.prototype.tokendisaens = function() {
        return $.ajax({
          url : 'http://api.tokenplataforma.com:3001/api/tokendisaen',
          type: 'GET',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8"
          /* data : JSON.stringify(body) */
        })
      };
      return TokenRouter;
    })();
    tokenRouter = new TokenRouter();
    (typeof module !== "undefined" && module !== null ? module.exports = tokenRouter : void 0) || (this.tokenRouter = tokenRouter);
}).call(this);