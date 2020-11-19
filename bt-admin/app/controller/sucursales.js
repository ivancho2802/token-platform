let currentPosition;
var geocoder = new google.maps.Geocoder;
class Sucursal  {
    constructor () {}

    initMapsMakerCustom(LatLng, imgcompany) {
        let map
        
        //const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/";
        var address = "";
        map = new google.maps.Map(document.getElementById("mapcompany"), {
            center: new google.maps.LatLng(LatLng ? LatLng.lat :7.888654, LatLng ? LatLng.lng :-72.503693),
            zoom: LatLng ? 16 : 10,
        });
        const icons = { 
            imgcompany: {
                icon: imgcompany,
            },
            info: {
                icon: "https://barter-token.herokuapp.com/api/assets/markertoken.png",
            },
        };
        const features = [
            {
                position: new google.maps.LatLng(LatLng ? LatLng.lat :7.888654, LatLng ? LatLng.lng :-72.503693),
                type: imgcompany ? "info": "info",
            }
        ];
        if(!LatLng){
            address = document.getElementById('address').value;
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        icon: icons[features[0].type].icon,
                        map: map,
                        position: results[0].geometry.location,
                        "draggable": true
                    });
                    google.maps.event.addListener(marker,'drag',function(event) {
                        console.log(event.latLng.lat());
                        console.log(event.latLng.lng());
                        
                        console.log("position change")
                        console.log(event.latLng)
                        currentPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                        document.getElementById("addressCompleteLat").value=currentPosition.lat
                        document.getElementById("addressCompleteLng").value=currentPosition.lng
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }else{
            // Create markers.
            for (let i = 0; i < features.length; i++) {
                const marker = new google.maps.Marker({
                position: features[i].position,
                icon: icons[features[i].type].icon,
                map: map,
                "draggable": true
                });
                google.maps.event.addListener(marker,'drag',function(event) {
                    console.log(event.latLng.lat());
                    console.log(event.latLng.lng());
                    
                    console.log("position change")
                    console.log(event.latLng)
                    currentPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                    document.getElementById("addressCompleteLat").value=currentPosition.lat
                    document.getElementById("addressCompleteLng").value=currentPosition.lng
                });
            }
        } 
    }

    initMapsMakerCustomEditBranch(LatLng, imgcompany, index) {
        let map
        
        //const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/";
        var address = "";
        map = new google.maps.Map(document.getElementById("mapcompany"+index), {
            center: new google.maps.LatLng(LatLng ? LatLng.lat :7.888654, LatLng ? LatLng.lng :-72.503693),
            zoom: LatLng ? 16 : 10,
        });
        const icons = { 
            imgcompany: {
                icon: imgcompany,
            },
            info: {
                icon: "https://barter-token.herokuapp.com/api/assets/markertoken.png",
            },
        };
        const features = [
            {
                position: new google.maps.LatLng(LatLng ? LatLng.lat :7.888654, LatLng ? LatLng.lng :-72.503693),
                type: imgcompany ? "info": "info",
            }
        ];
        if(!LatLng){
            address = document.getElementById('address').value;
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        icon: icons[features[0].type].icon,
                        map: map,
                        position: results[0].geometry.location,
                        "draggable": true
                    });
                    google.maps.event.addListener(marker,'drag',function(event) {
                        console.log(event.latLng.lat());
                        console.log(event.latLng.lng());
                        
                        console.log("position change")
                        console.log(event.latLng)
                        currentPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                        document.getElementById("addressCompleteLat"+index).value=currentPosition.lat
                        document.getElementById("addressCompleteLng"+index).value=currentPosition.lng
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }else{
            // Create markers.
            for (let i = 0; i < features.length; i++) {
                const marker = new google.maps.Marker({
                position: features[i].position,
                icon: icons[features[i].type].icon,
                map: map,
                "draggable": true
                });
                google.maps.event.addListener(marker,'drag',function(event) {
                    console.log(event.latLng.lat());
                    console.log(event.latLng.lng());
                    
                    console.log("position change")
                    console.log(event.latLng)
                    currentPosition = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                    
                    document.getElementById("addressCompleteLat"+index).value=currentPosition.lat
                    document.getElementById("addressCompleteLng"+index).value=currentPosition.lng
                });
            }
        } 
    }

    adduser(index){
        var tamuserbox = 0;
        if(index == null){
            tamuserbox = document.getElementsByName("nameuser").length + 1 ;
            document.getElementById("usuarios_box").innerHTML += `
            <div class="main-card mb-3 card alert  alert-dismissible fade show" role="alert">
                <div class="card-header ">
                    <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                </div>
                <div class="card-body ">
                    <h5 class="card-title">Datos del Usuario ${tamuserbox}</h5>
                    <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" required></div>
                    <div class="position-relative form-group"><label for="username" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" required></div>
                    <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" required></div>
                </div>
            </div>
            `;
        }else{
            tamuserbox = document.getElementsByName("nameuser"+index).length + 1 ;
            document.getElementById("usuarios_box"+index).innerHTML += `
            <div class="main-card mb-3 card alert  alert-dismissible fade show" role="alert">
                <div class="card-header ">
                    <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                </div>
                <div class="card-body ">
                    <h5 class="card-title">Datos del Usuario ${tamuserbox}</h5>
                    <div class="position-relative form-group"><label for="nameuser${index}" class="">Nombre</label><input name="nameuser${index}" placeholder="Nombre Completo" type="text" class="form-control" required></div>
                    <div class="position-relative form-group"><label for="username${index}" class="">Username</label><input name="username${index}" placeholder="Username" type="text" class="form-control" required></div>
                    <div class="position-relative form-group"><label for="pswuser${index}" class="">Contraseña</label><input name="pswuser${index}" type="password" class="form-control" required></div>
                </div>
            </div>
            `;
        }
        
    }
}
$( document ).ready(function() {

    /**
    * sucursales
    */ 
    new Help().loadbrnachs();
    brancher.branchsclient();
    /**
    *   data de la empresa perfil
    */
    if($.cookie("userData") && $.cookie("business") && !(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
        return;

    document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
    document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
    document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image;

    //init statics segun sucursales
    new Estadistica().groupStatics('genero', null);

    //init google maps
    new Sucursal().initMapsMakerCustom(null,JSON.parse($.cookie("userData")).image);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        console.log("INVALIDO multi")
                        event.preventDefault();
                        event.stopPropagation();
                        //return
                    }
                    form.classList.add('was-validated');
                    
                    var nameuserArray = [], usernameArray = [], pswuserArray=[], valid=false

                    for (let i = 0; i < form.elements["username"].length; i++) {
                        const nameuser = form.elements["nameuser"][i].value;
                        const username = form.elements["username"][i].value;
                        const pswuser = form.elements["pswuser"][i].value;
                        nameuserArray.push(nameuser)
                        usernameArray.push(username)
                        pswuserArray.push(pswuser)
                    }
                    console.log("form.elements")
                    console.log(form.elements)
                    console.log(form.elements["namebranch"])

                    let body = {
                        nombre: form.elements["namebranch"].value,
                        description: form.elements["descripbranch"].value,
                        address: form.elements["address"].value,
                        addressComplete: JSON.stringify(currentPosition),
                        nameuser: nameuserArray,
                        username: usernameArray,
                        pswuser: pswuserArray
                    }
                    console.log(body)
                    console.log("registrar")
                    brancherRouter.setbranch(body)
                    .then(branchs=>{
                        for (let i = 0; i < branchs.length; i++) {
                            const branch = branchs[i];
                            var usersbranch = `<td class="text-center">`;
                            var formuserbranch = ``;

                            for (let j = 0; j < branch.fk_user_branch.length; j++) {
                                const fk_user_branch = branch.fk_user_branch[j];
                                usersbranch += `
                                    <div class="row">
                                        <div class="col">Nombre: ${fk_user_branch.name}</div>
                                        <div class="col">Username: ${fk_user_branch.username}</div>
                                    </div>
                                `;
                                formuserbranch += `
                                <div class="main-card mb-3 card">
                                    <div class="card-body">
                                        <h5 class="card-title">Datos del Usuario 1</h5>
                                        <div class="position-relative form-group"><label for="nameuser${i}" class="">Nombre</label><input name="nameuser${i}" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                                        <div class="position-relative form-group"><label for="nameuser${i}" class="">Username</label><input name="username${i}" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                                        <div class="position-relative form-group"><label for="pswuser${i}" class="">Contraseña</label><input name="pswuser${i}" type="password" class="form-control" value="${fk_user_branch.password}" required></div>
                                    </div>
                                </div>
                                `;
                            }
                            usersbranch += `</td>`;
                            document.getElementById("clientbranchs").innerHTML = `
                            <tr>
                                <td class="text-center">${branch.nombre}</td>
                                <td class="text-center">${branch.address}</td>
                                <td class="text-center">${branch.addressComplete}</td>
                                ${usersbranch}
                                <td class="text-center">
                                    <button type="button"  data-toggle="collapse" href="#collapsebranch${branch._id}" class="btn btn-primary">Editar Sucursal.</button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="12">
                                        <div class="row ">
                                            <div class="col-12">

                                                <div class="collapse" id="collapsebranch${branch._id}">
                                                    <form class="needs-validation" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="card-body">
                                                                        <h5 class="card-title">Datos de la Sucursal</h5>
                                                                        <div class="position-relative form-group"><label for="namebranch${i}" class="">Nombre</label><input name="namebranch${i}" id="namebranch${i}" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                                        <div class="position-relative form-group"><label for="descripbranch${i}" class="">Descripcion</label><textarea name="descripbranch${i}" id="descripbranch${i}" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                                        <div class="position-relative form-group"><label for="address${i}" class="">Direccion - Ciudad</label><input name="address${i}" id="address${i}" type="textbox" value="${branch.address}" onkeyup="new Sucursal().initMapsMakerCustom()" class="form-control"></div>
                                                                        <div class="position-relative form-group"><label for="addressCompleteLat${i}" class="">Direccion - GPS Google Maps</label>
                                                                            
                                                                            <div class="input-group">
                                                                                <div class="input-group-prepend">
                                                                                    <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                                </div>
                                                                                <input name="addressCompleteLat${i}" id="addressCompleteLat${i}" type="number" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                                <div class="input-group-prepend">
                                                                                    <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                                </div>
                                                                                <input name="addressCompleteLng${i}" id="addressCompleteLng${i}" type="number" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                            </div>
            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="card-body">
                                                                        <div class="card-title">Ubicacion por GPS - Google Maps</div>
                                                                        <div id="mapcompany${i}" class="paginaPrinc map mapcompany"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class=" col-md-10 col-lg-12">
                                                                <div id="usuarios_box${i}">

                                                                    ${formuserbranch}

                                                                </div>
                                                            </div> 

                                                            <div class=" col-md-10 col-lg-12">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="d-block text-center card-footer">
                                                                        <button class="btn-wide btn btn-primary" type="button" onclick="new Sucursal().adduser(${i})">Agregar Usuario</button>
                                                                        <!--  onclick="new Sucursal().insertBranch()" -->
                                                                    </div>
                                                                </div>
                                                            </div> 

                                                            <div class=" col-md-10 col-lg-12">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="d-block text-center card-footer">
                                                                        <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> -->
                                                                        <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button><!--  onclick="new Sucursal().insertBranch()" -->
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    </form>
                                                </div>

                                            
                                            </div>
                                            

                                        </div>
                                    

                                </td>
                            </tr>
                            `;
                            
                            new Sucursal().initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
                        }
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert" ><span aria-hidden="true">×</span></button>
                                ¡Sucursal Creada con exito!
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    },errbranch=>{
                        console.log("errbranch")
                        console.log(errbranch)
                        console.log(ererrbranch.responseJSON.msgrbranch)
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                                ¡Error al crear sucursal! ${errbranch.responseJSON.msg}
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    })


                }, false);
            });
        }, false);
    })();
    /* 
    document.getElementById("formbranch").addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("event")
        console.log(event)
        if (document.getElementById("formbranch").checkValidity() === false) {
            console.log("INVALIDO")
            event.preventDefault();
            event.stopPropagation();
            return
        }

        var nameuserArray = [], usernameArray = [], pswuserArray=[], valid=false

        for (let i = 0; i < document.getElementsByName("nameuser").length; i++) {
            const nameuser = document.getElementsByName("nameuser")[i].value;
            const username = document.getElementsByName("username")[i].value;
            const pswuser = document.getElementsByName("pswuser")[i].value;
            nameuserArray.push(nameuser)
            usernameArray.push(username)
            pswuserArray.push(pswuser)
        }

        let body = {
            nombre: document.getElementById("namebranch").value,
            description: document.getElementById("descripbranch").value,
            address: document.getElementById("address").value,
            addressComplete: JSON.stringify(currentPosition),
            nameuser: nameuserArray,
            username: usernameArray,
            pswuser: pswuserArray
        }
        console.log(body)
        console.log("registrar")
        
        brancherRouter.setbranch(body)
        .then(branchs=>{
            for (let i = 0; i < branchs.length; i++) {
                const branch = branchs[i];
                var usersbranch = `<td class="text-center">`;
                var formuserbranch = ``;

                for (let j = 0; j < branch.fk_user_branch.length; j++) {
                    const fk_user_branch = branch.fk_user_branch[j];
                    usersbranch += `
                        <div class="row">
                            <div class="col">Nombre: ${fk_user_branch.name}</div>
                            <div class="col">Username: ${fk_user_branch.username}</div>
                        </div>
                    `;
                    formuserbranch += `
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Datos del Usuario 1</h5>
                            <div class="position-relative form-group"><label for="nameuser${i}" class="">Nombre</label><input name="nameuser${i}" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                            <div class="position-relative form-group"><label for="nameuser${i}" class="">Username</label><input name="username${i}" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                            <div class="position-relative form-group"><label for="pswuser${i}" class="">Contraseña</label><input name="pswuser${i}" type="password" class="form-control" value="${fk_user_branch.password}" required></div>
                        </div>
                    </div>
                    `;
                }
                usersbranch += `</td>`;
                document.getElementById("clientbranchs").innerHTML = `
                <tr>
                    <td class="text-center">${branch.nombre}</td>
                    <td class="text-center">${branch.address}</td>
                    <td class="text-center">${branch.addressComplete}</td>
                    ${usersbranch}
                    <td class="text-center">
                        <button type="button"  data-toggle="collapse" href="#collapsebranch${branch._id}" class="btn btn-primary">Editar Sucursal.</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                            <div class="row ">
                                <div class="col-12">

                                    <div class="collapse" id="collapsebranch${branch._id}">
                                        <form class="needs-validation" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="main-card mb-3 card">
                                                        <div class="card-body">
                                                            <h5 class="card-title">Datos de la Sucursal</h5>
                                                            <div class="position-relative form-group"><label for="namebranch${i}" class="">Nombre</label><input name="namebranch${i}" id="namebranch${i}" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                            <div class="position-relative form-group"><label for="descripbranch${i}" class="">Descripcion</label><textarea name="descripbranch${i}" id="descripbranch${i}" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                            <div class="position-relative form-group"><label for="address${i}" class="">Direccion - Ciudad</label><input name="address${i}" id="address${i}" type="textbox" value="${branch.address}" onkeyup="new Sucursal().initMapsMakerCustom()" class="form-control"></div>
                                                            <div class="position-relative form-group"><label for="addressCompleteLat${i}" class="">Direccion - GPS Google Maps</label>
                                                                
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                    </div>
                                                                    <input name="addressCompleteLat${i}" id="addressCompleteLat${i}" type="number" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                    </div>
                                                                    <input name="addressCompleteLng${i}" id="addressCompleteLng${i}" type="number" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                </div>
 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="main-card mb-3 card">
                                                        <div class="card-body">
                                                            <div class="card-title">Ubicacion por GPS - Google Maps</div>
                                                            <div id="mapcompany${i}" class="paginaPrinc map mapcompany"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class=" col-md-10 col-lg-12">
                                                    <div id="usuarios_box${i}">

                                                        ${formuserbranch}

                                                    </div>
                                                </div> 

                                                <div class=" col-md-10 col-lg-12">
                                                    <div class="main-card mb-3 card">
                                                        <div class="d-block text-center card-footer">
                                                            <button class="btn-wide btn btn-primary" type="button" onclick="new Sucursal().adduser(${i})">Agregar Usuario</button>
                                                            <!--  onclick="new Sucursal().insertBranch()" -->
                                                        </div>
                                                    </div>
                                                </div> 

                                                <div class=" col-md-10 col-lg-12">
                                                    <div class="main-card mb-3 card">
                                                        <div class="d-block text-center card-footer">
                                                            <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> -->
                                                            <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button><!--  onclick="new Sucursal().insertBranch()" -->
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                        </form>
                                    </div>

                                
                                </div>
                                

                            </div>
                        

                    </td>
                </tr>
                `;
                
                new Sucursal().initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
            }
            document.getElementById("alert-container").innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <button type="button" class="close" aria-label="Close" data-dismiss="alert" ><span aria-hidden="true">×</span></button>
                    ¡Sucursal Creada con exito!
                </div>
            `;
            $('html, body').animate({scrollTop: 0}, 600);
        },errbranch=>{
            console.log("errbranch")
            console.log(errbranch)
            console.log(ererrbranch.responseJSON.msgrbranch)
            document.getElementById("alert-container").innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                    ¡Error al crear sucursal! ${errbranch.responseJSON.msg}
                </div>
            `;
            $('html, body').animate({scrollTop: 0}, 600);
        })

    })
 */
    //console.log(document.getElementById())
})
function selectBranch(idbranch){
    brancherRouter.branchs()
    .then(branchs=>{
        for (let i = 0; i < branchs.length; i++) {
            if(branchs[i]._id == idbranch){
                document.getElementById("idbranch").value=idbranch
                var branch = {}
                branch = branchs[i]
                document.getElementById("branchsname").innerHTML = branch.nombre;
                
                //init statics segun sucursales
                new Estadistica().groupStatics('genero', branch._id);
    
                //init google maps
                new Sucursal().initMapsMakerCustom(JSON.parse(branch.addressComplete), JSON.parse($.cookie("userData")).image);
            }
        }
       
    })
}

(function() {
    var Brancher, brancher,
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
    Brancher = (function() {
      function Brancher() {
        this.data = {
          values: {},
          contexts: []
        };
        this.globalContext = {};
      }
  
      Brancher.prototype.branchsclient = function() {
        brancherRouter.branchs()
        .then(branchs=>{
            for (let i = 0; i < branchs.length; i++) {
                const branch = branchs[i];
                var usersbranch = `<td class="text-center">`;
                var formuserbranch = ``;

                for (let j = 0; j < branch.fk_user_branch.length; j++) {
                    const fk_user_branch = branch.fk_user_branch[j];
                    usersbranch += `
                        <div class="row">
                            <div class="col">Nombre: ${fk_user_branch.name}</div>
                            <div class="col">Username: ${fk_user_branch.username}</div>
                        </div>
                    `;
                    formuserbranch += `
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Datos del Usuario 1</h5>
                            <div class="position-relative form-group"><label for="nameuser${i}" class="">Nombre</label><input name="nameuser${i}" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                            <div class="position-relative form-group"><label for="nameuser${i}" class="">Username</label><input name="username${i}" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                            <div class="position-relative form-group"><label for="pswuser${i}" class="">Contraseña</label><input name="pswuser${i}" type="password" class="form-control" value="${fk_user_branch.password}" required></div>
                        </div>
                    </div>
                    `;
                }
                usersbranch += `</td>`;
                document.getElementById("clientbranchs").innerHTML = `
                <tr>
                    <td class="text-center">${branch.nombre}</td>
                    <td class="text-center">${branch.address}</td>
                    <td class="text-center">${branch.addressComplete}</td>
                    ${usersbranch}
                    <td class="text-center">
                        <button type="button"  data-toggle="collapse" href="#collapsebranch${branch._id}" class="btn btn-primary">Editar Sucursal.</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                            <div class="row ">
                                <div class="col-12">

                                    <div class="collapse" id="collapsebranch${branch._id}">
                                        <form class="needs-validation" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="main-card mb-3 card">
                                                        <div class="card-body">
                                                            <h5 class="card-title">Datos de la Sucursal</h5>
                                                            <div class="position-relative form-group"><label for="namebranch${i}" class="">Nombre</label><input name="namebranch${i}" id="namebranch${i}" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                            <div class="position-relative form-group"><label for="descripbranch${i}" class="">Descripcion</label><textarea name="descripbranch${i}" id="descripbranch${i}" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                            <div class="position-relative form-group"><label for="address${i}" class="">Direccion - Ciudad</label><input name="address${i}" id="address${i}" type="textbox" value="${branch.address}" onkeyup="new Sucursal().initMapsMakerCustom()" class="form-control"></div>
                                                            <div class="position-relative form-group"><label for="addressCompleteLat${i}" class="">Direccion - GPS Google Maps</label>
                                                                
                                                                <div class="input-group">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                    </div>
                                                                    <input name="addressCompleteLat${i}" id="addressCompleteLat${i}" type="number" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                    </div>
                                                                    <input name="addressCompleteLng${i}" id="addressCompleteLng${i}" type="number" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                </div>
 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="main-card mb-3 card">
                                                        <div class="card-body">
                                                            <div class="card-title">Ubicacion por GPS - Google Maps</div>
                                                            <div id="mapcompany${i}" class="paginaPrinc map mapcompany"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class=" col-md-10 col-lg-12">
                                                    <div id="usuarios_box${i}">

                                                        ${formuserbranch}

                                                    </div>
                                                </div> 

                                                <div class=" col-md-10 col-lg-12">
                                                    <div class="main-card mb-3 card">
                                                        <div class="d-block text-center card-footer">
                                                            <button class="btn-wide btn btn-primary" type="button" onclick="new Sucursal().adduser(${i})">Agregar Usuario</button>
                                                            <!--  onclick="new Sucursal().insertBranch()" -->
                                                        </div>
                                                    </div>
                                                </div> 

                                                <div class=" col-md-10 col-lg-12">
                                                    <div class="main-card mb-3 card">
                                                        <div class="d-block text-center card-footer">
                                                            <!-- <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button> -->
                                                            <button class="btn-wide btn btn-success" type="submit">Editar Sucursal</button><!--  onclick="new Sucursal().insertBranch()" -->
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                        </form>
                                    </div>

                                
                                </div>
                                

                            </div>
                        

                    </td>
                </tr>
                `;
                
                new Sucursal().initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
            }
        })
      };
      return Brancher;
    })();
    brancher = new Brancher();
    (typeof module !== "undefined" && module !== null ? module.exports = brancher : void 0) || (this.brancher = brancher);
  }).call(this);