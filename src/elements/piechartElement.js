import { Scene, Vector2, TDRenderer } from '../core/index.js'
import { PieChart } from '../graphs/index.js'

class PieChartElement extends HTMLElement {

    constructor() {

        super();

        this.removeHandler = () => { this.remove() };
        this.hiddeHandler = () => { this.hidden() };

        this.data = this.getAttribute( 'data' );
        this.widthRadius = parseInt( this.getAttribute( 'widthRadius' ) );

        this.initRoot();
        this.initRenderer();
        
        this.scene = new Scene();
        this.scene.ready();

        this.resizeHandler = () => {

            this.renderer.setSize( window.innerWidth, window.innerHeight );

            this.pieChart.position = this.globalPosition;
                
            this.scene.updateWorld();

        }
        window.addEventListener( 'resize', this.resizeHandler );

    }

    get globalPosition() {

        return new Vector2( (this.renderer.canvas.width / 2 ) - this.widthRadius / 2,
        this.renderer.canvas.height / 2 );
    
    }

    initRoot() {

        const template = document.createElement( 'template' );
        template.innerHTML = `
            <style type="text/css">
                canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    outline: none;
                    z-index: -1;
                }
            </style>

            <canvas></canvas>
        `;
        
        this.attachShadow( { mode: 'open' } );
        this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    }

    initRenderer() {

        const canvas = this.shadowRoot.querySelector( 'canvas' );

        this.renderer = new TDRenderer( canvas );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    initPieChart() {

        if ( this.data === null ) {

            console.warn( 'Please implement to component a atribute data="".\nFormatted attribute must be string and representing json.' );
            return;

        }

        // Convert string (json) to object
        this.data = JSON.parse( this.data )

        this.pieChart = new PieChart( this.data );  // There implement object values
        this.pieChart.position = this.globalPosition;
        this.pieChart.widthRadius = this.widthRadius;

        this.scene.add( this.pieChart );

    }

    tick() {

        this.renderer.render( this.scene );

        requestAnimationFrame( () => this.tick() );

    }

    remove() {

        const index = this.pieChart.pieces.children.length - 1;
        this.pieChart.hiddePiece( index )

    }

    hidden() {

        const removeInnerEvent = new CustomEvent( 'removeInner' );
        document.dispatchEvent( removeInnerEvent );

    }

    connectedCallback() {

        this.initPieChart();
        this.tick();

        document.addEventListener( 'remove', this.removeHandler );

        this.pieChart.connect( 'hidden', this.hiddeHandler );

    }

    disconnectedCallback() {

        this.scene.free();
        
        window.removeEventListener( 'resize', this.resizeHandler );
        document.removeEventListener( 'remove', this.removeHandler );

    }

}

window.customElements.define( 'pie-chart', PieChartElement );