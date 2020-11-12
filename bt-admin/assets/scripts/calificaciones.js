/* data settiada para calificaciones grafica en forma circular chart.js  */
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['inconforme', 'medianamente conform', 'conforme'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
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
        let name_user = [];
        let img_user = [];
        let Data = [];
        let card_body_html = ""; 
        img_user = document.getElementById("card_");
        Data = response.data;
        console.log("Data: ",Data);
        /* console.log("img_user: ",img_user);
        console.log("innerHTML: ",img_user.innerHTML); */
        for(i = 0; i < Data.length; i++)
        {  
            card_body_html += "<div class='card-body' id='card_";
            card_body_html += i;
            card_body_html += "' >";
            /* imagen de usernombre y username */
            card_body_html += "<span class='img_user'><img width='33' class='rounded-circle' id='avatar' src='";
            card_body_html += Data[i]["fk_user"].image;
            card_body_html += "' alt='user_avatar' /> ";
            card_body_html += Data[i]["fk_user"].name+" "+Data[i]["fk_user"].lastname+" ("+ Data[i]["fk_user"].username+")";
            card_body_html += "</span>";
            card_body_html += "<p class='card-text'>";
            /* comentario */
            if(isset(Data[i]["comentary"]) && Data[i]["comentary"] !== "")
            {
                card_body_html += Data[i]["comentary"]+". ";
            }
            card_body_html += "";
            card_body_html += "</p>";
            /* botones de responder y calificacion espresada en estrellas */

            /* <div class="calificacion"><a href="#" class="btn btn-primary btn-sm">responder</a><span class="float-right"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="#fed22b" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
            </div> */
            /* console.log(Data[i]["fk_user"].name+" - "+Data[i]["fk_user"].lastname); */
            /* name_user.push(Data[i]["fk_user"].name+" - "+Data[i]["fk_user"].lastname+" ("+ Data[i]["fk_user"].username+")");
            name_user.push(Data[i]["fk_user"].image);
            name_user.push(Data[i]["number"]); */
            card_body_html += "</div>";
            
        }
        console.log("card_body_html: ", card_body_html.innerHTML);
    }
},
(err) =>{console.log("error solicitud.followers "+err)});
/* console.log("companier: ",companier.getqualification()); */



