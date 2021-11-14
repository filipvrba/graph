import { AnimationPlayer, Animation, Object2D, Vector2, Mathf } from "../core/index.js";
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

        const degWidth = Mathf.per2deg( this.parent.widthRadius );
        const radWidth = Mathf.radians( degWidth );
        this.labelWidthRadius = radWidth;

        this.visibleHandler = ( signal ) => {

            this.findChildren( signal.id ).start();

            if ( signal.id === 0 ) {

                this.move();

            }

        }
        this.parent.connect( 'visible', this.visibleHandler );

        this.hiddeHandler = ( signal ) => {

            if ( signal.id === this.length - 1 ) {

                this.close();

            }

            this.findChildren( signal.id ).end();

        }
        this.parent.connect( 'hidde', this.hiddeHandler );

        this.createAnimation();

        this.pieces = this.parent.findChildren( 'pieces' );

        this.pieceEnteredHandler = ( signal ) => this.pieceEntered( signal.piece );
        this.pieces.connect( 'pieceEntered', this.pieceEnteredHandler );

        this.pieceExitedHandler = ( signal ) => this.pieceExited( signal.piece );
        this.pieces.connect( 'pieceExited', this.pieceExitedHandler );

    }

    free() {

        super.free();

        this.parent.disconect( 'visible', this.visibleHandler );
        this.pieces.disconect( 'pieceEntered', this.pieceEnteredHandler );
        this.pieces.disconect( 'pieceExited', this.pieceExitedHandler );

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

        this.animationPlayer = new AnimationPlayer();
        this.add( this.animationPlayer );

        // Move
        let animation = new Animation();
        let trackID = animation.addTrack( 'position.y' );
        animation.addInsertKey(trackID, 0, this.position.y);
        animation.addInsertKey(trackID, this.length * 0.2, -this.height);

        this.animationPlayer.addAnimation('move', animation);

        // Close
        animation = new Animation();
        trackID = animation.addTrack( 'position.y' );
        animation.addInsertKey(trackID, 0, -this.height);
        animation.addInsertKey(trackID, this.length * 0.2, this.position.y);

        this.animationPlayer.addAnimation('close', animation);

    }

    move() {

        this.animationPlayer.play( 'move' );

    }

    close() {

        this.animationPlayer.play( 'close' );

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

        if ( values.colorLabel !== '' ) {

            label.colorLabel = values.colorLabel;
        }

        this.add( label );

    }

}

export { List };