<!doctype html>

<html lang='en'>
<head>
  	<meta charset='utf-8'>
    <link href='css/template.css' type='text/css' rel='stylesheet'/>
	<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js'></script>
	<script src='js/nuevo-panel.js' type='text/javascript'></script>
    <script src='js/modify-delete.js' type='text/javascript'></script>
  	<title> Focus - Paneles</title>
</head>

<body>
    <div id='header'>
    	<div id="container">
    		<?php include_once('elements/navigation-bar.php');?>
    	</div>
    </div>
    <div id='contentContainer'>
		<div id="contentLeft">
			<div class="formHeader">
				<h2>Agregar Panel</h2>
			</div>
			<div id="panelInput">
                <p>1. Nombre del Panel:</p>
                <input id="panelName" type="text"/>
            </div>

            <div id="date_starts">
                <p>2. Fecha de Inicio (yyyy-mm-dd):</p>
                <input id="dateStarts" type="text"/>
            </div>

            <div id="date_ends">
                <p>3. Fecha Final (yyyy-mm-dd):</p>
                <input id="dateEnds" type="text"/>
            </div>

            <div id="clients">
                <p>4. Seleccionar Cliente: </p>
                <table id="tableClientes">
                
                </table>
            </div>

	  		<div>
            	<button type='submit' id='loginButtonNuevoPanel'>Confirmar</button>
        	</div>
            <div id='feedback'></div>
		</div>
	
		<div id="content">
            <div class="formHeader">
                <h2>Paneles Disponibles</h2>
            </div>
			<table id="allPanels">

			</table>
		</div>
    </div>
	<?php include_once('elements/footer.php');?>
</body>
</html>
