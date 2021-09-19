import { MDNElement } from "./mdnElement.js";

class ObjectsElement extends MDNElement {

    constructor() {

        super();

        this.url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/';

        this.init( this.url );

    }

}

export { ObjectsElement };