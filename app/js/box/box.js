const Calibrator = require('./calibrator');
const TransitionCacher = require('../state-machine/transition-cacher')
class Box {
    constructor() {
        this.Calibrator = new Calibrator()
        this.Cacher = new TransitionCacher(this.getDatabaseSchema())
        this.TAGS = this.Calibrator.getTags()
        this.pages = this.getDatabaseSchema();

    }



    initialize() {
        this.config = this.Calibrator.getConfig()
        const TAG = this.Calibrator.getTags()
        this.Elements = {}

        const identify = (tag) => {
            const el = $(document).find('[data-identity="' + tag + '"');
            if (el === undefined) return false;
            return el;
        }

        for (const T in TAG.ELEMENTS) {
            const tag = TAG.ELEMENTS[T]

            this.Elements[tag] = {
                dom: identify(tag),
                config: this.config[tag],
                state: TAG.STATES.INITIALIZED,

            }
            if (tag !== TAG.ELEMENTS.BOX && tag !== TAG.ELEMENTS.STAGE) {
                this.Elements[tag].transitions = this.Calibrator.calculateTransition(this.config[tag])
                this.Elements[tag].update = () => {console.log(this, arguments)}
                this.Cacher.insert(tag, this.Elements[tag])
            }
            this.executeStyle(this.Elements[tag])
        }
    }

    move(direction) {
        const StringGenerator = this.Calibrator.getGeneratorInstance();
        for (const tag in this.Elements) {
            if (this.pages.hasOwnProperty(tag)) {
                this.Elements[tag].config.coordinates = this.Elements[tag].transitions[direction].coordinates
                this.Elements[tag].config.style = {
                    width: this.Elements[tag].config.style.width,
                    height: this.Elements[tag].config.style.height,
                    transform: StringGenerator.chain(this.Elements[tag].config.coordinates)
                }
                this.Elements[tag].transitions = this.Calibrator.calculateTransition(this.Elements[tag].config)
                this.executeStyle(this.Elements[tag])
            }
        }
    }

    updateResolution() {
        const R = {
            width: $(window).width(),
            height: $(window).height()
        }
        const SG = this.Calibrator.getGeneratorInstance()
        for (const tag in this.Elements) {
            if (tag === this.Calibrator.TAGS.ELEMENTS.STAGE) {
                this.Elements[tag].config.style = {
                    width: R.width,
                    height: R.height,
                    perspective: R.width
                }
                this.executeStyle(this.Elements[tag])
                continue
            }
            if (tag === this.Calibrator.TAGS.ELEMENTS.BOX) {
                this.Elements[tag].config.coordinates.range = -(R.width/2)
                this.Elements[tag].config.style = {
                    width: R.width,
                    height: R.height,
                    transform: SG.generate(this.Elements[tag].config.coordinates)
                }
                this.executeStyle(this.Elements[tag])
                continue
            }

            this.Elements[tag].config.coordinates.Z = {
                action: this.Elements[tag].config.coordinates.Z.action,
                range: R.width/2,
                unit: this.Elements[tag].config.coordinates.Z.unit
            }
            if (tag === this.Calibrator.TAGS.ELEMENTS.BOTTOM) {
                // TODO: Den Abstand von Bottom korregieren
                // this.Elements[tag].config.coordinates.Z.range = (R.width - 87)
            }
            if (tag === this.Calibrator.TAGS.ELEMENTS.TOP || tag === this.Calibrator.TAGS.ELEMENTS.BOTTOM) {
                this.Elements[tag].config.style = {
                    width: R.width,
                    height: R.width,
                    transform: SG.chain(this.Elements[tag].config.coordinates)
                }
                this.executeStyle(this.Elements[tag])
                continue
            }
            this.Elements[tag].config.style = {
                width: R.width,
                height: R.height,
                transform: SG.chain(this.Elements[tag].config.coordinates)
            }
            this.executeStyle(this.Elements[tag])
        }
    }

    executeStyle(element) {
        if (typeof element === "object") {
            element.dom.css(element.config.style)
        }
        return false
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
}

module.exports = Box;