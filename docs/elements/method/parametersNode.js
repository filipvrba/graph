import { MethodNodes } from "./methodNodes.js";

class ParametersNode extends MethodNodes {

    constructor() {

        super();

    }

    getName() {

        return 'para';

    }

    getDefaultTemplate() {

        return `
        <ul>
            <ul class="line-space">
                *
            </ul>
        </ul>
        `;

    }

    getCustomTemplate( node ) {

        const name = node.getAttribute( 'name' );
        const decs = node.innerHTML.trim();

        return `
        <li class="p-default">
            <div class="row">
                <code>
                    <span>${ name }</span>
                </code>
                <p class="fa fa-caret-right"></p> ${ decs }
            </div>
        </li>
        `;

    }

}

export { ParametersNode };