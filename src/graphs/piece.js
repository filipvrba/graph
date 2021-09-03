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

        this.animationPlayer.connect( 'animFinish', ( signal ) => {

            if ( signal.name === 'start' ) this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        } );

        this.add( this.collision );

        this.selectComp = new SelectCompoment( this.values.widthRadius );
        this.add( this.selectComp );
        
        this.collision.connect( 'mouseEntered', () => this.mouseEntered() );
        this.collision.connect( 'mouseExited', () => this.mouseExited() );

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

    draw() {

        this.scene.renderer.beginPath();
        
        this.scene.renderer.arc(this.globalPosition.x, this.globalPosition.y,
            Math.abs( this.widthRadius ),
        this.startRadian, this.endRadian, false);
        this.scene.renderer.lineTo(this.globalPosition.x, this.globalPosition.y);

        this.scene.renderer.closePath();
        
        this.scene.renderer.fillStyle = this.colorStyle;
        this.scene.renderer.fill();

    }

}

export { Piece };