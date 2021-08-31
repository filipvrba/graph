import { AnimationPlayer, Animation, Object2D } from "../core/index.js";

class Label extends Object2D {

    constructor( text ) {

        super();

        this.text = text;

        this.scene = null;

    }

    ready() {

        this.scene = this.getScene();

        this.createAnimation();

        this.widthRadius = 0;

        this.animationPlayer.connect( 'animFinish', ( ) => {

            this.parent.emitSignal( { type: 'animFinish', id: this.id } );

        } );

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

    draw() {

        this.scene.renderer.arc(this.globalPosition.x, this.globalPosition.y, Math.abs( this.widthRadius ),
            0, Math.PI * 2);
        this.scene.renderer.fillStyle = this.colorStyle;
        this.scene.renderer.fill();

        this.scene.renderer.fillStyle = 'black';
        this.scene.renderer.font = `bold ${ Math.abs( this.widthRadius ) * 2 }px Arial`;
        this.scene.renderer.fillText(this.text, this.globalPosition.x + 12, this.globalPosition.y + 7);

    }

}

export { Label };