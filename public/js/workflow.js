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
    // let navi = new Navigator(menuList);
    // console.log(navi)
    menuTrigger.on('click', function(event) {
        // menuList.toggle(400)
    });



})($);