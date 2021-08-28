import { Object2D } from '../object2d.js';
import { Color } from '../../math/color.js';
import { PieceAnimationComponent } from './components/PieceAnimationComponent.js'
import { Animation } from '../animations/animation.js';
import { AnimationPlayer } from '../animations/animationPlayer.js';

class Piece extends Object2D {

    constructor( startRadian, endRadian ) {

        super();

        this.startRadian = startRadian;
        this.endRadian = endRadian;

        this.values = { };

        this.scene = null;

        this.testValue = 0;

    }

    ready() {

        this.scene = this.getScene();

        this.scene.connect('update', signal => {

            this.draw();
            this.update(signal.dt);

        });

        //this.animationComponent = new PieceAnimationComponent( this );

        const animation = new Animation();
        let trackID = animation.addTrack( 'widthRadius' );
        //animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0, this.values.widthRadius);
        //animation.addInsertKey(trackID, 6, 0);

        trackID = animation.addTrack( 'endRadian' );
        animation.addInsertKey(trackID, 0, this.startRadian);
        animation.addInsertKey(trackID, 3, this.endRadian);
        animation.addInsertKey(trackID, 4, this.startRadian);
        animation.addInsertKey(trackID, 6, this.endRadian);

        this.animationPlayer = new AnimationPlayer();
        this.animationPlayer.addAnimation('start', animation);

        this.add( this.animationPlayer );

        this.animationPlayer.connect( 'animFinish', ( signal ) => {

            console.log( `Animation ${ signal.name } is actualy finished!` );

        } );

        this.animationPlayer.play('start');

    }

    update(dt) {

        //this.animationComponent.update( dt );

    }

    draw() {

        this.drawPiece();

    }

    start() {

        // Select state machine - Start view graph
        //this.animationComponent.stateID = 1;

    }

    stop() {

        // Select state machine - Stop view graph
        //this.animationComponent.stateID = 2;

    }

    drawPiece() {

        this.scene.renderer.beginPath();

        this.scene.renderer.arc(this.globalPosition.x, this.globalPosition.y,
            this.widthRadius,
        this.startRadian, this.endRadian, false);
        this.scene.renderer.lineTo(this.globalPosition.x, this.globalPosition.y);

        this.scene.renderer.closePath();
        
        this.scene.renderer.fillStyle = this.colorStyle;
        this.scene.renderer.fill();

    }

}

export { Piece };