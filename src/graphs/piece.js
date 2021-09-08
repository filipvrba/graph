import { AnimationPlayer, Animation, Object2D, Vector2, Mathf, Collision } from "../core/index.js";
import { SelectCompoment } from "./components/selectCompoment.js";

class Piece extends Object2D {

    constructor( startRadian, endRadian ) {

        super();

        this.startRadian = startRadian;
        this.endRadian = endRadian;

        this.values = { };

        this.scene = null;

        this.collision = new Collision();

    }

    ready() {

        this.scene = this.getScene();
        this.colorStyle = this.values.color;

        this.createAnimation();

        this.animFinishHandler = ( signal ) => {

            if ( signal.name === 'start' ) this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        }
        this.animationPlayer.connect( 'animFinish', this.animFinishHandler );

        this.add( this.collision );

        this.selectComp = new SelectCompoment( this.values.widthRadius );
        this.add( this.selectComp );
        
        this.mouseEnteredHandler = () => this.mouseEntered();
        this.collision.connect( 'mouseEntered', this.mouseEnteredHandler );

        this.mouseExitedHandler = () => this.mouseExited();
        this.collision.connect( 'mouseExited', this.mouseExitedHandler );

    }

    free() {

        super.free();
        
        this.animationPlayer.disconect( 'animFinish', this.animFinishHandler );
        this.collision.disconect( 'mouseEntered', this.mouseEnteredHandler );
        this.collision.disconect( 'mouseExited', this.mouseExitedHandler );

    }

    mouseEntered() {

        if ( !this.parent.parent.isScaletable ) return;

        this.selectComp.on()

        this.parent.emitSignal( { type: 'pieceEntered', piece: this } );

    }

    mouseExited() {

        if ( !this.parent.parent.isScaletable ) return;

        this.selectComp.off()

        this.parent.emitSignal( { type: 'pieceExited', piece: this } );

    }

    createAnimation() {

        const animation = new Animation();
        let trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.values.widthRadius);

        trackID = animation.addTrack( 'endRadian' );
        animation.addInsertKey(trackID, 0, this.startRadian);
        animation.addInsertKey(trackID, 0.1, this.endRadian);

        this.animationPlayer = new AnimationPlayer();
        this.animationPlayer.addAnimation('start', animation);

        this.add( this.animationPlayer );

    }

    start() {

        this.animationPlayer.play('start');

    }

    draw( renderer ) {

        renderer.beginPath();
        
        renderer.arc(this.globalPosition.x, this.globalPosition.y,
            Math.abs( this.widthRadius ),
        this.startRadian, this.endRadian, false);
        renderer.lineTo(this.globalPosition.x, this.globalPosition.y);

        renderer.closePath();
        
        renderer.fillStyle = this.colorStyle;
        renderer.fill();

    }

}

export { Piece };