import { ChildNode } from "../../childNode.js";
import { MethodNodes } from "../../methodNodes.js";

class ValueNode extends MethodNodes {

    constructor( child ) {

        super();

    }

    // Virtual function
    getName() {

        return 'value';

    }

    // Virtual function
    getCustomTemplate( node ) {

        const child = new ChildNode( node );

        let template = '';

        if ( child.identity !== null ) {

            template = `
            <th>
                <p>${ child.identity }</p>
            </th>
            <th>
                ${ child.getValueTemplate() }
            </th>
            `;

        }

        return template;

    }

}

export { ValueNode };