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
  /**
  *   funciones auxiliares de las tablas deberian estar fuera
  */
    // seleccionar susucrsal
    function selectBranch (idbranch){
      $.cookie('idbranch', idbranch );
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
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
