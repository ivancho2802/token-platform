$( document ).ready(function() {

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