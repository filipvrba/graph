import { Scene, Vector2, TDRenderer } from '../core/index.js'
import { PieChart } from '../graphs/index.js'

class PieChartElement extends HTMLElement {

    constructor() {

        super();

        this.removeHandler = () => { this.remove() };
        this.hiddeHandler = () => { this.hidden() };
        this.isReadyHandler = () => { this.isReady() };
        this.resizeHandler = () => this.resize();

        this.initRoot();
        this.initRenderer();
        
        this.scene = new Scene();
        this.scene.ready();

    }

    get data() {

        let data = this.getAttribute( 'data' );

        if ( data === null ) {

            throw 'Please implement to component a atribute data="".\nFormatted attribute must be string and representing json.';

        }

        // Convert string (json) to object
        data = JSON.parse( data )

        return data;

    }

    get widthRadius() {

        return parseInt( this.getAttribute( 'widthRadius' ) );

    }

    get colorLabel() {

        let color = this.getAttribute( 'colorLabel' );
        
        if ( color === null ) {

            color = '';
        }

        return color;
    }

    get globalPosition() {

        return new Vector2( (this.renderer.canvas.width / 2 ) - this.widthRadius / 2,
        this.renderer.canvas.height / 2 );
    
    }

    resize() {

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.pieChart.position = this.globalPosition;
        this.scene.updateWorld();

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

        this.pieChart = new PieChart( this.data );  // There implement object values
        this.pieChart.position = this.globalPosition;
        this.pieChart.widthRadius = this.widthRadius;
        this.pieChart.colorLabel = this.colorLabel;

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

        const removeInnerEvent = new CustomEvent( 'removeInner');
        document.dispatchEvent( removeInnerEvent );

    }

    isReady() {

        const isReadyEvent = new CustomEvent( 'isReadyBack', {

            detail: this.pieChart.isScaletable

        });
        document.dispatchEvent( isReadyEvent );

    }

    connectedCallback() {

        this.initPieChart();
        this.tick();

        window.addEventListener( 'resize', this.resizeHandler );
        document.addEventListener( 'remove', this.removeHandler );
        document.addEventListener( 'isReadyC', this.isReadyHandler );

        this.pieChart.connect( 'hidden', this.hiddeHandler );

    }

    disconnectedCallback() {

        this.scene.free();
        
        window.removeEventListener( 'resize', this.resizeHandler );
        document.removeEventListener( 'remove', this.removeHandler );
        document.removeEventListener( 'isReadyC', this.isReadyHandler );

    }

}

window.customElements.define( 'pie-chart', PieChartElement );