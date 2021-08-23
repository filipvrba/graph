import { Mathf } from "../../../math/mathf";

class PieceAnimationComponent {

    #stateID;

    constructor( piece ) {

        this.piece = piece;

        this.#stateID = 0;

        this.animID = 0;
        this.piece.animations.push( {

            widthRadius: 0,
            endRadian: this.piece.startRadian,
            speed: 20,
            isFinish: false

        } );

        this.valuesAnimation = this.piece.animations[ this.animID ];

    }

    update( dt ) {

        this.valuesAnimation = this.piece.animations[ this.animID ];

        switch( this.stateID ) {
            case 1:
                this.startProgress( dt, this.valuesAnimation );
                break;
            case 2:
                this.stopProgress( dt, this.valuesAnimation );
                break;
        }

    }

    animFinish( endPoint ) {

        if ( this.valuesAnimation.endRadian === endPoint ) {

            if ( !this.valuesAnimation.isFinish ) {

                this.valuesAnimation.isFinish = true;
                this.piece.parent.emitSignal( { type: 'animFinish', state: this.stateID, id: this.piece.id } );
                
            }

        }

    }

    startProgress( dt ) {

        this.animFinish( this.piece.endRadian );

        if (this.valuesAnimation.widthRadius <= this.piece.values.widthRadius - 0.005) {
            this.valuesAnimation.widthRadius += Mathf.lerp(this.valuesAnimation.widthRadius,
                this.piece.values.widthRadius, dt * this.valuesAnimation.speed);
        } else {
            this.valuesAnimation.widthRadius = this.piece.values.widthRadius;
        }

        if (this.valuesAnimation.endRadian <= this.piece.endRadian - 0.005) {
            this.valuesAnimation.endRadian += Mathf.lerp(this.valuesAnimation.endRadian, this.piece.endRadian,
                dt * this.valuesAnimation.speed);
        } else {
            this.valuesAnimation.endRadian = this.piece.endRadian;
        }

    }

    stopProgress( dt ) {

        this.animFinish(this.piece.startRadian);

        if (this.valuesAnimation.widthRadius >= 0.005) {
            this.valuesAnimation.widthRadius += Mathf.lerp(this.valuesAnimation.widthRadius,
                0, dt * this.valuesAnimation.speed);
        } else {
            this.valuesAnimation.widthRadius = 0;
        }

        if (this.valuesAnimation.endRadian >= this.piece.startRadian + 0.005) {
            this.valuesAnimation.endRadian += Mathf.lerp(this.valuesAnimation.endRadian, this.piece.startRadian,
                dt * this.valuesAnimation.speed);
        } else {
            this.valuesAnimation.endRadian = this.piece.startRadian;
        }

    }

    get stateID() {

        return this.#stateID;

    }

    set stateID( value ) {
        
        this.valuesAnimation.isFinish = false;
        this.#stateID = value;

    }

}

export { PieceAnimationComponent };