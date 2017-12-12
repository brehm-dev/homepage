"use strict"
class SideFixer {
    constructor() {
        this.body = $(document.body);
        this.header = this.body.find('header');
        this.navbar = this.body.find('nav').children('.ab-navbar-menu-bar');
        this.navlist = this.navbar.find('.ab-navbar-list')
        let h = {
            list: this.navlist.height(),
            bar: this.navbar.height()
        }
        if (h.list > h.bar) {
            this.navlist.css('top', '-' + (h.list - h.bar) + 'px')
        }
    }

    scrollTo(elem) {
        let elemPos = $(elem).position()
        let navH = this.navbar.height();
        $('html, body').animate({
            scrollTop: (elemPos.top - navH)
        }, 400);
        console.log(this)
    }
}

;(function() {
    /**
     * menu button
     */
    let navList = $('.ab-navbar-list'),
    navHeight = navList.height(),
    activeButtonClass = 'ab-navbar-menu-active-button';
    let sf = new SideFixer();
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

    $('a').on('click', function(event) {
        if (this.href.indexOf(location.href) !== 0) {
            return true;
        } else {
            event.preventDefault()
            let anchorPos = $(this.attributes.href.value).position()
            sf.scrollTo(this.attributes.href.value)

        }
    })

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