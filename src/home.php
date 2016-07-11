
<!-- python -m SimpleHTTPServer -->
<!doctype html>

<html lang='en'>
<head>
  	<meta charset='utf-8'>
    <link href='css/template.css' type='text/css' rel='stylesheet'/>
	<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js'></script>
    <script src='js/signin.js' type='text/javascript'></script>
  	<title> Focus - Home</title>
</head>

<body>
    <div id='header'>
    	<div id="container">
    		<img src='img/focus_logo.png' href='home.php'/>
    	</div>
    </div>
    <div id='loginForm'>   	
    	<div id='navigationBar'>
            <ul>
                <li><a href="alta-panelistas.php">Alta Panelistas</a></li>
                <li class="dropdown">
                    <a href="#" class="dropbtn">Nuevo Usuario</a>
                    <div class="dropdown-content">
                        <a href="alta-admin.php">Alta Administrador</a>
                        <a href="alta-cliente.php">Alta Cliente</a>
                    </div>
                </li>
              <li><a href="alta-panel.php">Nuevo Panel</a></li>
              <li><a href="liga-panel-panelista.php">Ligar Panelistas</li>
              <li style="float:right"><a class="active" href="#about">About</a></li>
            </ul>
        </div>
    </div>
	<footer>
		<p>Copyright © 2016 Focus Consulting Group, SA. de C.V.</p>
	</footer>
</body>
</html>