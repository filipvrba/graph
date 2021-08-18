import { Vector2 } from "./vector2.js";

class Transform2D {

    constructor( origin ) {

        this.elements = [ origin ];

        this.elements[0].x = origin.x;
        this.elements[0].y = origin.y;

    }

    get origin() {

        return this.elements[0];

    }

    localToWorld( transform ) {

        const origin = transform.origin.add( this.origin );

        return new this.constructor( origin );

    }

    setOrigin( position ) {

        this.origin.x = position.x;
        this.origin.y = position.y;

    }
}

export { Transform2D };