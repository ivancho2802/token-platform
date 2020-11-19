$( document ).ready(function() {
    if(!(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
        return;
        
    /* new Help().loadbrnachs(); */
    campanier.createOrGetSegment('Fieles')
    campanier.createOrGetSegment('Recurrentes')
    campanier.createOrGetSegment('Potenciales')
    campanier.createOrGetSegment('Rentables')

    var bellData=[], balancesmsemailData
    document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
    document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
    document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image;
    document.getElementById("datetime_campana").value = new Date();
    document.getElementById("fk_business").value = JSON.parse($.cookie("userData"))._id;
    /**
    *   init data de contenido de la campaña
    */
    // SMS
    document.getElementById("fk_sms_content_create").value = JSON.parse($.cookie("business")).nombre+ ': ';
    // EMAIL
    document.getElementById("message-email-subject-create").value = 'Sending with SendGrid test '+JSON.parse($.cookie("business")).nombre;
    document.getElementById("message-email-text-create").value = 'Test de bartertechnology desarrollo ';
    document.getElementById("message-email-html-create").value = '<strong>and easy to do anywhere, even with Node.js</strong>';
    //NOTIFICACION
    document.getElementById("message-noty-data-create").value = JSON.stringify({ href: 'tokens'});
    document.getElementById("message-noty-title-create").value = 'Test de notificacion de Token!';
    document.getElementById("message-noty-text-create").value = 'Token test de campañas';
    document.getElementById("message-noty-icon-create").value = './assets/imgs/logo_token.svg';
    // crear bell createbell
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })(); 
    document.getElementById("formbell").addEventListener('submit', function (event) {  
      var valid = false
      var listasbell = [];
      var els = document.getElementsByName('segmentlistnew');
      for (var i=0;i<els.length;i++){
        if ( els[i].checked ) {
          listasbell.push(els[i].value);
        }
      }

      if(listasbell.length<1){
          document.getElementById("validlistuser").innerHTML = "Debes definir una lista de usuarios."
      }

      valid = document.getElementById("name").value && document.getElementById("datetime_campana").value  && document.getElementById("terminos").value && listasbell.length && document.getElementById("message-email-subject-create").value && document.getElementById("message-email-text-create").value && document.getElementById("message-noty-title-create").value && document.getElementById("message-noty-text-create").value && document.getElementById("message-noty-icon-create").value && unFormat(document.getElementById("saldoEstimado").innerHTML) && document.getElementById("numSmsBellCreate").value && document.getElementById("numEmailBellCreate").value;

      if(!valid)
          return
      document.getElementById("fk_bell_user_list").value=listasbell;

      var post_url = $(this).attr("action"); //get form action url
      var request_method = $(this).attr("method"); //get form GET/POST method
      var form_data = $(this).serializeArray(); //Encode form elements for submission
      event.preventDefault(); //prevent default action 

      var htmlCustom = '';
      //#editorunlayer design-web editor-desktop
      if( document.getElementById('message-email-html-unlayer').checked ){
            
          unlayer.exportHtml(function(data) {
              var json = data.design; // design json
              var html = data.html; // design html
              console.log(json)
              console.log(html)
              // Save the json, or html here
              htmlCustom = html
          });
          /* unlayer.saveDesign(function(design) {
              console.log('design', design);
          }); */ 
      }else{
          htmlCustom = document.getElementById("message-email-html-create").value
      }
      //console.log(htmlCustom)

      var bodyEmail = {
          subject:   document.getElementById("message-email-subject-create").value ,
          text:   document.getElementById("message-email-text-create").value ,
          html:   htmlCustom
      }   

      var bodyNotify = {
          data:   document.getElementById("message-noty-data-create").value ,
          title:   document.getElementById("message-noty-title-create").value ,
          text:document.getElementById("message-noty-text-create").value,
          icon:document.getElementById("message-noty-icon-create").value
      }   

      var body = {
          name: document.getElementById("name").value,
          date: document.getElementById("launch").checked ? document.getElementById("datetime_campana").value: "",
          datecurrentdate: new Date,
          sms: document.getElementById("sms").checked,
          email: document.getElementById("email").checked,
          notipush: document.getElementById("notipush").checked,
          defaultvalue: document.getElementById("defaultvalue").checked,
          terminos: document.getElementById("terminos").checked,
          fk_bell_user_list: listasbell,
          tokenPush: 'localStorage.getItem("tokenPush")',
          platform: 'web',
          role: 8,

          fk_email_plantilla: JSON.stringify(bodyEmail) ,
          fk_sms_content: document.getElementById("fk_sms_content_create").value ,
          fk_notification_content: JSON.stringify(bodyNotify)  
      }
      console.log("body")
      console.log(body)

      bellier.setbell(body)//JSON.parse($.cookie("userData"))._id
      .then((response)=> {
          console.log(response)
          if(response){ 
              // actualizar cuenta de campaña
              seReloadBell(unFormat(document.getElementById("saldoEstimado").innerHTML), document.getElementById("numSmsBellCreate").value, document.getElementById("numEmailBellCreate").value ) 
              // testeo de la campaña alcance
              if(document.getElementById("teltestcreate").value && document.getElementById("emailtestcreate").value){
                testbellbyreq(document.getElementById("teltestcreate").value, document.getElementById("emailtestcreate").value, response.respbellcurrent._id, null)
              }

              if (document.getElementById("launch").checked) {
                campanier.programbellbyreq(body, response._id, index)
              }else{
                campanier.programbellbyreq(body, response._id, index) 
              }
                  
              document.getElementById("campanaslist").innerHTML = campanier.gerTableBells(response.bells);
              document.getElementById("errorcampana").innerHTML = `
              <div class="alert alert-success fade show" role="alert">
                  <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                  Excelente Campaña creada con exito! 
              </div>`;
          }
      }, 
      (err) =>{
          console.log("error solicitud.followers "+err)
          document.getElementById("errorcampana").innerHTML = `
          <div class="alert alert-warning fade show" role="alert">
              <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
              Error en la solicitud!! ${err.responseJSON.msg}
          </div>`;
      });
    });
    // obtener lista de usuarios
    getSegmentsUser();
    // fk_plantilla 
    getBells()
    // obtener clientes de este usuario
    getClients()
    // load menu unlayer
    loadMenuTemplate(null)
})
var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        console.log(form)
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');

        console.log(form)

    }, false);
});
$(document).on("submit",".needs-validation",function(e){
      e.preventDefault();
      console.log("you can catch the event!");
      //and do whatever you want.
}); 
// obtener balance 
function getBalance(){
    //balance sms email
    companier.balancesmsemail(JSON.parse($.cookie("userData"))._id)
    .then((response)=> {
        balancesmsemailData = response; 
        document.getElementById("numSms").innerHTML = balancesmsemailData.billpaybell ? balancesmsemailData.billpaybell.numSms: 0;
        document.getElementById("numEmail").innerHTML = balancesmsemailData.billpaybell ? balancesmsemailData.billpaybell.numEmail: 0;
        document.getElementById("saldoTotal").innerHTML = acumElementOfArrayObject(balancesmsemailData.billpayed, 'saldopay', true);
        document.getElementById("saldoTotalRestante").innerHTML = acumElementOfArrayObject(balancesmsemailData.billpayed, 'saldopay', true);
        document.getElementById("pvsms").value = balancesmsemailData.pvsms ?balancesmsemailData.pvsms:1 ;
        document.getElementById("pvemail").value = balancesmsemailData.pvemail ? balancesmsemailData.pvemail:1;


        var nodenumSms = document.getElementsByClassName('numSms');
        if(nodenumSms.length)
        for (var i = 0; i < nodenumSms.length; i++) {
            nodenumSms[i].innerHTML = balancesmsemailData.billpaybell ? balancesmsemailData.billpaybell.numSms: 0;
        }
        var nodenumEmail = document.getElementsByClassName('numEmail');
        if(nodenumEmail.length)
        for (var i = 0; i < nodenumEmail.length; i++) {
            nodenumEmail[i].innerHTML = balancesmsemailData.billpaybell ? balancesmsemailData.billpaybell.numEmail: 0;
        }
        var nodesaldoTotal = document.getElementsByClassName('saldoTotal');
        if(nodesaldoTotal.length)
        for (var i = 0; i < nodesaldoTotal.length; i++) {
            nodesaldoTotal[i].innerHTML = acumElementOfArrayObject(balancesmsemailData.billpayed, 'saldopay', true);
        }
        var nodesaldoTotalRestante = document.getElementsByClassName('saldoTotalRestante');
        if(nodesaldoTotalRestante.length)
        for (var i = 0; i < nodesaldoTotalRestante.length; i++) {
            nodesaldoTotalRestante[i].innerHTML = acumElementOfArrayObject(balancesmsemailData.billpayed, 'saldopay', true);
        }
        var nodepvsms = document.getElementsByName('pvsms');
        if(nodepvsms.length)
        for (var i = 0; i < nodepvsms.length; i++) {
            nodepvsms[i].value = balancesmsemailData.pvsms ?balancesmsemailData.pvsms:1
        }
        var nodepvemail = document.getElementsByName('pvemail');
        if(nodepvemail.length)
        for (var i = 0; i < nodepvemail.length; i++) {
            nodepvemail[i].value = balancesmsemailData.pvemail ? balancesmsemailData.pvemail:1;
        }
    }, 
    (err) =>{console.log("error solicitud.balancesmsemail "+err)});
}
// obtener campañas
function getBells(){
    bellier.bells()//JSON.parse($.cookie("userData"))._id
    .then((response)=> {
        bellData = response; 
        if(bellData.length)
        document.getElementById("campanaslist").innerHTML = campanier.gerTableBells(bellData);

        // obtener saldos
        getBalance()
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
}
/**
* obtener segmentos de usuarios  
*/
function getSegmentsUser(){
    //consulta de segmentos de usuarios o lista de usuarios
    bellier.getsegmentuser()//JSON.parse($.cookie("userData"))._id
    .then((response)=> {
        // console.log("segments")
        // console.log(response)
        //cities
        companier.cities()
        .then((citiesData2)=> {
            
            /* companier.sendgrinddesigns()
                .then((designs)=> {
                    console.log("designs")
                    console.log(designs)
                }, 
                (err) =>{
                    console.log(err)
                    console.log("error solicitud.sendgrind ")
            }) */

            for (var i = 0; i < document.getElementsByClassName("segmentsUserData2").length; i++) {
                document.getElementsByClassName("segmentsUserData2")[i].innerHTML = campanier.getTableUsersActSegmentSelect2(response, citiesData2, i)
                //sendgrind/designs
            }

            document.getElementById("segmentsUserData").innerHTML = campanier.getTableUsersActSegmentSelect(response, citiesData2)
        })
        // console.log("bells")
        // console.log(response)
        // bellData = response; 
        // if(bellData.length)
        // document.getElementById("campanaslist").innerHTML = campanier.gerTableBells(bellData);
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
}
/**
*  envio de elementos ajax
*/
function saveListUser(){
    var choices = [];
    var els = document.getElementsByName('userlistnew');
    for (var i=0;i<els.length;i++){
      if ( els[i].checked ) {
        choices.push(els[i].value);
      }
    }

    if(choices.length){
      // alert()
      campanier.modalDialogConfirmSegment('savelistuser') 

      document.getElementById("saveFromModal").addEventListener("click", function(resss){
        var name = document.getElementById("modalNameList").value;
        console.log(resss.isTrusted)
        if(resss.isTrusted){
            bellier.setsegmentuser({ name, fk_user: choices})//JSON.parse($.cookie("userData"))._id
            .then((response)=> {
                document.getElementById("errorsavelista").innerHTML = 'Lista Guardada!';
                companier.cities()
                .then((citiesData2)=> {

                    for (var i = 0; i < document.getElementsByClassName("segmentsUserData2").length; i++) {
                        document.getElementsByClassName("segmentsUserData2")[i].innerHTML = campanier.getTableUsersActSegmentSelect2(response, citiesData2, i)
                    }
                    document.getElementById("segmentsUserData").innerHTML = campanier.getTableUsersActSegmentSelect(response, citiesData2)
                })
            }, 
            (err) =>{
                console.log("error solicitud.followers "+err)
                document.getElementById("errorsavelista").innerHTML = 'Error en la solicitud!'+ ` ${err.responseJSON.msg}`;
                toastInfo('Error en la solicitud!', ` ${err.responseJSON.msg}`);
            });
        }
      });
    }
} 
function editBell (index){

    $("#formbelleditar"+index).on('submit', function(evt){
        evt.preventDefault();  
        // tu codigo aqui
    });

    if(document.getElementById("formbelleditar"+index))
    document.getElementById("formbelleditar"+index).addEventListener('submit', function (event) { 


        var valid = false

        var listasbell = [];
        var els = document.getElementsByName('segmentlistnew2'+index);
        for (var i=0;i<els.length;i++){
          if ( els[i].checked ) {
            listasbell.push(els[i].value);
          }
        }
        if(listasbell.length<=0){
            document.getElementById("validlistuser"+index).innerHTML = "Debes definir una lista de usuarios."
        }

        valid = document.getElementById("bellid"+index).value && document.getElementById("name"+index).value && document.getElementById("datetime_campana"+index).value  && document.getElementById("terminos"+index).checked && listasbell.length;

        if(!valid)
            return


        // document.getElementById("fk_bell_user_list"+index).value=listasbell;

        //htmlCustom = //#editorunlayer design-web editor-desktop

        var bodyEmail = {
            subject:   document.getElementById("message-email-subject-edit"+index).value ,
            text:   document.getElementById("message-email-text-edit"+index).value ,
            html: document.getElementById("message-email-html-edit"+index).value
        }   

        var bodyNotify = {
            data:   document.getElementById("message-noty-data-edit"+index).value ,
            title:   document.getElementById("message-noty-title-edit"+index).value ,
            text:document.getElementById("message-noty-text-edit"+index).value,
            icon:document.getElementById("message-noty-icon-edit"+index).value
        }   

        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = $(this).serializeArray(); //Encode form elements for submission
        event.preventDefault(); //prevent default action 
        console.log(document.getElementById("launch"+index).checked)
        var body = {
            idbell: document.getElementById("bellid"+index).value,
            name: document.getElementById("name"+index).value,
            date: document.getElementById("datetime_campana"+index).value,
            datecurrentdate: new Date(),
            sms: document.getElementById("sms"+index).checked,
            email: document.getElementById("email"+index).checked,
            notipush: document.getElementById("notipush"+index).checked,
            defaultvalue: document.getElementById("defaultvalue"+index).checked,
            terminos: document.getElementById("terminos"+index).checked,
            fk_bell_user_list: listasbell,
            tokenPush: 'localStorage.getItem("tokenPush")',
            platform: 'web',
            role: 8,

            fk_email_plantilla: JSON.stringify(bodyEmail) ,
            fk_sms_content: document.getElementById("fk_sms_content_edit"+index).value ,
            fk_notification_content: JSON.stringify(bodyNotify) 
        }
        console.log("body")
        console.log(body)
        bellier.putbell(body)//JSON.parse($.cookie("userData"))._id
        .then((response)=> {
            document.getElementById("editcampanas"+index).disabled = true;

            console.log(response)
            console.log(response[index])
            if(response.length){
                getSegmentsUser();
                if (document.getElementById("launch"+index).checked) {
                  campanier.programbellbyreq(body, response[index]._id, index)
                }else{
                  campanier.programbellbyreq(body, response[index]._id, index) 
                }
                document.getElementById("campanaslist").innerHTML = campanier.gerTableBells(response);
                document.getElementById("errorcampana"+index).innerHTML = `
                <div class="alert alert-success fade show" role="alert">
                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                    Excelente Campaña actualizada con exito! 
                </div>`;
                document.getElementById("errorcampanabuton"+index).innerHTML = `
                <div class="alert alert-success fade show" role="alert">
                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                    Excelente Campaña actualizada con exito! 
                </div>`;
            }
        }, 
        (err) =>{
            console.log(err)
            console.log("error solicitud.followers "+err)
            document.getElementById("errorcampana"+index).innerHTML = `
            <div class="alert alert-warning fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Error en la solicitud!! ${err.responseJSON.msg}
            </div>`;
            document.getElementById("errorcampanabuton"+index).innerHTML = `
            <div class="alert alert-warning fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Error en la solicitud!! ${err.responseJSON.msg}
            </div>`;
        });

    })
}
// preparar lista de edicion de bells
function showEdit(i ){
    // userlistnew
    var els = document.getElementsByName('segmentlistnew2'+i);
    var els2 = document.getElementsByName("segmentlistold2"+i);
    for (var i=0;i<els.length;i++){ 
      if (els2[i] && els[i].value == els2[i].value) {
        els[i].checked=true;
      }
    }
}
// enviar bell por defecto
function setBellDefault(idbell, index){
    bellier.putbelldefault(idbell)//JSON.parse($.cookie("userData"))._id
    .then((response)=> {
        console.log(response)
        if(response.length){
            getSegmentsUser();
            document.getElementById("campanaslist").innerHTML = campanier.gerTableBells(response); 
            document.getElementById("errorcampanabuton"+index).innerHTML = `
            <div class="alert alert-success fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Excelente Campaña creada con exito! 
            </div>`;
        }
    }, 
    (err) =>{
        console.log(err)
        console.log("error solicitud.followers "+err)
        document.getElementById("errorcampanabuton"+index).innerHTML = `
        <div class="alert alert-warning fade show" role="alert">
            <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            Error en la solicitud!! ${err.responseJSON.msg}
        </div>`; 
    });
} 
//obtener clientes
function getClients(idbranch){
    companier.clientsforbell(idbranch)
    .then((response)=> {
        var usersData = response; 
        // document.getElementById("percentFollowers").innerHTML = Math.round((document.getElementById("follower").innerHTML * 100)/ usersData.fk_user_asocd.length);

        //cities
        companier.cities()
        .then((citiesData2)=> {
            // $.cookie("userActivosData", JSON.stringify(usersData))
            // $.cookie("citiesData", JSON.stringify(citiesData2))
            document.getElementById("userActivos").innerHTML = campanier.getTableUsersActSelect(usersData, citiesData2)
            for (let i = 0; i < document.getElementsByClassName("userActivos2").length; i++) {
                const tble = document.getElementsByClassName("userActivos2")[i];
                tble.innerHTML = campanier.getTableUsersActSelect(usersData, citiesData2)
            }
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});
    }, 
    (err) =>{console.log("error solicitud.followers "+err)});
}
function seReloadBell(recarga, numsms, numemail){
    let bodyreloadbell = {
        recarga: recarga,
        numSms: numsms,
        numEmail: numemail
    }
    bellier.seReloadBell(bodyreloadbell)
    .then((response)=> {
        document.getElementById("numSms").innerHTML = response.numSms
        document.getElementById("numEmail").innerHTML = response.numEmail
        document.getElementById("saldoTotal").innerHTML = format(response.saldoTotal)
        document.getElementById("saldoTotalRestante").innerHTML = format(response.saldoTotal)

        document.getElementById("errorcampana").innerHTML += `
            <div class="alert alert-success fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Recarga hecha con exito! 
            </div>`;
    }, 
    (err) =>{
        var errResult = err ? err.responseJSON ? err.responseJSON.msg: '': ''
        console.log(err)
        console.log("error test  bell "+err)
        document.getElementById("errorcampana").innerHTML = `
        <div class="alert alert-warning fade show" role="alert">
            <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            Error en la solicitud!! ${errResult}
        </div>`;
    });
}
// funcion para testear campaña
function testbellbyreq(teltestcreate, emailtestcreate, idbell, index){

    let bodytestbell={}
    var testbell = []
    if(index){
        if(!(document.getElementById("teltestedit"+index).value && document.getElementById("emailtestedit"+index).value))
            return


        testbell.push({tel: document.getElementById("teltestedit"+index).value, email: document.getElementById("emailtestedit"+index).value })
        bodytestbell={
            userstest:JSON.stringify(testbell)
        }
        bellier.testbell(idbell, bodytestbell)
        .then((response)=> {
            document.getElementById("buttontest"+index).disabled = true;

            console.log(response)  
            document.getElementById("smstest"+index).innerHTML = `
            <div class="alert alert-success fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Campaña testeada con exito! 
            </div>`;
        }, 
        (err) =>{
            var errResult = err ? err.responseJSON ? err.responseJSON.msg: '': JSON.stringify(err)
            console.log(err)
            console.log("error test  bell "+err)
            document.getElementById("smstest"+index).innerHTML += `
            <div class="alert alert-warning fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Error en la solicitud!! ${errResult}
            </div>`;
        });
    }else{
        testbell.push({tel: teltestcreate, email: emailtestcreate })
        bodytestbell={
            userstest:JSON.parse(testbell)
        }
        bellier.testbell(idbell, bodytestbell)
        .then((response)=> {
            console.log(response)  
            getSegmentsUser()
            document.getElementById("errorcampana").innerHTML = `
            <div class="alert alert-success fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Campaña testeada con exito! 
            </div>`;
        }, 
        (err) =>{
            var errResult = err ? err.responseJSON ? err.responseJSON.msg: '': ''
            console.log(err)
            console.log("error test  bell "+err)
            document.getElementById("errorcampana").innerHTML += `
            <div class="alert alert-warning fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Error en la solicitud!! ${errResult}
            </div>`;
        });
    }
}
// borrar segemntos
function deleteSegment(idsegemento, index, index2){
    console.log("errorcampanasegmentdeletebuton"+index+index2) 

    modalDialogConfirmSegment('editlistuser') 

    document.getElementById("editFromModal").addEventListener("click", function(resss){  

        bellier.deletesegmentuser(idsegemento)
        .then((response)=> {
            console.log(response)   
            document.getElementById("errorcampanasegmentdeletebuton"+index+index2).innerHTML = `
            <span class="badge badge-success fade show">
                Segmento eliminado con exito! 
            </span>`;
            $(`#sementuser${index}${index2}`).hide();
        }, 
        (err) =>{
            var errResult = err ? err.responseJSON ? err.responseJSON.msg: '': ''
            console.log(err)
            console.log("error test  bell "+err)
            document.getElementById("errorcampanasegmentdeletebuton"+index+index2).innerHTML = `
            <span class="badge badge-danger fade show">
                Error en la solicitud!! ${errResult}
            </span>`;
        }); 
    });
}
/**
* funcion para validar el checkeo de lanzar la campaña o programar fecha 
**/
function validchecked(index){
    
    if(index!==null){
        console.log(index)
        var els = document.getElementsByName('launch'+(index));
        console.log(els)
        var datecurrent = moment().locale('en');
        for (var i=0;i<els.length;i++){
          if ( els[i].checked && els[i].value == 'launch'+index) {
            document.getElementById("datetime_campana"+(index)).readOnly =true
            document.getElementById("datetime_campana_backup"+(index)).value=document.getElementById("datetime_campana"+(index)).value

            document.getElementById("datetime_campana"+(index)).value=datecurrent.format('yyyy-MM-DDTHH:mm');
          }else{
            document.getElementById("datetime_campana"+(index)).readOnly =false
            document.getElementById("datetime_campana"+(index)).value = document.getElementById("datetime_campana_backup"+(index)).value
          }
        }
    }else{
        var els = document.getElementsByName('launch');
        console.log(els)
        var datecurrent = moment().locale('en');
        for (var i=0;i<els.length;i++){
          if ( els[i].checked && els[i].value == 'launch') {
            document.getElementById("datetime_campana").readOnly =true
            document.getElementById("datetime_campana").value=datecurrent.format('yyyy-MM-DDTHH:mm')
          }else{
            document.getElementById("datetime_campana").readOnly =false
          }
        }
    }
}
/**
* funcion para validar el checkeo de lanzar la campaña o programar fecha 
**/
var unlayer2
function validcheckedunlayer(index, htmlcustom){
    if(index!==null){
        console.log(index)
        var contentEmailCustom = document.getElementById('message-email-html-create-content'+index);
        var contentEmailUnlayer = document.getElementById('editorunlayer'+index);
        
        var els = document.getElementById('message-email-html-unlayer'+index);
        
        unlayer.init({
            id: 'editorunlayer'+index,
            displayMode: 'email'
        })
        if(htmlcustom)
        unlayer.loadDesign({
            id: 'editorunlayer'+index,
            html: htmlcustom,
            classic: true
        }); 
        loadMenuTemplate(index);
        
        if ( els.checked  ) {
            
            contentEmailCustom.classList.remove('show');
            contentEmailCustom.classList.add('fade');

            contentEmailUnlayer.classList.remove('fade');
            contentEmailUnlayer.classList.add('show');
        }else{
            contentEmailCustom.classList.remove('fade');
            contentEmailCustom.classList.add('show');

            contentEmailUnlayer.classList.remove('show');
            contentEmailUnlayer.classList.add('fade');
        }
    }else{ 
        
        var contentEmailCustom = document.getElementById('message-email-html-create-content');
        var contentEmailUnlayer = document.getElementById('editorunlayer');
        
        var els = document.getElementById('message-email-html-unlayer');
        
        if ( els.checked  ) {
            contentEmailCustom.classList.remove('fade');
            contentEmailCustom.classList.add('show');

            contentEmailUnlayer.classList.remove('show');
            contentEmailUnlayer.classList.add('fade');
        }else{
            contentEmailCustom.classList.remove('show');
            contentEmailCustom.classList.add('fade');

            contentEmailUnlayer.classList.remove('fade');
            contentEmailUnlayer.classList.add('show');
        }
    }
}
/**
*   funcion para generar todas plantillas
*/
function loadMenuTemplate(index){ 
          
    companier.getjsondisaen()
    .then((response)=> {
        if(response){
            if(index==null){
                var unlayermenus= document.getElementsByClassName("templateseditorunlayer")
                for (let j = 0; j < unlayermenus.length; j++) {
                    const element = unlayermenus[j];
                    element.innerHTML = campanier.getTableUnlayerMenu(response, null)
                }
            }else{
                var unlayermenus2= document.getElementsByClassName("templateseditorunlayer"+index)
                for (let j = 0; j < unlayermenus2.length; j++) {
                    const element2 = unlayermenus2[j];
                    element2.innerHTML = campanier.getTableUnlayerMenu(response, index)
                }
            }
        }
    }) 
    
}
function loadTemplate(id, index) { 
    
    companier.getjsondisaen()
    .then((bodyunlayer)=> {
        if(index==null){
            if(bodyunlayer.length)
            for (let i = 0; i < bodyunlayer.length; i++) { 
                if (id == bodyunlayer[i].id) {
                    //unlayer.loadDesign(bodyunlayer[i].json);
                    unlayer.loadTemplate(bodyunlayer[i].id); 
                }
            }
        }else{
            if(bodyunlayer.length) 
            for (let i = 0; i < bodyunlayer.length; i++) { 
                if (id == bodyunlayer[i].id) {
                    //unlayer.loadDesign(bodyunlayer[i].json);

                    
                    var $parent = $('#editorunlayer'+index).parent();
                    $('#editorunlayer'+index).remove();
                    $parent.append(`<div id="editorunlayer${index}" style="height: 1024px;margin:15px"></div>`);

                    var $parent = $('#editorunlayer').parent();
                    $('#editorunlayer').remove();
                    $parent.append(`<div id="editorunlayer" style="height: 1024px;margin:15px"></div>`);

                    unlayer.init({
                        id: 'editorunlayer'+index,
                        displayMode: 'email'
                    })  
                    unlayer.loadDesign(bodyunlayer[i].json);
                }
            }
        }
    }) 
}
(function() {
  var Campana, campanier,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Campana = (function() {
    function Campana() {
      this.data = {
        values: {},
        contexts: []
      };
      this.globalContext = {};
    }
    /**
     *  FUNCIONES AUXILIARES DE TAVLAS GENERANDO CONTENUIDO
     */   
    // bellsData CUENTAScampañas
    Campana.prototype.gerTableBells = function(bellsData) { 
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
      function validprogram(dateprogram, status){ 
        moment().locale('en')
        var datecurrent = new Date;
        var dateprogramset = new Date(dateprogram);
        dateprogramset = new Date(dateprogramset.getFullYear(), dateprogramset.getMonth(), dateprogramset.getDate(), dateprogramset.getUTCHours(), dateprogramset.getMinutes(), 00)
        var datediff = dateprogramset.getTime()-datecurrent.getTime();
        var d = moment.duration(datediff, 'milliseconds');
        var days = d.asDays() ? Math.floor(d.asDays()) :0;
        var hours =d.asHours() ? Math.floor(d.asHours() - days * 24) : 0;
        var mins = d.asMinutes()? Math.floor(d.asMinutes()) - (days * 24 * 60) - (hours * 60 ) : (hours * 60 );
        var segs = d.asSeconds()? Math.floor(d.asSeconds()) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (mins * 60 ) : 0;
        var diffMins = days+" < Dias, " + hours+ " < Horas " + mins + " < Minutos " + segs + " < Segundos";
        if (moment(dateprogram.replace("Z", "")) < moment().locale('en') && status==true){
          return `<div class="alert alert-warning fade show" role="alert">Hubo un error en la programacion de la campaña!</div>`; 
        }else if(moment(dateprogram.replace("Z", "")) > moment().locale('en') && status==true){
          return `<div class="alert alert-success fade show" role="alert">Campaña programada con exito!  : ${diffMins}</div>`;
        }else{
          return `<div class="alert alert-success fade show" role="alert">Campaña ejecutada con exito!</div>`;
        }
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
                        <span>${bellsData[i].name} - ${bellsData[i].date} </span> 
                    </div>
                    <div class="card-body">
                      <div class="tab-content">
                          <div class="tab-pane active" id="tab-eg1-0" role="tabpanel">
                            <p> Esta campaña puede  ${sendMensajes(bellsData[i].sms)} ${sendEmails(bellsData[i].email)} ${sendNotify(bellsData[i].notipush)}.</p>
                          </div>
                          ${validprogram(bellsData[i].date, bellsData[i].status)}
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
                                                              <div class="col-md-12 mb-12">

                                                                  <div class="input-group">
                                                                      <div class="input-group-prepend">
                                                                          <span class="input-group-text" id="validationTooltipUsernamePrepend">
                                                                              <i class="fa fa-search icon-gradient bg-sunny-morning"> </i>
                                                                          </span>
                                                                      </div>

                                                                      <input type="number" min="0" class="form-control" id="searchedadmenor${i}" placeholder="Edad Menor ..." aria-describedby="validationTooltipUsernamePrepend" onkeyup="campanier.searchsegmentedit(${i})">

                                                                      <input type="number" min="0" class="form-control" id="searchedadmayor${i}" placeholder="Edad Mayor ..."  aria-describedby="validationTooltipUsernamePrepend" onkeyup="campanier.searchsegmentedit(${i})">

                                                                      <div class="input-group-append">
                                                                          <button class="btn btn-primary" type="button" onclick="campanier.searchgeneroedit('male')">Hombre</button>
                                                                      </div>
                                                                      <div class="input-group-append">
                                                                          <button class="btn btn-info" type="button" onclick="campanier.searchgeneroedit('female')">Mujer</button>
                                                                      </div>
                                                                      <div class="input-group-append">
                                                                          <button class="btn btn-warning" type="button" onclick="campanier.searchgeneroedit('other')">Otro</button>
                                                                      </div>
                                                                      <div class="input-group-append">
                                                                          <button class="btn btn-danger" type="button" onclick="campanier.searchgeneroedit('')">Todos</button>
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
                                                                          <tbody class="userActivos2">
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
                                                                <button class="btn btn-primary" type="button" onclick="campanier.nextItemContenidoedit(0, ${i})">Guardar Mensaje</button>
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

                                                                    <div class="col-md-12 mb-12 form-group">
                                                                        <h5>Contenido del Email:</h5>
                                                                    </div>

                                                                    <div class="col-md-2 mb-2 form-group">
                                                                        <label for="checkmessage-email-html-unlayer${i}">User Unlayer Editor</label>
                                                                        <div class=" ">
                                                                            <div class="theme-switch-wrapper">
                                                                                <label class="theme-switch" for="message-email-html-unlayer${i}">
                                                                                    <input type="checkbox" id="message-email-html-unlayer${i}" name="message-email-html-unlayer${i}" value="message-email-html-unlayer" onchange="validcheckedunlayer(${i}, '${fk_email_plantilla_html}')"/>
                                                                                    <div class="slider round"></div>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-10 mb-10" id="message-email-html-create-content${i}">
                                                                        <div class="form-group">
                                                                            <label for="message-text-edit${i}" class="col-form-label">Texto Html:</label>
                                                                            <textarea class="form-control" id="message-email-html-edit${i}" >${fk_email_plantilla_html}</textarea>
                                                                        </div>
                                                                    </div>  
                                                                </div> 
                                                                <div class="form-row">                                                                          
                                                                    <div class="templateseditorunlayercss templateseditorunlayer${i}">
                                                                    </div>
                                                                </div>

                                                                <div class="form-row">
                                                                  <div id="editorunlayer${i}" style="height: 1024px;margin:15px"></div> 
                                                                </div>

                                                                <button class="btn btn-primary" type="button" onclick="campanier.nextItemContenidoedit(1, ${i})">Guardar Email</button>
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
                                                                <button class="btn btn-primary" type="button" onclick="campanier.nextItemContenidoedit(2, ${i})">Guardar Notificacion</button>
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
                                                                    <input name="numSmsBelledit${i}" id="numSmsBelledit${i}" onkeyup="campanier.calcSaldoRestanteedit(${i})" placeholder="Numero de Mensajes de Texto SMS" type="number" min="0" class="form-control" required>
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
                                                                    <input name="numEmailBelledit${i}" id="numEmailBelledit${i}" onkeyup="campanier.calcSaldoRestanteedit(${i})" placeholder="Numero de Correos" type="number" min="0" class="form-control" required>
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

                                                <div class="col-md-4 mb-4">
                                                    <label for="examplePassword">Fecha</label>
                                                    <input name="datetime_campana${i}" id="datetime_campana${i}"  placeholder="datetime-campana" type="datetime-local" value="${bellsData[i].date.slice(0, -1)}" class="form-control" required>
                                                    <div class="valid-feedback">
                                                        Bien!
                                                    </div>
                                                    <div class="invalid-feedback">
                                                        Por favor ponga una fecha.
                                                    </div>
                                                </div>

                                                <div class="col-md-2 mb-2 form-group">
                                                  <label for="checklaunch">Lanzar al guardar</label>
                                                  <div class=" ">
                                                      <div class="theme-switch-wrapper">
                                                          <label class="theme-switch" for="launch${i}">
                                                              <input type="checkbox" id="launch${i}" name="launch${i}" value="launch${i}" onchange="validchecked(${i})"/>
                                                              <div class="slider round"></div>
                                                          </label>
                                                      </div>
                                                      <input type="hidden" id="datetime_campana_backup${i}">
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
    Campana.prototype.getTableUsersActSelect = function(usersData, cities, autoselect){

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
    Campana.prototype.getTableUsersActSegmentSelect = function(usersSegmentData, cities){

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
    Campana.prototype.getTableUsersActSegmentSelect2 = function (usersSegmentData, cities, index){

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
    //unlayer
    Campana.prototype.getTableUnlayerMenu = function (bodyunlayer, index){
      var bodyHtml = '';
      for (let i = 0; i < bodyunlayer.length; i++) {
        const element = bodyunlayer[i];
        bodyHtml +=  `
        <a onclick="loadTemplate('${bodyunlayer[i].id}', ${index})" class="TemplateItem-card card" style="width: 220px;max-width: 220px;height: 250px;max-height: 250px;">
          <img src="${element.image}" class="card-img">
          <div class="card-body">
            <div class="TemplateItem-cardTitle card-title">${element.name}</div>
            <div class="TemplateItem-cardType">email</div>
          </div>
        </a>
        `;
      }
      return bodyHtml
    }
    /**
     *  FUNCIOND DE INTERACCION ENFORMULARIOS
     * funcion que calcula el saldo restante en alcance
     */
    Campana.prototype.calcSaldoRestante = function  (){  

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
    Campana.prototype.searchsegmentcreate = function (){

      var searchedadmenor = document.getElementById('searchedadmenor').value ? document.getElementById('searchedadmenor').value: 0,
      searchedadmayor = document.getElementById('searchedadmayor').value ? document.getElementById('searchedadmayor').value: 0,
      usersDataSeached = {}, fk_user_asocd_sechaded =[]

      campanier.clients(JSON.parse($.cookie("userData"))._id)
      .then((usersData)=> {
          //cities
          campanier.cities()
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
    Campana.prototype.searchgenerocreate = function  (genero){
      var generol, fk_user_asocd_sechaded =[]

      campanier.clients(JSON.parse($.cookie("userData"))._id)
      .then((usersData)=> {
          //cities
          campanier.cities()
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
    Campana.prototype.modalDialogConfirmSegment = function  (origin){

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
    Campana.prototype.searchsegmentedit = function (index){

      var searchedadmenor = document.getElementById('searchedadmenoredit'+index).value ? document.getElementById('searchedadmenoredit'+index).value: 0,
      searchedadmayor = document.getElementById('searchedadmayoredit'+index).value ? document.getElementById('searchedadmayoredit'+index).value: 0,
      usersDataSeached = {}, fk_user_asocd_sechaded =[]

      campanier.clients(JSON.parse($.cookie("userData"))._id)
      .then((usersData)=> {
          //cities
          campanier.cities()
          .then((citiesData2)=> {
            console.log(usersData)
            console.log(citiesData2)

            if((searchedadmenor==0 && searchedadmayor==0)){
                for (let i = 0; i < document.getElementsByClassName("userActivos2").length; i++) {
                    const tble = document.getElementsByClassName("userActivos2")[i];
                    tble.innerHTML = getTableUsersActSelect(usersData, citiesData2, true)
                }
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
            for (let i = 0; i < document.getElementsByClassName("userActivos2").length; i++) {
                const tble = document.getElementsByClassName("userActivos2")[i];
                tble.innerHTML = getTableUsersActSelect(usersDataSeached, citiesData2, true) 
            }
          }, 
          (err) =>{console.log("error solicitud.balancesmsemail "+err)});
      }, 
      (err) =>{console.log("error solicitud.followers "+err)});
    }
    // en el formulario de la lista de los usuario solo sekleccionar a lo po gnero
    Campana.prototype.searchgeneroedit = function  (genero){
      var generol, fk_user_asocd_sechaded =[]

      campanier.clients()
      .then((usersData)=> {
          //cities
          campanier.cities()
          .then((citiesData2)=> {
            console.log(usersData)
            console.log(citiesData2)

            if((genero=='')){ 
                for (let i = 0; i < document.getElementsByClassName("userActivos2").length; i++) {
                    const tble = document.getElementsByClassName("userActivos2")[i];
                    tble.innerHTML = getTableUsersActSelect(usersData, citiesData2, true)
                }
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
            for (let i = 0; i < document.getElementsByClassName("userActivos2").length; i++) {
                const tble = document.getElementsByClassName("userActivos2")[i];
                tble.innerHTML = getTableUsersActSelect(usersDataSeached, citiesData2, true) 
            }
          }, 
          (err) =>{console.log("error solicitud.balancesmsemail "+err)});
      }, 
      (err) =>{console.log("error solicitud.followers "+err)});
    }
    // funcion que calcula el saldo restante en alcance
    Campana.prototype.calcSaldoRestanteedit = function (index){

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
    Campana.prototype.nextItemContenido = function (origen){
      var pos = origen+1==3 ? 0 :  origen+1;
      // $('#tabContenido').tab('show')   tabcontcreate1
      console.log('#tabContenido a#tabcontcreate'+pos)
      $('#tabContenido a#tabcontcreate'+pos).tab('show')
    }
    Campana.prototype.nextItemContenidoedit = function  (origen, index){
      var pos = origen+1==3 ? 0 :  origen+1;
      // $('#tabContenido').tab('show')   tabcontcreate1
      console.log('#tabContenido a#tabcontedit'+pos+index)
      $('#tabContenido a#tabcontedit'+pos+index).tab('show')
    }
    /** 
     * funcion para programar campaña
    */ 
    Campana.prototype.programbellbyreq = function (body, idbell, index){

      if(index){ 
        bellier.programbell(idbell, body)
        .then((response)=> {
            document.getElementById("buttontest"+index).disabled = true;

            console.log(response)  
            document.getElementById("smstest"+index).innerHTML = `
            <div class="alert alert-success fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Campaña testeada con exito! 
            </div>`;
        }, 
        (err) =>{
            var errResult = err ? err.responseJSON ? err.responseJSON.msg: '': JSON.stringify(err)
            console.log(err)
            console.log("error test  bell "+err)
            document.getElementById("smstest"+index).innerHTML += `
            <div class="alert alert-warning fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Error en la solicitud!! ${errResult}
            </div>`;
        });
      }else{
        bellier.programbell(idbell, body)
        .then((response)=> {
            console.log(response)  
            getSegmentsUser()
            document.getElementById("errorcampana").innerHTML = `
            <div class="alert alert-success fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Campaña testeada con exito! 
            </div>`;
        }, 
        (err) =>{
            var errResult = err ? err.responseJSON ? err.responseJSON.msg: '': ''
            console.log(err)
            console.log("error test  bell "+err)
            document.getElementById("errorcampana").innerHTML += `
            <div class="alert alert-warning fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Error en la solicitud!! ${errResult}
            </div>`;
        });
      }
    }
    /**
     * funcion para inicializar segmentos
     */ 
    Campana.prototype.createOrGetSegment = function (name){
        bellier.getsegmentuser()
        .then((response1)=> {
            companier.cuponeclienetscan()
            .then((response2)=> { 
                var cuponeclienetscanData = response2, idsegmenttodelete;
                //6 listas
                for (let index = 0; index < response1.length; index++) {
                    const element = response1[index];
                    if(response1[index].name && response1[index].name.search(name)!==-1){
                        idsegmenttodelete = response1[index]._id
                    } 
                }
                var arraymaygasto = [];

                arraymaygasto = Campana.prototype.generateArrayMayGasto(cuponeclienetscanData, name)

                var formararray=[]
                for (let i = 0; i < arraymaygasto.length; i++) {
                    const element = arraymaygasto[i];
                    formararray.push(element.iduser)
                }
                
                bellier.deletesegmentuser(idsegmenttodelete)
                .then((responsedelete)=> {
                    const bodyseg = { name: 'Clientes '+name, fk_user: formararray};
                    bellier.setsegmentuser(bodyseg)
                    .then((response2)=> {
                        companier.cities()
                        .then((citiesData2)=> {
                            for (var i = 0; i < document.getElementsByClassName("segmentsUserData2").length; i++) {
                                document.getElementsByClassName("segmentsUserData2")[i].innerHTML = campanier.getTableUsersActSegmentSelect2(response2, citiesData2, i)
                                //sendgrind/designs
                            }
                            document.getElementsByClassName("page-title-subheading")[0].innerHtml = `
                            <div class="alert alert-success fade show" role="alert">Segmento actualizados con exito!</div>
                            `; 
                        })
                        return 
                    }, 
                    (errorsegment) =>{
                        document.getElementsByClassName("page-title-subheading")[0].innerHtml = `
                        <div class="alert alert-danger fade show" role="alert">Error al actualizar segmento!</div>
                        `;
                        return 
                    })
                })
            })
        })
    }
    /**
    *  para generar arrays
    */
   Campana.prototype.generateArrayMayGasto = (response, tipo)=>{
        var cuponeclienetscanData
        cuponeclienetscanData = response;
        console.log("cuponeclienetscanData")
        console.log(cuponeclienetscanData)

        var arrayUserRedim = cuponeclienetscanData ? cuponeclienetscanData.userredimieron.fk_user_asocd ? (cuponeclienetscanData.userredimieron.fk_user_asocd): []: [];
        var arrayusermayorgasto = cuponeclienetscanData.usermayorgasto ? cuponeclienetscanData.usermayorgasto ? (cuponeclienetscanData.usermayorgasto): []: [],
        arrayusermayorgastoinvert = []
        , arrayusermayorgastofrecuente = [], arrayusermayorgastofieles = [], arrayusermayorgastorecurrentes = []
        , arrayusermayorgastopotenciales = [], arrayusermayorgastorentables=[];

        indexuser = 0//arrayusermayorgasto.length *
        for (let i = 0; i < indexuser; i++) {
            const element = arrayusermayorgasto[i];
                arrayusermayorgastofrecuente.push(element)
        }
        var indexuserfieles = 0, indexuserrecurrentes = 0, indexuserpotenciales = 0, indexuserrentables=0, indexuserfrecu = 0;
        indexuserfieles = Math.round(arrayusermayorgasto.length * 0.25)
        indexuserrecurrentes = Math.round(arrayusermayorgasto.length * 0.75)
        indexuserpotenciales = Math.round(arrayusermayorgasto.length * 1)
        indexuserrentables = Math.round(arrayusermayorgasto.length * 0.20)
        for (let i = 0; i < arrayusermayorgasto.length; i++) {
            const element = arrayusermayorgasto[i];
            //fieles
            if(i<=indexuserfieles-1){
                arrayusermayorgastofieles.push(element)
            }else
            //recurrentes
            if(i>indexuserfieles-1 && i<=indexuserrecurrentes-1){
                arrayusermayorgastorecurrentes.push(element)
            }else
            //potenciales
            if(i>indexuserrecurrentes-1 && i<=indexuserpotenciales-1){
                arrayusermayorgastopotenciales.push(element)
            }
        }
        arrayusermayorgastoinvert = arrayusermayorgasto
        arrayusermayorgastoinvert.sort(function (a, b) {
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
        for (let j = 0; j < arrayusermayorgastoinvert.length; j++) {
            const element = arrayusermayorgastoinvert[j];
            if(j>=0 && j<=indexuserrentables-1){
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

    return Campana;
  })();

  campanier = new Campana();
  (typeof module !== "undefined" && module !== null ? module.exports = campanier : void 0) || (this.campanier = campanier);

}).call(this);
    