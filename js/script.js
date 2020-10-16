
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
        <td class="text-center">
            <button type="button" id="PopoverCustomT-2" class="btn btn-primary btn-sm">Details</button>
        </td>
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

var DECIMAL_SEPARATOR=".";
var GROUP_SEPARATOR=",";
  
function  unFormat(val) {
  console.log("unFormat")
  console.log(val)
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

  