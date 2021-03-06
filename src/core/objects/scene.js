import { Input } from "../input.js";
import { Object2D } from "./object2d.js";

class Scene extends Object2D {

    constructor() {
        
        super();
    }

    ready() {

        if ( !this.parent ) {

            this.globalPosition = this.position;
            
            const input = new Input();
            this.add( input );
        }
    }
}

export { Scene };