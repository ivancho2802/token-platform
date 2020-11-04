/**
*  FUNCIONES AUXILIARES DE TAVLAS GENERANDO CONTENUIDO
*/   
  // bellsData CUENTAScampañas
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
    function configButtonBell(idbell, tested, index){
      return !tested ? `
                    <button type="button" data-toggle="collapse" class="btn btn-primary" disabled>Testear Campaña</button>
                    `: `
                    <button type="button" type="button" data-toggle="collapse" href="#editar${index}" class="btn btn-primary" onclick="showEdit(${index})">Testear Campaña</button>
                    `;
    }

    var container="" , 

    eltr;
    var formatArray ="", fk_sms_content_edit = "", fk_email_plantilla_subject = "", fk_email_plantilla_text = "",
fk_email_plantilla_html = "", fk_notification_content_data = "", fk_notification_content_title="", 
fk_notification_content_text ="", fk_notification_content_icon="", numSms=0,numEmail=0, saldoTotal=0, 
saldoTotalRestante=0, pvsms=0, pvemail=0, tested, idbell;

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
        // CONTENIDO
          fk_sms_content_edit = "";
          fk_email_plantilla_subject = "";
          fk_email_plantilla_text = "";
          fk_email_plantilla_html = "";
          fk_notification_content_data = "";
          fk_notification_content_title = "";
          fk_notification_content_text = "";
          fk_notification_content_icon = ""; 
          fk_sms_content_edit = bellsData[i].fk_sms_content ? bellsData[i].fk_sms_content : "";//fk_sms_content_edit${i}
          if(bellsData[i].fk_email_plantilla){
            fk_email_plantilla_subject = JSON.parse(bellsData[i].fk_email_plantilla).subject ? JSON.parse(bellsData[i].fk_email_plantilla).subject : "";//message-email-subject-edit${i}
            fk_email_plantilla_text = JSON.parse(bellsData[i].fk_email_plantilla).text ? JSON.parse(bellsData[i].fk_email_plantilla).text : "";//message-email-text-edit${i}
            fk_email_plantilla_html = JSON.parse(bellsData[i].fk_email_plantilla).html ? JSON.parse(bellsData[i].fk_email_plantilla).html : "";//message-email-html-edit${i}
          }
          if(bellsData[i].fk_notification_content){
            fk_notification_content_data = JSON.parse(bellsData[i].fk_notification_content).data ? JSON.parse(bellsData[i].fk_notification_content).data.toString() : "";//message-noty-data-edit${i}
            fk_notification_content_title = JSON.parse(bellsData[i].fk_notification_content).title ? JSON.parse(bellsData[i].fk_notification_content).title : "";//message-noty-data-edit${i}
            fk_notification_content_text = JSON.parse(bellsData[i].fk_notification_content).text ? JSON.parse(bellsData[i].fk_notification_content).text : "";//message-noty-data-edit${i}
            fk_notification_content_icon = JSON.parse(bellsData[i].fk_notification_content).icon ? JSON.parse(bellsData[i].fk_notification_content).icon : "";//message-noty-data-edit${i}
          
            //console.log("JSON.parse(bellsData[i].fk_notification_content).data")
            //console.log(JSON.parse(bellsData[i].fk_notification_content).data.toString())
          }
        // ALCANCE

        // REVISION

        tested = !bellsData[i].tested ? 'disabled': '';
        idbell = bellsData[i]._id

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
                        <div class="col-md-12">
                          <div class="main-card mb-12 card">
                            <div class="card-body">

                              <h5 class="card-title">Editar Campaña</h5>

                              <ul class="tabs-animated-shadow tabs-animated nav">
                                  <li class="nav-item">
                                      <a role="tab" class="nav-link active" id="tab-e-1" data-toggle="tab" href="#campanassegmentoedit${i}">
                                          <span>Segmento de Usuarios</span>
                                      </a>
                                  </li>
                                  <li class="nav-item">
                                      <a role="tab" class="nav-link" id="tab-e-2" data-toggle="tab" href="#campanascontentedit${i}">
                                          <span>Contenido de las Campañas</span>
                                      </a>
                                  </li>
                                  <li class="nav-item">
                                      <a role="tab" class="nav-link" id="tab-e-3" data-toggle="tab" href="#campanasalcanceedit${i}">
                                          <span>Alcance</span>
                                      </a>
                                  </li>
                                  <li class="nav-item">
                                      <a role="tab" class="nav-link ${tested}" id="tab-e-4" data-toggle="tab" href="#campanasrevisionedit${i}">
                                          <span>Revision - (${tested ? 'Testeada': 'opcional'} )</span>
                                      </a>
                                  </li>
                                  <li class="nav-item">
                                      <a role="tab" class="nav-link " id="tab-e-0" data-toggle="tab" href="#campanasdataedit${i}">
                                          <span>Datos de la Campañas - Guardar Todo</span>
                                      </a>
                                  </li>
                              </ul>

                              <form  class="needs-validation" novalidate  action="#formbelleditar${i}" method="post"  id="formbelleditar${i}">
                                <div class="tab-content">

                                  <!-- SEGMENTO DE USUARIO -->

                                  <div class="tab-pane active" id="campanassegmentoedit${i}" role="tabpanel">

                                    <div class="card-header">
                                        <i class="header-icon lnr-license icon-gradient bg-plum-plate"> </i>SEGMENTO DE USUARIO
                                        <div class="btn-actions-pane-right">
                                            <div role="group" class="btn-group-sm nav btn-group">
                                                <a data-toggle="tab" href="#userlist2${i}" class="btn-shadow active btn btn-primary">Listas</a>
                                                <a data-toggle="tab" href="#createuserlist2${i}" class="btn-shadow   btn btn-primary">Crear Lista</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-content">
                                        <!-- user lista SEGMENTOS--> 
                                        <div class="tab-pane tabs-animation fade show active" id="userlist2${i}" role="userlist2">
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

                                        <!-- crear user SEGMENTOS -->
                                        <div class="tab-pane tabs-animation fade show " id="createuserlist2${i}" role="createuserlist2">
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

                                                                    <input type="number" min="0" class="form-control" id="searchedadmenor${i}" placeholder="Edad Menor ..." aria-describedby="validationTooltipUsernamePrepend" onkeyup="searchsegmentedit(${i})">

                                                                    <input type="number" min="0" class="form-control" id="searchedadmayor${i}" placeholder="Edad Mayor ..."  aria-describedby="validationTooltipUsernamePrepend" onkeyup="searchsegmentedit(${i})">

                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-primary" type="button" onclick="searchgeneroedit('male')">Hombre</button>
                                                                    </div>
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-info" type="button" onclick="searchgeneroedit('female')">Mujer</button>
                                                                    </div>
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-warning" type="button" onclick="searchgeneroedit('other')">Otro</button>
                                                                    </div>
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-danger" type="button" onclick="searchgeneroedit('')">Todos</button>
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

                                  <!-- Contenido de las Campañas -->

                                  <div class="tab-pane" id="campanascontentedit${i}" role="tabpanel">
                                      <div class="col-md-12">
                                          <!-- <div class="main-card mb-12 card">  -->

                                              <div class="card-header">
                                                  <i class="header-icon lnr-license icon-gradient bg-plum-plate"> </i>
                                                  Contenido de las Campañas
                                                  <div class="btn-actions-pane-right">
                                                      <div role="group" class="btn-group-sm nav btn-group" id="tabContenido">
                                                          <a data-toggle="tab" href="#smsedit${i}" class="btn-shadow active btn btn-primary" id="tabcontedit0${i}">Mensaje</a>
                                                          <a data-toggle="tab" href="#emailedit${i}" class="btn-shadow   btn btn-primary" id="tabcontedit1${i}">Email</a>
                                                          <a data-toggle="tab" href="#notiedit${i}" class="btn-shadow   btn btn-primary" id="tabcontedit2${i}">Notificacion</a>
                                                      </div>
                                                  </div>
                                              </div>

                                              <div class="tab-content">
                                                  
                                                  <!-- Mensaje --> 
                                                  <div class="tab-pane tabs-animation fade show active" id="smsedit${i}" role="smsedit${i}">
                                                      <div class="card-body">
                                                          <!-- <h5 class="card-title">Bootstrap 4 Form Validation</h5> -->
                                                          <div class="form-grid">
                                                              <div class="form-row">
                                                                  <div class="col-md-12 mb-6">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Contenido del Mensage de texto:</label>
                                                                          <textarea class="form-control" id="fk_sms_content_edit${i}">${fk_sms_content_edit}</textarea>
                                                                      </div>
                                                                  </div>  
                                                              </div> 
                                                              <button class="btn btn-primary" type="button" onclick="nextItemContenidoedit(0, ${i})">Guardar Mensaje</button>
                                                          </div> 
                                                      </div>
                                                  </div>
                                                  <!-- Email --> 
                                                  <div class="tab-pane tabs-animation fade show " id="emailedit${i}" role="emailedit${i}">
                                                      <div class="card-body">
                                                          <!-- <h5 class="card-title">Bootstrap 4 Form Validation</h5> -->
                                                          <div class="form-grid">
                                                              <div class="form-row">
                                                                  <div class="col-md-4 mb-4">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Tema Asunto:</label>
                                                                          <input class="form-control" id="message-email-subject-edit${i}" value="${fk_email_plantilla_subject}">
                                                                      </div>  
                                                                  </div> 
                                                                  <div class="col-md-12 mb-12">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Texto:</label>
                                                                          <textarea class="form-control" id="message-email-text-edit${i}">${fk_email_plantilla_text}</textarea>
                                                                      </div>
                                                                  </div> 
                                                                  <div class="col-md-12 mb-12">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Texto Html:</label>
                                                                          <textarea class="form-control" id="message-email-html-edit${i}" >${fk_email_plantilla_html}</textarea>
                                                                      </div>
                                                                  </div>  
                                                              </div> 
                                                              <button class="btn btn-primary" type="button" onclick="nextItemContenidoedit(1, ${i})">Guardar Email</button>
                                                          </div> 
                                                      </div>
                                                  </div>
                                                  <!-- Notificacion --> 
                                                  <div class="tab-pane tabs-animation fade show " id="notiedit${i}" role="notiedit${i}">
                                                      <!-- <div class="card-body"> -->
                                                          <!-- <h5 class="card-title">Bootstrap 4 Form Validation</h5> -->
                                                          <div class="form-grid">
                                                              <div class="form-row">
                                                                  <div class="col-md-4 mb-4">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Ruta al acceder a la Notificacion:</label>
                                                                          <input class="form-control" id="message-noty-data-edit${i}" value="'${fk_notification_content_data}'">
                                                                      </div>  
                                                                  </div> 
                                                                  <div class="col-md-4 mb-4">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Titulo:</label>
                                                                          <input class="form-control" id="message-noty-title-edit${i}" value="${fk_notification_content_title}">
                                                                      </div>
                                                                  </div> 
                                                                  <div class="col-md-4 mb-4">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Icono:</label>
                                                                          <input class="form-control" id="message-noty-icon-edit${i}" value="${fk_notification_content_icon}">
                                                                      </div>
                                                                  </div>  
                                                                  <div class="col-md-12 mb-12">
                                                                      <div class="form-group">
                                                                          <label for="message-text-edit${i}" class="col-form-label">Texto:</label>
                                                                          <textarea class="form-control" id="message-noty-text-edit${i}" >${fk_notification_content_text}</textarea>
                                                                      </div>
                                                                  </div> 
                                                              </div> 
                                                              <button class="btn btn-primary" type="button" onclick="nextItemContenidoedit(2, ${i})">Guardar Notificacion</button>
                                                          </div> 
                                                      <!-- </div> -->
                                                  </div>
                                              </div>

                                          <!-- </div> -->
                                      </div> 
                                  </div>

                                  <!-- ALCANCE -->

                                  <div class="tab-pane" id="campanasalcanceedit${i}" role="tabpanel">
                                      <div class="col-md-12">

                                          <div class="card-header"> 
                                              <button class="btn-shadow mr-3 btn btn-alternate" data-toggle="tooltip" data-placement="top" title="Para recargar pulsa en recargar y luego destina tu recarga a la campaña">
                                                  <i class="fa pe-7s-info text-white "></i>
                                                  Disponibildad:  
                                              </button>

                                              <button type="button" class="btn-shadow mr-3 btn btn-success" data-toggle="tooltip" data-placement="top" title="Mensajes de texto disponibles para las campañas">
                                                  <i class="fa fa-phone text-white "></i>
                                                  Mensajes:
                                                  <span class="numSms"> 0</span> 
                                              </button>  

                                              <button type="button" class="btn-shadow mr-3 btn btn-success"data-toggle="tooltip" data-placement="top" title="Correos disponibles para las campañas">
                                                  <span class="text-white">
                                                      <i class="fa pe-7s-mail text-white "></i>
                                                      Emails: 
                                                      <span class="numEmail"> 0</span>
                                                  </span>
                                              </button>  

                                              <button type="button" class="btn-shadow mr-3 btn btn-success" >

                                                  <span class="text-white">
                                                      <i class="fa pe-7s-refresh-2 text-white "></i>
                                                      Saldo para Recargar Sms y Emails: 
                                                      <span class="saldoTotal"> 0</span>
                                                  </span>
                                              </button>  
                                          </div>

                                          <div class="tab-content">
                                              <div class="tab-pane tabs-animation fade show active" id="smsedit${i}" role="smsedit${i}"> 
                                                  <!-- <div class="card-body"> -->
                                                      <div class="form-grid">
                                                          <div class="form-row">
                                                              <div class="col-md-6 mb-6">
                                                                  <label for="numSmsBelledit${i}">
                                                                      <div class="font-icon-wrapper font-icon-lg"><i class="fa fa-phone icon-gradient bg-night-fade"> </i></div>
                                                                          Numero de Mensajes de Texto SMS
                                                                  </label>
                                                                  <input name="numSmsBelledit${i}" id="numSmsBelledit${i}" onkeyup="calcSaldoRestanteedit(${i})" placeholder="Numero de Mensajes de Texto SMS" type="number" min="0" class="form-control" required>
                                                                  <div class="valid-feedback">
                                                                      Bien!
                                                                  </div>
                                                                  <div class="invalid-feedback">
                                                                      Por favor ponga un numero correcto.
                                                                  </div>
                                                              </div>
                                                              <div class="col-md-6 mb-6">
                                                                  <label for="numEmailBelledit${i}">  
                                                                      <div class="font-icon-wrapper font-icon-lg"><i class="fa pe-7s-mail icon-gradient bg-night-fade"> </i></div>
                                                                          Numero de Correos
                                                                  </label>
                                                                  <input name="numEmailBelledit${i}" id="numEmailBelledit${i}" onkeyup="calcSaldoRestanteedit(${i})" placeholder="Numero de Correos" type="number" min="0" class="form-control" required>
                                                                  <div class="valid-feedback">
                                                                      Bien!
                                                                  </div>
                                                                  <div class="invalid-feedback">
                                                                      Por favor ponga un numero correcto.
                                                                  </div>
                                                              </div>
                                                              <input type="hidden" name="pvemail"  >
                                                              <input type="hidden" name="pvsms"   >
                                                              <div class="card-footer text-center"> 
                                                                      <label class="btn-shadow mr-3 btn btn-success" id="saldoTotalRestanteBotonedit${i}">
                                                                          <span class="text-white">
                                                                              <i class="fa pe-7s-refresh-2 text-white "></i>
                                                                              Saldo Restante: 
                                                                              <span id="saldoTotalRestante"> 0</span>
                                                                          </span>
                                                                      </label>  
                                                                      <label class="btn-shadow mr-3 btn btn-success" >
                                                                          <span class="text-white">
                                                                              <i class="fa pe-7s-refresh-2 text-white "></i>
                                                                              Saldo Estimado: 
                                                                              <span id="saldoEstimadoedit${i}"> 0</span>
                                                                          </span>
                                                                      </label>  
                                                              </div>
                                                          </div>
                                                      </div>
                                                  <!-- </div> -->
                                              </div>
                                          </div>

                                      </div>
                                  </div>

                                  <!-- REVISION -->

                                  <div class="tab-pane" id="campanasrevisionedit${i}" role="tabpanel">
                                      <div class="card-body"><h5 class="card-title">Revision - agrega un correo y un telefono para testear</h5>
                                          <div class="form-grid">
                                              <div class="form-row position-relative row form-group">
                                                  <div class="col-md-6 mb-6">
                                                      <label for="teltestedit${i}">Numero de telefono para testear</label>
                                                      <input name="teltestedit${i}" autocomplete="on" id="teltestedit${i}" placeholder="Numero de telefono para testear 57312..." type="tel" class="form-control">
                                                      <div class="valid-feedback">
                                                          Bien!
                                                      </div>
                                                      <div class="invalid-feedback">
                                                          Por favor ponga un telefono.
                                                      </div>
                                                  </div> 
                                                  <div class="col-md-6 mb-6">
                                                      <label for="emailtestedit${i}">Email para testear</label>
                                                      <input name="emailtestedit${i}" autocomplete="on" id="emailtestedit${i}" placeholder="Email para testear" type="email" class="form-control">
                                                      <div class="valid-feedback">
                                                          Bien!
                                                      </div>
                                                      <div class="invalid-feedback">
                                                          Por favor ponga un email.
                                                      </div>
                                                  </div> 
                                              </div>

                                              <div class="form-row">
                                                <button type="button" id="buttontest${i}" class="mb-2 mr-2 btn btn-primary btn-lg btn-block" onclick="testbellbyreq(null, null, '${idbell}','${i}')">Enviar test</button>
                                              </div>

                                              <div class="form-row" id="smstest${i}">

                                              </div>


                                          </div>

                                      </div>
                                  </div> 

                                  <!-- Crear Campaña -->
                                  <div class="tab-pane" id="campanasdataedit${i}" role="tabpanel">
                                    <div class="card-body"><h5 class="card-title">Crear Campaña</h5>
                                        
                                        <div class="form-grid">
                                            <div class="form-row">

                                              <div class="col-md-6 mb-6">
                                                <label for="Nombre">Nombre</label>
                                                <input name="name${i}" id="name${i}" placeholder="Nombre de la campaña" type="text" class="form-control" value="${bellsData[i].name}" required>
                                                <div class="valid-feedback">
                                                    Bien!
                                                </div>
                                                <div class="invalid-feedback">
                                                    Por favor ponga un nombre.
                                                </div>
                                              </div>  

                                              <div class="col-md-6 mb-6">
                                                  <label for="examplePassword">Fecha</label>
                                                  <input name="datetime_campana${i}" id="datetime_campana${i}"  placeholder="datetime-campana" type="datetime-local" value="${bellsData[i].date.slice(0, -1)}" class="form-control" required>
                                                  <div class="valid-feedback">
                                                      Bien!
                                                  </div>
                                                  <div class="invalid-feedback">
                                                      Por favor ponga una fecha.
                                                  </div>
                                              </div>
                                            </div>

                                            <div class="form-row">

                                              <div class="col-sm-4 col-md-3 form-group">
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

                                                <div class="col-sm-4 col-md-3 form-group">
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

                                                <div class=" form-group col-sm-4 col-md-3  ">
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

                                                <div class="col-sm-4 col-md-3  form-group">
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
                                                                <input name="terminos${i}" id="terminos${i}" type="checkbox" class="form-check-input" value="terminos${i}" required> 
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
                                                    <input type="text" name="fk_business${i}" id="fk_business${i}" value="${bellsData[i].fk_business}" style="display:none">
                                                    <div class="invalid-feedback">
                                                        Error en ID.
                                                    </div>
                                                </div>
                                            </div>

                                            <!--  v fk_bell_user_list  v -->
                                            <div class="position-relative row form-group">
                                                <label for="Nombre" class="col-sm-4 col-form-label"></label>
                                                <div class="col-sm-8">
                                                    ${formatArray}
                                                    <div id="validlistuser${i}" style="color:red">
                                                    </div>
                                                </div>
                                            </div>
                                            <!--  ^ fk_bell_user_list  ^ -->

                                            <div id="errorcampana${i}">
                                            </div> 

                                            <div class="position-relative row form-check">
                                                <div class="col-sm-10 offset-sm-2">
                                                    <input name="bellid${i}" id="bellid${i}" value="${bellsData[i]._id}" style="display:none">
                                                    <button class="mb-2 mr-2 btn btn-primary btn-lg btn-block"  id="editcampanas${i}" onclick="editBell(${i})" type="submit">Actualizar Campañas</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                </div> 
                              </form> 
                            </div>
                          </div> 
                        </div> 

                      </div> 
                    </div>

                    <div class="d-block text-right card-footer">
                      <div id="errorcampanabuton${i}" class="btn-shadow mr-3 btn">
                      </div>
                      ${configButtonBell(bellsData[i]._id, bellsData[i].tested, i)}
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
  function getTableUsersActSelect (usersData, cities, autoselect){

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
                </div>
              </div>
            </div>
          </td>
          <td class="text-center">${cityaux}</td>
          <td class="text-center">${genereaux}</td>
          <td class="text-center">${edad}</td>
          <td class="text-center text-muted">
            <div class="switch-animate switch-off">
               <input type="checkbox" name="userlistnew" data-toggle="toggle" data-onstyle="success" value="${userArray[i]._id}" ${autoselect ? "checked='true'":''} >
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
      <div class="card" id="sementuser${i}">
          <div id="heading${i}" class="card-header">
              <button type="button" data-toggle="collapse" data-target="#collapseOne${i}" aria-expanded="true" aria-controls="collapse${i}" class="text-left m-0 p-0 btn btn-link">
                  <h5 class="m-0 p-0">${usersSegmentData[i].name}  </h5>
              </button>

              <div class="btn-actions-pane-right">
                  <div class="nav">
                      <div id="errorcampanasegmentdeletebuton${i}" class="btn-shadow mr-3 btn">
                      </div>
                      <button class="btn-pill btn-wide btn btn-outline-danger btn-sm"  onclick="deleteSegment('${usersSegmentData[i]._id}', ${i}, '')"  data-toggle="modal" data-target="#modalTokens">
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
  function getTableUsersActSegmentSelect2 (usersSegmentData, cities, index){

    var userArray=[];

    var container="" , eltr , elheadlist, edad, currentdateyear = new Date().getFullYear(), genere = {male : "Hombre", female: "Mujer"}, genereaux, cityaux;
    if(!usersSegmentData.length || !cities.length)
      return '<div class="d-block text-center card-footer">No se encontraron Listas</div>';
    for (var i = 0; i < usersSegmentData.length; i++) {
      userArray = usersSegmentData[i] ? usersSegmentData[i].fk_user : [];

      elheadlist = '';
      elheadlist = `
      <div class="card" id="sementuser${i}${index}">
          <div id="heading${i}" class="card-header">
              <button type="button" data-toggle="collapse" data-target="#collapseTwo${i}" aria-expanded="true" aria-controls="collapse${i}" class="text-left m-0 p-0 btn btn-link">
                  <h5 class="m-0 p-0">${usersSegmentData[i].name}  </h5>
              </button>

              <div class="btn-actions-pane-right">
                  <div class="nav">
                      <div id="errorcampanasegmentdeletebuton${i}${index}" class="btn-shadow mr-3 btn">
                      </div>
                      <button class="btn-pill btn-wide btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#modalTokens" onclick="deleteSegment('${usersSegmentData[i]._id}', ${i}, ${index})">
                        <i class="pe-7s-trash text-danger"></i>
                        Eliminar 
                      </button>
                      <button class="btn-pill btn-wide mr-1 ml-1  btn btn-outline-alternate btn-sm">
                        <input type="checkbox" name="segmentlistnew2${index}" data-toggle="toggle" data-onstyle="success" value="${usersSegmentData[i]._id}" >
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
/**
*  FUNCIOND DE INTERACCION ENFORMULARIOS
*/
  // funcion que calcula el saldo restante en alcance
  function calcSaldoRestante(){  

    var numsms=0, numeemail=0, saldorestante=0, pvemail=1, pvsms=1, saldototal=unFormat(document.getElementById("saldoTotal").innerHTML), saldoestimado=0;
    numsms = document.getElementById("numSmsBellCreate").value ? document.getElementById("numSmsBellCreate").value : 0;
    numeemail = document.getElementById("numEmailBellCreate").value ? document.getElementById("numEmailBellCreate").value : 0;
    saldoestimado = ((pvemail*numeemail) + (pvsms*numsms))
    saldorestante = saldototal - saldoestimado;
    document.getElementById("saldoTotalRestante").innerHTML = format(saldorestante)
    if(saldorestante<0){
      document.getElementById("saldoTotalRestanteBotoncreate").classList.remove("btn-success");
      document.getElementById("saldoTotalRestanteBotoncreate").classList.add("btn-danger");
    } else{
      document.getElementById("saldoTotalRestanteBotoncreate").classList.remove("btn-danger");
      document.getElementById("saldoTotalRestanteBotoncreate").classList.add("btn-success");
    }
    document.getElementById("saldoEstimado").innerHTML = format(saldoestimado)
  }
  // en el formulario de segm,entos para buscar de enrto los usuarios de las listas
  function searchsegmentcreate(){

    var searchedadmenor = document.getElementById('searchedadmenor').value ? document.getElementById('searchedadmenor').value: 0,
    searchedadmayor = document.getElementById('searchedadmayor').value ? document.getElementById('searchedadmayor').value: 0,
    usersDataSeached = {}, fk_user_asocd_sechaded =[]

    companier.clients(JSON.parse($.cookie("userData"))._id)
    .then((usersData)=> {
        //cities
        companier.cities()
        .then((citiesData2)=> {
          console.log(usersData)
          console.log(citiesData2)

          if((searchedadmenor==0 && searchedadmayor==0)){
            document.getElementById("userActivos").innerHTML = getTableUsersActSelect(usersData, citiesData2, true)
            return
          }

          for (var i = 0; i < usersData.fk_user_asocd.length; i++) {
            var edad = usersData.fk_user_asocd[i] ? usersData.fk_user_asocd[i].fecha_nac ? getEdad(usersData.fk_user_asocd[i].fecha_nac): "": "";
            if(searchedadmayor==0 && edad >= searchedadmenor)
              fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            if(searchedadmenor==0 && edad <= searchedadmayor)
              fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            else if(edad >= searchedadmenor && edad <= searchedadmayor)
              fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
          }
          usersDataSeached = {
            fk_user: usersData.fk_user,
            fk_user_asocd: fk_user_asocd_sechaded,
            mode: usersData.mode,
            status: usersData.status,
            update_date: usersData.update_date
          }
          document.getElementById("userActivos").innerHTML = getTableUsersActSelect(usersDataSeached, citiesData2, true) 
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
  }
  // en el formulario de la lista de los usuario solo sekleccionar a lo po gnero
  function searchgenerocreate(genero){
    var generol, fk_user_asocd_sechaded =[]

    companier.clients(JSON.parse($.cookie("userData"))._id)
    .then((usersData)=> {
        //cities
        companier.cities()
        .then((citiesData2)=> {
          console.log(usersData)
          console.log(citiesData2)

          if((genero=='')){
            document.getElementById("userActivos").innerHTML = getTableUsersActSelect(usersData, citiesData2, true)
            return
          }

          for (var i = 0; i < usersData.fk_user_asocd.length; i++) {
            var generol = usersData.fk_user_asocd[i] ? usersData.fk_user_asocd[i].genero : "";

            if(genero=="female" || genero=="male"){
              if( generol == genero)
                fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            }else{
              if(generol!=="female" && generol!=="male")
                fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            }
          }
          usersDataSeached = {
            fk_user: usersData.fk_user,
            fk_user_asocd: fk_user_asocd_sechaded,
            mode: usersData.mode,
            status: usersData.status,
            update_date: usersData.update_date
          }
          document.getElementById("userActivos").innerHTML = getTableUsersActSelect(usersDataSeached, citiesData2, true) 
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
  }
  //MODALES PARA CONFIRMACION
  function modalDialogConfirmSegment(origin){

    var body = '', footer='', head = '';
    console.log(origin)
    if(origin == 'savelistuser'){
      head = `¿Confirma que deseas guardar los cambios?`;
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
      footer = `
      <button type="button" class="btn btn-primary" id="saveFromModal" data-dismiss="modal">Guardar</button>
      `;
    }else if(origin == 'editlistuser'){
      head = `¿Confirma que deseas eliminar el segmento?`;
      footer = `
      <button type="button" class="btn btn-danger" id="editFromModal" data-dismiss="modal">Eliminar</button>
      `;
    }

    document.getElementById("modalTokensContent").innerHTML = ` 
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${head}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="modalalert"></div>
              ${body}
            </div>
            <div class="modal-footer">
              ${footer}
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div> 
    `;
    // console.log(document.getElementById("modals"))

    // $('#myModal').on('shown.bs.modal', function () {
    //   // $('#myInput').trigger('focus')
    // })
    // $('#myModal').modal('show')
  }
  ////////////////////////////
  function searchsegmentedit(index){

    var searchedadmenor = document.getElementById('searchedadmenoredit'+index).value ? document.getElementById('searchedadmenoredit'+index).value: 0,
    searchedadmayor = document.getElementById('searchedadmayoredit'+index).value ? document.getElementById('searchedadmayoredit'+index).value: 0,
    usersDataSeached = {}, fk_user_asocd_sechaded =[]

    companier.clients(JSON.parse($.cookie("userData"))._id)
    .then((usersData)=> {
        //cities
        companier.cities()
        .then((citiesData2)=> {
          console.log(usersData)
          console.log(citiesData2)

          if((searchedadmenor==0 && searchedadmayor==0)){
            document.getElementById("userActivos2").innerHTML = getTableUsersActSelect(usersData, citiesData2, true)
            return
          }

          for (var i = 0; i < usersData.fk_user_asocd.length; i++) {
            var edad = usersData.fk_user_asocd[i] ? usersData.fk_user_asocd[i].fecha_nac ? getEdad(usersData.fk_user_asocd[i].fecha_nac): "": "";
            if(searchedadmayor==0 && edad >= searchedadmenor)
              fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            if(searchedadmenor==0 && edad <= searchedadmayor)
              fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            else if(edad >= searchedadmenor && edad <= searchedadmayor)
              fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
          }
          usersDataSeached = {
            fk_user: usersData.fk_user,
            fk_user_asocd: fk_user_asocd_sechaded,
            mode: usersData.mode,
            status: usersData.status,
            update_date: usersData.update_date
          }
          document.getElementById("userActivos2").innerHTML = getTableUsersActSelect(usersDataSeached, citiesData2, true) 
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
  }
  // en el formulario de la lista de los usuario solo sekleccionar a lo po gnero
  function searchgeneroedit(genero){
    var generol, fk_user_asocd_sechaded =[]

    companier.clients(JSON.parse($.cookie("userData"))._id)
    .then((usersData)=> {
        //cities
        companier.cities()
        .then((citiesData2)=> {
          console.log(usersData)
          console.log(citiesData2)

          if((genero=='')){
            document.getElementById("userActivos2").innerHTML = getTableUsersActSelect(usersData, citiesData2, true)
            return
          }

          for (var i = 0; i < usersData.fk_user_asocd.length; i++) {
            var generol = usersData.fk_user_asocd[i] ? usersData.fk_user_asocd[i].genero : "";

            if(genero=="female" || genero=="male"){
              if( generol == genero)
                fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            }else{
              if(generol!=="female" && generol!=="male")
                fk_user_asocd_sechaded.push(usersData.fk_user_asocd[i])
            }
          }
          usersDataSeached = {
            fk_user: usersData.fk_user,
            fk_user_asocd: fk_user_asocd_sechaded,
            mode: usersData.mode,
            status: usersData.status,
            update_date: usersData.update_date
          }
          document.getElementById("userActivos2").innerHTML = getTableUsersActSelect(usersDataSeached, citiesData2, true) 
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
  }
  // funcion que calcula el saldo restante en alcance
  function calcSaldoRestanteedit(index){

    var numsms=0, numeemail=0, saldorestante=0, pvemail=1, pvsms=1, saldototal=unFormat(document.getElementById("saldoTotal"+index).innerHTML), saldoestimado=0;
    numsms = document.getElementById("numSmsBelledit"+index).value ? document.getElementById("numSmsBelledit"+index).value : 0;
    numeemail = document.getElementById("numEmailBelledit"+index).value ? document.getElementById("numEmailBelledit"+index).value : 0;
    saldoestimado = ((pvemail*numeemail) + (pvsms*numsms))
    saldorestante = saldototal - saldoestimado;
    document.getElementById("saldoTotalRestante"+index).innerHTML = format(saldorestante)
    if(saldorestante<0){
      document.getElementById("saldoTotalRestanteBotonedit"+index).classList.remove("btn-success");
      document.getElementById("saldoTotalRestanteBotonedit"+index).classList.add("btn-danger");
    } else{
      document.getElementById("saldoTotalRestanteBotonedit"+index).classList.remove("btn-danger");
      document.getElementById("saldoTotalRestanteBotonedit"+index).classList.add("btn-success");
    }
    document.getElementById("saldoEstimadoedit"+index).innerHTML = format(saldoestimado)
  }
/**
*  FUNCIONES DE DINAMISMO DE LA PAGINA
*/
  function positionCorrect(position){
    var element = document.getElementById(position);
    // smooth scroll to element and align it at the bottom
    // console.log(element)
    element.scrollIntoView();//{ behavior: 'smooth', block: 'end'}
  }

  function nextItemContenido(origen){
    var pos = origen+1==3 ? 0 :  origen+1;
    // $('#tabContenido').tab('show')   tabcontcreate1
    console.log('#tabContenido a#tabcontcreate'+pos)
    $('#tabContenido a#tabcontcreate'+pos).tab('show')
  }
  function nextItemContenidoedit(origen, index){
    var pos = origen+1==3 ? 0 :  origen+1;
    // $('#tabContenido').tab('show')   tabcontcreate1
    console.log('#tabContenido a#tabcontedit'+pos+index)
    $('#tabContenido a#tabcontedit'+pos+index).tab('show')
  }



