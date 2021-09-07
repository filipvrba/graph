import { Vector2 } from "./math/vector2.js";
import { BasicObject } from "./objects/basicObject.js";

let position = new Vector2(0, 0);

class Input extends BasicObject {

    constructor() {

        super();

        this.position = new Vector2( 0, 0 );

        this.mouseMoveHandler = ( event ) => this.mouseMove( event );

    }

    ready() {

        this.canvasRect = this.parent.renderer.canvas.getBoundingClientRect();

        document.addEventListener( 'mousemove', this.mouseMoveHandler );

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