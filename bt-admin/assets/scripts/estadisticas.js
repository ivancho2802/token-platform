var datecurrent = new Date();
/**
*	MODALES
*/
function modalTokens(origin, tokens){

    var body = '', header="";

    if(origin == true)
      header = `Tokens Activos`;
    else
      header = `Tokens Inactivos`;

  	function imgItem(uri, j){
  		if(uri)
	  		return `
                <div class="ion-thumbnail slotstart ${(j % 2 == 0) ? 'tokenAvatar' : 'tokenAvatar2'}">
                    <img width="40"   src="${uri}"  alt=""/>
                </div>
	  		`;
  		else
  			return `
				<div class="ion-thumbnail slotstart ${(j % 2 == 0) ? 'tokenAvatar' : 'tokenAvatar2'}" style="background: rgba(0,0,0,0.8);align-items: center; text-align: center; ">
                    <i class="pe-7s-graph text-light" style="font-size: 50px;"></i>
                </div>
  			`;
  	}


  	body+=`


                <div class="table-responsive">
                    <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th>Imagen</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Monto</th>
                            <th class="text-center">Fecha de Venc.</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody id="tokenstable">
  	`;
	for (var i = 0; i < tokens.length; i++) {
        if(origin){
          if(tokens[i].status == origin && comparedates(tokens[i].fecha_final)){
            body+=`
                          <tr class="${(i % 2 == 0) ? 'colorbarter' : 'colorbarter2'}">
                              <td class="text-center text-muted">${i}</td>
                              <td>
                                  <div class="widget-content p-0">
                                      <div class="widget-content-wrapper">
                                          <div class="widget-content-left mr-3">
                                              <div class="widget-content-left">
                                                ${imgItem(tokens[i].urimagen, i)}
                                              </div>
                                          </div> 
                                      </div>
                                  </div>
                              </td>

                              <td class="text-center"><h5><b>${tokens[i].nombre}</b></h5></td>
                              <td class="text-center"><h5 class="ion-no-margin ion-no-padding"><b>${format(tokens[i].amount)}</b></h5>
                              </td>
                              <td class="text-center">
                                  <label class="text-mini">
                                V: ${tokens[i].fecha_final}
                              </label>
                              </td>
                              <td class="text-center">
                                  <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm" onclick="goTokenEstadistics('${tokens[i]._id}', 'week', '${tokens[i].nombre}')" data-dismiss="modal">Estadisticas</button>
                              </td>
                          </tr>  
   
            `;
          }
        }
        else
        if(!tokens[i].status || !comparedates(tokens[i].fecha_final)){
          body+=`
                        <tr class="${(i % 2 == 0) ? 'colorbarter' : 'colorbarter2'}">
                            <td class="text-center text-muted">${i}</td>
                            <td>
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left mr-3">
                                            <div class="widget-content-left">
                                              ${imgItem(tokens[i].urimagen, i)}
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </td>

                            <td class="text-center"><h5><b>${tokens[i].nombre}</b></h5></td>
                            <td class="text-center"><h5 class="ion-no-margin ion-no-padding"><b>${format(tokens[i].amount)}</b></h5>
                            </td>
                            <td class="text-center">
                                <label class="text-mini">
                              V: ${tokens[i].fecha_final}
                            </label>
                            </td>
                            <td class="text-center">
                                <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm" onclick="goTokenEstadistics('${tokens[i]._id}', 'week', '${tokens[i].nombre}')" data-dismiss="modal">Estadisticas</button>
                            </td>
                        </tr>  
 
          `;
        }
	}

	body+=`

                </tbody>
            </table>
        </div>
    `;

    document.getElementById("modalTokensContent").innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${header}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="modalalert"></div>
              ${body}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
    `;
    // console.log(document.getElementById("modals"))
    // $( document ).ready(function() {

    //   $('#modalTokens').on('shown.bs.modal', function () {
    //     // $('#myInput').trigger('focus')
    //     alert()
    //   })
    //   // $('#modalTokens').modal('show')
    // });
}

function comparedates(product){
    // return product.getTime()
    // return moment(product).isBefore(moment(this.datecurrent));
    // or without using moment.js:
    // return product.getTime() < this.datecurrent.getTime();
    // or using Date
    return new Date(product).valueOf() > new Date(this.datecurrent).valueOf();
}