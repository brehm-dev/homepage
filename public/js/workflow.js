"use strict"
class SideFixer {
    constructor() {
        let body = $(document.body),
        header = body.find('header'),
        navbar = body.find('nav').children('.ab-navbar-menu-bar'),
        navlist = navbar.find('.ab-navbar-list'),
        menuButton = header.find('.ab-navbar-menu-button'),
        navitems = navlist.find('.ab-navbar-group-item');

        this.elements = {
            body: body,
            header: header,
            nav: {
                list: navlist,
                bar: navbar,
                items: navitems
            }
        }

        this.resolutions = {
            list: {
                h: navlist.height(),
                w: navlist.width()
            },
            bar: {
                h: navbar.height(),
                w: navbar.width()
            }
        }

        if (this.resolutions.list.h > this.resolutions.bar.h) {
            this.elements.nav.list.css('top', '-' + (this.resolutions.list.h - this.resolutions.bar.h) + 'px')
        }
    }

    scrollTo(elem) {
        let elemPos = $(elem).position()
        $('html, body').animate({
            scrollTop: (elemPos.top - this.resolutions.bar.h)
        }, 400);
    }

    slideNavDown() {
        this.slideNav(true);
    }

    slideNavUp() {
        this.slideNav(false);
    }

    slideNav(addition) {
        for (let i = 1; i <= this.resolutions.list.h; i++) {
            let pos = this.elements.nav.list.position().top;
            if (addition) {
                this.elements.nav.list.css('top', pos + 1);
            } else {
                this.elements.nav.list.css('top', pos - 1);
            }
        }
    }
}

;(function() {
    let sf = new SideFixer();

    $.fn.extend({
            class: function() {
                return 'ab-navbar-menu-active-button';
            },
            activate: function() {
                let cls = this.class()
                if (!this.hasClass(cls)) {
                    this.addClass(cls)
                    this.data('activity', true)
                }
            },
            deactivate: function() {
                let cls = this.class()
                if (this.hasClass(cls)) {
                    this.removeClass(cls);
                    this.data('activity', false)
                }
            }
        });

    $('#menu-button').on('click', function(event) {
        let $btn = $(this);

        sf.elements.nav.items.on('click', function() {
            $btn.deactivate();
            sf.slideNavUp()
        })

        if ($btn.data('activity')) {
            $btn.deactivate()
            sf.slideNavUp()
        } else {
            $btn.activate()
            sf.slideNavDown()
        }
    })

    $('a').on('click', function(event) {
        if (this.href.indexOf(location.href) !== 0) {
            return true;
        } else {
            event.preventDefault()
            let anchorPos = $(this.attributes.href.value).position()
            sf.scrollTo(this.attributes.href.value)
        }
    })
})($);