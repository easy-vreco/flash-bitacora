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
    if (event.currentTarget === $postButton[0]) {
      $('<input placeholder="Placeholder" id="first_name" type="text" class="validate">').appendTo($placeMessage);
      $('<label class="active" for="first_name" id="title-label"></label>').appendTo($placeMessage);
      $('#title-container .input-field').find('#title-label').text('Título');
      console.log('Este botón te permite postear mensajes');
      
    } else if (event.currentTarget === $imageButton[0]) {
      console.log('Este botón te permite postear imágenes');
      $modalContent.find('#title-container .input-field').append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find('#title-container .input-field').append('<label class="active" for="first_name" id="title-label"></label>');
      $('#title-container .input-field').find('#title-label').text('Título');
      //
    } else if (event.currentTarget === $calendarButton[0]) {
      console.log('Este botón te permite postear la fecha actual y tu ubicación');
    } else if (event.currentTarget === $videoButton[0]) {
      console.log('Este botón te permite postear audios y vídeos');
    } else {
      console.log('Error. Por favor, inténtelo nuevamente.');
    }
  });
});