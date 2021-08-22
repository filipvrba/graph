import { Mathf } from '../../math/mathf.js';
import { Vector2 } from '../../math/vector2.js';
import { Object2D } from '../object2d.js';
import { Piece } from './piece.js';

class PieChart extends Object2D {

    constructor(pieArray) {

        super();

        this.pieArray = pieArray;

        this.startRadian = 0;
        this.endDegrees = 0;
        this.widthRadius = 0;

        this.totalValue = this.countTotalValue();

        this.pieces = new Object2D();
        this.texts = new Object2D();

        //this.add(this.pieces, 'pieces');
        //this.add(this.texts, 'texts');

    }

    ready() {

        this.createPie();

        //const pieces = this.findChildren('pieces');

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
        piece.values['widthRadius'] = this.widthRadius;
        piece.values['angles'] = values.angles;

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