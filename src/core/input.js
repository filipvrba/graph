import { Vector2 } from "./math/vector2";
import { BasicObject } from "./objects/basicObject";

class Input extends BasicObject {

    constructor() {

        super();

        this.position = new Vector2( 0, 0 );

        document.addEventListener( 'mousemove', ( event ) => {

            this.position.x = event.x;
            this.position.y = event.y;

            this.emitSignal( { type: 'input', mousePosition: this.position } );

        });

    }

}

export { Input };