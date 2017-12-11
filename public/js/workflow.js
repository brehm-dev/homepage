"use strict"
;(function() {
    /**
     * menu button
     */
    let navList = $('.ab-navbar-list'),
    navHeight = navList.height(),
    activeButtonClass = 'ab-navbar-menu-active-button';

    function slideNavDown() {
        for (let i = 1; i <= navHeight; i++) {
            let pos = navList.position().top;
            navList.css('top', pos + 1);
        }
    }
    function slideNavUp() {
        for (let i = 1; i <= navHeight; i++) {
            let pos = navList.position().top;
            navList.css('top', pos - 1);
        }
    }

    // show animation
    $('#menu-button').on('click', function(event) {
        let $trigger = $(this);
        if ($trigger.data('activity')) {
            $trigger.removeClass(activeButtonClass)
            $trigger.data('activity', false)
            slideNavUp()
        } else {
            $trigger.addClass(activeButtonClass);
            $trigger.data('activity', true)
            slideNavDown()
        }
    });
})($);