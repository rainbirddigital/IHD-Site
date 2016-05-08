
  /*!
   * Smooth Scroll - goo.gl/GcbcsH
   */ 

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 700);
        return false;
      }
    }
  });


   /*!
   * Make divs square - Match widths with heights adapted from - goo.gl/55Ditu 
   */

  var myHeight;
  var elements = ['.researchCta.columnFour','.researchCta.columnThree','.sectionCta.columnThree','.team.columnFour','.team .item img']; 

  function adjustHeight(elements) {
              for(var i = 0; i < elements.length ; i++) {
              var myWidth = jQuery(elements[i]+' .item').width();
              var myString = myWidth + 'px';
              jQuery( elements[i]+' .item').css('height', myString);
                   }
              return myHeight;
  }
   
  // calls adjustHeight on window load
  jQuery(window).load(function() {
              adjustHeight(elements);
  });
   
  // calls adjustHeight anytime the browser window is resized
  jQuery(window).resize(function() {
              adjustHeight(elements);
              
  });


  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }
 
  var $window = $(window),
      header = $('.headerNav'),
      navBtn = $('.nav-btn'),

      handleScrollFn = function () {
        if ($window.scrollTop() > 250) {
          header.addClass('smaller').removeClass('menu-open');
        } else {
          header.removeClass('smaller menu-open');
        }
      },

      handleNav = function (e) {
        $('body').toggleClass('menu-open');
        if ($('body').hasClass('menu-open')) {
          disableScroll()
        } else {
          enableScroll()
        }
        
        // header.hasClass('smaller') ? {} : header.addClass('smaller');
        e.preventDefault();
      },

      handleInfoBox = function (e) {
        e.preventDefault();

        if ($window.innerWidth() < 481) {
          return;
        }

        var $this = $(this),
            $parent = $this.parent();

        if ($this.hasClass('active')) {
          $this.removeClass('active')
            .next('.teamDetails').slideUp('medium');
          $this.blur();
        } else if ($('.item').hasClass('active')) {
          $('.item.active').removeClass('active')
            .next('.teamDetails').slideUp('medium');
          $this.addClass('active')
            .next('.teamDetails').slideDown('medium');
        } else {
          $this.addClass('active')
            .next('.teamDetails').slideDown('medium');
        }      
    };



  //events
  $window.on('scroll', handleScrollFn);
  navBtn.on('click', handleNav);
  $(header).scrollupbar();
  $('.team .item').on('click', handleInfoBox);

  $(document).on('click','.accordion-tab .more', function (e) {
    var parent = $(this).parent()
      parent.toggleClass('active');
      parent.next('.accordion-content').slideToggle('200');
      e.preventDefault();
    });

  $(document).on('click','.accordion-content .less', function (e) {
    var parent = $(this).parent()
      parent.prev().toggleClass('active');
      parent.slideToggle('200');
      e.preventDefault();
    });

  //functions on load
  handleScrollFn();





