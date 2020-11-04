<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
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
    <meta name="keywords" content="bartertechnology, barter tech, barter technology, soloweb cucuta, paginas web cucuta,  campañas de marketing cucuta, Diseño web, creación de páginas web, web impresionantes, elaboración de páginas web, web profesional, páginas web elegantes, páginas web sencillas y elegantes, páginas web bonitas, páginas web modernas, páginas web sencillas"/>
    <meta name="description" content="Dedicada a desarrollar las ideas de nuestros clientes y diversificar sus mercados para captar nuevos usuarios. Brindamos la oportunidad de crear métodos más eficientes y seguros para incrementar su productividad y competencia en el mercado con bases tecnológicas"/>
    <!-- boostrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="./js/bootstrap.min.js"></script>
    <!-- end boostrap -->
    <!-- ajax -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- end ajax -->
    <!-- translate -->
    <script src="./js/i18n.js"></script>
    <script type="text/javascript">
      // i18n.defaultLocale = "ES";
      // i18n.locale = "ES";
      // i18n.currentLocale();

      //  delete credenciales
      $( document ).ready(function() {
          $.cookie('TOKEN',null);
          $.cookie('menuData',null);
          $.cookie('userData',null);
          $.cookie('businessData',null);
          $.cookie('business',null);
          $.cookie('id_user',null);
          $.cookie('profile',null);
          $.cookie('balance',null);

          $.removeCookie('TOKEN')
      })

      $.ajax("./assets/i18n/es.json").done(function(text){
        //  Parse it
        // console.log(text)
        data = text//JSON.parse(text);
        //  Set the data
        i18n.translator.add(data);
        //  Translate away
        i18n("BUSINESS");          // -> はい
        i18n.translator.translate("BUSINESS")
      }) 
      console.log(i18n.translator.translate("BUSINESS"));
    </script>
    <!-- end translate -->
    <title>Token</title>
    <style>
      
.input-div > div > input:focus{
    margin: 0;
}
    </style>
</head>
<body>
  <!-- area para modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New message</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Recipient:</label>
              <input type="text" class="form-control" id="recipient-name">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Send message</button>
        </div>
      </div>
    </div>
  </div>


    <div class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" />
            <div class="slider round"></div>
        </label>
    </div>

    <section id="main" >
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
        <img class="wave" src="sources/wave.png">
  <div class="container">
    <div class="img">
      <img src="sources/bg-02.svg">
    </div>
    <div class="login-content">
      <form action="#" method="post" id="singing">
          <img src="sources/avatar.svg">
          <h2 class="title">Bienvenidos</h2>

          <div id="alert" class="alert alert-warning alert-dismissible  fade in" role="alert" data-dismiss="alert">
            <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
            <span id="server-errors"></span>
          </div>
          <div class="input-div one">
             <div class="i">
                <i class="fas fa-user"></i>
             </div>
             <div class="div">
                <h5>Usuario</h5>
                <input type="text" name="username" class="input" autocomplete >
             </div>
          </div>
          <div class="input-div pass">
             <div class="i"> 
                <i class="fas fa-lock"></i>
             </div>
             <div class="div">
                <h5>Contraseña</h5>
                <input type="password" name="password" class="input" autocomplete="new-password">
             </div>
          </div>
          <div id="server-results"><!-- For server results --></div>
          <a href="#">Olvidé mi contraseña</a>
          <input type="submit" name="submit" class="btn" value="Login">
      </form>
    </div>
  </div>
    
    </section>
    <!-- librerias para cookies -->
    <script type="text/javascript" src="./js/moment.min.js"></script>
    <script src="./js/js.cookie.js"></script>
    <script src="./js/jquery.cookie.js"></script>
    <!-- end librerias para cookies -->
    <script src="https://kit.fontawesome.com/f90b2e1438.js" crossorigin="anonymous"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script> -->
    <script src="./js/script.js"></script>
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
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/controllers/singing.js"></script>
</body>
</html>
