import { MDNElement } from "./mdnElement.js";

class ClassesElement extends MDNElement {

    constructor() {

        super();

        this.url = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/';

        this.init( this.url );
    }

}

export { ClassesElement };