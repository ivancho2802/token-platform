/**
*  funciones de estilos
*/
  const changeTheme = () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  }
  //eventoi de escucha de tooglke
  $( document ).ready(function() {
  	const toggle = document.getElementById('toggle');
  	if(toggle)
  	toggle.addEventListener('change', changeTheme);
  });
/**
*  funcion para guardar cookie
*/
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
/**
*  funciones para agrupar tablas por inner
*/
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
  //sucursales
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
  /**
  *   funciones auxiliares de las tablas deberian estar fuera
  */
    // seleccionar susucrsal
    function selectBranch (idbranch){
      $.cookie('idbranch', idbranch );
    }
    function getEdad(fecha_nac){
      return new Date().getFullYear() - new Date(fecha_nac).getFullYear();
    }
    function getGenero(genero){
      return genero == 'male' ? "Hombre" : "Mujer";
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
        return format(suma? suma/2 : 0);
      else
        return suma? suma/2 : 0;
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
  /**
  *  funciones de agrupacion de arreglos
  */  
    // agrupar data por semana
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

      var formatgroups = [], key=[], value=[]

      for (var i = 0; i < Object.keys(groups).length; i++) {
        key = Object.keys(groups)[i];
        value = Object.values(groups)[i];
        formatgroups.push({week: key, data: value})
      }
      // console.log(formatgroups);
      return formatgroups.reverse()
    }
    var arrayDayWeek = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    function compareDateWeek(dateanalice){

      var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      var dateloop

      var firstday = new Date(curr.setDate(first));
      var lastday = new Date(curr.setDate(last));
      let dayInMillis=24*3600000;
      var aux="", n=0, init=0

      n=0;
      init=0;
      n = last+1;
      init= first+1;
      dateanalice = new Date(dateanalice)
      dateloop = firstday
      firstday = new Date(curr.setDate(first+1));
      for (var i = init; i < n; i++) {
        dateloop = new Date(dateloop.setDate(dateloop.getDate() + 1));
        // console.log("-------------------->>")
        // console.log(dateanalice > firstday )
        // console.log(Math.floor(dateanalice.getTime()/dayInMillis) == Math.floor(dateloop.getTime()/dayInMillis))
        // console.log("-------------------->>")
        // console.log(dateanalice)
        // console.log(dateloop)
        // console.log("--------------------<")
        // console.log(Math.floor(dateanalice.getTime()/dayInMillis)+" - "+Math.floor(dateloop.getTime()/dayInMillis))
        if(dateanalice > firstday && (Math.floor(dateanalice.getTime()/dayInMillis) == Math.floor(dateloop.getTime()/dayInMillis)))
          return dateanalice
      }
    }
    function groupByDayWeek(statics){
      // firstday
      // "Sun, 06 Mar 2011 12:25:40 GMT"
      // lastday
      // "Sat, 12 Mar 2011 12:25:40 GMT"

      const groups = statics.reduce((acc, data) => {
        // create a composed key: 'year-week' 
        // console.log(compareDateWeek(data.update_date))
        if(compareDateWeek(data.update_date))
        var dayweek = arrayDayWeek[compareDateWeek(data.update_date).getDay()-1];
        else
        var dayweek = "Date Old";
        
        // add this key as a property to the result object
        if (!acc[dayweek]) {
          acc[dayweek] = [];
        }
        
        // push the current date that belongs to the year-week calculated befor
        acc[dayweek].push(data);

        return acc;

      }, {});

      var formatgroups = [], key=[], value=[]

      for (var i = 0; i < Object.keys(groups).length; i++) {
        key = Object.keys(groups)[i];
        value = Object.values(groups)[i];
        formatgroups.push({dayweek: key, data: value})
      }
      // console.log(formatgroups);
      return formatgroups.reverse()
    }
    var arrayMonthAll = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Dicembre"]
    var curr = new Date; // get current date
    var arrayMonth=[]
    var mes = moment(curr).month();
    for (var j = mes-3; j < mes; j++){
      arrayMonth.push({value: j, label: arrayMonthAll[j+1]});
    } 
    function groupByMonth(statics){
      var curr = new Date; // get current date
      var mesend = curr.getMonth(); // First day is the day of the month - the day of the week
      var mesinit = mesend-3; // First day is the day of the month - the day of the week

      const groups = statics.reduce((acc, data) => {
        const mesloop = moment(data.update_date).month()
        // create a composed key: 'year-week' 
        // console.log(mesloop +" > "+mesinit+" "+mesloop +" <= "+mesend)
        const Month = (mesloop > mesinit && mesloop <= mesend)? `${moment(data.update_date).year()}-${moment(data.update_date).month()}`:'Data Long';
        
        // add this key as a property to the result object
        if (!acc[Month]) {
          acc[Month] = [];
        }
        
        // push the current date that belongs to the year-week calculated befor
        acc[Month].push(data);

        return acc;

      }, {});

      var formatgroups = [], key=[], value=[]

      for (var i = 0; i < Object.keys(groups).length; i++) {
        key = Object.keys(groups)[i];
        value = Object.values(groups)[i];
        formatgroups.push({month: key, data: value})
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
    // group por address 
    function groupByAdress(statics, cities){
      const groups = statics.reduce((acc, data) => {

        var address = data.fk_cupones.fk_adress && cities.findIndex(city => city._id === data.fk_cupones.fk_adress) !== -1 ? cities[cities.findIndex(city => city._id === data.fk_cupones.fk_adress)].city +" - "+ cities[cities.findIndex(city => city._id === data.fk_cupones.fk_adress)].country : "No Dir";
        // const address = data.fk_cupones.fk_adress

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
    function groupByAdressStaticsWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan, citiesData){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByWeek(acumCuponClientScan)
      }

      auxScan = cuponsClienteScan.length ? cuponsClienteScan[cuponsClienteScan.length-1].week:'',
      auxVenc = cuponsClienteVencido.length ? cuponsClienteVencido[cuponsClienteVencido.length-1].week : '',
      auxAct = cuponsClienteActivo.length ? cuponsClienteActivo[cuponsClienteActivo.length-1].week:''

      if(auxScan)dates.push( auxScan.split('-').pop()); 
      if(auxAct)dates.push( auxAct.split('-').pop()); 
      if(auxVenc)dates.push( auxVenc.split('-').pop());  

      semanaMayor = Math.max.apply(null, dates);
      semanaMenor = Math.min.apply(null, dates);
      // var formatsemanaMayor = '2020'
      for (var i = semanaMenor; i < semanaMayor+1; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(semana => {
            if(semana.week.split('-').pop() == i){
              cuponclienteedad = []
              cuponclienteedad = groupByAdress(semana.data) ? groupByAdress(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push("Semana "+i+ " - Ubicación: "+ cuponclienteedad[j].address);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              } 
            }
            // else if(!labelsStatics.find(element => element.includes("Semana "+i)) ){
            //     labelsStatics.push("Semana "+i);
            //     dataCuponsClienteActivo.push(0)
            // }
          });

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(semana => {
            if(semana.week.split('-').pop() == i){
              // labelsStatics.push("Semana "+i);
              var cuponclienteedad = []
              cuponclienteedad = groupByAdress(semana.data) ? groupByAdress(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push("Semana "+i+ " - Ubicación: "+ cuponclienteedad[j].address);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              }
            }
            // else if(!labelsStatics.find(element => element.includes("Semana "+i)) ){
            //     labelsStatics.push("Semana "+i);
            //     dataCuponsClienteScan.push(0)
            // }
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(semana => {
            if(semana.week.split('-').pop() == i){
              // labelsStatics.push("Semana "+i);
              var cuponclienteedad = []
              cuponclienteedad = groupByAdress(semana.data) ? groupByAdress(semana.data) :[]
              
              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push("Semana "+i+ " - Ubicación: "+ cuponclienteedad[j].address);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              }
            }
            // else if(!labelsStatics.find(element => element.includes("Semana "+i)) ){
            //     labelsStatics.push("Semana "+i);
            //     dataCuponsClienteVencido.push(0)
            // }
          });
          if(!labelsStatics.find(e => e.includes("Semana "+i))  ){
            labelsStatics.push("Semana "+i);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      } 
      //init de semana en cero
      labelsStatics.push("Semana "+i);
      dataCuponsClienteVencido.push(0)
      dataCuponsClienteScan.push(0)
      dataCuponsClienteActivo.push(0)
      // labelsStatics.push("Semana "+(i)+ " - Edad: "+ 0); 


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
    function groupByAdressStaticsDayWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan, citiesData){
      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByDayWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByDayWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByDayWeek(acumCuponClientScan)
      }
      console.log(cuponsClienteActivo)
      console.log(cuponsClienteVencido)
      console.log(cuponsClienteScan) 

      for (var i = 0; i < arrayDayWeek.length; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(element => {
            // console.log(arrayDayWeek[i]+" - "+element.dayweek)
            if(element.dayweek == arrayDayWeek[i]){ 

              cuponclienteedad = []
              cuponclienteedad = groupByAdress(element.data) ? groupByAdress(element.data) :[]
 
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(element.dayweek+ " - Ubicacion: "+ cuponclienteedad[j].address);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              }
            }
            // else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
            //     labelsStatics.push(arrayDayWeek[i]);
            //     dataCuponsClienteActivo.push(0)
            // }
          }); 

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 

              cuponclienteedad = []
              cuponclienteedad = groupByAdress(element.data) ? groupByAdress(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(element.dayweek+ " - Ubicacion: "+ cuponclienteedad[j].address);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              } 
            }  
            // else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
            //     labelsStatics.push(arrayDayWeek[i]);
            //     dataCuponsClienteScan.push(0)
            // }
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 
              cuponclienteedad = []
              cuponclienteedad = groupByAdress(element.data) ? groupByAdress(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(element.dayweek+ " - Ubicacion: "+ cuponclienteedad[j].address);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              }  
            }  
            // else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
            //     labelsStatics.push(arrayDayWeek[i]);
            //     dataCuponsClienteVencido.push(0)
            // }
          });

          if(!labelsStatics.find(e => e.includes(arrayDayWeek[i]))  ){
            labelsStatics.push(arrayDayWeek[i]);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      }  
      //init de semana en cero 
      // dataCuponsClienteVencido.push(0)
      // dataCuponsClienteScan.push(0)
      // dataCuponsClienteActivo.push(0)

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
    function groupByAdressStaticsMonth(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan, citiesData){
      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByMonth(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByMonth(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByMonth(acumCuponClientScan)
      }

      for (var i = 0; i < arrayMonth.length; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(element => {
            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 
              cuponclienteedad = []
              cuponclienteedad = groupByAdress(element.data) ? groupByAdress(element.data) :[]
 
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Ubicacion: "+ cuponclienteedad[j].address);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              }
            } 
          }); 

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(element => {
            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 

              cuponclienteedad = []
              cuponclienteedad = groupByAdress(element.data) ? groupByAdress(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Ubicacion: "+ cuponclienteedad[j].address);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              } 
            } 
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(element => {
            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 
              cuponclienteedad = []
              cuponclienteedad = groupByAdress(element.data) ? groupByAdress(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Ubicacion: "+ cuponclienteedad[j].address);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              }  
            }   
          });
          if(!labelsStatics.find(e => e.includes(arrayMonth[i].label))  ){
            labelsStatics.push(arrayMonth[i].label);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      }  
      console.log(arrayMonth[i-1].value+1)
      //init de semana en cero
      labelsStatics.push(arrayMonthAll[(arrayMonth[i-1].value+1)]);
      dataCuponsClienteActivo.push(0)
      dataCuponsClienteScan.push(0)
      dataCuponsClienteVencido.push(0)

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
    // group por edad 
    function groupByEdad(statics){
      const groups = statics.reduce((acc, data) => {
        var fecha_nac = data.fk_cliente ? data.fk_cliente.fecha_nac ? getEdad(data.fk_cliente.fecha_nac): "No Data": "No Data";
        // const fecha_nac = data.fk_cliente.fecha_nac

        if (!acc[fecha_nac]) {
          acc[fecha_nac] = [];
        }
        
        acc[fecha_nac].push(data);

        return acc;

      }, {});

      var formatgroups = [], key=[], value=[]

      for (var i = 0; i < Object.keys(groups).length; i++) {
        key = Object.keys(groups)[i];
        value = Object.values(groups)[i];
        formatgroups.push({fecha_nac: key, data: value})
      }
      // console.log(formatgroups);
      return formatgroups.reverse()
    }  
    function groupByEdadStaticsWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByWeek(acumCuponClientScan)
      }

      auxScan = cuponsClienteScan.length ? cuponsClienteScan[cuponsClienteScan.length-1].week:'',
      auxVenc = cuponsClienteVencido.length ? cuponsClienteVencido[cuponsClienteVencido.length-1].week : '',
      auxAct = cuponsClienteActivo.length ? cuponsClienteActivo[cuponsClienteActivo.length-1].week:''

      if(auxScan)dates.push( auxScan.split('-').pop()); 
      if(auxAct)dates.push( auxAct.split('-').pop()); 
      if(auxVenc)dates.push( auxVenc.split('-').pop());  

      semanaMayor = Math.max.apply(null, dates);
      semanaMenor = Math.min.apply(null, dates);

      for (var i = semanaMenor; i < semanaMayor+1; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(semana => {
            if(semana.week.split('-').pop() == i){
              cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push("Semana "+i+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              } 
            }
          });

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(semana => {
            if(semana.week.split('-').pop() == i){
              // labelsStatics.push("Semana "+i);
              var cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push("Semana "+i+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              }
            }
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(semana => {
            if(semana.week.split('-').pop() == i){
              // labelsStatics.push("Semana "+i);
              var cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]
              
              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push("Semana "+i+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              }
            }
          });

          if(!labelsStatics.find(e => e.includes("Semana "+i))  ){
            labelsStatics.push("Semana "+i);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      } 
      //init de semana en cero
      labelsStatics.push("Semana "+(i));
      dataCuponsClienteVencido.push(0)
      dataCuponsClienteScan.push(0)
      dataCuponsClienteActivo.push(0) 

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
    function groupByEdadStaticsDayWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByDayWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByDayWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByDayWeek(acumCuponClientScan)
      }
      // var formatsemanaMayor = '2020'

      for (var i = 0; i < arrayDayWeek.length; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(semana => {
            if(semana.dayweek == arrayDayWeek[i]){ 
              cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(semana.dayweek+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              } 
            } else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
                labelsStatics.push(arrayDayWeek[i]);
                dataCuponsClienteActivo.push(0)
            }
          });

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(semana => {
            if(semana.dayweek == arrayDayWeek[i]){ 
              var cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(semana.dayweek+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              }
            } else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
                labelsStatics.push(arrayDayWeek[i]);
                dataCuponsClienteScan.push(0)
            }
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(semana => {
            if(semana.dayweek == arrayDayWeek[i]){ 
              // labelsStatics.push("Semana "+i);
              var cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]
              
              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(semana.dayweek+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              }
            } else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
                labelsStatics.push(arrayDayWeek[i]);
                dataCuponsClienteVencido.push(0)
            }
          });

          if(!labelsStatics.find(e => e.includes(arrayDayWeek[i]))  ){
            labelsStatics.push(arrayDayWeek[i]);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      } 
      //init de semana en cero
      // labelsStatics.push("Semana "+(i)+ " - Edad: "+ 0);
      // dataCuponsClienteActivo.push(0)
      // dataCuponsClienteScan.push(0)
      // dataCuponsClienteVencido.push(0)

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
    function groupByEdadStaticsMonth(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByMonth(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByMonth(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByMonth(acumCuponClientScan)
      }
      // var formatsemanaMayor = '2020'

      for (var i = 0; i < arrayMonth.length; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(semana => {
            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 
              cuponclienteedad = []
              cuponclienteedad = groupByGenero(semana.data) ? groupByGenero(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              } 
            }
          });

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(semana => {
            if(semana.dayweek == arrayDayWeek[i]){ 
              var cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]

              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(semana.dayweek+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              }
            } 
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(semana => {
            if(semana.dayweek == arrayDayWeek[i]){ 
              // labelsStatics.push("Semana "+i);
              var cuponclienteedad = []
              cuponclienteedad = groupByEdad(semana.data) ? groupByEdad(semana.data) :[]
              
              if(cuponclienteedad.length)
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(semana.dayweek+ " - Edad: "+ cuponclienteedad[j].fecha_nac);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              }
            } else if(!labelsStatics.find(element => element.includes(arrayDayWeek[i])) ){
                labelsStatics.push(arrayDayWeek[i]);
                dataCuponsClienteActivo.push(0)
            }
          });

          if(!labelsStatics.find(e => e.includes(arrayMonth[i].label))  ){
            labelsStatics.push(arrayMonth[i].label);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      } 
      // console.log(arrayMonth[i-1].value+1)
      //init de semana en cero
      labelsStatics.push(arrayMonthAll[(arrayMonth[i-1].value+1)]);
      dataCuponsClienteActivo.push(0)
      dataCuponsClienteScan.push(0)
      dataCuponsClienteVencido.push(0)

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
    // group por mounto 
    function groupByAmountStaticsWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan, paramtime){
      function acumAmount(cuponcliente){
        var amount=0
        if(cuponcliente.length)
          for (var i = 0; i < cuponcliente.length; i++) {
            amount+=cuponcliente[i].fk_cupones.amount
          }
          return (amount)
      }
      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[];

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByWeek(acumCuponClientScan)
      }

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
              if(element.week.split('-').pop() == i){ 
                dataCuponsClienteActivo.push((acumAmount(element.data)))
              }
          });
          if(!dataCuponsClienteActivo[j])
              dataCuponsClienteActivo.push(0)

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(element => {
              if(element.week.split('-').pop() == i){
                dataCuponsClienteScan.push(acumAmount(element.data))
              }
          });
          if(!dataCuponsClienteScan[j])
              dataCuponsClienteScan.push(0)

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(element => {
              if(element.week.split('-').pop() == i){
                dataCuponsClienteVencido.push(acumAmount(element.data))
              }
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
    function groupByAmountStaticsDayWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan, paramtime){
      function acumAmount(cuponcliente){
        var amount=0
        if(cuponcliente.length)
          for (var i = 0; i < cuponcliente.length; i++) {
            amount+=cuponcliente[i].fk_cupones.amount
          }
          return (amount)
      }
      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[];

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByDayWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByDayWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByDayWeek(acumCuponClientScan)
      } 

      var j = 0
      for (var i = 0; i < arrayDayWeek.length; i++) {

          labelsStatics.push(arrayDayWeek[i]);

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 
              dataCuponsClienteActivo.push((acumAmount(element.data)))
            }
          });
          if(!dataCuponsClienteActivo[j])
              dataCuponsClienteActivo.push(0)

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 
              dataCuponsClienteScan.push(acumAmount(element.data))
            }
          });
          if(!dataCuponsClienteScan[j])
              dataCuponsClienteScan.push(0)

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 
              dataCuponsClienteVencido.push(acumAmount(element.data))
            }
          });
          if(!dataCuponsClienteScan[j])
              dataCuponsClienteScan.push(0)
        j++;
      } 
      //init de semana en cero

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
    //group por genero
    function groupByGenero(statics){
      const groups = statics.reduce((acc, data) => {
        var genero = data.fk_cliente ? data.fk_cliente.genero ? getGenero(data.fk_cliente.genero): "No Data": "No Data";
        if (!acc[genero]) {
          acc[genero] = [];
        }
        acc[genero].push(data);
        return acc;
      }, {});

      var formatgroups = [], key=[], value=[]

      for (var i = 0; i < Object.keys(groups).length; i++) {
        key = Object.keys(groups)[i];
        value = Object.values(groups)[i];
        formatgroups.push({genero: key, data: value})
      }
      // console.log(formatgroups);
      return formatgroups.reverse()
    } 
    function groupByGeneroStaticsWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
                var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByWeek(acumCuponClientScan)
      }

      auxScan = cuponsClienteScan.length ? cuponsClienteScan[cuponsClienteScan.length-1].week:'',
      auxVenc = cuponsClienteVencido.length ? cuponsClienteVencido[cuponsClienteVencido.length-1].week : '',
      auxAct = cuponsClienteActivo.length ? cuponsClienteActivo[cuponsClienteActivo.length-1].week:''

      if(auxScan)dates.push( auxScan.split('-').pop()); 
      if(auxAct)dates.push( auxAct.split('-').pop()); 
      if(auxVenc)dates.push( auxVenc.split('-').pop());  

      semanaMayor = Math.max.apply(null, dates);
      semanaMenor = Math.min.apply(null, dates);
      // var formatsemanaMayor = '2020'
      for (var i = semanaMenor; i < semanaMayor+1; i++) {

        if(cuponsClienteActivo.length)
        cuponsClienteActivo.forEach(semana => {
          if(semana.week.split('-').pop() == i){
            cuponclienteedad = []
            cuponclienteedad = groupByGenero(semana.data) ? groupByGenero(semana.data) :[]

            if(cuponclienteedad.length)
            for (var j = 0; j < cuponclienteedad.length; j++) {
              labelsStatics.push("Semana "+i+ " - Genero: "+ cuponclienteedad[j].genero);
              dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
            } 
          }
        });

        if(cuponsClienteScan.length)
        cuponsClienteScan.forEach(semana => {
          if(semana.week.split('-').pop() == i){
            // labelsStatics.push("Semana "+i);
            var cuponclienteedad = []
            cuponclienteedad = groupByGenero(semana.data) ? groupByGenero(semana.data) :[]

            if(cuponclienteedad.length)
            for (var j = 0; j < cuponclienteedad.length; j++) {
              labelsStatics.push("Semana "+i+ " - Genero: "+ cuponclienteedad[j].genero);
              dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
            }
          }
        });

        if(cuponsClienteVencido.length)
        cuponsClienteVencido.forEach(semana => {
          if(semana.week.split('-').pop() == i){
            // labelsStatics.push("Semana "+i);
            var cuponclienteedad = []
            cuponclienteedad = groupByGenero(semana.data) ? groupByGenero(semana.data) :[]
            
            if(cuponclienteedad.length)
            for (var j = 0; j < cuponclienteedad.length; j++) {
              labelsStatics.push("Semana "+i+ " - Genero: "+ cuponclienteedad[j].genero);
              dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
            }
          }
        });

        if(!labelsStatics.find(e => e.includes("Semana "+i))  ){
          labelsStatics.push("Semana "+i);
          dataCuponsClienteVencido.push(0)
          dataCuponsClienteScan.push(0)
          dataCuponsClienteActivo.push(0)
        }
      } 
      //init de semana en cero
      labelsStatics.push("Semana "+(i+1)+ " - Edad: "+ 0);
      dataCuponsClienteActivo.push(0)
      dataCuponsClienteScan.push(0)
      dataCuponsClienteVencido.push(0)

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
    function groupByGeneroStaticsDayWeek(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
      var cuponclienteedad = []

      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByDayWeek(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByDayWeek(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByDayWeek(acumCuponClientScan)
      } 

      for (var i = 0; i < arrayDayWeek.length; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 

              cuponclienteedad = []
              cuponclienteedad = groupByGenero(element.data) ? groupByGenero(element.data) :[]

              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(element.dayweek+ " - Genero: "+ cuponclienteedad[j].genero);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              } 
            } 
          }); 

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 

              cuponclienteedad = []
              cuponclienteedad = groupByGenero(element.data) ? groupByGenero(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(element.dayweek+ " - Genero: "+ cuponclienteedad[j].genero);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              } 
            } 
          });

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(element => {
            if(element.dayweek == arrayDayWeek[i]){ 
              cuponclienteedad = []
              cuponclienteedad = groupByGenero(element.data) ? groupByGenero(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(element.dayweek+ " - Genero: "+ cuponclienteedad[j].genero);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              } 
            }  
          });

          if(!labelsStatics.find(e => e.includes(arrayDayWeek[i]))  ){
            labelsStatics.push(arrayDayWeek[i]);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
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
    function groupByGeneroStaticsMonth(acumCuponClientActivos, acumCuponClientActivosVencido, acumCuponClientScan){

      var auxScan,  auxVenc,  auxAct , 
      dates = [], 
      semanaMayor,  semanaMenor, 
      labelsStatics =[], 
      dataCuponsClienteScan=[],   dataCuponsClienteVencido=[],   dataCuponsClienteActivo=[],
      cuponsClienteActivo=[],   cuponsClienteScan=[],   cuponsClienteVencido=[]; 
      var cuponclienteedad = []
      console.log(acumCuponClientScan)
      if(acumCuponClientActivos.length){
        cuponsClienteActivo = groupByMonth(acumCuponClientActivos)
      }
      if(acumCuponClientActivosVencido.length){
        cuponsClienteVencido = groupByMonth(acumCuponClientActivosVencido)
      }
      if(acumCuponClientScan.length){
        cuponsClienteScan = groupByMonth(acumCuponClientScan)
      } 
      console.log(arrayMonth)
      for (var i = 0; i < arrayMonth.length; i++) {

          if(cuponsClienteActivo.length)
          cuponsClienteActivo.forEach(element => {
            console.log((!labelsStatics.find(ele => ele.includes(arrayMonth[i].label)) ))

            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 

              cuponclienteedad = []
              cuponclienteedad = groupByGenero(element.data) ? groupByGenero(element.data) :[]

              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Genero: "+ cuponclienteedad[j].genero);
                dataCuponsClienteActivo.push(cuponclienteedad[j].data.length)
              }
            }  
          });  

          if(cuponsClienteScan.length)
          cuponsClienteScan.forEach(element => {
            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 

              cuponclienteedad = []
              cuponclienteedad = groupByGenero(element.data) ? groupByGenero(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Genero: "+ cuponclienteedad[j].genero);
                dataCuponsClienteScan.push(cuponclienteedad[j].data.length)
              } 
            }  
          }); 

          if(cuponsClienteVencido.length)
          cuponsClienteVencido.forEach(element => {
            if(new Date(element.month).getMonth() == arrayMonth[i].value){ 
              cuponclienteedad = []
              cuponclienteedad = groupByGenero(element.data) ? groupByGenero(element.data) :[]
              for (var j = 0; j < cuponclienteedad.length; j++) {
                labelsStatics.push(arrayMonth[i].label+ " - Genero: "+ cuponclienteedad[j].genero);
                dataCuponsClienteVencido.push(cuponclienteedad[j].data.length)
              } 
            } 
          });
          if(!labelsStatics.find(e => e.includes(arrayMonth[i].label))  ){
            labelsStatics.push(arrayMonth[i].label);
            dataCuponsClienteVencido.push(0)
            dataCuponsClienteScan.push(0)
            dataCuponsClienteActivo.push(0)
          }
      } 
      //init de semana en cero
      console.log(arrayMonth[i-1].value+1)
      //init de semana en cero
      labelsStatics.push(arrayMonthAll[(arrayMonth[i-1].value+1)]);
      dataCuponsClienteActivo.push(0)
      dataCuponsClienteScan.push(0)
      dataCuponsClienteVencido.push(0)

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
/**
*  TOAST CREACION
*/
  function toastInfo(title, msg){


    document.getElementById("modalalert").innerHTML = `
      <div class="alert alert-warning fade show" role="alert">
        <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
        ${title}! ${msg}
      </div>
    `;
    return;

    var head = ''

    if(title){
      head = `
      <div class="toast-header">
        <strong class="mr-auto">${title}</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `; 
    } 
    document.getElementById("toasts").innerHTML = `
      <div class="toast toast-error rtl " role="alert" data-autohide="false" aria-live="assertive" id="mytoast" aria-atomic="true">
        <div class="toast-progress" style="width: 0%;"></div>
        ${head}
        <div class="toast-body">
          <button type="button" class="toast-close-button" role="button">×</button>
          <div class="toast-title">asdas</div><div class="toast-message">${msg}</div>
        </div>
      </div>
    `;
    // $('#mytoast').on('shown.bs.toast', function () {
    //   // $('#myInput').trigger('focus')
    // })
    $('#mytoast').toast('show')
      
  }
