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
        let $textArea = $('.input-field textarea');
        // Contando el número de caracteres del input
        $('#first_name').on('input', function(event) {
          console.log(event.target);
          // Comprobando si los caracteres ingresados son letras
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
              const PATTERNNUMBERS = /[^0-9]/;
              let $verify = PATTERNNUMBERS.test($word);
              if ($verify && $textArea.val().length !== 0) {
                $publishButton.removeAttr('disabled');
              } else {
                $publishButton.attr('disabled', true);
              } 
            }
          } else {
            $('.counter-span').text('0' + '/' + MAXCHARACTERS);
            $('#first_name').addClass('invalid');
            $publishButton.attr('disabled', true);
          }
        }); 

        $textArea.on('input', function() {
          const PATTERNNUMBERS = /[^0-9]/;
          let $verify = PATTERNNUMBERS.test($('#first_name').val());
          if ($verify && $textArea.val().length !== 0) {
            $publishButton.removeAttr('disabled');
          } else {
            $publishButton.attr('disabled', true);
          } 
        });
        // Creando contenedor del post
        $publishButton.one('click', () => {
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

            let $inputContent = $('#first_name').val();
            const PATTERNNUMBERS = /[^0-9]/;
            let $verify = PATTERNNUMBERS.test($inputContent);
            if ($verify && $('#files').val()) {
              $publishButton.removeAttr('disabled');
            } else {
              $publishButton.attr('disabled', true);
            }      
          } else {
            $('.counter-span').text('0' + '/' + MAXCHARACTERS);
            $('#first_name').addClass('invalid');
            $publishButton.attr('disabled', true);
          }
        }); 
      });
      //
      $modalContent.find('#add-post-container .input-field').append('<div class="btn" id="button"><span id="description-span">IMAGEN</span><input type="file" id="files" name="files[]" multiple><output id="list"></output></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="file-path-wrapper"><input class="file-path validate" type="text"></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="image-preview"><img src="" class="responsive-image"</div>');
      
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        function handleFileSelect(evt) {
          let files = evt.target.files; // FileList object
      
          // Loop through the FileList and render image files as thumbnails.
          for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
              continue;
            }
            let reader = new FileReader();
      
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(event) {
                // Render thumbnail.
                let span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', event.target.result,
                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
                $('#add-post-container .input-field').find('#button').addClass('button-image');
                $('#add-post-container .input-field').find('#description-span').addClass('image-span');
                let $inputContent = $('#first_name').val();
                const PATTERNNUMBERS = /[^0-9]/;
                let $verify = PATTERNNUMBERS.test($inputContent);
                if ($verify && $('#files').val()) {
                  $publishButton.removeAttr('disabled');
                } else {
                  $publishButton.attr('disabled', true);
                }          
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
      // Creando contenedor con la imagen y su título

      $publishButton.one('click', function() {
        $postsContainer.find('#posts-container-row').append('<div class="picture-container"></div>');
        $('.picture-container').append(`<h2>${$('#first_name').val()}</h2>`);
        let $image = $('#modal1').find('output');
        $('#posts-container-row').find('.picture-container').append($image);
        $image.find('img').removeClass('thumb');
        $image.find('img').addClass('responsive-img picture');
      });
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
            $('#first_name').addClass('invalid');
            $publishButton.attr('disabled', true);
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
            $('#first_name').addClass('invalid');
            $publishButton.attr('disabled', true);
          }
        }); 
      });
      //
      $modalContent.find('#add-post-container .input-field').append('<div class="btn"><span>VIDEO O AUDIO</span><input type="file" id="files" name="files[]" multiple><output id="list-video"></output></div>');
      $modalContent.find('#add-post-container .input-field').append('<div class="file-path-wrapper"><input class="file-path validate" type="text"></div>');
      $modalContent.find('#add-post-container .input-field').append('<video controls><source src="" type="video/mp4/mp3"></video>');
    
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        function handleFileSelect(evt) {
          var files = evt.target.files; // FileList object
      
          // Loop through the FileList and render image files as thumbnails.
          for (var i = 0, f; f = files[i]; i++) {
      
            // Only process image files.
            if (!f.type.match('video.*')) {
              continue;
            }
      
            var reader = new FileReader();
      
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(e) {
                // Render thumbnail.
                debugger;
                var span = document.createElement('span');
<<<<<<< HEAD
                
                span.innerHTML = ['<video class="thumb" controls><source src="', e.target.result,
                                  '" title="', escape(theFile.name), '"/></video>'].join('');
                document.getElementById('list-video').insertBefore(span, null);
=======
                span.innerHTML = ['<source class="thumb" src="', e.target.result,
                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
>>>>>>> fdd4dd1ae6446de8ec43095aa084bf2398a7a4e4
              };
            })(f);
      
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
          }
        }
      
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
      }
    } else {
      console.log('Error. Por favor, inténtelo nuevamente.');
    }
  });
});