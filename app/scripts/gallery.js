'use strict';

function hideNavigation(navigation) {
    navigation.find('a').removeClass('visible');
}

function updateNavigation(navigation, container) {
    var isNextActive = ( container.find('.gallery-item-middle').length > 0 ) ? true : false,
        isPrevActive =  ( container.children('li').eq(0).hasClass('gallery-item-front') ) ? false : true;
    (isNextActive) ? navigation.find('a').eq(1).addClass('visible') : navigation.find('a').eq(1).removeClass('visible');
    (isPrevActive) ? navigation.find('a').eq(0).addClass('visible') : navigation.find('a').eq(0).removeClass('visible');
}

function showNextSlide(container) {
    var itemToHide = container.find('.gallery-item-front'),
        itemToShow = container.find('.gallery-item-middle'),
        itemMiddle = container.find('.gallery-item-back'),
        itemToBack = container.find('.gallery-item-out').eq(0);

    itemToHide.addClass('move-right').removeClass('gallery-item-front').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        itemToHide.addClass('hidden');
    });
    itemToShow.addClass('gallery-item-front').removeClass('gallery-item-middle');
    itemMiddle.addClass('gallery-item-middle').removeClass('gallery-item-back');
    itemToBack.addClass('gallery-item-back').removeClass('gallery-item-out');
}

function showPreviousSlide(container) {
    function checkClass(){
        if( !itemToShow.hasClass('hidden') ) {
            itemToShow.removeClass('move-right');
            window.clearInterval(stop);
        }
    }

    var itemToMiddle = container.find('.gallery-item-front'),
        itemToBack = container.find('.gallery-item-middle'),
        itemToShow = container.find('.move-right').slice(-1),
        itemToOut = container.find('.gallery-item-back');

    itemToShow.removeClass('hidden').addClass('gallery-item-front');
    itemToMiddle.removeClass('gallery-item-front').addClass('gallery-item-middle');
    itemToBack.removeClass('gallery-item-middle').addClass('gallery-item-back');
    itemToOut.removeClass('gallery-item-back').addClass('gallery-item-out');

    //wait until itemToShow does'n have the 'hidden' class, then remove the move-right class
    //in this way, transition works also in the way back
    var stop = setInterval(checkClass, 100);
}


jQuery(document).ready(function($){
    var visionTrigger = $('.gallery-3d-trigger'),
        galleryItems = $('.no-touch .gallery').children('li'),
        galleryNavigation = $('.gallery-item-navigation a');

    //on mobile - start/end 3d vision clicking on the 3d-vision-trigger
    visionTrigger.on('click', function(){
        var $this = $(this);
        if( $this.parent('li').hasClass('active') ) {
            $this.parent('li').removeClass('active');
            hideNavigation($this.parent('li').find('.gallery-item-navigation'));
        } else {
            $this.parent('li').addClass('active');
            updateNavigation($this.parent('li').find('.gallery-item-navigation'), $this.parent('li').find('.gallery-item-wrapper'));
        }
    });

    //on desktop - update navigation visibility when hovering over the gallery images
    galleryItems.hover(
        //when mouse enters the element, show slider navigation
        function(){
            var $this = $(this).children('.gallery-item-wrapper');
            console.log('in');
            updateNavigation($this.siblings('nav').find('.gallery-item-navigation').eq(0), $this);
        },
        //when mouse leaves the element, hide slider navigation
        function(){
            var $this = $(this).children('.gallery-item-wrapper');
            hideNavigation($this.siblings('nav').find('.gallery-item-navigation').eq(0));
        }
    );

    //change image in the slider
    galleryNavigation.on('click', function(){
        var navigationAnchor = $(this),
            direction = navigationAnchor.text(),
            activeContainer = navigationAnchor.parents('nav').eq(0).siblings('.gallery-item-wrapper');

        (direction==='Next') ? showNextSlide(activeContainer) : showPreviousSlide(activeContainer);
        updateNavigation(navigationAnchor.parents('.gallery-item-navigation').eq(0), activeContainer);
    });
});

