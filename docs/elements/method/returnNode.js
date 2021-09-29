import { MethodNodes } from "./methodNodes.js";

class ReturnNode extends MethodNodes{

    constructor() {

        super();

    }

    getName() {

        return 'return';

    }

    getDefaultTemplate() {

        return `
        <div class="row">
            <p class="fa fa-sign-out"></p>
            *
        </div>
        `;

    }

    getCustomTemplate( node ) {

        return `<p>${ node.innerHTML }</p>`;

    }

}

export { ReturnNode };