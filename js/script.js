
const changeTheme = () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
}

$( document ).ready(function() {
	const toggle = document.getElementById('toggle');

	if(toggle)
	toggle.addEventListener('change', changeTheme);
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + "," + expires + ",path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
 
function getTableUsers (followersData, cities){

  var userArray = followersData ? followersData.seguidores : []

  var container="" , eltr , edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
  if(!userArray.length || !cities.length)
    return '<div class="d-block text-center card-footer">No se encontraron Usuarios</div>';
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
                  <div class="widget-subheading opacity-7">${userArray[i].fk_cliente.email}</div>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center">${cityaux}</td>
        <td class="text-center">${genereaux}</td>
        <td class="text-center">${edad}</td>
      </tr>
      `;
      container += eltr
    }
  }
  return container;
}
function getTableUsersAct (usersData, cities){

  var userArray = usersData ? usersData.fk_user_asocd : []

  var container="" , eltr , edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
  if(!userArray.length || !cities.length)
    return '<div class="d-block text-center card-footer">No se encontraron Usuarios</div>';
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
                  <div class="widget-subheading opacity-7">${userArray[i].email}</div>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center">${cityaux}</td>
        <td class="text-center">${genereaux}</td>
        <td class="text-center">${edad}</td>
      </tr>
      `;
      container += eltr
    }
  }
  return container;
}

function getTableBranchs (branchsArray){

  var eltr = document.createElement("tr");
  if(!branchsArray || !branchsArray.length )
    return '<td><div class="text-muted opacity-6">No hay Sucursales</div></td>';

  for (var i = 0; i < branchsArray.length; i++) {
      // if(branchsArray[i].status)
      eltr.innerHTML += `
      <li class="nav-item">
          <a href="javascript:void(0);" class="nav-link" click="selectBranch(${branchsArray[i]._id})">
              <i class="nav-link-icon lnr-inbox"></i>
              <span>
                  ${branchsArray[i].nombre} -  ${branchsArray[i].address}
              </span>
              <div class="ml-auto badge badge-pill badge-secondary">86</div>
          </a>
      </li>  
      `;
  }
  return eltr;
}
function selectBranch (idbranch){
    $.cookie('idbranch', idbranch );
}

function groupByWeek(statics){
  const groups = statics.reduce((acc, data) => {

    // create a composed key: 'year-week' 
    const yearWeek = `${moment(data.update_date).year()}-${moment(data.update_date).week()}`;
    
    // add this key as a property to the result object
    if (!acc[yearWeek]) {
      acc[yearWeek] = [];
    }
    
    // push the current date that belongs to the year-week calculated befor
    acc[yearWeek].push(data);

    return acc;

  }, {});

  var formatgroups = [], key, value

  for (var i = 0; i < Object.keys(groups).length; i++) {
    key = Object.keys(groups)[i];
    value = Object.values(groups)[i];
    formatgroups.push({week: key, data: value})
  }
  // console.log(formatgroups);
  return formatgroups.reverse()
}

function groupByWeekStatics(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

  var auxScan,  auxVenc,  auxAct , 
  dates = [], 
  semanaMayor,  semanaMenor, 
  labelsStatics =[], 
  dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
  cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[];

  if(acumCuponClientActivos.length) 
     cuponsClienteActivo = groupByWeek(acumCuponClientActivos)
  if(acumCuponClientActivosVencido.length) 
     cuponsClienteVencido = groupByWeek(acumCuponClientActivosVencido)
  if(acumCuponClientScan.length) 
     cuponsClienteScan = groupByWeek(acumCuponClientScan)

  auxScan = cuponsClienteScan.length ? cuponsClienteScan[cuponsClienteScan.length-1].week:'',
  auxVenc = cuponsClienteVencido.length ? cuponsClienteVencido[cuponsClienteVencido.length-1].week : '',
  auxAct = cuponsClienteActivo.length ? cuponsClienteActivo[cuponsClienteActivo.length-1].week:''


  if(auxScan)dates.push( auxScan.split('-').pop()); 
  if(auxAct)dates.push( auxAct.split('-').pop()); 
  if(auxVenc)dates.push( auxVenc.split('-').pop());  

  semanaMayor = Math.max.apply(null, dates);
  semanaMenor = Math.min.apply(null, dates);
  // var formatsemanaMayor = '2020'
  var j = 0
  for (var i = semanaMenor; i < semanaMayor+1; i++) {

      labelsStatics.push("Semana "+i);

      if(cuponsClienteActivo.length)
      cuponsClienteActivo.forEach(element => {
          if(element.week.split('-').pop() == i)
              dataCuponsClienteActivo.push(element.data.length)
      });
      if(!dataCuponsClienteActivo[j])
          dataCuponsClienteActivo.push(0)

      if(cuponsClienteScan.length)
      cuponsClienteScan.forEach(element => {
          if(element.week.split('-').pop() == i)
              dataCuponsClienteScan.push(element.data.length)
      });
      if(!dataCuponsClienteScan[j])
          dataCuponsClienteScan.push(0)

      if(cuponsClienteVencido.length)
      cuponsClienteVencido.forEach(element => {
          if(element.week.split('-').pop() == i)
              dataCuponsClienteVencido.push(element.data.length)
      });
      if(!dataCuponsClienteVencido[j])
          dataCuponsClienteVencido.push(0)
      j++;
  }

  bodyStatics = {
      labels: labelsStatics,//["Semana: 40", "Semana: 41", "Semana: 42"],//
      datasets: [{//staticsHomeData
          label: "Redimidos",
          backgroundColor: "#3ac47d",//window.chartColors.red, 
          data: dataCuponsClienteScan//[6, 0, 0]//
      }, {
          label: "Activos",
          backgroundColor: "#16aaff",//window.chartColors.blue,
          data: dataCuponsClienteActivo//[4, 5, 3] // 
      } , {
          label: "Vencidos",
          backgroundColor: "#d92550",//window.chartColors.blue,
          data: dataCuponsClienteVencido//[4, 5, 3]//
      } 
      ]
  }

  return bodyStatics
}

function groupByAdress(statics, cities){
  const groups = statics.reduce((acc, data) => {

    var address = data.fk_cliente.address && cities.findIndex(city => city._id === data.fk_cliente.address) !== -1 ? cities[cities.findIndex(city => city._id === data.fk_cliente.address)].city +" - "+ cities[cities.findIndex(city => city._id === data.fk_cliente.address)].country : "No Dir";
    // const address = data.fk_cliente.address

    if (!acc[address]) {
      acc[address] = [];
    }
    
    acc[address].push(data);

    return acc;

  }, {});

  var formatgroups = [], key, value

  for (var i = 0; i < Object.keys(groups).length; i++) {
    key = Object.keys(groups)[i];
    value = Object.values(groups)[i];
    formatgroups.push({address: key, data: value})
  }
  // console.log(formatgroups);
  return formatgroups.reverse()
}

function groupAllAdress(statics){
  const groups = statics.reduce((acc, data) => {

    const address = data.address

    if (!acc[address]) {
      acc[address] = [];
    }
    
    acc[address].push(data);

    return acc;

  }, {});

  var formatgroups = [], key, value

  for (var i = 0; i < Object.keys(groups).length; i++) {
    key = Object.keys(groups)[i];
    value = Object.values(groups)[i];
    formatgroups.push({address: key, data: value})
  }
  // console.log(formatgroups);
  return formatgroups.reverse()
}
function groupByAdressStatics(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan, citiesData){

  var auxScan,  auxVenc,  auxAct , 
  dates = [], 
  semanaMayor,  semanaMenor, 
  labelsStatics =[], 
  dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
  cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[];
  
  if(acumCuponClientActivos.length) 
     cuponsClienteActivo = groupByAdress(acumCuponClientActivos, citiesData)
  if(acumCuponClientActivosVencido.length) 
     cuponsClienteVencido = groupByAdress(acumCuponClientActivosVencido, citiesData)
  if(acumCuponClientScan.length) 
     cuponsClienteScan = groupByAdress(acumCuponClientScan, citiesData)

  cuponesMayor = groupAllAdress(cuponsClienteScan.concat(cuponsClienteVencido).concat(cuponsClienteActivo));
  var j = 0
  for (var i = 0; i < cuponesMayor.length; i++) {

      labelsStatics.push(cuponesMayor[i].address);

      if(cuponsClienteActivo.length)
      cuponsClienteActivo.forEach(element => {
          if(element.address == cuponesMayor[i].address)
            dataCuponsClienteActivo.push(element.data.length)
      });
      if(!dataCuponsClienteActivo[j])
          dataCuponsClienteActivo.push(0)

      if(cuponsClienteScan.length)
      cuponsClienteScan.forEach(element => {
          if(element.address == cuponesMayor[i].address)
            dataCuponsClienteScan.push(element.data.length)
      });
      if(!dataCuponsClienteScan[j])
          dataCuponsClienteScan.push(0)

      if(cuponsClienteVencido.length)
      cuponsClienteVencido.forEach(element => {
          if(element.address == cuponesMayor[i].address)
              dataCuponsClienteVencido.push(element.data.length)
      });
      if(!dataCuponsClienteVencido[j])
          dataCuponsClienteVencido.push(0)
      j++;
  }

  bodyStatics = {
      labels: labelsStatics,//["Semana: 40", "Semana: 41", "Semana: 42"],//
      datasets: [{//staticsHomeData
          label: "Redimidos",
          backgroundColor: "#3ac47d",//window.chartColors.red,
          data: dataCuponsClienteScan//[6, 0, 0]//
      }, {
          label: "Activos",
          backgroundColor: "#16aaff",//window.chartColors.blue,
          data: dataCuponsClienteActivo//[4, 5, 3] // 
      } , {
          label: "Vencidos",
          backgroundColor: "#d92550",//window.chartColors.blue,
          data: dataCuponsClienteVencido//[4, 5, 3]//
      } 
      ]
  }

  return bodyStatics
}
function getEdad(fecha_nac){
  return new Date().getFullYear() - new Date(fecha_nac).getFullYear();
}

function groupByEdad(statics, cities){
  const groups = statics.reduce((acc, data) => {
    var fecha_nac = data.fk_cliente ? data.fk_cliente.fecha_nac ? getEdad(data.fk_cliente.fecha_nac): "No Data": "No Data";
    // const fecha_nac = data.fk_cliente.fecha_nac

    if (!acc[fecha_nac]) {
      acc[fecha_nac] = [];
    }
    
    acc[fecha_nac].push(data);

    return acc;

  }, {});

  var formatgroups = [], key, value

  for (var i = 0; i < Object.keys(groups).length; i++) {
    key = Object.keys(groups)[i];
    value = Object.values(groups)[i];
    formatgroups.push({fecha_nac: key, data: value})
  }
  // console.log(formatgroups);
  return formatgroups.reverse()
}
function groupAllEdad(statics){
  const groups = statics.reduce((acc, data) => {

    const fecha_nac = data.fecha_nac

    if (!acc[fecha_nac]) {
      acc[fecha_nac] = [];
    }
    
    acc[fecha_nac].push(data);

    return acc;

  }, {});

  var formatgroups = [], key, value

  for (var i = 0; i < Object.keys(groups).length; i++) {
    key = Object.keys(groups)[i];
    value = Object.values(groups)[i];
    formatgroups.push({fecha_nac: key, data: value})
  }
  // console.log(formatgroups);
  return formatgroups.reverse()
}
function groupByEdadStatics(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

  var auxScan,  auxVenc,  auxAct , 
  dates = [], 
  semanaMayor,  semanaMenor, 
  labelsStatics =[], 
  dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
  cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[];

  if(acumCuponClientActivos.length) 
     cuponsClienteActivo = groupByEdad(acumCuponClientActivos)
  if(acumCuponClientActivosVencido.length) 
     cuponsClienteVencido = groupByEdad(acumCuponClientActivosVencido)
  if(acumCuponClientScan.length) 
     cuponsClienteScan = groupByEdad(acumCuponClientScan)

  cuponesMayor = groupAllEdad(cuponsClienteScan.concat(cuponsClienteVencido).concat(cuponsClienteActivo));
  var j = 0
  for (var i = 0; i < cuponesMayor.length; i++) {

      labelsStatics.push(cuponesMayor[i].fecha_nac);

      if(cuponsClienteActivo.length)
      cuponsClienteActivo.forEach(element => {
          if(element.fecha_nac == cuponesMayor[i].fecha_nac)
            dataCuponsClienteActivo.push(element.data.length)
      });
      if(!dataCuponsClienteActivo[j])
          dataCuponsClienteActivo.push(0)

      if(cuponsClienteScan.length)
      cuponsClienteScan.forEach(element => {
          if(element.fecha_nac == cuponesMayor[i].fecha_nac)
            dataCuponsClienteScan.push(element.data.length)
      });
      if(!dataCuponsClienteScan[j])
          dataCuponsClienteScan.push(0)

      if(cuponsClienteVencido.length)
      cuponsClienteVencido.forEach(element => {
          if(element.fecha_nac == cuponesMayor[i].fecha_nac)
              dataCuponsClienteVencido.push(element.data.length)
      });
      if(!dataCuponsClienteVencido[j])
          dataCuponsClienteVencido.push(0)
      j++;
  }

  bodyStatics = {
      labels: labelsStatics,//["Semana: 40", "Semana: 41", "Semana: 42"],//
      datasets: [{//staticsHomeData
          label: "Redimidos",
          backgroundColor: "#3ac47d",//window.chartColors.red,
          data: dataCuponsClienteScan//[6, 0, 0]//
      }, {
          label: "Activos",
          backgroundColor: "#16aaff",//window.chartColors.blue,
          data: dataCuponsClienteActivo//[4, 5, 3] // 
      } , {
          label: "Vencidos",
          backgroundColor: "#d92550",//window.chartColors.blue,
          data: dataCuponsClienteVencido//[4, 5, 3]//
      } 
      ]
  }

  return bodyStatics
}

var DECIMAL_SEPARATOR=".";
var GROUP_SEPARATOR=",";
  
function  unFormat(val) {
  // console.log("unFormat")
  // console.log(val)
    if (!val) {
        return;
    }
    val = val.replace(/^0+/, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
};

function format(valString) {
  if (!valString) {
      return '';
  }
  let val = valString.toString();
  const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
  return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) + (!parts[1] ? '' : this.DECIMAL_SEPARATOR + parts[1]);
};

function acumElementOfArrayObject(array, objectacum, formatResult){
  var suma = 0
  array.forEach (function(element){
      suma += element[objectacum];
  });
  if(formatResult)
    return format(suma);
  else
    return suma;
}
function acumElementIIILOfArrayObject(array, objectacumlevel1, objectacumlevel2,objectacumlevel3, formatResult){
  var suma = 0
  array.forEach (function(element){
      suma += element[objectacumlevel1][objectacumlevel2][objectacumlevel3];
  });
  if(formatResult)
    return format(suma);
  else
    return suma;
}
  