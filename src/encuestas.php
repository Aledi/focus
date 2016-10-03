<!doctype html>

<html lang='en'>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <script src="js/jquery-1.12.3.js"></script>
    <link href='css/template.css' type='text/css' rel='stylesheet'/>
    <!--<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js'></script>-->
    <script src='js/date-functions.js' type='text/javascript'></script>
    <script src='js/encuestas.js' type='text/javascript'></script>
    <script src='js/encuestas-shared.js' type='text/javascript'></script>
    <title> Focus - Encuestas</title>
</head>

<body>
    <?php include_once('elements/header.php');?>
    <section>
        <div class='encuestas-wrapper'>
            <ul class='tabs'>
                <li class='tab-link current' data-tab='tab-agregar-encuesta'>Agregar Encuesta</li>
                <li class='tab-link' data-tab='tab-view-encuestas'>Ver Encuestas</li>
            </ul>

            <div id='tab-agregar-encuesta' class='tab-content current'>
                <h2 id='header-title'>Agregar Encuesta</h2>

                <div class='input-wrapper'>
                    <label>Nombre de Encuesta<span class='required-input'>*</span></label>
                    <input id='nombre' type='text' />
                </div>

                <div class='input-wrapper'>
                    <label>Fecha de Inicio<span class='required-input'>*</span></label>
                    <select id='mes'></select>
                    <select id='dia'></select>
                    <select id='anio'></select>
                </div>

                <div class='input-wrapper'>
                    <label>Fecha Final<span class='required-input'>*</span></label>
                    <select id='mes_fin'></select>
                    <select id='dia_fin'></select>
                    <select id='anio_fin'></select>
                </div>

                <div class='input-wrapper'>
                    <label>Seleccionar Panel<span class='required-input'>*</span></label>
                    <table id='allPanels'></table>
                </div>

                <button type='button' id='cancel-edit' class='no-background'>Cancelar</button>
                <button type='submit' id='save-encuesta'>Agregar</button>
                <span id='feedback' class='feedback-text'></span>
            </div>

            <div id='tab-view-encuestas' class='tab-content'>
                <h2>Encuestas Disponibles</h2>

                <table id='allEncuestas'></table>
            </div>
        </div>
    </section>
</body>
</html>
