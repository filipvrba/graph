import { AnimationPlayer, Animation, Object2D } from "../core/index.js";
import { SelectCompoment } from './components/selectCompoment.js'

class Label extends Object2D {

    constructor( text ) {

        super();

        this.text = text;
        this.scene = null;

    }

    ready() {

        this.scene = this.getScene();

        this.createAnimation();

        // Add the select component to the scene tree
        this.selectComp = new SelectCompoment( this.widthRadius, 5 );
        this.add( this.selectComp, 'selectComponent' );

        this.widthRadius = 0;

        this.animFinisHandler = ( ) => {

            this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        }

        this.animationPlayer.connect( 'animFinish', this.animFinisHandler );

    }

    createAnimation() {

        const animation = new Animation();
        let trackID = animation.addTrack( 'position.x' );
        animation.addInsertKey(trackID, 0, this.position.x);
        animation.addInsertKey(trackID, 0.2, 0 );

        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.widthRadius );

        this.animationPlayer = new AnimationPlayer();
        this.animationPlayer.addAnimation('start', animation);

        this.add( this.animationPlayer );

    }

    start() {

        this.animationPlayer.play('start');

    }

    draw( renderer ) {

        renderer.arc(this.globalPosition.x, this.globalPosition.y, Math.abs( this.widthRadius ),
            0, Math.PI * 2);
        renderer.fillStyle = this.colorStyle;
        renderer.fill();

        renderer.fillStyle = 'black';
        renderer.font = `bold ${ Math.abs( this.widthRadius ) * 2 }px Arial`;
        renderer.fillText(this.text, this.globalPosition.x + 12, this.globalPosition.y + 7);

    }

    free() {

        super.free();

        this.animationPlayer.disconect( 'animFinish', this.animFinisHandler );

    }

}

export { Label };