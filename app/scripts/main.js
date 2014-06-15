console.log('\'Allo \'Allo!');


// Over state of Studio, Swat, Training.
var offerORollover = function(offerName) {
  $(".lt-offer").hover(function() {
    $(this).find(".lt-offer-pic").removeClass(offerName).addClass("icon-lt_offer_rollover");
  }, function() {
    $(this).find(".lt-offer-pic").addClass(offerName).removeClass("icon-lt_offer_rollover");
  });
};

offerORollover("icon-lt_studio");
offerORollover("icon-lt_training");
offerORollover("icon-lt_swat");
