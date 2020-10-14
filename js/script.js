
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

  var eltr = document.createElement("tr"), edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"};
  if(!userArray.length || !cities.length)
    return '<td><div class="text-muted opacity-6">No tiene Users</div></td>';

  for (var i = 0; i < userArray.length; i++) {
    if(userArray[i].fk_cliente){
      edad = currentdateyear - new Date(userArray[i].fk_cliente.fecha_nac).getFullYear()
      eltr.innerHTML += `
      <td class="text-center text-muted">${i}</td>
      <td>
          <div class="widget-content p-0">
              <div class="widget-content-wrapper">
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
      <td class="text-center">${cities[userArray[i].fk_cliente.address]}</td>
      <td class="text-center">${genere[userArray[i].fk_cliente.genero]}</td>
      <td class="text-center">${edad}</td>
      <td class="text-center">
          <button type="button" id="PopoverCustomT-2" class="btn btn-primary btn-sm">Details</button>
      </td>  
      `;
    }
  }
  return eltr;
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

  console.log(groups);
  return groups
}
  