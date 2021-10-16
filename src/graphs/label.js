import { AnimationPlayer, Animation, Object2D } from "../core/index.js";
import { SelectCompoment } from './components/selectCompoment.js'

class Label extends Object2D {

    constructor( text ) {

        super();

        this.text = text;
        this.scene = null;

        this.fontSpaceWidth = 20;

    }

    ready() {

        this.scene = this.getScene();

        this.createAnimation();

        // Add the select component to the scene tree
        this.selectComp = new SelectCompoment( this.widthRadius, 5 );
        this.add( this.selectComp, 'selectComponent' );

        this.fontSize = this.widthRadius;
        this.widthRadius = 0;

        this.animFinisHandler = ( ) => {

            this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        }

        this.animationPlayer.connect( 'animFinish', this.animFinisHandler );

    }

    createAnimation() {

        this.animationPlayer = new AnimationPlayer();
        this.add( this.animationPlayer );

        // Start
        let animation = new Animation();
        let trackID = animation.addTrack( 'position.x' );
        animation.addInsertKey(trackID, 0, this.position.x);
        animation.addInsertKey(trackID, 0.2, 0 );

        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.widthRadius );

        this.animationPlayer.addAnimation('start', animation);

        // End
        animation = new Animation();
        trackID = animation.addTrack( 'position.x' );
        animation.addInsertKey(trackID, 0, 0);
        animation.addInsertKey(trackID, 0.2, this.position.x );

        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, this.widthRadius);
        animation.addInsertKey(trackID, 0.2, 0 );

        this.animationPlayer.addAnimation('end', animation);

    }

    start() {

        this.animationPlayer.play('start');

    }

    end() {

        this.animationPlayer.play( 'end' );

    }

    fontStyle( size ) {

        return `bold ${ Math.abs( size) * 3 }px Arial`;

    }

    draw( renderer ) {

        renderer.arc(this.globalPosition.x, this.globalPosition.y, Math.abs( this.widthRadius ),
            0, Math.PI * 2);
        renderer.fillStyle = this.colorStyle;
        renderer.fill();

        renderer.fillStyle = 'black';
        renderer.font = this.fontStyle( this.widthRadius >= this.fontSize ? this.fontSize : this.widthRadius );
        renderer.fillText(this.text, this.globalPosition.x + this.fontSpaceWidth, this.globalPosition.y + 7);

    }

    free() {

        super.free();

        this.animationPlayer.disconect( 'animFinish', this.animFinisHandler );

    }

}

export { Label };