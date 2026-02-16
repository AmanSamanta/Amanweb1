$(document).ready(function(){

    $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('header').toggleClass('toggle');
    });
  
    $(window).on('scroll load',function(){
  
      $('#menu').removeClass('fa-times');
      $('header').removeClass('toggle');
  
      if($(window).scrollTop() > 0){
        $('.top').show();
      }else{
        $('.top').hide();
      }
  
    });
  
    // smooth scrolling 
  
    $('a[href*="#"]').on('click',function(e){
  
      e.preventDefault();
  
      $('html, body').animate({
  
        scrollTop : $($(this).attr('href')).offset().top,
  
      },
        500, 
        'linear'
      );
  
    });

    // Profile audio play/pause button
    const audio = document.getElementById('profile-audio');
    const audioToggle = document.getElementById('audio-toggle');
    if (audio && audioToggle) {
      const setLabel = () => {
        audioToggle.textContent = audio.paused ? 'Play Music' : 'Pause Music';
      };

      audioToggle.addEventListener('click', () => {
        if (audio.paused) {
          audio.play().catch(() => {
            // Autoplay may be blocked; user can click again after interacting.
          });
        } else {
          audio.pause();
        }
        setLabel();
      });

      audio.addEventListener('play', setLabel);
      audio.addEventListener('pause', setLabel);
      setLabel();
    }
  
  });