let currentPosition;
var geocoder = new google.maps.Geocoder;

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

                    if(branch.fk_user_branch)
                    for (let j = 0; j < branch.fk_user_branch.length; j++) {
                        const fk_user_branch = branch.fk_user_branch[j];
                        usersbranch += `
                            <div class="row">
                                <div class="col">Nombre: ${fk_user_branch.name}</div>
                                <div class="col">Username: ${fk_user_branch.username}</div>
                            </div>
                        `;
                        formuserbranch += `
                        <form class="needs-validation-put-user" novalidate  action="#" method="post"  id="formbranch${branch._id}${fk_user_branch._id}">
                            <div class="main-card mb-3 card alert  alert-dismissible fade show" id="carduser${fk_user_branch._id}" role="alert">
                                <div class="card-body">
                                    <h5 class="card-title">Datos del Usuario ${j+1}</h5>
                                    <input hidden name="_id" value="${branch._id}">
                                    <input hidden name="_2802iduser" value="${fk_user_branch._id}">
                                    <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                                    <div class="position-relative form-group"><label for="nameuser" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                                    <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" value="" required></div>
                                </div>
                                        
                                <div class="d-block text-center card-footer">
                                    <div role="group" class="btn-group">
                                        <button class="btn btn-warning" type="submit">Actualizar</button>
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalTokens" onclick="brancher.deleteUserBranch('${fk_user_branch._id}', '${branch._id}', 'carduser${fk_user_branch._id}', '${fk_user_branch.username} ${fk_user_branch.username}')">Borrar o Deshabilitar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
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
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="main-card mb-3 card">
                                                            <div class="card-body">
                                                                <form class="needs-validation-put" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                                                    <h5 class="card-title">Datos de la Sucursal</h5>
                                                                    <input name="_id" type="hidden" value="${branch._id}">
                                                                    <div class="position-relative form-group"><label for="namebranch" class="">Nombre</label><input name="namebranch"  placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                                    <div class="position-relative form-group"><label for="descripbranch" class="">Descripcion</label><textarea name="descripbranch"class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                                    <div class="position-relative form-group"><label for="address" class="">Direccion - Ciudad</label><input name="address" type="textbox" value="${branch.address}" onkeyup="brancher.initMapsMakerCustom()" class="form-control"></div>
                                                                    <div class="position-relative form-group"><label for="addressCompleteLat" class="">Direccion - GPS Google Maps</label>
                                                                        
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                            </div>
                                                                            <input name="addressCompleteLat" id="addressCompleteLat" type="number" step="any" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                        </div>
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                            </div>
                                                                            <input name="addressCompleteLng" id="addressCompleteLng" type="number" step="any" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                        </div>
        
                                                                    </div>
                                                                    
                                                                    <div class="d-block text-center card-footer">
                                                                        <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button>
                                                                    </div>
                                                                </form>
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
                                                    <div class=" col-md-12 col-lg-12">
                                                        <div id="usuarios_box${i}">

                                                            ${formuserbranch}

                                                        </div>
                                                    </div>   

                                                    <div class=" col-md-10 col-lg-12">
                                                        <div class="main-card mb-3 card">
                                                            <div class="d-block text-center card-footer">
                                                                <button class="btn-wide btn btn-primary" type="button" onclick="brancher.adduser(${i}, '${branch._id}')">Agregar Usuario</button>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                </div>
                                        </div>

                                    
                                    </div>
                                    

                                </div>
                            

                        </td>
                    </tr>
                    `;
                    
                    brancher.initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
                }
            })
        };
        Brancher.prototype.initMapsMakerCustom = function (LatLng, imgcompany) {
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
        Brancher.prototype.initMapsMakerCustomEditBranch = function (LatLng, imgcompany, index) {
            let map, currentPositionEdit
            
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
                            currentPositionEdit = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                            document.getElementById("addressCompleteLat").value=currentPositionEdit.lat
                            document.getElementById("addressCompleteLng").value=currentPositionEdit.lng
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
                        currentPositionEdit = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                        
                        document.getElementById("addressCompleteLat").value=currentPositionEdit.lat
                        document.getElementById("addressCompleteLng").value=currentPositionEdit.lng
                    });
                }
            } 
        }
        Brancher.prototype.adduser = function (index, idbranch){
            var tamuserbox = 0;
            if(index == null){
                tamuserbox = document.getElementsByName("nameuser").length;
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
                tamuserbox = document.getElementsByName("nameuser").length;
                document.getElementById("usuarios_box"+index).innerHTML += `

                <div class="main-card mb-3 card alert  alert-dismissible fade show" id="carduser${index}" role="alert">
                    <form onsubmit="return tokenSubmitFunction(event, this, 'errorcreateuser${index}')">
                        <div class="card-header ">
                            <span id="errorcreateuser${index}"></span>
                            <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                        </div>
                        <div class="card-body ">
                                <h5 class="card-title">Datos del Usuario ${tamuserbox}</h5>
                                <input hidden name="idbranch" value="${idbranch}">
                                <input hidden name="index" value="${index}">
                                <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" required></div>
                                <div class="position-relative form-group"><label for="username" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" required></div>
                                <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" required></div>
                        </div>
                        
                        <div class="d-block text-center card-footer">
                            <div role="group" class="btn-group">
                                <button type="submit" class="btn btn-primary">Crear</button>
                            </div>
                        </div>
                    </form>
                </div>
                `;
            }
            
        }
        Brancher.prototype.deleteUserBranch = function (fk_user_branch_id, branch_id, cards, namesuser, next){
            let head = `¿Confirma que deseas eliminar el usuario?`;
            let body = `Usuario ${namesuser}`
            console.log("next")
            console.log(next)
            if(!next){
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
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="brancher.deleteUserBranch('${fk_user_branch_id}', '${branch_id}', '${cards}', '${namesuser}', true)">Eliminar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                </div> 
                `;
                return
            }
            let bodydelete = {
                fk_user_branch: fk_user_branch_id,
                branch_id: branch_id
            }
            return brancherRouter.deletebranchuser(bodydelete)
            .then((branchs)=>{
                if(branchs){
                    console.log("branchs")
                    console.log(branchs)
                    $("#"+cards).fadeOut("slow");
                    new Help().loadbrnachs();
                    //brancher.branchsclient();
                }
            },(errbranchs)=>{
                console.log("errbranchs")
                console.log(errbranchs)
                $("#"+cards).append(`
                <div class="alert alert-warning fade show" role="alert">
                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                    Error en la solicitud!! ${errbranchs.responseJSON ? errbranchs.responseJSON.msg: ''}
                </div>
                `);
            });
        }
        return Brancher;
    })();
    brancher = new Brancher();
    (typeof module !== "undefined" && module !== null ? module.exports = brancher : void 0) || (this.brancher = brancher);
}).call(this);

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
    brancher.initMapsMakerCustom(null,JSON.parse($.cookie("userData")).image);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation-put');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    form.classList.add('was-validated');
                    if (form.checkValidity() === false) {
                        console.log("INVALIDO multi")
                        event.preventDefault();
                        event.stopPropagation();
                        return
                    }
                    console.log("form.elements")
                    console.log(form.elements["_2802iduser"])
                    let body = {
                        _id: form.elements["_id"].value,
                        nombre: form.elements["namebranch"].value,
                        description: form.elements["descripbranch"].value,
                        address: form.elements["address"].value,
                        addressComplete: JSON.stringify({lat:form.elements["addressCompleteLat"].value, lng: form.elements["addressCompleteLng"].value}),
                    }
                    //console.log(body)
                    console.log("editar")
                    brancherRouter.putbranch(body)
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
                                <form class="needs-validation-put-user" novalidate  action="#" method="post"  id="formbranch${branch._id}${fk_user_branch._id}">
                                    <div class="main-card mb-3 card alert  alert-dismissible fade show" id="carduser${fk_user_branch._id}" role="alert">
                                        <div class="card-body">
                                            <h5 class="card-title">Datos del Usuario ${j+1}</h5>
                                            <input hidden name="_id" value="${branch._id}">
                                            <input hidden name="_2802iduser" value="${fk_user_branch._id}">
                                            <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                                            <div class="position-relative form-group"><label for="nameuser" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                                            <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" value="" required></div>
                                        </div>
                                        
                                        <div class="d-block text-center card-footer">
                                            <div role="group" class="btn-group">
                                                <button class="btn btn-warning" type="submit">Actualizar</button>
                                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalTokens" onclick="brancher.deleteUserBranch('${fk_user_branch._id}', '${branch._id}', 'carduser${fk_user_branch._id}', '${fk_user_branch.username} ${fk_user_branch.username}')">Borrar o Deshabilitar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="card-body">
                                                                    
                                                                        <form class="needs-validation-put" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                                                            <h5 class="card-title">Datos de la Sucursal</h5>
                                                                            <div class="position-relative form-group"><label for="namebranch" class="">Nombre</label><input name="namebranch" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                                            <div class="position-relative form-group"><label for="descripbranch" class="">Descripcion</label><textarea name="descripbranch" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                                            <div class="position-relative form-group"><label for="address" class="">Direccion - Ciudad</label><input name="address" type="textbox" value="${branch.address}" onkeyup="brancher.initMapsMakerCustom()" class="form-control"></div>
                                                                            <div class="position-relative form-group"><label for="addressCompleteLat" class="">Direccion - GPS Google Maps</label>
                                                                                
                                                                                <div class="input-group">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                                    </div>
                                                                                    <input name="addressCompleteLat"  type="number" step="any" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                                </div>
                                                                                <div class="input-group">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                                    </div>
                                                                                    <input name="addressCompleteLng"   type="number" step="any" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                                </div>
                
                                                                            </div>
                                                                            
                                                                            <div class="d-block text-center card-footer">
                                                                                <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button>
                                                                            </div>
                                                                        </form>
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
                                                            <div class=" col-md-12 col-lg-12">
                                                                <div id="usuarios_box${i}">

                                                                    ${formuserbranch}

                                                                </div>
                                                            </div>

                                                            <div class=" col-md-10 col-lg-12">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="d-block text-center card-footer">
                                                                        <button class="btn-wide btn btn-primary" type="button" onclick="brancher.adduser(${i}, '${branch._id}')">Agregar Usuario</button>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                </div>

                                            
                                            </div>
                                            

                                        </div>
                                    

                                </td>
                            </tr>
                            `;
                            
                            brancher.initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
                        }
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert" ><span aria-hidden="true">×</span></button>
                                ¡Sucursal Actualizada con exito!
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    },errbranch=>{
                        console.log("errbranch")
                        console.log(errbranch)
                        console.log(errbranch.responseJSON ? errbranch.responseJSON.msg: '')
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                                ¡Error al crear sucursal! ${errbranch.responseJSON ? errbranch.responseJSON.msg: ''}
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    })


                }, false);
            });
        }, false);
    })();

    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation-put-user');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        console.log("INVALIDO multi")
                        event.preventDefault();
                        event.stopPropagation();
                        return
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                    let body = {
                        _id: form.elements["_id"].value,
                        nameuser: form.elements["nameuser"].value,
                        username: form.elements["username"].value,
                        pswuser: form.elements["pswuser"].value,
                        iduser: form.elements["_2802iduser"].value
                    }
                    console.log(body)
                    console.log("editar")
                    brancherRouter.putbranchputuser(body)
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
                                <form class="needs-validation-put-user" novalidate  action="#" method="post"  id="formbranch${branch._id}${fk_user_branch._id}">
                                    <div class="main-card mb-3 card alert  alert-dismissible fade show" id="carduser${fk_user_branch._id}" role="alert">
                                        <div class="card-body">
                                            <h5 class="card-title">Datos del Usuario ${j+1}</h5>
                                            <input hidden name="_id" value="${branch._id}">
                                            <input hidden name="_2802iduser" value="${fk_user_branch._id}">
                                            <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                                            <div class="position-relative form-group"><label for="nameuser" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                                            <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" value="" required></div>
                                        </div>

                                        <div class="d-block text-center card-footer">
                                            <div role="group" class="btn-group">
                                                <button class="btn btn-warning" type="submit">Actualizar</button>
                                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalTokens"  onclick="brancher.deleteUserBranch('${fk_user_branch._id}', '${branch._id}', 'carduser${fk_user_branch._id}', '${fk_user_branch.username} ${fk_user_branch.username}')">Borrar o Deshabilitar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="card-body">
                                                                    
                                                                        <form class="needs-validation-put" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                                                            <h5 class="card-title">Datos de la Sucursal</h5>
                                                                            <div class="position-relative form-group"><label for="namebranch" class="">Nombre</label><input name="namebranch" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                                            <div class="position-relative form-group"><label for="descripbranch" class="">Descripcion</label><textarea name="descripbranch" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                                            <div class="position-relative form-group"><label for="address" class="">Direccion - Ciudad</label><input name="address" type="textbox" value="${branch.address}" onkeyup="brancher.initMapsMakerCustom()" class="form-control"></div>
                                                                            <div class="position-relative form-group"><label for="addressCompleteLat" class="">Direccion - GPS Google Maps</label>
                                                                                
                                                                                <div class="input-group">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                                    </div>
                                                                                    <input name="addressCompleteLat"  type="number" step="any" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                                </div>
                                                                                <div class="input-group">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                                    </div>
                                                                                    <input name="addressCompleteLng"   type="number" step="any" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                                </div>
                
                                                                            </div>
                                                                            
                                                                            <div class="d-block text-center card-footer">
                                                                                <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button>
                                                                            </div>
                                                                        </form>
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
                                                            <div class=" col-md-12 col-lg-12">
                                                                <div id="usuarios_box${i}">

                                                                    ${formuserbranch}

                                                                </div>
                                                            </div>

                                                            <div class=" col-md-10 col-lg-12">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="d-block text-center card-footer">
                                                                        <button class="btn-wide btn btn-primary" type="button" onclick="brancher.adduser(${i}, '${branch._id}')">Agregar Usuario</button>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                </div>

                                            
                                            </div>
                                            

                                        </div>
                                    

                                </td>
                            </tr>
                            `;
                            
                            brancher.initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
                        }
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert" ><span aria-hidden="true">×</span></button>
                                ¡Usuario de Sucursal actualizado con exito!
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    },errbranch=>{
                        console.log("errbranch")
                        console.log(errbranch)
                        console.log(errbranch.responseJSON ? errbranch.responseJSON.msg: '')
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                                ¡Error en la operacion! ${errbranch.responseJSON ? errbranch.responseJSON.msg: ''}
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    })


                }, false);
            });
        }, false);
    })();

    (function(){
        'use strict'
        window.addEventListener('load', function() {
            var forms = document.getElementsByClassName('needs-validation-create');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    form.classList.add('was-validated');
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
                                <form class="needs-validation-put-user" novalidate  action="#" method="post"  id="formbranch${branch._id}${fk_user_branch._id}">
                                    <div class="main-card mb-3 card alert  alert-dismissible fade show" id="carduser${fk_user_branch._id}" role="alert">
                                        <div class="card-body">
                                            <h5 class="card-title">Datos del Usuario ${j+1}</h5>
                                            <input hidden name="_id" value="${branch._id}">
                                            <input hidden name="_2802iduser" value="${fk_user_branch._id}">
                                            <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                                            <div class="position-relative form-group"><label for="nameuser" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                                            <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" value="" required></div>
                                        </div>
                                        
                                        <div class="d-block text-center card-footer">
                                            <div role="group" class="btn-group">
                                                <button class="btn btn-warning" type="submit">Actualizar</button>
                                                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalTokens"  onclick="brancher.deleteUserBranch('${fk_user_branch._id}', '${branch._id}', 'carduser${fk_user_branch._id}', '${fk_user_branch.username} ${fk_user_branch.username}')">Borrar o Deshabilitar</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="card-body">
                                                                        <form class="needs-validation-put" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                                                            <h5 class="card-title">Datos de la Sucursal</h5>
                                                                            <input name="_id" type="hidden" value="${branch._id}">
                                                                            <div class="position-relative form-group"><label for="namebranch" class="">Nombre</label><input name="namebranch" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                                            <div class="position-relative form-group"><label for="descripbranch" class="">Descripcion</label><textarea name="descripbranch" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                                            <div class="position-relative form-group"><label for="address" class="">Direccion - Ciudad</label><input name="address" type="textbox" value="${branch.address}" onkeyup="brancher.initMapsMakerCustom()" class="form-control"></div>
                                                                            <div class="position-relative form-group"><label for="addressCompleteLat" class="">Direccion - GPS Google Maps</label>
                                                                                
                                                                                <div class="input-group">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                                    </div>
                                                                                    <input name="addressCompleteLat" id="addressCompleteLat" type="number" step="any" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                                </div>
                                                                                <div class="input-group">
                                                                                    <div class="input-group-prepend">
                                                                                        <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                                    </div>
                                                                                    <input name="addressCompleteLng" id="addressCompleteLng" type="number" step="any" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                                </div>
                
                                                                            </div>
                                                                            
                                                                            <div class="d-block text-center card-footer">
                                                                                <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button>
                                                                            </div>
                                                                        </form>
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
                                                            <div class=" col-md-12 col-lg-12">
                                                                <div id="usuarios_box${i}">

                                                                    ${formuserbranch}

                                                                </div>
                                                            </div> 

                                                            <div class=" col-md-10 col-lg-12">
                                                                <div class="main-card mb-3 card">
                                                                    <div class="d-block text-center card-footer">
                                                                        <button class="btn-wide btn btn-primary" type="button" onclick="brancher.adduser(${i}, '${branch._id}')">Agregar Usuario</button>
                                                                    </div>
                                                                </div>
                                                            </div> 

                                                        </div>
                                                </div>

                                            
                                            </div>
                                            

                                        </div>
                                    

                                </td>
                            </tr>
                            `;
                            
                            brancher.initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
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
                        console.log(errbranch.responseJSON ? errbranch.responseJSON.msg: '')
                        document.getElementById("alert-container").innerHTML = `
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                                ¡Error al crear sucursal! ${errbranch.responseJSON ? errbranch.responseJSON.msg: ''}
                            </div>
                        `;
                        $('html, body').animate({scrollTop: 0}, 600);
                    })
                })
            })
        
        }, false);
    
    })();
})

function tokenSubmitFunction(event, form, index2) {

            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            console.log("form.elements")
            console.log(form.elements["nameuser"])

            var index = form.elements["index"].value;
            console.log(index)
            console.log(index2)
            let body = {
                nameuser: form.elements["nameuser"].value,
                username: form.elements["username"].value,
                pswuser: form.elements["pswuser"].value,
                _id: form.elements["idbranch"].value
            }
            //console.log(body)
            brancherRouter.putbranchsetuser(body)
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
                        formuserbranch += `.
                        <form class="needs-validation-put-user" novalidate  action="#" method="post"  id="formbranch${branch._id}${fk_user_branch._id}">
                            <div class="main-card mb-3 card alert  alert-dismissible fade show" id="carduser${fk_user_branch._id}" role="alert">
                                <div class="card-body">
                                    <h5 class="card-title">Datos del Usuario ${j+1}</h5>
                                    <input hidden name="_id" value="${branch._id}">
                                    <input hidden name="_2802iduser" value="${fk_user_branch._id}">
                                    <div class="position-relative form-group"><label for="nameuser" class="">Nombre</label><input name="nameuser" placeholder="Nombre Completo" type="text" class="form-control" value="${fk_user_branch.name}" required></div>
                                    <div class="position-relative form-group"><label for="nameuser" class="">Username</label><input name="username" placeholder="Username" type="text" class="form-control" value="${fk_user_branch.username}" required></div>
                                    <div class="position-relative form-group"><label for="pswuser" class="">Contraseña</label><input name="pswuser" type="password" class="form-control" value="" required></div>
                                </div>

                                <div class="d-block text-center card-footer">
                                    <div role="group" class="btn-group">
                                        <button class="btn btn-warning" type="submit">Actualizar</button>
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalTokens"  onclick="brancher.deleteUserBranch('${fk_user_branch._id}', '${branch._id}', 'carduser${fk_user_branch._id}', '${fk_user_branch.username} ${fk_user_branch.username}')">Borrar o Deshabilitar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
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
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <div class="main-card mb-3 card">
                                                            <div class="card-body">
                                                            
                                                                <form class="needs-validation-put" novalidate  action="#" method="post"  id="formbranch${branch._id}">
                                                                    <h5 class="card-title">Datos de la Sucursal</h5>
                                                                    <div class="position-relative form-group"><label for="namebranch" class="">Nombre</label><input name="namebranch" placeholder="Nombre de la Sucursal" type="text" class="form-control" required value="${branch.nombre}"></div>
                                                                    <div class="position-relative form-group"><label for="descripbranch" class="">Descripcion</label><textarea name="descripbranch" class="form-control"> ${branch.description?branch.description:''}</textarea></div>
                                                                    <div class="position-relative form-group"><label for="address" class="">Direccion - Ciudad</label><input name="address" type="textbox" value="${branch.address}" onkeyup="brancher.initMapsMakerCustom()" class="form-control"></div>
                                                                    <div class="position-relative form-group"><label for="addressCompleteLat" class="">Direccion - GPS Google Maps</label>
                                                                        
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text" id="inputGroupFileAddon01">Latitud</span>
                                                                            </div>
                                                                            <input name="addressCompleteLat"  type="number" step="any" value="${JSON.parse(branch.addressComplete).lat}" class="form-control" aria-describedby="inputGroupFileAddon01" required> 
                                                                        </div>
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text" id="inputGroupFileAddon01">Longitud</span>
                                                                            </div>
                                                                            <input name="addressCompleteLng"   type="number" step="any" value="${JSON.parse(branch.addressComplete).lng}" class="form-control" required> 
                                                                        </div>
        
                                                                    </div>
                                                                    
                                                                    <div class="d-block text-center card-footer">
                                                                        <button class="btn-wide btn btn-success" type="submit">Ediar Sucursal</button>
                                                                    </div>
                                                                </form>
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
                                                    <div class=" col-md-12 col-lg-12">
                                                        <div id="usuarios_box${i}">

                                                            ${formuserbranch}

                                                        </div>
                                                    </div>

                                                    <div class=" col-md-10 col-lg-12">
                                                        <div class="main-card mb-3 card">
                                                            <div class="d-block text-center card-footer">
                                                                <button class="btn-wide btn btn-primary" type="button" onclick="brancher.adduser(${i}, '${branch._id}')">Agregar Usuario</button>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                        </div>

                                    
                                    </div>
                                    

                                </div>
                            

                        </td>
                    </tr>
                    `;
                    
                    brancher.initMapsMakerCustomEditBranch(JSON.parse(branch.addressComplete), "", i)
                }
                document.getElementById(`errorcreateuser${index}`).innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <button type="button" class="close" aria-label="Close" data-dismiss="alert" ><span aria-hidden="true">×</span></button>
                        Usuario Creado con exito!
                    </div>
                `;
                //$('html, body').animate({scrollTop: 0}, 600);
            },errbranch=>{
                console.log("errbranch")
                console.log(errbranch)
                console.log(errbranch.responseJSON ? errbranch.responseJSON.msg: '')
                document.getElementById(`errorcreateuser${index}`).innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                        ¡Error al crear sucursal! ${errbranch.responseJSON ? errbranch.responseJSON.msg: ''}
                    </div>
                `;
                //$('html, body').animate({scrollTop: 0}, 600);
            })



    return false;
}
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
                brancher.initMapsMakerCustom(JSON.parse(branch.addressComplete), JSON.parse($.cookie("userData")).image);
            }
        }
       
    })
}