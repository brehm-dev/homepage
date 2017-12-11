"use strict"
;(function() {
    /**
     * menu button
     */
    let navList = $('.ab-navbar-list'),
    navHeight = navList.height(),
    activeButtonClass = 'ab-navbar-menu-active-button';
    console.log(navHeight)
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


    $.fn.extend({
        class: function() {
            return 'ab-navbar-menu-active-button';
        },
        activate: function() {
            let cls = this.class()
            if (!this.hasClass(cls)) {
                this.addClass(this.class())
                this.data('activity', true)
                slideNavDown()
            }
        },
        deactivate: function() {
            let cls = this.class()
            if (this.hasClass(cls)) {
                this.removeClass('ab-navbar-menu-active-button');
                this.data('activity', false)
                slideNavUp()
            }

        }
    });

    // show animation

    $('#menu-button').on('click', function(event) {
        let navLinks = navList.find('.ab-navbar-group-item');
        let $trigger = $(this);



        navLinks.on('click', function() {
            $trigger.deactivate()
        });
        if ($trigger.data('activity')) {
            $trigger.deactivate()
        } else {
            $trigger.activate()
        }
    });
})($);