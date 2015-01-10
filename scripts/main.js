"use strict";function hideNavigation(e){e.find("a").removeClass("visible")}function updateNavigation(e,i){var a=i.find(".gallery-item-middle").length>0?!0:!1,l=i.children("li").eq(0).hasClass("gallery-item-front")?!1:!0;a?e.find("a").eq(1).addClass("visible"):e.find("a").eq(1).removeClass("visible"),l?e.find("a").eq(0).addClass("visible"):e.find("a").eq(0).removeClass("visible")}function showNextSlide(e){var i=e.find(".gallery-item-front"),a=e.find(".gallery-item-middle"),l=e.find(".gallery-item-back"),t=e.find(".gallery-item-out").eq(0);i.addClass("move-right").removeClass("gallery-item-front").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){i.addClass("hidden")}),a.addClass("gallery-item-front").removeClass("gallery-item-middle"),l.addClass("gallery-item-middle").removeClass("gallery-item-back"),t.addClass("gallery-item-back").removeClass("gallery-item-out")}function showPreviousSlide(e){function i(){t.hasClass("hidden")||(t.removeClass("move-right"),window.clearInterval(n))}var a=e.find(".gallery-item-front"),l=e.find(".gallery-item-middle"),t=e.find(".move-right").slice(-1),r=e.find(".gallery-item-back");t.removeClass("hidden").addClass("gallery-item-front"),a.removeClass("gallery-item-front").addClass("gallery-item-middle"),l.removeClass("gallery-item-middle").addClass("gallery-item-back"),r.removeClass("gallery-item-back").addClass("gallery-item-out");var n=setInterval(i,100)}$(".bio-trigger").on("click",function(e){var i=$(e.target).closest(".person");if(i){var a=i.find(".person-title").html()||"",l=i.find(".bio").html()||"",t=i.find(".tags").html()||"",r=i.find(".person-picture").attr("src")||"";$("#modal-bio .modal-title").html(a),$("#modal-bio .bio").html(l),$("#modal-bio .modal-footer").html(t),$("#modal-bio .modal-image").attr("src",r)}});var offerRollover=function(e){$(".lt-"+e).hover(function(){$(this).find(".offer-pic").removeClass("icon-lt_"+e).addClass("icon-lt_offer_rollover")},function(){$(this).find(".offer-pic").addClass("icon-lt_"+e).removeClass("icon-lt_offer_rollover")})};offerRollover("studio"),offerRollover("training"),offerRollover("swat"),$(function(){var e=location.pathname.split("/")[1];e&&$('.nav a[href^="/'+e+'"]').parent().addClass("active")}),$("a[href^='#']").on("click",function(e){e.preventDefault();var i=this.hash;$("html, body").animate({scrollTop:$(this.hash).offset().top},600,function(){window.location.hash=i})}),$(".project .description").readmore({moreLink:'<a href="#" style="text-align:center"><i class="fa fa-plus-circle fa-lg"></i> Voir plus</a>',lessLink:'<a href="#" style="text-align:center"><i class="fa fa-minus-circle fa-lg"></i> Fermer</a>',speed:200,maxHeight:100}),(new WOW).init(),jQuery(document).ready(function(e){var i=e(".gallery-3d-trigger"),a=e(".no-touch .gallery").children("li"),l=e(".gallery-item-navigation a");i.on("click",function(){var i=e(this);i.parent("li").hasClass("active")?(i.parent("li").removeClass("active"),hideNavigation(i.parent("li").find(".gallery-item-navigation"))):(i.parent("li").addClass("active"),updateNavigation(i.parent("li").find(".gallery-item-navigation"),i.parent("li").find(".gallery-item-wrapper")))}),a.hover(function(){var i=e(this).children(".gallery-item-wrapper");console.log("in"),updateNavigation(i.siblings("nav").find(".gallery-item-navigation").eq(0),i)},function(){var i=e(this).children(".gallery-item-wrapper");hideNavigation(i.siblings("nav").find(".gallery-item-navigation").eq(0))}),l.on("click",function(){var i=e(this),a=i.text(),l=i.parents("nav").eq(0).siblings(".gallery-item-wrapper");"Next"===a?showNextSlide(l):showPreviousSlide(l),updateNavigation(i.parents(".gallery-item-navigation").eq(0),l)})}),$(".project .description").readmore({moreLink:'<a href="#" class="see-more text-center"><i class="fa fa-plus-circle fa-lg"></i> Voir plus</a>',lessLink:'<a href="#" class="see-less text-center"><i class="fa fa-minus-circle fa-lg"></i> Fermer</a>',speed:200,maxHeight:100});