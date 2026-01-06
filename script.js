$(document).ready(function(){

    $('#menu').click(function(){
      $(this).toggleClass('fa-times');
      $('header').toggleClass('toggle');
    });

    // theme color switcher
    $('#theme-toggler').click(function(){
      $('#theme-buttons').toggleClass('active');
    });

    $('.theme-btn').click(function(){
      let color = $(this).attr('data-color');
      $(':root').css('--yellow', color);
      document.documentElement.style.setProperty('--yellow', color);
      localStorage.setItem('themeColor', color);
    });

    // load saved theme color on page load
    let savedColor = localStorage.getItem('themeColor');
    if(savedColor){
      $(':root').css('--yellow', savedColor);
      document.documentElement.style.setProperty('--yellow', savedColor);
    }
  
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
  
  });