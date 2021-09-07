import { Scene, Clock, Vector2 } from '../core/index.js'
import { PieChart } from '../graphs/index.js'

class PieChartElement extends HTMLElement {

    constructor() {

        super();

        this.initRoot();
        this.initCanvas();
        this.initScene();

        this.clock = new Clock();

    }

    initRoot() {

        const template = document.createElement( 'template' );
        template.innerHTML = `
            <style type="text/css">
                canvas {
                    border: 1px solid black;
                }
            </style>

            <canvas></canvas>
        `;

        this.attachShadow( { mode: 'open' } );
        this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    }

    initCanvas() {

        this.canvas = this.shadowRoot.querySelector( 'canvas' );
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

    }

    initScene() {

        this.scene = new Scene();
        this.scene.addRenderer( this.canvas.getContext( '2d' ) );
        this.scene.ready();

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
        this.pieChart.position = new Vector2( this.canvas.width / 2,
            this.canvas.height / 2 );
        this.pieChart.widthRadius = parseInt( this.getAttribute( 'widthRadius' ) );

        this.scene.add( this.pieChart );

    }

    tick() {

       this.scene.renderer.clearRect( 0, 0, this.canvas.width,
            this.canvas.height );

        // Call Update method for connect class
        this.scene.emitSignal( { type: 'update', dt: this.clock.getDT } );

        requestAnimationFrame( () => this.tick() );

    }

    connectedCallback() {

        this.initPieChart();
        this.tick();

    }

    disconnectedCallback() {

        this.scene.free();

    }

}

window.customElements.define( 'pie-chart', PieChartElement );