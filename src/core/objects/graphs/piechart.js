import { Mathf } from '../../math/mathf.js';
import { Object2D } from '../object2d.js';
import { Piece } from './piece.js';

class PieChart extends Object2D {

    constructor(pieArray) {

        super();

        this.pieArray = pieArray;

        this.startRadian = 0;
        this.endDegrees = 0;

        this.totalValue = this.countTotalValue();

    }

    ready() {

        const scene = this.parent;
        scene.connect('update', signal => {

            this.update(signal.dt);

        });

        this.createPie();

    }

    createPie() {

        // Look on the list and write defined values for pieces.
        for (let i = 0; i < this.pieArray.length; i++) {

            // Calculate angles
            const angleValues = this.pieceAngleValues(i);

            

            this.createPiece({
                id: i,
                angles: angleValues,
                pieceValue: this.pieArray[i]
            });

            // For loop is added values, that true calculate angles.
            this.addRadDeg(angleValues);

        }

    }

    addRadDeg(values) {

        this.startRadian = values.endRadian;
        this.endDegrees += values.degrees;

    }

    pieceAngleValues( idPiece ) {

        const percentage = Mathf.percentage(this.pieArray[idPiece].value, this.totalValue);
        const degrees = Mathf.per2deg(percentage);
        const endRadian = Mathf.radians(degrees + this.endDegrees);

        return {
            percentage: percentage,
            degrees: degrees,
            endRadian: endRadian
        };

    }

    createPiece(values) {

        const piece = new Piece(this.startRadian, values.angles.endRadian);
        piece.id = values.id;
        piece.values = values.pieceValue;

        // Add all the objects for the scene identity
        this.add(piece);
    }

    countTotalValue() {

        let value = 0;
        for (let i = 0; i < this.pieArray.length; i++) {

            value += this.pieArray[i].value;

        }

        return value;
    }
}

export { PieChart };