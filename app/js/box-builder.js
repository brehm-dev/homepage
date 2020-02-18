const BoxHelper = require('./lib/box-helper');


// class DisplayResolution {
//     constructor(element) {
//         this.width = element.width();
//         this.height = element.height();
//     }
//
// }

// class BoxCoords {
//     constructor(element) {
//         this.resolution = new DisplayResolution(element);
//         this.coords = {
//             transform: element.css('transform')
//         }
//     }
// }
//
// class Box {
//     constructor(tag) {
//
//     }
// }

class BoxBuilder {
    constructor(options) {
        this.name = 'box-builder';
        this.version = '2.9.3';
        this.Box = new BoxHelper(options);



        //
        // this.Pages = {};
        //
        // this.Box = $(options.box);
        // this.Stage = this.Box.parent();
        // for (let page of this.Box.children()) {
        //     let $page = $(page);
        //     this.Pages[$page.data(options.pageKey)] = {
        //         page: $page,
                // scanned: new BoxCoords($page)
            // };
        // }
    }
    // moveLeft() {
    //
    // }

}

module.exports = BoxBuilder;