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

            this.createPiece(i, endRadian, this.pieArray[i]);

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

    createPiece( id, endRadian, values) {

        const piece = new Piece(this.startRadian, endRadian);
        piece.position = this.position;
        piece.scale = this.scale;
        piece.id = id;
        //piece.addRenderer(this.renderer);
        
        piece.text = `${values.name} (${values.value})`;
        piece.textCirRadius = (this.scale.x / 100) * 5;
        piece.positionText = new Vector2(this.position.x + this.scale.x + 30,
            this.position.y);
        
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

        this.positionText = Vector2.ZERO;
        this.positionTextAnim = Vector2.ZERO;
        this.text = "";
        this.textCirRadius = 0;
        this.textCirRadiusAnim = 0;

    }

    ready() {

        const halfRad = this.endRadian / 2 + this.startRadian / 2;
        const posRad = new Vector2(Math.cos(halfRad),
            Math.sin(halfRad));
        this.positionTextAnim = new Vector2(this.position.x, this.position.y);
        this.positionTextAnim.x += (this.scale.x / 2) * posRad.x;
        this.positionTextAnim.y += (this.scale.x / 2) * posRad.y;

        this.draw();

    }

    update(dt) {
        // Animate scale Piece
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
        } else {

            this.scaleAnim = this.scale.length();

        }

        // Animate position and scale Text
        this.positionTextAnim.lerp(this.positionText, this.scale.y * dt);
        this.textCirRadiusAnim += Mathf.lerp(this.textCirRadiusAnim, this.textCirRadius, (this.scale.y / 3) * dt);

        // Set defaul end position [y] on a Text
        const circleRadius = this.textCirRadius * 3;
        const height = (this.parent.children.length / 2) * circleRadius;
        this.positionText.y = (this.position.y - height) + (circleRadius * this.id);

        this.draw();
    }

    draw() {

        this.drawPiece();
        this.drawText();

    }

    drawPiece() {

        this.parent.renderer.beginPath();

        this.parent.renderer.arc(this.position.x, this.position.y, this.scaleAnim,
            this.startRadian, this.endRadianAnim, false);
        this.parent.renderer.lineTo(this.position.x, this.position.y);

        this.parent.renderer.closePath();
        
        this.parent.renderer.fillStyle = this.colorStyle;
        this.parent.renderer.fill();

    }

    drawText() {

        this.parent.renderer.arc(this.positionTextAnim.x, this.positionTextAnim.y, this.textCirRadiusAnim,
            0, Math.PI * 2);
        this.parent.renderer.fill();

        this.parent.renderer.fillStyle = 'black';
        this.parent.renderer.font = `bold ${this.textCirRadiusAnim * 2}px Arial`;
        this.parent.renderer.fillText(this.text, this.positionTextAnim.x + 12, this.positionTextAnim.y + 7);

    }
}

export { PieChart };