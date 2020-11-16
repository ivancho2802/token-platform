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
    var branchsData, bodyStatics, citiesData ;
    /**
    *   data de la empresa perfil
    */
    if(!(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
        return;

   /*  document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
    document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
    document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image; */

    // sucursales
    companier.branchs()
    .then((response)=> { 
        console.log('test 1');
        document.getElementById("branchs").innerHTML = getTableBranchs(branchsData);
        console.log(document.getElementById("branchs").innerHTML);
        branchsData = response; 
    }, 
    (err) =>{console.log("error companier.branchs "+err)});

    //animacion tabs de statics
    /* $('.tabsstatics').on('click', 'a', function() {
        var $this = $(this),
          $ul = $this.parents('ul');
        $ul.find('a').removeClass('active');
        $this.addClass('active');
    }); */
});

/* return $.ajax({
    url : 'https://barter-token.herokuapp.com/api/belltest/'+idbell,
    type: 'GET',
    headers: {"Authorization":  $.cookie("TOKEN")},
    contentType: "application/json; charset=utf-8"
}) */



