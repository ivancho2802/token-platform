(function() {
  var Company, companier,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Company = (function() {
    function Company() {
      this.translate = __bind(this.translate, this);      this.data = {
        values: {},
        contexts: []
      };
      this.globalContext = {};
    }

    Company.prototype.followers = function(idcompany) {
  		if(!idcompany)
  			return false

  		return $.ajax({
  			url : 'https://barter-token.herokuapp.com/api/seguidoresclients',
  			type: 'GET',
  			// data : JSON.stringify(body),
  	   		contentType: "application/json; charset=utf-8",
  	   		headers: {"Authorization":  $.cookie("TOKEN")}
  		}) 
    };
    Company.prototype.balancesmsemail = function(idcompany) {
      if(!idcompany)
        return false

      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/balanceTotalNsmsNemail',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.cities = function() {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/findCities/CO',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.cuponeclienetscan = function() {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/cuponclientescan',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.clients = function() {
      if($.cookie('idbranch')){
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/clients/'+$.cookie('idbranch'),
          type: 'GET',
          // data : JSON.stringify(body),
             contentType: "application/json; charset=utf-8",
             headers: {"Authorization":  $.cookie("TOKEN")}
        }) 
      }else{
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/clients',
          type: 'GET',
          // data : JSON.stringify(body),
             contentType: "application/json; charset=utf-8",
             headers: {"Authorization":  $.cookie("TOKEN")}
        }) 
      }
    }; 
    Company.prototype.branchs = function() {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/branchs',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.staticsHome = function() {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/staticsHome',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    };  
    Company.prototype.staticsbyAdress = function() {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/staticsAdress',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    // ver cupones
    Company.prototype.tokens = function() {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/cuponesA',
        type: 'GET',
         contentType: "application/json; charset=utf-8",
         headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.staticsByToken = function(idtoken) {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/staticsbytoken/'+idtoken,
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    };  
    Company.prototype.solicitudHash = function(hash, context) {
      var k, v;

      for (k in hash) {
        v = hash[k];
        if (typeof v === "string") {
          hash[k] = this.translateText(v, null, null, context);
        }
      }
      return hash;
    }; 
    return Company;

  })();

  companier = new Company();

  // companier = companier;

  (typeof module !== "undefined" && module !== null ? module.exports = companier : void 0) || (this.companier = companier);

}).call(this);
	