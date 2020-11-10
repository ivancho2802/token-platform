
  //sucursales
  function getTableBranchs (branchsArray){

    var eltr = document.createElement("tr");
    if(!branchsArray || !branchsArray.length )
      return '<td><div class="text-muted opacity-6">No hay Sucursales</div></td>';

    for (var i = 0; i < branchsArray.length; i++) {
        // if(branchsArray[i].status)
        eltr.innerHTML += `
        <li class="nav-item">
            <a href="javascript:void(0);" class="nav-link" click="selectBranch(${branchsArray[i]._id})">
                <i class="nav-link-icon lnr-inbox"></i>
                <span>
                    ${branchsArray[i].nombre} -  ${branchsArray[i].address}
                </span>
                <div class="ml-auto badge badge-pill badge-secondary">86</div>
            </a>
        </li>  
        `;
    }
    return eltr;
  }
  
  var DECIMAL_SEPARATOR=".";
  var GROUP_SEPARATOR=",";
  function  unFormat(val) {
    // console.log("unFormat")
    // console.log(val)
      if (!val) {
          return;
      }
      val = val.replace(/^0+/, '');

      if (this.GROUP_SEPARATOR === ',') {
          return val.replace(/,/g, '');
      } else {
          return val.replace(/\./g, '');
      }
  };
  function format(valString) {
    if (!valString) {
        return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    return parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) + (!parts[1] ? '' : this.DECIMAL_SEPARATOR + parts[1]);
  };
  function getEdad(fecha_nac){
    return new Date().getFullYear() - new Date(fecha_nac).getFullYear();
  }
  function getGenero(genero){
    return genero == 'male' ? "Hombre" : "Mujer";
  }
  function acumElementOfArrayObject(array, objectacum, formatResult){
    var suma = 0
    array.forEach (function(element){
        suma += element[objectacum];
    });
    if(formatResult)
      return format(suma? suma/2 : 0);
    else
      return suma? suma/2 : 0;
  }
  function acumElementIIILOfArrayObject(array, objectacumlevel1, objectacumlevel2,objectacumlevel3, formatResult){
    var suma = 0
    array.forEach (function(element){
        suma += element[objectacumlevel1][objectacumlevel2][objectacumlevel3];
    });
    if(formatResult)
      return format(suma);
    else
      return suma;
  }