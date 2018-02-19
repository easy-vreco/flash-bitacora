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
  // Variables que referencian a los elementos del modal
  const $modalContent = $('#modal-body');

  $buttonContainer.on('click', '.modal-trigger', (event) => {
    if (event.currentTarget === $postButton[0]) {
      console.log('Este botón te permite postear mensajes');
    } else if (event.currentTarget === $imageButton[0]) {
      console.log('Este botón te permite postear imágenes');
      $modalContent.find('');
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