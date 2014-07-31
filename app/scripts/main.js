'use strict';

console.log('\'Allo \'Allo!');


// Over state of Studio, Swat, Training.
var offerRollover = function(offerName) {
  $('.lt-' + offerName).hover(function() {
    $(this).find('.offer-pic').removeClass('icon-lt_' + offerName).addClass('icon-lt_offer_rollover');
  }, function() {
    $(this).find('.offer-pic').addClass('icon-lt_' + offerName).removeClass('icon-lt_offer_rollover');
  });
};

offerRollover('studio');
offerRollover('training');
offerRollover('swat');


$("a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(this.hash).offset().top
     }, 600, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});

new WOW().init();