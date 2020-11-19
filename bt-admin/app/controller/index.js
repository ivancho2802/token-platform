
    //console.log(JSON.parse($.cookie("business")))
    $( document ).ready(function() {
        /**
        *   data de la empresa perfil
        */
        if(!(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
            return;
        var followersData, balancesmsemailData, citiesData, usersData
        //fallowers
        companier.followers(JSON.parse($.cookie("userData"))._id)
        .then((response)=> {
            // console.log(response)
            followersData = response; 
            document.getElementById("follower").innerHTML = followersData.numseguidores;
            //cities
            companier.cities()
            .then((response)=> {
                citiesData = response; 
                document.getElementById("userfallowers").innerHTML = getTableUsers(followersData, citiesData)
            }, 
            (err) =>{console.log("error solicitud.balancesmsemail "+err)});
        }, 
        (err) =>{console.log("error solicitud.followers "+err)});
        //clientes 
        companier.clients()
        .then((response)=> {
            usersData = response; 
            document.getElementById("percentFollowers").innerHTML = Math.round((document.getElementById("follower").innerHTML * 100)/ usersData.fk_user_asocd.length);

            //cities
            companier.cities()
            .then((citiesData2)=> {
                document.getElementById("userActivos").innerHTML = getTableUsersAct(usersData, citiesData2)
            }, 
            (err) =>{console.log("error solicitud.balancesmsemail "+err)});
        }, 
        (err) =>{ console.log(err); console.log("error companier.clients "+err.responseJSON.msg)});

        //balance sms email
        companier.balancesmsemail(JSON.parse($.cookie("userData"))._id)
        .then((response)=> {
            balancesmsemailData = response; 
            document.getElementById("numSms").innerHTML = balancesmsemailData.billpaybell ? balancesmsemailData.billpaybell.numSms: 0;
            document.getElementById("numEmail").innerHTML = balancesmsemailData.billpaybell ? balancesmsemailData.billpaybell.numEmail: 0;
            document.getElementById("saldoTotal").innerHTML = acumElementOfArrayObject(balancesmsemailData.billpayed, 'saldopay', true);
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});
        
        //statics
        companier.staticsHome()
        .then((response)=> { 
            var cuponsClienteActivo=[], cuponsClienteScan=[], cuponsClienteVencido=[], labelsStatics=[], semanaMayor, dataCuponsClienteScan=[], dataCuponsClienteVencido=[], dataCuponsClienteActivo=[];

            var cantCuponsSee = response.acumCuponClientActivos.length + response.acumCuponClientActivosVencido.length + response.acumCuponClientScan.length;

            document.getElementById("cantCuponsSee").innerHTML = cantCuponsSee;

            if(response.acumCuponClientActivos.length) 
               cuponsClienteActivo = groupByWeek(response.acumCuponClientActivos)
            if(response.acumCuponClientActivosVencido.length) 
               cuponsClienteVencido = groupByWeek(response.acumCuponClientActivosVencido)
            if(response.acumCuponClientScan.length) 
               cuponsClienteScan = groupByWeek(response.acumCuponClientScan)

            var auxScan = cuponsClienteScan.length ? cuponsClienteScan[cuponsClienteScan.length-1].week:'',
            auxVenc = cuponsClienteVencido.length ? cuponsClienteVencido[cuponsClienteVencido.length-1].week : '',
            auxAct = cuponsClienteActivo.length ? cuponsClienteActivo[cuponsClienteActivo.length-1].week:'', 
            dates = []

            if(auxScan)dates.push( auxScan.split('-').pop()); 
            if(auxAct)dates.push( auxAct.split('-').pop()); 
            if(auxVenc)dates.push( auxVenc.split('-').pop());  

            semanaMayor = Math.max.apply(null, dates);
            semanaMenor = Math.min.apply(null, dates);

            // var formatsemanaMayor = '2020'
            var j = 0
            for (var i = semanaMenor; i < semanaMayor+1; i++) {
                // console.log("Semana "+i );

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

            var bodyStatics = {
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
            window.onload = function() {

                var $parent = $('#canvas').parent();
                $('#canvas').remove();
                $parent.append('<canvas id="canvas"></canvas>');

               if (document.getElementById("canvas")) {
                    var e = document.getElementById("canvas").getContext("2d");
                    window.myBar = new Chart(e, {
                        type: "bar",
                        data: bodyStatics, 
                        options: {
                            responsive: !0,
                            legend: {
                                position: "top"
                            },
                            title: {
                                display: !1,
                                text: "Chart.js Bar Chart"
                            }
                        }
                    })
                }
            }
            //cupones vendidos o redimidos
            document.getElementById("productsSold").innerHTML = acumElementIIILOfArrayObject(response.acumCuponClientScan, 'fk_cupones', '0', 'amount',true);
        }, 
        (err) =>{console.log("error solicitud.balancesmsemail "+err)});

        document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
        document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
        document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image;
        
    })