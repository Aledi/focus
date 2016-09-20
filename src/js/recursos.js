'use strict';

function changeType(tipo, action) {
    return (action === 0) ? (tipo === 1 ? "Imagen" : "Video") : (tipo === "Imagen" ? 1 : 2);
}

$(document).on('ready', function () {

    // -----------------------------------------------------------------------------------------------
    // Fetch Resources
    // -----------------------------------------------------------------------------------------------

    setTimeout(function () {
        $.ajax({
            type: 'POST',
            url: '../api/controller.php',
            data: {
                'action': 'GET_RECURSOS'
            },
            dataType: 'json',
            success: function (response) {
                var currentHTML = '<thead>';
                currentHTML += '<tr>';
                currentHTML += '<th>Nombre</th>';
                currentHTML += '<th>Tipo</th>';
                currentHTML += '<th>Eliminar</th>';
                currentHTML += '</tr>';
                currentHTML += '</thead>';
                currentHTML += '<tbody>';

                for (var i = 0; i < response.results.length; i++) {
                    var result = response.results[i];

                    currentHTML += '<tr id="'+ result.id + '&' + result.nombre + '&' + result.tipo +'">';
                    currentHTML += '<td>' + result.nombre + '</td>';
                    currentHTML += '<td>' + changeType(result.tipo, 0) + '</td>';
                    currentHTML += '<td class="deleteButton"><button id="delete" type="button">Eliminar</button></td>';
                    currentHTML += '</tr>';

                    $('#allResources').append(currentHTML);
                    currentHTML = '';
                }

                currentHTML += '</tbody>';
            },
            error: function (error) {
                $('#feedback').html('Error cargando los recursos');
            }
        });
    });

    // -----------------------------------------------------------------------------------------------
    // Delete Resources
    // -----------------------------------------------------------------------------------------------

    $('#allResources').on('click', '.deleteButton', function () {
        var self = this;
        var data = $(this).parent().attr('id').split('&');
        $.ajax({
            url: '../api/controller.php',
            type: 'POST',
            data: {
                action: 'DELETE_RECURSO',
                id: data[0],
                nombre: data[1],
                tipo: changeType(data[2], 1)
            },
            dataType: 'json',
            success: function (response) {
                alert('Recurso eliminado exitosamente.');
                $(self).parent().remove();
            },
            error: function (errorMsg) {
                alert('Error eliminando recurso.');
            }
        });
    });

});