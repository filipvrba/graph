import { AnimationPlayer, Animation, Object2D, Vector2 } from "../core/index.js";
import { Label } from './index.js'

class List extends Object2D {

    constructor( length, space ) {

        super();

        this.labelWidthRadius = 10;
        this.length = length;
        this.space = space;

        this.circleWidth = this.labelWidthRadius * 2;
        this.height = ( this.circleWidth * this.length ) / 2;

    }

    ready( ) {

        this.parent.connect( 'visible', ( signal ) => {

            this.findChildren( signal.id ).start();

            if ( signal.id === 0 ) {

                this.move();

            }

        });

        this.createAnimation();

        const pieces = this.parent.findChildren( 'pieces' );
        pieces.connect( 'pieceEntered', ( signal ) => this.pieceEntered( signal.piece ) );
        pieces.connect( 'pieceExited', ( signal ) => this.pieceExited( signal.piece ) );

    }

    pieceEntered( piece ) {

        const label = this.findChildren( piece.id );
        const selectComp = label.findChildren( 'selectComponent' );

        selectComp.on();

    }

    pieceExited( piece ) {

        const label = this.findChildren( piece.id );
        const selectComp = label.findChildren( 'selectComponent' );

        selectComp.off();

    }

    createAnimation() {

        const animation = new Animation();
        let trackID = animation.addTrack( 'position.y' );
        animation.addInsertKey(trackID, 0, this.position.y);
        animation.addInsertKey(trackID, this.length * 0.2, -this.height);

        this.animationPlayer = new AnimationPlayer();
        this.animationPlayer.addAnimation('move', animation);

        this.add( this.animationPlayer );

    }

    move() {

        this.animationPlayer.play( 'move' );

    }

    update( dt ) {

        if ( !this.animationPlayer.playbackActive ) return;

        this.updateGlobalPosition();

    }

    createLabel( values ) {

        const label = new Label( values.text );
        label.id = values.id;
        label.widthRadius = this.labelWidthRadius;
        label.position = new Vector2( this.parent.widthRadius,
            (this.circleWidth + this.space) * values.id );
        label.colorStyle = values.color;

        this.add( label );

    }

}

export { List };