$( document ).ready(function() {
    var bodyStatics, citiesData ;
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
})
companier.getqualification(null)
.then((response)=> 
{
    if(response.data)
    {
        let dissatisfied = 0, moderately_compliant = 0, according = 0, total_msm = 0;
        let Data = [];
        let card_body_html = ``; 
        let element = document.getElementById('contenedor');
        Data = response.data;
        let colorstar= "#fed22b";
        
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
                // default:
                //     return "Token sin calificación.";
                //     break;
            }

            card_body_html += `<div class='card-body' id='card_${element.number}' > <span class='img_user'><img width='33' class='rounded-circle' id='avatar' src='${element.fk_user.image}' alt='user_avatar' />  ${element.fk_user.name} ${element.fk_user.lastname} (${element.fk_user.username}) </span>`;
            if(element.comentary == undefined || element.comentary === "")
            { 
                card_body_html += `<p class='card-text comentario'> calificación sin comentario. </p> <div class="calificacion"> <a href="#" class="btn btn-primary btn-sm text-uppercase">responder</a> <span class="float-right" id="stars">`;
            }else
            {
                card_body_html += `<p class='card-text'> ${element.comentary} </p> <div class="calificacion"> <a href="#" class="btn btn-primary btn-sm text-uppercase" >responder</a> <span class="float-right" id="stars">`;
            }
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

            card_body_html += `<span></div> </div>`

        });
        element.innerHTML = card_body_html;
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
        // cargar ventana emergente para responder msm y o enviar gifcard
    }
},
(err) =>{console.log("error solicitud.followers "+err)});






