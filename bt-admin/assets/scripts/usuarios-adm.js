
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
/**
 *  para generar arrays
 */
  function generateArrayMayGasto(response, tipo){
    
                cuponeclienetscanData = response;
                var arrayUserRedim = cuponeclienetscanData ? cuponeclienetscanData.userredimieron.fk_user_asocd ? (cuponeclienetscanData.userredimieron.fk_user_asocd): []: [];
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
                // clientes 
                /**
                *   numeros de seguidores correo y demas
                */
                if(tipo=='Frecuente')
                return arrayusermayorgastofrecuente 
                else if(tipo=='Fieles')
                return arrayusermayorgastofieles 
                else if(tipo=='Recurrentes')
                return arrayusermayorgastorecurrentes 
                else if(tipo=='Potenciales')
                return arrayusermayorgastopotenciales 
                else if(tipo=='Rentables')
                return arrayusermayorgastorentables 
                else if(tipo=='All')
                return arrayusermayorgasto  
                //numPuntosObtenidos
                //numUserClients
  }