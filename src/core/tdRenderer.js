import { Clock } from "./objects/clock.js"

class TDRenderer {

    constructor( canvas ) {

        this.canvas = canvas;
        this.clock = new Clock();

    }

    setSize( width, height ) {

        this.canvas.width = width
        this.canvas.height = height;

    }

    get renderer() {

        return this.canvas.getContext( '2d' );

    }

    render( scene ) {

        this.renderer.clearRect( 0, 0, this.canvas.width,
            this.canvas.height );

        scene.emitSignal( { type: 'update', dt: this.clock.getDT } );
        scene.emitSignal( { type: 'draw', renderer: this.renderer } );

    }

}

export { TDRenderer };