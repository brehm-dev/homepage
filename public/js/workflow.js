"use strict"
;(function() {
    let menuTrigger = $('.ab-navbar-menu')
    let menuList = $('.ab-navbar-group');

    menuTrigger.on('click', function(event) {
        menuList.toggle(400)
    });
})($);