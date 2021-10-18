import { MDNElement } from './mdnElement.js'

class APIElement extends MDNElement {

    constructor() {

        super();

        this.url = 'https://developer.mozilla.org/en-US/docs/Web/API/';

        if ( this.hasText ) {

            this.url = `${ this.url }${ this.type }/`;
            this.type = this.innerText;

        }

        this.init( null, false );

    }

    get hasText() {

        return this.innerText !== '';

    }

    getUrlType() {

        if ( this.hasText ) {

            return this.url;

        }

        return super.getUrlType();

    }


}

export { APIElement };