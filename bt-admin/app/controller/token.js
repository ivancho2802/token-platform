$( document ).ready(function() {

    /** data de la empresa perfil */
    if($.cookie("userData") && $.cookie("business") && !(JSON.parse($.cookie("userData")) || JSON.parse($.cookie("business"))))
        return;

    document.getElementById("nameBussine").innerHTML = JSON.parse($.cookie("business")).nombre;
    document.getElementById("nameBussineRazon").innerHTML = JSON.parse($.cookie("business")).razon;
    document.getElementById("avatar").src = JSON.parse($.cookie("userData")).image;
    // DISEÑOS TOKEN
    tokener.tokendisaens();
    // ESCUCHA DE CARGA DE ARCHIVOS
    tokener.onchangeImgRight();
});
(function() {
    var Tokener, tokener,
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  
      Tokener = (function() {
        function Tokener() {
            this.data = {
            values: {},
            contexts: []
            };
            this.globalContext = {};
        }
        Tokener.prototype.tokendisaens = function() {
            tokenRouter.tokendisaens()
            .then(disaens=>{
                document.getElementById("tokendisaens").innerHTML = tokener.loaddisaens(disaens); 
            },errdisaens=>{
                console.log("errdisaens")
                console.log(errdisaens)
                console.log(errdisaens.responseJSON ? errdisaens.responseJSON.msg: '')
                document.getElementById("alert-container").innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" aria-label="Close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
                        ¡Error al crear usuario en la sucursal! ${errdisaens.responseJSON ? errdisaens.responseJSON.msg: ''}
                    </div>
                `;
                //$('html, body').animate({scrollTop: 0}, 600);
            })
        };
        Tokener.prototype.loaddisaens = function(disaens){
            var response = '';

            for (let i = 0; i < disaens.length; i++) {
                const disaen = disaens[i];
                response +=`
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h5 class="card-title"><b>Diseño:</b> ${disaen.name_disaen} <b>Codigo:</b>: ${disaen.codigo_disaen} <b>Fecha: ${moment(disaen.create).format('yyyy-MM-DDTHH:mm')}</b></h5>
                        <div class="collapse" id="collapsDisaen${i}">
                            <div class="row">${tokener.findDisaenToken(disaen.codigo_disaen)}</div>
                        </div>
                        
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Color de &nbsp;<b> fondo</b></span>
                            </div>
                            <span class="input-group-text">
                                <input type="color" value="#CCCCCC" id="changedcolor${i}" name="changedcolor" onchange="tokener.changecolor('${disaen.codigo_disaen}', ${i})"/>
                            </span>
                            <input type="text" id="color_picker${i}" class="form-control" value="#CCCCCC" onkeyup="tokener.changecolor('${disaen.codigo_disaen}', ${i}, true)" />
                        </div>

                        
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon2">Color de &nbsp;<b> texto</b></span>
                            </div>
                            <span class="input-group-text">
                                <input type="color" value="#0D1B3E" id="changedcolortext${i}" name="changedcolortext" onchange="tokener.changecolortext('${disaen.codigo_disaen}', ${i})"/>
                            </span>
                            <input type="text" id="color_picker_text${i}" class="form-control" value="#0D1B3E" onkeyup="tokener.changecolortext('${disaen.codigo_disaen}', ${i}, true)" />
                        </div>
                        
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon2">Imagen &nbsp;<b> derecha</b></span>
                            </div>
                            <span class="input-group-text">
                                <i class="fa fa-paperclip"></i>
                            </span>
                            
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile${i}" name="filename">
                                <label class="custom-file-label" for="customFile">Cargar Archivo</label>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="card-footer">
                        <button type="button" data-toggle="collapse" href="#collapsDisaen${i}" class="btn btn-primary">Ver Diseño</button>
                    </div>
                </div>
            `;
            }
            return response
        }
        Tokener.prototype.findDisaenToken = function(codigo_disaen){
            var itemdisaen = '', itemdisaen2='';

            if(codigo_disaen == 'token1'){
                itemdisaen = `
                <div class=" card card-body col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="maskborder ion-color-barterboton">
                        <div class="${codigo_disaen} ion-color-barter3-token">
                            <div class="row">
                                <div class="col-4">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-left mr-3">
                                                <div class="widget-content-left">
                                                    <img width="80" class="rounded-20" src="assets/images/avatars/2.png" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <h5 class="card-title" class="titletoken">Ensalada Kaldi</h5>
                                    <p class="fechatoken">V: 14-02-2020</p>
                                    <p class="codetoken">XV256B</p>
                                </div>
                            </div>
                            <!-- <button class="btn btn-primary">Go somewhere</button> -->
                        </div>
                    </div>
                </div>
                `;
                itemdisaen2 = itemdisaen
                itemdisaen += itemdisaen2
                itemdisaen += itemdisaen2
            }
            return itemdisaen
        }
        Tokener.prototype.changecolor = function(codigo_disaen, index, inputpicker){
            var inputcolor = document.getElementById('changedcolor'+index)
            var inputcolor_picker = document.getElementById('color_picker'+index)
            var changecoloele = inputpicker ? inputcolor_picker : inputcolor
            document.getElementById('changedcolor'+index).value
            var codigo_disaens = document.getElementsByClassName(codigo_disaen)
            for (let i = 0; i < codigo_disaens.length; i++) {
                const codigo_disaen = codigo_disaens[i];
                //fondo de token
                codigo_disaen.style.backgroundColor = changecoloele.value;
                //auto color texto
                codigo_disaen.style.setProperty('--colorPrimary', new Help().toHSL(changecoloele.value, "l")+'%');
                codigo_disaen.style.setProperty('--switch', 'calc(('+codigo_disaen.style.getPropertyValue('--colorPrimary')+' - 60%) * -100)');
                //color de todo el texto
                codigo_disaen.style.color = "hsl(0, 0%,"+codigo_disaen.style.getPropertyValue('--switch')+")";
                //color de titulo
                console.log(codigo_disaen.getElementsByClassName('card-title')[0])
                codigo_disaen.getElementsByClassName('card-title')[0].style.color = new Help().fullColorHex(codigo_disaen.style.color);
                // color del picker e input del color de txto
                document.getElementById('changedcolortext'+index).value = new Help().fullColorHex(codigo_disaen.style.color)
                document.getElementById('color_picker_text'+index).value = new Help().fullColorHex(codigo_disaen.style.color)
            }
            if(inputpicker)
                inputcolor.value = changecoloele.value;
            else
                inputcolor_picker.value = changecoloele.value;
        }
        Tokener.prototype.changecolortext = function(codigo_disaen, index, inputpicker){
            var inputcolor = document.getElementById('changedcolortext'+index)
            var inputcolor_picker = document.getElementById('color_picker_text'+index)
            var changecoloele = inputpicker ? inputcolor_picker : inputcolor
            document.getElementById('changedcolortext'+index).value
            var codigo_disaens = document.getElementsByClassName(codigo_disaen)
            for (let i = 0; i < codigo_disaens.length; i++) {
                const codigo_disaen = codigo_disaens[i];
                codigo_disaen.style.color = changecoloele.value;
                codigo_disaen.getElementsByClassName('card-title')[0].style.color = changecoloele.value;
            }
            if(inputpicker)
                inputcolor.value = changecoloele.value;
            else
                inputcolor_picker.value = changecoloele.value;
        }
        Tokener.prototype.onchangeImgRight = function(){
            $(".custom-file-input").on("change", function() {
                console.log($(this).val())
                var fileName = $(this).val().split("\\").pop();
                $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
            });
        }
        
        return Tokener;
    })();
    tokener = new Tokener();
    (typeof module !== "undefined" && module !== null ? module.exports = tokener : void 0) || (this.tokener = tokener);
}).call(this);