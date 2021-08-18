import { Mathf } from "../../math/mathf.js";
import { Object2D } from "../object2d.js";
import { Piece } from "./piece.js";

class PieChart extends Object2D {

    constructor( pieArray ) {

        super();

        this.addEventListener('added', this.ready);
        this.addEventListener('update', function( event ) {
            for (let i = 0; i < this.children.length; i++) {
                this.children[i].update(event.dt);
            }
        });

        this.pieArray = pieArray;
        this.totalValue = this.countTotalValue();
        this.startRadian = 0;
        this.endDegrees = 0;

    }

    ready() {

        this.defineCalculateAngle();
        this.setPosition(10, 15);

        console.log(this.getPosition);

    }

    defineCalculateAngle() {

        // Look on the list and write defined values for pieces.
        for ( let i = 0; i < this.pieArray.length; i++ ) {

            // Calculate Angles
            const percentage = Mathf.percentage(this.pieArray[i].value, this.totalValue);
            const degrees = Mathf.per2deg(percentage);
            const endRadian = Mathf.radians(degrees + this.endDegrees);

            this.createPiece(i, endRadian);

            // For loop is added values, that true calculate angles.
            this.startRadian = endRadian;
            this.endDegrees += degrees;

        }
    }

    createPiece( id, endRadian ) {

        const piece = new Piece(this.startRadian, endRadian);
        piece.position = this.position;
        piece.id = id;

        // Add all the objects for the scene identity
        this.add(piece);

    }

    countTotalValue() {

        let value = 0;
        for ( let i = 0; i < this.pieArray.length; i++ ) {

            value += this.pieArray[i].value;

        }

        return value;
    }
}

export { PieChart };