$(document).ready(() => {
  $('#modal1').modal();
  // Variable que referencia al contendor de los posts
  const $postsContainer = $('#posts-container');
  $postsContainer.append('<row class="col s12 m12 l12" id="posts-container-row"></row>');
  // Variables que referencian a los botones y su contenedor
  const $buttonContainer = $('#button-container');
  const $postButton = $('#post-button');
  const $imageButton = $('#file-button');
  const $calendarButton = $('#calendar-button');
  const $videoButton = $('#video-button');
  const $placeMessage = $('#title-container .input-field'); 
  const MAXCHARACTERS = 10;
 
  // Variables que referencian a los elementos del modal
  const $modalContent = $('#modal-body');
  const $publishButton = $('#close-button');

  $buttonContainer.on('click', '.modal-trigger', (event) => {
    // Modal para el botón que publica posts
    if (event.currentTarget === $postButton[0]) {
      $modalContent.find('#title-container .input-field').empty();
      $modalContent.find('#add-post-container .input-field').empty();
      $('<input placeholder="Placeholder" id="first_name" type="text" class="validate">').appendTo($placeMessage);
      $('<label class="active" for="first_name" id="title-label"></label>').appendTo($placeMessage);
      $placeMessage.find('#title-label').text('Título');
      //
      console.log('Este botón te permite postear mensajes');
      $modalContent.find('#add-post-container .input-field').append('<textarea id="textarea1" class="materialize-textarea"></textarea>');
      $modalContent.find('#add-post-container .input-field').append('<label for="textarea1">Textarea</label>');
      //
      $placeMessage.one('click', () => {
        $placeMessage.append('<span class="counter-span"></span>');
        $('.counter-span').text('0' + '/' + MAXCHARACTERS);
        // Contando el número de caracteres del input
        $('#first_name').on('input', function(event) {
          // debugger;
          console.log(event.target);
          if ($('#first_name').val().trim().length) {
            let $str = $('#first_name').val().trim(); 
            const PATTERNLETTERS = /[A-z]/g; 
            let $result = $str.match(PATTERNLETTERS);
            console.log($result);
            let $word = $result.join('');
            if ($word) {
              let $total = MAXCHARACTERS - (MAXCHARACTERS - $word.length); 
              console.log($total);
              $('.counter-span').text($total + '/' + MAXCHARACTERS);
              if ($total > MAXCHARACTERS) {
                $('#first_name').addClass('invalid');
              } else {
                $('#first_name').removeClass('invalid');
              } 
              let $textArea = $('.input-field textarea');
              $textArea.on('input', function() {
                let $textAreaContent = $textArea.val();
                const PATTERNNUMBERS = /[^0-9]/;
                let $verify = PATTERNNUMBERS.test($word);
                let $verify2 = PATTERNNUMBERS.test($textAreaContent);
                if ($verify && $verify2 && $textArea.val().length !== 0) {
                  $publishButton.removeAttr('disabled');
                } else {
                  $publishButton.attr('disabled', true);
                }
              });  
            }
          } else {
            $('.counter-span').text('0' + '/' + MAXCHARACTERS);
          }
        }); 
        $publishButton.one('click', () => {
          // $postsContainer.find('#posts-container-row').empty();
          $postsContainer.find('#posts-container-row').append('<div class="post-div"></div>');
          let $containers = $('.post-div');
          $containers.each(function(el) {
            if (el === ($containers.length - 1)) {
              $('.post-div').eq(el).append(`<h2>${$('#first_name').val()}</h2>`);
              $('.post-div').eq(el).append(`<p>${$('.input-field textarea').val()}</p>`);
            }
          });
        });
      });
      // Modal para el botón que publica imágenes
    } else if (event.currentTarget === $imageButton[0]) {
      $modalContent.find($placeMessage).empty();
      $modalContent.find('#add-post-container .input-field').empty();
      console.log('Este botón te permite postear imágenes');
      $modalContent.find($placeMessage).append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find($placeMessage).append('<label class="active" for="first_name" id="title-label"></label>');
      $placeMessage.find('#title-label').text('Título');
      $placeMessage.one('click', () => {
        $placeMessage.append('<span class="counter-span"></span>');
        $('.counter-span').text('0' + '/' + MAXCHARACTERS);
        // Contando el número de caracteres del input
        $('#first_name').on('input', function(event) {
          console.log(event.target);
          if ($('#first_name').val().trim().length) {
            let $str = $('#first_name').val().trim(); 
            const PATTERNLETTERS = /[A-z]/g; 
            let $result = $str.match(PATTERNLETTERS);
            console.log($result);
            let $word = $result.join('');
            if ($word) {
              let $total = MAXCHARACTERS - (MAXCHARACTERS - $word.length); 
              console.log($total);
              $('.counter-span').text($total + '/' + MAXCHARACTERS);
              if ($total > MAXCHARACTERS) {
                $('#first_name').addClass('invalid');
              } else {
                $('#first_name').removeClass('invalid');
              } 
            }
          } else {
            $('.counter-span').text('0' + '/' + MAXCHARACTERS);
          }
        }); 
      });
      //
      $modalContent.find('#add-post-container .input-field').append('<div class="btn"><span>IMAGEN</span><input type="file" id="files" name="files[]" multiple><output id="list"></output></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="file-path-wrapper"><input class="file-path validate" type="text"></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="image-preview"><img src="" class="responsive-image height-image"</div>');
      
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        function handleFileSelect(evt) {
          var files = evt.target.files; // FileList object
      
          // Loop through the FileList and render image files as thumbnails.
          for (var i = 0, f; f = files[i]; i++) {
      
            // Only process image files.
            if (!f.type.match('image.*')) {
              continue;
            }
      
            var reader = new FileReader();
      
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
              };
            })(f);
      
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
          }
        }
      
        document.getElementById('files').addEventListener('change', handleFileSelect, false);

      } else {
        alert('The File APIs are not fully supported in this browser.');
      }

      // Modal para el botón que publica la fecha y ubicación del usuario.
    } else if (event.currentTarget === $calendarButton[0]) {
      console.log('Este botón te permite postear la fecha actual y tu ubicación');
      // 
      $modalContent.find($placeMessage).empty();
      $modalContent.find('#add-post-container .input-field').empty();
      $modalContent.find($placeMessage).append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find($placeMessage).append('<label class="active" for="first_name" id="title-label"></label>');
      $placeMessage.find('#title-label').text('Título de tu evento');
      $placeMessage.one('click', () => {
        $placeMessage.append('<span class="counter-span"></span>');
        $('.counter-span').text('0' + '/' + MAXCHARACTERS);
        // Contando el número de caracteres del input
        $('#first_name').on('input', function(event) {
          console.log(event.target);
          if ($('#first_name').val().trim().length) {
            let $str = $('#first_name').val().trim(); 
            const PATTERNLETTERS = /[A-z]/g; 
            let $result = $str.match(PATTERNLETTERS);
            console.log($result);
            let $word = $result.join('');
            if ($word) {
              let $total = MAXCHARACTERS - (MAXCHARACTERS - $word.length); 
              console.log($total);
              $('.counter-span').text($total + '/' + MAXCHARACTERS);
              if ($total > MAXCHARACTERS) {
                $('#first_name').addClass('invalid');
              } else {
                $('#first_name').removeClass('invalid');
              } 
            }
          } else {
            $('.counter-span').text('0' + '/' + MAXCHARACTERS);
          }
        }); 
      });
      //
      $modalContent.find('#add-post-container .input-field').append('<input placeholder="En qué fecha se realizó el evento?" id="first_name" type="text" class="validate">');
      // Modal para el botón que publica vídeos y audios.
    } else if (event.currentTarget === $videoButton[0]) {
      console.log('Este botón te permite postear audios y vídeos');
      // 
      $modalContent.find($placeMessage).empty();
      $modalContent.find('#add-post-container .input-field').empty();
      $modalContent.find($placeMessage).append('<input placeholder="Placeholder" id="first_name" type="text" class="validate">');
      $modalContent.find($placeMessage).append('<label class="active" for="first_name" id="title-label"></label>');
      $placeMessage.find('#title-label').text('Título de tu evento');
      $placeMessage.one('click', () => {
        $placeMessage.append('<span class="counter-span"></span>');
        $('.counter-span').text('0' + '/' + MAXCHARACTERS);
        // Contando el número de caracteres del input
        $('#first_name').on('input', function(event) {
          console.log(event.target);
          if ($('#first_name').val().trim().length) {
            let $str = $('#first_name').val().trim(); 
            const PATTERNLETTERS = /[A-z]/g; 
            let $result = $str.match(PATTERNLETTERS);
            console.log($result);
            let $word = $result.join('');
            if ($word) {
              let $total = MAXCHARACTERS - (MAXCHARACTERS - $word.length); 
              console.log($total);
              $('.counter-span').text($total + '/' + MAXCHARACTERS);
              if ($total > MAXCHARACTERS) {
                $('#first_name').addClass('invalid');
              } else {
                $('#first_name').removeClass('invalid');
              } 
            }
          } else {
            $('.counter-span').text('0' + '/' + MAXCHARACTERS);
          }
        }); 
      });
      //
      $modalContent.find('#add-post-container .input-field').append('<div class="btn"><span>VIDEO O AUDIO</span><input type="file"></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="file-path-wrapper"><input class="file-path validate" type="text"></div>');
    } else {
      console.log('Error. Por favor, inténtelo nuevamente.');
    }
  });
});