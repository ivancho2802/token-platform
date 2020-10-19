<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Token</title>
</head>
<body>
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
                    <div><a href="http://localhost/token-platform-shellby/blog">Blog</a></div>
                    <div><a href="contacto.php">Contacto</a></div>
                    <div><a href="iniciarsesion.php">Inicia Sesión</a></div>
                </div>
            </nav>
        </div>
        <div id="presentacion">
            <div>
                <h1>Token</h1>
                <p>
                    Es una aplicación móvil que te permitirá: 
                    <br> <br>
                    - Sí eres negocio, podrás compartir cupones 
                    creando campañas publicitarias, mientras aumentas 
                    tus ventas.
                    <br> <br>
                    - Sí eres usuario, podrás redimir cupones, comprar
                    Gif Cards enviarlas por la aplicación o redimir tu
                    regalo cuando desees.
                </p>
                <button>
                    Descargar
                </button>
            </div>
            <div>
                <img id="phone" src="./sources/ce2.png" alt="">
                <img id="code" src="./sources/webToken-02.svg" alt="">
            </div>
        </div>
    </section>
    <section>
        <div id="caracteristicas">
            <img src="./sources/webToken-04.svg" alt="">
            <img src="./sources/webToken-05.svg" alt="">
            <img src="./sources/webToken-06.svg" alt="">
        </div>
        <div id="caracteristicas_esp">
            <h2>Algunas de las mejores 
                características de nuestra 
                aplicación
            </h2>
            <div>
                <img src="./sources/webToken-14.svg" alt="">
                <div>
                    <h4>Seguridad</h4>
                    <p>Con token tus datos personales y empresariales estarán protegidos, mientras disfrutas de la aplicación</p>
                </div>
            </div>
            <div>
                <img src="./sources/webToken-15.svg" alt="">
                <div>
                    <h4>Soporte al cliente</h4>
                    <p>Siempre que necesites resolver alguna duda, estaremos disponibles para ayudarte</p>
                </div>
            </div>
        </div> 
    </section>
    <section id="beneficios">
        <h2>Algunos de los beneficios que ofrecemos</h2>
        <div id="cards_beneficios">
            <div>
                <img src="./sources/webToken-09.svg" alt="">
                <p>Aumentar tus ventas</p>
            </div>
            <div>
                <img src="./sources/webToken-08.svg" alt="">
                <p>Obtener cupones </p>
            </div>
            <div>
                <img src="./sources/webToken-10.svg" alt="">
                <p>Crear campañas<z/p>
            </div>
        </div>
        <div id="seek">

        </div>
    </section>
   
    <section id="descarga">
 
        <div>
            <h1>Nuestra aplicación disponible
                para cualquier dispositivo
                Descargar ahora</h1>
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
