let map, currentPosition;
var geocoder = new google.maps.Geocoder;
class Sucursal  {
    constructor () {}

    initMapsMakerCustom(LatLng, imgcompany) {
        
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
                        document.getElementById("addressComplete").value=JSON.stringify(currentPosition)
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
                    document.getElementById("addressComplete").value=JSON.stringify(currentPosition)
                });
            }
        } 
    }  
}
$( document ).ready(function() {
    /**
    * sucursales
    */ 
    new Help().loadbrnachs();
    //brancher.branchsclient();
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
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
    
    document.getElementById("formbranch").addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(currentPosition)

        let body = {
            nombre: document.getElementById("namebranch").value,
            description: document.getElementById("descripbranch").value,
            address: document.getElementById("address").value,
            addressComplete: JSON.stringify(currentPosition),
        }
        console.log(body)

        

    })
})
function selectBranch(branch){
    console.log("branch")
    console.log(branch)
    //$.cookie("idbranch", branch._id)
    document.getElementById("branchsname").innerHTML = branch.nombre;
    
    //init statics segun sucursales
    new Estadistica().groupStatics('genero', branch._id);

    //init google maps
    new Sucursal().initMapsMakerCustom(JSON.parse(branch.addressComplete), JSON.parse($.cookie("userData")).image);
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
                document.getElementById("clientbranchs").innerHTML += `
                <tr>
                    <td class="text-center">${branch.nombre}</td>
                    <td class="text-center">${branch.address}</td>
                    <td class="text-center">${branch.addressComplete}</td>
                    <td class="text-center">
                        <button type="button" data-toggle="collapse" href="#collapsebranch${branch._id}" class="btn btn-primary">Ver Usr.</button>
                    </td>
                </tr>
                <tr colspan="12">
                    <td colspan="12">
                        <div class="collapse" id="collapsebranch${branch._id}">
                            <div class="row">
                                <div class="col">Nombre: ${branch.fk_user_branch.name} ${branch.fk_user_branch.lastname}</div>
                                <div class="col">Username: ${branch.fk_user_branch.username}</div>
                                <div class="col">---</div>
                            </div>
                        </div>
                    </td>
                </tr>
                `;
            }
        })
      };
      return Brancher;
    })();
    brancher = new Brancher();
    (typeof module !== "undefined" && module !== null ? module.exports = brancher : void 0) || (this.brancher = brancher);
  }).call(this);