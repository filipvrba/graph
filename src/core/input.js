import { Vector2 } from "./math/vector2.js";
import { BasicObject } from "./objects/basicObject.js";

class Input extends BasicObject {

    constructor() {

        super();

        this.position = new Vector2( 0, 0 );

        this.mouseMoveHandler = ( event ) => this.mouseMove( event );

    }

    ready() {

        document.addEventListener( 'mousemove', this.mouseMoveHandler );

    }

    draw( renderer ) {

        this.canvasRect = renderer.canvas.getBoundingClientRect();

    }

    mouseMove( event ) {

        this.position.x = event.x - this.canvasRect.x;
        this.position.y = event.y - this.canvasRect.y;

        this.emitSignal( { type: 'input', mousePosition: this.position } );

    }

    free() {

        super.free();
        
        document.removeEventListener( 'mousemove', this.mouseMoveHandler );

    }

}

export { Input };