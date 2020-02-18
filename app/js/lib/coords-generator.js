

class TransformTextGenerator {
    constructor() {
    }
    rotate(coords) {
        return `rotateY(${coords.y}) rotateX(${coords.x}) translate(${coords.z}vw)`;
    }
}

class CoordsGenerator {
    constructor() {
        this.calculate = {};
        this.Generator = new TransformTextGenerator();
        const Rotator = {
            left: (coords) => {
                return {
                    x: coords.x,
                    y: coords.y += 90
                }
            },
            right: (coords) => {
                return {
                    x: coords.x,
                    y: coords.y -= 90
                }
            },
            top: (coords) => {
                return {
                    x: coords.x += 90,
                    y: coords.y
                }
            },
            bottom: (coords) => {
                return {
                    x: coords.x -= 90,
                    y: coords.y
                }
            }
        };



        this.calculate.left = () => {
            this.Align.front    = Rotator.left(this.Align.front);
            this.Align.left     = Rotator.left(this.Align.left);
            this.Align.right    = Rotator.left(this.Align.right);
            this.Align.back     = Rotator.left(this.Align.back);
        };

        this.calculate.right = () => {
            this.Align.front    = Rotator.right(this.Align.front);
            this.Align.left     = Rotator.right(this.Align.left);
            this.Align.right    = Rotator.right(this.Align.right);
            this.Align.back     = Rotator.right(this.Align.back);
        };

        this.calculate.top = () => {
            this.Align.front    = Rotator.top(this.Align.front);
            this.Align.top      = Rotator.top(this.Align.top);
            this.Align.bottom   = Rotator.top(this.Align.bottom);
            this.Align.back     = Rotator.top(this.Align.back);
        };

        this.calculate.bottom = () => {
            this.Align.front    = Rotator.bottom(this.Align.front);
            this.Align.top      = Rotator.bottom(this.Align.top);
            this.Align.bottom   = Rotator.bottom(this.Align.bottom);
            this.Align.back     = Rotator.bottom(this.Align.back);
        };
    }
    left() {
        this.calculate.left();
        let output = {};
        for (let align in this.Align) {
            output[align] = this.Generator.rotate(this.Align[align]);
        }
        return output;
    }
    getTransitions() {
        let transitions = {};
        for (let cords in this.Align) {
            for (let i = 0; i < 5; i++) {

            }
            console.log(this.Align[cords])
        }
    }

}

module.exports = CoordsGenerator;