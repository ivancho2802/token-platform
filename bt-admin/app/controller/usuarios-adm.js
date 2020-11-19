//console.log(JSON.parse($.cookie("business")))
$( document ).ready(function() {
    /**
    *   data de la empresa perfil
    */
    if(!(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
        return;
        
    document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
    document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
    document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image;

    getFollowers();
    findCuponclientemayorgasto()
    /**
    * sucursales
    */ 
    new Help().loadbrnachs();
    
    // document.getElementById("numSms").innerHTML = balancesmsemailData ? balancesmsemailData.numSms : 0;
    // document.getElementById("numEmail").innerHTML = balancesmsemailData ? balancesmsemailData.numEmail : 0;
    // document.getElementById("saldoTotal").innerHTML = balancesmsemailData ? balancesmsemailData.saldoTotal : 0;
}); 
/**
 * funciotn para ver seguidores
 * */
function getFollowers(){
    var followersData, citiesData, clientsData, branchsData
    //fallowers
    companier.followers(JSON.parse($.cookie("userData"))._id)
    .then((response1)=> { 
        //cities
        companier.cities()
        .then((response2)=> { 
            citiesData = response2; 
            followersData = response1;
            /**
            *   numeros de seguidores correo y demas
            */
            document.getElementById("follower").innerHTML = followersData ? followersData.numseguidores : 0
            document.getElementById("userfallowers").innerHTML = getTableUsers(followersData, citiesData); 
        }, 
        (err) =>{console.log("error companier.cities "+err)});
    }, 
    (err) =>{console.log("error companier.followers "+err)}); 
}
/**
 * cuponclinete redimidos mayot costo
 * */
function findCuponclientemayorgasto(){
    //cuponclinete redimidos mayot costo
    companier.cuponeclienetscan()
    .then((response)=> { 
        cuponeclienetscanData = response;
        console.log("cuponeclienetscanData")
        console.log(cuponeclienetscanData)
        var arrayUserRedim = cuponeclienetscanData ? cuponeclienetscanData.userredimieron.fk_user_asocd ? (cuponeclienetscanData.userredimieron.fk_user_asocd): []: [];
        document.getElementById("numUserRedim").innerHTML = arrayUserRedim.length
        var arrayusermayorgasto = cuponeclienetscanData.usermayorgasto ? cuponeclienetscanData.usermayorgasto ? (cuponeclienetscanData.usermayorgasto): []: []
        , arrayusermayorgastofrecuente = [], arrayusermayorgastofieles = [], arrayusermayorgastorecurrentes = []
        , arrayusermayorgastopotenciales = [], arrayusermayorgastorentables=[];

        indexuser = 0//arrayusermayorgasto.length *
        for (let i = 0; i < indexuser; i++) {
            const element = arrayusermayorgasto[i];
                arrayusermayorgastofrecuente.push(element)
        }
        var indexuserfieles = 0, indexuserrecurrentes = 0, indexuserpotenciales = 0, indexuserrentables=0, indexuserfrecu = 0;
        indexuserfieles = arrayusermayorgasto.length * 0.25
        indexuserrecurrentes = arrayusermayorgasto.length * 0.75
        indexuserpotenciales = arrayusermayorgasto.length * 1
        indexuserrentables = arrayusermayorgasto.length * 0.20
        for (let i = 0; i < arrayusermayorgasto.length; i++) {
            const element = arrayusermayorgasto[i];
            //fieles
            if(i<=indexuserfieles){
                arrayusermayorgastofieles.push(element)
            }else
            //recurrentes
            if(i>indexuserfieles && i<=indexuserrecurrentes){
                arrayusermayorgastorecurrentes.push(element)
            }else
            //potenciales
            if(i>=indexuserrecurrentes && i<=indexuserpotenciales){
                arrayusermayorgastopotenciales.push(element)
            }
            //frecuente
        }

        arrayusermayorgasto.sort(function (a, b) {
            if (a.data.acamount > b.data.acamount) {
                return -1;
            }
            if (a.data.acamount < b.data.acamount) {
                return 1;
            }
            if (a.data.acamount == b.data.acamount) {
                if (a.data.numcupones > b.data.numcupones) {
                    return -1;
                }else if (a.data.numcupones < b.data.numcupones) {
                    return 1;
                }
                return 0;
            }
            // a must be equal to b
            return 0;
        });
        //rentables
        for (let j = 0; j < arrayusermayorgasto.length; j++) {
            const element = arrayusermayorgasto[j];
            if(j>0 && j<=indexuserrentables){
                arrayusermayorgastorentables.push(element)
            }
            
        }
        document.getElementById("numUserFieles").innerHTML = arrayusermayorgastofieles.length
        document.getElementById("numUserRecurrentes").innerHTML = arrayusermayorgastorecurrentes.length
        document.getElementById("numUserPotenciales").innerHTML = arrayusermayorgastopotenciales.length
        document.getElementById("numUserRentables").innerHTML = arrayusermayorgastorentables.length
        // clientes
        companier.clients()
        .then((response)=> { 
            clientsData = response; 
            document.getElementById("numUserRedim").innerHTML = clientsData ? clientsData.fk_user_asocd.length ? (clientsData.fk_user_asocd.length): 0: 0;
            companier.cities()
            .then((response2)=> { 
                citiesData = response2; 
                /**
                *   numeros de seguidores correo y demas
                */
                document.getElementById("userFieles").innerHTML = getTableUsersBellClose(clientsData.fk_user_asocd, arrayusermayorgastofieles, citiesData); 
                document.getElementById("userRecurrentes").innerHTML = getTableUsersBellClose(clientsData.fk_user_asocd, arrayusermayorgastorecurrentes, citiesData); 
                document.getElementById("userPotenciales").innerHTML = getTableUsersBellClose(clientsData.fk_user_asocd, arrayusermayorgastopotenciales, citiesData); 
                document.getElementById("userRentables").innerHTML = getTableUsersBellClose(clientsData.fk_user_asocd, arrayusermayorgastorentables, citiesData); 
                document.getElementById("useractives").innerHTML = getTableUsersBellClose(clientsData.fk_user_asocd, arrayusermayorgasto, citiesData); 
            })
        }, 
        (err) =>{console.log("error companier.clients "+err)});
        //numPuntosObtenidos
        //numUserClients
    }, 
    (err) =>{console.log("error companier.cuponeclienetscan "+err)});
}


/**
*  funciones para agrupar tablas por inner
*/
function getTableUsers (followersData, cities){

  var userArray = followersData ? followersData.seguidores : []

  var container="" , eltr , edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
  if(!userArray.length || !cities.length)
    return '<tr class="row-span">      <td class="text-center" colspan="8">No hay clientes</td>  </tr>';
  for (var i = 0; i < userArray.length; i++) {
    if(userArray[i].fk_cliente){
      edad = new Date(userArray[i].fk_cliente.fecha_nac).getFullYear() ? currentdateyear - new Date(userArray[i].fk_cliente.fecha_nac).getFullYear() : "No Data";
      genereaux = genere[userArray[i].fk_cliente.genero] ? genere[userArray[i].fk_cliente.genero] : "No Data";
      cityaux = userArray[i].fk_cliente.address && cities.findIndex(city => city._id === userArray[i].fk_cliente.address) !== -1 ? cities[cities.findIndex(city => city._id === userArray[i].fk_cliente.address)].city +" - "+ cities[cities.findIndex(city => city._id === userArray[i].fk_cliente.address)].country : "No Data";
      eltr = '';
      eltr = `
      <tr>
        <td class="text-center text-muted">${i}</td>
        <td>
          <div class="widget-content-wrapper">
            <div class="widget-content p-0">
              <div class="widget-content-left mr-3">
                  <div class="widget-content-left">
                      <img width="40" class="rounded-circle" src="${userArray[i].fk_cliente.image}" alt="">
                  </div>
              </div>
              <div class="widget-content-left flex2">
                  <div class="widget-heading">${userArray[i].fk_cliente.name} ${userArray[i].fk_cliente.lastname}</div>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center">${cityaux}</td>
        <td class="text-center">${genereaux}</td>
        <td class="text-center">${edad}</td>
        <td class="text-center">0</td>
      </tr>
      `;
      container += eltr
    }
  }
  return container;
}
function getTableUsersBellClose (users, userobjData, cities){

  var userArray = [];

  for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < userobjData.length; j++) {
          if(users[i]._id == userobjData[j].iduser){
              users[i].acamount = userobjData[j].data.acamount
              users[i].numcupones = userobjData[j].data.numcupones
              userArray.push(users[i])  
          }
      }
  }

  var container="" , eltr , edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
  if(!userArray.length || !cities.length)
    return '<tr class="row-span">      <td class="text-center" colspan="8">No hay clientes</td>  </tr>';
  for (var i = 0; i < userArray.length; i++) {
    if(userArray[i]){
      edad = new Date(userArray[i].fecha_nac).getFullYear() ? currentdateyear - new Date(userArray[i].fecha_nac).getFullYear() : "No Data";
      genereaux = genere[userArray[i].genero] ? genere[userArray[i].genero] : "No Data";
      cityaux = userArray[i].address && cities.findIndex(city => city._id === userArray[i].address) !== -1 ? cities[cities.findIndex(city => city._id === userArray[i].address)].city +" - "+ cities[cities.findIndex(city => city._id === userArray[i].address)].country : "No Data";
      eltr = '';
      eltr = `
      <tr>
        <td class="text-center text-muted">${i}</td>
        <td>
          <div class="widget-content-wrapper">
            <div class="widget-content p-0">
              <div class="widget-content-left mr-3">
                  <div class="widget-content-left">
                      <img width="40" class="rounded-circle" src="${userArray[i].image}" alt="">
                  </div>
              </div>
              <div class="widget-content-left flex2">
                  <div class="widget-heading">${userArray[i].name} ${userArray[i].lastname}</div>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center">${cityaux}</td>
        <td class="text-center">${genereaux}</td>
        <td class="text-center">${edad}</td>
        <td class="text-center">${userArray[i].numcupones}</td>
        <td class="text-center">${format(userArray[i].acamount)}</td>
        <td class="text-center">0</td>
      </tr>
      `;
      container += eltr
    }
  }
  return container;
}
(function() {
  var User, user,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  User = (function() {
    function User() {
      this.data = {
        values: {},
        contexts: []
      };
      this.globalContext = {};
    }

    User.prototype.setsegmentuser = function(body) {
      return $.ajax({
        url : 'https://barter-token.herokuapp.com/api/segmentuser',
        type: 'POST',
        headers: {"Authorization":  $.cookie("TOKEN")},
        contentType: "application/json; charset=utf-8" ,
        data : JSON.stringify(body)
      })
    };
    return User;
  })();
  user = new User();
  (typeof module !== "undefined" && module !== null ? module.exports = user : void 0) || (this.user = user);
}).call(this);