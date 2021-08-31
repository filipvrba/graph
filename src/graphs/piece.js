import { AnimationPlayer, Animation, Object2D } from "../core/index.js";

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
        this.colorStyle = this.values.color;

        this.createAnimation();

        this.animationPlayer.connect( 'animFinish', ( signal ) => {

            this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        } );

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

        this.drawPiece();

    }

    drawPiece() {

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