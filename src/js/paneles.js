'use strict';

$(document).on('ready', function () {
    $('#paneles-header-option').addClass('selected');

    $.ajax({
        type: 'POST',
        url: '../api/controller.php',
        data: {'action': 'GET_CLIENTES'},
        dataType: 'json',
        success: function (response) {
            var currentHTML = '<thead>';
            currentHTML += '<tr>';
            currentHTML += '<th>Nombre</th>';
            currentHTML += '<th>Correo</th>';
            currentHTML += '<th class="centered">Seleccionar</th>';
            currentHTML += '</tr>';
            currentHTML += '</thead>';
            currentHTML += '<tbody>';

            for (var i = 0; i < response.results.length; i++) {
                var result = response.results[i];

                currentHTML += '<tr value="' + result.id + '">';
                currentHTML += "<td>" + result.nombre + " " + result.apellidos + "</td>";
                currentHTML += "<td>" + result.email + "</td>";
                currentHTML += '<td class="centered"><input type="radio" value=' + result.id + ' name="id"></td>';
                currentHTML += "</tr>";

                $('#tableClientes').append(currentHTML);
                currentHTML = '';
            }

            currentHTML += '</tbody>';
        },
        error: function (error) {
            $('#feedback').html('Error cargando los clientes');
        }
    });

    $('#savePanel').on('click', function (event) {
        event.preventDefault();

        var idPanel = window.location.search.substring(1);
        idPanel = idPanel.substring(3);

        var nombre = $('#panelName').val();
        var descripcion = $('#descripcion').val();
        var fechaInicio = getCompleteDate(1);
        var fechaFin = getCompleteDate(2);
        var cliente = $("input[name=id]:checked").val();

        if (nombre === '' || fechaInicio === '' || fechaFin === '' || typeof cliente === 'undefined') {
            $('#feedback').html('Favor de llenar todos los campos');
            return;
        }

        var data = {
            'action': 'ALTA_PANEL',
            'nombre': nombre,
            'descripcion' : descripcion,
            'fechaInicio': fechaInicio,
            'fechaFin': fechaFin,
            'cliente' : cliente
        };

        if (idPanel != '') {
            data.id = idPanel;
        }

        var actionText = idPanel !== '' ? 'modificado' : 'agregado';
        $.ajax({
            type: 'POST',
            url: '../api/controller.php',
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status == 'SUCCESS') {
                    alert('Panel ' + actionText + ' exitosamente.');
                    location.replace("liga-panel-panelista.php?id=" + response.id);
                } else {
                    $('#feedback').html('Panel no ' + actionText + '. Ha ocurrido un error.');
                }
            },
            error: function (error) {
                $('#feedback').html('Panel no ' + actionText + '. Ha ocurrido un error.');
            }
        });
    });

    setTimeout(function (event) {
        $.ajax({
            type: 'POST',
            url: '../api/controller.php',
            data: {'action': 'GET_PANELES'},
            dataType: 'json',
            success: function (response) {
                fillSelects(1, 0);
                fillSelects(2, 0);
                fillSelects(3, 0);

                var currentHTML = '<thead>';
                currentHTML += '<tr>';
                currentHTML += '<th>Nombre</th>';
                currentHTML += '<th>Fecha Inicio</th>';
                currentHTML += '<th>Fecha Fin</th>';
                currentHTML += '<th>Cliente</th>';
                currentHTML += '<th colspan="2">Acción</th>';
                currentHTML += '</tr>';
                currentHTML += '</thead>';
                currentHTML += '<tbody>';

                for (var i = 0; i < response.results.length; i++) {
                    var result = response.results[i];

                    currentHTML += '<tr value="'+ result.id +'">';
                    currentHTML += '<td><a href="liga-panel-panelista.php?id=' + result.id +'">' + result.nombre +"</a></td>";
                    currentHTML += "<td>" + result.fechaInicio + "</td>";
                    currentHTML += "<td>" + result.fechaFin + "</td>";
                    currentHTML += "<td>" + result.cliente + "</td>";
                    currentHTML += '<td class=modifyButton><button id=modify type=button>Modificar</button></td>';
                    currentHTML += '<td class=deleteButton><button id=delete type=button>Eliminar</button></td>';
                    currentHTML += "</tr>";

                    $("#allPanels").append(currentHTML);
                    currentHTML = '';
                }

                currentHTML += '</tbody>';
            },
            error: function (error) {
                $('#feedback').html('Error cargando los clientes');
            }
        });
    }, 500);

    $('#allPanels').on('click', '.deleteButton', function () {
        var data = {
            'action': 'DELETE_PANEL',
            'id': $(this).parent().attr('value')
        }

        $.ajax({
            url: '../api/controller.php',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                alert('Panelista eliminado exitosamente.');
                $(this).parent().find('td.id').remove();
            },
            error: function (errorMsg) {
                alert('Error eliminando panelista.');
            }
        });
    });

    $('#allPanels').on('click', '.modifyButton', function () {
        var idPanel = $(this).parent().attr('value');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $('ul.tabs li').first().addClass('current');
        $("#tab-agregarPanel").addClass('current');

        $('#headerTitle').text('Modificar Panel');
        $('#savePanel').text('Modificar');

        $.ajax({
            url: '../api/controller.php',
            type: 'POST',
            data: {
                'action': 'GET_PANELES',
                'id': idPanel
            },
            dataType: 'json',
            success: function (response) {
                $('#panelName').val(response.results[0].nombre);
                getDatefromString(response.results[0].fechaInicio, 0);
                getDatefromString(response.results[0].fechaFin, 1);
                $('input[name="id"][value="' + response.results[0].id + '"]').prop('checked', true);
                $('#descripcion').val(response.results[0].descripcion);

                var myURL = window.location.href.split('?')[0];
                myURL = myURL + '?id=' + response.results[0].id;
                history.pushState({}, null, myURL);
            },
            error: function (errorMsg) {
                alert('Error modificando panelista.');
            }
        });
    });

    $('#mes, #anio').on('change', function () {
        changeSelect('Inicio');
    });

    $('#mes_fin, #anio_fin').on('change', function () {
        changeSelect('Fin');
    });

    $('#cancelModify').on('click', function (event) {
        $('#tab-agregarPanel').find('input').val('');
        $('#tableClientes input').removeAttr('checked');
        $('#headerTitle').text('Agregar Panel');
        $('#savePanel').text('Agregar');

        var myURL = window.location.href.split('?')[0];
        history.pushState({}, null, myURL);

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $('ul.tabs li').last().addClass('current');
        $("#tab-modificarPanel").addClass('current');
    });

});
