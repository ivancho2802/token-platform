
class Help {
  constructor () {}
  // Getter
  get area() {
    return this.calcArea();
  } 
  // Método
  loadbrnachs(){
     companier.branchs()
    .then((branchsData)=> { 
      var eltr = document.createElement("ul"), branchsArray=[];
      if(!branchsArray || !branchsArray.length ){
        eltr= '<td><div class="text-muted opacity-6">No hay Sucursales</div></td>';
      }else{
        for (var i = 0; i < branchsArray.length; i++) {
          // if(branchsArray[i].status)
          eltr.innerHTML += `
          <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link" click="selectBranch(${branchsArray[i]})">
                  <i class="nav-link-icon lnr-inbox"></i>
                  <span>
                      ${branchsArray[i].nombre} -  ${branchsArray[i].address}
                  </span>
                  <div class="ml-auto badge badge-pill badge-secondary">86</div>
              </a>
          </li>  
          `;
        }
      }
      document.getElementById("branchs").innerHTML = eltr;
    }, 
    (err) =>{console.log("error companier.branchs "+err)});
  }

}  
/**
 * funcion para formatear numero a miles con puntos y comas
 */
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
/**
 * 
 * @param {"funcion para obtener la fecha de nacimienor"} fecha_nac 
 */
function getEdad(fecha_nac){
  return new Date().getFullYear() - new Date(fecha_nac).getFullYear();
}
/**
 * 
 * @param {"funcion para obtner el genero segun"} genero 
 */
function getGenero(genero){
  return genero == 'male' ? "Hombre" : "Mujer";
}
/**
 * 
 * @param {"elemostos objetos para el objetivo"} array 
 * @param {"nombre del elemento del objeto a acumular"} objectacum 
 * @param {"si desea formatear"} formatResult 
 */
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
 * @param {"arreglo para agrupar"} statics 
 * @param {"agrupar data por semana"} 
 */
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
function positionCorrect (position){
  var element = document.getElementById(position);
  // smooth scroll to element and align it at the bottom
  // console.log(element)
  element.scrollIntoView({ block: 'end',  behavior: 'smooth' });//{ behavior: 'smooth', block: 'end'}
}