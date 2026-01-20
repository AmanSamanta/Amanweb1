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

    // Auto age calculation and animated counter
    (function(){
      function calculateAge(birthStr){
        const today = new Date();
        const birth = new Date(birthStr);
        if(isNaN(birth)) return null;
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if(m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
      }

      function animateCount($el, target, duration){
        let start = parseInt($el.text(), 10);
        if(isNaN(start)) start = 0;
        if(start === target){
          $el.text(target);
          return;
        }
        let startTime = null;
        function step(timestamp){
          if(!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const value = Math.round(start + (target - start) * progress);
          $el.text(value);
          if(progress < 1){
            window.requestAnimationFrame(step);
          } else {
            $el.text(target);
          }
        }
        window.requestAnimationFrame(step);
      }

      function updateAge(){
        const $ageEl = $('#age');
        if(!$ageEl.length) return;
        const birth = $ageEl.data('birth'); // expects YYYY-MM-DD (optional)
        let targetAge = null;
        if(birth){
          targetAge = calculateAge(birth);
        }
        if(targetAge === null || isNaN(targetAge)){
          const parsed = parseInt($ageEl.text(), 10);
          targetAge = isNaN(parsed) ? 0 : parsed;
        }
        // If the span is empty, insert the computed age immediately.
        if(!$ageEl.text().trim()){
          $ageEl.text(targetAge);
        } else {
          animateCount($ageEl, targetAge, 800);
        }
      }

      // expose for inline calls and external use
      window.updateAge = updateAge;

      // run once on load
      updateAge();
    })();
  
  });

  document.addEventListener("DOMContentLoaded", () => {
    updateAgeWithMonths();
    scheduleMidnightUpdate();
  });

  /* Calculate exact years and months */
  function calculateAgeParts(birthStr) {
    const today = new Date();
    const birth = new Date(birthStr);
    if (isNaN(birth)) return { years: 0, months: 0 };

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (dayDiff < 0) months -= 1;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months };
  }

  /* Update age display with years and months (no numeric animation) */
  function updateAgeWithMonths() {
    const ageEl = document.getElementById("age");
    if (!ageEl) return;

    const birthStr = ageEl.dataset.birth;
    const parts = calculateAgeParts(birthStr);
    ageEl.textContent = `${parts.years} Years ${parts.months} Months`;
  }

  /* Auto update at midnight */
  function scheduleMidnightUpdate() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // next midnight
    const timeUntilMidnight = midnight - now;

    setTimeout(() => {
      updateAgeWithMonths();
      scheduleMidnightUpdate(); // repeat daily
    }, timeUntilMidnight);
  }