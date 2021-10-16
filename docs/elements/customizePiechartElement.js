class CustomizePiechartElement extends HTMLElement {

    constructor() {

        super();

        this.randomBitmask = 0;

        this.clickMinCircleHandler = () => { this.clickMinCircle() };
        this.clickPlusCircleHandler = () => { this.clickPlusCircle() };
        this.loadHandler = () => { this.addObj() };

        this.customObjects = [];
        this.defaultObjects = [
            { name: "China", value: "1411778724" },
            { name: "India", value: "1383082048" },
            { name: "United States", value: "332531318" },
            { name: "Indonesia", value: "271350000" },
            { name: "Pakistan", value: "225200000" },
            { name: "Brazil", value: "213807993" },
            { name: "Nigeria", value: "211401000" },
            { name: "Bangladesh", value: "171522480" },
            { name: "Russia", value: "146171015" },
            { name: "Mexico", value: "126014024" }
        ];
        this.graph = document.getElementById( 'graph' );
        this.innerHTML = this.getDefaultTemplate();

    }

    getRandomObject() {

        const index = Math.floor( Math.random() * this.defaultObjects.length );
        const bitmask = 2 ** index;
        const isExist = (this.randomBitmask & bitmask) !== 0;

        if ( isExist ) {

            return this.getRandomObject();

        }

        this.randomBitmask |= bitmask;

        return {
            obj: this.defaultObjects[ index ],
            bitmask
        };

    }

    getDefaultTemplate() {

        return `
        <div class="bottom-center">
            <p class="fa fa-minus-circle" onclick="document.dispatchEvent( clickMinCircleEvent );"></p>
            <div class="space"></div>
            <p class="fa fa-plus-circle" onclick="document.dispatchEvent( clickPlusCircleEvent );"></p>
        </div>
        `

    }

    clickMinCircle() {

        if ( this.customObjects.length <= 1 ) return;

        this.removeObj();

    }

    removeObj() {

        // Get bitmask
        const bitmask = this.customObjects[ 0 ].bitmask;

        // Remove obj
        this.customObjects.pop();
        this.randomBitmask &= bitmask;

        this.sendData();

    }

    clickPlusCircle() {

        if ( this.customObjects.length >= this.defaultObjects.length / 2 ) return;

        this.addObj();
        
    }

    addObj() {

        this.customObjects.push( this.getRandomObject() );
        this.sendData();

    }

    sendData() {

        const dataArray = [];
        for ( const values of this.customObjects ) {

            dataArray.push( values.obj );

        }
        const json = JSON.stringify( dataArray );

        this.graph.contentWindow.postMessage( json );

    }

    connectedCallback() {

        document.addEventListener( 'clickMinCircle', this.clickMinCircleHandler );
        document.addEventListener( 'clickPlusCircle', this.clickPlusCircleHandler );

        graph.addEventListener( 'load', this.loadHandler );
        
    }

    disconnectedCallback() {

        document.removeEventListener( 'clickMinCircle', this.clickMinCircleHandler );
        document.removeEventListener( 'clickPlusCircle', this.clickPlusCircleHandler );

        graph.removeEventListener( 'load', this.loadHandler );

    }

}

export { CustomizePiechartElement };