"use strict"
;(function() {
    let threemaButton = $('#threema-slider');
    threemaButton.on('click', function(event) {
        event.preventDefault();
        $('#threema-qr').toggleClass('showFlexContent')
    });
    // console.log(threemaButton.children(':hidden'))
    // threemaButton.on('click')

})($);