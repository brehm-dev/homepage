const Calibrator = require('./calibrator');
const TransitionCacher = require('../state-machine/transition-cacher')
class Box {
    constructor(box) {
        this.calibrator = new Calibrator()
        this.Cacher = new TransitionCacher(this.getDatabaseSchema())

        // console.log(Math.floor(Math.random() * 1000))
        // this.Pages = this.extractPagesProperties(this.Box.children());
        // this.Box.on("StartUp", (event) => {
        //     console.log(arguments)
        // })
    }
    initialize() {
        this.config = this.calibrator.getConfig()
        const TAG = this.calibrator.getTags()
        const identify = (tag) => {
            const el = $(document).find('[data-identity="' + tag + '"');
            if (el === undefined) return false;
            return el;
        }
        this.elements = {
            stage: {
                dom: identify(TAG.STAGE),
                config: this.config[TAG.STAGE]
            },
            box: {
                dom: identify(TAG.BOX),
                config: this.config[TAG.BOX]
            },
            pages: {}
        }
        for (const c in TAG.PAGES) {
            this.elements.pages[c] = {
                dom: identify(c),
                config: this.config[c],
                transitions: this.calibrator.calculateTransition(this.config[c])
            }
            this.Cacher.insert(c, this.elements.pages[c])
        }
        for (const el in this.elements) {
            if (this.elements[el].dom === undefined) {
                for (const page in this.elements[el]) {
                    this.executeStyle(this.elements[el][page].dom, this.elements[el][page].config.style)
                    // console.log()
                }
            } else {
                this.executeStyle(this.elements[el].dom, this.elements[el].config.style);
            }
        }
        console.log(this)
    }

    executeStyle(obj, style) {
        if (obj !== undefined && typeof style === "object") {
            obj.css(style)
        }
    }

    getDatabaseSchema() {
        return {
            front:  [],
            left:   [],
            right:  [],
            back:   [],
            top:    [],
            bottom: []
        }
    }

    // spin(direction) {
    //     const executedCoordinates = {};
    //     for (const page in this.Pages) {
    //         const coordinate = this.Transitor.get[direction](this.history[this.history.length -1][page]);
    //         this.Pages[page].css('transform', this.Transitor.get.transformationString(coordinate));
    //         executedCoordinates[page] = coordinate;
    //     }
    //     this.history.push(executedCoordinates);
    // }
    // extractPagesProperties(pages) {
    //     const extractedProperties = {};
    //     for (let i = 0; i <= pages.length; i++) {
    //         if (pages[i] !== undefined) {
    //             const page = $(pages[i]);
    //             extractedProperties[page.data('identity')] = page;
    //         }
    //     }
    //     return extractedProperties;
    // }
}

module.exports = Box;