import { Object2D } from '../object2d.js';
import { Color } from '../../math/color.js';
import { PieceAnimationComponent } from './components/PieceAnimationComponent.js'

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

        this.scene.connect('update', signal => {

            this.draw();
            this.update(signal.dt);

        });

        this.animationComponent = new PieceAnimationComponent( this );

    }

    update(dt) {

        this.animationComponent.update( dt );

    }

    draw() {

        this.drawPiece();

    }

    start() {

        // Select state machine - Start view graph
        this.animationComponent.stateID = 1;

    }

    stop() {

        // Select state machine - Stop view graph
        this.animationComponent.stateID = 2;

    }

    drawPiece() {

        this.scene.renderer.beginPath();

        this.scene.renderer.arc(this.globalPosition.x, this.globalPosition.y,
            this.animations[this.animationComponent.animID].widthRadius,
        this.startRadian, this.animations[this.animationComponent.animID].endRadian, false);
        this.scene.renderer.lineTo(this.globalPosition.x, this.globalPosition.y);

        this.scene.renderer.closePath();
        
        this.scene.renderer.fillStyle = this.colorStyle;
        this.scene.renderer.fill();

    }

}

export { Piece };