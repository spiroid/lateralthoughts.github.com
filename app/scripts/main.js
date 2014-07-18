'use strict';

console.log('\'Allo \'Allo!');


// Over state of Studio, Swat, Training.
var offerRollover = function(offerName) {
  $('.lt-' + offerName).hover(function() {
    $(this).find('.lt-offer-pic').removeClass('icon-lt_' + offerName).addClass('icon-lt_offer_rollover');
  }, function() {
    $(this).find('.lt-offer-pic').addClass('icon-lt_' + offerName).removeClass('icon-lt_offer_rollover');
  });
};

offerRollover('studio');
offerRollover('training');
offerRollover('swat');
