import { Color } from '../../math/color.js';
import { Mathf } from '../../math/mathf.js';
import { Vector2 } from '../../math/vector2.js';
import { Object2D } from '../object2d.js';

class PieChart extends Object2D {

    constructor( pieArray ) {

        super();

        this.position = Vector2.ZERO;
        this.scale = Vector2.ZERO;
        this.pieArray = pieArray;
        this.totalValue = this.countTotalValue();
        this.startRadian = 0;
        this.endDegrees = 0;
        this.idObject = 0;

        this.valueTest = 0;

    }

    ready() {

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

    update( dt ) {

        const maxView = (this.idObject === this.children.length) ?
            this.children.length - 1: this.idObject;

        for (let i = 0; i <= maxView; i++) {

            this.children[i].update(dt);

        }
    }

    createPiece( id, endRadian ) {

        const piece = new Piece(this.startRadian, endRadian);
        piece.position = this.position;
        piece.scale = this.scale;
        piece.id = id;
        //piece.addRenderer(this.renderer);

        // Add all the objects for the scene identity
        this.add(piece);

        piece.ready();
    }

    countTotalValue() {

        let value = 0;
        for ( let i = 0; i < this.pieArray.length; i++ ) {

            value += this.pieArray[i].value;

        }
        
        return value;
    }
}

class Piece extends Object2D {
    constructor( startRadian, endRadian ) {

        super();

        this.startRadian = startRadian;
        this.endRadian = endRadian;
        this.endRadianAnim = this.startRadian;
        this.scaleAnim = 0;

        this.colorStyle = Color.ranColorStyle();

    }

    ready() {
        this.draw();
    }

    update(dt) {
        // Animate scale
        if ( this.endRadianAnim < this.endRadian - 0.01 ) {

            this.endRadianAnim += Mathf.lerp(this.endRadianAnim, this.endRadian, this.scale.y * dt);

        } else {

            this.endRadianAnim = this.endRadian;

            if ( this.id === this.parent.idObject ) {

                this.parent.idObject++;

            }
        }

        if (this.scaleAnim < this.scale.length()) {

            this.scaleAnim += Mathf.lerp(this.scaleAnim, this.scale.length(), this.scale.y * dt);
        }

        this.draw();
    }

    draw() {

        this.parent.renderer.beginPath();

        this.parent.renderer.arc(this.position.x, this.position.y, this.scaleAnim,
            this.startRadian, this.endRadianAnim, false);
        this.parent.renderer.lineTo(this.position.x, this.position.y);

        this.parent.renderer.closePath();
        
        this.parent.renderer.fillStyle = this.colorStyle;
        this.parent.renderer.fill();

    }
}

class List extends Object2D {

    constructor() {
        super();
    }

    ready() {
        
    }

    draw() {

    }

    update() {

    }

}

export { PieChart };