$(document).ready(() => {
  $('#modal1').modal();
  // Variables
  const $postsContainer = $('#posts-container');
  $postsContainer.append('<row class="col s12 m12 l12"/>');
  const $buttonContainer = $('#button-container');
  const $postButton = $('#post-button');
  const $imageButton = $('#file-button');
  const $calendarButton = $('#calendar-button');
  const $videoButton = $('#video-button');

  $buttonContainer.on('click', '.modal-trigger', (event) => {
    if (event.currentTarget === $postButton[0]) {
      console.log('Este botón te permite postear mensajes');
    } else if (event.currentTarget === $imageButton[0]) {
      console.log('Este botón te permite postear imágenes');
    } else if (event.currentTarget === $calendarButton[0]) {
      console.log('Este botón te permite postear la fecha actual y tu ubicación');
    } else if (event.currentTarget === $videoButton[0]) {
      console.log('Este botón te permite postear audios y vídeos');
    } else {
      console.log('Error. Por favor, inténtelo nuevamente.');
    }
  });
});