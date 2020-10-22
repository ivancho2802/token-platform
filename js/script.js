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
  function getTableUsersActSelect (usersData, cities){

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
          <td class="text-center text-muted">
            <div class="switch-animate switch-off">
               <input type="checkbox" name="userlistnew" data-toggle="toggle" data-onstyle="success" value="${userArray[i]._id}" >
            </div>
          </td>
        </tr>
        `;
        container += eltr
      }
    }
    return container;
  }
  function getTableUsersActSegmentSelect (usersSegmentData, cities){

    var userArray=[];

    var container="" , eltr , elheadlist, edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
    if(!usersSegmentData.length || !cities.length)
      return '<div class="d-block text-center card-footer">No se encontraron Listas</div>';
    for (var i = 0; i < usersSegmentData.length; i++) {
      userArray = usersSegmentData[i] ? usersSegmentData[i].fk_user : [];

      elheadlist = '';
      elheadlist = `
      <div class="card">
          <div id="heading${i}" class="card-header">
              <button type="button" data-toggle="collapse" data-target="#collapseOne${i}" aria-expanded="true" aria-controls="collapse${i}" class="text-left m-0 p-0 btn btn-link">
                  <h5 class="m-0 p-0">${usersSegmentData[i].name}  </h5>
              </button>

              <div class="btn-actions-pane-right">
                  <div class="nav">
                      <button data-toggle="tab" href="#tab-eg2-0" class="btn-pill btn-wide btn btn-outline-danger btn-sm">
                        <i class="pe-7s-trash text-danger"></i>
                        Eliminar 
                      </button>
                      <button class="btn-pill btn-wide mr-1 ml-1  btn btn-outline-alternate btn-sm">
                        <input type="checkbox" name="segmentlistnew" data-toggle="toggle" data-onstyle="success" value="${usersSegmentData[i]._id}" >
                      </button>
                  </div>
              </div>  
          </div>
          <div data-parent="#segmentsUserData" id="collapseOne${i}" aria-labelledby="heading${i}" class="collapse ${i==0?'show':''}">
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Nombre</th>
                        <th class="text-center">Ciudad</th>
                        <th class="text-center">Genero</th>
                        <th class="text-center">Edad</th>
                    </tr>
                  </thead>
                  <tbody >
              `;
        for (var j = 0; j < userArray.length; j++) {
          if(userArray[j]){
            edad = new Date(userArray[j].fecha_nac).getFullYear() ? currentdateyear - new Date(userArray[j].fecha_nac).getFullYear() : "No Data";
            genereaux = genere[userArray[j].genero] ? genere[userArray[j].genero] : "No Data";
            cityaux = userArray[j].address && cities.findIndex(city => city._id === userArray[j].address) !== -1 ? cities[cities.findIndex(city => city._id === userArray[j].address)].city +" - "+ cities[cities.findIndex(city => city._id === userArray[j].address)].country : "No Data";
            eltr = '';
            eltr = `
            <tr>
              <td class="text-center text-muted">
                <div class="switch-animate switch-off">
                  ${j}
                </div>
              </td>
              <td>
                <div class="widget-content-wrapper">
                  <div class="widget-content p-0">
                    <div class="widget-content-left mr-3">
                        <div class="widget-content-left">
                            <img width="40" class="rounded-circle" src="${userArray[j].image}" alt="">
                        </div>
                    </div>
                    <div class="widget-content-left flex2">
                        <div class="widget-heading">${userArray[j].name} ${userArray[j].lastname}</div>
                        <div class="widget-subheading opacity-7">${userArray[j].email}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-center">${cityaux}</td>
              <td class="text-center">${genereaux}</td>
              <td class="text-center">${edad}</td>
            </tr>
            `;
            elheadlist += eltr
          }
        }

      elheadlist += `
                  </tbody>
              </table>
            </div>
          </div>
      </div> 
      `;
      container += elheadlist
    }
    return container;
  }
  function getTableUsersActSegmentSelect2 (usersSegmentData, cities){

    var userArray=[];

    var container="" , eltr , elheadlist, edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
    if(!usersSegmentData.length || !cities.length)
      return '<div class="d-block text-center card-footer">No se encontraron Listas</div>';
    for (var i = 0; i < usersSegmentData.length; i++) {
      userArray = usersSegmentData[i] ? usersSegmentData[i].fk_user : [];

      elheadlist = '';
      elheadlist = `
      <div class="card">
          <div id="heading${i}" class="card-header">
              <button type="button" data-toggle="collapse" data-target="#collapseTwo${i}" aria-expanded="true" aria-controls="collapse${i}" class="text-left m-0 p-0 btn btn-link">
                  <h5 class="m-0 p-0">${usersSegmentData[i].name}  </h5>
              </button>

              <div class="btn-actions-pane-right">
                  <div class="nav">
                      <button data-toggle="tab" href="#tab-eg2-0" class="btn-pill btn-wide btn btn-outline-danger btn-sm">
                        <i class="pe-7s-trash text-danger"></i>
                        Eliminar 
                      </button>
                      <button class="btn-pill btn-wide mr-1 ml-1  btn btn-outline-alternate btn-sm">
                        <input type="checkbox" name="segmentlistnew2${i}" data-toggle="toggle" data-onstyle="success" value="${usersSegmentData[i]._id}" >
                      </button>
                  </div>
              </div>  
          </div>
          <div data-parent=".segmentsUserData2" id="collapseTwo${i}" aria-labelledby="heading${i}" class="collapse ${i==0?'show':''}">
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Nombre</th>
                        <th class="text-center">Ciudad</th>
                        <th class="text-center">Genero</th>
                        <th class="text-center">Edad</th>
                    </tr>
                  </thead>
                  <tbody >
              `;
        for (var j = 0; j < userArray.length; j++) {
          if(userArray[j]){
            edad = new Date(userArray[j].fecha_nac).getFullYear() ? currentdateyear - new Date(userArray[j].fecha_nac).getFullYear() : "No Data";
            genereaux = genere[userArray[j].genero] ? genere[userArray[j].genero] : "No Data";
            cityaux = userArray[j].address && cities.findIndex(city => city._id === userArray[j].address) !== -1 ? cities[cities.findIndex(city => city._id === userArray[j].address)].city +" - "+ cities[cities.findIndex(city => city._id === userArray[j].address)].country : "No Data";
            eltr = '';
            eltr = `
            <tr>
              <td class="text-center text-muted">
                <div class="switch-animate switch-off">
                  ${j}
                </div>
              </td>
              <td>
                <div class="widget-content-wrapper">
                  <div class="widget-content p-0">
                    <div class="widget-content-left mr-3">
                        <div class="widget-content-left">
                            <img width="40" class="rounded-circle" src="${userArray[j].image}" alt="">
                        </div>
                    </div>
                    <div class="widget-content-left flex2">
                        <div class="widget-heading">${userArray[j].name} ${userArray[j].lastname}</div>
                        <div class="widget-subheading opacity-7">${userArray[j].email}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-center">${cityaux}</td>
              <td class="text-center">${genereaux}</td>
              <td class="text-center">${edad}</td>
            </tr>
            `;
            elheadlist += eltr
          }
        }

      elheadlist += `
                  </tbody>
              </table>
            </div>
          </div>
      </div> 
      `;
      container += elheadlist
    }
    return container;
  }
  //   bellsData campañas
  function gerTableBells (bellsData){
    function sendMensajes(bol){
      return bol ? 'Enviar mensajes de Text SMS personalizados, ': '';
    } 
    function sendEmails(bol){
      return bol ? 'Enviar correos de email perzonalizados bajo plantillas Token, ': '';
    } 
    function sendNotify(bol){
      return bol ? 'Enviar notificaciones push a los equipos con Token App': '';
    } 
    function defaultItem(bol, idbell, index){
      return bol ? `
                    <button type="button" data-toggle="tooltip" title="Campaña por defecto" data-placement="bottom" class="btn-shadow mr-3 btn btn-warning">
                        <i class="fa fa-star text-white "></i>
                    </button>
                    `: `
                    <button type="button" data-toggle="tooltip" title="Campaña por defecto" data-placement="bottom" class="btn-shadow mr-3 btn btn-black" onclick="setBellDefault('${idbell}',  ${index})">
                        <i class="fa fa-star"></i>
                    </button>
                    `;
    } 

    var container="" , 

    eltr;
    var formatArray =""
    if(!bellsData.length )
      return '<div class="d-block text-center card-footer">No se encontraron Sucursales</div>';
    for (var i = 0; i < bellsData.length; i++) {
      if(bellsData[i]){
        formatArray = "";
        for (var j = 0; j < bellsData[i].fk_bell_user_list.length; j++) {
          formatArray+= `
            <input type="checkbox" name="segmentlistold2${i}" data-toggle="toggle" data-onstyle="success" value="${bellsData[i].fk_bell_user_list[j]}" style="display:none">
          `;
        } 
        eltr = '';
        eltr = `
        <div class="row">
          <div class="col-md-12">
              <div class="main-card mb-3 card">
                  <div class="card-header">
                      <i class="header-icon lnr-license icon-gradient bg-plum-plate"> </i>
                      <span>${bellsData[i].name} - ${bellsData[i].date}</span> 
                  </div>
                  <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-eg1-0" role="tabpanel"><p>
                        Esta campaña puede  ${sendMensajes(bellsData[i].sms)} ${sendEmails(bellsData[i].email)} ${sendNotify(bellsData[i].notipush)}.</p></div>
                    </div>

                    <div class="collapse" id="editar${i}">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="main-card mb-6 card">
                            <div class="card-body">
                              <h5 class="card-title">Editar Campaña</h5>

                              <form  class="needs-validation" novalidate  action="#" method="post"  id="formbelleditar${i}">
                                  <div class="position-relative row form-group"><label for="Nombre" class="col-sm-4 col-form-label">Nombre</label>
                                      <div class="col-sm-8">
                                          <input name="name${i}" id="name${i}" placeholder="Nombre de la campaña" type="text" class="form-control" value="${bellsData[i].name}" required>
                                          <div class="valid-feedback">
                                              Bien!
                                          </div>
                                          <div class="invalid-feedback">
                                              Por favor ponga un nombre.
                                          </div>
                                      </div>
                                  </div>
                                  <div class="position-relative row form-group"><label for="examplePassword" class="col-sm-4 col-form-label">Fecha</label>
                                      <div class="col-sm-8">
                                          <input name="datetime_campana${i}" id="datetime_campana${i}"  placeholder="datetime-campana" type="datetime-local" value="${bellsData[i].date.slice(0, -1)}" class="form-control" required>
                                          <div class="valid-feedback">
                                              Bien!
                                          </div>
                                          <div class="invalid-feedback">
                                              Por favor ponga una fecha.
                                          </div>
                                      </div>
                                  </div>

                                  <div class="position-relative row ">
                                      <div class="col-sm-6 col-md-6 form-group">
                                          <label for="Nombre" class=" col-form-label">Enviar mensajes</label>
                                          <div class=" ">
                                              <div class="theme-switch-wrapper">
                                                  <label class="theme-switch" for="sms${i}">
                                                      <input type="checkbox" id="sms${i}" name="sms${i}"  ${bellsData[i].sms ? 'checked="'+bellsData[i].sms+'"':'unchecked' }"/>
                                                      <div class="slider round"></div>
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-sm-6 col-md-6 form-group">
                                          <label for="Nombre" class=" col-form-label">Enviar Email</label>
                                          <div class=" ">
                                              <div class="theme-switch-wrapper">
                                                  <label class="theme-switch" for="email${i}">
                                                      <input type="checkbox" id="email${i}" name="email${i}"  ${bellsData[i].email ? 'checked="'+bellsData[i].email+'"':'unchecked' }" />
                                                      <div class="slider round"></div>
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                  </div> 

                                  <div class="position-relative row ">
                                      <div class=" form-group col-sm-6 col-md-6  ">
                                          <label for="Nombre" class="col-form-label">Enviar Notificaciones</label>
                                          <div class=" ">
                                              <div class="theme-switch-wrapper">
                                                  <label class="theme-switch" for="notipush${i}">
                                                      <input type="checkbox" id="notipush${i}" name="notipush${i}"  ${bellsData[i].notipush ? 'checked="'+bellsData[i].notipush+'"':'unchecked' }" />
                                                      <div class="slider round"></div>
                                                  </label>
                                              </div>
                                          </div>
                                      </div>

                                      <div class="col-sm-6 col-md-6  form-group">
                                          <label for="Nombre" class="col-form-label">Campaña por defecto</label>
                                          <div class=" ">
                                              <div class="theme-switch-wrapper">
                                                  <label class="theme-switch" for="defaultvalue${i}">
                                                      <input type="checkbox" id="defaultvalue${i}" name="defaultvalue${i}" value="defaultvalue${i}"  ${bellsData[i].defaultvalue ? 'checked="'+bellsData[i].defaultvalue+'"':'unchecked' }"/>
                                                      <div class="slider round"></div>
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <label>
                                      <div class="position-relative row form-group"><label for="exampleFile" class="col-sm-4 col-form-label">Terminos y Condiciones</label>
                                          <div class="col-sm-8">
                                              <div class="position-relative form-check">
                                                  <label class="form-check-label">
                                                      <input name="terminos${i}" id="terminos${i}" type="checkbox" class="form-check-input" value="${bellsData[i].terminos}" required> 
                                                      <label class="form-check-label" for="invalidCheck">
                                                          Acepto los terminos y condiciones
                                                      </label>
                                                      <div class="invalid-feedback">
                                                          Aun no has aceptado los terminos y condiciones.
                                                      </div>
                                                  </label>
                                              </div>
                                              <small class="form-text text-muted">Al aceptar, aceptas que los datos suministrados se usaran para realizar campañas publicitarias y marketing digital mediante el envio de mensajes de texto, email y notificaciones push a los dispositivos asociados con la app Token App, y el uso de los mismos para estudio.</small>
                                          </div>
                                      </div>
                                  </label>

                                  <div class="position-relative row form-group"><label for="Nombre" class="col-sm-4 col-form-label"></label>
                                      <div class="col-sm-8">
                                          ${formatArray}
                                          <div class="invalid-feedback" id="validlistuser${i}">
                                          </div>
                                      </div>
                                  </div>
                                  <div class="position-relative row form-group"><label for="Nombre" class="col-sm-4 col-form-label"></label>
                                      <div class="col-sm-8">
                                      <input type="text" name="fk_business${i}" id="fk_business${i}" value="${bellsData[i].fk_business}" style="display:none">
                                          <div class="invalid-feedback">
                                              Error en ID.
                                          </div>
                                      </div>
                                  </div>

                                  <div id="errorcampana">
                                  </div>

                                  <div id="errorcampana${i}">
                                  </div>

                                  <div class="position-relative row form-check">
                                      <div class="col-sm-10 offset-sm-2">
                                          <input name="bellid${i}" id="bellid${i}" value="${bellsData[i]._id}" style="display:none">
                                          <button class="btn btn-primary"  id="savecampanas${i}" onclick="editBell(${i})" type="submit">Actualizar Campañas</button>
                                      </div>
                                  </div>
                              </form>  
                            </div>
                          </div> 
                        </div>
                        <!--lista de usuario--->
                        <div class="col-md-6">
                            <div class="main-card mb-3 card"> 

                                <div class="card-header">
                                    <i class="header-icon lnr-license icon-gradient bg-plum-plate"> </i>Usuario para la Campaña
                                    <div class="btn-actions-pane-right">
                                        <div role="group" class="btn-group-sm nav btn-group">
                                            <a data-toggle="tab" href="#userlist2" class="btn-shadow active btn btn-primary">Listas</a>
                                            <a data-toggle="tab" href="#createuserlist2" class="btn-shadow   btn btn-primary">Crear Lista</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-content">
                                    <!-- user lista --> 
                                    <div class="tab-pane tabs-animation fade show active" id="userlist2" role="userlist2">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="main-card mb-12 card">
                                                    <!-- lista de usuarios -->
                                                    <div class="segmentsUserData2" class="accordion-wrapper mb-3">
                                                        <div class="card">
                                                            <div id="headingOne" class="card-header">
                                                                <button type="button" data-toggle="collapse" data-target="#collapseTwo1" aria-expanded="true" aria-controls="collapseTwo" class="text-left m-0 p-0 btn btn-link btn-block">
                                                                    <h5 class="m-0 p-0">No tiene listas</h5>
                                                                </button>
                                                            </div>
                                                            <div data-parent=".segmentsUserData2" id="collapseTwo1" aria-labelledby="headingOne" class="collapse show">
                                                                <div class="card-body">---
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                    <!-- crear user lets -->
                                    <div class="tab-pane tabs-animation fade show " id="createuserlist2" role="createuserlist2">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="main-card mb-12 card">
                                                    <div class="card-body">
                                                        <!-- <h5 class="card-title">Crear Lista de Usuarios</h5> -->
                                                        <div class="col-md-12 mb-12">
                                                            <!-- <label for="search">Username</label> -->
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="validationTooltipUsernamePrepend">
                                                                        <i class="fa fa-search icon-gradient bg-sunny-morning"> </i>
                                                                    </span>
                                                                </div>
                                                                <input type="text" class="form-control" id="searchinputuseractive${i}" placeholder="Buscar usuario activo por nombre, email ..." aria-describedby="validationTooltipUsernamePrepend" required>
                                                                <div class="invalid-tooltip">
                                                                    Please choose a unique and valid username.
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="main-card mb-12 card">
                                                        
                                                            <!-- Active Users --> 
                                                            <div class="table-responsive">
                                                                <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Nombre</th>
                                                                        <th class="text-center">Ciudad</th>
                                                                        <th class="text-center">Genero</th>
                                                                        <th class="text-center">Edad</th>
                                                                        <th class="text-center">Action</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody id="userActivos2">
                                                                    <tr>
                                                                        <td>
                                                                            <div class="widget-content p-0">
                                                                                <div class="widget-content-wrapper">
                                                                                    <div class="widget-content-left mr-3">
                                                                                        <div class="widget-content-left">
                                                                                            <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="widget-content-left flex2">
                                                                                        <div class="widget-heading">---- ----</div>
                                                                                        <div class="widget-subheading opacity-7">--- ---</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td class="text-center">---</td>
                                                                        <td class="text-center">---</td>
                                                                        <td class="text-center">---</td>
                                                                        <td class="text-center text-muted">
                                                                            <div class="switch-animate switch-off">
                                                                                <input type="checkbox" data-toggle="toggle" data-onstyle="success">
                                                                            </div>
                                                                        </td>
                                                                    </tr> 
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="d-block text-center card-footer">
                                                                <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> -->
                                                                <button class="btn-wide btn btn-success" onclick="saveListUser()">Guardar lista</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div> 

                      </div> 
                    </div>

                    <div class="d-block text-right card-footer">
                      <div id="errorcampanabuton${i}" class="btn-shadow mr-3 btn">
                      </div>
                      <button type="button" data-toggle="collapse" class="btn btn-primary" onclick="testCampana(${bellsData[i]._id})">Testear Campaña</button>
                      ${defaultItem(bellsData[i].defaultvalue, bellsData[i]._id, i)}
                      <button type="button" data-toggle="collapse" href="#editar${i}" class="btn btn-warning" onclick="showEdit(${i})">Editar</button>
                    </div>  
                  </div> 
              </div>  
          </div> 
      </div> 
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
/**
*  MODALES PARA CONFIRMACION
*/
  function modalDialogConfirm(origin){

    var body = '';

    if(origin == 'savelistuser'){
      body = `
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Nombre de la Lista</label>
                  <input type="text" class="form-control" id="modalNameList" required autofocus>
                </div> 
              </form>
              `;
      // <div class="form-group">
      //   <label for="message-text" class="col-form-label">Message:</label>
      //   <textarea class="form-control" id="message-text"></textarea>
      // </div>
    }

    document.getElementById("modals").innerHTML = `
      <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirma que deseas guardar los cambios?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="modalalert"></div>
              ${body}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="saveFromModal">Guardar</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    // console.log(document.getElementById("modals"))

    $('#myModal').on('shown.bs.modal', function () {
      // $('#myInput').trigger('focus')
    })
    $('#myModal').modal('show')
      
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
