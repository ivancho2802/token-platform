<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="images/favicon/apple-icon-57x57.png"/>
    <link rel="apple-touch-icon" sizes="60x60" href="images/favicon/apple-icon-60x60.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="images/favicon/apple-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="images/favicon/apple-icon-76x76.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="images/favicon/apple-icon-114x114.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="images/favicon/apple-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="144x144" href="images/favicon/apple-icon-144x144.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="images/favicon/apple-icon-152x152.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-icon-180x180.png"/>
    <link rel="icon" type="image/png" sizes="192x192" href="images/favicon/android-icon-192x192.png"/>
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="96x96" href="images/favicon/favicon-96x96.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png"/>
    <title>Token</title>
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    
</head>
<body>
    <div class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" />
            <div class="slider round"></div>
        </label>
    </div>
    <section id="main">
        <div id="navegacion">
            <nav>
                <div>
                    <img src="./sources/webToken-11.png" alt="">
                </div>
                <div id="enlaces">
                    <div><a href="index.php">Inicio</a></div>
                    <div><a href="usuarios.html">Usuarios</a></div>
                    <div><a href="negocios.html">Negocios</a></div>
                    <div><a href="/blog/">Blog</a></div>
                    <div><a href="contacto.php">Contacto</a></div>
                    <div><a href="iniciarsesion.php">Inicia Sesión</a></div>
                </div>
            </nav>
        </div>
        <div id="usuarios_init">
            <div>
            <?php
                if(isset($_POST['submit'])){
                  // Aqui coloca los campos que quieres enviar por correo
                  $email = $_POST['email'];    // 'email' es el name del input
                  $nombre =  $_POST['nombre'];
                  $apellido =  $_POST['apellido'];
                  $mensaje =  $_POST['mensaje'];

                  if(filter_var($email, FILTER_VALIDATE_EMAIL)){

                        $asunto = ''.$nombre.'quiere ponerse en contacto';
                        $contenido = '
                                <html>
                                <head>
                                <title></title>
                                </head>
                                <body>
                                <hr>
                                <h1> Citas - Clínica Sandiego Cúcuta</h1>
                                <h6> www.clinicasandiegocucuta.com </h6>
                                <hr>
                                <p>'.$nombre.', esta interesado la aplicacion. <br>
                                <br>
                                Información de contacto:
                                <br>
                                    Identificación: '.$apellido.' <br>
                                    Teléfono:  '.$email.' <br>
                                    E-mail: '.$mensaje.' <br>
                                </p>
                                <hr>
                                </body>
                                </html>
                            ';
                        $headers = 'MIME-Version: 1.0' . "\r\n";
                        $headers .= "Content-type: text/html; charset=UTF-8\r\n";

                        $send = mail('desarrollobarter@gmail.com',$asunto,$contenido,$headers);
                        if($send){
                            $miresultado = '<h4 class="ok_send">¡Tu solicitud ha sido enviada!</h4>';
                        }else{
                            $miresultado = '<h5>No se envío tu solicitud, intenta más tarde.</h5>';
                        }
                        }else{
                        $miresultado = '<h5>Oops, el email no es valido.</h5>';
                        }
                    }


                ?>
                <h1>Conctacto</h1>
                <form action="<?php $_SERVER['PHP_SELF']?>" method="POST" >
                    <div>
                        <div>
                            <label for="">Nombre</label>
                            <input name="nombre"  class="form-contact" type="text">
                        </div>
                        <div>
                            <label name="apellido" for="">Apellidos</label>
                            <input name="nombre"  class="form-contact" type="text">
                        </div>
                    </div>
                    <div>
                        <label  name="email" for="">Email</label>
                        <input name="nombre"  class="form-contact" type="email">
                    </div>
                    <div>
                        <label name="" for="">Escribe tu mensaje</label>
                        <textarea  name="mensaje"  class="form-contact-text" rows="4" cols="10" type="text"> </textarea>
                    </div>  
                    <button type="submit" class="btn-contact">Enviar</button>
                </form>
            </div>
            <div>
                <img id="usr_phone" src="./sources/ce2.png" alt="">
            </div>
        </div>
    </section>
    
 
  
    
   <section id="usr_descarga" >
 
    <div>
        <h1>Descubre los TOKENS
            disponibles en las principales
            plataformas</h1>
        <div>
            <img src="./sources/webToken-16.svg" alt="">
            <img src="./sources/webToken-18.svg" alt="">
        </div>
    </div>
    <img src="./sources/cel2.png" alt="">
</section>

    <section id="footer">
        <div>
            <img src="./sources/webToken-11.png" alt="">
            <p>¡Disfruta de todos los servicios que token tiene para ti!</p>
        </div>
        <div>
            <form action="">
                <label for="">Recibe las ultimas 
                    actualizaciones</label><br>
                <input type="text" placeholder="Aquí tu correo">
                <button><img src="./sources/webToken-13.svg" alt=""></button>
            </form>
        </div>
    </section>
    <section id="copy"> <p>Copyright ©2020 Todos los derechos reservados</p> </section>
   
    <script src="./js/script.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
   

<script>
    const colorSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    function switchColor(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    colorSwitch.addEventListener('change', switchColor, false);

</script>

</body>
</html> 
