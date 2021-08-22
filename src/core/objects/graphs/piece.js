import { Object2D } from '../object2d.js';
import { Color } from '../../math/color.js';
import { Mathf } from '../../math/mathf.js';
import { Vector2 } from '../../math/vector2.js';

class Piece extends Object2D {
    constructor( startRadian, endRadian ) {

        super();

        this.startRadian = startRadian;
        this.endRadian = endRadian;

        this.values = { };

        this.scene = null;

    }

    ready() {

        this.scene = this.getScene();

        this.connect('update', signal => {

            this.draw();
            this.update(signal.dt);

        });

    }

    update(dt) {
        

    }

    draw() {

        this.drawPiece();
        //this.drawText();

    }

    drawPiece() {

        this.renderer.beginPath();

        this.renderer.arc(this.position.x, this.position.y, this.scaleAnim,
            this.startRadian, this.endRadianAnim, false);
        this.renderer.lineTo(this.position.x, this.position.y);

        this.renderer.closePath();
        
        this.renderer.fillStyle = this.colorStyle;
        this.renderer.fill();

    }

    drawText() {

        //const globalPosition = this.globalPosition

        this.renderer.arc(this.positionTextAnim.x, this.positionTextAnim.y, this.textCirRadiusAnim,
            0, Math.PI * 2);
        this.renderer.fill();

        this.renderer.fillStyle = 'black';
        this.renderer.font = `bold ${this.textCirRadiusAnim * 2}px Arial`;
        this.renderer.fillText(this.text, this.positionTextAnim.x + 12, this.positionTextAnim.y + 7);

    }
}

export { Piece };