(function() {
    var BranchRouter, brancherRouter,
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
      BranchRouter = (function() {
      function BranchRouter() {
        this.data = {
          values: {},
          contexts: []
        };
        this.globalContext = {};
      }
  
      BranchRouter.prototype.branchs = function() {
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/branchs',
          type: 'GET',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8"
          /* data : JSON.stringify(body) */
        })
      };

      BranchRouter.prototype.setbranch = function(body) {
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/branchs',
          type: 'POST',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify(body)
        })
      };

      BranchRouter.prototype.putbranch = function(body) {
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/branchs',
          type: 'PUT',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify(body)
        })
      };

      BranchRouter.prototype.putbranchputuser = function(body) {
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/branchsuser',
          type: 'PUT',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify(body)
        })
      };
      
      BranchRouter.prototype.putbranchsetuser = function(body) {
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/branchsuser',
          type: 'POST',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify(body)
        })
      };

      BranchRouter.prototype.deletebranchuser = function(body) {
        return $.ajax({
          url : 'https://barter-token.herokuapp.com/api/branchsuserdel',
          type: 'POST',
          headers: {"Authorization":  $.cookie("TOKEN")},
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify(body)
        })
      };
      
      return BranchRouter;
    })();
    brancherRouter = new BranchRouter();
    (typeof module !== "undefined" && module !== null ? module.exports = brancherRouter : void 0) || (this.brancherRouter = brancherRouter);
  }).call(this);