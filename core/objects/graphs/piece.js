import { Object2D } from "../../engine.js";

class Piece extends Object2D {
    constructor( startRadian, endRadian ) {

        super();

        this.addEventListener('added', this.ready);
        this.addEventListener('update', function( event ) {
            this.update(event.dt);
        });

    }

    ready() {



    }

    update( dt ) {
        
        

    }
}

export { Piece };