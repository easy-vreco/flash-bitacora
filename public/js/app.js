$(document).ready(() => {
  $('#modal1').modal();
  // Variable que referencia al contendor de los posts
  const $postsContainer = $('#posts-container');
  $postsContainer.append('<row class="col s12 m12 l12"/>');
  // Variables que referencian a los botones y su contenedor
  const $buttonContainer = $('#button-container');
  const $postButton = $('#post-button');
  const $imageButton = $('#file-button');
  const $calendarButton = $('#calendar-button');
  const $videoButton = $('#video-button');
  let $placeMessage = $('#title-container .input-field');
  // let $titleMessage =$('')
  // Variables que referencian a los elementos del modal
  const $modalContent = $('#modal-body');

  $buttonContainer.on('click', '.modal-trigger', (event) => {
    // Modal para el botón que publica posts
    if (event.currentTarget === $postButton[0]) {
      $modalContent.find('#title-container .input-field').empty();
      $modalContent.find('#add-post-container .input-field').empty();
      $('<input placeholder="Placeholder" id="first_name" type="text" class="validate">').appendTo($placeMessage);
      $('<label class="active" for="first_name" id="title-label"></label>').appendTo($placeMessage);
      $('#title-container .input-field').find('#title-label').text('Título');
      //
      console.log('Este botón te permite postear mensajes');
      $modalContent.find('#add-post-container .input-field').append('<textarea id="textarea1" class="materialize-textarea"></textarea>');
      $modalContent.find('#add-post-container .input-field').append('<label for="textarea1">Textarea</label>');
      // Modal para el botón que publica imágenes
    } else if (event.currentTarget === $imageButton[0]) {
      $modalContent.find('#title-container .input-field').empty();
      $modalContent.find('#add-post-container .input-field').empty();
      console.log('Este botón te permite postear imágenes');
      $modalContent.find('#title-container .input-field').append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find('#title-container .input-field').append('<label class="active" for="first_name" id="title-label"></label>');
      $('#title-container .input-field').find('#title-label').text('Título');
      //
      $modalContent.find('#add-post-container .input-field').append('<div class="btn"><span>IMAGEN</span><input type="file"></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="file-path-wrapper"><input class="file-path validate" type="text"></div>');
      // Modal para el botón que publica la fecha y ubicación del usuario.
    } else if (event.currentTarget === $calendarButton[0]) {
      console.log('Este botón te permite postear la fecha actual y tu ubicación');
      // 
      $modalContent.find('#title-container .input-field').empty();
      $modalContent.find('#add-post-container .input-field').empty();
      $modalContent.find('#title-container .input-field').append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find('#title-container .input-field').append('<label class="active" for="first_name" id="title-label"></label>');
      $('#title-container .input-field').find('#title-label').text('Título de tu evento');
      //
      $modalContent.find('#add-post-container .input-field').append('<input placeholder="En qué fecha se realizó el evento?" id="first_name" type="text" class="validate">');
      // Modal para el botón que publica vídeos y audios.
    } else if (event.currentTarget === $videoButton[0]) {
      console.log('Este botón te permite postear audios y vídeos');
      // 
      $modalContent.find('#title-container .input-field').empty();
      $modalContent.find('#add-post-container .input-field').empty();
      $modalContent.find('#title-container .input-field').append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find('#title-container .input-field').append('<label class="active" for="first_name" id="title-label"></label>');
      $('#title-container .input-field').find('#title-label').text('Título de tu evento');
      //
      $modalContent.find('#add-post-container .input-field').append('<div class="btn"><span>VIDEO O AUDIO</span><input type="file"></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="file-path-wrapper"><input class="file-path validate" type="text"></div>');
    } else {
      console.log('Error. Por favor, inténtelo nuevamente.');
    }
  });
});