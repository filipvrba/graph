class CustomizePiechartElement extends HTMLElement {

    constructor() {

        super();

        this.randomBitmask = 0;

        this.clickMinCircleHandler = () => { this.clickMinCircle() };
        this.clickPlusCircleHandler = () => { this.clickPlusCircle() };
        this.loadHandler = () => this.load();
        this.messageHandler = ( event ) => { this.message( event.data ) };

        this.customObjects = [];
        this.defaultObjects = [

            { name: "CESNET", value: "73.1" },
            { name: "FreeTel", value: "60.3" },
            { name: "RIO", value: "43.9" },
            { name: "SMART", value: "51" },
            { name: "PODA", value: "57" },
            { name: "StarNet", value: "35" },
            { name: "T-Mobile", value: "27.7" },
            { name: "O2", value: "30.2" },
            { name: "Vodafone", value: "62.7" },

        ];
        this.graph = document.getElementById( 'graph' );
        this.innerHTML = this.getDefaultTemplate();
        this.clickLeftButton = null;

    }

    load() {

        this.codeData = document.getElementById( 'code-data' );
        this.addObj( 2 )  // Add two objects

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

        this.clickLeftButton = true;
        this.isReady();

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

        this.clickLeftButton = false;
        this.isReady();
        
    }

    isReady() {

        this.graph.contentWindow.postMessage( { type: 'isReady' } );

    }

    addObj( length = 1 ) {

        for ( let i = 0; i < length; i++ ) {

            this.customObjects.push( this.getRandomObject() );

        }
    
        this.sendData();

    }

    sendData() {

        const dataArray = [];
        for ( const values of this.customObjects ) {

            dataArray.push( values.obj );

        }
        const json = JSON.stringify( dataArray );

        this.graph.contentWindow.postMessage( json );
        this.setCodeData( json );

    }

    setCodeData( json ) {

        if ( !this.codeData ) return;

        this.codeData.innerHTML = `'${ json }'`;

    }

    message( data ) {

        if ( data.type === 'isReady' ) {
                
            if ( data.value === true && data.add === true ) {

                if ( this.clickLeftButton ) {

                    this.removeObj();

                } else {

                    this.addObj();

                }

            }

        }

    }

    connectedCallback() {

        document.addEventListener( 'clickMinCircle', this.clickMinCircleHandler );
        document.addEventListener( 'clickPlusCircle', this.clickPlusCircleHandler );

        this.graph.addEventListener( 'load', this.loadHandler );

        window.addEventListener( 'message', this.messageHandler );
        
    }

    disconnectedCallback() {

        document.removeEventListener( 'clickMinCircle', this.clickMinCircleHandler );
        document.removeEventListener( 'clickPlusCircle', this.clickPlusCircleHandler );

        this.graph.removeEventListener( 'load', this.loadHandler );

        window.removeEventListener( 'message', this.messageHandler );

    }

}

export { CustomizePiechartElement };