(function() {
  var Bell, bellier,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Bell = (function() {
    function Bell() {
      this.translate = __bind(this.translate, this);      this.data = {
        values: {},
        contexts: []
      };
      this.globalContext = {};
    }

    Bell.prototype.followers = function(idBell) {
  		if(!idBell)
  			return false

  		return $.ajax({
  			url : 'https://barter-token.herokuapp.com/api/seguidoresclients',
  			type: 'GET',
  			// data : JSON.stringify(body),
  	   		contentType: "application/json; charset=utf-8",
  	   		headers: {"Authorization":  $.cookie("TOKEN")}
  		}) 
    }; 
    Bell.prototype.solicitudHash = function(hash, context) {
      var k, v;

      for (k in hash) {
        v = hash[k];
        if (typeof v === "string") {
          hash[k] = this.translateText(v, null, null, context);
        }
      }
      return hash;
    }; 
    return Bell;

  })();

  bellier = new Bell();

  (typeof module !== "undefined" && module !== null ? module.exports = bellier : void 0) || (this.bellier = bellier);

}).call(this);
	