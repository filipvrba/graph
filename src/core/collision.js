import { BasicObject } from "./objects/basicObject.js";

class Collision extends BasicObject {

    constructor() {

        super();

        this.inputPickable = false;

    }

    input( mousePos ) {

        if ( !this.inputPickable && this.isCollide( mousePos ) ) {

            this.mouseEntered();
            this.inputPickable = true;

        } else if ( this.inputPickable && !this.isCollide( mousePos ) ) {

            this.mouseExited();
            this.inputPickable = false;
        
        }

    }

    mouseEntered() {
        
        this.emitSignal( { type: 'mouseEntered' } );

    }

    mouseExited() {

        this.emitSignal( { type: 'mouseExited' } );

    }

    isCollide( mousePos ) {

        const distanceRoot = mousePos.distanceTo( this.parent.globalPosition );

        if ( distanceRoot <= this.parent.values.widthRadius ) {

            const mousePosition = mousePos.clone();
            const direction = mousePosition.sub( this.parent.globalPosition );
            const radian = Math.atan2( -direction.y, -direction.x ) + Math.PI;

            return radian >= this.parent.startRadian && radian <= this.parent.endRadian;

        }

    }

}

export { Collision };