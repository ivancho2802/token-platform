
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
      var eltr = document.createElement("ul"), branchsArray=branchsData, acumeltr ='';
      if(!branchsArray || !branchsArray.length ){
        eltr= '<td><div class="text-muted opacity-6">No hay Sucursales</div></td>';
      }else{
        acumeltr =`
              <li class="nav-item default">
                <a href="#" class="nav-link">
                    <i class="nav-link-icon lnr-file-empty"></i>
                    <span>
                        Sucursales
                    </span>
                </a>
              </li>`
        for (var i = 0; i < branchsArray.length; i++) {
          //if(branchsArray[i].status)
          acumeltr += `
          <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link" onclick="selectBranch('${branchsArray[i]._id}')">
                  <i class="nav-link-icon lnr-inbox"></i>
                  <div>
                      ${branchsArray[i].nombre} -  ${branchsArray[i].address}
                  </div>
              </a>
          </li>  
          `;
        }
        eltr = acumeltr
      }
      document.getElementById("branchs").innerHTML = eltr;
    }, 
    (err) =>{console.log("error companier.branchs "+err)});
  }
  toHSL(hex, ele) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);
    var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    if(ele=="l")
      colorInHSL = l
    return colorInHSL
  }
  rgbToHex (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
  };
  fullColorHex(rgb) {
    rgb = rgb.replace("rgb(", "")
    rgb = rgb.replace(")", "")
    rgb = rgb.replace(" ", "")
    rgb = rgb.replace(" ", "")
    var reset =  rgb.split(',')
    var r,g,b
    r = reset[0]
    g = reset[1]
    b = reset[2]
    var red = new Help().rgbToHex(r);
    var green = new Help().rgbToHex(g);
    var blue = new Help().rgbToHex(b);
    return "#"+red+green+blue;
  };
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