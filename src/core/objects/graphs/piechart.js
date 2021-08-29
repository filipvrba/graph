import { Mathf } from '../../math/mathf.js';
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

    }

    ready() {

        this.pieces = new Object2D();
        this.list = new Object2D();

        this.add(this.pieces, 'pieces');
        this.add(this.list, 'list');

        this.pieces.connect('animFinish', (signal) => {
            this.animFinish( signal.id );
        });

        this.createPie();

    }

    /**
     * Finished animation from piece animation component.
     * @param {Animation id from state machine} state 
     * @param {Object id for identification piece} id 
     */
    animFinish( id ) {
        
        if (id + 1 < this.pieArray.length) {

            this.pieces.children[ id + 1 ].start();

        }

    }

    createList() {

        for (let i = 0; i < this.pieArray.length; i++) {



        }

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

        // Let's go play animation
        if (this.pieces.children.length > 0) {

            this.pieces.children[0].start();

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
        this.pieces.add(piece);
    
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