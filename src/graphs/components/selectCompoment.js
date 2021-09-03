import { BasicObject, Animation } from '../../core/index.js'

class SelectCompoment extends BasicObject {

    constructor( widthRadius, maxRad = 10 ) {

        super();

        this.maxRad = maxRad;
        this.widthRadius = widthRadius;

    }
    
    ready() {

        this.animationPlayer = this.parent.animationPlayer;

        this.createAnimation();

    }

    createAnimation() {

        const parentRad = this.widthRadius;
        const time = 0.1;

        let animation = new Animation();
        let trackID = animation.addTrack( 'widthRadius' );

        // On select animation
        animation.addInsertKey(trackID, 0, parentRad);
        animation.addInsertKey(trackID, time, parentRad + this.maxRad);

        this.animationPlayer.addAnimation('onSelect', animation);

        // Off select animation
        animation = new Animation();
        trackID = animation.addTrack( 'widthRadius' );
        animation.addInsertKey(trackID, 0, parentRad + this.maxRad);
        animation.addInsertKey(trackID, time, parentRad);

        this.animationPlayer.addAnimation('offSelect', animation);
    }

    on() {

        this.animationPlayer.play( 'onSelect' );

    }

    off() {

        this.animationPlayer.play( 'offSelect' );

    }

}

export { SelectCompoment };