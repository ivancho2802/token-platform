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

    Company.prototype.getjsondisaen = function() {
  		return $.ajax({
  			url : 'http://api.tokenplataforma.com:3001/api/unlayerjsondisaen',
  			type: 'GET',
        contentType: "application/json; charset=utf-8",
        headers: {"Authorization":  $.cookie("TOKEN")}
  		}) 
    };
    Company.prototype.followers = function(idcompany) {
  		if(!idcompany)
  			return false

  		return $.ajax({
  			url : 'http://api.tokenplataforma.com:3001/api/seguidoresclients',
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
        url : 'http://api.tokenplataforma.com:3001/api/balanceTotalNsmsNemail',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.cities = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/findCities/CO',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.cuponeclienetscan = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/cuponclientescan',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.clients = function(idbranch=false) {
      //console.log(idbranch)
      /* if(idbranch){
        return $.ajax({
          url : 'http://api.tokenplataforma.com:3001/api/clients/'+idbranch,
          type: 'GET',
          // data : JSON.stringify(body),
             contentType: "application/json; charset=utf-8",
             headers: {"Authorization":  $.cookie("TOKEN")}
        }) 
      }else{ */
        return $.ajax({
          url : 'http://api.tokenplataforma.com:3001/api/clients',
          type: 'GET',
          // data : JSON.stringify(body),
             contentType: "application/json; charset=utf-8",
             headers: {"Authorization":  $.cookie("TOKEN")}
        }) 
      /* } */
    }; 
    Company.prototype.clientsforbell = function(idbranch) {
      /* if(idbranch){ */
        /* return $.ajax({
          url : 'http://api.tokenplataforma.com:3001/api/clientsforbell'+idbranch,
          type: 'GET',
          // data : JSON.stringify(body),
             contentType: "application/json; charset=utf-8",
             headers: {"Authorization":  $.cookie("TOKEN")}
        })  */
      /* }else{ */
        return $.ajax({
          url : 'http://api.tokenplataforma.com:3001/api/clientsforbell',
          type: 'GET',
          // data : JSON.stringify(body),
             contentType: "application/json; charset=utf-8",
             headers: {"Authorization":  $.cookie("TOKEN")}
        }) 
      /* } */
    }; 
    
    Company.prototype.branchs = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/branchs',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.staticsHome = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/staticsHome',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    };  
    Company.prototype.staticsbyAdress = function(idbranch) {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/staticsAdress/'+idbranch,
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    // ver cupones
    Company.prototype.tokens = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/cuponesA',
        type: 'GET',
         contentType: "application/json; charset=utf-8",
         headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    }; 
    Company.prototype.staticsByToken = function(idtoken) {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/staticsbytoken/'+idtoken,
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    };  
    Company.prototype.sendgrinddesigns = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/sendgrind/designs',
        type: 'GET',
        // data : JSON.stringify(body),
           contentType: "application/json; charset=utf-8",
           headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    };
    Company.prototype.getqualification = function(id_branch=null) {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/calificationsA/'+id_branch,
        type: 'GET',
        // data : JSON.stringify(body),
        contentType: "application/json; charset=utf-8",
        headers: {"Authorization":  $.cookie("TOKEN")}
      }) 
    };
    Company.prototype.getgiftsA = function() {
      return $.ajax({
        url : 'http://api.tokenplataforma.com:3001/api/giftsA',
        type: 'GET',
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
	