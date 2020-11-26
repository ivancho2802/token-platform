
$( document ).ready(function() {
    let citiesData;
    const send_resp = false, gif_card = false;
    body_ratings =
    {
        idcalify: "",
        tradename: "",
        id_brach: "",
        msgcalificationb: "",
        idgiftcard: "",
        sendSms: false,
        sendEmail: false,
    };
    sen_data =
    {
        amount_gif: "",
        id_gif: "",
        descripcion_gif: "",
        fk_empresa_gif: "",
        nombre_gif: "",
        fecha_vence_gif: ""
    };
    /** data de la empresa perfil */
    if($.cookie("userData") && $.cookie("business") && !(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
        return;

    document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
    document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
    document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image;

    // sucursales
    new Help().loadbrnachs();

    //animacion tabs de statics
    $('.tabsstatics').on('click', 'a', function() {
        var $this = $(this),
        $ul = $this.parents('ul');
        $ul.find('a').removeClass('active');
        $this.addClass('active');
    });

    // asignar evento click a el filtro de fechas
    capturarClick();
    // citiesData = array_keys();
})

// interacion con el boton sucursales
const lis_sucursales = document.getElementById("lis_sucursales");
// console.log("lis_sucursales: ", lis_sucursales);
lis_sucursales.addEventListener("click", e => {
    const select_branchoffice = document.querySelector(".select_branchoffice");
    console.log("select_branchoffice: ", select_branchoffice);
    const hiden_sucursales = document.getElementById("lis_sucursales");
    console.log("hiden_sucursales: ", hiden_sucursales);

    hiden_sucursales.classList.remove("show");
    const sucursal = document.querySelector("#branchs li a div").textContent;
    console.log("sucursal: ", sucursal);

    select_branchoffice.textContent = sucursal;
});


companier.getqualification()
.then((response)=> 
{
    if(response.data)
    {
        let Data = response.data;
        let dissatisfied = 0, moderately_compliant = 0, according = 0, total_msm = 0;
        let card_body_html = ``; 
        let card_element = document.getElementById('contenedor');
        let cont = 1;
        const colorstar= "#fed22b";
        // let resp = createCardQualification(Data, dissatisfied, moderately_compliant, according, total_msm);
        Data.forEach(element => {
            total_msm +=1;
            switch(element.number)
            {
                case 1: 
                case 2: 
                    dissatisfied += 1;
                    break;
                case 3: 
                    moderately_compliant += 1;
                    break;
                case 4:
                case 5:
                    according += 1;
                    break;
            }
            
            card_body_html += `<div class='card-body' id='card_${cont}' > <span class='img_user' id="card_heder_${cont}">`

            if(element.fk_user.image === "")
            {
                card_body_html += `
                                    <i class="fa fa-user" aria-hidden="true" title="Copy to use user" style="width: 33px"></i>
                                    <span class="px-3 pt-1" id="name">${element.fk_user.name} ${element.fk_user.lastname} (${element.fk_user.username}) 
                                    </span>
                                </span>`;
            }
            else
            {
                card_body_html += `<img width='33' class='rounded-circle' id='avatar_${cont}' src='${element.fk_user.image}' alt='avatar' />  <span class="px-3 pt-1" id="name">${element.fk_user.name} ${element.fk_user.lastname} (${element.fk_user.username}) </span></span>`;
            }


            if(element.comentary == undefined || element.comentary === "")
            { 
                card_body_html += `<p class='card-text comentario' id="comment_${cont}"> calificación sin comentario. </p> <div class="calificacion">
                <button type="button" class="btn btn-info btn-sm text-uppercase" data-toggle="modal" data-target="#reply" id="btn_${cont}" onclick="fnBtnId(this)">
                    responder
                </button>`;
            }else
            {
                card_body_html += `<p class='card-text' id="comment_${cont}"> ${element.comentary} </p> <div class="calificacion"> 
                <button type="button" class="btn btn-info btn-sm text-uppercase" data-toggle="modal" data-target="#reply" id="btn_${cont}" onclick="fnBtnId(this)">
                    responder
                </button>`;
            }
            // crear estrellas como calificacion.
            card_body_html += `<span class="float-right" id="stars_${cont}">`;
            for (let index = 0; index <= 4; index++) 
            {
                if(index < element.number)
                {
                    card_body_html += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="${colorstar}" xmlns="http://www.w3.org/2000/svg"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>`;
                }
                else
                {
                    card_body_html += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>`;
                }
            }
            card_body_html += `<p class="d-none" id="valor_calificacion">${element._id}</p></span></div> </div>`;
            cont +=1;
        });
        card_element.innerHTML = card_body_html; 
           
        
        /* data dinamicamente obtenida para grafica calificaciones en forma circular chart.js  */
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Inconforme', 'Medianamente Conforme', 'Conforme'],
                datasets: [{
                    label: '# of Votes',
                    data: [dissatisfied, moderately_compliant, according],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(165, 255, 20, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    else
    {
        return "No se encontro datos.";
    }
},
(err) =>{console.log("error solicitud.followers "+err)});

function fnBtnId(cont)
{
    let id = cont.id, num;
    num = id.slice(4);
    //  crear la captura del span con la cantidad de estrellas para este msm
    let card_header = document.getElementById(`card_heder_${num}`);
    let star_calificacion = document.getElementById(`stars_${num}`);
    let mensaje = document.getElementById(`comment_${num}`);
    // crear modal con data del cliente dinamicamente
    modal_resp = 
    `<div class="modal-content">
        <div class="modal-header"> ${card_header.innerHTML}<span class="px-3 pt-1" >${star_calificacion.innerHTML}</span>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <h6 class="modal-title font-weight-bold text-uppercase">Mensaje del usuario.  </h6>
            <p> ${mensaje.innerText} </p>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text text-uppercase" id="basic-addon1"> responder</span>
                </div>
                <textarea name="textarea" rows="4" cols="50" placeholder="Write something here..." maxlength="140" id="textare_comment"></textarea>
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input" id="check_msm"><span class="pl-3">&nbsp; SMS &nbsp;&nbsp;</span>
                    </div>
                </div>
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input" id="check_email"><span class="pl-3">EMAIL &nbsp;</span>
                    </div>
                </div>
                <div class="input-group-prepend add_gif" id="add_gif"></div>
            </div>
        </div>
        <div class="modal-footer dropup">
            <button type="button" class="btn btn-success text-uppercase" data-dismiss="modal" id="enviar" onclick="capturarCheck(this)">Enviar</button>`
        // crear div para escoger gif
        modal_resp += 
            `<button type="button" class="btn btn-primary text-uppercase" data-toggle="collapse" id="add_gif" href="#collapse123" onclick="capturarCheck(this)">Seleccionar Gifcard</button>
        </div>
        <div class="card-body">
            <div class="row collapse" id="collapse123">
                ${"creacion de la gifcard de manera dimanica"}
                <div class="col-sm-6 col-md-6 col-lg-6"> 
                    <div class="main-card mb-3 card ion-color-barter3 add_gif">
                        <div class="row">
                            <div class="col">
                                <p ><b id="gift_amount">10,000$</b></p>
                            </div>
                        </div>
                        
                        <div class="card-body">
                            <img width="100%" src="https://barter-token.herokuapp.com/favicon.ico" alt="Card image cap" class="card-img-top ">
                        </div>
                        
                        <div class="card-body">
                            <p class="padding" id="gift_business_nombre">{{gift.business.nombre}}</p>
                            <p class="padding" id="gift_fk_empresa_name">{{gift.fk_empresa.name}}</p>
                            <p class="padding" id="gift_fecha_final">Vence: {{gift.fecha_final|date}}</p>
                            <p><small class="padding"><a href="https://token-platform.herokuapp.com/">Ir a Token App</a></small></p>
                        </div>
                    </div> 
                </div>
            </div> 
        </div>
    </div>`;
    // llamar al objeto con datos iniciales para crear la resp
    // validar_data();
    // captura del div con el id para la modal e insercion de respuesta
    document.getElementById("replyContent").innerHTML = modal_resp;
}

function capturarCheck(id_btn)
{
    
    if(id_btn.id !=="enviar")
    {
        const gif_card = loadGifCard();
    }
    else
    {
        const send_resp = sendResp();
        if(send_resp.idcalify !=="")
        {
            if(send_resp.id_brach === "") send_resp.id_brach = null;
            fetch("https://barter-token.herokuapp.com/api/calificationsA",{
                method: "POST",
                headers:  
                {
                    'Content-Type': 'application/json',
                    "Authorization":  $.cookie("TOKEN"),
                },
                body: JSON.stringify( 
                {
                    "idcalify":           send_resp.idcalify,
                    "idgiftcard":         send_resp.idgiftcard,
                   "msgcalificationb":    send_resp.msgcalificationb, 
                    "sendEmail":          send_resp.sendEmail,
                    "sendSms":            send_resp.sendSms, 
                    "tradename":          send_resp.tradename,
                    "idbranch" :          send_resp.id_brach
                }),
            })
            .then(resp => {
                if(resp.status !== 200)
                {
                    const divreply = document.getElementsByClassName("app-container");
                    const replyContent = document.getElementById("replyContent");
                    divreply.style.display = "block";
                    divreply.classList.add("show");
                    let alert_resp = `
                        <div class="alert alert-danger" role="alert" id="alerta_error">
                            ${resp.statusText}. 
                            <a href="http://localhost/token-plataforma/bt-admin/campanas.html" class="alert-link">Campañas</a> 
                        </div>`;
                    divreply.innerHTML = alert_resp;
                    setTimeout(function()
                    {   
                        divreply.style.display = "none";
                        divreply.classList.remove("show");
                        alert_resp = ``;
                    }, 13000);
                }
                // pruebas de mensajes de respuesta
                enviarAlert(resp.statusText);
                $('#alerta_error').fadeIn();     
                setTimeout(function() {
                    $("#alerta_error").fadeOut();           
                },3000);
                updateGrades(resp);
            })
            .catch(error => {
                enviarAlert(error);
                $('#alerta_error').fadeIn();     
                setTimeout(function() {
                    $("#alerta_error").fadeOut();           
                },3000);
            });
        }
    }
    // return true;
}

function loadGifCard()
{
    let img_gifcard = ``, array_amount = [], id;
    let ids = [];
    companier.getgiftsA()
    .then((response)=> 
    {
        const f = new Date();
        let cont =1
        response.forEach(element => 
        {
            const f_gif = new Date(element.fecha_final);
            amount = format(element.amount);
            array_amount.push(amount);
            id = element._id;
            if(f_gif.getTime() > f.getTime() && (element.status === true))
            {
                img_gifcard += `
                <div class="col-sm-6 col-md-6 col-lg-6"> 
                    <div class="main-card mb-3 card ion-color-barter3">
                        <div class="row">
                            <div class="col">
                                <p >
                                    $<b class="gift_amount">${amount}</b>
                                </p>
                            </div>
                        </div>
                        <div class="card-body">
                            <img width="100%" src="https://barter-token.herokuapp.com/favicon.ico" alt="Card image cap" class="card-img-top ">
                        </div>
                        <div class="card-body">
                            <p class="" id="gift_business_nombre">${JSON.parse($.cookie("business")).nombre}</p>
                            <div class="descripcion" id="id_${cont}">${element.nombre } ${ element.descripcion}
                            </div>
                            <p class="">vence: ${moment(f_gif).format("MMM D, YYYY")}</p>
                            seleccionar <a class="text-warning stretched-link" href="#" id="${element._id}">aqui</a>
                        </div>
                    </div>
                </div>`;
                cont += 1; 
            }
        });

        // captura del contenedor para insertar las tarjetas gif creadas dinamicamente.
        document.getElementById("collapse123").innerHTML = img_gifcard;
        const btngif = document.getElementsByClassName("text-warning");
        let btnEvent;
        // capturar el id de cada ancla creada dinamicamente
        for(index = 0; index < btngif.length; index++)
        {
            btnEvent = document.getElementById(btngif[index].id);
            ids.push(btngif[index].id);
            btnEvent.addEventListener("click", capturarIdGif);
        }
    },
    (err) =>{console.log("error solicitud.followers "+err)});
    return ids;

}

function sendResp()
{
    // obtener idcalificacion
    let valor_calificacion = document.getElementById("valor_calificacion");
    body_ratings.idcalify = valor_calificacion.innerHTML;
    // obtener tradname 
    body_ratings.tradename = JSON.parse($.cookie("business")).nombre;
    // obtener comentario de respuesta
    body_ratings.msgcalificationb = document.getElementById('textare_comment').value.trim() !== "" ? document.getElementById('textare_comment').value.trim() : "Disculpe las molestia.";
    //obtener idgiftcard 
    gitcargada = document.getElementsByClassName("diferencial");
    body_ratings.idgiftcard = gitcargada[0] ? gitcargada[0].id : null;
    // obtener envio de msm por Email y msm.
    let checkbox_msm = document.getElementById("check_msm");
    let checkbox_email = document.getElementById("check_email");

    body_ratings.sendSms    = checkbox_msm.checked ? true : false; 
    body_ratings.sendEmail  = checkbox_email.checked ? true : false; 
    return body_ratings;
}

function capturarIdGif(e)
{
    close_modal = document.getElementById("collapse123");
    close_modal.classList.remove("show");
    add_gif = document.getElementById(add_gif);
    html_add = `
    <div class="alert alert-warning alert-dismissible fade show text-uppercase ion-color-barter3 diferencial" role="alert" id="${e.target.id}">
        <strong>$ 10000 </strong> gifcad cargada.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
    document.getElementById("add_gif").innerHTML = html_add;
}

function enviarAlert(msm = false)
{
    clase_alert = (msm === "OK") ? "alert-success" : "alert-danger";
    mensajecalif = (msm === "OK") ? "<strong>Respuesta enviada!</strong> correctamente." : "<strong>Ops! algo salio mal... </strong>la respuesta no pudo ser enviada.";
    const alerta_error = document.getElementById("alerta_error");

    let alert_resp = `
        <div class="alert mb-3 ${clase_alert} alert-dismissable">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            ${mensajecalif}                  
        </div>`;
        alerta_error.innerHTML = alert_resp;
}

function selectBranch(id_branch)
{
    
    if(id_branch)
    {
        let container = validar_data("id_brach", id_branch);
        if(container.id_branch !== "")
        {
            companier.getqualification(container.id_branch)
                .then((response)=> 
                {
                    if(response.data)
                    {
                        let Data = response.data;
                        let dissatisfied = 0, moderately_compliant = 0, according = 0, total_msm = 0;
                        let card_body_html = ``; 
                        let card_element = document.getElementById('contenedor');
                        let cont = 1;
                        let stop = 2
                        const colorstar= "#fed22b";

                        Data.forEach(element => {
                            total_msm +=1;
                            // este segmento se debe eliminar antes de subir ya que son pruebas del renderizado de la nueva data

                            if(element.number <= stop)
                            {
                                element.fk_user.name = "sinedin_";
                            }
                            if(element.number == 4)
                            {
                                element.number = 2;
                            }
                            
                            // este segmento se debe eliminar antes de subir ya que son pruebas del renderizado de la nueva data
                            switch(element.number)
                            {
                                case 1: 
                                case 2: 
                                    dissatisfied += 1;
                                    break;
                                case 3: 
                                    moderately_compliant += 1;
                                    break;
                                case 4:
                                case 5:
                                    according += 1;
                                    break;
                            }

                            card_body_html += `<div class='card-body' id='card_${cont}' > <span class='img_user' id="card_heder_${cont}">`
                            // <img width='33' class='rounded-circle' id='avatar_${cont}' src='${element.fk_user.image}' alt='user_avatar' />  <span class="px-3 pt-1" id="name">${element.fk_user.name} ${element.fk_user.lastname} (${element.fk_user.username}) </span></span>`;

                            if(element.fk_user.image === "")
                            {
                                card_body_html += `
                                                    <i class="fa fa-user" aria-hidden="true" title="Copy to use user" style="width: 33px"></i>
                                                    <span class="px-3 pt-1" id="name">${element.fk_user.name} ${element.fk_user.lastname} (${element.fk_user.username}) 
                                                    </span>
                                                </span>`;
                            }
                            else
                            {
                                card_body_html += `<img width='33' class='rounded-circle' id='avatar_${cont}' src='${element.fk_user.image}' alt='avatar' />  <span class="px-3 pt-1" id="name">${element.fk_user.name} ${element.fk_user.lastname} (${element.fk_user.username}) </span></span>`;
                            }

                            if(element.comentary == undefined || element.comentary === "")
                            { 
                                card_body_html += `<p class='card-text comentario' id="comment_${cont}"> calificación sin comentario. </p> <div class="calificacion">
                                <button type="button" class="btn btn-info btn-sm text-uppercase" data-toggle="modal" data-target="#reply" id="btn_${cont}" onclick="fnBtnId(this)">
                                    responder
                                </button>`;
                            }else
                            {
                                card_body_html += `<p class='card-text' id="comment_${cont}"> ${element.comentary} </p> <div class="calificacion"> 
                                <button type="button" class="btn btn-info btn-sm text-uppercase" data-toggle="modal" data-target="#reply" id="btn_${cont}" onclick="fnBtnId(this)">
                                    responder
                                </button>`;
                            }
                            // crear estrellas como calificacion.
                            card_body_html += `<span class="float-right" id="stars_${cont}">`;
                            for (let index = 0; index <= 4; index++) 
                            {
                                if(index < element.number)
                                {
                                    card_body_html += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="${colorstar}" xmlns="http://www.w3.org/2000/svg"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/> </svg>`;
                                }
                                else
                                {
                                    card_body_html += `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>`;
                                }
                            }
                            card_body_html += `<p class="d-none" id="valor_calificacion">${element._id}</p></span></div> </div>`;
                            cont +=1;
                        });
                        card_element.innerHTML = card_body_html; 
                        
                        /* data dinamicamente obtenida para grafica calificaciones en forma circular chart.js  */
                        // eliminacion de el primer canvas
                        var $parent = $('#myChart').parent();
                        $('#myChart').remove();
                        $parent.append('<canvas id="myChart" width="1" height="1" class="canvas_calificaciones"></canvas>');
                        // fin de la eliminacion de el primer canvas.
                        var ctx = document.getElementById('myChart').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'pie',
                            data: {
                                labels: ['Inconforme', 'Medianamente Conforme', 'Conforme'],
                                datasets: [{
                                    label: '# of Votes',
                                    data: [dissatisfied, moderately_compliant, according],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(165, 255, 20, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });
                    }
                    else
                    {
                        return "No se encontro datos.";
                    }
                },
                (err) =>{console.log("error solicitud.followers "+err)
            });
        }

    }
}

function validar_data(validador, ...param)
{
    body_ratings.id_brach = validador ? param[0] : "";
    return body_ratings;
}

function capturarClick()
{
    const filtro_fecha = document.getElementById("calif_filtro");
    filtro_fecha.addEventListener("click", (e)=>{
        const click_menor = e.path[1];
        click_menor.fill = "#16aaff";
        e.path.forEach(element => {
        })
    });
}








