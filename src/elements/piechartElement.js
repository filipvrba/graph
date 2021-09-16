import { Scene, Clock, Vector2, TDRenderer } from '../core/index.js'
import { PieChart } from '../graphs/index.js'

class PieChartElement extends HTMLElement {

    constructor() {

        super();

        this.widthRadius = parseInt( this.getAttribute( 'widthRadius' ) );

        this.initRoot();
        this.initRenderer();
        
        this.scene = new Scene();
        this.scene.ready();

        this.resizeHandler = () => {

            this.renderer.setSize( window.innerWidth, window.innerHeight );

            this.pieChart.position = this.globalPosition;
                
            this.scene.updateWord();

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

        this.pieChart = new PieChart([
            {
                value: 40,
                name: "pc"
            },
            {
                value: 200,
                name: "mobile"
            },
            {
                value: 500,
                name: "tablet"
            },
            {
                value: 500,
                name: "other"
            }
        ]);
        this.pieChart.position = this.globalPosition;
        this.pieChart.widthRadius = this.widthRadius;

        this.scene.add( this.pieChart );

    }

    tick() {

        this.renderer.render( this.scene );

        requestAnimationFrame( () => this.tick() );

    }

    connectedCallback() {

        this.initPieChart();
        this.tick();

    }

    disconnectedCallback() {

        this.scene.free();
        
        window.removeEventListener( 'resize', this.resizeHandler );

    }

}

window.customElements.define( 'pie-chart', PieChartElement );