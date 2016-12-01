'use strict';

var globalImages = [];
var globalVideo = [];

// -----------------------------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------------------------

function appendSelect (lastQuestion) {
    var currentHTML = '';
    for(var x = 0; x < globalImages.length; x++) {
        currentHTML += '<option value="' + globalImages[x] + '">' + globalImages[x] + '</option>';
    }

    $('#imagen' + lastQuestion).append(currentHTML);
    currentHTML = '';

    for(var x = 0; x < globalVideo.length; x++) {
        currentHTML += '<option value="' + globalVideo[x] + '">' + globalVideo[x] + '</option>';
    }

    $('#video' + lastQuestion).append(currentHTML);
}

function appendAnswers (typeQuestion, questionID) {
    var currentHTML = '';
    $('#Answers' + questionID).empty();

    if (typeQuestion != 1 && typeQuestion != 6) {

        if (typeQuestion == 2) {
            currentHTML += '<div class="input-wrapper">';
            currentHTML += '<label>Mostrar como</label>';
            currentHTML += '<input type="radio" value="0" name="combo' + questionID + '" checked="checked"> Lista </input>';
            currentHTML += '<input type="radio" value="1" name="combo' + questionID + '"> Combo </input>';
            currentHTML += '</div>';
        }

        for (var x = 1; x <= 20; x++) {
            currentHTML += '<div class="input-wrapper answer">';
            currentHTML += '<label>Opción ' + x + '</label>';
            currentHTML += '<input id="opcion' + x + '" class="respuesta' + x + ' full-width" type="text"/>';
            currentHTML += '</div>';
         }
    }
    else if (typeQuestion == 6){
        currentHTML += '<div class="input-wrapper answer">';
        currentHTML += '<label>Desde:</label>';
        currentHTML += '<input type="number" id="escalaDesde" type="text"/>';
        currentHTML += '<label>Hasta:</label>';
        currentHTML += '<input type="number" id="escalaHasta" type="text"/>';
        currentHTML += '</div>';
    }

    $('#Answers' + questionID).append(currentHTML);
    currentHTML = '';
}

function appendQuestions (lastQuestion) {
    var currentHTML = '<div id="' + lastQuestion + '" class="questionForm">';
    currentHTML += '<hr>';
    currentHTML += '<div class="input-wrapper">' +
        '<label>Título</label>' +
        '<input id="titulo" class="titulo full-width" type="text" />' +
        '</div>';
    currentHTML += '<div class="input-wrapper">' +
        '<label>Imagen</label>' +
        '<select id="imagen' + lastQuestion + '" class="imagen" type="text">' +
        '<option value="">Selecciona una Imagen</option></select>' +
        '</div>';
    currentHTML += '<div class="input-wrapper">' +
        '<label>Video</label>' +
        '<select id="video' + lastQuestion + '" class="video" type="text">' +
        '<option value="">Selecciona un video</option></select>' +
        '</div>';
    currentHTML += '<div class="input-wrapper">' +
        '<label>Pregunta</label>' +
        '<input id="pregunta" class="pregunta full-width" type="text" />' +
        '</div>';
    currentHTML += '<div class="input-wrapper">' +
        '<label>Tipo de pregunta</label>' +
        '<select id="tipo" class="tipoPregunta" required>' +
        '<option value="1">Abiertas</option>' +
        '<option value="2">Selección Única</option>' +
        '<option value="3">Selección Múltiple</option>' +
        '<option value="4">Ordenamiento</option>' +
        '<option value="5">Matriz</option>' +
        '<option value="6">Escala</option>' +
        '</select>' +
        '</div>';
    currentHTML += '<div id="Answers' + lastQuestion + '"></div>' +
        '<button type="button" id="removeQuestion" class="no-background">Eliminar Pregunta</button>' +
        '</div>';

    $('#questions').append(currentHTML);
    appendSelect(lastQuestion);
    appendAnswers(1, lastQuestion);
}

// -----------------------------------------------------------------------------------------------
// Fetch Recursos and Questions, if needed
// -----------------------------------------------------------------------------------------------

$(document).on('ready', function () {
    var idEncuesta = window.location.search.substring(1);
    idEncuesta = idEncuesta.substring(3);

    $.ajax({
        type: 'POST',
        url: '../api/controller.php',
        data: {
            action : 'GET_RECURSOS'
        },
        dataType: 'json',
        success: function (response) {
            var result = response.results;

            for (var x = 0; x < result.length; x++) {
                result[x].tipo == 1 ? globalImages.push(result[x].nombre) : globalVideo.push(result[x].nombre);
            }

            appendSelect(1);
        },
        error: function (error) {
            $('#feedback').html('Preguntas no añadidas. Ha ocurrido un error.');
        }
    });

    if (idEncuesta !== '') {
        $.ajax({
            url: '../api/controller.php',
            type: 'POST',
            data: {
                action : 'GET_PREGUNTAS',
                encuesta : idEncuesta
            },
            dataType: 'json',
            success: function (response) {
                for (var x = 2; x <= response.results.length; x++) {
                    appendQuestions(x);
                }

                $('div#Answers1').empty();

                for (var x = 0; x < response.results.length; x++) {
                    var result = response.results[x];

                    $('#' + (x + 1) + ' > .input-wrapper > #pregunta').val(response.results[x].pregunta);
                    $('#' + (x + 1) + ' > .input-wrapper > #tipo').val(response.results[x].tipo);
                    $('#' + (x + 1) + ' > .input-wrapper > #titulo').val(response.results[x].titulo);

                    appendAnswers(response.results[x].tipo, (x + 1));

                    $('#' + (x + 1) + ' > .input-wrapper > #imagen' + (x + 1)).val(response.results[x].imagen);
                    $('#' + (x + 1) + ' > .input-wrapper > #video' + (x + 1)).val(response.results[x].video);

                    if (response.results[x].tipo !== 1) {
                        var opciones = response.results[x].opciones;
                        var comboRadio = $('input[name="combo' + (x + 1) + '"][value="' + response.results[x].combo + '"]')

                        if (comboRadio) {
                            comboRadio.prop('checked', true);
                        }

                        for (var i = 0; i < opciones.length; i++) {
                            $('#' + (x + 1) + ' > #Answers' + (x + 1) + ' > .answer > .respuesta' + (i + 1)).val(opciones[i]);
                        }
                    }
                }
            },
            error: function (errorMsg) {
                alert('Error llenando preguntas');
            }
        });
    }

    $(document).on('change', '.tipoPregunta', function () {
        var typeQuestion = $(this).val();
        var questionID = $(this).parent().parent().attr('id');
        var answersClass = 'div#Answers' + questionID;

        appendAnswers(typeQuestion, questionID);
    });

    $('#addQuestion').on('click', function() {
        var lastQuestion = $('#questions').children().length;
        lastQuestion = parseInt(lastQuestion) + 1;

        appendQuestions(lastQuestion);
    });

    $('#questions').on('click', '#removeQuestion', function () {
        if (confirmDelete('esta Pregunta')) {
            if ($(this).parent().attr('id') === 'questions') {
                return;
            }

            $(this).parent().remove();
        }
    });

    $('#submitQuestions').on('click', function () {
        var numeroPregunta = 1;
        var questionsArray = [];
        var questionObject = {};

        questionObject.opciones = [];

        $('#questions').children().each(function () {
            questionObject.numPregunta = numeroPregunta;
            questionObject.titulo = $(this).find('#titulo').val();
            questionObject.imagen = $(this).find('.imagen').val();
            questionObject.video = $(this).find('.video').val();
            questionObject.pregunta = $(this).find('#pregunta').val();
            questionObject.tipo = $(this).find('#tipo').val();

            if (questionObject.tipo !== 1) {
                var opcion = 1;
                var asCombo = $(this).find('input[name=combo' + numeroPregunta + ']:checked').val();

                questionObject.combo = !asCombo ? 0 : asCombo;

                while ($(this).find('#opcion' + opcion).val()) {
                    questionObject.opciones.push($(this).find('#opcion' + opcion).val());
                    opcion++;
                }
            }

            questionsArray.push(questionObject);
            numeroPregunta++;
            questionObject = {};
            questionObject.opciones = [];
        });

        var idEncuesta = window.location.search.substring(1);
        idEncuesta = idEncuesta.substring(3);

        $.ajax({
            type: 'POST',
            url: '../api/controller.php',
            data: {
                action : 'SET_PREGUNTAS_ENCUESTA',
                encuesta : idEncuesta,
                preguntas : questionsArray
            },
            dataType: 'json',
            success: function (response) {
                alert('Preguntas ligadas exitosamente.');
                location.replace('encuestas.php');
            },
            error: function (error) {
                $('#feedback').html('Preguntas no añadidas. Ha ocurrido un error.');
            }
        });
    });
});
