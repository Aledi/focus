<!doctype html>

<html lang='en'>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <link href='css/template.css' type='text/css' rel='stylesheet'/>
    <script src='js/jquery-1.12.3.js'></script>
    <script src='js/date-functions.js' type='text/javascript'></script>
    <script src='js/paneles.js' type='text/javascript'></script>
    <title> Focus - Paneles</title>
</head>

<body>
    <?php include_once('elements/header.php');?>
    <section>
        <div class='paneles-wrapper'>
            <ul class='tabs'>
                <li class='tab-link current' data-tab='tab-agregar-panel'>Agregar Panel</li>
                <li class='tab-link' data-tab='tab-view-paneles'>Ver Paneles</li>
            </ul>

            <div id='tab-agregar-panel' class='tab-content current'>
                <h2 id='headerTitle'>Agregar Panel</h2>

                <div class='input-wrapper'>
                    <label>Nombre del Panel:</label>
                    <input id='panelName' type='text' />
                </div>
                <div class='input-wrapper'>
                    <label>Descripción:</label>
                    <textarea id='descripcion'></textarea>
                </div>
                <div class='input-wrapper'>
                    <label>Fecha de Inicio:</label>
                    <select id='dia'></select>
                    <select id='mes'></select>
                    <select id='anio'></select>
                </div>
                <div class='input-wrapper'>
                    <label>Fecha Final:</label>
                    <select id='dia_fin'></select>
                    <select id='mes_fin'></select>
                    <select id='anio_fin'></select>
                </div>
                <div>
                    <p>Seleccionar Cliente:</p>
                    <table id='tableClientes'></table>
                </div>

                <button type='button' id='cancel-edit' class='no-background'>Cancelar</button>
                <button type='submit' id='savePanel'>Agregar</button>
                <span id='feedback'></span>
            </div>

            <div id='tab-view-paneles' class='tab-content'>
                <h2>Paneles Disponibles</h2>

                <table id='allPanels'></table>
            </div>
        </div>
    </section>
</body>
</html>
