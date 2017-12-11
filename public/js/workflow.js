"use strict"
class Navigator {
    constructor(list) {
        // console.log(list)
        // this.deadItem = list.children('.ab-navbar-dead-item');
        // this.group = list.children('.ab-navbar-group');
        this.register = new Array();
        this.elements = new Array();
        for (let l of list.find('.ab-navbar-group-item')) {
            let $el = $(l);
            let child = $el.children();
            this.elements.push($el);
            this.register.push({
                id: $el.attr('id'),
                enable: false,
                margin: {
                    top: $el.css('margin-top'),
                    right: $el.css('margin-right'),
                    bottom: $el.css('margin-bottom'),
                    left: $el.css('margin-left')
                },
                children: !child.length ? false : {
                    element: child,
                    h: child.height(),
                    w: child.width()
                }
            });
        }
        this.reset()
    }
    reset() {
        function setHeightZeroMarginZero(item) {
            item.css({
                'height': '0px',
                'margin': '0'
            });
        }
        function resetHeight(item){

        }

        for (let reg of this.elements) {
            let $el = $(reg);
            let id = $el.attr('id');
            $el.css('margin', '0')
            for (let reg of this.register) {
                if (reg.id === id) {
                    reg.children.element.addClass('ab-navbar-vanish-list')
                    // console.log()
                }
            }
        }        // this.elements.each(function(id, el) {
        //     let $el = $(el);
        // });
    }
}
;(function() {
    let menuTrigger = $('.ab-navbar-menu')
    let menuList = $('.ab-navbar-list');
    let navList = $('.ab-navbar-list');

    let activeButtonClass = 'ab-navbar-menu-active-button'

    let navListTop = (navList.offset().top + navList.height());


    let height = {
        start: 0,
        list: navList.height(),
        bar: $('.ab-navbar-menu-bar').height()
    }

    function slideNavDown() {
        for (let i = 1; i <= height.list; i++) {
            let pos = navList.position().top;
            navList.css('top', pos + 1);
        }
    }
    function slideNavUp() {
        for (let i = 1; i <= height.list; i++) {
            let pos = navList.position().top;
            navList.css('top', pos - 1);
        }

    }

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